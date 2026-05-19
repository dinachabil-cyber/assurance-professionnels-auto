import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <header className="bg-[#312a8b] sticky top-0 z-50 py-4 shadow-2xl border-b-2 border-orange-600" role="banner">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-car text-2xl text-white"></i>
            </div>
            <div>
              <div className="hidden lg:block">
                <h1 className="text-lg font-semibold text-white">Quelque soient vos antécédents, obtenez un devis d&apos;assurance pour professionnels auto en quelques clics</h1>
              </div>
              <div className="lg:hidden">
                <h1 className="text-sm font-semibold text-white">Devis assurance professionnels auto</h1>
                <p className="text-xs text-white/80">En quelques clics</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-white/20 rounded-2xl shadow-lg">
              <i className="fas fa-phone text-2xl text-white"></i>
            </div>
            <div>
              <span className="text-sm text-white/80 block">Conseil personnalisé</span>
              <a href="tel:0182834800" className="text-2xl font-bold text-white hover:text-orange-200 transition-colors duration-300">
                01 82 83 48 00
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}