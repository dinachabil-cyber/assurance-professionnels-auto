import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page non trouvée — Aksam Assurance</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <main className="flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-lg mx-auto">
          <p className="text-6xl font-bold text-orange-500 mb-4">404</p>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Page non trouvée</h1>
          <p className="text-gray-500 mb-8">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-3 bg-white text-[#312a8b] font-bold py-4 px-10 rounded-2xl hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-2xl cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 10H5M5 10L10 5M5 10L10 15" stroke="#312a8b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Retour à l'accueil
          </Link>
        </div>
      </main>
    </>
  );
}