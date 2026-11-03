import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToHash from './components/ScrollToHash';
import Footer from './sections/Footer';
import Home from './pages/Home';
import AxionOne from './pages/AxionOne';
import Sistemas from './pages/Sistemas';

const EnemApp = lazy(() => import('./enem/EnemApp'));

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
