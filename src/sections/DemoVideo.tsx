import { Play, X } from "lucide-react";
import { useState } from "react";

export default function DemoVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="demo" style={{ padding: "100px 0", background: "#080c17", position: "relative", overflow: "hidden" }}>
      {/* Glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 400, background: "radial-gradient(ellipse, rgba(34,211,238,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div className="badge fade-up" style={{ marginBottom: 20 }}>
          🎬 Veja o sistema em ação
        </div>
        <h2 className="fade-up-2" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, marginBottom: 16, letterSpacing: -1 }}>
          Um tour completo pelo <span className="gradient-text">AXION ONE</span>
        </h2>
        <p className="fade-up-3" style={{ color: "#94a3b8", fontSize: 17, maxWidth: 560, margin: "0 auto 48px", lineHeight: 1.6 }}>
          Veja as principais telas e funcionalidades do ERP — do laboratório ao faturamento, tudo em uma só plataforma.
        </p>

        {/* Thumbnail / player */}
        <div
          className="fade-up-4"
          onClick={() => setPlaying(true)}
          style={{
            position: "relative", maxWidth: 860, margin: "0 auto",
            borderRadius: 20, overflow: "hidden",
            border: "1px solid #1e2d42",
            boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(34,211,238,0.05)",
            cursor: "pointer",
            background: "#0d1117",
          }}
        >
          {!playing ? (
            <>
              {/* Fake thumbnail — dark gradient with play button */}
              <div style={{ paddingTop: "56.25%", background: "linear-gradient(135deg, #0a0e1a 0%, #0f172a 50%, #0a0e1a 100%)", position: "relative" }}>
                <div style={{
                  position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 16,
                }}>
                  {/* Play circle */}
                  <div style={{
                    width: 80, height: 80, borderRadius: "50%",
                    background: "rgba(34,211,238,0.15)",
                    border: "2px solid rgba(34,211,238,0.5)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s",
                    boxShadow: "0 0 40px rgba(34,211,238,0.2)",
                  }}>
                    <Play size={32} fill="#22d3ee" color="#22d3ee" style={{ marginLeft: 4 }} />
                  </div>
                  <span style={{ fontSize: 14, color: "#64748b" }}>Clique para assistir — 9 min</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={e => { e.stopPropagation(); setPlaying(false); }}
                style={{
                  position: "absolute", top: 12, right: 12, zIndex: 10,
                  background: "rgba(0,0,0,0.6)", border: "none", borderRadius: "50%",
                  width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "#fff",
                }}
              >
                <X size={18} />
              </button>
              <video
                src="/erp_axion_editado.mp4"
                controls
                autoPlay
                style={{ width: "100%", display: "block" }}
              />
            </>
          )}
        </div>

        {/* Mini stats abaixo */}
        <div style={{ display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap", marginTop: 40 }}>
          {[
            { val: "13+", label: "módulos mostrados" },
            { val: "9 min", label: "de demonstração real" },
            { val: "100%", label: "sistema real, sem mock" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#22d3ee" }}>{s.val}</div>
              <div style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
