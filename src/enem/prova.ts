import { AREAS, type Area, type Questao, type RespostaProva, type ResultadoProva } from "./types";
import { linguagens } from "./data/linguagens";
import { humanas } from "./data/humanas";
import { natureza } from "./data/natureza";
import { matematica } from "./data/matematica";
import { atuais } from "./data/atuais";
import { buscarProva } from "./data/provas";

export const BANCO: Questao[] = [...linguagens, ...humanas, ...natureza, ...matematica, ...atuais];

const porId = new Map(BANCO.map((q) => [q.id, q]));
export const buscarQuestao = (id: string) => porId.get(id);

export const QUESTOES_POR_AREA = { rapido: 5, completo: 10 } as const;

function embaralhar<T>(lista: T[]): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/** Questões de uma prova oficial: ordem fixa, igual para todos. */
export function questoesDaProva(provaId: string): Questao[] {
  const prova = buscarProva(provaId);
  if (!prova) return [];
  const qs = prova.questoes.map((id) => porId.get(id)).filter((q): q is Questao => Boolean(q));
  return AREAS.flatMap(({ id }) => qs.filter((q) => q.area === id).sort((a, b) => a.dificuldade - b.dificuldade));
}

/** Sorteia questões de cada área, mantendo a ordem das áreas como no ENEM. */
export function montarProva(modo: "rapido" | "completo"): Questao[] {
  const n = QUESTOES_POR_AREA[modo];
  return AREAS.flatMap(({ id }) => {
    const sorteadas = embaralhar(BANCO.filter((q) => q.area === id)).slice(0, n);
    // Dentro da área, das mais fáceis para as mais difíceis.
    return sorteadas.sort((a, b) => a.dificuldade - b.dificuldade);
  });
}

/**
 * Nota estimada de 0 a 1000 por área, inspirada na TRI do ENEM:
 * - questões difíceis valem mais;
 * - acertar difíceis errando fáceis é sinal de "chute" e gera penalidade de coerência.
 * É uma aproximação — a TRI oficial usa parâmetros calibrados com milhões de candidatos.
 */
export function notaDaArea(questoes: Questao[], respostas: Map<string, number | null>): number {
  if (questoes.length === 0) return 0;
  let pesoTotal = 0;
  let pesoAcertos = 0;
  const acertosPorNivel = { 1: [0, 0], 2: [0, 0], 3: [0, 0] } as Record<1 | 2 | 3, [number, number]>;
  for (const q of questoes) {
    const peso = q.dificuldade;
    pesoTotal += peso;
    acertosPorNivel[q.dificuldade][1]++;
    if (respostas.get(q.id) === q.correta) {
      pesoAcertos += peso;
      acertosPorNivel[q.dificuldade][0]++;
    }
  }
  const taxa = (n: 1 | 2 | 3) => (acertosPorNivel[n][1] ? acertosPorNivel[n][0] / acertosPorNivel[n][1] : null);
  const facil = taxa(1);
  const dificil = taxa(3);
  let penalidade = 0;
  if (facil !== null && dificil !== null && dificil > facil) penalidade = (dificil - facil) * 60;

  const nota = 300 + 600 * (pesoAcertos / pesoTotal) - penalidade;
  return Math.round(Math.max(0, Math.min(1000, nota)) * 10) / 10;
}

export function corrigirProva(
  questoes: Questao[],
  respostas: RespostaProva[],
  modo: ResultadoProva["modo"],
  duracaoSeg: number,
  provaId?: string,
): ResultadoProva {
  const mapa = new Map(respostas.map((r) => [r.questaoId, r.resposta]));
  const notas = {} as Record<Area, number>;
  const acertos = {} as ResultadoProva["acertos"];
  for (const { id } of AREAS) {
    const daArea = questoes.filter((q) => q.area === id);
    notas[id] = notaDaArea(daArea, mapa);
    acertos[id] = { acertos: daArea.filter((q) => mapa.get(q.id) === q.correta).length, total: daArea.length };
  }
  const media = Math.round((AREAS.reduce((s, a) => s + notas[a.id], 0) / AREAS.length) * 10) / 10;
  return {
    id: crypto.randomUUID(),
    data: new Date().toISOString(),
    modo,
    ...(provaId ? { provaId } : {}),
    respostas: questoes.map((q) => ({ questaoId: q.id, resposta: mapa.get(q.id) ?? null })),
    notas,
    acertos,
    media,
    duracaoSeg,
  };
}

export const LETRAS = ["A", "B", "C", "D", "E"];
