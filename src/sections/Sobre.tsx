import { Target, Eye, Heart } from "lucide-react";

export default function Sobre() {
  return (
    <section className="section" id="sobre" style={{ background: "white" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <span className="badge" style={{ marginBottom: 20 }}>Quem somos</span>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, letterSpacing: -1, marginBottom: 20, lineHeight: 1.2, color: "#0f172a" }}>
              Tecnologia feita por quem<br />
              <span className="gradient-text">entende a indústria</span>
            </h2>
            <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              A <strong style={{ color: "#0f172a" }}>AXION GROUP</strong> nasceu da necessidade real de indústrias de processo que não encontravam no mercado um sistema feito para a sua realidade — com fórmulas, lotes, rastreabilidade, fiscal complexo e múltiplos módulos integrados.
            </p>
            <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.8 }}>
              Desenvolvemos o <strong style={{ color: "#0284c7" }}>AXION ONE</strong> para ser o sistema que essas indústrias merecem: completo, moderno, 100% web e em constante evolução.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              {
                icon: Target,
                title: "Missão",
                text: "Digitalizar a indústria brasileira com tecnologia acessível, integrada e desenvolvida para a realidade do setor.",
                color: "#0284c7",
              },
              {
                icon: Eye,
                title: "Visão",
                text: "Ser o sistema de referência para indústrias de processo no Brasil até 2027.",
                color: "#6366f1",
              },
              {
                icon: Heart,
                title: "Valores",
                text: "Parceria real com o cliente, evolução contínua, transparência e comprometimento com resultados.",
                color: "#ec4899",
              },
            ].map(v => {
              const Icon = v.icon;
              return (
                <div key={v.title} style={{ display: "flex", gap: 16, padding: "20px 24px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 14 }}>
                  <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 10, background: v.color + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={20} color={v.color} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: v.color }}>{v.title}</div>
                    <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>{v.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #sobre .container > div { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
