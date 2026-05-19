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
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition-all shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à l'accueil
          </Link>
        </div>
      </main>
    </>
  );
}