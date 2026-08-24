import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { axionSystems } from "../../data/systems";

const byId = (id: string) => axionSystems.find(s => s.id === id)!;

function SystemBadge({ id }: { id: string }) {
  const s = byId(id);
  const Icon = s.icon;
  return (
    <div style={{ width: 52, height: 52, borderRadius: 14, background: s.color + "17", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, flexShrink: 0 }}>
      <Icon size={24} color={s.color} />
    </div>
  );
}

function CardCta({ id, label }: { id: string; label: string }) {
  const s = byId(id);
  return (
    <Link to={s.href} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 14, fontWeight: 700, color: s.color, marginTop: "auto", paddingTop: 20 }}>
      {label} <ArrowRight size={15} />
    </Link>
  );
}

function AxionOneCard() {
  const areas = ["ERP", "Produção", "PCP", "Qualidade", "P&D", "Compras", "Estoque", "Logística", "Financeiro", "Manutenção", "RH", "CRM", "BI", "MES", "WMS"];
  const ideal = ["controlar processos", "integrar departamentos", "acompanhar produção", "controlar estoque", "gerenciar qualidade", "acompanhar custos", "organizar compras", "controlar vendas", "acompanhar indicadores", "tomar decisões com informações mais confiáveis"];
  return (
    <article className="card" style={{ padding: 36, display: "flex", flexDirection: "column", borderTop: `3px solid ${byId("axion-one").color}` }}>
      <SystemBadge id="axion-one" />
      <div style={{ fontSize: 13, fontWeight: 600, color: byId("axion-one").color, marginBottom: 6 }}>Gestão integrada para operações industriais e empresariais.</div>
      <h3 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>Axion One</h3>
      <p style={{ fontSize: 14.5, color: "#64748b", marginBottom: 18 }}>O sistema central do ecossistema Axion.</p>

      <p style={{ fontSize: 14.5, color: "#334155", marginBottom: 10 }}>Desenvolvido para conectar áreas como:</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {areas.map(a => (
          <span key={a} style={{ fontSize: 12, fontWeight: 600, color: "#0284c7", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 99, padding: "3px 10px" }}>{a}</span>
        ))}
      </div>

      <p style={{ fontSize: 14.5, color: "#334155", marginBottom: 20, lineHeight: 1.6 }}>
        A proposta é simples: fazer diferentes áreas da empresa trabalharem com a mesma informação.
      </p>

      <p style={{ fontSize: 13.5, fontWeight: 700, color: "#0f172a", marginBottom: 10 }}>Ideal para empresas que precisam:</p>
      <ul style={{ listStyle: "none", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px", marginBottom: 0 }}>
        {ideal.map(i => (
          <li key={i} style={{ display: "flex", gap: 6, fontSize: 13, color: "#475569", alignItems: "flex-start" }}>
            <Check size={13} color="#16a34a" style={{ flexShrink: 0, marginTop: 3 }} /> {i}
          </li>
        ))}
      </ul>

      <CardCta id="axion-one" label="Conhecer o Axion One" />
    </article>
  );
}

function AxionPharmaCard() {
  return (
    <article className="card" style={{ padding: 36, display: "flex", flexDirection: "column", borderTop: `3px solid ${byId("axion-pharma").color}` }}>
      <SystemBadge id="axion-pharma" />
      <div style={{ fontSize: 13, fontWeight: 600, color: byId("axion-pharma").color, marginBottom: 6 }}>Gestão para um setor onde controle não é opcional.</div>
      <h3 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", marginBottom: 14 }}>Axion Pharma</h3>
      <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.75, marginBottom: 10 }}>
        O segmento farmacêutico exige organização, rastreabilidade e controle em praticamente todas as etapas da operação.
      </p>
      <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.75, marginBottom: 10 }}>
        O Axion Pharma é pensado para atender as particularidades desse ambiente. Desde o controle de materiais e processos até a gestão da operação.
      </p>
      <p style={{ fontSize: 14.5, fontWeight: 700, color: byId("axion-pharma").color }}>
        Mais controle. Mais rastreabilidade. Mais organização.
      </p>
      <CardCta id="axion-pharma" label="Conhecer o Axion Pharma" />
    </article>
  );
}

function AxionFoodCard() {
  const controles = ["matérias-primas", "formulações", "produção", "lotes", "estoque", "qualidade", "custos", "expedição", "indicadores"];
  return (
    <article className="card" style={{ padding: 36, display: "flex", flexDirection: "column", borderTop: `3px solid ${byId("axion-food").color}` }}>
      <SystemBadge id="axion-food" />
      <div style={{ fontSize: 13, fontWeight: 600, color: byId("axion-food").color, marginBottom: 6 }}>Gestão para quem transforma matéria-prima em produto.</div>
      <h3 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", marginBottom: 14 }}>Axion Food</h3>
      <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.75, marginBottom: 10 }}>
        Na indústria de alimentos, produção, estoque, qualidade e rastreabilidade precisam trabalhar juntos.
      </p>
      <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.75, marginBottom: 14 }}>
        O Axion Food foi concebido para atender empresas que precisam controlar sua operação desde a entrada das matérias-primas até o produto final.
      </p>
      <p style={{ fontSize: 13.5, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Controle de:</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {controles.map(c => (
          <span key={c} style={{ fontSize: 12, fontWeight: 600, color: byId("axion-food").color, background: byId("axion-food").color + "14", borderRadius: 99, padding: "3px 10px" }}>{c}</span>
        ))}
      </div>
      <p style={{ fontSize: 14, fontWeight: 700, color: byId("axion-food").color }}>
        Da matéria-prima ao produto acabado, cada etapa precisa estar conectada.
      </p>
      <CardCta id="axion-food" label="Conhecer o Axion Food" />
    </article>
  );
}

