export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "#080c16", borderTop: "1px solid #1e2d42", padding: "48px 0 32px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #22d3ee, #0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "#0a0e1a" }}>A</div>
              <span style={{ fontWeight: 800, fontSize: 16 }}>AXION <span style={{ color: "#22d3ee" }}>GROUP</span></span>
            </div>
            <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, maxWidth: 260 }}>
              Tecnologia para a indústria brasileira. Do laboratório ao faturamento, em uma só plataforma.
            </p>
          </div>

          {[
            { title: "Produto", links: ["Módulos", "Planos", "Demonstração", "Atualizações"] },
            { title: "Empresa", links: ["Sobre nós", "Missão", "Contato", "Parceiros"] },
            { title: "Suporte", links: ["Documentação", "Treinamento", "Status do sistema", "Fale conosco"] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#f1f5f9", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>{col.title}</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(l => (
                  <li key={l}><a href="#" style={{ fontSize: 13, color: "#475569", transition: "color 0.2s" }}
                    onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = "#94a3b8"; }}
                    onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = "#475569"; }}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid #1e2d42", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12, color: "#334155" }}>© {year} AXION GROUP · Todos os direitos reservados</span>
          <span style={{ fontSize: 12, color: "#334155" }}>Feito com ❤️ para a indústria brasileira</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer .container > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
