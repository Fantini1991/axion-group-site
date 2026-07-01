import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(34,211,238,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34,211,238,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />
      {/* Glow blobs */}
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 700, height: 400, background: "radial-gradient(ellipse, rgba(14,165,233,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 400, height: 400, background: "radial-gradient(ellipse, rgba(129,140,248,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", paddingTop: 120, paddingBottom: 80, textAlign: "center" }}>
        <div className="badge fade-up" style={{ marginBottom: 24 }}>
          🚀 Gestão industrial do futuro
        </div>

        <h1 className="fade-up-2" style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: -2, marginBottom: 24 }}>
          A gestão que sua{" "}
          <span className="gradient-text">indústria</span>
          <br />merecia.
        </h1>

        <p className="fade-up-3" style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#94a3b8", maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.7 }}>
          Do laboratório ao faturamento, em uma só plataforma.
          AXION ONE é o ERP completo para indústrias de processo — químico, tintas, vernizes e revestimentos.
        </p>

        <div className="fade-up-4" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 64 }}>
          <a href="#contato" className="btn-primary" style={{ fontSize: 16, padding: "16px 32px" }}>
            Agendar demonstração <ArrowRight size={18} />
          </a>
          <a href="#produto" className="btn-ghost" style={{ fontSize: 16, padding: "16px 32px" }}>
            <Play size={16} /> Ver funcionalidades
          </a>
        </div>

        {/* Stats */}
        <div className="fade-up-4" style={{ display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { val: "13+", label: "Módulos integrados" },
            { val: "100%", label: "Web — acesso de qualquer lugar" },
            { val: "IBPT", label: "Fiscal automático" },
            { val: "Multi", label: "Empresa e multi-usuário" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#22d3ee", lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Mock dashboard preview */}
        <div style={{
          marginTop: 72, borderRadius: 20, overflow: "hidden",
          border: "1px solid #1e2d42", background: "#0d1117",
          boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(34,211,238,0.05)",
          maxWidth: 900, margin: "72px auto 0",
        }}>
          {/* Fake browser bar */}
          <div style={{ background: "#111827", padding: "12px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #1e2d42" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
            <div style={{ flex: 1, background: "#1a2235", borderRadius: 6, height: 26, marginLeft: 8, display: "flex", alignItems: "center", paddingLeft: 12 }}>
              <span style={{ fontSize: 11, color: "#475569" }}>erp.groupaxion.com.br</span>
            </div>
          </div>
          {/* Fake dashboard */}
          <div style={{ background: "#0a0e1a", padding: 24, display: "grid", gridTemplateColumns: "200px 1fr", gap: 16, minHeight: 340 }}>
            {/* Sidebar */}
            <div style={{ background: "#111827", borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#22d3ee", marginBottom: 16, letterSpacing: 1 }}>AXION ONE</div>
              {["Laboratório / P&D", "Compras", "Estoque", "PCP", "Produção", "Vendas", "Fiscal"].map(m => (
                <div key={m} style={{ padding: "6px 10px", borderRadius: 6, fontSize: 11, color: m === "Vendas" ? "#22d3ee" : "#64748b", background: m === "Vendas" ? "rgba(34,211,238,0.08)" : "transparent", marginBottom: 2 }}>
                  {m}
                </div>
              ))}
            </div>
            {/* Content */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
                {[
                  { label: "Pedidos do mês", val: "R$ 284.500", color: "#22c55e" },
                  { label: "Orçamentos abertos", val: "18", color: "#22d3ee" },
                  { label: "Fórmulas ativas", val: "142", color: "#818cf8" },
                ].map(c => (
                  <div key={c.label} style={{ background: "#111827", borderRadius: 10, padding: "14px 16px", border: "1px solid #1e2d42" }}>
                    <div style={{ fontSize: 10, color: "#64748b", marginBottom: 4 }}>{c.label}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: c.color }}>{c.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: "#111827", borderRadius: 10, padding: 16, border: "1px solid #1e2d42" }}>
                <div style={{ fontSize: 11, color: "#64748b", marginBottom: 12 }}>Pedidos recentes</div>
                {[
                  { cod: "PV-2024", cliente: "Indústria Alfa LTDA", val: "R$ 18.400", status: "Aprovado" },
                  { cod: "PV-2023", cliente: "Colorfix Tintas", val: "R$ 9.250", status: "Em análise" },
                  { cod: "PV-2022", cliente: "Revestech S.A.", val: "R$ 31.000", status: "Aprovado" },
                ].map(r => (
                  <div key={r.cod} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #1a2235" }}>
                    <div>
                      <span style={{ fontSize: 11, color: "#22d3ee", fontFamily: "monospace" }}>{r.cod}</span>
                      <span style={{ fontSize: 11, color: "#94a3b8", marginLeft: 10 }}>{r.cliente}</span>
                    </div>
                    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: "#f1f5f9", fontWeight: 600 }}>{r.val}</span>
                      <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 99, background: r.status === "Aprovado" ? "rgba(34,197,94,0.15)" : "rgba(250,204,21,0.15)", color: r.status === "Aprovado" ? "#22c55e" : "#facc15" }}>{r.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
