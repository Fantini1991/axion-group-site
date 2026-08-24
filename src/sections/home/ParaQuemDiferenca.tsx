import { Factory, Pill, UtensilsCrossed, Palette, ShoppingCart } from "lucide-react";

const publicos = [
  { icon: Factory, title: "Indústrias", text: "Para empresas que precisam controlar produção, estoque, qualidade e custos." },
  { icon: Pill, title: "Empresas farmacêuticas", text: "Para operações que exigem controle e rastreabilidade." },
  { icon: UtensilsCrossed, title: "Indústrias de alimentos", text: "Para empresas que precisam integrar produção, qualidade e estoque." },
  { icon: Palette, title: "Setor de tintas", text: "Para distribuidores e lojas/revendas — conectado ao Axion One pra quem também fabrica." },
  { icon: ShoppingCart, title: "Comércio e varejo", text: "Para mercados, lojas de roupas e outros negócios que precisam organizar vendas, estoque, compras e financeiro." },
];

export function ParaQuem() {
  return (
    <section className="section" style={{ background: "#f8fafc" }}>
      <div className="container">
        <div style={{ maxWidth: 560, marginBottom: 44 }}>
          <span className="badge" style={{ marginBottom: 20 }}>Para quem é a Axion?</span>
          <h2 style={{ fontSize: "clamp(26px, 3.2vw, 36px)", fontWeight: 800, letterSpacing: -1, color: "#0f172a" }}>
            Feito pra quem vive processo de verdade.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 18 }}>
          {publicos.map(p => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="card">
                <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(2,132,199,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <Icon size={19} color="#0284c7" />
                </div>
                <div style={{ fontWeight: 700, fontSize: 14.5, marginBottom: 6, color: "#0f172a" }}>{p.title}</div>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>{p.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function DiferencaAxion() {
  return (
    <section className="section" style={{ background: "white" }}>
      <div className="container" style={{ maxWidth: 720 }}>
        <span className="badge" style={{ marginBottom: 20 }}>A diferença Axion</span>
        <h2 style={{ fontSize: "clamp(26px, 3.2vw, 36px)", fontWeight: 800, letterSpacing: -1, marginBottom: 22, lineHeight: 1.3, color: "#0f172a" }}>
          Tecnologia sem complicar<br />o que já é complicado.
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 15.5, color: "#475569", lineHeight: 1.8 }}>
          <p>A Axion acredita que tecnologia boa não é aquela que possui mais telas. É aquela que consegue tornar o trabalho mais claro.</p>
          <p>Por isso, nossas soluções são construídas pensando em quem utiliza o sistema todos os dias: quem compra, quem vende, quem produz, quem analisa, quem controla, quem administra e quem toma decisões.</p>
        </div>
      </div>
    </section>
  );
}
