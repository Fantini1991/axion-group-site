import { ArrowRight, Play } from "lucide-react";
import ParticleCanvas from "../components/ParticleCanvas";

export default function Hero() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: "linear-gradient(160deg, #0c1b33 0%, #0f2952 55%, #0c1b33 100%)" }}>
      <ParticleCanvas />
      {/* Subtle grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />
      {/* Glow top center */}
      <div style={{ position: "absolute", top: "5%", left: "50%", transform: "translateX(-50%)", width: 700, height: 400, background: "radial-gradient(ellipse, rgba(56,189,248,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      {/* Wave bottom transition to white */}
      <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, lineHeight: 0, zIndex: 2 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: 80, display: "block" }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: 120, paddingBottom: 120, textAlign: "center" }}>
        <div className="badge-navy fade-up" style={{ marginBottom: 24 }}>
          🏭 ERP Industrial · Químico · Tintas · Revestimentos
        </div>

        <h1 className="fade-up-2" style={{ fontSize: "clamp(36px, 6vw, 70px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: -2, marginBottom: 24, color: "white" }}>
          Do laboratório ao faturamento —<br />
          <span style={{ color: "#38bdf8" }}>feito para sua indústria</span>
        </h1>

        <p className="fade-up-3" style={{ fontSize: "clamp(16px, 2vw, 19px)", color: "rgba(255,255,255,0.55)", maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.75 }}>
          AXION ONE é o ERP completo para indústrias — gestão de fórmulas, PCP, estoque, fiscal e muito mais. Tudo integrado, 100% web.
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
        <div className="fade-up-4 hero-stats" style={{ display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap", marginBottom: 72 }}>
          {[
            { val: "13+", label: "Módulos integrados" },
            { val: "100%", label: "Web — acesso de qualquer lugar" },
            { val: "IBPT", label: "Fiscal automático" },
            { val: "Multi", label: "Empresa e multi-usuário" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#38bdf8", lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Mock dashboard preview */}
        <div className="hero-dashboard-preview" style={{
          borderRadius: 20, overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(56,189,248,0.06)",
          maxWidth: 900, margin: "0 auto",
        }}>
          {/* Browser bar — navy */}
          <div style={{ background: "#0c1b33", padding: "12px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
            <div style={{ flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 6, height: 26, marginLeft: 8, display: "flex", alignItems: "center", paddingLeft: 12 }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>erp.groupaxion.com.br</span>
            </div>
          </div>
          {/* Dashboard — light */}
          <div className="hero-dashboard-grid" style={{ background: "#f8fafc", display: "grid", gridTemplateColumns: "180px 1fr", minHeight: 320 }}>
            {/* Sidebar navy */}
            <div style={{ background: "#0c1b33", padding: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 900, color: "#38bdf8", marginBottom: 18, letterSpacing: 0.5 }}>AXION ONE</div>
              {["Laboratório / P&D", "Compras", "Estoque", "PCP", "Produção", "Vendas", "Fiscal"].map(m => (
                <div key={m} style={{ padding: "7px 10px", borderRadius: 7, fontSize: 11, color: m === "Vendas" ? "#38bdf8" : "rgba(255,255,255,0.3)", background: m === "Vendas" ? "rgba(56,189,248,0.1)" : "transparent", marginBottom: 2, fontWeight: m === "Vendas" ? 700 : 400 }}>
                  {m}
                </div>
              ))}
            </div>
            {/* Content — white */}
            <div style={{ padding: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
                {[
                  { label: "Pedidos do mês", val: "R$ 284.500", color: "#16a34a" },
                  { label: "Orçamentos abertos", val: "18", color: "#0284c7" },
                  { label: "Fórmulas ativas", val: "142", color: "#7c3aed" },
                ].map(c => (
                  <div key={c.label} style={{ background: "white", borderRadius: 10, padding: "12px 14px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 4 }}>{c.label}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: c.color }}>{c.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: "white", borderRadius: 10, padding: "12px 14px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 12, fontWeight: 600 }}>PEDIDOS RECENTES</div>
                {[
                  { cod: "PV-2024", cliente: "Indústria Alfa LTDA", val: "R$ 18.400", status: "Aprovado", ok: true },
                  { cod: "PV-2023", cliente: "Colorfix Tintas", val: "R$ 9.250", status: "Em análise", ok: false },
                  { cod: "PV-2022", cliente: "Revestech S.A.", val: "R$ 31.000", status: "Aprovado", ok: true },
                ].map(r => (
                  <div key={r.cod} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
                    <div>
                      <span style={{ fontSize: 11, color: "#0284c7", fontFamily: "monospace", fontWeight: 700 }}>{r.cod}</span>
                      <span style={{ fontSize: 11, color: "#64748b", marginLeft: 10 }}>{r.cliente}</span>
                    </div>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: "#0f172a", fontWeight: 600 }}>{r.val}</span>
                      <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 99, background: r.ok ? "rgba(22,163,74,0.1)" : "rgba(202,138,4,0.1)", color: r.ok ? "#16a34a" : "#b45309", fontWeight: 700 }}>{r.status}</span>
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
