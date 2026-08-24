import { Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToHash from './components/ScrollToHash';
import Footer from './sections/Footer';
import Home from './pages/Home';
import AxionOne from './pages/AxionOne';
import Sistemas from './pages/Sistemas';

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/axion-one" element={<AxionOne />} />
          <Route path="/sistemas" element={<Sistemas />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
