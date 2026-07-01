import { Check } from "lucide-react";

const planos = [
  {
    name: "Gratuito",
    price: "R$ 0",
    period: "para sempre",
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
    price: "Sob consulta",
    period: "por mês",
    desc: "Para indústrias em crescimento que precisam de flexibilidade.",
    color: "#0ea5e9",
    features: [
      "Todos os módulos ativos",
      "Multi-usuário ilimitado",
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
    price: "Melhor custo",
    period: "economia de até 20%",
    desc: "Para quem já decidiu e quer o melhor custo-benefício.",
    color: "#818cf8",
    features: [
      "Tudo do plano Mensal",
      "Desconto de até 20%",
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
    <section className="section" id="planos" style={{ background: "var(--surface)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="badge" style={{ marginBottom: 16 }}>Planos e preços</span>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1, marginBottom: 16 }}>
            Escolha o plano<br />
            <span className="gradient-text">certo para sua indústria</span>
          </h2>
          <p style={{ color: "#94a3b8", fontSize: 17 }}>
            Comece grátis e escale conforme sua operação cresce.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {planos.map(p => (
            <div key={p.name} className="card" style={{
              position: "relative", display: "flex", flexDirection: "column",
              borderColor: p.highlight ? p.color + "55" : undefined,
              boxShadow: p.highlight ? `0 0 40px ${p.color}18` : undefined,
            }}>
              {p.highlight && (
                <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: p.color, color: "#fff", fontSize: 11, fontWeight: 800, padding: "4px 16px", borderRadius: 99, whiteSpace: "nowrap" }}>
                  MAIS POPULAR
                </div>
              )}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: p.color, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{p.name}</div>
                <div style={{ fontSize: 30, fontWeight: 900, color: "#f1f5f9", lineHeight: 1 }}>{p.price}</div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{p.period}</div>
                <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 12, lineHeight: 1.6 }}>{p.desc}</p>
              </div>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, flex: 1, marginBottom: 24 }}>
                {p.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#94a3b8" }}>
                    <Check size={14} color={p.color} style={{ flexShrink: 0, marginTop: 2 }} />
                    {f}
                  </li>
                ))}
              </ul>

              <a href="#contato" style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "12px 20px", borderRadius: 10, fontWeight: 700, fontSize: 14,
                background: p.highlight ? p.color : "transparent",
                border: `1px solid ${p.highlight ? p.color : "#1e2d42"}`,
                color: p.highlight ? "#fff" : "#94a3b8",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { if (!p.highlight) { (e.currentTarget as HTMLAnchorElement).style.borderColor = p.color; (e.currentTarget as HTMLAnchorElement).style.color = p.color; } }}
                onMouseLeave={e => { if (!p.highlight) { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1e2d42"; (e.currentTarget as HTMLAnchorElement).style.color = "#94a3b8"; } }}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
