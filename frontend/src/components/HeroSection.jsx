import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();
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

    if (!data.nom?.trim()) { return setSubmitting(false) || setError('Le nom est requis.'); }
    if (!data.prenom?.trim()) { return setSubmitting(false) || setError('Le prénom est requis.'); }
    if (data.email && !validateEmail(data.email)) { return setSubmitting(false) || setError('Email invalide.'); }
    if (data.tele && !validatePhone(data.tele)) { return setSubmitting(false) || setError('Téléphone invalide (10 chiffres).'); }
    if (!data.email && !data.tele) { return setSubmitting(false) || setError('Email ou téléphone requis.'); }

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
        if (result.data?.id) { navigate(`/devis/${result.data.id}/confirmation`); }
      } else { setError(result.message || 'Erreur. Veuillez réessayer.'); }
    } catch { setError('Erreur de connexion.'); }
    finally { setSubmitting(false); }
  };

  if (success) {
    return (
      <section className="py-12 md:py-16 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="max-w-2xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Demande envoyée !</h2>
          <p className="text-orange-100">Un conseiller vous contactera sous peu.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-orange-500 to-orange-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-10 items-stretch min-h-[500px]">
          <div className="relative h-full">
            <img
              src="/hero.jpg"
              alt="Véhicule professionnel"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl"
            />
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 h-full flex flex-col overflow-hidden">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Obtenez un devis gratuit</h2>
            <p className="text-sm text-gray-500 mb-6">Complétez en 2 minutes</p>
            {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}
            <form onSubmit={handleSubmit} noValidate className="space-y-4 flex-1 overflow-y-auto pr-2" ref={formRef}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1.5">Nom *</label><input type="text" id="nom" name="nom" required placeholder="Votre nom" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" /></div>
                <div><label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1.5">Prénom *</label><input type="text" id="prenom" name="prenom" required placeholder="Votre prénom" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" /></div>
              </div>
              <div><label htmlFor="raison_sociale" className="block text-sm font-medium text-gray-700 mb-1.5">Raison sociale</label><input type="text" id="raison_sociale" name="raison_sociale" placeholder="Nom de votre entreprise" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" /></div>
              <div><label htmlFor="activite" className="block text-sm font-medium text-gray-700 mb-1.5">Activité</label><input type="text" id="activite" name="activite" placeholder="Votre activité" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label htmlFor="demarrage" className="block text-sm font-medium text-gray-700 mb-1.5">Démarrage d'activité</label><select id="demarrage" name="demarrage" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"><option value="">Sélectionnez…</option><option value="OUI">Oui</option><option value="NON">Non</option></select></div>
                <div><label htmlFor="assure" className="block text-sm font-medium text-gray-700 mb-1.5">Déjà assuré(e) ?</label><select id="assure" name="assure" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"><option value="">Sélectionnez…</option><option value="OUI">Oui</option><option value="NON">Non</option></select></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label htmlFor="ancienne" className="block text-sm font-medium text-gray-700 mb-1.5">Ancienne assurance résiliée ?</label><select id="ancienne" name="ancienne" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"><option value="">Sélectionnez…</option><option value="OUI">Oui</option><option value="NON">Non</option></select></div>
                <div><label htmlFor="motif" className="block text-sm font-medium text-gray-700 mb-1.5">Motif de résiliation</label><select id="motif" name="motif" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"><option value="">Sélectionnez…</option><option>Sinistre</option><option>Non paiement</option><option>Amiable</option><option>Échéance</option></select></div>
              </div>
              <div><label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1.5">Code postal</label><input type="text" id="code" name="code" maxLength="5" placeholder="Code postal" pattern="[0-9]{5}" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" inputMode="numeric" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label htmlFor="tele" className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone *</label><input type="tel" id="tele" name="tele" maxLength="10" required placeholder="01 23 45 67 89" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" /></div>
                <div><label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label><input type="email" id="email" name="email" placeholder="email@exemple.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none" /></div>
              </div>
              <button type="submit" disabled={submitting} className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all disabled:opacity-70">
                {submitting ? 'Envoi...' : 'Comparer maintenant'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}