import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ConfirmationPage() {
   useParams();

   useEffect(() => {
    document.title = 'Demande envoyée — Aksam Assurance';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Merci pour votre demande !</h1>
        <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg mx-auto">
          Votre demande de devis a bien été enregistrée. Un de nos conseillers vous contactera dans les plus brefs délais.
        </p>
        <div className="bg-orange-50 rounded-xl p-6 mb-8 text-left">
          <h3 className="text-sm font-bold text-gray-800 mb-3">Prochaines étapes</h3>
          <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
            <li>Un conseiller étudie votre demande</li>
            <li>Vous recevez un comparatif personnalisé par email</li>
            <li>Vous choisissez l'offre qui vous convient</li>
          </ol>
        </div>
        <div className="space-y-3">
          <Link to="/home" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold rounded-xl transition-all shadow-md hover:shadow-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16m-7-7l7 7-7 7" /></svg>
            Faire une autre demande
          </Link>
          <p className="text-sm text-gray-400">Besoin d'aide ? <a href="tel:0182834800" className="text-orange-600 font-medium hover:underline">01 82 83 48 00</a></p>
        </div>
      </div>
    </main>
  );
}