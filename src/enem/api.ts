import { linhaDoRanking } from "./ranking";
import { type CorrecaoRedacao, type LinhaRanking, type ResultadoProva, type ResultadoRedacao, type Usuario } from "./types";

/**
 * Camada de dados do simulado.
 * - Modo "online": usa /api/enem (Vercel + Redis). Todos veem o mesmo ranking, de qualquer aparelho.
 * - Modo "local": se o servidor não tiver armazenamento configurado (ou em desenvolvimento),
 *   os dados ficam no navegador deste aparelho. Útil para testar ou para um computador compartilhado.
 */

export interface StatusServidor {
  modo: "online" | "local";
  ia: boolean;
  convite: boolean;
}

const CHAVE_SESSAO = "enem:sessao";
const L = "enem-local:";

interface Sessao {
  token: string;
  usuario: Usuario;
}

function ler<T>(chave: string, padrao: T): T {
  try {
    const v = localStorage.getItem(chave);
    return v ? (JSON.parse(v) as T) : padrao;
  } catch {
    return padrao;
  }
}
function gravar(chave: string, valor: unknown) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    /* armazenamento indisponível */
  }
}

export class ErroApi extends Error {
  status: number;
  constructor(mensagem: string, status: number) {
    super(mensagem);
    this.status = status;
  }
}

let statusCache: Promise<StatusServidor> | null = null;

export function obterStatus(): Promise<StatusServidor> {
  statusCache ??= (async () => {
    try {
      const r = await fetch("/api/enem?action=status");
      const tipo = r.headers.get("content-type") || "";
      if (!r.ok || !tipo.includes("application/json")) throw new Error("sem api");
      const j = (await r.json()) as { armazenamento: boolean; ia: boolean; convite: boolean };
      return { modo: j.armazenamento ? "online" : "local", ia: j.armazenamento && j.ia, convite: j.convite };
    } catch {
      return { modo: "local", ia: false, convite: false };
    }
  })();
  return statusCache;
}

export function sessaoAtual(): Sessao | null {
  return ler<Sessao | null>(CHAVE_SESSAO, null);
}

async function chamar<T>(action: string, dados: Record<string, unknown> = {}): Promise<T> {
  const sessao = sessaoAtual();
  const r = await fetch("/api/enem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(sessao ? { Authorization: `Bearer ${sessao.token}` } : {}),
    },
    body: JSON.stringify({ action, ...dados }),
  });
  const j = (await r.json().catch(() => ({}))) as T & { error?: string };
  if (!r.ok) throw new ErroApi(j.error || "Não foi possível falar com o servidor.", r.status);
  return j;
}

// ---------- Modo local ----------

interface UsuarioLocal {
  nome: string;
  salt: string;
  hash: string;
}

async function sha256(texto: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(texto));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

const usuariosLocais = () => ler<Record<string, UsuarioLocal>>(`${L}usuarios`, {});

// ---------- API pública ----------

/** Deixa o usuário no formato aceito: sem acentos, sem espaços, minúsculo (ex.: "João Pedro" → "joao.pedro"). */
export function normalizarUsuario(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, ".")
    .replace(/[^a-z0-9_.]/g, "")
    .replace(/\.{2,}/g, ".")
    .replace(/^\./, "")
    .slice(0, 20);
}

/** Versão final, usada ao enviar: também tira o ponto do fim ("joao." → "joao"). */
function usuarioFinal(texto: string): string {
  return normalizarUsuario(texto).replace(/\.+$/, "");
}

function validar(nome: string, username: string, senha: string) {
  if (nome.trim().length < 2) throw new ErroApi("Informe seu nome.", 400);
  if (!/^[a-z0-9_.]{3,20}$/.test(username)) {
    throw new ErroApi("Escolha um usuário com pelo menos 3 letras ou números.", 400);
  }
  if (senha.length < 4) throw new ErroApi("A senha deve ter pelo menos 4 caracteres.", 400);
}

