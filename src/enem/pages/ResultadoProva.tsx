import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { historico } from "../api";
import { buscarQuestao, LETRAS } from "../prova";
import { AREAS, type Area, type ResultadoProva as Resultado } from "../types";

type Filtro = "todas" | "erradas" | Area;

export default function ResultadoProva() {
  const { id } = useParams();
  const location = useLocation();
  const doEstado = (location.state as { resultado?: Resultado } | null)?.resultado;
  const [resultado, setResultado] = useState<Resultado | null>(doEstado?.id === id ? doEstado ?? null : null);
  const [erro, setErro] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("erradas");

  useEffect(() => {
    if (resultado) return;
    historico()
      .then(({ provas }) => {
        const r = provas.find((p) => p.id === id);
        if (r) setResultado(r);
        else setErro("Simulado não encontrado.");
      })
      .catch((e) => setErro(e.message));
  }, [id, resultado]);

  if (erro) return <div className="enem-erro">{erro}</div>;
  if (!resultado) return <div className="enem-carregando">Carregando…</div>;

  const totalAcertos = AREAS.reduce((s, a) => s + resultado.acertos[a.id].acertos, 0);
  const total = AREAS.reduce((s, a) => s + resultado.acertos[a.id].total, 0);

  const itens = resultado.respostas
    .map((r, i) => ({ r, i, q: buscarQuestao(r.questaoId) }))
    .filter((x) => x.q)
    .filter(({ r, q }) => {
      if (filtro === "todas") return true;
      if (filtro === "erradas") return r.resposta !== q!.correta;
      return q!.area === filtro;
    });

  return (
    <>
      <h1>Resultado do simulado</h1>
      <p className="sub" style={{ marginBottom: 20 }}>
        {totalAcertos} acertos em {total} questões · tempo: {Math.round(resultado.duracaoSeg / 60)} min
      </p>

      <div className="enem-grid" style={{ marginBottom: 20 }}>
        <div className="enem-card">
          <p className="sub" style={{ fontSize: 14 }}>Média das áreas</p>
          <div className="enem-nota-grande">{resultado.media.toFixed(1)}</div>
          <p className="sub" style={{ fontSize: 13, marginTop: 6 }}>Escala estimada de 0 a 1000</p>
        </div>
        {AREAS.map((a) => {
          const ac = resultado.acertos[a.id];
          return (
            <div key={a.id} className="enem-card">
              <p style={{ fontSize: 14, fontWeight: 700, color: a.cor }}>{a.curto}</p>
              <div style={{ fontSize: 30, fontWeight: 800 }}>{resultado.notas[a.id].toFixed(1)}</div>
              <p className="sub" style={{ fontSize: 13, marginBottom: 8 }}>{ac.acertos} de {ac.total} acertos</p>
              <div className="enem-barra">
                <div style={{ width: `${(ac.acertos / Math.max(1, ac.total)) * 100}%`, background: a.cor }} />
              </div>
            </div>
          );
        })}
      </div>

      <h2>Correção comentada</h2>
      <div className="enem-abas">
        <button className={filtro === "erradas" ? "ativo" : ""} onClick={() => setFiltro("erradas")}>Só as que errei</button>
        <button className={filtro === "todas" ? "ativo" : ""} onClick={() => setFiltro("todas")}>Todas</button>
        {AREAS.map((a) => (
          <button key={a.id} className={filtro === a.id ? "ativo" : ""} onClick={() => setFiltro(a.id)}>{a.curto}</button>
        ))}
      </div>

      {itens.length === 0 && <p className="sub">{filtro === "erradas" ? "Você não errou nenhuma questão. Parabéns! 🎉" : "Nenhuma questão."}</p>}

      {itens.map(({ r, i, q }) => {
        const questao = q!;
        const acertou = r.resposta === questao.correta;
        const area = AREAS.find((a) => a.id === questao.area)!;
        return (
          <div key={questao.id} className="enem-card" style={{ marginBottom: 16 }}>
            <div className="enem-entre" style={{ marginBottom: 8 }}>
              <span>
                <strong>Questão {i + 1}</strong>{" "}
                <span className="enem-tag" style={{ background: `${area.cor}22`, color: area.cor }}>{area.curto}</span>
              </span>
              {acertou ? (
                <span className="enem-ok-txt">✔ Acertou</span>
              ) : r.resposta === null ? (
                <span className="enem-erro-txt">Em branco</span>
              ) : (
                <span className="enem-erro-txt">✘ Errou</span>
              )}
            </div>
            <p className="sub" style={{ fontSize: 13 }}>{questao.disciplina} · {questao.assunto}</p>
            {questao.texto && <div className="enem-texto-base">{questao.texto}</div>}
            <p style={{ fontWeight: 600, margin: "10px 0 12px" }}>{questao.enunciado}</p>

            {questao.alternativas.map((alt, idx) => {
              const ehCorreta = idx === questao.correta;
              const ehMarcada = idx === r.resposta;
              const classe = ehCorreta ? "certa" : ehMarcada ? "errada" : "";
              return (
                <div key={idx} className={`enem-alt ${classe}`} style={{ cursor: "default" }}>
                  <span className="enem-letra">{LETRAS[idx]}</span>
                  <span style={{ paddingTop: 4 }}>
                    {alt}
                    {ehMarcada && <strong> (sua resposta)</strong>}
                    {(ehCorreta || ehMarcada) && (
                      <span style={{ display: "block", fontSize: 14, marginTop: 6, color: "#334155" }}>{questao.comentarios[idx]}</span>
                    )}
                  </span>
                </div>
              );
            })}

            {!acertou && r.resposta !== null && (
              <div className="enem-erro" style={{ marginTop: 6 }}>
                <strong>Por que você errou:</strong> {questao.comentarios[r.resposta]}
              </div>
            )}
            <div className="enem-info" style={{ marginTop: 6, whiteSpace: "pre-line" }}>
              <strong>Como resolver:</strong> {questao.resolucao}
            </div>
            <details>
              <summary style={{ cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Ver comentário de todas as alternativas</summary>
              <ul className="enem-lista" style={{ marginTop: 8 }}>
                {questao.comentarios.map((c, idx) => (
                  <li key={idx}><strong>{LETRAS[idx]})</strong> {c}</li>
                ))}
              </ul>
            </details>
            <p className="sub" style={{ fontSize: 13, marginTop: 10 }}>📌 {questao.recorrencia}</p>
          </div>
        );
      })}

      <div className="enem-linha" style={{ marginTop: 20 }}>
        <Link to="/enem/prova" className="enem-btn">Fazer outro simulado</Link>
        <Link to="/enem/ranking" className="enem-btn sec">Ver ranking</Link>
      </div>
    </>
  );
}
