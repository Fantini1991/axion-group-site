import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./enem.css";
import { obterStatus, sair, validarSessao, type StatusServidor } from "./api";
import { EnemContexto, useEnem } from "./contexto";
import type { Usuario } from "./types";
import Acesso from "./pages/Acesso";
import Painel from "./pages/Painel";
import Prova from "./pages/Prova";
import ResultadoProva from "./pages/ResultadoProva";
import Redacao from "./pages/Redacao";
import CorrecaoRedacao from "./pages/CorrecaoRedacao";
import Ranking from "./pages/Ranking";
import Anteriores from "./pages/Anteriores";

function Topo() {
  const { usuario, definirUsuario } = useEnem();
  const navigate = useNavigate();
  return (
    <header className="enem-topo">
      <div className="enem-wrap">
        <Link to="/enem" className="enem-logo">
          📚 Simulado <span>ENEM</span>
        </Link>
        {usuario && (
          <nav className="enem-nav">
            <NavLink to="/enem" end className={({ isActive }) => (isActive ? "ativo" : "")}>Início</NavLink>
            <NavLink to="/enem/prova" className={({ isActive }) => (isActive ? "ativo" : "")}>Provas</NavLink>
            <NavLink to="/enem/redacao" className={({ isActive }) => (isActive ? "ativo" : "")}>Treino de redação</NavLink>
            <NavLink to="/enem/anteriores" className={({ isActive }) => (isActive ? "ativo" : "")}>ENEM anteriores</NavLink>
            <NavLink to="/enem/ranking" className={({ isActive }) => (isActive ? "ativo" : "")}>Ranking</NavLink>
            <button
              onClick={async () => {
                await sair();
                definirUsuario(null);
                navigate("/enem");
              }}
            >
              Sair
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

function Protegida({ children }: { children: ReactNode }) {
  const { usuario } = useEnem();
  return usuario ? <>{children}</> : <Navigate to="/enem" replace />;
}

export default function EnemApp() {
  const [status, setStatus] = useState<StatusServidor | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    document.title = "Simulado ENEM";
    (async () => {
      const s = await obterStatus();
      setUsuario(await validarSessao());
      setStatus(s);
    })();
  }, []);

  if (!status) {
    return (
      <div className="enem">
        <div className="enem-carregando">Carregando…</div>
      </div>
    );
  }

  return (
    <EnemContexto.Provider value={{ usuario, status, definirUsuario: setUsuario }}>
      <div className="enem">
        <Topo />
        <main className="enem-main">
          <div className="enem-wrap">
            <Routes>
              <Route index element={usuario ? <Painel /> : <Acesso />} />
              <Route path="prova" element={<Protegida><Prova /></Protegida>} />
              <Route path="prova/resultado/:id" element={<Protegida><ResultadoProva /></Protegida>} />
              <Route path="redacao" element={<Protegida><Redacao /></Protegida>} />
              <Route path="redacao/resultado/:id" element={<Protegida><CorrecaoRedacao /></Protegida>} />
              <Route path="anteriores" element={<Protegida><Anteriores /></Protegida>} />
              <Route path="ranking" element={<Protegida><Ranking /></Protegida>} />
              <Route path="*" element={<Navigate to="/enem" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </EnemContexto.Provider>
  );
}
