import { Helmet } from 'react-helmet-async';
import { useRef } from 'react';
import { useDevisForm } from '../hooks/useDevisForm.js';

export default function LoueurVoiturePage() {
  const { submitting, error, handleSubmit } = useDevisForm('/api/v1/loueur-devis');
  const scrollRef = useRef(null);

  const scrollToForm = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Assurance loueur de voiture - RC PRO location</title>
        <meta name="description" content="Devis assurance pour loueur de voiture rapide, un comparatif pour RC PRO location de voiture." />
        <meta name="keywords" content="Assurance loueur de voiture, RC PRO loueur voiture, Devis assurance loueur véhicule" />
      </Helmet>

      <section className="py-12 lg:py-20 bg-white hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 scanlines-bg opacity-30"></div>
        <div className="absolute top-10 left-10 floating-animation"><i className="fas fa-car text-orange-400 text-6xl opacity-30"></i></div>
        <div className="absolute bottom-10 right-10 floating-animation" style={{ animationDelay: '-2s' }}><i className="fas fa-shield-alt text-orange-500 text-8xl opacity-25"></i></div>

        <div className="max mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-stretch">
            <div className="w-full lg:w-1/2 order-2 lg:order-1 flex">
              <div className="relative w-full h-full min-h-[400px]">
                <img src="https://assurance-professionnels-auto.fr/image/loueur-voiture.jpg" alt="Assurance loueur de voiture" className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl" />
              </div>
            </div>

            <div className="w-full lg:w-1/2 order-1 lg:order-2 flex">
              <div ref={scrollRef} id="loueurForm" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 flex-1 flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Obtenez un devis gratuit</h2>
                <p className="text-sm text-gray-500 mb-6">Complétez en 2 minutes</p>
                {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}
                <form onSubmit={handleSubmit} noValidate className="space-y-4 flex-1 flex flex-col">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1.5">Nom *</label><input type="text" id="nom" name="nom" required placeholder="Votre nom" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" /></div><div><label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1.5">Prénom *</label><input type="text" id="prenom" name="prenom" required placeholder="Votre prénom" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" /></div></div>
                  <div><label htmlFor="raison_sociale" className="block text-sm font-medium text-gray-700 mb-1.5">Raison sociale</label><input type="text" id="raison_sociale" name="raison_sociale" placeholder="Nom de votre entreprise" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" /></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label htmlFor="demarrage" className="block text-sm font-medium text-gray-700 mb-1.5">Démarrage d'activité</label><select id="demarrage" name="demarrage" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"><option value="">Sélectionnez…</option><option value="OUI">Oui</option><option value="NON">Non</option></select></div><div><label htmlFor="assure" className="block text-sm font-medium text-gray-700 mb-1.5">Déjà assuré(e) ?</label><select id="assure" name="assure" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"><option value="">Sélectionnez…</option><option value="OUI">Oui</option><option value="NON">Non</option></select></div></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label htmlFor="ancienne" className="block text-sm font-medium text-gray-700 mb-1.5">Ancienne assurance résiliée ?</label><select id="ancienne" name="ancienne" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"><option value="">Sélectionnez…</option><option value="OUI">Oui</option><option value="NON">Non</option></select></div><div><label htmlFor="motif" className="block text-sm font-medium text-gray-700 mb-1.5">Motif de résiliation</label><select id="motif" name="motif" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"><option value="">Sélectionnez…</option><option>Sinistre</option><option>Non paiement</option><option>Amiable</option><option>Échéance</option></select></div></div>
                  <div><label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1.5">Code postal</label><input type="text" id="code" name="code" maxLength="5" placeholder="Code postal" pattern="[0-9]{5}" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" inputMode="numeric" /></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label htmlFor="tele" className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone *</label><input type="tel" id="tele" name="tele" maxLength="10" required placeholder="01 23 45 67 89" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" /></div><div><label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label><input type="email" id="email" name="email" placeholder="email@exemple.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" /></div></div>
                  <button type="submit" disabled={submitting} className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all disabled:opacity-70">{submitting ? 'Envoi...' : 'Comparer maintenant'}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white" id="garanties">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Les avantages de l'assurance RC PRO pour loueurs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">Découvrez les protections essentielles pour votre activité de garagiste.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: '🛡️', title: 'RC Pro Garagiste', desc: 'Couvre les dommages matériels, immatériels et corporels causés à des tiers dans le cadre de votre activité.' },
              { icon: '🏗️', title: 'Responsabilité Civile d\'Exploitation', desc: 'Protège contre les dommages causés dans le cadre de l\'exploitation du loueur (chute d\'un client, etc.).' },
              { icon: '🚗', title: 'Véhicules Confiés', desc: 'Couverture pour les véhicules appartenant aux clients pendant leur garde au loueur.' },
              { icon: '🔧', title: 'Biens Professionnels', desc: 'Protège vos locaux, équipements et outils contre incendie, vol et dégâts des eaux.' },
              { icon: '⚖️', title: 'Protection Juridique', desc: 'Assistance et couverture financière en cas de litige avec un client ou fournisseur.' },
              { icon: '💰', title: 'Perte d\'Exploitation', desc: 'Indemnise les pertes financières liées à une interruption d\'activité suite à un sinistre.' },
            ].map((g, i) => (
              <div key={g.title} className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{g.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">{g.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <section className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Devis assurance garagiste.</h2>
            <p className="text-base mb-8 text-gray-800/80 max-w-xl mx-auto leading-relaxed">Pour obtenir un devis RCPRO garagiste veuillez compléter le formulaire à droite de la page. Simple et rapide obtenez votre devis en ligne et en quelques clics.</p>
            <button onClick={scrollToForm} className="bg-white text-orange-500 font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-all transform hover:scale-105 shadow-lg text-sm">Comparer mes offres</button>
          </div>
        </section>
      </div>
     </>
  );
}