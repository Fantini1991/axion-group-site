import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { historico } from "../api";
import { useEnem } from "../contexto";
import { buscarProva } from "../data/provas";
import { AREAS, type ResultadoProva, type ResultadoRedacao } from "../types";

const dataBR = (iso: string) =>
  new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

export default function Painel() {
  const { usuario, status } = useEnem();
  const [dados, setDados] = useState<{ provas: ResultadoProva[]; redacoes: ResultadoRedacao[] } | null>(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    historico().then(setDados).catch((e) => setErro(e.message));
  }, []);

  const primeiroNome = usuario?.nome.split(" ")[0];

  return (
    <>
      <h1>Olá, {primeiroNome}! 👋</h1>
      <p className="sub" style={{ marginBottom: 20 }}>Escolha o que você quer treinar hoje.</p>
      {status.modo === "local" && (
        <div className="enem-aviso">Modo local: seus resultados ficam salvos apenas neste navegador.</div>
      )}

      <div className="enem-grid">
        <div className="enem-card">
          <h3>📝 Provas 1, 2 e 3</h3>
          <p className="sub" style={{ marginBottom: 14 }}>
            3 provas com eixos atuais (tecnologia, clima, cidadania), cada uma com 20 questões e um tema de redação. São elas que
            contam para o ranking.
          </p>
          <Link to="/enem/prova" className="enem-btn">Ir para as provas</Link>
        </div>
        <div className="enem-card">
          <h3>✍️ Treino de redação</h3>
          <p className="sub" style={{ marginBottom: 14 }}>
            Temas inéditos e os temas oficiais de 2016 a 2025, com correção nas 5 competências.
          </p>
          <Link to="/enem/redacao" className="enem-btn sec">Treinar redação</Link>
        </div>
        <div className="enem-card">
          <h3>📚 ENEM anteriores</h3>
          <p className="sub" style={{ marginBottom: 14 }}>Provas e temas de redação de 2022 a 2025, para consultar e treinar.</p>
          <Link to="/enem/anteriores" className="enem-btn sec">Ver edições</Link>
        </div>
        <div className="enem-card">
          <h3>🏆 Ranking</h3>
          <p className="sub" style={{ marginBottom: 14 }}>Veja quem tirou as melhores notas entre você e seus amigos.</p>
          <Link to="/enem/ranking" className="enem-btn sec">Ver ranking</Link>
        </div>
      </div>

      <h2>Suas provas</h2>
      {erro && <div className="enem-erro">{erro}</div>}
      {!dados ? (
        <p className="sub">Carregando…</p>
      ) : dados.provas.length === 0 ? (
        <p className="sub">Você ainda não fez nenhuma prova.</p>
      ) : (
        <div className="enem-card enem-rolagem">
          <table className="enem-tabela">
            <thead>
              <tr>
                <th>Data</th>
                <th>Prova</th>
                {AREAS.map((a) => <th key={a.id} className="num">{a.curto}</th>)}
                <th className="num">Média</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dados.provas.map((p) => (
                <tr key={p.id}>
                  <td>{dataBR(p.data)}</td>
                  <td>{buscarProva(p.provaId)?.nome ?? "Treino"}</td>
                  {AREAS.map((a) => <td key={a.id} className="num">{p.notas[a.id].toFixed(0)}</td>)}
                  <td className="num"><strong>{p.media.toFixed(1)}</strong></td>
                  <td><Link to={`/enem/prova/resultado/${p.id}`} style={{ color: "var(--e-primaria)", fontWeight: 600 }}>Ver correção</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2>Suas redações</h2>
      {!dados ? (
        <p className="sub">Carregando…</p>
      ) : dados.redacoes.length === 0 ? (
        <p className="sub">Você ainda não escreveu nenhuma redação.</p>
      ) : (
        <div className="enem-card enem-rolagem">
          <table className="enem-tabela">
            <thead>
              <tr>
                <th>Data</th>
                <th>Tema</th>
                <th className="num">Nota</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dados.redacoes.map((r) => (
                <tr key={r.id}>
                  <td>{dataBR(r.data)}</td>
                  <td>{r.provaId ? `${buscarProva(r.provaId)?.nome}: ` : ""}{r.temaTitulo}</td>
                  <td className="num"><strong>{r.correcao.notaTotal}</strong></td>
                  <td><Link to={`/enem/redacao/resultado/${r.id}`} style={{ color: "var(--e-primaria)", fontWeight: 600 }}>Ver correção</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
