import { Link } from 'react-router-dom';

const activities = [
  { icon: '🏠', label: 'Garagistes', description: 'Ateliers de réparation, entretien et maintenance automobile.', href: '/garage-automobile' },
  { icon: '🏢', label: 'Concessionnaires', description: 'Vente de véhicules neufs et occasions.' },
  { icon: '🚗', label: 'Loueurs de véhicules', description: 'Location courte et longue durée.', href: '/loueur-voiture' },
  { icon: '🚛', description: 'Remorquage et assistance routière.', label: 'Dépanneurs' },
  { icon: '⛽', label: 'Stations-services', description: 'Distribution de carburant et services.' },
  { icon: '🔬', label: 'Centres techniques', description: 'Contrôle technique et diagnostics.' },
  { icon: '🤝', label: 'Négociants auto', description: 'Achat et revente de véhicules.', href: '/negociants-auto' },
  { icon: '📚', label: 'Auto-écoles', description: 'Enseignement de la conduite.', href: '/auto-ecole' },
];

export default function ActivitySection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white" id="activites">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Couvrant toutes les professions de l'automobile
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
        Que vous soyez garagiste, auto-école, négociant ou loueur, nous avons une solution d'assurance adaptée à votre métier.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {activities.map((activity, index) => (
     <Link
  key={activity.label}
  to={activity.href}
  className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#312a8b]/30 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer block"
  style={{ animationDelay: `${index * 100}ms` }}
>
<div className="absolute top-0 right-0 w-24 h-24 -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
  <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="48" cy="48" r="47" stroke="#312a8b" strokeWidth="0.5" strokeDasharray="4 3" opacity="0.3"/>
    <circle cx="48" cy="48" r="35" stroke="#312a8b" strokeWidth="0.5" opacity="0.15"/>
    <circle cx="48" cy="48" r="22" fill="#312a8b" opacity="0.06"/>
  </svg>
</div>          <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{activity.icon}</div>
          <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#312a8b] transition-colors">
            {activity.label}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">{activity.description}</p>
          <div className="flex items-center text-sm font-medium text-[#312a8b]">
            <span className="group-hover:underline">En savoir plus</span>
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      ))}
    </div>

<div className="text-center mt-16">
       <button
         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
         className="inline-flex items-center gap-3 px-10 py-4 bg-[#312a8b] hover:bg-[#261f6e] text-white rounded-2xl text-lg font-bold transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
       >
       <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
  {/* document */}
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
  <rect x="9" y="3" width="6" height="4" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
  {/* checkmark lines */}
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 16h4" />
</svg>
Obtenir un devis personnalisé
</button>
    </div>
  </div>
</section>
  );
}