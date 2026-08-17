import { useState } from "react";
import { ChevronDown } from "lucide-react";

const perguntas = [
  {
    q: "O AXION ONE precisa ser instalado?",
    a: "Não. O AXION ONE é 100% web — funciona em qualquer navegador, em qualquer dispositivo, sem instalação, sem VPN e sem servidor local. Basta ter acesso à internet.",
  },
  {
    q: "Funciona no celular e no tablet?",
    a: "Sim. A interface é responsiva e funciona em smartphones e tablets. Ideal para apontamentos no chão de fábrica, consultas de estoque ou aprovações fora do escritório.",
  },
  {
    q: "Quanto tempo leva para implantar?",
    a: "Depende do porte e da complexidade da operação, mas a maioria das empresas começa a operar em 4 a 8 semanas. Nossa equipe acompanha todo o processo de configuração e treinamento.",
  },
  {
    q: "Preciso migrar meus dados de outro sistema?",
    a: "Auxiliamos na migração de dados como cadastro de fórmulas, matérias-primas, clientes e fornecedores. O processo é planejado junto com sua equipe para minimizar impacto na operação.",
  },
  {
    q: "O sistema emite Nota Fiscal eletrônica?",
    a: "Sim. O módulo fiscal inclui emissão, transmissão e consulta de NF-e com integração à SEFAZ, cálculo automático de ICMS, IPI, PIS/COFINS, CFOP, NCM e Substituição Tributária por estado.",
  },
  {
    q: "Posso ter múltiplas empresas no mesmo sistema?",
    a: "Sim. O AXION ONE é multi-empresa com dados completamente isolados entre as unidades. Cada empresa tem seus próprios usuários, permissões, estoques, fórmulas e documentos fiscais.",
  },
  {
    q: "Como funciona o suporte?",
    a: "Oferecemos suporte via chat, e-mail e videochamada. Não entregamos o sistema e sumimos — acompanhamos a implantação, treinamos sua equipe e continuamos disponíveis durante toda a operação.",
  },
  {
    q: "Os dados ficam seguros? Onde são armazenados?",
    a: "Todos os dados são armazenados em nuvem com criptografia, backups automáticos e autenticação em dois fatores (2FA). Nenhum dado fica em máquinas locais vulneráveis.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section" id="faq" style={{ background: "white" }}>
      <div className="container" style={{ maxWidth: 780 }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="badge" style={{ marginBottom: 16 }}>Dúvidas frequentes</span>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: -1, marginBottom: 16, color: "#0f172a" }}>
            Perguntas que todo mundo faz<br />
            <span className="gradient-text">antes de contratar</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {perguntas.map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid #e2e8f0" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "22px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16,
                }}
              >
                <span style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", lineHeight: 1.4 }}>{item.q}</span>
                <ChevronDown
                  size={20}
                  color="#64748b"
                  style={{ flexShrink: 0, transform: open === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
                />
              </button>
              {open === i && (
                <div style={{ paddingBottom: 22 }}>
                  <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, margin: 0 }}>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <p style={{ color: "#64748b", marginBottom: 16 }}>Tem outra dúvida?</p>
          <a href="#contato" className="btn-primary" style={{ fontSize: 15, padding: "13px 30px" }}>
            Fale com nossa equipe
          </a>
        </div>
      </div>
    </section>
  );
}
