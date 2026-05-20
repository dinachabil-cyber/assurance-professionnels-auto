import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function FormSection({ onSubmitSuccess }) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const validatePhone = (p) => /^0[1-9]\d{8}$/.test(p.replace(/\s/g, '')) || /^0[67]\d{8}$/.test(p.replace(/\s/g, ''));
  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    setError(null);
    const fd = new FormData(form);
    const data = Object.fromEntries(fd);

    if (!data.nom?.trim()) {return setSubmitting(false) || setError('Le nom est requis.');}
    if (!data.prenom?.trim()) {return setSubmitting(false) || setError('Le prénom est requis.');}
    if (data.email && !validateEmail(data.email)) {return setSubmitting(false) || setError('Email invalide.');}
    if (data.tele && !validatePhone(data.tele)) {return setSubmitting(false) || setError('Téléphone invalide (10 chiffres).');}
    if (!data.email && !data.tele) {return setSubmitting(false) || setError('Email ou téléphone requis.');}

    try {
       const resp = await fetch('/api/v1/devis', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
         body: JSON.stringify({
           nom: data.nom.trim(), prenom: data.prenom.trim(),
           raison_sociale: data.raison_sociale?.trim() || null,
           activite: data.activite?.trim() || null,
           demarrage: data.demarrage || null, assure: data.assure || null,
           ancienne: data.ancienne || null, motif_resiliation: data.motif || null,
           code_postal: data.code?.trim() || null,
           email: data.email?.trim() || null, telephone: data.tele?.trim() || null,
         }),
       });
       const result = await resp.json();
       if (resp.ok && result.success) {
         form.reset();
         if (onSubmitSuccess && result.data?.id) {onSubmitSuccess(result.data.id);}
         navigate(`/devis/${result.data.id}/confirmation`);
       } else { setError(result.message || 'Erreur. Veuillez réessayer.'); }
     } catch (err) {
       console.error('Form submission error:', err);
       setError('Erreur de connexion. Veuillez réessayer.');
     } finally { setSubmitting(false); }
   };

  return (
<section className="py-16 bg-gradient-to-br from-gray-50 via-white to-orange-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

      {/* LEFT SIDE */}
      <div>
        <span className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-5">
          Assurance professionnelle
        </span>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Obtenez votre devis
          <span className="block text-orange-500">
            rapidement et gratuitement
          </span>
        </h2>

        <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
          Remplissez le formulaire en quelques minutes et recevez une offre
          adaptée à votre activité professionnelle avec un accompagnement personnalisé.
        </p>

        <div className="space-y-5">

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 text-lg">
                Réponse rapide
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                Un conseiller vous contacte dans les plus brefs délais.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6" />
              </svg>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 text-lg">
                Comparatif personnalisé
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                Nous trouvons les meilleures garanties selon votre activité.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
              </svg>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 text-lg">
                Gratuit & sans engagement
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                Votre demande de devis est totalement gratuite.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE / FORM */}
      <div>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 md:p-8">

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Demande de devis
            </h3>

            <p className="text-gray-500">
              Complétez vos informations
            </p>
          </div>

          {error && (
            <div className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label htmlFor="nom" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom
                </label>

                <input
                  type="text"
                  id="nom"
                  name="nom"
                  placeholder="Votre nom"
                  className="w-full h-14 px-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="prenom" className="block text-sm font-semibold text-gray-700 mb-2">
                  Prénom
                </label>

                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  placeholder="Votre prénom"
                  className="w-full h-14 px-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                />
              </div>

            </div>

            <div>
              <label htmlFor="raison_sociale" className="block text-sm font-semibold text-gray-700 mb-2">
                Raison sociale
              </label>

              <input
                type="text"
                id="raison_sociale"
                name="raison_sociale"
                placeholder="Nom de votre entreprise"
                className="w-full h-14 px-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="activite" className="block text-sm font-semibold text-gray-700 mb-2">
                Activité
              </label>

              <input
                type="text"
                id="activite"
                name="activite"
                placeholder="Votre activité"
                className="w-full h-14 px-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email@exemple.com"
                  className="w-full h-14 px-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="tele" className="block text-sm font-semibold text-gray-700 mb-2">
                  Téléphone
                </label>

                <input
                  type="tel"
                  id="tele"
                  name="tele"
                  placeholder="01 23 45 67 89"
                  className="w-full h-14 px-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                />
              </div>

            </div>

            <div>
              <label htmlFor="code" className="block text-sm font-semibold text-gray-700 mb-2">
                Code postal
              </label>

              <input
                type="text"
                id="code"
                name="code"
                placeholder="75000"
                className="w-full h-14 px-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-14 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-70"
            >
              {submitting ? 'Envoi en cours...' : 'Comparer maintenant'}
            </button>

            <p className="text-xs text-center text-gray-400 leading-relaxed">
              En envoyant ce formulaire, vous acceptez notre politique de confidentialité.
            </p>

          </form>

        </div>
      </div>

    </div>
  </div>
</section>
  );
}

FormSection.propTypes = {
  onSubmitSuccess: PropTypes.func,
};