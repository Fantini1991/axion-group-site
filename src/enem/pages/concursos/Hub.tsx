import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { historicoConcurso } from "../../api";
import { DISCURSIVAS, ITENS_PF, QUESTOES_RFB_SIMULADO, TRILHAS, type Trilha } from "../../concursos/dados";
import type { ResultadoConcurso } from "../../concursos/logica";
import { buscarProvaOficial } from "../../concursos/provasOficiais";

const dataBR = (iso: string) => new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });

export default function HubConcursos() {
  const [lista, setLista] = useState<ResultadoConcurso[] | null>(null);
  useEffect(() => {
    historicoConcurso().then(setLista).catch(() => setLista([]));
  }, []);

  const melhor = (t: Trilha, tipo: "objetiva" | "discursiva") => {
    const notas = (lista ?? []).filter((r) => r.trilha === t && r.tipo === tipo).map((r) => r.nota);
    return notas.length ? Math.max(...notas) : null;
  };

  return (
    <>
      <h1>Concursos federais</h1>
      <p className="sub" style={{ marginBottom: 16 }}>
        Treino para Polícia Federal e Receita Federal: provas oficiais anteriores com correção pelo gabarito oficial e simulados
        inéditos montados a partir delas, com gabarito comentado e discursiva corrigida.
      </p>

      <div className="enem-grid">
        {(Object.keys(TRILHAS) as Trilha[]).map((t) => {
          const info = TRILHAS[t];
          const obj = melhor(t, "objetiva");
          const disc = melhor(t, "discursiva");
          const total = t === "PF" ? ITENS_PF.length : QUESTOES_RFB_SIMULADO.length;
          return (
            <div key={t} className="enem-card">
              <span className="enem-tag" style={{ background: `${info.cor}18`, color: info.cor }}>{info.cargo}</span>
              <h3 style={{ marginTop: 8 }}>{info.nome}</h3>
              <p className="sub" style={{ fontSize: 14, marginBottom: 10 }}>{info.formato}</p>
              <p style={{ fontSize: 14 }}>
                Simulado inédito ({total} {t === "PF" ? "itens" : "questões"}):{" "}
                {obj === null ? <span className="sub">não feita</span> : <strong>{t === "PF" ? `${obj} pontos líquidos` : `${obj} acertos`}</strong>}
              </p>
              <p style={{ fontSize: 14, marginBottom: 12 }}>
                Discursiva: {disc === null ? <span className="sub">não feita</span> : <strong>{disc.toFixed(2)} / 10</strong>}
              </p>
              <div className="enem-linha" style={{ gap: 8 }}>
                <Link to={`/enem/concursos/prova/${t}`} className="enem-btn" style={{ padding: "9px 14px", fontSize: 14 }}>Simulado inédito</Link>
                <Link to={`/enem/concursos/discursiva/${t}`} className="enem-btn sec" style={{ padding: "9px 14px", fontSize: 14 }}>Discursiva</Link>
              </div>
              <p className="sub" style={{ fontSize: 13, marginTop: 10 }}>Tema da discursiva: {DISCURSIVAS[t].tema}</p>
            </div>
          );
        })}
      </div>

      <div className="enem-card" style={{ marginTop: 16 }}>
        <h3>📚 Provas oficiais anteriores</h3>
        <p className="sub" style={{ fontSize: 14, marginBottom: 10 }}>
          PF 2021 e 2025 (Cebraspe) e Receita 2023 (FGV): caderno e gabarito oficiais, cartão-resposta corrigido com o gabarito
          definitivo e o Raio-X das matérias que mais caem. Os simulados inéditos acima foram montados com base nelas.
        </p>
        <Link to="/enem/concursos/oficiais" className="enem-btn">Ver provas oficiais e Raio-X</Link>
      </div>

      <div className="enem-linha" style={{ marginTop: 16 }}>
        <Link to="/enem/concursos/ranking" className="enem-btn sec">🏆 Ranking dos concursos</Link>
      </div>

      <h2>Seu histórico</h2>
      {!lista ? (
        <p className="sub">Carregando…</p>
      ) : lista.length === 0 ? (
        <p className="sub">Você ainda não fez nenhuma prova de concurso.</p>
      ) : (
        <div className="enem-card enem-rolagem">
          <table className="enem-tabela">
            <thead>
              <tr><th>Data</th><th>Concurso</th><th>Parte</th><th className="num">Nota</th><th></th></tr>
            </thead>
            <tbody>
              {lista.map((r) => (
                <tr key={r.id}>
                  <td>{dataBR(r.data)}</td>
                  <td>{TRILHAS[r.trilha].nome}</td>
                  <td>{r.tipo === "objetiva" ? "Simulado inédito" : r.tipo === "discursiva" ? "Discursiva" : `Prova oficial ${buscarProvaOficial(r.provaId)?.ano ?? ""} — ${buscarProvaOficial(r.provaId)?.cargo ?? ""}`}</td>
                  <td className="num">
                    <strong>{r.tipo === "discursiva" ? `${r.nota.toFixed(2)} / 10` : r.trilha === "PF" ? `${r.nota} líq.` : `${r.nota}/${r.total}`}</strong>
                  </td>
                  <td><Link to={`/enem/concursos/resultado/${r.id}`} style={{ color: "var(--e-primaria)", fontWeight: 600 }}>Ver correção</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="sub" style={{ fontSize: 13, marginTop: 16 }}>
        As questões são inéditas, elaboradas a partir dos conteúdos dos editais e da legislação. Confira sempre o edital vigente do
        seu concurso: bancas, cargos e conteúdos mudam de uma edição para outra.
      </p>
    </>
  );
}
