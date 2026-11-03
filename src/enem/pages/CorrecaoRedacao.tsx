import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { historico } from "../api";
import { NOMES_COMPETENCIAS } from "../corretorLocal";
import type { ResultadoRedacao } from "../types";

const corDaNota = (n: number) => (n >= 160 ? "#16a34a" : n >= 120 ? "#65a30d" : n >= 80 ? "#ca8a04" : "#dc2626");

export default function CorrecaoRedacao() {
  const { id } = useParams();
  const location = useLocation();
  const estado = location.state as { resultado?: ResultadoRedacao; aviso?: string } | null;
  const [resultado, setResultado] = useState<ResultadoRedacao | null>(estado?.resultado?.id === id ? estado?.resultado ?? null : null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (resultado) return;
    historico()
      .then(({ redacoes }) => {
        const r = redacoes.find((x) => x.id === id);
        if (r) setResultado(r);
        else setErro("Redação não encontrada.");
      })
      .catch((e) => setErro(e.message));
  }, [id, resultado]);

  if (erro) return <div className="enem-erro">{erro}</div>;
  if (!resultado) return <div className="enem-carregando">Carregando…</div>;
  const c = resultado.correcao;

  return (
    <>
      <h1>Correção da redação</h1>
      <p className="sub" style={{ marginBottom: 16 }}>Tema: {resultado.temaTitulo}</p>
      {estado?.aviso && <div className="enem-aviso">{estado.aviso}</div>}

      <div className="enem-card" style={{ marginBottom: 16 }}>
        <div className="enem-linha" style={{ gap: 24 }}>
          <div>
            <p className="sub" style={{ fontSize: 14 }}>Nota final</p>
            <div className="enem-nota-grande" style={{ color: corDaNota(c.notaTotal / 5) }}>{c.notaTotal}</div>
            <p className="sub" style={{ fontSize: 13 }}>de 1000</p>
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <span className="enem-tag">{c.metodo === "ia" ? "Corrigida por IA" : "Correção automática (estimativa)"}</span>
            <p style={{ marginTop: 8 }}>{c.resumo}</p>
          </div>
        </div>
        {c.anulada && <div className="enem-erro" style={{ marginTop: 14, marginBottom: 0 }}><strong>Nota zero:</strong> {c.anulada}</div>}
      </div>

      {c.competencias.map((comp) => {
        const info = NOMES_COMPETENCIAS[comp.numero];
        return (
          <div key={comp.numero} className="enem-card" style={{ marginBottom: 14 }}>
            <div className="enem-entre">
              <div>
                <h3 style={{ margin: 0 }}>Competência {comp.numero} — {info.titulo}</h3>
                <p className="sub" style={{ fontSize: 13 }}>{info.descricao}</p>
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: corDaNota(comp.nota) }}>
                {comp.nota}<span className="sub" style={{ fontSize: 14, fontWeight: 600 }}>/200</span>
              </div>
            </div>
            <div className="enem-barra" style={{ margin: "10px 0 12px" }}>
              <div style={{ width: `${(comp.nota / 200) * 100}%`, background: corDaNota(comp.nota) }} />
            </div>
            <p>{comp.comentario}</p>
            {comp.pontosFortes.length > 0 && (
              <>
                <p className="enem-ok-txt" style={{ marginTop: 10, fontSize: 14 }}>O que você fez bem</p>
                <ul className="enem-lista">{comp.pontosFortes.map((p, i) => <li key={i}>{p}</li>)}</ul>
              </>
            )}
            {comp.pontosAMelhorar.length > 0 && (
              <>
                <p className="enem-erro-txt" style={{ marginTop: 10, fontSize: 14 }}>O que faltou / onde perdeu pontos</p>
                <ul className="enem-lista">{comp.pontosAMelhorar.map((p, i) => <li key={i}>{p}</li>)}</ul>
              </>
            )}
            <div className="enem-info" style={{ marginTop: 10, marginBottom: 0 }}>
              <strong>Como deveria ser feito:</strong> {comp.comoMelhorar}
            </div>
          </div>
        );
      })}

      {c.desvios.length > 0 && (
        <div className="enem-card enem-rolagem" style={{ marginBottom: 14 }}>
          <h3>Desvios encontrados</h3>
          <table className="enem-tabela">
            <thead>
              <tr><th>Trecho</th><th>Correção</th><th>Por quê</th></tr>
            </thead>
            <tbody>
              {c.desvios.map((d, i) => (
                <tr key={i}>
                  <td style={{ color: "var(--e-erro)" }}>{d.trecho}</td>
                  <td style={{ color: "var(--e-ok)", fontWeight: 600 }}>{d.correcao}</td>
                  <td>{d.explicacao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {c.sugestaoReescrita && (
        <div className="enem-card" style={{ marginBottom: 14 }}>
          <h3>Exemplo de como o parágrafo mais fraco poderia ficar</h3>
          <div className="enem-texto-base" style={{ borderLeftColor: "#16a34a" }}>{c.sugestaoReescrita}</div>
        </div>
      )}

      <details className="enem-card" style={{ marginBottom: 14 }}>
        <summary style={{ cursor: "pointer", fontWeight: 700 }}>Ver o texto que você enviou</summary>
        <div className="enem-texto-base" style={{ marginTop: 12 }}>{resultado.texto}</div>
      </details>

      <div className="enem-linha">
        <Link to="/enem/redacao" className="enem-btn">Escrever outra redação</Link>
        <Link to="/enem/ranking" className="enem-btn sec">Ver ranking</Link>
      </div>
    </>
  );
}
