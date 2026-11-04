import { Link } from "react-router-dom";
import { temasAnteriores } from "../data/temas";

/** Página oficial do INEP com as provas e os gabaritos de todas as edições. */
const INEP_PROVAS = "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos";

/** As 4 edições mais recentes, da mais nova para a mais antiga. */
const EDICOES = [...temasAnteriores].sort((a, b) => (b.ano ?? 0) - (a.ano ?? 0)).slice(0, 4);

export default function Anteriores() {
  return (
    <>
      <h1>ENEM anteriores</h1>
      <p className="sub" style={{ marginBottom: 16 }}>
        As provas e os temas de redação das últimas 4 edições do ENEM. Veja a prova oficial e escreva a redação com o tema
        daquele ano: a correção aqui no simulado é feita nas 5 competências, como no ENEM.
      </p>

      <div className="enem-info">
        <strong>Como usar:</strong> a prova completa e o gabarito oficial ficam no site do INEP (botão “Prova e gabarito”). Lá você
        pode resolver as questões e conferir com o gabarito. Já a redação você escreve aqui e recebe a correção na hora. Essas
        redações são treino e não entram no ranking.
      </div>

      <div style={{ display: "grid", gap: 16 }}>
        {EDICOES.map((t) => (
          <div key={t.id} className="enem-card">
            <div className="enem-entre" style={{ marginBottom: 8 }}>
              <span className="enem-tag">ENEM {t.ano}</span>
            </div>
            <p className="sub" style={{ fontSize: 13, marginBottom: 2 }}>Tema da redação</p>
            <h3 style={{ marginBottom: 12 }}>“{t.titulo}”</h3>
            <div className="enem-linha" style={{ gap: 8 }}>
              <Link to={`/enem/redacao?tema=${t.id}`} className="enem-btn" style={{ padding: "9px 14px", fontSize: 14 }}>
                ✍️ Escrever esta redação
              </Link>
              <a href={INEP_PROVAS} target="_blank" rel="noopener noreferrer" className="enem-btn sec" style={{ padding: "9px 14px", fontSize: 14 }}>
                📄 Prova e gabarito (INEP) ↗
              </a>
            </div>
          </div>
        ))}
      </div>

      <p className="sub" style={{ fontSize: 13, marginTop: 16 }}>
        Os textos de apoio mostrados na hora de escrever foram preparados para treino. Os textos motivadores originais de cada ano
        estão no caderno de prova oficial, no site do INEP. Os temas de 2016 a 2021 também estão disponíveis em{" "}
        <Link to="/enem/redacao" style={{ color: "var(--e-primaria)", fontWeight: 600 }}>Treino de redação</Link>.
      </p>
    </>
  );
}
