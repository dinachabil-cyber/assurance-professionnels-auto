import { Helmet } from 'react-helmet-async';
import { useRef } from 'react';
import FormSection from '../components/FormSection';

export default function NegociantsAutoPage() {
  const scrollRef = useRef(null);

  const scrollToForm = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Assurance négociant automobile - RC PRO négociant</title>
        <meta
          name="description"
          content="Devis assurance pour négociant automobile rapide, un comparatif pour RC Pro négociant auto en ligne."
        />
        <meta
          name="keywords"
          content="Assurance négociant automobile, RC Pro négociant automobile, Devis assurance négociant automobile, RC Pro négoce auto, assurance pour vendeur de véhicules"
        />
      </Helmet>

      <FormSection
        ref={scrollRef}
        showImage={true}
        imageUrl="https://assurance-professionnels-auto.fr/image/negocie-auto.jpg"
        endpoint="/api/v1/negociants-devis"
        showActivity={true}
        showPostalCode={true}
        title="Obtenez un devis gratuit"
        subtitle="Complétez en 2 minutes"
      />

      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Qu'est-ce qu'une assurance pour négociants automobiles ?
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Une assurance pour négociants automobiles est une police d'assurance spécialement conçue pour couvrir les besoins des professionnels du commerce de véhicules (neufs et d'occasion). Elle protège contre les risques liés à l'achat, la vente et l'importation de véhicules.
          </p>
        </div>
      </section>

      {/* GARANTY CARDS */}
      <section className="py-20 md:py-28 bg-white" id="garanties">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Les garanties RC Pro pour négociants automobiles
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Découvrez les protections adaptées à votre activité de négoce automobile.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: '🤝',
                title: 'Négociants Spécialisés',
                desc: 'Couverture RC Pro adaptée aux professionnels du commerce de véhicules neufs et d\'occasion.',
              },
              {
                icon: '🛡️',
                title: 'Responsabilité Civile Professionnelle',
                desc: 'Couvre les dommages causés à des tiers (clients, fournisseurs) dans le cadre de votre activité de négoce.',
              },
              {
                icon: '🚗',
                title: 'Assurance Véhicules en Stock',
                desc: 'Protège les véhicules destinés à la vente contre le vol, l\'incendie et le vandalisme.',
              },
              {
                icon: '🏢',
                title: 'Garantie des Locaux',
                desc: 'Couverture de votre showroom, atelier et bureaux contre l\'incendie, le vol et les dégâts des eaux.',
              },
              {
                icon: '⚡',
                title: 'Gestion Rapide des Sinistres',
                desc: 'Réactivité et accompagnement pour assurer la continuité de votre activité commerciale.',
              },
              {
                icon: '💰',
                title: 'Tarifs Compétitifs',
                desc: 'Des solutions sur-mesure adaptées au volume de votre parc et à votre budget.',
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

      {/* CTA BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <section className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              Devis assurance négociant automobile
            </h2>
            <p className="text-base mb-8 text-gray-800/80 max-w-xl mx-auto leading-relaxed">
              Pour obtenir un devis RC Pro négociant automobile, complétez le formulaire en
              haut de la page. Simple et rapide, obtenez votre devis en ligne et
              en quelques clics.
            </p>
            <button
              onClick={scrollToForm}
              className="bg-white text-orange-500 font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-all transform hover:scale-105 shadow-lg text-sm"
            >
              Obtenir un devis personnalisé
            </button>
          </div>
        </section>
      </div>
    </>
  );
}