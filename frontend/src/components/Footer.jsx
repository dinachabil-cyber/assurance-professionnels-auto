import { Link } from 'react-router-dom';

export default function Footer() {
  return (
 


    <footer className="bg-[#312a8b] text-gray-300" role="contentinfo">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              
              <span className="text-lg font-bold text-white">Aksam Assurance</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Spécialiste de l'assurance des professionnels de l'automobile.
              Comparez et obtenez votre devis en ligne.
            </p>
          </div>

        

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Informations</h4>
            <ul className="space-y-3">
              <li><Link to="/mentions-legales" className="text-sm hover:text-[#5a4fbf] transition-colors">Mentions légales</Link></li>
              <li><Link to="/politique-confidentialite" className="text-sm hover:text-[#5a4fbf] transition-colors">Politique de confidentialité</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>10 rue de Penthièvre</li>
              <li>75008 Paris</li>
              <li><a href="tel:0182834800" className="hover:text-[#5a4fbf] transition-colors">01 82 83 48 00</a></li>
              <li><a href="mailto:contact@aksam-assurances.fr" className="hover:text-[#5a4fbf] transition-colors">contact@aksam-assurances.fr</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#312a8b]/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Aksam Assurance — Tous droits réservés</p>
          <div className="flex items-center gap-4">
         
          </div>
        </div>
      </div>
    </footer>
  );
}