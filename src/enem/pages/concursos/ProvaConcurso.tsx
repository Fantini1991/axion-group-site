import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { salvarConcurso } from "../../api";
import { useEnem } from "../../contexto";
import { ITENS_PF, QUESTOES_RFB, TRILHAS, type Trilha } from "../../concursos/dados";
import { corrigirObjetiva } from "../../concursos/logica";
import { LETRAS } from "../../prova";

type Respostas = Record<string, string | number | null>;

export default function ProvaConcurso() {
  const { trilha } = useParams();
  const t = trilha === "PF" || trilha === "RFB" ? (trilha as Trilha) : null;
  const { usuario } = useEnem();
  const navigate = useNavigate();
  const chave = `enem:concurso-andamento:${usuario?.username}:${t}`;

  const [estado, setEstado] = useState<{ respostas: Respostas; inicio: number }>(() => {
    try {
      const salvo = localStorage.getItem(chave);
      if (salvo) return JSON.parse(salvo);
    } catch {
      /* ignore */
    }
    return { respostas: {}, inicio: Date.now() };
  });
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(estado));
    } catch {
      /* ignore */
    }
  }, [estado, chave]);

  if (!t) return <Navigate to="/enem/concursos" replace />;
  const info = TRILHAS[t];
  const ids = t === "PF" ? ITENS_PF.map((i) => i.id) : QUESTOES_RFB.map((q) => q.id);
  const respondidas = ids.filter((id) => estado.respostas[id] !== undefined && estado.respostas[id] !== null).length;

  const marcar = (id: string, valor: string | number) =>
    setEstado((e) => ({ ...e, respostas: { ...e.respostas, [id]: e.respostas[id] === valor ? null : valor } }));

  async function finalizar() {
    const brancos = ids.length - respondidas;
    if (brancos > 0 && !window.confirm(`Você deixou ${brancos} em branco. Finalizar mesmo assim?`)) return;
    setEnviando(true);
    setErro("");
    const resultado = corrigirObjetiva(t!, estado.respostas, Math.round((Date.now() - estado.inicio) / 1000));
    try {
      await salvarConcurso(resultado);
    } catch (e) {
      setErro(`Não foi possível salvar: ${(e as Error).message}. Tente de novo.`);
      setEnviando(false);
      return;
    }
    try {
      localStorage.removeItem(chave);
    } catch {
      /* ignore */
    }
    navigate(`/enem/concursos/resultado/${resultado.id}`, { state: { resultado } });
  }

  let materiaAnterior = "";

  return (
    <>
      <span className="enem-tag" style={{ background: `${info.cor}18`, color: info.cor }}>{info.cargo}</span>
      <h1 style={{ marginTop: 8 }}>{info.nome} — prova objetiva</h1>
      <div className="enem-info">{info.formato}{t === "PF" && " Clique de novo na opção marcada para deixar o item em branco."}</div>
      {erro && <div className="enem-erro">{erro}</div>}

      {t === "PF"
        ? ITENS_PF.map((item, i) => {
            const cab = item.materia !== materiaAnterior;
            materiaAnterior = item.materia;
            const r = estado.respostas[item.id];
            return (
              <div key={item.id}>
                {cab && <h2>{item.materia}</h2>}
                <div className="enem-card" style={{ marginBottom: 10 }}>
                  <p style={{ marginBottom: 10 }}><strong>{i + 1}.</strong> {item.afirmacao}</p>
                  <div className="enem-linha" style={{ gap: 8 }}>
                    {(["C", "E"] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => marcar(item.id, v)}
                        className={`enem-btn ${r === v ? "" : "sec"}`}
                        style={{ padding: "7px 18px", fontSize: 14 }}
                      >
                        {v === "C" ? "Certo" : "Errado"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        : QUESTOES_RFB.map((q, i) => {
            const cab = q.materia !== materiaAnterior;
            materiaAnterior = q.materia;
            const r = estado.respostas[q.id];
            return (
              <div key={q.id}>
                {cab && <h2>{q.materia}</h2>}
                <div className="enem-card" style={{ marginBottom: 10 }}>
                  <p style={{ fontWeight: 600, marginBottom: 10 }}>{i + 1}. {q.enunciado}</p>
                  {q.alternativas.map((alt, idx) => (
                    <button key={idx} className={`enem-alt ${r === idx ? "marcada" : ""}`} onClick={() => marcar(q.id, idx)}>
                      <span className="enem-letra">{LETRAS[idx]}</span>
                      <span style={{ paddingTop: 4 }}>{alt}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

      <div className="enem-card enem-entre" style={{ position: "sticky", bottom: 12, marginTop: 16 }}>
        <span className="sub" style={{ fontSize: 14 }}>{respondidas} de {ids.length} respondidas</span>
        <button className="enem-btn ok" disabled={enviando} onClick={finalizar}>
          {enviando ? "Corrigindo…" : "Finalizar e corrigir"}
        </button>
      </div>
    </>
  );
}
