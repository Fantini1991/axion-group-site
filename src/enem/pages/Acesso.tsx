import { useState, type FormEvent } from "react";
import { cadastrar, entrar } from "../api";
import { useEnem } from "../contexto";

export default function Acesso() {
  const { status, definirUsuario } = useEnem();
  const [aba, setAba] = useState<"entrar" | "cadastrar">("entrar");
  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [convite, setConvite] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function enviar(e: FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      const u = aba === "entrar" ? await entrar(username, senha) : await cadastrar(nome, username, senha, convite);
      definirUsuario(u);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Algo deu errado.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", alignItems: "start" }}>
      <div>
        <span className="enem-tag">Treino para o ENEM</span>
        <h1 style={{ marginTop: 12 }}>Simulado ENEM com correção explicada</h1>
        <p className="sub" style={{ marginBottom: 16 }}>
          Questões montadas a partir dos conteúdos que mais caíram no ENEM de 2016 a 2025, redação com temas no estilo da
          prova e correção que mostra <strong>por que você errou e como deveria ter feito</strong>.
        </p>
        <ul className="enem-lista">
          <li><strong>Prova objetiva</strong> nas 4 áreas, com nota estimada de 0 a 1000 por área.</li>
          <li><strong>Correção questão por questão</strong>, com o comentário de cada alternativa.</li>
          <li><strong>Redação</strong> corrigida nas 5 competências do ENEM, com dicas de como melhorar.</li>
          <li><strong>Ranking</strong> para ver quem está mandando melhor na turma.</li>
        </ul>
      </div>

      <div className="enem-card">
        <div className="enem-abas">
          <button className={aba === "entrar" ? "ativo" : ""} onClick={() => setAba("entrar")} type="button">Entrar</button>
          <button className={aba === "cadastrar" ? "ativo" : ""} onClick={() => setAba("cadastrar")} type="button">Criar conta</button>
        </div>
        {status.modo === "local" && (
          <div className="enem-aviso">
            Modo local: as contas e notas ficam salvas só neste navegador. Para o ranking funcionar entre aparelhos
            diferentes, o servidor precisa ter o banco de dados configurado.
          </div>
        )}
        {erro && <div className="enem-erro">{erro}</div>}
        <form onSubmit={enviar}>
          {aba === "cadastrar" && (
            <div className="enem-campo">
              <label htmlFor="nome">Seu nome</label>
              <input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex.: João Pedro" maxLength={40} required />
            </div>
          )}
          <div className="enem-campo">
            <label htmlFor="usuario">Usuário</label>
            <input
              id="usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ""))}
              placeholder="ex.: joao.pedro"
              autoCapitalize="none"
              autoComplete="username"
              required
            />
            {aba === "cadastrar" && <small>Letras minúsculas, números, ponto ou _ (3 a 20 caracteres).</small>}
          </div>
          <div className="enem-campo">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete={aba === "entrar" ? "current-password" : "new-password"}
              required
            />
            {aba === "cadastrar" && <small>Mínimo de 4 caracteres.</small>}
          </div>
          {aba === "cadastrar" && status.convite && (
            <div className="enem-campo">
              <label htmlFor="convite">Código de convite</label>
              <input id="convite" value={convite} onChange={(e) => setConvite(e.target.value)} required />
              <small>Peça o código para quem criou o simulado.</small>
            </div>
          )}
          <button className="enem-btn" style={{ width: "100%" }} disabled={carregando}>
            {carregando ? "Aguarde…" : aba === "entrar" ? "Entrar" : "Criar conta e começar"}
          </button>
        </form>
      </div>
    </div>
  );
}
