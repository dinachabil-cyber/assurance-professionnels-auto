import { Helmet } from 'react-helmet-async';
import { useRef } from 'react';
import { useDevisForm } from '../hooks/useDevisForm.js';
import { Link } from 'react-router-dom';

export default function AutoEcolePage() {
  const { submitting, error, handleSubmit } = useDevisForm('/api/v1/auto-ecole-devis');
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const guarantees = [
    {
      icon: '🛡️',
      title: 'Responsabilité civile professionnelle (RC Pro)',
      desc: 'Couvre les dommages corporels, matériels et immatériels causés aux tiers (élèves, piétons, autres conducteurs, etc.) lors des leçons de conduite. Par exemple, si un élève cause un accident pendant un cours, la responsabilité civile de l\'auto-école est engagée.',
    },
    {
      icon: '🚗',
      title: 'Assurance des véhicules',
      desc: 'Les véhicules de l\'auto-école doivent être couverts par une assurance spécifique, car ils sont utilisés dans un cadre d\'apprentissage. Cette garantie prend en charge les dommages causés aux véhicules de l\'auto-école en cas d\'accident, de vol ou de vandalisme, ainsi que les dommages causés aux autres véhicules ou biens.',
    },
    {
      icon: '👨‍🏫',
      title: 'Protection des instructeurs',
      desc: 'Cette garantie couvre les moniteurs en cas de blessure ou de dommages subis pendant l\'exercice de leur activité, y compris en cas de faute de l\'élève.',
    },
    {
      icon: '👨‍🎓',
      title: 'Garantie des élèves conducteurs',
      desc: 'Comme les élèves n\'ont pas encore de permis, ils sont particulièrement exposés au risque d\'accidents. L\'assurance auto-école couvre ces risques pendant les leçons de conduite, même si l\'élève est responsable de l\'accident.',
    },
    {
      icon: '🏢',
      title: 'Garantie des locaux',
      desc: 'Si l\'auto-école dispose de locaux (pour la théorie ou l\'administration), ils peuvent être couverts contre les risques comme l\'incendie, le vol ou les dégâts des eaux.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Assurance auto-école - RC PRO auto-école</title>
        <meta name="description" content="Devis assurance pour auto-école rapide, un comparatif pour RC PRO auto-école en ligne." />
        <meta name="keywords" content="Assurance auto-école, RC PRO auto-école, Devis assurance auto-école" />
      </Helmet>

      <section className="py-12 lg:py-20 bg-white hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 scanlines-bg opacity-30"></div>
        <div className="absolute top-10 left-10 floating-animation"><i className="fas fa-car text-orange-400 text-6xl opacity-30"></i></div>
        <div className="absolute bottom-10 right-10 floating-animation" style={{ animationDelay: '-2s' }}><i className="fas fa-shield-alt text-orange-500 text-8xl opacity-25"></i></div>

        <div className="max mx-auto sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-stretch">
            <div className="w-full lg:w-1/2 order-2 lg:order-1 flex">
              <div className="relative w-full h-full min-h-[400px]">
<img
  src="https://assurance-professionnels-auto.fr/image/photautoecole.png"
  alt="Assurance RC Pro auto-école"
  className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl"
/>              </div>
            </div>

            <div className="w-full lg:w-1/2 order-1 lg:order-2 flex">
              <div ref={formRef} id="ecoleForm" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 flex-1 flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Obtenez un devis gratuit</h2>
                <p className="text-sm text-gray-500 mb-6">Complétez en 2 minutes</p>
                {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}
                <form onSubmit={handleSubmit} noValidate className="space-y-4 flex-1 flex flex-col">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1.5">Nom *</label><input type="text" id="nom" name="nom" required placeholder="Votre nom" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" /></div><div><label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1.5">Prénom *</label><input type="text" id="prenom" name="prenom" required placeholder="Votre prénom" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" /></div></div>
                  <div><label htmlFor="raison_sociale" className="block text-sm font-medium text-gray-700 mb-1.5">Raison sociale</label><input type="text" id="raison_sociale" name="raison_sociale" placeholder="Nom de votre auto-école" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" /></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label htmlFor="demarrage" className="block text-sm font-medium text-gray-700 mb-1.5">Démarrage d'activité</label><select id="demarrage" name="demarrage" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"><option value="">Sélectionnez…</option><option value="OUI">Oui</option><option value="NON">Non</option></select></div><div><label htmlFor="assure" className="block text-sm font-medium text-gray-700 mb-1.5">Déjà assuré(e) ?</label><select id="assure" name="assure" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"><option value="">Sélectionnez…</option><option value="OUI">Oui</option><option value="NON">Non</option></select></div></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label htmlFor="ancienne" className="block text-sm font-medium text-gray-700 mb-1.5">Ancienne assurance résiliée ?</label><select id="ancienne" name="ancienne" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"><option value="">Sélectionnez…</option><option value="OUI">Oui</option><option value="NON">Non</option></select></div><div><label htmlFor="motif" className="block text-sm font-medium text-gray-700 mb-1.5">Motif de résiliation</label><select id="motif" name="motif" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"><option value="">Sélectionnez…</option><option>Sinistre</option><option>Non paiement</option><option>Amiable</option><option>Échéance</option></select></div></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label htmlFor="tele" className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone *</label><input type="tel" id="tele" name="tele" maxLength="10" required placeholder="01 23 45 67 89" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" /></div><div><label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label><input type="email" id="email" name="email" placeholder="email@exemple.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" /></div></div>
                  <button type="submit" disabled={submitting} className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all disabled:opacity-70">{submitting ? 'Envoi...' : 'Comparer maintenant'}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 - Définition */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Assurance auto-école</h2>
          <h3 className="text-xl font-semibold text-gray-700 mb-6">Définition</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            L'assurance auto-école est une couverture spécialement conçue pour les professionnels qui exploitent une auto-école et dispensent des cours de conduite. Ce type d'assurance est essentiel pour couvrir les risques spécifiques liés à l'enseignement de la conduite, à la fois pour le matériel (les véhicules de l'auto-école) et pour les élèves, instructeurs et tiers.
          </p>
        </div>
      </section>

      {/* Section 2 - Garanties */}
      <section className="py-20 md:py-28 bg-white" id="garanties">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Garanties assurance auto-école</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Les garanties incluses dans une assurance auto-école peuvent couvrir :
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {guarantees.map((g) => (
              <div key={g.title} className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{g.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">{g.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>

          {/* Summary paragraph */}
          <p className="mt-12 text-center text-gray-600 text-base max-w-3xl mx-auto leading-relaxed">
            En résumé, l'assurance auto-école offre une protection complète pour les risques spécifiques liés à l'enseignement de la conduite, incluant à la fois la responsabilité des moniteurs, la sécurité des élèves, ainsi que la protection des véhicules et des locaux de l'auto-école.
          </p>
        </div>
      </section>

      {/* Section 3 - Devis */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 my-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Devis assurance auto-école</h2>
        <p className="text-base text-gray-600">
          Pour obtenir un devis assurance auto-école, veuillez compléter le formulaire en haut de la page. Simple et rapide, obtenez votre devis en ligne et en quelques clics.
        </p>
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