import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTracking } from '../hooks/useTracking';
import { getWhatsAppUrl } from '../lib/whatsappTracking';

// Gorro de Papá Noel decorativo sobre el logo — promoción de Navidad (diciembre)
const SantaHat = () => (
  <svg
    viewBox="0 0 64 48"
    className="absolute -top-1.5 -left-2 w-7 h-5 md:w-9 md:h-7 -rotate-[18deg] drop-shadow-md pointer-events-none"
    aria-hidden="true"
  >
    <path d="M8 40 Q4 20 28 6 Q46 -4 56 14 Q60 22 50 24 Q30 16 14 34 Q10 38 8 40 Z" fill="#C8102E" />
    <rect x="2" y="35" width="54" height="10" rx="5" fill="#ffffff" />
    <circle cx="58" cy="12" r="7" fill="#ffffff" />
  </svg>
);

// Fila de esferas navideñas colgando - promoción de fin de año (diciembre)
const XMAS_ORNAMENT_COLORS = ['#C8102E', '#D4AF37', '#146B3A', '#D4AF37', '#C8102E', '#146B3A', '#D4AF37', '#C8102E'];
const XmasOrnaments = () => (
  <div className="bg-[#0b132b] flex justify-around px-4 md:px-16 pb-2.5" aria-hidden="true">
    {XMAS_ORNAMENT_COLORS.map((color, i) => (
      <span key={i} className="xmas-ornament" style={{ animationDelay: `${i * 0.22}s` }}>
        <span className="xmas-ornament-string" />
        <span className="xmas-ornament-ball" style={{ background: color }} />
      </span>
    ))}
  </div>
);

export const Header = () => {
  const { langText, language, setLanguage } = useLanguage();
  const { trackContactClick, trackSocialClick } = useTracking();
  const waLink = getWhatsAppUrl('');

  return (
    <header className="relative z-50">
      {/* Anuncio navideño - promoción de fin de año (diciembre) */}
      <div className="xmas-announcement text-white text-center py-2 px-4">
        <p className="text-[11px] md:text-sm font-black uppercase tracking-wide flex items-center justify-center gap-2 flex-wrap">
          <span>🎄</span>
          <span>{langText('xmas_announcement')}</span>
          <span>🎁</span>
        </p>
      </div>

      {/* Luces navideñas titilantes - promoción de fin de año (diciembre) */}
      <div className="h-[7px] w-full xmas-lights" aria-hidden="true" />

      {/* Top Bar - Cyan contact strip */}
      <div className="bg-brand-cyan text-white text-xs md:text-sm shadow-md relative z-10">
        <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-between font-medium">
          <div className="flex items-center gap-4 md:gap-8">
            <a 
              href={waLink}
              onClick={() => trackContactClick('phone')}
              className="flex items-center gap-1.5 hover:underline"
            >
              <Phone size={14} />
              <span>Whatsapp: {langText('whatsapp_number')}</span>
            </a>
            <a 
              href="mailto:viajescuscoperu@gmail.com" 
              onClick={() => trackContactClick('email')}
              className="flex items-center gap-1.5 hover:underline"
            >
              <Mail size={14} />
              <span className="hidden sm:inline">{langText('email')}</span>
            </a>
          </div>

          <div className="hidden lg:block">
            <span className="font-black tracking-widest uppercase">Viajes Cusco Perú</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
             <a 
               href="https://viajescuscoperu.com/" 
               target="_blank" 
               rel="noopener noreferrer"
               onClick={() => trackSocialClick('official_website_link')}
               className="flex items-center gap-1.5 hover:text-white/80 transition-colors border-r border-white/20 pr-6 mr-6"
             >
               <span>{langText('visit_official_site')}</span>
             </a>
             <span className="flex items-center gap-1.5">
               <MapPin size={14} />
               <span>{langText('location')}</span>
             </span>
          </div>
        </div>
      </div>

      {/* Main Nav - Dark bar with HUGE logo and Language Switcher */}
      <div className="bg-[#0b132b] shadow-xl overflow-hidden">
        <div className="w-full px-4 md:px-8 lg:px-12 py-1 flex items-center justify-between h-14 md:h-20">
          <a
            href="https://viajescuscoperu.com/"
            onClick={() => trackSocialClick('main_website_logo')}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center transition-transform hover:scale-105 h-full"
          >
            <SantaHat />
            <img
              src="/logo.png"
              alt="Viajes Cusco Perú"
              className="h-full w-auto object-contain transform scale-[1.5] md:scale-[1.8] origin-left"
            />
          </a>

          {/* Language Switcher (Pill Style) */}
          <div className="flex items-center p-1 bg-white/10 rounded-full">
            <button 
              onClick={() => setLanguage('es')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${language === 'es' ? 'bg-white text-brand-dark font-bold shadow-sm' : 'text-white/70 hover:text-white font-medium'}`}
            >
              <span className="text-base leading-none">🇪🇸</span>
              <span className="hidden sm:inline">Español</span>
            </button>
            <button 
              onClick={() => setLanguage('en')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${language === 'en' ? 'bg-white text-brand-dark font-bold shadow-sm' : 'text-white/70 hover:text-white font-medium'}`}
            >
              <span className="text-base leading-none">🇺🇸</span>
              <span className="hidden sm:inline">English</span>
            </button>
            <button 
              onClick={() => setLanguage('pt')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${language === 'pt' ? 'bg-white text-brand-dark font-bold shadow-sm' : 'text-white/70 hover:text-white font-medium'}`}
            >
              <span className="text-base leading-none">🇧🇷</span>
              <span className="hidden sm:inline">Português</span>
            </button>
          </div>
        </div>
        {/* Guirnalda decorativa - promoción de fin de año (diciembre) */}
        <div className="h-[5px] w-full xmas-garland" aria-hidden="true" />
        <XmasOrnaments />
      </div>
    </header>
  );
};
