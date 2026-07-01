import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const segmentos = ["Tintas e Vernizes", "Revestimentos", "Químico", "Cosméticos", "Farmacêutico", "Alimentos", "Outro"];

export default function Contato() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nome: "", empresa: "", segmento: "", telefone: "", mensagem: "" });

  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui pode integrar com email/Supabase futuramente
    setSent(true);
  };

  const inp: React.CSSProperties = {
    width: "100%", background: "#111827", border: "1px solid #1e2d42",
    borderRadius: 10, color: "#f1f5f9", fontSize: 14, padding: "12px 14px",
    outline: "none", boxSizing: "border-box",
  };

  return (
    <section className="section" id="contato" style={{ background: "var(--surface)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          {/* Left */}
          <div>
            <span className="badge" style={{ marginBottom: 20 }}>Fale conosco</span>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, letterSpacing: -1, marginBottom: 20, lineHeight: 1.2 }}>
              Pronto para transformar<br />
              <span className="gradient-text">sua operação?</span>
            </h2>
            <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.8, marginBottom: 40 }}>
              Agende uma demonstração gratuita e veja o AXION ONE funcionando com os dados da sua empresa. Sem compromisso, sem surpresas.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { label: "Demonstração gratuita", desc: "Mostramos o sistema rodando ao vivo, com foco no seu segmento." },
                { label: "Implantação acompanhada", desc: "Nossa equipe fica do seu lado durante toda a configuração inicial." },
                { label: "Suporte contínuo", desc: "Não somimos após a venda. Evoluímos junto com a sua operação." },
              ].map(i => (
                <div key={i.label} style={{ display: "flex", gap: 14 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22d3ee", flexShrink: 0, marginTop: 6 }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#f1f5f9", marginBottom: 2 }}>{i.label}</div>
                    <div style={{ fontSize: 13, color: "#64748b" }}>{i.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="card" style={{ padding: 32 }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <CheckCircle size={48} color="#22c55e" style={{ margin: "0 auto 16px" }} />
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Mensagem enviada!</h3>
                <p style={{ color: "#64748b", fontSize: 14 }}>Entraremos em contato em até 24 horas úteis para agendar sua demonstração.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Agendar demonstração</h3>
                <p style={{ fontSize: 13, color: "#64748b", marginBottom: 8 }}>Preencha o formulário e nossa equipe entrará em contato.</p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 11, color: "#94a3b8", marginBottom: 5, fontWeight: 600 }}>SEU NOME *</label>
                    <input required value={form.nome} onChange={e => set("nome", e.target.value)} placeholder="João Silva" style={inp} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, color: "#94a3b8", marginBottom: 5, fontWeight: 600 }}>EMPRESA *</label>
                    <input required value={form.empresa} onChange={e => set("empresa", e.target.value)} placeholder="Indústria LTDA" style={inp} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 11, color: "#94a3b8", marginBottom: 5, fontWeight: 600 }}>SEGMENTO *</label>
                    <select required value={form.segmento} onChange={e => set("segmento", e.target.value)} style={{ ...inp, appearance: "none" }}>
                      <option value="">Selecione...</option>
                      {segmentos.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, color: "#94a3b8", marginBottom: 5, fontWeight: 600 }}>TELEFONE / WHATSAPP</label>
                    <input value={form.telefone} onChange={e => set("telefone", e.target.value)} placeholder="(11) 9 9999-9999" style={inp} />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 11, color: "#94a3b8", marginBottom: 5, fontWeight: 600 }}>MENSAGEM</label>
                  <textarea value={form.mensagem} onChange={e => set("mensagem", e.target.value)} rows={3} placeholder="Conte brevemente sobre sua operação e o que mais precisa..."
                    style={{ ...inp, height: "auto", resize: "vertical" }} />
                </div>

                <button type="submit" className="btn-primary" style={{ justifyContent: "center", marginTop: 4 }}>
                  <Send size={16} /> Enviar mensagem
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contato .container > div { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        input:focus, select:focus, textarea:focus {
          border-color: #22d3ee !important;
        }
      `}</style>
    </section>
  );
}
