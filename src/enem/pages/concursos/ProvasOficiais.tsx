import { useState } from "react";
import { Link } from "react-router-dom";
import { TRILHAS, type Trilha } from "../../concursos/dados";
import { PROVAS_OFICIAIS } from "../../concursos/provasOficiais";

/** Soma, por matéria, quantos itens caíram em todas as provas oficiais de um concurso. */
function raioX(trilha: Trilha) {
  const provas = PROVAS_OFICIAIS.filter((p) => p.trilha === trilha);
  const mapa = new Map<string, { total: number; porProva: Record<string, number> }>();
  for (const p of provas) {
    for (const m of p.materias) {
      const e = mapa.get(m.nome) ?? { total: 0, porProva: {} };
      const n = m.ate - m.de + 1;
      e.total += n;
      e.porProva[p.id] = (e.porProva[p.id] ?? 0) + n;
      mapa.set(m.nome, e);
    }
  }
  const totalGeral = [...mapa.values()].reduce((s, e) => s + e.total, 0);
  return {
    provas,
    linhas: [...mapa.entries()]
      .map(([nome, e]) => ({ nome, ...e, pct: (e.total / totalGeral) * 100 }))
      .sort((a, b) => b.total - a.total),
  };
}

export default function ProvasOficiais() {
  const [trilha, setTrilha] = useState<Trilha>("PF");
  const info = TRILHAS[trilha];
  const { provas, linhas } = raioX(trilha);
  const max = Math.max(...linhas.map((l) => l.total));

  return (
    <>
      <h1>Provas oficiais anteriores</h1>
      <p className="sub" style={{ marginBottom: 16 }}>
        As provas que já caíram, com o caderno e o gabarito oficial das bancas. Resolva pelo PDF e marque suas respostas no
        cartão-resposta: a correção usa o <strong>gabarito definitivo oficial</strong> e mostra seu desempenho por matéria.
      </p>

      <div className="enem-abas">
        {(Object.keys(TRILHAS) as Trilha[]).map((t) => (
          <button key={t} className={trilha === t ? "ativo" : ""} onClick={() => setTrilha(t)}>{TRILHAS[t].nome}</button>
        ))}
      </div>

      <div style={{ display: "grid", gap: 14 }}>
        {provas.map((p) => (
          <div key={p.id} className="enem-card">
            <div className="enem-entre">
              <div>
                <span className="enem-tag" style={{ background: `${info.cor}18`, color: info.cor }}>{p.banca} · {p.ano}</span>
                <h3 style={{ marginTop: 8, marginBottom: 2 }}>{p.cargo}</h3>
                <p className="sub" style={{ fontSize: 13 }}>
                  {p.gabarito.length} {p.formato === "CE" ? "itens de certo/errado" : "questões de A a E"} ·{" "}
                  {[...p.gabarito].filter((g) => g === "X" || g === "*").length} anulado(s)
                </p>
              </div>
              <Link to={`/enem/concursos/oficial/${p.id}`} className="enem-btn" style={{ padding: "9px 14px", fontSize: 14 }}>
                📝 Responder no cartão
              </Link>
            </div>
            <div className="enem-linha" style={{ gap: 8, marginTop: 10, fontSize: 14 }}>
              {p.cadernos.map((c) => (
                <a key={c.url} href={c.url} target="_blank" rel="noopener noreferrer" className="enem-btn sec" style={{ padding: "6px 12px", fontSize: 13 }}>
                  📄 {c.nome} ↗
                </a>
              ))}
              {p.gabaritos.map((g) => (
                <a key={g.url} href={g.url} target="_blank" rel="noopener noreferrer" className="enem-btn sec" style={{ padding: "6px 12px", fontSize: 13 }}>
                  ✅ {g.nome} ↗
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2>📊 Raio-X: o que mais cai ({info.nome})</h2>
      <p className="sub" style={{ marginBottom: 12 }}>
        Quantidade de itens por matéria somando as provas acima. Use para decidir onde investir seu tempo de estudo. Os
        simulados inéditos seguem essas mesmas matérias e a mesma ordem.
      </p>
      <div className="enem-card enem-rolagem">
        <table className="enem-tabela">
          <thead>
            <tr>
              <th>Matéria</th>
              {provas.map((p) => <th key={p.id} className="num" style={{ whiteSpace: "nowrap" }}>{p.ano} {p.cargo.split(" ")[0].replace(/—.*/, "")}{p.id.includes("P1") ? " P1" : p.id.includes("P2") ? " P2" : ""}</th>)}
              <th className="num">Total</th>
              <th style={{ minWidth: 120 }}>Peso</th>
            </tr>
          </thead>
          <tbody>
            {linhas.map((l) => (
              <tr key={l.nome}>
                <td>{l.nome}</td>
                {provas.map((p) => <td key={p.id} className="num">{l.porProva[p.id] ?? "—"}</td>)}
                <td className="num"><strong>{l.total}</strong></td>
                <td>
                  <div className="enem-barra" title={`${l.pct.toFixed(1)}%`}>
                    <div style={{ width: `${(l.total / max) * 100}%`, background: info.cor }} />
                  </div>
                  <span className="sub" style={{ fontSize: 12 }}>{l.pct.toFixed(1)}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="enem-linha" style={{ marginTop: 16 }}>
        <Link to={`/enem/concursos/prova/${trilha}`} className="enem-btn">Fazer simulado inédito de {info.nome}</Link>
        <Link to="/enem/concursos" className="enem-btn sec">Voltar</Link>
      </div>
      <p className="sub" style={{ fontSize: 13, marginTop: 14 }}>
        Fontes: cadernos e gabaritos definitivos publicados pelo Cebraspe (PF 2021 e 2025) e pela FGV (Receita Federal, prova de
        19/03/2023). Os arquivos abrem nos sites oficiais das bancas.
      </p>
    </>
  );
}
