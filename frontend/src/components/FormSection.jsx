import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

export default function FormSection({ onSubmitSuccess }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const formRef = useRef(null);

  const validatePhone = (p) => /^0[1-9]\d{8}$/.test(p.replace(/\s/g, '')) || /^0[67]\d{8}$/.test(p.replace(/\s/g, ''));
  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); setError(null);
    const fd = new FormData(formRef.current);
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
        setSuccess(true);
        formRef.current?.reset();
        if (onSubmitSuccess && result.data?.id) {onSubmitSuccess(result.data.id);}
      } else { setError(result.message || 'Erreur. Veuillez réessayer.'); }
     } catch { setError('Erreur de connexion.'); }
    finally { setSubmitting(false); }
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-8 md:p-12 text-center border border-green-200">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">Demande envoyée avec succès !</h3>
        <p className="text-gray-500 mb-6">Un de nos conseillers vous contactera dans les plus brefs délais.</p>
        <p className="text-sm text-gray-500">Tel : <a href="tel:0182834800" className="text-orange-600 font-semibold hover:underline">01 82 83 48 00</a></p>
        <p className="text-xs text-gray-400 mt-1">ou <a href="mailto:contact@aksam-assurances.fr" className="text-orange-600 hover:underline">contact@aksam-assurances.fr</a></p>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-white" ref={formRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Obtenez un devis gratuit</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">Complétez ce formulaire et recevez une proposition personnalisée adaptée à votre activité professionnelle.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl"><div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm">1</div><div><p className="text-sm font-medium text-gray-700">Renseignez vos informations</p><p className="text-xs text-gray-400">Quelques secondes suffisent</p></div></div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl"><div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm">2</div><div><p className="text-sm font-medium text-gray-700">Recevez vos propositions</p><p className="text-xs text-gray-400">Comparatif personnalisé</p></div></div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl"><div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm">3</div><div><p className="text-sm font-medium text-gray-700">Choisissez votre assurance</p><p className="text-xs text-gray-400">Conseil inclus</p></div></div>
            </div>
            <div className="mt-8 p-5 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-sm text-amber-800 leading-relaxed flex items-start gap-2">
                <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-1">Demande de devis</h3>
              <p className="text-sm text-gray-500 mb-6">Complétez les champs ci-dessous</p>
              {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-2"><svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{error}</div>}
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1.5">Nom <span className="text-red-500">*</span></label><input type="text" id="nom" name="nom" required placeholder="Votre nom" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" /></div>
                  <div><label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1.5">Prénom <span className="text-red-500">*</span></label><input type="text" id="prenom" name="prenom" required placeholder="Votre prénom" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" /></div>
                </div>
                <div><label htmlFor="raison_sociale" className="block text-sm font-medium text-gray-700 mb-1.5">Raison sociale</label><input type="text" id="raison_sociale" name="raison_sociale" placeholder="Nom de votre entreprise" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" /></div>
                <div><label htmlFor="activite" className="block text-sm font-medium text-gray-700 mb-1.5">Activité</label><input type="text" id="activite" name="activite" placeholder="Votre activité professionnelle" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label htmlFor="demarrage" className="block text-sm font-medium text-gray-700 mb-1.5">Démarrage d'activité</label><select id="demarrage" name="demarrage" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer appearance-none"><option value="">Sélectionnez…</option><option value="OUI">Oui</option><option value="NON">Non</option></select></div>
                  <div><label htmlFor="assure" className="block text-sm font-medium text-gray-700 mb-1.5">Déjà assuré(e) ?</label><select id="assure" name="assure" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer appearance-none"><option value="">Sélectionnez…</option><option value="OUI">Oui</option><option value="NON">Non</option></select></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label htmlFor="ancienne" className="block text-sm font-medium text-gray-700 mb-1.5">Ancienne assurance résiliée ?</label><select id="ancienne" name="ancienne" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer appearance-none"><option value="">Sélectionnez…</option><option value="OUI">Oui</option><option value="NON">Non</option></select></div>
                  <div><label htmlFor="motif" className="block text-sm font-medium text-gray-700 mb-1.5">Motif de résiliation</label><select id="motif" name="motif" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer appearance-none"><option value="">Sélectionnez…</option><option>Sinistre</option><option>Non paiement</option><option>Amiable</option><option>Échéance</option></select></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1.5">Code postal</label><input type="text" id="code" name="code" maxLength="5" placeholder="Code postal" pattern="[0-9]{5}" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" inputMode="numeric" /></div>
                  <div><label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label><input type="email" id="email" name="email" placeholder="email@exemple.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" /></div>
                </div>
                <div><label htmlFor="tele" className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone <span className="text-red-500">*</span></label><input type="tel" id="tele" name="tele" maxLength="10" required placeholder="01 23 45 67 89" inputMode="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" /></div>
                <button type="submit" disabled={submitting} className={`w-full flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 ${submitting ? 'animate-pulse' : ''}`}>
                  {submitting ? <><svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Envoi en cours…</> : <><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Comparer maintenant</>}
                </button>
                <p className="text-xs text-gray-400 text-center leading-relaxed">En cliquant sur « Comparer maintenant », vous acceptez de transmettre vos informations à AKSAM ASSURANCES.</p>
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