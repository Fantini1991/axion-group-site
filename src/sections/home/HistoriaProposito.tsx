import { Link2, BarChart3, Cog, Search, Brain, Rocket } from "lucide-react";

const porQue = [
  { icon: Link2, title: "Integração", text: "Informações conectadas entre os diferentes setores." },
  { icon: BarChart3, title: "Visibilidade", text: "Indicadores e informações para entender o que realmente está acontecendo." },
  { icon: Cog, title: "Processos", text: "Mais padronização e controle das atividades." },
  { icon: Search, title: "Rastreabilidade", text: "Histórico das operações e maior controle das informações." },
  { icon: Brain, title: "Decisão", text: "Informação organizada para apoiar decisões melhores." },
  { icon: Rocket, title: "Evolução", text: "Uma plataforma preparada para acompanhar o crescimento da empresa." },
];

export function Historia() {
  return (
    <section className="section" id="historia" style={{ background: "white" }}>
      <div className="container" style={{ maxWidth: 780 }}>
        <span className="badge" style={{ marginBottom: 20 }}>A história</span>
        <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", fontWeight: 800, letterSpacing: -1, marginBottom: 28, lineHeight: 1.25, color: "#0f172a" }}>
          Tudo começou com um problema<br />que muitas empresas conhecem.
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 16, color: "#475569", lineHeight: 1.8 }}>
          <p>À medida que uma empresa cresce, seus processos também crescem.</p>
          <p>O que antes era resolvido com uma planilha passa a exigir controle.</p>
          <p>O que era acompanhado por uma pessoa passa a depender de várias áreas.</p>
          <p>Informações começam a ficar espalhadas.</p>
          <p>Compras não conversam com estoque.<br />Produção não conversa com vendas.<br />Qualidade trabalha com informações diferentes daquelas utilizadas pelo administrativo.</p>
          <p>E, muitas vezes, o problema não está na falta de informação.<br /><strong style={{ color: "#0f172a" }}>Está na falta de conexão entre elas.</strong></p>
          <p style={{ marginTop: 14 }}>Foi a partir dessa realidade que surgiu a visão da Axion: desenvolver tecnologia que faça sentido para quem realmente vive a operação.</p>
          <p>Não criar sistemas apenas para registrar informações.<br /><strong style={{ color: "#0284c7" }}>Criar sistemas para ajudar as empresas a trabalhar melhor.</strong></p>
        </div>
      </div>
    </section>
  );
}

export function Proposito() {
  return (
    <section className="section" style={{ background: "#0c1b33", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "20%", left: "8%", width: 380, height: 380, background: "radial-gradient(ellipse, rgba(56,189,248,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div className="container" style={{ maxWidth: 760, position: "relative", zIndex: 1 }}>
        <span className="badge-navy" style={{ marginBottom: 20 }}>O propósito da Axion</span>
        <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", fontWeight: 800, letterSpacing: -1, marginBottom: 24, lineHeight: 1.25, color: "white" }}>
          Tecnologia precisa resolver<br />problemas reais.
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
          <p>A Axion nasceu com uma ideia simples: um sistema de gestão deve se adaptar à realidade da empresa — e não obrigar a empresa a trabalhar de uma maneira que não faz sentido para ela.</p>
          <p>Por isso, nossas soluções são pensadas considerando os processos, as particularidades e os desafios de cada segmento.</p>
          <p style={{ color: "#38bdf8", fontWeight: 600 }}>Da indústria ao comércio.<br />Do laboratório à produção.<br />Do estoque à área financeira.</p>
          <p style={{ marginTop: 6 }}>A informação precisa acompanhar o negócio. E não ficar presa em departamentos separados.</p>
        </div>
      </div>
    </section>
  );
}

export function PorQueAxion() {
  return (
    <section className="section" style={{ background: "#f8fafc" }}>
      <div className="container">
        <div style={{ maxWidth: 640, marginBottom: 48 }}>
          <span className="badge" style={{ marginBottom: 20 }}>Por que usar os sistemas Axion?</span>
          <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", fontWeight: 800, letterSpacing: -1, marginBottom: 16, lineHeight: 1.25, color: "#0f172a" }}>
            Porque sua empresa não precisa<br />de mais um sistema.
          </h2>
          <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.75 }}>
            Ela precisa de um sistema que converse com o seu negócio. Os sistemas Axion foram concebidos para conectar diferentes áreas da empresa em uma mesma estrutura de gestão.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {porQue.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="card">
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(2,132,199,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <Icon size={20} color="#0284c7" />
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: "#0f172a" }}>{item.title}</div>
                <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
