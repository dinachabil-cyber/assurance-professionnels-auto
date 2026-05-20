import { Helmet } from 'react-helmet-async';
import { useRef } from 'react';
import FormSection from '../components/FormSection';

export default function AutoEcolePage() {
  const scrollRef = useRef(null);

  const scrollToForm = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const guarantees = [
    {
      icon: '🛡️',
      title: 'Responsabilité civile professionnelle',
      desc: 'Couvre les dommages corporels, matériels et immatériels causés aux tiers (élèves, piétons, autres conducteurs) lors des leçons de conduite.',
    },
    {
      icon: '🚗',
      title: 'Assurance des véhicules',
      desc: 'Protège les véhicules de l\'auto-école contre les dommages, vol et vandalisme, ainsi que les dommages causés aux autres véhicules.',
    },
    {
      icon: '👨‍🏫',
      title: 'Protection des instructeurs',
      desc: 'Couvre les moniteurs en cas de blessure ou de dommages subis pendant l\'exercice de leur activité, y compris en cas de faute de l\'élève.',
    },
    {
      icon: '👨‍🎓',
      title: 'Garantie des élèves conducteurs',
      desc: 'Protège les élèves pendant les leçons de conduite, même si ceux-ci sont encore en phase d\'apprentissage et pas en possession d\'un permis.',
    },
    {
      icon: '🏢',
      title: 'Garantie des locaux',
      desc: 'Couvre les locaux de l\'auto-école contre les risques comme l\'incendie, le vol ou les dégâts des eaux.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Assurance auto-école - RC PRO auto-école</title>
        <meta
          name="description"
          content="Devis assurance pour auto-école rapide, un comparatif pour RC PRO auto-école en ligne."
        />
        <meta
          name="keywords"
          content="Assurance auto-école, RC PRO auto-école, Devis assurance auto-école"
        />
      </Helmet>

      <FormSection
        ref={scrollRef}
        showImage={true}
        imageUrl="https://assurance-professionnels-auto.fr/image/photautoecole.png"
        endpoint="/api/v1/auto-ecole-devis"
        showActivity={true}
        showPostalCode={true}
        title="Obtenez un devis gratuit"
        subtitle="Complétez en 2 minutes"
      />

      {/* Definition */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Qu'est-ce qu'une assurance pour auto-école ?
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            L'assurance auto-école est une couverture spécialement conçue pour les
            professionnels qui exploitent une auto-école et dispensent des cours de
            conduite. Ce type d'assurance est essentiel pour couvrir les risques
            spécifiques liés à l'enseignement de la conduite, à la fois pour le
            matériel (les véhicules de l'auto-école) et pour les élèves, instructeurs
            et tiers.
          </p>
        </div>
      </section>

      {/* GARANTY CARDS */}
      <section className="py-20 md:py-28 bg-white" id="garanties">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Les garanties RC PRO pour auto-école
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Découvrez les protections essentielles pour votre activité d'auto-école.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {guarantees.map((g, i) => (
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
              Devis assurance auto-école
            </h2>
            <p className="text-base mb-8 text-gray-800/80 max-w-xl mx-auto leading-relaxed">
              Pour obtenir un devis RC PRO auto-école, complétez le formulaire en
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