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

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-white/10 rounded-full p-1 border border-white/20">
            <button 
              onClick={() => setLanguage('es')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${language === 'es' ? 'bg-white text-brand-dark' : 'text-white hover:bg-white/20'}`}
            >
              🇪🇸 <span className="hidden sm:inline">Español</span>
            </button>
            <button 
              onClick={() => setLanguage('en')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${language === 'en' ? 'bg-white text-brand-dark' : 'text-white hover:bg-white/20'}`}
            >
              🇺🇸 <span className="hidden sm:inline">English</span>
            </button>
            <button 
              onClick={() => setLanguage('pt')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${language === 'pt' ? 'bg-white text-brand-dark' : 'text-white hover:bg-white/20'}`}
            >
              🇧🇷 <span className="hidden sm:inline">Português</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
