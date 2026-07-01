import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Produto", href: "#produto" },
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
      background: scrolled ? "rgba(10,14,26,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid #1e2d42" : "1px solid transparent",
      transition: "all 0.3s",
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/favicon.svg" alt="Axion Group" style={{ width: 40, height: 40, borderRadius: 10, boxShadow: "0 0 0 1px rgba(34,211,238,0.25), 0 2px 8px rgba(0,0,0,0.4)" }} />
          <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: -0.3 }}>
            AXION <span style={{ color: "#22d3ee" }}>GROUP</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {links.map(l => (
            <a key={l.label} href={l.href} style={{ fontSize: 14, color: "#94a3b8", fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = "#f1f5f9"; }}
              onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = "#94a3b8"; }}>
              {l.label}
            </a>
          ))}
          <a href="#contato" className="btn-primary" style={{ padding: "10px 22px", fontSize: 14 }}>
            Agendar Demo
          </a>
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", color: "#94a3b8", display: "none" }} className="mobile-toggle">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "#111827", borderTop: "1px solid #1e2d42", padding: "16px 24px 24px" }}>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              style={{ display: "block", padding: "12px 0", fontSize: 15, color: "#94a3b8", borderBottom: "1px solid #1e2d42" }}>
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
