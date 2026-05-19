import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useDevis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const submitDevis = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/v1/devis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'envoi du devis');
      }

      setResult(data);
      if (data.data?.id) {
        navigate(`/devis/${data.data.id}/confirmation`);
      }
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return { submitDevis, loading, error, result };
}

export function useSeoMeta(config) {
  return {
    title: config.title || 'Assurance Professionnels Auto — Aksam Assurance',
    description: config.description || 'Devis assurance pour professionnels de l\'automobile, un comparatif rapide et en ligne.',
    image: config.image || '/images/og-image.jpg',
    url: config.url || 'https://assurance-professionnels-auto.fr',
  };
}