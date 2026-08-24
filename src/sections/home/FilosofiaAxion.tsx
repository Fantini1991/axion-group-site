const passos = [
  { n: "01", t: "Entender", d: "Primeiro precisamos entender como a empresa realmente trabalha." },
  { n: "02", t: "Organizar", d: "Processos, informações e responsabilidades precisam estar estruturados." },
  { n: "03", t: "Integrar", d: "As áreas deixam de trabalhar como ilhas." },
  { n: "04", t: "Controlar", d: "A empresa passa a ter maior visibilidade sobre suas operações." },
  { n: "05", t: "Analisar", d: "Os dados começam a mostrar onde estão os problemas e oportunidades." },
  { n: "06", t: "Evoluir", d: "A tecnologia passa a acompanhar o crescimento do negócio." },
];

export function PorTrasDosSistemas() {
  return (
    <section className="section-sm" style={{ background: "#f8fafc" }}>
      <div className="container" style={{ maxWidth: 720, textAlign: "center" }}>
        <span className="badge" style={{ marginBottom: 20 }}>O que existe por trás dos sistemas Axion?</span>
        <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 800, letterSpacing: -1, marginBottom: 18, color: "#0f172a" }}>
          Não são sistemas isolados.
        </h2>
        <p style={{ fontSize: 15.5, color: "#475569", lineHeight: 1.8 }}>
          Os produtos Axion possuem propostas específicas para diferentes segmentos, mas compartilham uma mesma filosofia: <strong style={{ color: "#0284c7" }}>integração</strong>. A empresa pode começar utilizando uma solução específica e evoluir conforme suas necessidades.
        </p>
      </div>
    </section>
  );
}

export function ComoPensaAGestao() {
  return (
    <section className="section" style={{ background: "#0c1b33", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: "-10%", right: "0%", width: 420, height: 420, background: "radial-gradient(ellipse, rgba(56,189,248,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 52px" }}>
          <span className="badge-navy" style={{ marginBottom: 20 }}>Como a Axion pensa a gestão</span>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 800, letterSpacing: -1, color: "white" }}>
            Um processo, não um produto.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 4 }}>
          {passos.map((p, i) => (
            <div key={p.n} style={{ padding: "20px 16px", borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: "#38bdf8", marginBottom: 10 }}>{p.n}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "white", marginBottom: 6 }}>{p.t}</div>
              <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NaoApenasSoftware() {
  return (
    <section className="section" style={{ background: "white" }}>
      <div className="container" style={{ maxWidth: 720 }}>
        <span className="badge" style={{ marginBottom: 20 }}>Axion não é apenas software</span>
        <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 800, letterSpacing: -1, marginBottom: 22, lineHeight: 1.3, color: "#0f172a" }}>
          É uma forma diferente de enxergar a gestão.
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 15.5, color: "#475569", lineHeight: 1.8, marginBottom: 20 }}>
          <p>Um sistema pode registrar uma venda.<br />Outro pode controlar um estoque.<br />Outro pode emitir uma ordem de produção.</p>
          <p>Mas quando essas informações permanecem separadas, a empresa continua tendo o mesmo problema: <strong style={{ color: "#0f172a" }}>informações desconectadas.</strong></p>
        </div>
        <p style={{ fontSize: 17, fontWeight: 700, color: "#0284c7" }}>
          A proposta da Axion é ir além. Conectar processos para transformar informação em gestão.
        </p>
      </div>
    </section>
  );
}
