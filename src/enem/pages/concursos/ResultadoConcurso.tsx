import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { historicoConcurso } from "../../api";
import { ITENS_PF, QUESTOES_RFB, TRILHAS } from "../../concursos/dados";
import type { ResultadoConcurso as Resultado, ResultadoDiscursiva, ResultadoObjetivaConcurso } from "../../concursos/logica";
import { LETRAS } from "../../prova";

export default function ResultadoConcurso() {
  const { id } = useParams();
  const location = useLocation();
  const doEstado = (location.state as { resultado?: Resultado } | null)?.resultado;
  const [resultado, setResultado] = useState<Resultado | null>(doEstado?.id === id ? doEstado ?? null : null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (resultado) return;
    historicoConcurso()
      .then((lista) => {
        const r = lista.find((x) => x.id === id);
        if (r) setResultado(r);
        else setErro("Resultado não encontrado.");
      })
      .catch((e) => setErro(e.message));
  }, [id, resultado]);

  if (erro) return <div className="enem-erro">{erro}</div>;
  if (!resultado) return <div className="enem-carregando">Carregando…</div>;

  return (
    <>
      {resultado.tipo === "objetiva" ? <Objetiva r={resultado} /> : <DiscursivaRes r={resultado} />}
      <div className="enem-linha" style={{ marginTop: 20 }}>
        <Link to="/enem/concursos" className="enem-btn">Voltar aos concursos</Link>
        <Link to="/enem/concursos/ranking" className="enem-btn sec">Ver ranking</Link>
      </div>
    </>
  );
}

function Objetiva({ r }: { r: ResultadoObjetivaConcurso }) {
  const [soErros, setSoErros] = useState(true);
  const info = TRILHAS[r.trilha];
  return (
    <>
      <h1>{info.nome} — resultado da objetiva</h1>
      <div className="enem-grid" style={{ margin: "16px 0" }}>
        <div className="enem-card">
          <p className="sub" style={{ fontSize: 14 }}>{r.trilha === "PF" ? "Nota líquida (acertos − erros)" : "Acertos"}</p>
          <div className="enem-nota-grande">{r.nota}</div>
          <p className="sub" style={{ fontSize: 13 }}>de {r.total}</p>
        </div>
        <div className="enem-card">
          <p className="enem-ok-txt">✔ {r.acertos} certas</p>
          <p className="enem-erro-txt">✘ {r.erros} erradas</p>
          <p className="sub">○ {r.brancos} em branco</p>
          {r.trilha === "PF" && r.erros > 0 && (
            <p className="sub" style={{ fontSize: 13, marginTop: 6 }}>No Cebraspe, cada erro anula um acerto. Na dúvida, deixar em branco pode ser melhor.</p>
          )}
        </div>
      </div>

      <div className="enem-abas">
        <button className={soErros ? "ativo" : ""} onClick={() => setSoErros(true)}>Só as que errei ou deixei em branco</button>
        <button className={!soErros ? "ativo" : ""} onClick={() => setSoErros(false)}>Todas</button>
      </div>

      {r.trilha === "PF"
        ? ITENS_PF.map((item, i) => {
            const resp = r.respostas[item.id] ?? null;
            const acertou = resp === item.gabarito;
            if (soErros && acertou) return null;
            return (
              <div key={item.id} className="enem-card" style={{ marginBottom: 12 }}>
                <div className="enem-entre">
                  <span className="sub" style={{ fontSize: 13 }}>{i + 1}. {item.materia}</span>
                  {acertou ? <span className="enem-ok-txt">✔ Acertou</span> : resp === null ? <span className="sub">Em branco</span> : <span className="enem-erro-txt">✘ Errou</span>}
                </div>
                <p style={{ margin: "8px 0" }}>{item.afirmacao}</p>
                <p style={{ fontSize: 14 }}>
                  Sua resposta: <strong>{resp === null ? "em branco" : resp === "C" ? "Certo" : "Errado"}</strong> · Gabarito:{" "}
                  <strong>{item.gabarito === "C" ? "CERTO" : "ERRADO"}</strong>
                </p>
                <div className="enem-info" style={{ marginTop: 8, marginBottom: 0 }}>
                  <strong>Por quê:</strong> {item.explicacao}
                  <br />
                  <span style={{ fontSize: 13 }}>📖 {item.fundamento}</span>
                </div>
              </div>
            );
          })
        : QUESTOES_RFB.map((q, i) => {
            const resp = (r.respostas[q.id] ?? null) as number | null;
            const acertou = resp === q.correta;
            if (soErros && acertou) return null;
            return (
              <div key={q.id} className="enem-card" style={{ marginBottom: 12 }}>
                <div className="enem-entre">
                  <span className="sub" style={{ fontSize: 13 }}>{i + 1}. {q.materia}</span>
                  {acertou ? <span className="enem-ok-txt">✔ Acertou</span> : resp === null ? <span className="sub">Em branco</span> : <span className="enem-erro-txt">✘ Errou</span>}
                </div>
                <p style={{ fontWeight: 600, margin: "8px 0" }}>{q.enunciado}</p>
                {q.alternativas.map((alt, idx) => (
                  <div key={idx} className={`enem-alt ${idx === q.correta ? "certa" : idx === resp ? "errada" : ""}`} style={{ cursor: "default" }}>
                    <span className="enem-letra">{LETRAS[idx]}</span>
                    <span style={{ paddingTop: 4 }}>{alt}{idx === resp && <strong> (sua resposta)</strong>}</span>
                  </div>
                ))}
                <div className="enem-info" style={{ marginBottom: 0 }}>
                  <strong>Por quê:</strong> {q.explicacao}
                  <br />
                  <span style={{ fontSize: 13 }}>📖 {q.fundamento}</span>
                </div>
              </div>
            );
          })}
    </>
  );
}

