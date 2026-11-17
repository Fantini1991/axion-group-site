import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { salvarConcurso } from "../../api";
import { useEnem } from "../../contexto";
import { DISCURSIVAS, TRILHAS, type Trilha } from "../../concursos/dados";
import { corrigirDiscursiva } from "../../concursos/logica";

export default function DiscursivaConcurso() {
  const { trilha } = useParams();
  const t = trilha === "PF" || trilha === "RFB" ? (trilha as Trilha) : null;
  const { usuario } = useEnem();
  const navigate = useNavigate();
  const chave = `enem:concurso-discursiva:${usuario?.username}:${t}`;
  const [texto, setTexto] = useState(() => {
    try {
      return localStorage.getItem(chave) ?? "";
    } catch {
      return "";
    }
  });
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(chave, texto);
    } catch {
      /* ignore */
    }
  }, [texto, chave]);

  if (!t) return <Navigate to="/enem/concursos" replace />;
  const d = DISCURSIVAS[t];
  const info = TRILHAS[t];
  const linhas = texto.trim() ? texto.split("\n").reduce((s, l) => s + Math.max(1, Math.ceil(l.length / 70)), 0) : 0;
  const palavras = texto.trim() ? texto.trim().split(/\s+/).length : 0;

  async function enviar() {
    setEnviando(true);
    setErro("");
    const resultado = corrigirDiscursiva(t!, texto);
    try {
      await salvarConcurso(resultado);
    } catch (e) {
      setErro(`Não foi possível salvar: ${(e as Error).message}. Seu texto continua aqui; tente de novo.`);
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

  return (
    <>
      <span className="enem-tag" style={{ background: `${info.cor}18`, color: info.cor }}>{info.nome}</span>
      <h1 style={{ marginTop: 8 }}>Discursiva</h1>
      <div className="enem-card" style={{ marginBottom: 16 }}>
        <h3>Tema: {d.tema}</h3>
        <p style={{ margin: "8px 0" }}>{d.comando}</p>
        <ul className="enem-lista">
          {d.topicos.map((tp) => <li key={tp.titulo}>{tp.titulo}</li>)}
        </ul>
        <p className="sub" style={{ fontSize: 13, marginTop: 8 }}>
          Extensão: até {d.linhasMax} linhas. Nota = conteúdo (0 a 10) − 2 × erros de língua ÷ linhas escritas, como nas bancas.
        </p>
      </div>
      <div className="enem-info">
        Correção automática: o texto é avaliado pela presença dos conceitos esperados em cada tópico e pelos erros de língua mais
        comuns. Na correção você vê o padrão de resposta completo para comparar com o seu texto.
      </div>
      {erro && <div className="enem-erro">{erro}</div>}
      <textarea
        className="enem-redacao-area"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escreva seu texto aqui, separando os parágrafos com Enter."
      />
      <div className="enem-entre" style={{ marginTop: 10 }}>
        <span className="sub" style={{ fontSize: 14, color: linhas > d.linhasMax ? "var(--e-erro)" : undefined }}>
          ≈ {linhas} de {d.linhasMax} linhas · {palavras} palavras
        </span>
        <button className="enem-btn ok" disabled={enviando || palavras < 20} onClick={enviar}>
          {enviando ? "Corrigindo…" : "Enviar para correção"}
        </button>
      </div>
    </>
  );
}
