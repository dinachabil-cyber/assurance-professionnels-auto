import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet
        titleTemplate="%s — Aksam Assurance"
        defaultTitle="Aksam Assurance — Assurance Professionnels Auto"
      >
        <meta name="description" content="Devis assurance pour professionnels de l'automobile, un comparatif rapide et en ligne." />
        <meta name="keywords" content="Assurance professionnel auto, RC PRO auto-école, Devis assurance MRP" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Aksam Assurance — Assurance Professionnels Auto" />
        <meta property="og:description" content="Comparez les meilleures assurances pour professionnels de l'automobile." />
        <meta property="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://assurance-professionnels-auto.fr" />
      </Helmet>
      
      <Header />
      <main id="main-content" className="flex-1" role="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