function AxionPaintCard() {
  const elos = [
    { t: "Distribuidor", d: "Estoque em volume, expedição e logística entre fábrica e pontos de venda." },
    { t: "Loja / Revenda", d: "PDV, tonalização de balcão e venda direta ao consumidor final." },
  ];
  return (
    <article className="card" style={{ padding: 36, display: "flex", flexDirection: "column", gridColumn: "1 / -1", borderTop: `3px solid ${byId("axion-paint").color}` }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 40, alignItems: "start" }} className="paint-grid">
        <div>
          <SystemBadge id="axion-paint" />
          <div style={{ fontSize: 13, fontWeight: 600, color: byId("axion-paint").color, marginBottom: 6 }}>Da distribuição ao balcão — conectado ao Axion One.</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", marginBottom: 14 }}>Axion Paint</h3>
          <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.75, marginBottom: 10 }}>
            O setor de tintas tem pontas bem diferentes: quem distribui e quem vende direto pro consumidor. Cada uma com uma operação própria.
          </p>
          <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.75, marginBottom: 16 }}>
            O Axion Paint cobre essas duas pontas. A fabricação continua sendo papel do Axion One — pra quem também fabrica, os dois sistemas se conectam direto, sem duplicar laboratório e produção.
          </p>
          <p style={{ fontSize: 14, fontWeight: 700, color: byId("axion-paint").color, marginBottom: 0 }}>
            Porque distribuição e revenda de tinta também têm processo próprio — não é só mais um PDV genérico.
          </p>
          <CardCta id="axion-paint" label="Conhecer o Axion Paint" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {elos.map(e => (
            <div key={e.t} style={{ background: byId("axion-paint").color + "0d", border: `1px solid ${byId("axion-paint").color}30`, borderRadius: 12, padding: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 13.5, color: "#0f172a", marginBottom: 4 }}>{e.t}</div>
              <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>{e.d}</div>
            </div>
          ))}
          <div style={{ background: byId("axion-one").color + "0d", border: `1px dashed ${byId("axion-one").color}45`, borderRadius: 12, padding: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 13.5, color: "#0f172a", marginBottom: 4 }}>Fabrica também?</div>
            <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>Laboratório, fórmulas e produção já são papel do Axion One — o Paint se conecta direto com ele.</div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .paint-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </article>
  );
}

function AxionMarketCard() {
  return (
    <article className="card" style={{ padding: 36, display: "flex", flexDirection: "column", borderTop: `3px solid ${byId("axion-market").color}` }}>
      <SystemBadge id="axion-market" />
      <div style={{ fontSize: 13, fontWeight: 600, color: byId("axion-market").color, marginBottom: 6 }}>Gestão para operações comerciais.</div>
      <h3 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", marginBottom: 14 }}>Axion Market</h3>
      <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.75, marginBottom: 10 }}>
        O Axion Market é direcionado para empresas que precisam controlar suas operações comerciais de forma integrada — de mercados a lojas de roupas e outros negócios de varejo.
      </p>
      <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.75, marginBottom: 16 }}>
        Vendas, produtos, estoque, compras, clientes, financeiro e indicadores em uma mesma estrutura.
      </p>
      <p style={{ fontSize: 14.5, fontWeight: 700, color: byId("axion-market").color }}>
        Menos informação espalhada. Mais visão sobre o negócio.
      </p>
      <CardCta id="axion-market" label="Conhecer o Axion Market" />
    </article>
  );
}

export function SistemasGrid() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
      <AxionOneCard />
      <AxionPharmaCard />
      <AxionFoodCard />
      <AxionPaintCard />
      <AxionMarketCard />
    </div>
  );
}

export default function EcossistemaAxion() {
  return (
    <section className="section" id="ecossistema" style={{ background: "white" }}>
      <div className="container">
        <div style={{ maxWidth: 640, marginBottom: 48 }}>
          <span className="badge" style={{ marginBottom: 20 }}>O ecossistema Axion</span>
          <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", fontWeight: 800, letterSpacing: -1, marginBottom: 16, lineHeight: 1.25, color: "#0f172a" }}>
            Um ecossistema.<br />Diferentes negócios.
          </h2>
          <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.75 }}>
            Cada segmento possui seus próprios desafios. Por isso, a Axion não trabalha com uma solução única para todos. Criamos sistemas especializados, mantendo uma mesma visão de tecnologia, integração e gestão.
          </p>
        </div>

        <SistemasGrid />
      </div>
    </section>
  );
}
