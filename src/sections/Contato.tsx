import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const RECAPTCHA_SITE_KEY = "6LdjNXctAAAAAKjd93fpawbFnVvV3DYRQNNsP95w";

const segmentos = ["Tintas e Vernizes", "Revestimentos", "Químico", "Cosméticos", "Farmacêutico", "Alimentos", "Outro"];

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (key: string, opts: { action: string }) => Promise<string>;
    };
  }
}

function loadRecaptcha(): Promise<void> {
  return new Promise(resolve => {
    if (window.grecaptcha) { resolve(); return; }
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.onload = () => window.grecaptcha.ready(resolve);
    document.head.appendChild(script);
  });
}

async function getRecaptchaToken(): Promise<string> {
  await loadRecaptcha();
  return window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "contact" });
}

export default function Contato() {
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [form, setForm]       = useState({ nome: "", empresa: "", segmento: "", telefone: "", mensagem: "" });

  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const recaptchaToken = await getRecaptchaToken();
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, recaptchaToken }),
      });
      const data = await res.json() as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Erro desconhecido");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const inp: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 10, color: "white", fontSize: 14, padding: "12px 14px",
    outline: "none", boxSizing: "border-box",
  };

  return (
    <section className="section" id="contato" style={{ background: "#0c1b33", position: "relative", overflow: "hidden" }}>
      {/* Top wave from white */}
      <div style={{ position: "absolute", top: -2, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: 80, display: "block", transform: "rotate(180deg)" }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
      {/* Glow */}
      <div style={{ position: "absolute", top: "30%", right: "5%", width: 400, height: 400, background: "radial-gradient(ellipse, rgba(56,189,248,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          {/* Left */}
          <div>
            <span className="badge-navy" style={{ marginBottom: 20 }}>Fale conosco</span>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, letterSpacing: -1, marginBottom: 20, lineHeight: 1.2, color: "white" }}>
              Pronto para transformar<br />
              <span style={{ color: "#38bdf8" }}>sua operação?</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, lineHeight: 1.8, marginBottom: 40 }}>
              Agende uma demonstração gratuita e veja o AXION ONE funcionando com os dados da sua empresa. Sem compromisso, sem surpresas.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { label: "Demonstração gratuita", desc: "Mostramos o sistema rodando ao vivo, com foco no seu segmento." },
                { label: "Implantação acompanhada", desc: "Nossa equipe fica do seu lado durante toda a configuração inicial." },
                { label: "Suporte contínuo", desc: "Não somimos após a venda. Evoluímos junto com a sua operação." },
              ].map(i => (
                <div key={i.label} style={{ display: "flex", gap: 14 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#38bdf8", flexShrink: 0, marginTop: 6 }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "white", marginBottom: 2 }}>{i.label}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>{i.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 32 }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <CheckCircle size={48} color="#22c55e" style={{ margin: "0 auto 16px" }} />
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: "white" }}>Mensagem enviada!</h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Entraremos em contato em até 24 horas úteis para agendar sua demonstração.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4, color: "white" }}>Agendar demonstração</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>Preencha o formulário e nossa equipe entrará em contato.</p>

                <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 5, fontWeight: 600 }}>SEU NOME *</label>
                    <input required value={form.nome} onChange={e => set("nome", e.target.value)} placeholder="João Silva" style={inp} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 5, fontWeight: 600 }}>EMPRESA *</label>
                    <input required value={form.empresa} onChange={e => set("empresa", e.target.value)} placeholder="Indústria LTDA" style={inp} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 5, fontWeight: 600 }}>SEGMENTO *</label>
                    <select required value={form.segmento} onChange={e => set("segmento", e.target.value)} style={{ ...inp, appearance: "none" }}>
                      <option value="">Selecione...</option>
                      {segmentos.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 5, fontWeight: 600 }}>TELEFONE / WHATSAPP</label>
                    <input value={form.telefone} onChange={e => set("telefone", e.target.value)} placeholder="(11) 9 9999-9999" style={inp} />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 5, fontWeight: 600 }}>MENSAGEM</label>
                  <textarea value={form.mensagem} onChange={e => set("mensagem", e.target.value)} rows={3}
                    placeholder="Conte brevemente sobre sua operação e o que mais precisa..."
                    style={{ ...inp, height: "auto", resize: "vertical" }} />
                </div>

                {error && (
                  <div style={{ fontSize: 13, color: "#ef4444", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, padding: "10px 14px" }}>
                    {error}
                  </div>
                )}

                <button type="submit" className="btn-primary" disabled={loading}
                  style={{ justifyContent: "center", marginTop: 4, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
                  <Send size={16} /> {loading ? "Enviando..." : "Enviar mensagem"}
                </button>

                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", textAlign: "center", margin: 0 }}>
                  Protegido por reCAPTCHA — <a href="https://policies.google.com/privacy" target="_blank" style={{ color: "rgba(255,255,255,0.3)" }}>Privacidade</a> · <a href="https://policies.google.com/terms" target="_blank" style={{ color: "rgba(255,255,255,0.3)" }}>Termos</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contato .container > div { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        input:focus, select:focus, textarea:focus { border-color: rgba(56,189,248,0.5) !important; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2) !important; }
        select option { background: #0c1b33; color: white; }
        .grecaptcha-badge { visibility: hidden; }
      `}</style>
    </section>
  );
}
