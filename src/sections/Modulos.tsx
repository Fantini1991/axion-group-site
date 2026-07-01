import { FlaskConical, ShoppingCart, Package, Factory, Truck, BarChart3, DollarSign, FileText, Settings, Wrench, Users, CheckCircle2, TrendingUp } from "lucide-react";

const modulos = [
  { icon: FlaskConical, label: "Laboratório / P&D", desc: "Fórmulas, revisões, comparativos, especificações e histórico completo de desenvolvimento.", color: "#22d3ee" },
  { icon: CheckCircle2, label: "Qualidade", desc: "CQ de matéria-prima, CQ final, certificados de análise e gestão de não conformidades.", color: "#22c55e" },
  { icon: ShoppingCart, label: "Compras", desc: "Solicitações, cotações, pedidos de compra, aprovações e histórico de fornecedores.", color: "#f59e0b" },
  { icon: Package, label: "Estoque", desc: "Recebimento com NF-e, lotes, validade, rastreabilidade, mínimo/máximo e inventário.", color: "#8b5cf6" },
  { icon: TrendingUp, label: "PCP", desc: "Ordens de produção, verificação de disponibilidade, apontamento e indicadores.", color: "#3b82f6" },
  { icon: Factory, label: "Produção", desc: "Terminal de apontamento, acompanhamento em tempo real e controle de rendimento.", color: "#10b981" },
  { icon: Users, label: "Vendas / Comercial", desc: "Pedidos, orçamentos, assistência técnica, CRM, preços de produtos e simulador de margem.", color: "#ec4899" },
  { icon: DollarSign, label: "Financeiro", desc: "Contas a pagar e receber, fluxo de caixa, DRE e centro de custos.", color: "#6366f1" },
  { icon: FileText, label: "Fiscal", desc: "Tabela IBPT automática, ST por estado, DIFAL interestadual e regras tributárias.", color: "#ef4444" },
  { icon: Truck, label: "Logística", desc: "Expedição, transporte, rastreamento de entregas e controle de devoluções.", color: "#0ea5e9" },
  { icon: BarChart3, label: "BI / Indicadores", desc: "Dashboards por área, KPIs de produção, qualidade, vendas e custos.", color: "#a855f7" },
  { icon: Wrench, label: "Manutenção / PCM", desc: "Preventiva, corretiva, ordens de serviço, calibração e MTBF/MTTR.", color: "#f97316" },
  { icon: Settings, label: "Configurações", desc: "Multi-empresa, usuários, permissões por perfil, auditoria e integrações.", color: "#64748b" },
];

export default function Modulos() {
  return (
    <section className="section" id="modulos" style={{ background: "var(--surface)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="badge" style={{ marginBottom: 16 }}>Plataforma completa</span>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1, marginBottom: 16 }}>
            Tudo que sua indústria precisa,<br />
            <span className="gradient-text">em uma só plataforma</span>
          </h2>
          <p style={{ color: "#94a3b8", fontSize: 17, maxWidth: 560, margin: "0 auto" }}>
            13 módulos totalmente integrados, do laboratório ao faturamento.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {modulos.map(m => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="card" style={{ transition: "border-color 0.2s, transform 0.2s", cursor: "default" }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = m.color + "44";
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = "";
                  el.style.transform = "";
                }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: m.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={20} color={m.color} />
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{m.label}</span>
                </div>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>{m.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
