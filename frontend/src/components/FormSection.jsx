import { useState, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { validateFormSecurity } from '../utils/formSecurity.js';

const FormSection = forwardRef(function FormSection({ 
  onSubmitSuccess, 
  showImage = false, 
  imageUrl = null,
  endpoint = '/api/v1/devis',
  showActivity = true,
  showPostalCode = true,
  title = 'Obtenez un devis gratuit',
  subtitle = 'Complétez en 2 minutes'
}, ref) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [securityErrors, setSecurityErrors] = useState({});

  const validatePhone = (p) => /^0[1-9]\d{8}$/.test(p.replace(/\s/g, '')) || /^0[67]\d{8}$/.test(p.replace(/\s/g, ''));
  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    setError(null);
    setSecurityErrors({});
    const fd = new FormData(form);
    const data = Object.fromEntries(fd);

    // Security validation for text fields (nom, prenom, raison_sociale, activite)
    const securityFields = {
      nom: data.nom,
      prenom: data.prenom,
      raison_sociale: data.raison_sociale,
      activite: data.activite,
    };
    const securityResult = validateFormSecurity(securityFields);
    if (!securityResult.valid) {
      setSecurityErrors(securityResult.errors);
      return setSubmitting(false) || setError('Veuillez corriger les champs invalides.');
    }

    if (!data.nom?.trim()) {return setSubmitting(false) || setError('Le nom est requis.');}
    if (!data.prenom?.trim()) {return setSubmitting(false) || setError('Le prénom est requis.');}
    if (!data.email?.trim()) {return setSubmitting(false) || setError('L\'email est requis.');}
    if (!data.tele?.trim()) {return setSubmitting(false) || setError('Le téléphone est requis.');}
    if (!validateEmail(data.email)) {return setSubmitting(false) || setError('Email invalide.');}
    if (!validatePhone(data.tele)) {return setSubmitting(false) || setError('Téléphone invalide (10 chiffres).');}

    const bodyData = {
      nom: data.nom.trim(),
      prenom: data.prenom.trim(),
      raison_sociale: data.raison_sociale?.trim() || null,
      activite: data.activite?.trim() || null,
      demarrage: data.demarrage || null,
      assure: data.assure || null,
      ancienne: data.ancienne || null,
      motif_resiliation: data.motif || null,
      code_postal: data.code?.trim() || null,
      email: data.email.trim(),
      telephone: data.tele.trim(),
    };

    try {
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        body: JSON.stringify(bodyData),
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

  const FormContent = () => (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">{title}</h2>
      <p className="text-sm text-gray-500 mb-6">{subtitle}</p>
      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}
      <form onSubmit={handleSubmit} noValidate className="space-y-4 flex-1 flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1.5">Nom *</label><input type="text" id="nom" name="nom" required placeholder="Votre nom" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" /></div>
          <div><label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1.5">Prénom *</label><input type="text" id="prenom" name="prenom" required placeholder="Votre prénom" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" /></div>
        </div>
        <div><label htmlFor="raison_sociale" className="block text-sm font-medium text-gray-700 mb-1.5">Raison sociale</label><input type="text" id="raison_sociale" name="raison_sociale" placeholder="Nom de votre entreprise" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" /></div>
        {showActivity && <div><label htmlFor="activite" className="block text-sm font-medium text-gray-700 mb-1.5">Activité</label><input type="text" id="activite" name="activite" placeholder="Votre activité" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" /></div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label htmlFor="demarrage" className="block text-sm font-medium text-gray-700 mb-1.5">Démarrage d'activité</label><select id="demarrage" name="demarrage" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"><option value="">Sélectionnez…</option><option value="OUI">Oui</option><option value="NON">Non</option></select></div>
          <div><label htmlFor="assure" className="block text-sm font-medium text-gray-700 mb-1.5">Déjà assuré(e) ?</label><select id="assure" name="assure" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"><option value="">Sélectionnez…</option><option value="OUI">Oui</option><option value="NON">Non</option></select></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label htmlFor="ancienne" className="block text-sm font-medium text-gray-700 mb-1.5">Ancienne assurance résiliée ?</label><select id="ancienne" name="ancienne" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"><option value="">Sélectionnez…</option><option value="OUI">Oui</option><option value="NON">Non</option></select></div>
          <div><label htmlFor="motif" className="block text-sm font-medium text-gray-700 mb-1.5">Motif de résiliation</label><select id="motif" name="motif" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"><option value="">Sélectionnez…</option><option>Sinistre</option><option>Non paiement</option><option>Amiable</option><option>Échéance</option></select></div>
        </div>
        {showPostalCode && <div><label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1.5">Code postal</label><input type="text" id="code" name="code" maxLength="5" placeholder="Code postal" pattern="[0-9]{5}" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" inputMode="numeric" /></div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label htmlFor="tele" className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone *</label><input type="tel" id="tele" name="tele" maxLength="10" required placeholder="01 23 45 67 89" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" /></div>
          <div><label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label><input type="email" id="email" name="email" placeholder="email@exemple.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" /></div>
        </div>
        <button type="submit" disabled={submitting} className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all disabled:opacity-70">{submitting ? 'Envoi...' : 'Comparer maintenant'}</button>
      </form>
    </div>
  );

  if (showImage && imageUrl) {
    return (
      <section ref={ref} className="py-12 lg:py-20 bg-white hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 scanlines-bg opacity-30"></div>
        <div className="absolute top-10 left-10 floating-animation"><i className="fas fa-car text-orange-400 text-6xl opacity-30"></i></div>
        <div className="absolute bottom-10 right-10 floating-animation" style={{ animationDelay: '-2s' }}><i className="fas fa-shield-alt text-orange-500 text-8xl opacity-25"></i></div>
        <div className="max-w mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-stretch">
           <div className="w-full lg:w-1/2 order-2 lg:order-1 flex">
  <div className="relative w-full h-full min-h-[400px] border-2 border-gray-200 rounded-xl overflow-hidden">
  <img
    src={imageUrl}
    alt="Véhicule professionnel"
    className="absolute inset-0 w-full h-full object-cover"
  />
</div>
</div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2 flex">
              <div className="flex-1">
                <FormContent />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="py-16 bg-gradient-to-br from-gray-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-5">Assurance professionnelle</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">Obtenez votre devis<span className="block text-orange-500">rapidement et gratuitement</span></h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">Remplissez le formulaire en quelques minutes et recevez une offre adaptée à votre activité professionnelle avec un accompagnement personnalisé.</p>
            <div className="space-y-5">
              <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0"><svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></div><div><h3 className="font-semibold text-gray-800 text-lg">Réponse rapide</h3><p className="text-gray-500 text-sm mt-1">Un conseiller vous contacte dans les plus brefs délais.</p></div></div>
              <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0"><svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6" /></svg></div><div><h3 className="font-semibold text-gray-800 text-lg">Comparatif personnalisé</h3><p className="text-gray-500 text-sm mt-1">Nous trouvons les meilleures garanties selon votre activité.</p></div></div>
              <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0"><svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg></div><div><h3 className="font-semibold text-gray-800 text-lg">Gratuit & sans engagement</h3><p className="text-gray-500 text-sm mt-1">Votre demande de devis est totalement gratuite.</p></div></div>
            </div>
          </div>
          <div><div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 md:p-8"><div className="mb-8"><h3 className="text-2xl font-bold text-gray-900 mb-2">Demande de devis</h3><p className="text-gray-500">Complétez vos informations</p></div><FormContent /></div></div>
        </div>
      </div>
    </section>
  );
});

FormSection.propTypes = {
  onSubmitSuccess: PropTypes.func,
  showImage: PropTypes.bool,
  imageUrl: PropTypes.string,
  endpoint: PropTypes.string,
  showActivity: PropTypes.bool,
  showPostalCode: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default FormSection;