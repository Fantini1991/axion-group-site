import { Check } from "lucide-react";

const planos = [
  {
    name: "Gratuito",
    price: "R$ 0",
    period: "",
    desc: "Ideal para conhecer o sistema sem compromisso.",
    color: "#64748b",
    features: [
      "Acesso ao painel principal",
      "Laboratório / P&D (básico)",
      "Cadastro de produtos",
      "1 usuário",
      "Suporte via documentação",
    ],
    cta: "Começar grátis",
    highlight: false,
  },
  {
    name: "Mensal",
    price: "R$ 1.000",
    period: "por mês · até 10 usuários",
    desc: "Para indústrias em crescimento que precisam de flexibilidade.",
    color: "#0284c7",
    features: [
      "Todos os módulos ativos",
      "Até 10 usuários",
      "Fiscal completo (IBPT, ST, DIFAL)",
      "Suporte prioritário",
      "Onboarding incluso",
      "Atualizações automáticas",
    ],
    cta: "Falar com consultor",
    highlight: true,
  },
  {
    name: "Anual",
    price: "R$ 10.000",
    period: "por ano · economia de 17%",
    desc: "Para quem já decidiu e quer o melhor custo-benefício.",
    color: "#6366f1",
    features: [
      "Tudo do plano Mensal",
      "Até 10 usuários",
      "Treinamento aprofundado",
      "Gerente de conta dedicado",
      "SLA garantido",
      "Personalização de módulos",
    ],
    cta: "Falar com consultor",
    highlight: false,
  },
];

export default function Planos() {
  return (
    <section className="section" id="planos" style={{ background: "#f8fafc" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="badge" style={{ marginBottom: 16 }}>Planos e preços</span>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1, marginBottom: 16, color: "#0f172a" }}>
            Escolha o plano<br />
            <span className="gradient-text">certo para sua indústria</span>
          </h2>
          <p style={{ color: "#64748b", fontSize: 17 }}>
            Comece grátis e escale conforme sua operação cresce.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {planos.map(p => (
            <div key={p.name} style={{
              position: "relative", display: "flex", flexDirection: "column",
              background: p.highlight ? "#0c1b33" : "white",
              border: `1px solid ${p.highlight ? p.color + "44" : "#e2e8f0"}`,
              borderRadius: 16, padding: 28,
              boxShadow: p.highlight ? `0 8px 40px rgba(2,132,199,0.2)` : "0 1px 3px rgba(0,0,0,0.04)",
            }}>
              {p.highlight && (
                <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: p.color, color: "#fff", fontSize: 11, fontWeight: 800, padding: "4px 16px", borderRadius: 99, whiteSpace: "nowrap" }}>
                  MAIS POPULAR
                </div>
              )}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: p.highlight ? "#38bdf8" : p.color, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{p.name}</div>
                <div style={{ fontSize: 30, fontWeight: 900, color: p.highlight ? "white" : "#0f172a", lineHeight: 1 }}>{p.price}</div>
                <div style={{ fontSize: 12, color: p.highlight ? "rgba(255,255,255,0.4)" : "#94a3b8", marginTop: 4 }}>{p.period}</div>
                <p style={{ fontSize: 13, color: p.highlight ? "rgba(255,255,255,0.55)" : "#64748b", marginTop: 12, lineHeight: 1.6 }}>{p.desc}</p>
              </div>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, flex: 1, marginBottom: 24 }}>
                {p.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: p.highlight ? "rgba(255,255,255,0.7)" : "#64748b" }}>
                    <Check size={14} color={p.highlight ? "#38bdf8" : p.color} style={{ flexShrink: 0, marginTop: 2 }} />
                    {f}
                  </li>
                ))}
              </ul>

              <a href="#contato" style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "12px 20px", borderRadius: 10, fontWeight: 700, fontSize: 14,
                background: p.highlight ? "#38bdf8" : "transparent",
                border: `1px solid ${p.highlight ? "#38bdf8" : "#e2e8f0"}`,
                color: p.highlight ? "#0c1b33" : "#64748b",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => {
                  if (!p.highlight) {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = p.color;
                    (e.currentTarget as HTMLAnchorElement).style.color = p.color;
                  }
                }}
                onMouseLeave={e => {
                  if (!p.highlight) {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#e2e8f0";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#64748b";
                  }
                }}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
