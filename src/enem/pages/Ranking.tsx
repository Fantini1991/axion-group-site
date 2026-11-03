import { useEffect, useState } from "react";
import { ranking } from "../api";
import { useEnem } from "../contexto";
import { PROVAS } from "../data/provas";
import type { LinhaRanking } from "../types";

type Criterio = "geral" | "P1" | "P2" | "P3" | "redacao" | "objetiva";

const valor = (l: LinhaRanking, c: Criterio) =>
  c === "geral"
    ? l.notaGeral
    : c === "redacao"
      ? l.melhorRedacao
      : c === "objetiva"
        ? l.melhorMedia
        : l.porProva[c]?.nota ?? 0;

const MEDALHAS = ["🥇", "🥈", "🥉"];

function CelulaProva({ l, id, destaque }: { l: LinhaRanking; id: string; destaque: boolean }) {
  const p = l.porProva[id];
  if (!p || (p.objetiva === null && p.redacao === null)) return <td className="num sub">—</td>;
  return (
    <td className="num" style={{ fontWeight: destaque ? 800 : 400 }}>
      {p.nota.toFixed(1)}
      <span className="sub" style={{ display: "block", fontSize: 11, fontWeight: 400 }}>
        obj {p.objetiva?.toFixed(0) ?? "—"} · red {p.redacao ?? "—"}
      </span>
    </td>
  );
}

export default function Ranking() {
  const { usuario, status } = useEnem();
  const [linhas, setLinhas] = useState<LinhaRanking[] | null>(null);
  const [erro, setErro] = useState("");
  const [criterio, setCriterio] = useState<Criterio>("geral");

  useEffect(() => {
    ranking().then(setLinhas).catch((e) => setErro(e.message));
  }, []);

  const ordenadas = linhas ? [...linhas].sort((a, b) => valor(b, criterio) - valor(a, criterio)) : [];
  const abas: { id: Criterio; nome: string }[] = [
    { id: "geral", nome: "Geral" },
    ...PROVAS.map((p) => ({ id: p.id, nome: p.nome })),
    { id: "redacao", nome: "Melhor redação" },
    { id: "objetiva", nome: "Melhor objetiva" },
  ];

  return (
    <>
      <h1>🏆 Ranking</h1>
      <p className="sub" style={{ marginBottom: 16 }}>
        A nota de cada prova segue a média usada no SISU: <strong>(objetiva × 4 + redação) ÷ 5</strong>. A <strong>nota geral</strong>{" "}
        é a média das 3 provas — prova ou redação não feita conta como zero. Vale sempre a 1ª tentativa.
      </p>
      {status.modo === "local" && (
        <div className="enem-aviso">Modo local: o ranking mostra apenas as contas criadas neste navegador.</div>
      )}

      <div className="enem-abas">
        {abas.map((a) => (
          <button key={a.id} className={criterio === a.id ? "ativo" : ""} onClick={() => setCriterio(a.id)}>{a.nome}</button>
        ))}
      </div>
      {(criterio === "redacao" || criterio === "objetiva") && (
        <p className="sub" style={{ fontSize: 13, marginBottom: 10 }}>
          Esta aba considera a melhor nota de qualquer tentativa, incluindo treinos.
        </p>
      )}

      {erro && <div className="enem-erro">{erro}</div>}
      {!linhas && !erro && <p className="sub">Carregando…</p>}
      {linhas && linhas.length === 0 && <p className="sub">Ninguém fez prova ainda. Seja o primeiro!</p>}

      {linhas && linhas.length > 0 && (
        <div className="enem-card enem-rolagem">
          <table className="enem-tabela">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th className="num">Geral</th>
                {PROVAS.map((p) => <th key={p.id} className="num">{p.nome}</th>)}
                <th className="num">Melhor redação</th>
              </tr>
            </thead>
            <tbody>
              {ordenadas.map((l, i) => (
                <tr key={l.username} className={l.username === usuario?.username ? "eu" : ""}>
                  <td style={{ fontWeight: 800 }}>{MEDALHAS[i] ?? i + 1}</td>
                  <td>
                    <strong>{l.nome}</strong>
                    <span className="sub" style={{ fontSize: 12, display: "block" }}>@{l.username}</span>
                  </td>
                  <td className="num" style={{ fontWeight: criterio === "geral" ? 800 : 400 }}>{l.notaGeral.toFixed(1)}</td>
                  {PROVAS.map((p) => <CelulaProva key={p.id} l={l} id={p.id} destaque={criterio === p.id} />)}
                  <td className="num" style={{ fontWeight: criterio === "redacao" ? 800 : 400 }}>{l.melhorRedacao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
