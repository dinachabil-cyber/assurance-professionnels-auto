export default function GuaranteeSection() {
  const guarantees = [
    { icon: '🛡️', title: 'Responsabilité civile professionnelle', desc: 'Protège contre les dommages corporels ou matériels causés à des tiers dans le cadre de votre activité.' },
    { icon: '🏗️', title: 'Assurance des biens', desc: 'Couvre les dommages ou la perte de vos équipements, outils et installations professionnels.' },
    { icon: '🔧', title: 'Responsabilité civile garage', desc: 'Protection spécifique pour ateliers de réparation contre les dommages aux véhicules des clients.' },
    { icon: '🚘', title: 'Assurance véhicule propre', desc: 'Protège les véhicules appartenant à votre entreprise ou utilisés dans le cadre professionnel.' },
    { icon: '📋', title: 'Responsabilité des produits', desc: 'Pour fabricants et vendeurs de pièces automobiles, couvre les défauts de fabrication.' },
    { icon: '💰', title: 'Assurance perte d\'exploitation', desc: 'Maintient vos revenus en cas d\'interruption d\'activité suite à un sinistre.' },
  ];
  return (
    <section className="py-20 md:py-28 bg-white" id="garanties">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Des garanties complètes pour votre activité
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Nos contrats d'assurance multirisque professionnelle s'adaptent aux spécificités de chaque métier de l'automobile.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {guarantees.map((guarantee, i) => (
            <div
              key={guarantee.title}
              className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{guarantee.icon}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {guarantee.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{guarantee.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}