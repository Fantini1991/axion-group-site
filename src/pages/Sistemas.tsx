import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SistemasGrid } from "../sections/home/EcossistemaAxion";

export default function Sistemas() {
  return (
    <>
      <section style={{ background: "linear-gradient(160deg, #0c1b33 0%, #0f2952 100%)", padding: "160px 0 72px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 500, height: 500, background: "radial-gradient(ellipse, rgba(56,189,248,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="badge-navy" style={{ marginBottom: 20 }}>O ecossistema Axion</span>
          <h1 style={{ fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 900, letterSpacing: -1.5, color: "white", marginBottom: 18, maxWidth: 720, lineHeight: 1.15 }}>
            Um ecossistema. Diferentes negócios.
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", maxWidth: 620, lineHeight: 1.75 }}>
            Cada segmento possui seus próprios desafios. Por isso a Axion não trabalha com uma solução única para todos — criamos sistemas especializados, mantendo uma mesma visão de tecnologia, integração e gestão.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "#f8fafc" }}>
        <div className="container">
          <SistemasGrid />
        </div>
      </section>

      <section className="section-sm" style={{ background: "linear-gradient(90deg, #0f2952 0%, #0c1b33 100%)", textAlign: "center" }}>
        <div className="container">
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, marginBottom: 8 }}>
            Não achou o sistema do seu setor? A gente também constrói sob medida.
          </p>
          <Link to="/#contato" className="btn-primary" style={{ fontSize: 16, padding: "14px 32px" }}>
            Falar com a gente <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