function DiscursivaRes({ r }: { r: ResultadoDiscursiva }) {
  const info = TRILHAS[r.trilha];
  return (
    <>
      <h1>{info.nome} — correção da discursiva</h1>
      <div className="enem-card" style={{ margin: "16px 0" }}>
        <div className="enem-linha" style={{ gap: 24 }}>
          <div>
            <p className="sub" style={{ fontSize: 14 }}>Nota final</p>
            <div className="enem-nota-grande">{r.nota.toFixed(2)}</div>
            <p className="sub" style={{ fontSize: 13 }}>de 10</p>
          </div>
          <div style={{ fontSize: 14 }}>
            <p>Conteúdo (NC): <strong>{r.conteudo.toFixed(1)}</strong> / 10</p>
            <p>Erros de língua (NE): <strong>{r.erros}</strong> em ≈ {r.linhas} linhas (TL)</p>
            <p className="sub">Nota = NC − 2 × NE ÷ TL</p>
            <span className="enem-tag" style={{ marginTop: 6 }}>Correção automática (estimativa)</span>
          </div>
        </div>
        {r.observacoes.length > 0 && (
          <ul className="enem-lista" style={{ marginTop: 12 }}>
            {r.observacoes.map((o, i) => <li key={i}>{o}</li>)}
          </ul>
        )}
      </div>

      <h2>Tópico por tópico</h2>
      {r.topicos.map((t) => (
        <div key={t.titulo} className="enem-card" style={{ marginBottom: 12 }}>
          <div className="enem-entre">
            <h3 style={{ margin: 0 }}>{t.titulo}</h3>
            <strong style={{ color: t.pontos >= 3 ? "var(--e-ok)" : t.pontos >= 2 ? "#ca8a04" : "var(--e-erro)" }}>{t.pontos} / {t.maximo}</strong>
          </div>
          <p style={{ fontSize: 14, marginTop: 6 }}>
            {t.encontrados.length ? <>Conceitos encontrados no seu texto: <strong>{t.encontrados.join(", ")}</strong>.</> : <span className="enem-erro-txt">Nenhum conceito esperado foi encontrado neste tópico.</span>}
          </p>
          <div className="enem-info" style={{ marginTop: 8, marginBottom: 0 }}>
            <strong>Padrão de resposta (o que a banca espera):</strong> {t.esperado}
          </div>
        </div>
      ))}

      {r.desvios.length > 0 && (
        <div className="enem-card enem-rolagem" style={{ marginBottom: 12 }}>
          <h3>Erros de língua encontrados</h3>
          <table className="enem-tabela">
            <thead><tr><th>Trecho</th><th>Correção</th><th>Por quê</th></tr></thead>
            <tbody>
              {r.desvios.map((d, i) => (
                <tr key={i}><td style={{ color: "var(--e-erro)" }}>{d.trecho}</td><td style={{ color: "var(--e-ok)", fontWeight: 600 }}>{d.correcao}</td><td>{d.explicacao}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <details className="enem-card">
        <summary style={{ cursor: "pointer", fontWeight: 700 }}>Ver o texto que você enviou</summary>
        <div className="enem-texto-base" style={{ marginTop: 12 }}>{r.texto}</div>
      </details>
    </>
  );
}
