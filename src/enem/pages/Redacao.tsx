import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { corrigirComIA, salvarRedacao } from "../api";
import { useEnem } from "../contexto";
import { corrigirLocalmente } from "../corretorLocal";
import { buscarProva } from "../data/provas";
import { buscarTema, temasAnteriores, temasPropostos } from "../data/temas";
import type { CorrecaoRedacao, ResultadoRedacao } from "../types";

const CARACTERES_POR_LINHA = 75;

/** Remonta a página ao trocar entre treino livre e a redação de uma prova. */
export default function Redacao() {
  const [params] = useSearchParams();
  return <RedacaoPagina key={params.get("prova") ?? "livre"} />;
}

function RedacaoPagina() {
  const { usuario, status } = useEnem();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const provaOficial = buscarProva(params.get("prova") ?? undefined);
  const chaveRascunho = `enem:rascunho-redacao:${usuario?.username}${provaOficial ? `:${provaOficial.id}` : ""}`;

  const [lista, setLista] = useState<"propostos" | "anteriores">("propostos");
  const [temaId, setTemaId] = useState<string | null>(() => {
    if (provaOficial) return provaOficial.temaRedacaoId;
    try {
      return (JSON.parse(localStorage.getItem(chaveRascunho) || "null") as { temaId: string } | null)?.temaId ?? null;
    } catch {
      return null;
    }
  });
  const [texto, setTexto] = useState(() => {
    try {
      return (JSON.parse(localStorage.getItem(chaveRascunho) || "null") as { texto: string } | null)?.texto ?? "";
    } catch {
      return "";
    }
  });
  const [corrigindo, setCorrigindo] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    try {
      if (temaId) localStorage.setItem(chaveRascunho, JSON.stringify({ temaId, texto }));
    } catch {
      /* ignore */
    }
  }, [temaId, texto, chaveRascunho]);

  const tema = temaId ? buscarTema(temaId) : undefined;
  const palavras = texto.trim() ? texto.trim().split(/\s+/).length : 0;
  const linhas = texto
    .split("\n")
    .reduce((s, l) => s + Math.max(1, Math.ceil(l.length / CARACTERES_POR_LINHA)), 0);
  const linhasExibidas = texto.trim() ? linhas : 0;

  function sortear() {
    const todos = lista === "propostos" ? temasPropostos : temasAnteriores;
    setTemaId(todos[Math.floor(Math.random() * todos.length)].id);
  }

  async function enviar() {
    if (!tema) return;
    if (linhasExibidas < 8 && !window.confirm("Seu texto tem poucas linhas e provavelmente receberá nota zero. Enviar mesmo assim?")) return;
    setCorrigindo(true);
    setErro("");
    let correcao: CorrecaoRedacao;
    let aviso = "";
    if (status.ia) {
      try {
        const textosMotivadores = tema.textos.map((t) => `${t.titulo}: ${t.conteudo}`).join("\n");
        correcao = await corrigirComIA(tema.titulo, textosMotivadores, texto);
      } catch (e) {
        aviso = `A correção por IA falhou (${(e as Error).message}). Foi usada a correção automática.`;
        correcao = corrigirLocalmente(texto, tema);
      }
    } else {
      correcao = corrigirLocalmente(texto, tema);
    }
    const resultado: ResultadoRedacao = {
      id: crypto.randomUUID(),
      data: new Date().toISOString(),
      temaId: tema.id,
      temaTitulo: tema.titulo,
      ...(provaOficial ? { provaId: provaOficial.id } : {}),
      texto,
      correcao,
    };
    try {
      await salvarRedacao(resultado);
    } catch (e) {
      setErro(`Não foi possível salvar a redação: ${(e as Error).message}. Seu texto continua salvo aqui; tente de novo.`);
      setCorrigindo(false);
      return;
    }
    try {
      localStorage.removeItem(chaveRascunho);
    } catch {
      /* ignore */
    }
    navigate(`/enem/redacao/resultado/${resultado.id}`, { state: { resultado, aviso } });
  }

  if (!tema) {
    const temas = lista === "propostos" ? temasPropostos : temasAnteriores;
    return (
      <>
        <h1>Redação — treino livre</h1>
        <div className="enem-info">
          As redações que contam para o ranking ficam dentro de cada prova, na página <strong>Provas</strong>. Aqui você treina
          com qualquer tema.
        </div>
        <p className="sub" style={{ marginBottom: 18 }}>
          Escolha um tema. Os <strong>temas inéditos</strong> foram criados no estilo do ENEM, a partir dos assuntos que mais
          apareceram de 2016 a 2025. Você também pode treinar com os <strong>temas oficiais</strong> das últimas 10 edições.
        </p>
        <div className="enem-abas">
          <button className={lista === "propostos" ? "ativo" : ""} onClick={() => setLista("propostos")}>Temas inéditos</button>
          <button className={lista === "anteriores" ? "ativo" : ""} onClick={() => setLista("anteriores")}>ENEM 2016–2025</button>
          <button onClick={sortear}>🎲 Sortear tema</button>
        </div>
        <div className="enem-grid">
          {temas.map((t) => (
            <button
              key={t.id}
              className="enem-card"
              style={{ textAlign: "left", cursor: "pointer", font: "inherit", color: "inherit" }}
              onClick={() => setTemaId(t.id)}
            >
              {t.ano && <span className="enem-tag">ENEM {t.ano}</span>}
              <p style={{ fontWeight: 700, marginTop: t.ano ? 8 : 0 }}>{t.titulo}</p>
            </button>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="enem-entre" style={{ marginBottom: 10 }}>
        <span className="enem-tag">
          {provaOficial ? `Redação da ${provaOficial.nome} — ${provaOficial.eixo}` : tema.ano ? `Tema do ENEM ${tema.ano}` : "Tema inédito"}
        </span>
        {!provaOficial && <button
          className="enem-btn sec"
          style={{ padding: "6px 12px", fontSize: 14 }}
          onClick={() => {
            if (texto.trim() && !window.confirm("Trocar de tema? O texto escrito será descartado.")) return;
            setTexto("");
            setTemaId(null);
            try {
              localStorage.removeItem(chaveRascunho);
            } catch {
              /* ignore */
            }
          }}
        >
          Trocar tema
        </button>}
      </div>

      <div className="enem-card" style={{ marginBottom: 16 }}>
        <h3>Proposta de redação</h3>
        <p style={{ marginBottom: 10 }}>
          A partir da leitura dos textos motivadores e com base nos conhecimentos construídos ao longo de sua formação, redija um
          texto dissertativo-argumentativo em modalidade escrita formal da língua portuguesa sobre o tema{" "}
          <strong>“{tema.titulo}”</strong>, apresentando proposta de intervenção que respeite os direitos humanos. Selecione,
          organize e relacione, de forma coerente e coesa, argumentos e fatos para defesa de seu ponto de vista.
        </p>
        {tema.textos.map((t) => (
          <div key={t.titulo} className="enem-texto-base">
            <strong>{t.titulo}</strong>
            {"\n"}
            {t.conteudo}
          </div>
        ))}
        <details style={{ marginTop: 10 }}>
          <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: 14 }}>Dicas de estrutura (clique para ver)</summary>
          <ul className="enem-lista" style={{ marginTop: 8, fontSize: 15 }}>
            <li><strong>Introdução:</strong> contextualize com um repertório (lei, dado, autor, fato histórico) e apresente sua tese e os dois argumentos.</li>
            <li><strong>Desenvolvimento 1 e 2:</strong> um argumento em cada parágrafo — ideia, fundamentação, explicação e fechamento.</li>
            <li><strong>Conclusão:</strong> proposta de intervenção com agente, ação, meio, finalidade e detalhamento.</li>
            <li>Escreva entre 20 e 30 linhas, sem gírias e sem 1ª pessoa (“eu acho”).</li>
          </ul>
        </details>
      </div>

      {!status.ia && (
        <div className="enem-info">
          A correção será feita pelo corretor automático, que analisa estrutura, conectivos, repertório, desvios comuns e os 5
          elementos da proposta de intervenção. É uma estimativa da nota.
        </div>
      )}
      {erro && <div className="enem-erro">{erro}</div>}

      <textarea
        className="enem-redacao-area"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escreva sua redação aqui. Separe os parágrafos com uma linha em branco ou Enter."
      />
      <div className="enem-entre" style={{ marginTop: 10 }}>
        <span className="sub" style={{ fontSize: 14, color: linhasExibidas > 30 ? "var(--e-erro)" : undefined }}>
          ≈ {linhasExibidas} linha(s) de 30 · {palavras} palavra(s)
        </span>
        <button className="enem-btn ok" disabled={corrigindo || palavras < 20} onClick={enviar}>
          {corrigindo ? (status.ia ? "Corrigindo com IA… (pode levar até 1 min)" : "Corrigindo…") : "Enviar para correção"}
        </button>
      </div>
    </>
  );
}
