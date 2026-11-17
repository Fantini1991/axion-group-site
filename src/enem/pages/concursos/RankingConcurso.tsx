import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { rankingConcurso } from "../../api";
import { useEnem } from "../../contexto";
import type { LinhaRankingConcurso } from "../../concursos/logica";
import { ITENS_PF, QUESTOES_RFB_SIMULADO } from "../../concursos/dados";

type Criterio = "pfObjetiva" | "pfDiscursiva" | "rfbObjetiva" | "rfbDiscursiva";

const ABAS: { id: Criterio; nome: string }[] = [
  { id: "pfObjetiva", nome: "PF — objetiva" },
  { id: "pfDiscursiva", nome: "PF — discursiva" },
  { id: "rfbObjetiva", nome: "Receita — objetiva" },
  { id: "rfbDiscursiva", nome: "Receita — discursiva" },
];

const fmt = (v: number | null, discursiva: boolean) => (v === null ? "—" : discursiva ? v.toFixed(2) : String(v));
const MEDALHAS = ["🥇", "🥈", "🥉"];

export default function RankingConcurso() {
  const { usuario } = useEnem();
  const [linhas, setLinhas] = useState<LinhaRankingConcurso[] | null>(null);
  const [erro, setErro] = useState("");
  const [criterio, setCriterio] = useState<Criterio>("pfObjetiva");

  useEffect(() => {
    rankingConcurso().then(setLinhas).catch((e) => setErro(e.message));
  }, []);

  const ordenadas = (linhas ?? []).filter((l) => l[criterio] !== null).sort((a, b) => (b[criterio] ?? 0) - (a[criterio] ?? 0));

  return (
    <>
      <h1>🏆 Ranking dos concursos</h1>
      <p className="sub" style={{ marginBottom: 16 }}>
        Melhor resultado de cada pessoa nos simulados inéditos. PF objetiva: nota líquida (acertos − erros, de {ITENS_PF.length}). Receita objetiva: acertos (de {QUESTOES_RFB_SIMULADO.length}).
        Discursivas: nota de 0 a 10.
      </p>
      <div className="enem-abas">
        {ABAS.map((a) => (
          <button key={a.id} className={criterio === a.id ? "ativo" : ""} onClick={() => setCriterio(a.id)}>{a.nome}</button>
        ))}
      </div>
      {erro && <div className="enem-erro">{erro}</div>}
      {!linhas && !erro && <p className="sub">Carregando…</p>}
      {linhas && ordenadas.length === 0 && <p className="sub">Ninguém fez esta parte ainda. Seja o primeiro!</p>}
      {ordenadas.length > 0 && (
        <div className="enem-card enem-rolagem">
          <table className="enem-tabela">
            <thead>
              <tr>
                <th>#</th><th>Nome</th>
                <th className="num">PF obj.</th><th className="num">PF disc.</th>
                <th className="num">Receita obj.</th><th className="num">Receita disc.</th>
              </tr>
            </thead>
            <tbody>
              {ordenadas.map((l, i) => (
                <tr key={l.username} className={l.username === usuario?.username ? "eu" : ""}>
                  <td style={{ fontWeight: 800 }}>{MEDALHAS[i] ?? i + 1}</td>
                  <td><strong>{l.nome}</strong><span className="sub" style={{ fontSize: 12, display: "block" }}>@{l.username}</span></td>
                  {(["pfObjetiva", "pfDiscursiva", "rfbObjetiva", "rfbDiscursiva"] as Criterio[]).map((c) => (
                    <td key={c} className="num" style={{ fontWeight: c === criterio ? 800 : 400 }}>{fmt(l[c], c.endsWith("Discursiva"))}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="enem-linha" style={{ marginTop: 16 }}>
        <Link to="/enem/concursos" className="enem-btn sec">Voltar aos concursos</Link>
      </div>
    </>
  );
}
