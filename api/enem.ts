import type { VercelRequest, VercelResponse } from "@vercel/node";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";

/*
 * API do Simulado ENEM.
 *
 * Armazenamento: Upstash Redis via REST (crie em Vercel → Storage → "Upstash for Redis";
 * a integração injeta KV_REST_API_URL e KV_REST_API_TOKEN automaticamente).
 * Correção por IA: defina ANTHROPIC_API_KEY nas variáveis de ambiente.
 * Código de convite (opcional): defina ENEM_CODIGO_CONVITE para restringir quem pode se cadastrar.
 */

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const CONVITE = process.env.ENEM_CODIGO_CONVITE?.trim();
const TEM_IA = Boolean(process.env.ANTHROPIC_API_KEY);
const P = "enem:";
const SESSAO_SEG = 60 * 60 * 24 * 30;
const LIMITE_CORRECOES_DIA = 15;

type Cmd = (string | number)[];

async function redis<T = unknown>(...cmd: Cmd): Promise<T> {
  const r = await fetch(REDIS_URL!, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
  });
  const j = (await r.json()) as { result?: T; error?: string };
  if (j.error) throw new Error(j.error);
  return j.result as T;
}

async function pipeline<T = unknown>(cmds: Cmd[]): Promise<T[]> {
  if (cmds.length === 0) return [];
  const r = await fetch(`${REDIS_URL}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmds),
  });
  const j = (await r.json()) as { result?: T; error?: string }[];
  return j.map((x) => {
    if (x.error) throw new Error(x.error);
    return x.result as T;
  });
}

interface UsuarioSalvo {
  username: string;
  nome: string;
  salt: string;
  hash: string;
  criadoEm: string;
}

function hashSenha(senha: string, salt: string) {
  return scryptSync(senha, salt, 32).toString("hex");
}

function senhaConfere(senha: string, u: UsuarioSalvo) {
  const a = Buffer.from(hashSenha(senha, u.salt), "hex");
  const b = Buffer.from(u.hash, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

async function criarSessao(username: string) {
  const token = randomBytes(24).toString("hex");
  await redis("SET", `${P}sessao:${token}`, username, "EX", SESSAO_SEG);
  return token;
}

async function usuarioDaRequisicao(req: VercelRequest): Promise<string | null> {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!/^[a-f0-9]{48}$/.test(token)) return null;
  return (await redis<string | null>("GET", `${P}sessao:${token}`)) ?? null;
}

const AREAS = ["linguagens", "humanas", "natureza", "matematica"] as const;
const IDS_PROVAS = ["P1", "P2", "P3"] as const;
const MAX_REGISTROS = 200;

interface ProvaResumo {
  provaId?: string;
  media: number;
  notas: Record<(typeof AREAS)[number], number>;
}
interface RedacaoResumo {
  provaId?: string;
  correcao: { notaTotal: number };
}

/** Mesma regra de src/enem/ranking.ts: nas provas oficiais vale só a 1ª tentativa. */
function linhaDoRanking(username: string, nome: string, provas: ProvaResumo[], redacoes: RedacaoResumo[]) {
  const primeira = <T extends { provaId?: string }>(lista: T[], id: string) =>
    [...lista].reverse().find((x) => x.provaId === id);
  const porProva: Record<string, { objetiva: number | null; redacao: number | null; nota: number }> = {};
  for (const id of IDS_PROVAS) {
    const objetiva = primeira(provas, id)?.media ?? null;
    const redacao = primeira(redacoes, id)?.correcao?.notaTotal ?? null;
    porProva[id] = { objetiva, redacao, nota: Math.round((((objetiva ?? 0) * 4 + (redacao ?? 0)) / 5) * 10) / 10 };
  }
  return {
    username,
    nome,
    simulados: provas.length,
    redacoes: redacoes.length,
    melhorMedia: Math.max(0, ...provas.map((p) => p.media)),
    melhorRedacao: Math.max(0, ...redacoes.map((r) => r.correcao?.notaTotal ?? 0)),
    melhoresAreas: Object.fromEntries(AREAS.map((a) => [a, Math.max(0, ...provas.map((p) => p.notas?.[a] ?? 0))])),
    porProva,
    notaGeral: Math.round((IDS_PROVAS.reduce((s, id) => s + porProva[id].nota, 0) / IDS_PROVAS.length) * 10) / 10,
  };
}

async function ranking() {
  const usernames = await redis<string[]>("SMEMBERS", `${P}usuarios`);
  if (!usernames.length) return [];
  const cmds: Cmd[] = usernames.flatMap((u) => [
    ["GET", `${P}usuario:${u}`],
    ["LRANGE", `${P}provas:${u}`, 0, -1],
    ["LRANGE", `${P}redacoes:${u}`, 0, -1],
  ]);
  const res = await pipeline<unknown>(cmds);
  return usernames
    .map((username, i) => {
      const usuario = JSON.parse((res[i * 3] as string) || "{}") as Partial<UsuarioSalvo>;
      const provas = ((res[i * 3 + 1] as string[]) || []).map((s) => JSON.parse(s) as ProvaResumo);
      const redacoes = ((res[i * 3 + 2] as string[]) || []).map((s) => JSON.parse(s) as RedacaoResumo);
      return linhaDoRanking(username, usuario.nome || username, provas, redacoes);
    })
    .sort((a, b) => b.notaGeral - a.notaGeral);
}

// ---------------- Correção de redação por IA ----------------

const CompetenciaSchema = z.object({
  numero: z.number().int(),
  nota: z.number().int(),
  comentario: z.string(),
  pontosFortes: z.array(z.string()),
  pontosAMelhorar: z.array(z.string()),
  comoMelhorar: z.string(),
});

const CorrecaoSchema = z.object({
  anulada: z.string(),
  resumo: z.string(),
  competencias: z.array(CompetenciaSchema),
  desvios: z.array(z.object({ trecho: z.string(), correcao: z.string(), explicacao: z.string() })),
  sugestaoReescrita: z.string(),
});

const SISTEMA_CORRETOR = `Você é um corretor experiente da redação do ENEM e também um professor paciente, que escreve para estudantes do ensino médio.

Corrija a redação seguindo a matriz oficial do ENEM. Cada uma das 5 competências recebe uma nota entre 0, 40, 80, 120, 160 ou 200:
- Competência 1: domínio da modalidade escrita formal (gramática, ortografia, concordância, regência, pontuação, acentuação).
- Competência 2: compreensão da proposta, desenvolvimento do tema dentro do texto dissertativo-argumentativo e uso de repertório sociocultural legitimado, pertinente e produtivo.
- Competência 3: seleção, relação, organização e interpretação de informações e argumentos em defesa de um ponto de vista (projeto de texto).
- Competência 4: mecanismos de coesão (conectivos, referenciação, progressão entre parágrafos e dentro deles).
- Competência 5: proposta de intervenção completa, articulada à discussão e que respeite os direitos humanos. Avalie os 5 elementos: agente, ação, meio/modo, finalidade e detalhamento (cada elemento vale 40 pontos).

Regras de nota zero (preencha "anulada" com o motivo e dê 0 em todas as competências): fuga total ao tema, texto que não é dissertativo-argumentativo, texto com até 7 linhas, cópia integral dos textos motivadores, impropérios ou partes desconectadas propositalmente. Se não houver motivo para anular, deixe "anulada" como string vazia.
Se o texto tangenciar o tema (abordar o assunto geral sem focar no recorte), limite a Competência 2 a 40 e as Competências 3 e 5 a no máximo 120 e 80, respectivamente.

Como escrever o retorno:
- Escreva em português do Brasil, com linguagem clara e encorajadora, mas honesta.
- "competencias" deve ter exatamente 5 itens, numerados de 1 a 5, em ordem.
- Em "comentario", explique por que a nota foi essa, citando trechos curtos da redação.
- Em "pontosFortes" e "pontosAMelhorar", liste itens objetivos (de 1 a 4 cada).
- Em "comoMelhorar", diga exatamente o que fazer para subir de nível, com um exemplo concreto de como o trecho poderia ter sido escrito.
- Em "desvios", liste os principais desvios gramaticais encontrados (no máximo 12), com o trecho original, a correção e uma explicação curta da regra.
- Em "sugestaoReescrita", reescreva o parágrafo mais fraco da redação (normalmente a conclusão ou um desenvolvimento) mostrando como ficaria em nível 200.
- Em "resumo", faça um parágrafo com a avaliação geral e as duas prioridades de estudo.
Não invente trechos que não estão na redação.`;

const NIVEIS = [0, 40, 80, 120, 160, 200];
const ajustarNivel = (n: number) => NIVEIS.reduce((a, b) => (Math.abs(b - n) < Math.abs(a - n) ? b : a));

async function corrigirComIA(tema: string, textosMotivadores: string, texto: string) {
  const client = new Anthropic();
  const response = await client.messages.parse({
    model: "claude-opus-5-5",
    max_tokens: 16000,
    output_config: { effort: "medium", format: zodOutputFormat(CorrecaoSchema) },
    system: SISTEMA_CORRETOR,
    messages: [
      {
        role: "user",
        content: `TEMA: ${tema}\n\nTEXTOS MOTIVADORES:\n${textosMotivadores}\n\nREDAÇÃO DO ESTUDANTE:\n"""\n${texto}\n"""`,
      },
    ],
  });
  if (response.stop_reason === "refusal" || !response.parsed_output) {
    throw new Error("A IA não conseguiu corrigir esta redação.");
  }
  const out = response.parsed_output;
  const competencias = [1, 2, 3, 4, 5].map((n) => {
    const c = out.competencias.find((x) => x.numero === n) ?? out.competencias[n - 1];
    return {
      numero: n,
      nota: out.anulada ? 0 : ajustarNivel(c?.nota ?? 0),
      comentario: c?.comentario ?? "",
      pontosFortes: c?.pontosFortes ?? [],
      pontosAMelhorar: c?.pontosAMelhorar ?? [],
      comoMelhorar: c?.comoMelhorar ?? "",
    };
  });
  return {
    metodo: "ia" as const,
    notaTotal: competencias.reduce((s, c) => s + c.nota, 0),
    resumo: out.resumo,
    competencias,
    desvios: out.desvios.slice(0, 12),
    sugestaoReescrita: out.sugestaoReescrita || undefined,
    anulada: out.anulada || undefined,
  };
}

// ---------------- Handler ----------------

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const action = String((req.method === "GET" ? req.query.action : req.body?.action) || "");

  if (action === "status") {
    return res.status(200).json({ armazenamento: Boolean(REDIS_URL && REDIS_TOKEN), ia: TEM_IA, convite: Boolean(CONVITE) });
  }

  if (!REDIS_URL || !REDIS_TOKEN) {
    return res.status(503).json({ error: "Armazenamento não configurado no servidor." });
  }
  if (req.method !== "POST") return res.status(405).json({ error: "Método não permitido." });

  const body = (req.body || {}) as Record<string, unknown>;

  try {
    if (action === "cadastrar") {
      const nome = String(body.nome || "").trim().slice(0, 40);
      const username = String(body.username || "").trim().toLowerCase();
      const senha = String(body.senha || "");
      if (CONVITE && String(body.convite || "").trim() !== CONVITE) {
        return res.status(403).json({ error: "Código de convite inválido. Peça o código para quem criou o simulado." });
      }
      if (nome.length < 2) return res.status(400).json({ error: "Informe seu nome." });
      if (!/^[a-z0-9_.]{3,20}$/.test(username)) {
        return res.status(400).json({ error: "O usuário deve ter de 3 a 20 caracteres: letras minúsculas, números, ponto ou _." });
      }
      if (senha.length < 4) return res.status(400).json({ error: "A senha deve ter pelo menos 4 caracteres." });

      const salt = randomBytes(16).toString("hex");
      const usuario: UsuarioSalvo = { username, nome, salt, hash: hashSenha(senha, salt), criadoEm: new Date().toISOString() };
      const criado = await redis<string | null>("SET", `${P}usuario:${username}`, JSON.stringify(usuario), "NX");
      if (criado !== "OK") return res.status(409).json({ error: "Esse nome de usuário já existe. Escolha outro." });
      await redis("SADD", `${P}usuarios`, username);
      const token = await criarSessao(username);
      return res.status(200).json({ token, usuario: { username, nome } });
    }

    if (action === "entrar") {
      const username = String(body.username || "").trim().toLowerCase();
      const senha = String(body.senha || "");
      const bruto = await redis<string | null>("GET", `${P}usuario:${username}`);
      const usuario = bruto ? (JSON.parse(bruto) as UsuarioSalvo) : null;
      if (!usuario || !senhaConfere(senha, usuario)) {
        return res.status(401).json({ error: "Usuário ou senha incorretos." });
      }
      const token = await criarSessao(username);
      return res.status(200).json({ token, usuario: { username, nome: usuario.nome } });
    }

    if (action === "ranking") {
      return res.status(200).json({ linhas: await ranking() });
    }

    // Daqui para baixo, só usuários logados.
    const username = await usuarioDaRequisicao(req);
    if (!username) return res.status(401).json({ error: "Sessão expirada. Entre novamente." });

    if (action === "eu") {
      const bruto = await redis<string | null>("GET", `${P}usuario:${username}`);
      const u = bruto ? (JSON.parse(bruto) as UsuarioSalvo) : null;
      return res.status(200).json({ usuario: { username, nome: u?.nome ?? username } });
    }

    if (action === "sair") {
      const token = (req.headers.authorization || "").slice(7);
      await redis("DEL", `${P}sessao:${token}`);
      return res.status(200).json({ ok: true });
    }

    if (action === "salvarProva" || action === "salvarRedacao") {
      const resultado = body.resultado;
      const json = JSON.stringify(resultado ?? null);
      if (!resultado || json.length > 60_000) return res.status(400).json({ error: "Resultado inválido." });
      const chave = `${P}${action === "salvarProva" ? "provas" : "redacoes"}:${username}`;
      await pipeline([
        ["LPUSH", chave, json],
        ["LTRIM", chave, 0, MAX_REGISTROS - 1],
      ]);
      return res.status(200).json({ ok: true });
    }

    if (action === "historico") {
      const [provas, redacoes] = await pipeline<string[]>([
        ["LRANGE", `${P}provas:${username}`, 0, -1],
        ["LRANGE", `${P}redacoes:${username}`, 0, -1],
      ]);
      return res.status(200).json({
        provas: (provas || []).map((s) => JSON.parse(s)),
        redacoes: (redacoes || []).map((s) => JSON.parse(s)),
      });
    }

    if (action === "corrigirRedacao") {
      if (!TEM_IA) return res.status(503).json({ error: "Correção por IA não configurada." });
      const tema = String(body.tema || "").slice(0, 300);
      const textosMotivadores = String(body.textosMotivadores || "").slice(0, 4000);
      const texto = String(body.texto || "").slice(0, 6000);
      if (texto.trim().length < 50) return res.status(400).json({ error: "Redação muito curta." });

      const chaveLimite = `${P}limite:${username}:${new Date().toISOString().slice(0, 10)}`;
      const usadas = await redis<number>("INCR", chaveLimite);
      if (usadas === 1) await redis("EXPIRE", chaveLimite, 60 * 60 * 26);
      if (usadas > LIMITE_CORRECOES_DIA) {
        return res.status(429).json({ error: `Limite de ${LIMITE_CORRECOES_DIA} correções por IA por dia atingido.` });
      }
      const correcao = await corrigirComIA(tema, textosMotivadores, texto);
      return res.status(200).json({ correcao });
    }

    return res.status(400).json({ error: "Ação desconhecida." });
  } catch (e) {
    console.error("[enem]", action, e);
    if (e instanceof Anthropic.APIError) {
      return res.status(502).json({ error: "O serviço de correção por IA está indisponível agora." });
    }
    return res.status(500).json({ error: "Erro interno. Tente novamente." });
  }
}
