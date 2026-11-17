import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { historicoConcurso } from "../../api";
import { ITENS_PF, QUESTOES_RFB_SIMULADO, TRILHAS } from "../../concursos/dados";
import type { ResultadoConcurso as Resultado, ResultadoDiscursiva, ResultadoObjetivaConcurso, ResultadoOficial } from "../../concursos/logica";
import { buscarProvaOficial } from "../../concursos/provasOficiais";
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
      {resultado.tipo === "objetiva" ? <Objetiva r={resultado} /> : resultado.tipo === "oficial" ? <Oficial r={resultado} /> : <DiscursivaRes r={resultado} />}
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
        : QUESTOES_RFB_SIMULADO.map((q, i) => {
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

function Oficial({ r }: { r: ResultadoOficial }) {
  const prova = buscarProvaOficial(r.provaId);
  if (!prova) return <div className="enem-erro">Prova não encontrada.</div>;
  const anulado = (g: string) => g === "X" || g === "*";
  const errados = Array.from({ length: prova.gabarito.length }, (_, k) => k + 1).filter((n) => {
    const g = prova.gabarito[n - 1];
    return !anulado(g) && r.respostas[n] && r.respostas[n] !== g;
  });
  const fracas = [...r.porMateria]
    .filter((m) => m.total - m.anulados > 0)
    .map((m) => ({ ...m, aprove: (m.acertos - (prova.formato === "CE" ? m.erros : 0)) / (m.total - m.anulados) }))
    .sort((a, b) => a.aprove - b.aprove);
  return (
    <>
      <span className="enem-tag">{prova.banca} · {prova.ano}</span>
      <h1 style={{ marginTop: 8 }}>{prova.cargo} — resultado</h1>
      <div className="enem-grid" style={{ margin: "16px 0" }}>
        <div className="enem-card">
          <p className="sub" style={{ fontSize: 14 }}>{prova.formato === "CE" ? "Nota líquida (acertos − erros)" : "Acertos"}</p>
          <div className="enem-nota-grande">{r.nota}</div>
          <p className="sub" style={{ fontSize: 13 }}>de {r.total - r.anulados} válidos</p>
        </div>
        <div className="enem-card">
          <p className="enem-ok-txt">✔ {r.acertos} certas</p>
          <p className="enem-erro-txt">✘ {r.erros} erradas</p>
          <p className="sub">○ {r.brancos} em branco · {r.anulados} anulado(s) pela banca</p>
          <p className="sub" style={{ fontSize: 12, marginTop: 6 }}>Corrigido com o gabarito definitivo oficial.</p>
        </div>
      </div>

      <h2>Desempenho por matéria</h2>
      <div className="enem-card enem-rolagem" style={{ marginBottom: 16 }}>
        <table className="enem-tabela">
          <thead><tr><th>Matéria</th><th className="num">Certas</th><th className="num">Erradas</th><th className="num">Branco</th><th style={{ minWidth: 120 }}>Aproveitamento</th></tr></thead>
          <tbody>
            {r.porMateria.map((m) => {
              const validos = m.total - m.anulados;
              const ap = validos ? Math.max(0, (m.acertos - (prova.formato === "CE" ? m.erros : 0)) / validos) : 0;
              return (
                <tr key={m.nome}>
                  <td>{m.nome}</td>
                  <td className="num">{m.acertos}</td>
                  <td className="num">{m.erros}</td>
                  <td className="num">{m.brancos}</td>
                  <td>
                    <div className="enem-barra"><div style={{ width: `${ap * 100}%`, background: ap >= 0.7 ? "#16a34a" : ap >= 0.5 ? "#ca8a04" : "#dc2626" }} /></div>
                    <span className="sub" style={{ fontSize: 12 }}>{(ap * 100).toFixed(0)}%</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {fracas.length > 0 && (
        <div className="enem-info">
          <strong>Onde focar:</strong> {fracas.slice(0, 3).map((m) => m.nome).join(", ")}. Treine essas matérias nos simulados inéditos,
          que trazem a explicação e o fundamento de cada item.
        </div>
      )}

      {errados.length > 0 && (
        <div className="enem-card">
          <h3>Itens que você errou</h3>
          <p className="sub" style={{ fontSize: 13, marginBottom: 8 }}>Volte ao caderno oficial e revise estes itens (sua resposta → gabarito oficial):</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {errados.map((n) => (
              <span key={n} className="enem-tag" style={{ background: "var(--e-erro-bg)", color: "#991b1b" }}>
                {n}: {r.respostas[n]} → {prova.gabarito[n - 1]}
              </span>
            ))}
          </div>
          <div className="enem-linha" style={{ gap: 8, marginTop: 12 }}>
            {prova.cadernos.map((c) => (
              <a key={c.url} href={c.url} target="_blank" rel="noopener noreferrer" className="enem-btn sec" style={{ padding: "6px 12px", fontSize: 13 }}>📄 {c.nome} ↗</a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
