export default function Header() {
  return (
    <header className="bg-[#312a8b] sticky top-0 z-50 py-4 shadow-2xl " role="banner">
     <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">

  {/* LEFT SECTION → hidden on mobile */}
  <div className="hidden lg:flex items-center space-x-4">
    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shadow-lg">
      <i className="fas fa-car text-2xl text-white"></i>
    </div>
    <div>
      <h1 className="text-lg font-semibold text-white">
        Quelque soient vos antécédents, obtenez un devis d&apos;assurance pour professionnels auto en quelques clics
      </h1>
    </div>
  </div>

  {/* RIGHT SECTION → always visible (phone only on mobile too) */}
  <div className="flex items-center space-x-4">
    <div className="p-4 bg-white/20 rounded-2xl shadow-lg">
      <i className="fas fa-phone text-2xl text-white"></i>
    </div>
    <div>
      <span className="text-sm text-white/80 block">Conseil personnalisé</span>
      <a href="tel:0182834800" className="text-2xl font-bold text-white">
        01 82 83 48 00
      </a>
    </div>
  </div>

</div>
    </header>
  );
}