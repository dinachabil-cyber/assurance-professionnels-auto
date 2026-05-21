import { Link } from 'react-router-dom';

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-light via-surfaceHover to-light hero-pattern py-20">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto bg-surface rounded-3xl shadow-2xl p-12 text-center border border-yellow-200">

          {/* Success Icon */}
          {/* Success Icon */}
<div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 21L16 28L31 13" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
</div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gradient mb-6">
            Merci pour votre demande !
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Votre demande de devis a été enregistrée avec succès.
            Nos conseillers vont l'analyser et vous contacter
            dans les plus brefs délais pour vous fournir les meilleures offres
            d'assurance taxi adaptées à votre situation.
          </p>

          {/* Contact Box */}
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-6 mb-8 border border-yellow-200">
            <p className="text-gray-800 font-semibold text-lg">
              Besoin d'une réponse rapide ?
            </p>

            <p className="text-gray-600 mt-3">
              Contactez-nous directement au{' '}
              <a
                href="tel:0182834800"
                className="text-orange-500 font-bold hover:text-orange-600 transition-colors"
              >
                01 82 83 48 00
              </a>
            </p>
          </div>

          {/* Button */}
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-3 bg-white text-[#312a8b] font-bold py-4 px-10 rounded-2xl hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-2xl cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 10H5M5 10L10 5M5 10L10 15" stroke="#312a8b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Retour à l'accueil
          </Link>

        </div>
      </div>
    </div>
  );
}