import { axionSystems } from "../../data/systems";

export function CtaFinal() {
  return (
    <section className="section" style={{ background: "linear-gradient(160deg, #0c1b33 0%, #0f2952 100%)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 600, height: 300, background: "radial-gradient(ellipse, rgba(56,189,248,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(26px, 3.6vw, 42px)", fontWeight: 800, letterSpacing: -1, marginBottom: 16, color: "white", maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
          Sua empresa está pronta para conectar os processos?
        </h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", maxWidth: 520, margin: "0 auto 44px", lineHeight: 1.75 }}>
          Conheça o ecossistema Axion e encontre a solução que melhor se adapta ao seu negócio.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, maxWidth: 900, margin: "0 auto 44px" }}>
          {axionSystems.map(s => (
            <a key={s.id} href={s.href} style={{
              display: "flex", flexDirection: "column", gap: 4, padding: "16px 14px",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, textDecoration: "none",
            }}>
              <span style={{ fontWeight: 800, fontSize: 13.5, color: "white" }}>{s.name.toUpperCase()}</span>
              <span style={{ fontSize: 11, color: s.color }}>{s.tagline}</span>
            </a>
          ))}
        </div>

        <a href="#historia" className="btn-primary" style={{ fontSize: 16, padding: "16px 34px" }}>
          Conheça a Axion
        </a>
      </div>
    </section>
  );
}

export function FraseFinal() {
  return (
    <div style={{ background: "#060f1e", padding: "56px 0", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="container">
        <div style={{ fontWeight: 900, fontSize: 20, letterSpacing: -0.3, color: "white", marginBottom: 10 }}>
          AXION
        </div>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>
          Conectando processos. Impulsionando resultados.
        </p>
        <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.25)", letterSpacing: 1.5, textTransform: "uppercase" }}>
          Tecnologia · Integração · Inteligência · Inovação
        </p>
      </div>
    </div>
  );
}
