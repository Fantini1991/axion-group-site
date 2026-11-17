import { useEffect, useMemo, useState } from "react";
import { useEnem } from "../contexto";
import { ITENS_PF, QUESTOES_RFB } from "../concursos/dados";
import { BANCO, LETRAS } from "../prova";
import { AREAS } from "../types";

/** Exercício em formato único, para estudar qualquer banco (ENEM, PF ou Receita). */
interface Exercicio {
  id: string;
  materia: string;
  assunto?: string;
  texto?: string;
  enunciado: string;
  opcoes: string[];
  letras: string[];
  correta: number;
  resolucao: string;
  comentarios?: string[];
  fundamento?: string;
}

type Trilha = "ENEM" | "PF" | "RFB";

const NOMES: Record<Trilha, string> = { ENEM: "ENEM", PF: "Polícia Federal", RFB: "Receita Federal" };

function exercicios(t: Trilha): Exercicio[] {
  if (t === "ENEM") {
    return BANCO.map((q) => ({
      id: q.id,
      materia: AREAS.find((a) => a.id === q.area)!.curto,
      assunto: `${q.disciplina} · ${q.assunto}`,
      texto: q.texto,
      enunciado: q.enunciado,
      opcoes: q.alternativas,
      letras: LETRAS,
      correta: q.correta,
      resolucao: q.resolucao,
      comentarios: q.comentarios,
    }));
  }
  if (t === "PF") {
    return ITENS_PF.map((i) => ({
      id: i.id,
      materia: i.materia,
      enunciado: i.afirmacao,
      opcoes: ["Certo", "Errado"],
      letras: ["C", "E"],
      correta: i.gabarito === "C" ? 0 : 1,
      resolucao: i.explicacao,
      fundamento: i.fundamento,
    }));
  }
  return QUESTOES_RFB.map((q) => ({
    id: q.id,
    materia: q.materia,
    enunciado: q.enunciado,
    opcoes: q.alternativas,
    letras: LETRAS,
    correta: q.correta,
    resolucao: q.explicacao,
    fundamento: q.fundamento,
  }));
}

/** Progresso do estudo: id do exercício → acertou na última tentativa. Fica neste aparelho. */
type Progresso = Record<string, boolean>;

