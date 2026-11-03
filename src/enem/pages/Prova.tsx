import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { salvarProva } from "../api";
import { useEnem } from "../contexto";
import { buscarQuestao, corrigirProva, LETRAS, montarProva, QUESTOES_POR_AREA } from "../prova";
import { AREAS, type Questao } from "../types";

interface EmAndamento {
  modo: "rapido" | "completo";
  ids: string[];
  respostas: Record<string, number>;
  atual: number;
  inicio: number;
}

function formatarTempo(seg: number) {
  const h = Math.floor(seg / 3600);
  const m = Math.floor((seg % 3600) / 60);
  const s = seg % 60;
  return `${h > 0 ? `${h}h ` : ""}${String(m).padStart(2, "0")}min ${String(s).padStart(2, "0")}s`;
}

export default function Prova() {
  const { usuario } = useEnem();
  const navigate = useNavigate();
  const chave = `enem:prova-em-andamento:${usuario?.username}`;

  const [prova, setProva] = useState<EmAndamento | null>(() => {
    try {
      const salvo = localStorage.getItem(chave);
      return salvo ? (JSON.parse(salvo) as EmAndamento) : null;
    } catch {
      return null;
    }
  });
  const [agora, setAgora] = useState(() => Date.now());
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    try {
      if (prova) localStorage.setItem(chave, JSON.stringify(prova));
      else localStorage.removeItem(chave);
    } catch {
      /* ignore */
    }
  }, [prova, chave]);

  useEffect(() => {
    if (!prova) return;
    const t = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(t);
  }, [prova]);

  const questoes = useMemo(
    () => (prova ? prova.ids.map((id) => buscarQuestao(id)).filter((q): q is Questao => Boolean(q)) : []),
    [prova],
  );

  function iniciar(modo: "rapido" | "completo") {
    const qs = montarProva(modo);
    setProva({ modo, ids: qs.map((q) => q.id), respostas: {}, atual: 0, inicio: Date.now() });
    window.scrollTo(0, 0);
  }

  async function finalizar() {
    if (!prova) return;
    const emBranco = questoes.length - Object.keys(prova.respostas).length;
    if (emBranco > 0 && !window.confirm(`Você deixou ${emBranco} questão(ões) em branco. Deseja finalizar mesmo assim?`)) return;
    setEnviando(true);
    setErro("");
    const resultado = corrigirProva(
      questoes,
      questoes.map((q) => ({ questaoId: q.id, resposta: prova.respostas[q.id] ?? null })),
      prova.modo,
      Math.round((Date.now() - prova.inicio) / 1000),
    );
    try {
      await salvarProva(resultado);
    } catch (e) {
      setErro(`Não foi possível salvar o resultado: ${(e as Error).message}. Tente finalizar novamente.`);
      setEnviando(false);
      return;
    }
    setProva(null);
    navigate(`/enem/prova/resultado/${resultado.id}`, { state: { resultado } });
  }

  if (!prova) {
    return (
      <>
        <h1>Simulado — prova objetiva</h1>
        <p className="sub" style={{ marginBottom: 20 }}>
          As questões são sorteadas a cada simulado, então você pode refazer e encontrar provas diferentes. Ao final, você vê a
          nota de cada área e a correção comentada de todas as questões.
        </p>
        <div className="enem-grid">
          <div className="enem-card">
            <h3>⚡ Simulado rápido</h3>
            <p className="sub">{QUESTOES_POR_AREA.rapido * 4} questões ({QUESTOES_POR_AREA.rapido} por área). Tempo sugerido: 1 hora.</p>
            <button className="enem-btn" style={{ marginTop: 14 }} onClick={() => iniciar("rapido")}>Começar</button>
          </div>
          <div className="enem-card">
            <h3>🎯 Simulado completo</h3>
            <p className="sub">{QUESTOES_POR_AREA.completo * 4} questões ({QUESTOES_POR_AREA.completo} por área). Tempo sugerido: 2 horas.</p>
            <button className="enem-btn" style={{ marginTop: 14 }} onClick={() => iniciar("completo")}>Começar</button>
          </div>
        </div>
        <div className="enem-info" style={{ marginTop: 20 }}>
          <strong>Como a nota é calculada?</strong> O ENEM usa a TRI (Teoria de Resposta ao Item). Aqui fazemos uma estimativa
          parecida: questões difíceis valem mais, e acertar as difíceis errando as fáceis (sinal de chute) reduz a nota. A escala vai
          de 300 (nenhum acerto) a 900 (todos os acertos).
        </div>
      </>
    );
  }

  const q = questoes[prova.atual];
  const area = AREAS.find((a) => a.id === q.area)!;
  const marcada = prova.respostas[q.id];
  const respondidas = Object.keys(prova.respostas).length;
  const ultima = prova.atual === questoes.length - 1;

  const ir = (i: number) => {
    setProva({ ...prova, atual: i });
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="enem-entre" style={{ marginBottom: 14 }}>
        <div>
          <span className="enem-tag" style={{ background: `${area.cor}22`, color: area.cor }}>{area.curto}</span>{" "}
          <span className="sub" style={{ fontSize: 14 }}>
            Questão {prova.atual + 1} de {questoes.length} · {respondidas} respondida(s)
          </span>
        </div>
        <span className="sub" style={{ fontSize: 14 }}>⏱ {formatarTempo(Math.round((agora - prova.inicio) / 1000))}</span>
      </div>

      {erro && <div className="enem-erro">{erro}</div>}

      <div className="enem-card">
        <p className="sub" style={{ fontSize: 13, marginBottom: 8 }}>{q.disciplina} · {q.assunto}</p>
        {q.texto && <div className="enem-texto-base">{q.texto}</div>}
        <p style={{ fontWeight: 600, margin: "12px 0 16px" }}>{q.enunciado}</p>
        {q.alternativas.map((alt, i) => (
          <button
            key={i}
            className={`enem-alt ${marcada === i ? "marcada" : ""}`}
            onClick={() => setProva({ ...prova, respostas: { ...prova.respostas, [q.id]: i } })}
          >
            <span className="enem-letra">{LETRAS[i]}</span>
            <span style={{ paddingTop: 4 }}>{alt}</span>
          </button>
        ))}

        <div className="enem-entre" style={{ marginTop: 16 }}>
          <button className="enem-btn sec" disabled={prova.atual === 0} onClick={() => ir(prova.atual - 1)}>← Anterior</button>
          {ultima ? (
            <button className="enem-btn ok" disabled={enviando} onClick={finalizar}>
              {enviando ? "Corrigindo…" : "Finalizar e corrigir"}
            </button>
          ) : (
            <button className="enem-btn" onClick={() => ir(prova.atual + 1)}>Próxima →</button>
          )}
        </div>
      </div>

      <div className="enem-card" style={{ marginTop: 16 }}>
        <div className="enem-entre" style={{ marginBottom: 10 }}>
          <h3 style={{ margin: 0 }}>Mapa da prova</h3>
          <button className="enem-btn ok" style={{ padding: "8px 14px", fontSize: 14 }} disabled={enviando} onClick={finalizar}>
            Finalizar prova
          </button>
        </div>
        {AREAS.map((a) => {
          const indices = questoes.map((qq, i) => ({ qq, i })).filter(({ qq }) => qq.area === a.id);
          return (
            <div key={a.id} style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: a.cor, marginBottom: 6 }}>{a.curto}</p>
              <div className="enem-mapa">
                {indices.map(({ qq, i }) => (
                  <button
                    key={qq.id}
                    className={`${prova.respostas[qq.id] !== undefined ? "resp" : ""} ${i === prova.atual ? "atual" : ""}`}
                    onClick={() => ir(i)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
        <div className="enem-sep" />
        <button
          className="enem-btn sec"
          style={{ fontSize: 14, padding: "8px 14px" }}
          onClick={() => window.confirm("Abandonar este simulado? As respostas serão perdidas.") && setProva(null)}
        >
          Abandonar simulado
        </button>
      </div>
    </>
  );
}
