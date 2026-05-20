import { Helmet } from 'react-helmet-async';
import { useRef } from 'react';
import FormSection from '../components/FormSection';

export default function LoueurVoiturePage() {
  const scrollRef = useRef(null);

  const scrollToForm = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Assurance loueur de voiture - RC PRO location</title>
        <meta
          name="description"
          content="Devis assurance pour loueur de voiture rapide, un comparatif pour RC PRO location de voiture."
        />
        <meta
          name="keywords"
          content="Assurance loueur de voiture, RC PRO loueur voiture, Devis assurance loueur véhicule"
        />
      </Helmet>

      <FormSection
        ref={scrollRef}
        showImage={true}
        imageUrl="https://assurance-professionnels-auto.fr/image/loueur-voiture.jpg"
        endpoint="/api/v1/loueur-devis"
        showActivity={true}
        showPostalCode={true}
        title="Obtenez un devis gratuit"
        subtitle="Complétez en 2 minutes"
      />

      {/* ── GARANTY CARDS ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white" id="garanties">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Les avantages de l'assurance RC PRO pour loueurs
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Découvrez les protections essentielles pour votre activité de
              garagiste.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: '🛡️',
                title: 'RC Pro Garagiste',
                desc: 'Couvre les dommages matériels, immatériels et corporels causés à des tiers dans le cadre de votre activité.',
              },
              {
                icon: '🏗️',
                title: 'Responsabilité Civile d\'Exploitation',
                desc: 'Protège contre les dommages causés dans le cadre de l\'exploitation du loueur (chute d\'un client, etc.).',
              },
              {
                icon: '🚗',
                title: 'Véhicules Confiés',
                desc: 'Couverture pour les véhicules appartenant aux clients pendant leur garde au loueur.',
              },
              {
                icon: '🔧',
                title: 'Biens Professionnels',
                desc: 'Protège vos locaux, équipements et outils contre incendie, vol et dégâts des eaux.',
              },
              {
                icon: '⚖️',
                title: 'Protection Juridique',
                desc: 'Assistance et couverture financière en cas de litige avec un client ou fournisseur.',
              },
              {
                icon: '💰',
                title: 'Perte d\'Exploitation',
                desc: 'Indemnise les pertes financières liées à une interruption d\'activité suite à un sinistre.',
              },
            ].map((g, i) => (
              <div
                key={g.title}
                className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                  {g.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                  {g.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <section className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
             Devis assurance garagiste.
            </h2>
            <p className="text-base mb-8 text-gray-800/80 max-w-xl mx-auto leading-relaxed">
              Pour obtenir un devis RCPRO garagiste veuillez compléter le formulaire à droite de la page. Simple et rapide obtenez votre devis en ligne et en quelques clics.

            </p>
            <button
              onClick={scrollToForm}
              className="bg-white text-orange-500 font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-all transform hover:scale-105 shadow-lg text-sm"
            >
              Comparer mes offres
            </button>
          </div>
        </section>
      </div>


    </>
  );
}