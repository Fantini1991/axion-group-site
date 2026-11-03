import { useEffect, useState } from "react";
import { ranking } from "../api";
import { useEnem } from "../contexto";
import { AREAS, type Area, type LinhaRanking } from "../types";

type Criterio = "geral" | "objetiva" | "redacao" | Area;

const valor = (l: LinhaRanking, c: Criterio) =>
  c === "geral" ? l.notaGeral : c === "objetiva" ? l.melhorMedia : c === "redacao" ? l.melhorRedacao : l.melhoresAreas[c] ?? 0;

const MEDALHAS = ["🥇", "🥈", "🥉"];

export default function Ranking() {
  const { usuario, status } = useEnem();
  const [linhas, setLinhas] = useState<LinhaRanking[] | null>(null);
  const [erro, setErro] = useState("");
  const [criterio, setCriterio] = useState<Criterio>("geral");

  useEffect(() => {
    ranking().then(setLinhas).catch((e) => setErro(e.message));
  }, []);

  const areaSel = AREAS.find((a) => a.id === criterio);
  const ordenadas = linhas ? [...linhas].sort((a, b) => valor(b, criterio) - valor(a, criterio)) : [];

  return (
    <>
      <h1>🏆 Ranking</h1>
      <p className="sub" style={{ marginBottom: 16 }}>
        A <strong>nota geral</strong> segue a média simples usada no SISU: (melhor média das 4 áreas × 4 + melhor redação) ÷ 5.
        Quem ainda não fez redação conta com zero nela.
      </p>
      {status.modo === "local" && (
        <div className="enem-aviso">Modo local: o ranking mostra apenas as contas criadas neste navegador.</div>
      )}

      <div className="enem-abas">
        <button className={criterio === "geral" ? "ativo" : ""} onClick={() => setCriterio("geral")}>Geral</button>
        <button className={criterio === "objetiva" ? "ativo" : ""} onClick={() => setCriterio("objetiva")}>Prova objetiva</button>
        <button className={criterio === "redacao" ? "ativo" : ""} onClick={() => setCriterio("redacao")}>Redação</button>
        {AREAS.map((a) => (
          <button key={a.id} className={criterio === a.id ? "ativo" : ""} onClick={() => setCriterio(a.id)}>{a.curto}</button>
        ))}
      </div>

      {erro && <div className="enem-erro">{erro}</div>}
      {!linhas && !erro && <p className="sub">Carregando…</p>}
      {linhas && linhas.length === 0 && <p className="sub">Ninguém fez simulado ainda. Seja o primeiro!</p>}

      {linhas && linhas.length > 0 && (
        <div className="enem-card enem-rolagem">
          <table className="enem-tabela">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                {areaSel && <th className="num">{areaSel.curto}</th>}
                <th className="num">Geral</th>
                <th className="num">Objetiva</th>
                <th className="num">Redação</th>
                <th className="num">Simulados</th>
                <th className="num">Redações</th>
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
                  {areaSel && <td className="num" style={{ fontWeight: 800 }}>{valor(l, criterio).toFixed(1)}</td>}
                  <td className="num" style={{ fontWeight: criterio === "geral" ? 800 : 400 }}>{l.notaGeral.toFixed(1)}</td>
                  <td className="num" style={{ fontWeight: criterio === "objetiva" ? 800 : 400 }}>{l.melhorMedia.toFixed(1)}</td>
                  <td className="num" style={{ fontWeight: criterio === "redacao" ? 800 : 400 }}>{l.melhorRedacao}</td>
                  <td className="num">{l.simulados}</td>
                  <td className="num">{l.redacoes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
