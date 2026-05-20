export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-3xl p-12 text-center relative overflow-hidden max-w-4xl mx-auto my-16">
      <div className="relative">
        <div className="w-12 h-12 bg-gray-900/20 rounded-xl mx-auto mb-6 flex items-center justify-center">
          <i className="fas fa-car text-xl text-gray-900"></i>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          Devis RC pro pour professionnels de l&apos;automobile
        </h2>
        <p className="text-base mb-8 text-gray-900/80 max-w-xl mx-auto leading-relaxed">
          Il est important pour les professionnels de l&apos;automobile de bien comprendre les risques spécifiques liés à leur activité et de choisir des polices d&apos;assurance adaptées pour assurer une protection adéquate. Les détails exacts de la couverture peuvent varier en fonction du fournisseur d&apos;assurance et des besoins spécifiques de l&apos;entreprise.
        </p>
        <button
          onClick={() => {
            const target = document.getElementById('contactForm') || document.getElementById('devis') || document.getElementById('form');
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="bg-white text-orange-500 font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-all transform hover:scale-105 shadow-lg text-sm"
        >
          <i className="fas fa-arrow-up mr-2"></i>
          Demandez votre devis gratuit en ligne
        </button>
      </div>
    </section>
  );
}