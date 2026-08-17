import { useState } from "react";

const screens = [
  { file: "dashboard.png", label: "Meu Espaço", desc: "Visão geral personalizada com acesso rápido a qualquer módulo e rotina do sistema." },
  { file: "formulas.png", label: "Laboratório / P&D", desc: "Cadastro de fórmulas com composição, fases, custos em kg e litros, e controle de revisões." },
  { file: "qualidade.png", label: "Qualidade", desc: "CQ de matéria-prima, CQ final, colorimetria, certificados de análise e gestão de não conformidades." },
  { file: "compras.png", label: "Compras", desc: "Solicitações, cotações, aprovações multinível e histórico completo por fornecedor." },
  { file: "estoque.png", label: "Estoque", desc: "Recebimento, lotes, localização, rastreabilidade, inventário e controle de embalagens." },
  { file: "pcp.png", label: "PCP", desc: "Ordens de produção, roteiros, disponibilidade de MP, apontamento e KPIs de planejamento." },
  { file: "fiscal.png", label: "Fiscal", desc: "NCM, CFOP, ICMS, IPI, PIS/COFINS, ST por estado, NF-e integrada e Tabela IBPT automática." },
  { file: "login.png", label: "Acesso seguro", desc: "Login multi-empresa com 2FA, controle de sessões e auditoria completa de acessos." },
];

export default function Screenshots() {
  const [active, setActive] = useState(0);

  return (
    <section className="section" id="sistema" style={{ background: "#0c1b33", padding: "96px 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="badge" style={{ marginBottom: 16, background: "rgba(56,189,248,0.12)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.2)" }}>
            Conheça o sistema
          </span>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1, marginBottom: 16, color: "white" }}>
            Veja o AXION ONE<br />
            <span style={{ color: "#38bdf8" }}>por dentro</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 17, maxWidth: 520, margin: "0 auto" }}>
            Interface moderna, escura e pensada para uso intenso no chão de fábrica e no escritório.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 32 }}>
          {screens.map((s, i) => (
            <button
              key={s.file}
              onClick={() => setActive(i)}
              style={{
                padding: "8px 18px",
                borderRadius: 99,
                border: active === i ? "1px solid #38bdf8" : "1px solid rgba(255,255,255,0.1)",
                background: active === i ? "rgba(56,189,248,0.12)" : "rgba(255,255,255,0.04)",
                color: active === i ? "#38bdf8" : "rgba(255,255,255,0.45)",
                fontSize: 13,
                fontWeight: active === i ? 700 : 400,
                cursor: "pointer",
                transition: "all 0.18s",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Screenshot */}
        <div style={{
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(56,189,248,0.15)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(56,189,248,0.06)",
          maxWidth: 1000,
          margin: "0 auto 28px",
          lineHeight: 0,
        }}>
          {/* Browser bar */}
          <div style={{ background: "#0a1628", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
            <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 6, height: 24, marginLeft: 8, display: "flex", alignItems: "center", paddingLeft: 12 }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>erp.groupaxion.com.br</span>
            </div>
          </div>
          <img
            key={screens[active].file}
            src={`/screenshots/${screens[active].file}`}
            alt={screens[active].label}
            style={{ width: "100%", display: "block" }}
          />
        </div>

        {/* Description */}
        <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.7 }}>
            <strong style={{ color: "white" }}>{screens[active].label}:</strong> {screens[active].desc}
          </p>
        </div>
      </div>
    </section>
  );
}
