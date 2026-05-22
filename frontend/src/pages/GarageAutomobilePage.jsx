import { Helmet } from 'react-helmet-async';
import { useRef } from 'react';
import { useDevisForm } from '../hooks/useDevisForm.js';
import { Link } from 'react-router-dom';


export default function GarageAutomobilePage() {
  const scrollRef = useRef(null);
  const { submitting, error, handleSubmit } = useDevisForm('/api/v1/garage-devis');

  const scrollToForm = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Assurance garage automobile - RC PRO garagiste</title>
        <meta name="description" content="Devis assurance pour garage automobile rapide, un comparatif pour RC PRO garage auto en ligne." />
        <meta name="keywords" content="Assurance garage automobile, RC PRO garage automobile, Devis assurance garage automobile" />
      </Helmet>

      <section className="py-12 lg:py-20 bg-white hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 scanlines-bg opacity-30"></div>
        <div className="absolute top-10 left-10 floating-animation"><i className="fas fa-car text-orange-400 text-6xl opacity-30"></i></div>
        <div className="absolute bottom-10 right-10 floating-animation" style={{ animationDelay: '-2s' }}><i className="fas fa-shield-alt text-orange-500 text-8xl opacity-25"></i></div>

        <div className="max mx-auto sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-stretch">
            <div className="w-full lg:w-1/2 order-2 lg:order-1 flex">
              <div className="relative w-full h-full min-h-[400px]">
                <img src="https://assurance-professionnels-auto.fr/image/proauto-garage.jpg" alt="Assurance garage automobile" className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl" />
              </div>
            </div>

            <div className="w-full lg:w-1/2 order-1 lg:order-2 flex">
              <div ref={scrollRef} id="garageForm" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 flex-1 flex flex-col">
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

      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">I- Assurance garage automobile
</h2>
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">1- Définition
</h2>

          <p className="text-gray-600 text-lg leading-relaxed">Une assurance pour l'activité de garagiste est une couverture spécialement conçue pour les professionnels du secteur automobile qui exploitent des garages ou tout autre établissement proposant des services liés à la réparation des véhicules. Elle vise à protéger le garagiste contre les risques spécifiques à son activité et à couvrir les responsabilités, les biens, ainsi que les véhicules confiés par ses clients.</p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white" id="garanties">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">2- Garantie RC PRO garage automobile</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">Découvrez les protections essentielles pour votre activité de garagiste.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: '🛡️', title: 'RC Pro Garagiste', desc: 'Couvre les dommages matériels, immatériels et corporels causés à des tiers dans le cadre de votre activité.' },
              { icon: '🏗️', title: 'Responsabilité Civile d\'Exploitation', desc: 'Protège contre les dommages causés dans le cadre de l\'exploitation du garage (chute d\'un client, etc.).' },
              { icon: '🚗', title: 'Véhicules Confiés', desc: 'Couverture pour les véhicules appartenant aux clients pendant leur garde au garage.' },
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

<section className="max-w-3xl mx-auto sm:px-6 lg:px-8 my-16 text-center">
                 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
Devis assurance garagiste</h2>
        <p className="text-base">Pour obtenir un devis RC PRO garagiste, complétez le formulaire en haut de la page. Simple et rapide, obtenez votre devis en ligne et en quelques clics.</p>
      </section>

      <div className="flex justify-center my-12">
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
    </>
  );
}