export default function Estudar() {
  const { usuario } = useEnem();
  const chave = `enem:estudo:${usuario?.username}`;
  const [trilha, setTrilha] = useState<Trilha>("ENEM");
  const [materia, setMateria] = useState<string | null>(null);
  const [indice, setIndice] = useState(0);
  const [escolha, setEscolha] = useState<number | null>(null);
  const [progresso, setProgresso] = useState<Progresso>(() => {
    try {
      return JSON.parse(localStorage.getItem(chave) || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(progresso));
    } catch {
      /* ignore */
    }
  }, [progresso, chave]);

  const todos = useMemo(() => exercicios(trilha), [trilha]);
  const materias = useMemo(() => [...new Set(todos.map((e) => e.materia))], [todos]);
  const lista = materia ? todos.filter((e) => e.materia === materia) : [];
  const atual = lista[indice];

  const resumo = (m: string) => {
    const doTema = todos.filter((e) => e.materia === m);
    const feitos = doTema.filter((e) => e.id in progresso);
    const certos = feitos.filter((e) => progresso[e.id]).length;
    return { total: doTema.length, feitos: feitos.length, certos };
  };

  function responder(i: number) {
    if (escolha !== null || !atual) return;
    setEscolha(i);
    setProgresso((p) => ({ ...p, [atual.id]: i === atual.correta }));
  }

  function proximo(delta: number) {
    setEscolha(null);
    setIndice((i) => Math.min(Math.max(0, i + delta), lista.length - 1));
    window.scrollTo(0, 0);
  }

  // ---------- Escolha de matéria ----------
  if (!materia || !atual) {
    return (
      <>
        <h1>📖 Estudar</h1>
        <p className="sub" style={{ marginBottom: 16 }}>
          Resolva exercício por exercício e veja na hora se acertou, com a explicação de como resolver. Ideal para estudar antes de
          fazer as provas. Seu progresso fica salvo neste aparelho.
        </p>
        <div className="enem-abas">
          {(Object.keys(NOMES) as Trilha[]).map((t) => (
            <button key={t} className={trilha === t ? "ativo" : ""} onClick={() => { setTrilha(t); setMateria(null); setIndice(0); }}>
              {NOMES[t]}
            </button>
          ))}
        </div>
        <div className="enem-grid">
          {materias.map((m) => {
            const r = resumo(m);
            return (
              <button
                key={m}
                className="enem-card"
                style={{ textAlign: "left", cursor: "pointer", font: "inherit", color: "inherit" }}
                onClick={() => {
                  // Começa no primeiro exercício ainda não resolvido.
                  const daMateria = todos.filter((e) => e.materia === m);
                  const prox = daMateria.findIndex((e) => !(e.id in progresso));
                  setMateria(m);
                  setIndice(prox >= 0 ? prox : 0);
                  setEscolha(null);
                }}
              >
                <h3 style={{ marginBottom: 6 }}>{m}</h3>
                <p className="sub" style={{ fontSize: 14 }}>
                  {r.total} exercícios · {r.feitos} resolvidos{r.feitos > 0 && ` · ${Math.round((r.certos / r.feitos) * 100)}% de acerto`}
                </p>
                <div className="enem-barra" style={{ marginTop: 8 }}>
                  <div style={{ width: `${(r.feitos / r.total) * 100}%`, background: "var(--e-primaria)" }} />
                </div>
              </button>
            );
          })}
        </div>
        {Object.keys(progresso).length > 0 && (
          <button
            className="enem-btn sec"
            style={{ marginTop: 16, fontSize: 14, padding: "8px 14px" }}
            onClick={() => window.confirm("Apagar seu progresso de estudo neste aparelho?") && setProgresso({})}
          >
            Recomeçar do zero
          </button>
        )}
      </>
    );
  }

  // ---------- Exercício ----------
  const respondido = escolha !== null;
  const acertou = escolha === atual.correta;
  return (
    <>
      <div className="enem-entre" style={{ marginBottom: 12 }}>
        <button className="enem-btn sec" style={{ padding: "6px 12px", fontSize: 14 }} onClick={() => { setMateria(null); setEscolha(null); }}>
          ← Matérias
        </button>
        <span className="sub" style={{ fontSize: 14 }}>{NOMES[trilha]} · {materia} · {indice + 1} de {lista.length}</span>
      </div>

      <div className="enem-card">
        {atual.assunto && <p className="sub" style={{ fontSize: 13, marginBottom: 6 }}>{atual.assunto}</p>}
        {atual.texto && <div className="enem-texto-base">{atual.texto}</div>}
        <p style={{ fontWeight: 600, margin: "10px 0 14px" }}>{atual.enunciado}</p>
        {atual.opcoes.map((op, i) => {
          const classe = !respondido ? "" : i === atual.correta ? "certa" : i === escolha ? "errada" : "";
          return (
            <button key={i} className={`enem-alt ${classe}`} onClick={() => responder(i)} style={{ cursor: respondido ? "default" : "pointer" }}>
              <span className="enem-letra">{atual.letras[i]}</span>
              <span style={{ paddingTop: 4 }}>
                {op}
                {respondido && atual.comentarios && (i === atual.correta || i === escolha) && (
                  <span style={{ display: "block", fontSize: 14, marginTop: 6, color: "#334155" }}>{atual.comentarios[i]}</span>
                )}
              </span>
            </button>
          );
        })}

        {respondido && (
          <>
            <div className={acertou ? "enem-info" : "enem-erro"} style={{ marginTop: 8 }}>
              <strong>{acertou ? "✔ Você acertou!" : `✘ Resposta certa: ${atual.letras[atual.correta]}`}</strong>
              {!acertou && atual.comentarios && escolha !== null && <> — {atual.comentarios[escolha]}</>}
            </div>
            <div className="enem-info" style={{ whiteSpace: "pre-line" }}>
              <strong>Como resolver:</strong> {atual.resolucao}
              {atual.fundamento && (
                <>
                  <br />
                  <span style={{ fontSize: 13 }}>📖 {atual.fundamento}</span>
                </>
              )}
            </div>
          </>
        )}

        <div className="enem-entre" style={{ marginTop: 12 }}>
          <button className="enem-btn sec" disabled={indice === 0} onClick={() => proximo(-1)}>← Anterior</button>
          {indice < lista.length - 1 ? (
            <button className="enem-btn" onClick={() => proximo(1)}>{respondido ? "Próximo →" : "Pular →"}</button>
          ) : (
            <button className="enem-btn ok" onClick={() => { setMateria(null); setEscolha(null); }}>Concluir matéria ✔</button>
          )}
        </div>
      </div>
    </>
  );
}
