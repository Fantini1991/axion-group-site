import { ArrowRight } from "lucide-react";
import ParticleCanvas from "../../components/ParticleCanvas";

export default function HomeHero() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: "linear-gradient(160deg, #0c1b33 0%, #0f2952 55%, #0c1b33 100%)" }}>
      <ParticleCanvas />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />
      <div style={{ position: "absolute", top: "5%", left: "50%", transform: "translateX(-50%)", width: 700, height: 400, background: "radial-gradient(ellipse, rgba(56,189,248,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, lineHeight: 0, zIndex: 2 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: 80, display: "block" }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: 120, paddingBottom: 120, textAlign: "center" }}>
        <div className="badge-navy fade-up" style={{ marginBottom: 24 }}>AXION</div>

        <h1 className="fade-up-2" style={{ fontSize: "clamp(32px, 5.2vw, 60px)", fontWeight: 900, lineHeight: 1.15, letterSpacing: -1.5, marginBottom: 22, color: "white" }}>
          Tecnologia que conecta<br />
          <span style={{ color: "#38bdf8" }}>sua operação.</span>
        </h1>

        <p className="fade-up-3" style={{ fontSize: "clamp(16px, 2vw, 19px)", color: "rgba(255,255,255,0.6)", maxWidth: 640, margin: "0 auto 16px", lineHeight: 1.75 }}>
          Sistemas desenvolvidos para transformar processos complexos em operações mais organizadas, integradas e inteligentes.
        </p>

        <p className="fade-up-3" style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.75 }}>
          A Axion reúne tecnologia, gestão e conhecimento de diferentes setores para criar sistemas que acompanham a realidade de cada negócio.
        </p>

        <div className="fade-up-4" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#historia" className="btn-primary" style={{ fontSize: 16, padding: "16px 32px" }}>
            Conheça a Axion
          </a>
          <a href="#ecossistema" className="btn-ghost" style={{ fontSize: 16, padding: "16px 32px" }}>
            Conheça nossos sistemas <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
