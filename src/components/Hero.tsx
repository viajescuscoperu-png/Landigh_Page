import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, CheckCircle2, MessageCircle, Info, MapPin, Calendar, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTracking } from '../hooks/useTracking';
import { useSiteContent } from '../hooks/useSiteContent';
import { useTours } from '../hooks/useTours';
import { getWhatsAppUrl } from '../lib/whatsappTracking';

export const Hero = () => {
  const { langText, language } = useLanguage();
  const { trackWhatsAppClick } = useTracking();
  const { content } = useSiteContent();
  const { tours } = useTours();
  const [timeLeft, setTimeLeft] = useState('00:00:00:00');
  
  // Dynamic state
  const [dynamicContent, setDynamicContent] = useState({
    image: '/hero.png',
    titleKey: ''
  });
  const [curiosity, setCuriosity] = useState<string | null>(null);

  // Form state
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tourParam = params.get('tour')?.toLowerCase();
    
    if (tourParam === 'rainbow' || tourParam === 'montana') {
      setDynamicContent({ image: '/rainbow.jpg', titleKey: 'hero_title_rainbow' });
      setDestination('Montaña de Colores');
    } else if (tourParam === 'humantay' || tourParam === 'laguna') {
      setDynamicContent({ image: '/humantay.jpg', titleKey: 'hero_title_humantay' });
      setDestination('Laguna Humantay');
    } else if (tourParam === 'premium' || tourParam === 'machu') {
      setDynamicContent({ image: '/mp-premium.jpg', titleKey: 'hero_title_premium' });
      setDestination('Machu Picchu');
    }

    // Find curiosity
    const foundTour = tours.find(t => 
      t.id === tourParam || 
      (tourParam === 'montana' && t.id === 'rainbow-mountain') || 
      (tourParam === 'laguna' && t.id === 'humantay-vip') ||
      (tourParam === 'rainbow' && t.id === 'rainbow-mountain')
    );
    
    if (foundTour?.curiosity) {
      setCuriosity(foundTour.curiosity[language]);
    } else {
      setCuriosity(null);
    }
  }, [language, tours]);

  useEffect(() => {
    const targetDate = new Date(content.countdownTarget).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      
      if (diff <= 0) {
        setTimeLeft('00:00:00:00');
        clearInterval(timer);
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft(
        `${d.toString().padStart(2, '0')}:${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      );
    }, 1000);
    return () => clearInterval(timer);
  }, [content.countdownTarget]);

  const handleConsult = (e: React.FormEvent) => {
    e.preventDefault();
    trackWhatsAppClick('Hero Form Submission', 'hero_main_form');
    
    let msg = '';
    
    if(language === 'pt') {
      msg = `Olá! Quero verificar a disponibilidade.`;
      if (destination) msg += `\nDestino: ${destination}`;
      if (date) msg += `\nData: ${date}`;
      msg += `\nSomos ${adults} adultos e ${children} crianças.`;
    } else if (language === 'en') {
      msg = `Hello! I want to check availability.`;
      if (destination) msg += `\nDestination: ${destination}`;
      if (date) msg += `\nDate: ${date}`;
      msg += `\nWe are ${adults} adults and ${children} children.`;
    } else {
      msg = `¡Hola! Quiero consultar disponibilidad.`;
      if (destination) msg += `\nDestino: ${destination}`;
      if (date) msg += `\nFecha de llegada: ${date}`;
      msg += `\nSomos ${adults} adultos y ${children} niños.`;
    }

    const waLink = getWhatsAppUrl(msg);
    window.open(waLink, '_blank');
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-brand-dark text-white shadow-2xl min-h-[85vh] lg:min-h-[90vh] flex items-center w-full"
    >
      {/* Dynamic Background Image with Overlay - BRIGHTER */}
      <div className="absolute inset-0 z-0">
        <img 
          src={dynamicContent.image} 
          alt="Cusco Background" 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/60 to-transparent" />
      </div>

      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-1">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 p-5 md:p-12 lg:p-20 lg:pt-32 items-center w-full">
        
        {/* Left Column: Content */}
        <div className="text-left relative">
          {/* Sello de Confianza o Dato Curioso Dinámico (Optimizado para móvil y PC) */}
          <div className="relative md:absolute md:-top-32 md:-right-12 z-30 mb-6 md:mb-0 flex justify-center md:justify-end pointer-events-none">
            {curiosity ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="bg-brand-orange text-white p-4 md:p-6 rounded-2xl shadow-[0_15px_40px_rgba(255,126,0,0.4)] flex flex-col max-w-[90%] md:max-w-[350px] border-2 border-white/40 pointer-events-auto"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Info size={18} className="text-white" />
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">¿SABÍAS QUE?</span>
                </div>
                <p className="text-xs md:text-base font-bold leading-tight italic">
                  "{curiosity}"
                </p>
              </motion.div>
            ) : (
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-gradient-to-b from-brand-orange to-orange-700 text-white p-3 md:p-5 rounded-b-2xl shadow-[0_10px_30px_rgba(255,126,0,0.5)] flex flex-col items-center border-x-2 border-b-2 border-white/30 pointer-events-auto"
              >
                 <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-1">{langText('hero_badge_line1')}</span>
                 <span className="text-2xl md:text-4xl font-black leading-none drop-shadow-md">{langText('hero_badge_line2')}</span>
                 <span className="text-[8px] md:text-[11px] font-bold opacity-90 mt-1">{langText('hero_badge_line3')}</span>
              </motion.div>
            )}
          </div>

          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-black mb-6 md:mb-8 leading-[0.9] tracking-tighter hero-text-shadow"
          >
            {dynamicContent.titleKey ? (
              <span className="text-gradient-cyan block text-glow">{langText(dynamicContent.titleKey)}</span>
            ) : (
              <span className="text-gradient-cyan block text-glow">
                {langText('hero_title_1')} {langText('hero_title_vip')}
              </span>
            )}
            <span className="text-white block mt-2">{langText('hero_title_2')}</span>
          </motion.h1>

          <p className="text-lg md:text-3xl text-white font-bold mb-8 md:mb-14 max-w-2xl leading-snug hero-text-shadow">
            {content.heroSubtitle[language]}
          </p>
          
          <div className="space-y-4 mb-2 md:mb-4 hidden md:block">
            <motion.div 
              whileHover={{ x: 10 }}
              className="flex items-center gap-5 bg-white/10 backdrop-blur-xl p-5 rounded-3xl border border-white/20 w-fit shadow-2xl"
            >
              <div className="bg-brand-cyan p-2 rounded-full shadow-[0_0_15px_rgba(0,210,255,0.5)]">
                <CheckCircle2 className="text-brand-dark" size={24} />
              </div>
              <p className="text-white font-bold md:text-xl">{langText('hero_check_1')}</p>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Interactive Form Card (NEON EDITION) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-brand-orange overflow-hidden text-brand-dark relative"
        >
          {/* Subtle Glow behind the form */}
          <div className="absolute inset-0 bg-brand-orange/5 pointer-events-none" />
          
          {/* Header Card / Urgency */}
          <div className="bg-brand-orange text-white p-4 md:p-6 text-center">
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                <Timer size={16} className="animate-spin-slow" />
                {langText('hero_timer')}
              </p>
              
              <div className="flex justify-center gap-2 mt-1">
                <div className="flex flex-col items-center">
                  <div className="bg-white text-brand-orange px-2 py-2 rounded-xl text-xl md:text-2xl font-black shadow-lg">
                    {timeLeft.split(':')[0]}
                  </div>
                  <span className="text-[8px] uppercase mt-1 font-bold">Dias</span>
                </div>
                <div className="text-white font-black text-xl pt-2">:</div>
                <div className="flex flex-col items-center">
                  <div className="bg-white text-brand-orange px-2 py-2 rounded-xl text-xl md:text-2xl font-black shadow-lg">
                    {timeLeft.split(':')[1]}
                  </div>
                  <span className="text-[8px] uppercase mt-1 font-bold">Horas</span>
                </div>
                <div className="text-white font-black text-xl pt-2">:</div>
                <div className="flex flex-col items-center">
                  <div className="bg-white text-brand-orange px-2 py-2 rounded-xl text-xl md:text-2xl font-black shadow-lg">
                    {timeLeft.split(':')[2]}
                  </div>
                  <span className="text-[8px] uppercase mt-1 font-bold">Min</span>
                </div>
                <div className="text-white font-black text-xl pt-2">:</div>
                <div className="flex flex-col items-center">
                  <div className="bg-white text-brand-orange px-2 py-2 rounded-xl text-xl md:text-2xl font-black shadow-lg animate-pulse">
                    {timeLeft.split(':')[3]}
                  </div>
                  <span className="text-[8px] uppercase mt-1 font-bold">Seg</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-8">
            <h3 className="text-lg md:text-2xl font-bold text-center mb-3 md:mb-6">{langText('hero_form_title')}</h3>
            
            <form onSubmit={handleConsult} className="space-y-3 md:space-y-4">
              
              {/* Row 2: Destination and Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-700 outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all appearance-none"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  >
                    <option value="">{langText('hero_form_dest')}</option>
                    <option value="Machu Picchu">Machu Picchu</option>
                    <option value="Montaña de Colores">Montaña de Colores</option>
                    <option value="Laguna Humantay">Laguna Humantay</option>
                  </select>
                </div>
                <div className="relative">
                  <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="date"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-700 outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Row 3: Pax */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">{langText('hero_form_adults')}</label>
                  <div className="relative">
                    <Users size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="number"
                      min="1"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-700 outline-none focus:border-brand-orange transition-all"
                      value={adults}
                      onChange={(e) => setAdults(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">{langText('hero_form_kids')}</label>
                  <div className="relative">
                    <Users size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 opacity-50" />
                    <input 
                      type="number"
                      min="0"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-700 outline-none focus:border-brand-orange transition-all"
                      value={children}
                      onChange={(e) => setChildren(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-whatsapp hover:bg-whatsapp-hover text-white font-black py-4 rounded-xl shadow-[0_10px_20px_rgba(34,197,94,0.3)] transition-all active:scale-95 text-lg mt-2"
              >
                <MessageCircle size={22} fill="white" />
                {langText('hero_form_btn')}
              </button>
            </form>
            
            <p className="text-center text-[11px] text-slate-400 mt-4 font-bold">
              Respuestas en menos de 5 minutos ⚡
            </p>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};
