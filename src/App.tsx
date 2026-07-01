import './index.css';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Diferenciais from './sections/Diferenciais';
import Modulos from './sections/Modulos';
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
        <Modulos />
        <Planos />
        <Sobre />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
