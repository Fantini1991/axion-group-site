import { ArrowRight } from "lucide-react";

interface Props {
  text?: string;
}

export default function CtaBanner({ text = "Quer ver o AXION ONE funcionando na sua indústria?" }: Props) {
  return (
    <div style={{ background: "linear-gradient(90deg, #0f2952 0%, #0c1b33 100%)", padding: "48px 24px", textAlign: "center" }}>
      <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, marginBottom: 8 }}>{text}</p>
      <a href="#contato" className="btn-primary" style={{ fontSize: 16, padding: "14px 32px" }}>
        Agendar demonstração gratuita <ArrowRight size={17} />
      </a>
    </div>
  );
}
