import { AREAS, type LinhaRanking, type ResultadoProva, type ResultadoRedacao } from "./types";

export const IDS_PROVAS = ["P1", "P2", "P3"] as const;

/**
 * Monta a linha do ranking de um aluno. As listas vêm da mais nova para a mais antiga.
 * Nas provas oficiais vale só a 1ª tentativa (refazer depois de ver o gabarito não conta).
 * Mesma regra usada em api/enem.ts.
 */
export function linhaDoRanking(
  username: string,
  nome: string,
  provas: ResultadoProva[],
  redacoes: ResultadoRedacao[],
): LinhaRanking {
  const primeira = <T extends { provaId?: string }>(lista: T[], id: string) =>
    [...lista].reverse().find((x) => x.provaId === id);
  const porProva: LinhaRanking["porProva"] = {};
  for (const id of IDS_PROVAS) {
    const objetiva = primeira(provas, id)?.media ?? null;
    const redacao = primeira(redacoes, id)?.correcao.notaTotal ?? null;
    porProva[id] = { objetiva, redacao, nota: Math.round((((objetiva ?? 0) * 4 + (redacao ?? 0)) / 5) * 10) / 10 };
  }
  const notaGeral =
    Math.round((IDS_PROVAS.reduce((s, id) => s + porProva[id].nota, 0) / IDS_PROVAS.length) * 10) / 10;
  return {
    username,
    nome,
    simulados: provas.length,
    redacoes: redacoes.length,
    melhorMedia: Math.max(0, ...provas.map((p) => p.media)),
    melhorRedacao: Math.max(0, ...redacoes.map((r) => r.correcao.notaTotal)),
    melhoresAreas: Object.fromEntries(
      AREAS.map((a) => [a.id, Math.max(0, ...provas.map((p) => p.notas[a.id] ?? 0))]),
    ) as LinhaRanking["melhoresAreas"],
    porProva,
    notaGeral,
  };
}
