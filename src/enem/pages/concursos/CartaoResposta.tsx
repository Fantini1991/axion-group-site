import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { salvarConcurso } from "../../api";
import { useEnem } from "../../contexto";
import { corrigirOficial } from "../../concursos/logica";
import { buscarProvaOficial } from "../../concursos/provasOficiais";

export default function CartaoResposta() {
  const { id } = useParams();
  const prova = buscarProvaOficial(id);
  const { usuario } = useEnem();
  const navigate = useNavigate();
  const chave = `enem:cartao:${usuario?.username}:${id}`;
  const [respostas, setRespostas] = useState<Record<number, string>>(() => {
    try {
      return JSON.parse(localStorage.getItem(chave) || "{}");
    } catch {
      return {};
    }
  });
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(respostas));
    } catch {
      /* ignore */
    }
  }, [respostas, chave]);

  if (!prova) return <Navigate to="/enem/concursos/oficiais" replace />;
  const opcoes = prova.formato === "CE" ? ["C", "E"] : ["A", "B", "C", "D", "E"];
  const marcadas = Object.values(respostas).filter(Boolean).length;

  const marcar = (n: number, v: string) => setRespostas((r) => ({ ...r, [n]: r[n] === v ? "" : v }));

  async function corrigir() {
    const brancos = prova!.gabarito.length - marcadas;
    if (brancos > 0 && !window.confirm(`Há ${brancos} item(ns) em branco. Corrigir mesmo assim?`)) return;
    setEnviando(true);
    setErro("");
    const resultado = corrigirOficial(prova!, Object.fromEntries(Object.entries(respostas).filter(([, v]) => v)) as Record<number, string>);
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

  return (
    <>
      <span className="enem-tag">{prova.banca} · {prova.ano}</span>
      <h1 style={{ marginTop: 8 }}>Cartão-resposta — {prova.cargo}</h1>
      <div className="enem-info">
        Abra o caderno oficial (links abaixo), resolva e marque aqui. Clique de novo numa opção para deixar o item em branco.
        {prova.formato === "CE" && " No Cebraspe, cada erro anula um acerto: na dúvida, deixar em branco pode compensar."}
      </div>
      <div className="enem-linha" style={{ gap: 8, marginBottom: 16 }}>
        {prova.cadernos.map((c) => (
          <a key={c.url} href={c.url} target="_blank" rel="noopener noreferrer" className="enem-btn sec" style={{ padding: "6px 12px", fontSize: 13 }}>
            📄 {c.nome} ↗
          </a>
        ))}
      </div>
      {erro && <div className="enem-erro">{erro}</div>}

      {prova.materias.map((m) => (
        <div key={m.nome} className="enem-card" style={{ marginBottom: 12 }}>
          <h3 style={{ marginBottom: 10 }}>{m.nome} <span className="sub" style={{ fontSize: 13, fontWeight: 500 }}>(itens {m.de} a {m.ate})</span></h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
            {Array.from({ length: m.ate - m.de + 1 }, (_, k) => m.de + k).map((n) => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 30, fontWeight: 700, fontSize: 13, textAlign: "right" }}>{n}</span>
                {opcoes.map((o) => (
                  <button
                    key={o}
                    onClick={() => marcar(n, o)}
                    style={{
                      width: 26, height: 26, borderRadius: 6, fontSize: 12, fontWeight: 700,
                      border: "1px solid var(--e-borda)",
                      background: respostas[n] === o ? "var(--e-primaria)" : "#fff",
                      color: respostas[n] === o ? "#fff" : "var(--e-texto)",
                    }}
                  >
                    {o}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="enem-card enem-entre" style={{ position: "sticky", bottom: 12 }}>
        <span className="sub" style={{ fontSize: 14 }}>{marcadas} de {prova.gabarito.length} marcadas</span>
        <button className="enem-btn ok" disabled={enviando} onClick={corrigir}>{enviando ? "Corrigindo…" : "Corrigir com gabarito oficial"}</button>
      </div>
    </>
  );
}
