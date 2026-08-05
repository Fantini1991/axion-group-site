import { Play, X } from "lucide-react";
import { useState } from "react";

export default function DemoVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="demo" style={{ padding: "96px 0", background: "#0c1b33", position: "relative", overflow: "hidden" }}>
      {/* Top wave from white */}
      <div style={{ position: "absolute", top: -2, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: 80, display: "block", transform: "rotate(180deg)" }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
      {/* Bottom wave to white */}
      <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: 80, display: "block" }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f8fafc" />
        </svg>
      </div>
      {/* Glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 400, background: "radial-gradient(ellipse, rgba(56,189,248,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div className="badge-navy fade-up" style={{ marginBottom: 20 }}>
          🎬 Veja o sistema em ação
        </div>
        <h2 className="fade-up-2" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, marginBottom: 16, letterSpacing: -1, color: "white" }}>
          Um tour completo pelo <span style={{ color: "#38bdf8" }}>AXION ONE</span>
        </h2>
        <p className="fade-up-3" style={{ color: "rgba(255,255,255,0.45)", fontSize: 17, maxWidth: 560, margin: "0 auto 48px", lineHeight: 1.6 }}>
          Veja as principais telas e funcionalidades do ERP — do laboratório ao faturamento, tudo em uma só plataforma.
        </p>

        {/* Thumbnail / player */}
        <div
          className="fade-up-4"
          onClick={() => setPlaying(true)}
          style={{
            position: "relative", maxWidth: 860, margin: "0 auto",
            borderRadius: 20, overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(56,189,248,0.06)",
            cursor: "pointer",
            background: "#060f1e",
          }}
        >
          {!playing ? (
            <div style={{ paddingTop: "56.25%", background: "linear-gradient(135deg, #060f1e 0%, #0c1b33 50%, #060f1e 100%)", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
                <div style={{
                  width: 80, height: 80, borderRadius: "50%",
                  background: "rgba(56,189,248,0.12)",
                  border: "2px solid rgba(56,189,248,0.45)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 40px rgba(56,189,248,0.18)",
                }}>
                  <Play size={32} fill="#38bdf8" color="#38bdf8" style={{ marginLeft: 4 }} />
                </div>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.3)" }}>Clique para assistir — 9 min</span>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={e => { e.stopPropagation(); setPlaying(false); }}
                style={{ position: "absolute", top: 12, right: 12, zIndex: 10, background: "rgba(0,0,0,0.6)", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}
              >
                <X size={18} />
              </button>
              <video src="/erp_axion_editado.mp4" controls autoPlay style={{ width: "100%", display: "block" }} />
            </>
          )}
        </div>

        <div style={{ display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap", marginTop: 40 }}>
          {[
            { val: "13+", label: "módulos mostrados" },
            { val: "9 min", label: "de demonstração real" },
            { val: "100%", label: "sistema real, sem mock" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#38bdf8" }}>{s.val}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
