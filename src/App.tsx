import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToHash from './components/ScrollToHash';
import Footer from './sections/Footer';
import Home from './pages/Home';
import AxionOne from './pages/AxionOne';
import Sistemas from './pages/Sistemas';

const EnemApp = lazy(() => import('./enem/EnemApp'));

// Em um deploy só do simulado (VITE_APENAS_ENEM=1), qualquer página fora de /enem leva ao simulado.
const APENAS_ENEM = import.meta.env.VITE_APENAS_ENEM === '1';

export default function App() {
  const { pathname } = useLocation();

  if (pathname === '/enem' || pathname.startsWith('/enem/')) {
    return (
      <Suspense fallback={null}>
        <Routes>
          <Route path="/enem/*" element={<EnemApp />} />
        </Routes>
      </Suspense>
    );
  }

  if (APENAS_ENEM) return <Navigate to="/enem" replace />;

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
