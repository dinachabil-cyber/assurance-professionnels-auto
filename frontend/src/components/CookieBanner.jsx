import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const consent = document.cookie.match(/aksamConsent=([^;]+)/);
    if (!consent) {setShowBanner(true);}
    else {
      try { setAnalytics(JSON.parse(decodeURIComponent(consent[1])).analytics ?? false); } catch { /* ignore */ }
      try { setMarketing(JSON.parse(decodeURIComponent(consent[1])).marketing ?? false); } catch { /* ignore */ }
    }
  }, []);

  const saveConsent = () => {
    const prefs = JSON.stringify({ analytics, marketing });
    const expiry = new Date(); expiry.setMonth(expiry.getMonth() + 6);
    document.cookie = `aksamConsent=${encodeURIComponent(prefs)}; path=/; expires=${expiry.toUTCString()}; SameSite=Lax`;
    if (typeof window.gtag === 'function') {
      if (analytics) { window.gtag('consent', 'update', { 'analytics_storage': 'granted' }); }
      else { window['ga-disable-G-FR8Y8GRZME'] = true; }
      if (marketing) { window.gtag('consent', 'update', { 'ad_storage': 'granted' }); }
      else { window['ga-disable-AW-716366483'] = true; }
    }
    setShowBanner(false); setShowPreferences(false);
  };

  if (!showBanner && !showPreferences) {return null;}

  return (
    <>
      {showPreferences && <div className="fixed inset-0 bg-black/50 z-[99]" onClick={() => setShowPreferences(false)} aria-hidden="true" />}
      {showPreferences && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-gray-100 overflow-hidden">
            <div className="bg-orange-500 px-6 py-4">
              <h3 className="text-lg font-bold text-white">Paramètres de confidentialité</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1"><h4 className="font-semibold text-sm mb-1">Cookies analytiques</h4>
                <p className="text-xs text-gray-500">Nous permettent d'améliorer le site.</p></div>
                <button onClick={() => setAnalytics(!analytics)} className={`relative w-12 h-6 rounded-full shrink-0 transition-colors ${analytics ? 'bg-orange-500' : 'bg-gray-300'}`} role="switch" aria-checked={analytics}>
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${analytics ? 'translate-x-6' : ''}`} />
                </button>
              </div>
              <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1"><h4 className="font-semibold text-sm mb-1">Cookies marketing</h4>
                <p className="text-xs text-gray-500">Campagnes publicitaires personnalisées.</p></div>
                <button onClick={() => setMarketing(!marketing)} className={`relative w-12 h-6 rounded-full shrink-0 transition-colors ${marketing ? 'bg-orange-500' : 'bg-gray-300'}`} role="switch" aria-checked={marketing}>
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${marketing ? 'translate-x-6' : ''}`} />
                </button>
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
              <button onClick={() => setShowPreferences(false)} className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300">Fermer</button>
              <button onClick={saveConsent} className="px-5 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 shadow">Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">Gestion des cookies</h4>
                  <p className="text-sm text-gray-500">Ce site utilise des cookies pour améliorer votre expérience. <a href="/politique-confidentialite" className="text-orange-600 hover:underline font-medium">En savoir plus</a></p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => { setAnalytics(false); setMarketing(false); saveConsent(); }} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">Refuser</button>
                <button onClick={() => setShowPreferences(true)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300">Personnaliser</button>
                <button onClick={saveConsent} className="px-5 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 shadow">Accepter</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}