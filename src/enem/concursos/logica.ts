import { DESVIOS } from "../corretorLocal";
import { DISCURSIVAS, ITENS_PF, QUESTOES_RFB, type Trilha } from "./dados";

export interface ResultadoObjetivaConcurso {
  id: string;
  tipo: "objetiva";
  trilha: Trilha;
  data: string;
  /** PF: "C" | "E" | null. RFB: índice da alternativa ou null. */
  respostas: Record<string, string | number | null>;
  acertos: number;
  erros: number;
  brancos: number;
  total: number;
  /** PF: acertos − erros (estilo Cebraspe). RFB: número de acertos. */
  nota: number;
  duracaoSeg: number;
}

export interface TopicoCorrigido {
  titulo: string;
  pontos: number;
  maximo: number;
  encontrados: string[];
  esperado: string;
}

export interface ResultadoDiscursiva {
  id: string;
  tipo: "discursiva";
  trilha: Trilha;
  data: string;
  texto: string;
  linhas: number;
  /** Conteúdo (NC): 0 a 10. */
  conteudo: number;
  /** Número de erros de língua (NE). */
  erros: number;
  /** Nota final = NC − 2 × NE ÷ TL, mínima 0 (fórmula usada pelo Cebraspe). */
  nota: number;
  topicos: TopicoCorrigido[];
  desvios: { trecho: string; correcao: string; explicacao: string }[];
  observacoes: string[];
}

export type ResultadoConcurso = ResultadoObjetivaConcurso | ResultadoDiscursiva;

export function corrigirObjetiva(
  trilha: Trilha,
  respostas: Record<string, string | number | null>,
  duracaoSeg: number,
): ResultadoObjetivaConcurso {
  let acertos = 0;
  let erros = 0;
  let brancos = 0;
  if (trilha === "PF") {
    for (const item of ITENS_PF) {
      const r = respostas[item.id];
      if (r === null || r === undefined) brancos++;
      else if (r === item.gabarito) acertos++;
      else erros++;
    }
  } else {
    for (const q of QUESTOES_RFB) {
      const r = respostas[q.id];
      if (r === null || r === undefined) brancos++;
      else if (r === q.correta) acertos++;
      else erros++;
    }
  }
  const total = trilha === "PF" ? ITENS_PF.length : QUESTOES_RFB.length;
  return {
    id: crypto.randomUUID(),
    tipo: "objetiva",
    trilha,
    data: new Date().toISOString(),
    respostas,
    acertos,
    erros,
    brancos,
    total,
    nota: trilha === "PF" ? acertos - erros : acertos,
    duracaoSeg,
  };
}

const normalizar = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/**
 * Correção automática da discursiva, pelos critérios usados nas bancas:
 * - Conteúdo (NC, 0 a 10): 1 ponto de apresentação/estrutura + 3 pontos por tópico pedido,
 *   proporcionais aos conceitos esperados que aparecem no texto.
 * - Língua (NE): desvios comuns encontrados. Nota = NC − 2 × NE ÷ TL (TL = linhas escritas).
 * É uma estimativa: o padrão de resposta é mostrado para o candidato se autoavaliar.
 */
export function corrigirDiscursiva(trilha: Trilha, texto: string): ResultadoDiscursiva {
  const d = DISCURSIVAS[trilha];
  const limpo = texto.trim();
  const base = normalizar(limpo);
  const linhas = Math.max(1, limpo.split("\n").reduce((s, l) => s + Math.max(1, Math.ceil(l.length / 70)), 0));
  const paragrafos = limpo.split(/\n+/).filter((p) => p.trim().length > 0).length;
  const observacoes: string[] = [];

  const topicos: TopicoCorrigido[] = d.topicos.map((t) => {
    const encontrados = t.palavrasChave.filter((k) => base.includes(normalizar(k)));
    const pontos = encontrados.length >= 3 ? 3 : encontrados.length === 2 ? 2 : encontrados.length === 1 ? 1 : 0;
    return { titulo: t.titulo, pontos, maximo: 3, encontrados, esperado: t.esperado };
  });

  let apresentacao = 0;
  if (paragrafos >= 3) apresentacao += 0.5;
  else observacoes.push("Organize o texto em pelo menos 3 parágrafos (introdução, desenvolvimento e conclusão).");
  if (linhas >= 15) apresentacao += 0.5;
  else observacoes.push("O texto está curto: as bancas costumam exigir um mínimo de linhas e textos curtos não desenvolvem os tópicos.");
  if (linhas > d.linhasMax) observacoes.push(`O texto parece passar de ${d.linhasMax} linhas; na prova, o que passa do limite é desconsiderado.`);

  const desvios: ResultadoDiscursiva["desvios"] = [];
  let erros = 0;
  for (const dv of DESVIOS) {
    const achados = limpo.match(dv.regex);
    if (achados) {
      erros += achados.length;
      for (const trecho of achados.slice(0, 2)) desvios.push({ trecho: trecho.trim(), correcao: dv.correcao, explicacao: dv.explicacao });
    }
  }

  const conteudo = apresentacao + topicos.reduce((s, t) => s + t.pontos, 0);
  const nota = Math.max(0, Math.round((conteudo - (2 * erros) / linhas) * 100) / 100);
  if (limpo.split(/\s+/).length < 60) {
    observacoes.unshift("Texto insuficiente para avaliação: nas bancas, textos muito curtos ou fora do tema recebem nota zero.");
  }

  return {
    id: crypto.randomUUID(),
    tipo: "discursiva",
    trilha,
    data: new Date().toISOString(),
    texto: limpo,
    linhas,
    conteudo,
    erros,
    nota: limpo.split(/\s+/).length < 60 ? 0 : nota,
    topicos,
    desvios: desvios.slice(0, 12),
    observacoes,
  };
}

export interface LinhaRankingConcurso {
  username: string;
  nome: string;
  pfObjetiva: number | null;
  pfDiscursiva: number | null;
  rfbObjetiva: number | null;
  rfbDiscursiva: number | null;
}

/** Melhor resultado de cada parte. A lista vem da mais nova para a mais antiga. */
export function linhaRankingConcurso(username: string, nome: string, lista: ResultadoConcurso[]): LinhaRankingConcurso {
  const melhor = (trilha: Trilha, tipo: "objetiva" | "discursiva") => {
    const notas = lista.filter((r) => r.trilha === trilha && r.tipo === tipo).map((r) => r.nota);
    return notas.length ? Math.max(...notas) : null;
  };
  return {
    username,
    nome,
    pfObjetiva: melhor("PF", "objetiva"),
    pfDiscursiva: melhor("PF", "discursiva"),
    rfbObjetiva: melhor("RFB", "objetiva"),
    rfbDiscursiva: melhor("RFB", "discursiva"),
  };
}
