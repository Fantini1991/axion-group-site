import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { historico, salvarProva } from "../api";
import { useEnem } from "../contexto";
import { PROVAS } from "../data/provas";
import { BANCO, buscarQuestao, corrigirProva, LETRAS, montarProva, QUESTOES_POR_AREA, questoesDaProva } from "../prova";
import { AREAS, type Questao, type ResultadoProva, type ResultadoRedacao } from "../types";

interface EmAndamento {
  modo: ResultadoProva["modo"];
  provaId?: string;
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
  const [feitas, setFeitas] = useState<{ provas: ResultadoProva[]; redacoes: ResultadoRedacao[] } | null>(null);

  useEffect(() => {
    if (!prova) historico().then(setFeitas).catch(() => setFeitas({ provas: [], redacoes: [] }));
  }, [prova]);
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

  function iniciarOficial(provaId: string) {
    const qs = questoesDaProva(provaId);
    setProva({ modo: "oficial", provaId, ids: qs.map((q) => q.id), respostas: {}, atual: 0, inicio: Date.now() });
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
      prova.provaId,
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
    // Lista da mais nova para a mais antiga: a 1ª tentativa é a última encontrada.
    const primeiraObjetiva = (id: string) => feitas?.provas.filter((p) => p.provaId === id).at(-1);
    const primeiraRedacao = (id: string) => feitas?.redacoes.filter((r) => r.provaId === id).at(-1);
    return (
      <>
        <h1>Provas</h1>
        <p className="sub" style={{ marginBottom: 20 }}>
          São 3 provas, cada uma com um eixo temático atual e o seu tema de redação. Todo mundo faz as mesmas questões, então o
          ranking é justo. Cada prova tem 20 questões (5 por área) + 1 redação.
        </p>
        <div className="enem-info">
          <strong>Para o ranking, vale a 1ª tentativa</strong> de cada prova e de cada redação. Você pode refazer quantas vezes
          quiser para estudar, mas a nota do ranking não muda.
        </div>
        <div className="enem-grid">
          {PROVAS.map((p) => {
            const obj = primeiraObjetiva(p.id);
            const red = primeiraRedacao(p.id);
            return (
              <div key={p.id} className="enem-card">
                <span className="enem-tag">{p.eixo}</span>
                <h3 style={{ marginTop: 8 }}>{p.nome}</h3>
                <p className="sub" style={{ fontSize: 14, marginBottom: 12 }}>{p.descricao}</p>
                <p style={{ fontSize: 14 }}>
                  1. Objetiva:{" "}
                  {obj ? (
                    <Link to={`/enem/prova/resultado/${obj.id}`} className="enem-ok-txt">{obj.media.toFixed(1)} ✔</Link>
                  ) : (
                    <span className="sub">não feita</span>
                  )}
                </p>
                <p style={{ fontSize: 14, marginBottom: 12 }}>
                  2. Redação:{" "}
                  {red ? (
                    <Link to={`/enem/redacao/resultado/${red.id}`} className="enem-ok-txt">{red.correcao.notaTotal} ✔</Link>
                  ) : (
                    <span className="sub">não feita</span>
                  )}
                </p>
                <div className="enem-linha" style={{ gap: 8 }}>
                  <button className={`enem-btn ${obj ? "sec" : ""}`} style={{ padding: "9px 14px", fontSize: 14 }} onClick={() => iniciarOficial(p.id)}>
                    {obj ? "Refazer objetiva" : "Fazer objetiva"}
                  </button>
                  <Link to={`/enem/redacao?prova=${p.id}`} className={`enem-btn ${red || !obj ? "sec" : ""}`} style={{ padding: "9px 14px", fontSize: 14 }}>
                    {red ? "Reescrever redação" : "Fazer redação"}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <h2>Treino livre</h2>
        <p className="sub" style={{ marginBottom: 12 }}>
          Questões sorteadas do banco inteiro ({BANCO.length} questões). Bom para revisar —
          não conta para o ranking geral.
        </p>
        <div className="enem-linha">
          <button className="enem-btn sec" onClick={() => iniciar("rapido")}>⚡ Rápido ({QUESTOES_POR_AREA.rapido * 4} questões)</button>
          <button className="enem-btn sec" onClick={() => iniciar("completo")}>🎯 Completo ({QUESTOES_POR_AREA.completo * 4} questões)</button>
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
          {prova.provaId && <span className="enem-tag">{PROVAS.find((p) => p.id === prova.provaId)?.nome}</span>}{" "}
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
