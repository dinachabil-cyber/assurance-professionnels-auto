import { useState } from 'react';

const faqs = [
  { q: 'Qu\'est-ce que l\'assurance professionnelle automobile ?', a: 'L\'assurance professionnelle automobile est une couverture conçue pour les entreprises et professionnels travaillant dans le secteur automobile. Elle protège contre les risques spécifiques liés à leur activité professionnelle (responsabilité civile, dommages aux véhicules de clients, perte d\'exploitation, etc.).' },
  { q: 'Qui doit souscrire une assurance professionnelle auto ?', a: 'Tous les professionnels utilisant un véhicule dans le cadre de leur activité : garagistes, auto-écoles, loueurs, concessionnaires, dépanneurs, négociants, transporteurs, etc. C\'est une obligation légale pour exercer sereinement.' },
  { q: 'Comment obtenir un devis rapidement ?', a: 'Remplissez notre formulaire en ligne en quelques minutes. Nous comparons les offres de nos compagnies partenaires et revenons vers vous avec les meilleures propositions adaptées à votre activité et votre budget.' },
  { q: 'Quelles garanties sont incluses ?', a: 'Nos contrats peuvent inclure : la responsabilité civile professionnelle, les dommages aux véhicules de clients, les biens professionnels, la perte d\'exploitation, la protection juridique et bien d\'autres options selon votre métier.' },
  { q: 'Puis-je changer d\'assurance professionnelle facilement ?', a: 'Oui, vous pouvez résilier votre contrat actuel et souscrire chez nous. Nous vous accompagnons dans toutes les démarches et vérifions que votre sinistralité vous permet de bénéficier des meilleures conditions.' },
  { q: 'Proposez-vous des tarifs compétitifs ?', a: 'Grâce à notre réseau de partenaires assureurs et notre volume de dossiers, nous négocions les meilleurs tarifs du marché pour chaque profil professionnel.' },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);
  return (
    <section className="py-16 md:py-24" id="questions">
      <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold tracking-wider uppercase mb-4">Foire aux questions</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Questions fréquentes</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">Vous avez des questions ? Voici les réponses aux interrogations les plus courantes.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-orange-300">
              <button onClick={() => toggle(i)} className="w-full flex items-center justify-between p-5 text-left" aria-expanded={openIndex === i}>
                <span className="text-sm font-semibold text-gray-800 text-left pr-4">{faq.q}</span>
                <span className={`w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </span>
              </button>
              <div className={`grid transition-all duration-300 ease-in-out ${openIndex === i ? 'grid-rows-1' : 'grid-rows-0'}`}>
                <div className={`px-5 pb-5 text-sm text-gray-500 leading-relaxed ${openIndex === i ? 'opacity-100' : 'opacity-0'}`}>{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700 hover:underline">Obtenir un devis gratuit <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg></button>
        </div>
      </div>
    </section>
  );
}