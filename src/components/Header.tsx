import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Header = () => {
  const { langText, language, setLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar - Cyan contact strip */}
      <div className="bg-brand-cyan text-white text-xs md:text-sm shadow-md relative z-10">
        <div className="container mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between font-medium">
          <div className="flex items-center gap-4 md:gap-8">
            <a href="https://wa.me/51970909088" className="flex items-center gap-1.5 hover:underline">
              <Phone size={14} />
              <span>Whatsapp: {langText('whatsapp_number')}</span>
            </a>
            <a href="mailto:viajescuscoperu@gmail.com" className="flex items-center gap-1.5 hover:underline">
              <Mail size={14} />
              <span className="hidden sm:inline">{langText('email')}</span>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-6">
             <span className="flex items-center gap-1.5">
               <MapPin size={14} />
               <span>{langText('location')}</span>
             </span>
          </div>
        </div>
      </div>

      {/* Main Nav - Dark bar with HUGE logo and Language Switcher */}
      <div className="bg-[#0b132b] shadow-xl">
        <div className="w-full px-4 md:px-8 lg:px-12 py-1.5 flex items-center justify-between">
          <a 
            href="https://viajescuscoperu.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center transition-transform hover:scale-105"
          >
            <img 
              src="/logo.png" 
              alt="Viajes Cusco Perú" 
              className="w-48 md:w-72 lg:w-80 h-auto object-contain"
            />
          </a>

          {/* Language Switcher (Subtle) */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setLanguage('es')}
              className={`flex items-center gap-1.5 text-xs transition-opacity ${language === 'es' ? 'text-white font-bold opacity-100' : 'text-white/50 hover:opacity-100'}`}
            >
              <span>ES</span>
            </button>
            <span className="text-white/20 text-xs">|</span>
            <button 
              onClick={() => setLanguage('en')}
              className={`flex items-center gap-1.5 text-xs transition-opacity ${language === 'en' ? 'text-white font-bold opacity-100' : 'text-white/50 hover:opacity-100'}`}
            >
              <span>EN</span>
            </button>
            <span className="text-white/20 text-xs">|</span>
            <button 
              onClick={() => setLanguage('pt')}
              className={`flex items-center gap-1.5 text-xs transition-opacity ${language === 'pt' ? 'text-white font-bold opacity-100' : 'text-white/50 hover:opacity-100'}`}
            >
              <span>PT</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
