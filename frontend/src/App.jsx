import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import CookieBanner from './components/CookieBanner';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ConfirmationPage from './pages/ConfirmationPage';
import GarageAutomobilePage from './pages/GarageAutomobilePage';
import LoueurVoiturePage from './pages/LoueurVoiturePage';
import NegociantsAutoPage from './pages/NegociantsAutoPage';
import AutoEcolePage from './pages/AutoEcolePage';
import MentionsLegales from './pages/MentionsLegales';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/garage-automobile" element={<GarageAutomobilePage />} />
          <Route path="/loueur-voiture" element={<LoueurVoiturePage />} />
          <Route path="/negociants-auto" element={<NegociantsAutoPage />} />
          <Route path="/auto-ecole" element={<AutoEcolePage />} />
          <Route path="/devis/:id/confirmation" element={<ConfirmationPage />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <CookieBanner />
    </>
  );
}

export default App;
