import { FlaskConical, ShoppingCart, Package, Factory, Truck, BarChart3, DollarSign, FileText, Settings, Wrench, Users, CheckCircle2, TrendingUp } from "lucide-react";

const modulos = [
  { icon: FlaskConical, label: "Laboratório / P&D", desc: "Fórmulas, revisões, comparativos, especificações e histórico completo de desenvolvimento.", color: "#0284c7" },
  { icon: CheckCircle2, label: "Qualidade", desc: "CQ de matéria-prima, CQ final, certificados de análise e gestão de não conformidades.", color: "#16a34a" },
  { icon: ShoppingCart, label: "Compras", desc: "Solicitações, cotações, pedidos de compra, aprovações e histórico de fornecedores.", color: "#d97706" },
  { icon: Package, label: "Estoque", desc: "Recebimento com NF-e, lotes, validade, rastreabilidade, mínimo/máximo e inventário.", color: "#7c3aed" },
  { icon: TrendingUp, label: "PCP", desc: "Ordens de produção, verificação de disponibilidade, apontamento e indicadores.", color: "#2563eb" },
  { icon: Factory, label: "Produção", desc: "Terminal de apontamento, acompanhamento em tempo real e controle de rendimento.", color: "#059669" },
  { icon: Users, label: "Vendas / Comercial", desc: "Pedidos, orçamentos, assistência técnica, CRM, preços de produtos e simulador de margem.", color: "#db2777" },
  { icon: DollarSign, label: "Financeiro", desc: "Contas a pagar e receber, fluxo de caixa, DRE e centro de custos.", color: "#4f46e5" },
  { icon: FileText, label: "Fiscal", desc: "Tabela IBPT automática, ST por estado, DIFAL interestadual e regras tributárias.", color: "#dc2626" },
  { icon: Truck, label: "Logística", desc: "Expedição, transporte, rastreamento de entregas e controle de devoluções.", color: "#0284c7" },
  { icon: BarChart3, label: "BI / Indicadores", desc: "Dashboards por área, KPIs de produção, qualidade, vendas e custos.", color: "#7c3aed" },
  { icon: Wrench, label: "Manutenção / PCM", desc: "Preventiva, corretiva, ordens de serviço, calibração e MTBF/MTTR.", color: "#ea580c" },
  { icon: Settings, label: "Configurações", desc: "Multi-empresa, usuários, permissões por perfil, auditoria e integrações.", color: "#475569" },
];

export default function Modulos() {
  return (
    <section className="section" id="modulos" style={{ background: "white" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="badge" style={{ marginBottom: 16 }}>Plataforma completa</span>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1, marginBottom: 16, color: "#0f172a" }}>
            Tudo que sua indústria precisa,<br />
            <span className="gradient-text">em uma só plataforma</span>
          </h2>
          <p style={{ color: "#64748b", fontSize: 17, maxWidth: 560, margin: "0 auto" }}>
            13 módulos totalmente integrados, do laboratório ao faturamento.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {modulos.map(m => {
            const Icon = m.icon;
            return (
              <div key={m.label} style={{
                background: "#f8fafc", border: "1px solid #e2e8f0",
                borderRadius: 14, padding: "22px 20px",
                transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s", cursor: "default",
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = m.color + "55";
                  el.style.transform = "translateY(-3px)";
                  el.style.boxShadow = `0 8px 24px ${m.color}18`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = "#e2e8f0";
                  el.style.transform = "";
                  el.style.boxShadow = "";
                }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 9, background: m.color + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={18} color={m.color} />
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>{m.label}</span>
                </div>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65 }}>{m.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
