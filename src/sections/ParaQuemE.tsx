import { FlaskConical, BarChart3, DollarSign, ShieldCheck } from "lucide-react";

const perfis = [
  {
    icon: FlaskConical,
    cargo: "Gerente de P&D / Laboratório",
    dor: "Fórmulas espalhadas em planilhas, revisões sem controle, custo de MP desatualizado.",
    ganho: "Fórmulas versionadas com aprovação, comparação ilimitada em kg e litros, custo automático por fórmula.",
    color: "#0284c7",
  },
  {
    icon: BarChart3,
    cargo: "Gerente de Produção / PCP",
    dor: "Ordens de produção manuais, falta de MP na hora errada, sem visibilidade de eficiência.",
    ganho: "OP integrada à fórmula aprovada, verificação de MP antes de produzir, KPIs de eficiência e perdas em tempo real.",
    color: "#059669",
  },
  {
    icon: DollarSign,
    cargo: "Diretor Financeiro / Controller",
    dor: "Custo de produto difícil de apurar, fiscal feito manualmente, DRE impreciso.",
    ganho: "Custo por lote apurado automaticamente, NF-e integrada com impostos calculados, DRE e fluxo de caixa consolidados.",
    color: "#7c3aed",
  },
  {
    icon: ShieldCheck,
    cargo: "Gerente de Qualidade",
    dor: "Laudos em papel, rastreabilidade impossível, não conformidades sem histórico.",
    ganho: "CQ integrado à produção, certificados de análise digitais, rastreabilidade completa do lote do recebimento ao cliente.",
    color: "#db2777",
  },
];

export default function ParaQuemE() {
  return (
    <section className="section" id="para-quem" style={{ background: "#f8fafc" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="badge" style={{ marginBottom: 16 }}>Para quem é o AXION ONE?</span>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1, marginBottom: 16, color: "#0f172a" }}>
            Feito para quem resolve<br />
            <span className="gradient-text">problemas reais</span>
          </h2>
          <p style={{ color: "#64748b", fontSize: 17, maxWidth: 520, margin: "0 auto" }}>
            Cada área da sua indústria tem dores específicas. O AXION ONE foi desenhado para resolver todas elas.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {perfis.map(p => {
            const Icon = p.icon;
            return (
              <div key={p.cargo} style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: 16,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: p.color + "15", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={22} color={p.color} />
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", lineHeight: 1.3 }}>{p.cargo}</h3>
                </div>

                <div style={{ padding: "12px 14px", background: "#fef2f2", borderRadius: 10, borderLeft: "3px solid #fca5a5" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#ef4444", marginBottom: 4, letterSpacing: 0.5 }}>PROBLEMA COMUM</div>
                  <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{p.dor}</p>
                </div>

                <div style={{ padding: "12px 14px", background: "#f0fdf4", borderRadius: 10, borderLeft: `3px solid ${p.color}` }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: p.color, marginBottom: 4, letterSpacing: 0.5 }}>COM O AXION ONE</div>
                  <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{p.ganho}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <a href="#contato" className="btn-primary" style={{ fontSize: 16, padding: "16px 36px" }}>
            Quero uma demonstração para minha indústria
          </a>
        </div>
      </div>
    </section>
  );
}
