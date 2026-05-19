import { Helmet } from 'react-helmet-async';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GarageAutomobilePage() {
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
    setSubmitting(true);
    setError(null);
    const fd = new FormData(formRef.current);
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
      const resp = await fetch('/api/v1/garage-devis', {
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
        formRef.current?.reset();
        if (result.data?.id) {
          navigate(`/devis/${result.data.id}/confirmation`);
        }
      } else {
        setError(result.message || 'Erreur. Veuillez réessayer.');
      }
    } catch {
      setError('Erreur de connexion.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Assurance garage automobile - RC PRO garagiste</title>
        <meta
          name="description"
          content="Devis assurance pour garage automobile rapide, un comparatif pour RC PRO garage auto en ligne."
        />
        <meta
          name="keywords"
          content="Assurance garage automobile, RC PRO garage automobile, Devis assurance garage automobile"
        />
      </Helmet>

      {/* ── HERO + FORM ───────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-10 items-stretch min-h-[500px]">
            {/* Image */}
            <div className="relative h-full">
              <img
                src="https://assurance-professionnels-auto.fr/image/proauto-garage.jpg"
                alt="Assurance garage automobile"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl"
              />
            </div>
            {/* Form card */}
            <div
              ref={formRef}
              id="garageForm"
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
                ref={formRef}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="nom"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      required
                      placeholder="Votre nom"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="prenom"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      required
                      placeholder="Votre prénom"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="raison_sociale"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Raison sociale
                  </label>
                  <input
                    type="text"
                    id="raison_sociale"
                    name="raison_sociale"
                    placeholder="Nom de votre entreprise"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="demarrage"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Démarrage d'activité
                    </label>
                    <select
                      id="demarrage"
                      name="demarrage"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                    >
                      <option value="">Sélectionnez…</option>
                      <option value="OUI">Oui</option>
                      <option value="NON">Non</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="assure"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Déjà assuré(e) ?
                    </label>
                    <select
                      id="assure"
                      name="assure"
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
                    <label
                      htmlFor="ancienne"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Ancienne assurance résiliée ?
                    </label>
                    <select
                      id="ancienne"
                      name="ancienne"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                    >
                      <option value="">Sélectionnez…</option>
                      <option value="OUI">Oui</option>
                      <option value="NON">Non</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="motif"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Motif de résiliation
                    </label>
                    <select
                      id="motif"
                      name="motif"
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
                <div>
                  <label
                    htmlFor="code"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Code postal
                  </label>
                  <input
                    type="text"
                    id="code"
                    name="code"
                    maxLength={5}
                    placeholder="Code postal"
                    pattern="[0-9]{5}"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                    inputMode="numeric"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="tele"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="tele"
                      name="tele"
                      maxLength={10}
                      required
                      placeholder="01 23 45 67 89"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
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

   <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Qu'est-ce qu'une assurance pour garage automobile ?
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Une assurance pour l'activité de garagiste est une couverture
            spécialement conçue pour les professionnels du secteur automobile
            qui exploitent des garages ou tout autre établissement proposant des
            services liés à la réparation des véhicules. Elle vise à protéger le
            garagiste contre les risques spécifiques à son activité et à couvrir
            les responsabilités, les biens, ainsi que les véhicules confiés par
            ses clients.
          </p>
        </div>
      </section>

      {/* ── GARANTY CARDS ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white" id="garanties">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Les garanties RC PRO pour garage automobile
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
                desc: 'Protège contre les dommages causés dans le cadre de l\'exploitation du garage (chute d\'un client, etc.).',
              },
              {
                icon: '🚗',
                title: 'Véhicules Confiés',
                desc: 'Couverture pour les véhicules appartenant aux clients pendant leur garde au garage.',
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
            Devis assurance garagiste
            

            </h2>
            <p className="text-base mb-8 text-gray-800/80 max-w-xl mx-auto leading-relaxed">
             Pour obtenir un devis RC PRO garagiste, complétez le formulaire en
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

      {/* ── DEFINITION ────────────────────────────────────────────── */}
   
   
    </>
  );
}
