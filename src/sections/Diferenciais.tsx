import { Shield, Zap, Globe, Lock, RefreshCw, HeadphonesIcon } from "lucide-react";

const items = [
  {
    icon: Zap,
    title: "Desenvolvido para indústria de processo",
    desc: "Não é um ERP genérico adaptado. O AXION ONE foi construído do zero para indústrias químicas, tintas, vernizes e revestimentos — com as particularidades do setor no DNA do sistema.",
    color: "#f59e0b",
  },
  {
    icon: Shield,
    title: "Fiscal automático e atualizado",
    desc: "Tabela IBPT importada diretamente, ST por estado com MVA configurável e DIFAL interestadual calculado automaticamente. Conformidade fiscal sem configuração manual.",
    color: "#22c55e",
  },
  {
    icon: RefreshCw,
    title: "Rastreabilidade completa",
    desc: "Cada lote tem origem rastreável: da fórmula ao pedido de venda, passando por compras, estoque, produção e CQ. Conformidade total com auditorias e clientes exigentes.",
    color: "#22d3ee",
  },
  {
    icon: Globe,
    title: "100% web e multi-dispositivo",
    desc: "Acesse de qualquer navegador, em qualquer lugar. Sem instalação, sem VPN. Funciona no computador da fábrica, no celular do representante e no notebook do diretor.",
    color: "#818cf8",
  },
  {
    icon: Lock,
    title: "Multi-empresa e controle de acesso",
    desc: "Gerencie múltiplas unidades de negócio com dados isolados. Defina permissões por módulo, tela e usuário — com auditoria completa de todas as ações.",
    color: "#ec4899",
  },
  {
    icon: HeadphonesIcon,
    title: "Onboarding e suporte inclusos",
    desc: "Não entregamos um software e sumimos. Acompanhamos a implantação, treinamos a equipe e oferecemos suporte contínuo para garantir o sucesso do uso.",
    color: "#0ea5e9",
  },
];

export default function Diferenciais() {
  return (
    <section className="section" id="produto">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="badge" style={{ marginBottom: 16 }}>Por que AXION ONE?</span>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1, marginBottom: 16 }}>
            Pensado para quem<br />
            <span className="gradient-text">produz de verdade</span>
          </h2>
          <p style={{ color: "#94a3b8", fontSize: 17, maxWidth: 520, margin: "0 auto" }}>
            Cada funcionalidade foi desenvolvida a partir das necessidades reais da indústria de processo.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {items.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.title} style={{ display: "flex", gap: 20, padding: "28px 0", borderBottom: "1px solid #1e2d42" }}>
                <div style={{ flexShrink: 0, width: 48, height: 48, borderRadius: 12, background: item.color + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={22} color={item.color} />
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: "#f1f5f9" }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
