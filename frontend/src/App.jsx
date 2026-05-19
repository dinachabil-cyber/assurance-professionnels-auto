import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CookieBanner from './components/CookieBanner';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ConfirmationPage from './pages/ConfirmationPage';
import GarageAutomobilePage from './pages/GarageAutomobilePage';
import LoueurVoiturePage from './pages/LoueurVoiturePage';
import MentionsLegales from './pages/MentionsLegales';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite';
import NegociantsAutoPage from './pages/NegociantsAutoPage.jsx';
import AutoécolePage from './pages/AutoécolePage..jsx';


function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/garage-automobile" element={<GarageAutomobilePage />} />
          <Route path="/loueur-voiture" element={<LoueurVoiturePage />} />
          <Route path="/devis/:id/confirmation" element={<ConfirmationPage />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/negociants-auto" element={<NegociantsAutoPage />} />
          <Route path="/auto-ecole" element={<AutoécolePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <CookieBanner />
    </>
  );
}

export default App;