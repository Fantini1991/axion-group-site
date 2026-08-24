import Hero from "../sections/Hero";
import Diferenciais from "../sections/Diferenciais";
import CtaBanner from "../components/CtaBanner";
import DemoVideo from "../sections/DemoVideo";
import Screenshots from "../sections/Screenshots";
import ParaQuemE from "../sections/ParaQuemE";
import Modulos from "../sections/Modulos";
import FAQ from "../sections/FAQ";
import Planos from "../sections/Planos";
import Contato from "../sections/Contato";

export default function AxionOne() {
  return (
    <>
      <Hero />
      <Diferenciais />
      <CtaBanner text="Quer ver como o AXION ONE resolve os gargalos da sua indústria?" />
      <DemoVideo />
      <Screenshots />
      <ParaQuemE />
      <CtaBanner text="Pronto para ter tudo integrado em uma só plataforma?" />
      <Modulos />
      <FAQ />
      <Planos />
      <Contato />
    </>
  );
}