export async function cadastrar(nome: string, username: string, senha: string, convite: string): Promise<Usuario> {
  username = usuarioFinal(username);
  validar(nome, username, senha);
  const { modo } = await obterStatus();
  let sessao: Sessao;
  if (modo === "online") {
    sessao = await chamar<Sessao>("cadastrar", { nome, username, senha, convite });
  } else {
    const usuarios = usuariosLocais();
    if (usuarios[username]) throw new ErroApi("Esse nome de usuário já existe. Escolha outro.", 409);
    const salt = crypto.randomUUID();
    usuarios[username] = { nome: nome.trim(), salt, hash: await sha256(salt + senha) };
    gravar(`${L}usuarios`, usuarios);
    sessao = { token: "local", usuario: { username, nome: nome.trim() } };
  }
  gravar(CHAVE_SESSAO, sessao);
  return sessao.usuario;
}

export async function entrar(username: string, senha: string): Promise<Usuario> {
  username = usuarioFinal(username);
  const { modo } = await obterStatus();
  let sessao: Sessao;
  if (modo === "online") {
    sessao = await chamar<Sessao>("entrar", { username, senha });
  } else {
    const u = usuariosLocais()[username];
    if (!u || (await sha256(u.salt + senha)) !== u.hash) throw new ErroApi("Usuário ou senha incorretos.", 401);
    sessao = { token: "local", usuario: { username, nome: u.nome } };
  }
  gravar(CHAVE_SESSAO, sessao);
  return sessao.usuario;
}

export async function sair() {
  const { modo } = await obterStatus();
  if (modo === "online") await chamar("sair").catch(() => undefined);
  try {
    localStorage.removeItem(CHAVE_SESSAO);
  } catch {
    /* ignore */
  }
}

/** Confere se a sessão salva ainda vale. */
export async function validarSessao(): Promise<Usuario | null> {
  const sessao = sessaoAtual();
  if (!sessao) return null;
  const { modo } = await obterStatus();
  if (modo === "local") return sessao.token === "local" ? sessao.usuario : null;
  try {
    const { usuario } = await chamar<{ usuario: Usuario }>("eu");
    return usuario;
  } catch (e) {
    if (e instanceof ErroApi && e.status === 401) {
      localStorage.removeItem(CHAVE_SESSAO);
      return null;
    }
    return sessao.usuario;
  }
}

function usuarioLogado(): Usuario {
  const s = sessaoAtual();
  if (!s) throw new ErroApi("Entre novamente.", 401);
  return s.usuario;
}

async function salvar(tipo: "provas" | "redacoes", resultado: ResultadoProva | ResultadoRedacao) {
  const { modo } = await obterStatus();
  if (modo === "online") {
    await chamar(tipo === "provas" ? "salvarProva" : "salvarRedacao", { resultado });
    return;
  }
  const chave = `${L}${tipo}:${usuarioLogado().username}`;
  gravar(chave, [resultado, ...ler<unknown[]>(chave, [])].slice(0, 200));
}

export const salvarProva = (r: ResultadoProva) => salvar("provas", r);
export const salvarRedacao = (r: ResultadoRedacao) => salvar("redacoes", r);

export async function historico(): Promise<{ provas: ResultadoProva[]; redacoes: ResultadoRedacao[] }> {
  const { modo } = await obterStatus();
  if (modo === "online") return chamar("historico");
  const u = usuarioLogado().username;
  return { provas: ler(`${L}provas:${u}`, []), redacoes: ler(`${L}redacoes:${u}`, []) };
}

export async function ranking(): Promise<LinhaRanking[]> {
  const { modo } = await obterStatus();
  if (modo === "online") return (await chamar<{ linhas: LinhaRanking[] }>("ranking")).linhas;
  return Object.entries(usuariosLocais())
    .map(([username, u]) =>
      linhaDoRanking(
        username,
        u.nome,
        ler<ResultadoProva[]>(`${L}provas:${username}`, []),
        ler<ResultadoRedacao[]>(`${L}redacoes:${username}`, []),
      ),
    )
    .sort((a, b) => b.notaGeral - a.notaGeral);
}

export async function corrigirComIA(tema: string, textosMotivadores: string, texto: string): Promise<CorrecaoRedacao> {
  const { correcao } = await chamar<{ correcao: CorrecaoRedacao }>("corrigirRedacao", { tema, textosMotivadores, texto });
  return correcao;
}
