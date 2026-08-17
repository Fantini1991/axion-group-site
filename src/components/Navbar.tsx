import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Produto", href: "#produto" },
  { label: "Sistema", href: "#sistema" },
  { label: "Módulos", href: "#modulos" },
  { label: "Planos", href: "#planos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(12,27,51,0.96)" : "rgba(12,27,51,0.85)",
      backdropFilter: "blur(16px)",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
      transition: "all 0.3s",
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/favicon.svg" alt="Axion Group" style={{ width: 40, height: 40, borderRadius: 10, boxShadow: "0 0 0 1px rgba(56,189,248,0.3), 0 2px 8px rgba(0,0,0,0.4)" }} />
          <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: -0.3, color: "white" }}>
            AXION <span style={{ color: "#38bdf8" }}>GROUP</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {links.map(l => (
            <a key={l.label} href={l.href} style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = "white"; }}
              onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)"; }}>
              {l.label}
            </a>
          ))}
          <a href="#contato" className="btn-primary" style={{ padding: "10px 22px", fontSize: 14 }}>
            Agendar Demo
          </a>
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", display: "none" }} className="mobile-toggle">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "#0c1b33", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "16px 24px 24px" }}>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              style={{ display: "block", padding: "12px 0", fontSize: 15, color: "rgba(255,255,255,0.55)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {l.label}
            </a>
          ))}
          <a href="#contato" className="btn-primary" style={{ marginTop: 16, width: "100%", justifyContent: "center" }}>
            Agendar Demo
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
