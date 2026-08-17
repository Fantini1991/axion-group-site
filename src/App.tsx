import './index.css';
import Navbar from './components/Navbar';
import CtaBanner from './components/CtaBanner';
import WhatsAppButton from './components/WhatsAppButton';
import Hero from './sections/Hero';
import Diferenciais from './sections/Diferenciais';
import DemoVideo from './sections/DemoVideo';
import Screenshots from './sections/Screenshots';
import ParaQuemE from './sections/ParaQuemE';
import Modulos from './sections/Modulos';
import FAQ from './sections/FAQ';
import Planos from './sections/Planos';
import Sobre from './sections/Sobre';
import Contato from './sections/Contato';
import Footer from './sections/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
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
        <Sobre />
        <Contato />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
