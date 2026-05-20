import { useNavigate } from 'react-router-dom';

export default function ConfirmationPage() {
  const navigate = useNavigate();

  const goHome = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light via-surfaceHover to-light hero-pattern py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-surface rounded-3xl shadow-2xl p-12 text-center border border-yellow-200">

          {/* Success Icon */}
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
            <i className="fas fa-check text-4xl text-white"></i>
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
          <a
            href="/"
            onClick={goHome}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            <i className="fas fa-arrow-left"></i>
            Retour à l'accueil
          </a>

        </div>
      </div>
    </div>
  );
}