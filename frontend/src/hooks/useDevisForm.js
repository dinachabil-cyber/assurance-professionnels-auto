import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateFormSecurity } from '../utils/formSecurity.js';

export function useDevisForm(endpoint = '/api/v1/devis') {
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

    const securityCheck = validateFormSecurity(data);
    if (!securityCheck.valid) {
      setSubmitting(false);
      setError(securityCheck.errors.nom?.[0] || securityCheck.errors.prenom?.[0] || securityCheck.errors.email?.[0] || securityCheck.errors.tele?.[0] || 'Invalid input detected');
      return;
    }

    if (!data.nom?.trim()) { return setSubmitting(false) || setError('Le nom est requis.'); }
    if (!data.prenom?.trim()) { return setSubmitting(false) || setError('Le prénom est requis.'); }
    if (data.email && !validateEmail(data.email)) { return setSubmitting(false) || setError('Email invalide.'); }
    if (data.tele && !validatePhone(data.tele)) { return setSubmitting(false) || setError('Téléphone invalide (10 chiffres).'); }
    if (!data.email && !data.tele) { return setSubmitting(false) || setError('Email ou téléphone requis.'); }

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
      email: data.email?.trim() || null,
      telephone: data.tele?.trim() || null,
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
        navigate(`/devis/${result.data?.id}/confirmation`);
      } else { setError(result.message || 'Erreur. Veuillez réessayer.'); }
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally { setSubmitting(false); }
  };

  return { submitting, error, handleSubmit, validatePhone, validateEmail, setError };
}