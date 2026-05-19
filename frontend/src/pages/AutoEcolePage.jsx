import { Helmet } from 'react-helmet-async';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AutoEcolePage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const formRef = useRef(null);

  const validatePhone = (p) =>
    /^0[1-9]\d{8}$/.test(p.replace(/\s/g, '')) || /^0[67]\d{8}$/.test(p.replace(/\s/g, ''));
  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget; // ✅ FIX: save before any await
    setSubmitting(true);
    setError(null);

    const fd = new FormData(form); // ✅ use form
    const data = Object.fromEntries(fd);

    if (!data.nom?.trim()) {
      setSubmitting(false);
      return setError('Le nom est requis.');
    }
    if (!data.prenom?.trim()) {
      setSubmitting(false);
      return setError('Le prénom est requis.');
    }
    if (data.email && !validateEmail(data.email)) {
      setSubmitting(false);
      return setError('Email invalide.');
    }
    if (data.tele && !validatePhone(data.tele)) {
      setSubmitting(false);
      return setError('Téléphone invalide (10 chiffres).');
    }
    if (!data.email && !data.tele) {
      setSubmitting(false);
      return setError('Email ou téléphone requis.');
    }

    try {
      const resp = await fetch('/api/v1/auto-ecole-devis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          nom: data.nom.trim(),
          prenom: data.prenom.trim(),
          raison_sociale: data.raison_sociale?.trim() || null,
          demarrage: data.demarrage || null,
          assure: data.assure || null,
          ancienne: data.ancienne || null,
          motif_resiliation: data.motif || null,
          email: data.email?.trim() || null,
          telephone: data.tele?.trim() || null,
        }),
      });
      const result = await resp.json();
      if (resp.ok && result.success) {
        form.reset(); // ✅ FIX: use saved form reference
        if (result.data?.id) {
          navigate(`/devis/${result.data.id}/confirmation`);
        }
      } else {
        setError(result.message || 'Erreur. Veuillez réessayer.');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  const guarantees = [
    {
      icon: '🛡️',
      title: 'Responsabilité civile professionnelle',
      desc: "Couvre les dommages corporels, matériels et immatériels causés aux tiers (élèves, piétons, autres conducteurs) lors des leçons de conduite.",
    },
    {
      icon: '🚗',
      title: 'Assurance des véhicules',
      desc: "Protège les véhicules de l'auto-école contre les dommages, vol et vandalisme, ainsi que les dommages causés aux autres véhicules.",
    },
    {
      icon: '👨‍🏫',
      title: 'Protection des instructeurs',
      desc: "Couvre les moniteurs en cas de blessure ou de dommages subis pendant l'exercice de leur activité, y compris en cas de faute de l'élève.",
    },
    {
      icon: '👨‍🎓',
      title: 'Garantie des élèves conducteurs',
      desc: "Protège les élèves pendant les leçons de conduite, même si ceux-ci sont encore en phase d'apprentissage et pas en possession d'un permis.",
    },
    {
      icon: '🏢',
      title: 'Garantie des locaux',
      desc: "Couvre les locaux de l'auto-école contre les risques comme l'incendie, le vol ou les dégâts des eaux.",
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

      {/* HERO + FORM */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-10 items-stretch min-h-[500px]">
            {/* Image */}
            <div className="relative h-full">
              <img
                src="https://assurance-professionnels-auto.fr/image/photautoecole.png"
                alt="Assurance RC Pro auto-école"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl"
              />
            </div>
            {/* Form card */}
            <div
              ref={formRef}
              id="ecoleForm"
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8 h-full flex flex-col overflow-hidden"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                Obtenez un devis gratuit
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Complétez en 2 minutes
              </p>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  {error}
                </div>
              )}
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-4 flex-1 overflow-y-auto pr-2"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nom *
                    </label>
                    <input
                      type="text" id="nom" name="nom" required
                      placeholder="Votre nom"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Prénom *
                    </label>
                    <input
                      type="text" id="prenom" name="prenom" required
                      placeholder="Votre prénom"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="raison_sociale" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Raison sociale
                  </label>
                  <input
                    type="text" id="raison_sociale" name="raison_sociale"
                    placeholder="Nom de votre auto-école"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="demarrage" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Démarrage d'activité
                    </label>
                    <select id="demarrage" name="demarrage"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                    >
                      <option value="">Sélectionnez…</option>
                      <option value="OUI">Oui</option>
                      <option value="NON">Non</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="assure" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Déjà assuré(e) ?
                    </label>
                    <select id="assure" name="assure"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                    >
                      <option value="">Sélectionnez…</option>
                      <option value="OUI">Oui</option>
                      <option value="NON">Non</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ancienne" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Ancienne assurance résiliée ?
                    </label>
                    <select id="ancienne" name="ancienne"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                    >
                      <option value="">Sélectionnez…</option>
                      <option value="OUI">Oui</option>
                      <option value="NON">Non</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="motif" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Motif de résiliation
                    </label>
                    <select id="motif" name="motif"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                    >
                      <option value="">Sélectionnez…</option>
                      <option>Sinistre</option>
                      <option>Non paiement</option>
                      <option>Amiable</option>
                      <option>Échéance</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="tele" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Téléphone *
                    </label>
                    <input
                      type="tel" id="tele" name="tele" maxLength={10} required
                      placeholder="01 23 45 67 89"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email" id="email" name="email"
                      placeholder="email@exemple.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  En cliquant sur 'Comparer', vous acceptez de transmettre vos
                  informations à AKSAM ASSURANCES.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all disabled:opacity-70"
                >
                  {submitting ? 'Envoi...' : 'Comparer maintenant'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

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