import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, CheckCircle2, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTracking } from '../hooks/useTracking';

export const Hero = () => {
  const { langText, language } = useLanguage();
  const { trackWhatsAppClick } = useTracking();
  const [timeLeft, setTimeLeft] = useState('02:45:00');
  
  // Dynamic state
  const [dynamicContent, setDynamicContent] = useState({
    image: '/hero.png',
    titleKey: ''
  });

  // Form state
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tour = params.get('tour')?.toLowerCase();
    
    if (tour === 'rainbow' || tour === 'montana') {
      setDynamicContent({ image: '/rainbow.png', titleKey: 'hero_title_rainbow' });
      setDestination('Montaña de Colores');
    } else if (tour === 'humantay' || tour === 'laguna') {
      setDynamicContent({ image: '/humantay.png', titleKey: 'hero_title_humantay' });
      setDestination('Laguna Humantay');
    } else if (tour === 'premium') {
      setDynamicContent({ image: '/mp-premium.jpg', titleKey: 'hero_title_premium' });
      setDestination('Machu Picchu');
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const reset = new Date();
      reset.setHours(23, 59, 59, 999);
      const diff = reset.getTime() - now.getTime();
      
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft(
        `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleConsult = (e: React.FormEvent) => {
    e.preventDefault();
    trackWhatsAppClick('Hero Form Expanded');
    
    let msg = '';
    
    if(language === 'pt') {
      msg = `Olá, meu nome é ${name}. Quero verificar a disponibilidade.`;
      if (destination) msg += `\nDestino: ${destination}`;
      if (date) msg += `\nData: ${date}`;
      msg += `\nSomos ${adults} adultos e ${children} crianças.`;
    } else if (language === 'en') {
      msg = `Hello, my name is ${name}. I want to check availability.`;
      if (destination) msg += `\nDestination: ${destination}`;
      if (date) msg += `\nDate: ${date}`;
      msg += `\nWe are ${adults} adults and ${children} children.`;
    } else {
      msg = `Hola, mi nombre es ${name}. Quiero consultar disponibilidad.`;
      if (destination) msg += `\nDestino: ${destination}`;
      if (date) msg += `\nFecha de llegada: ${date}`;
      msg += `\nSomos ${adults} adultos y ${children} niños.`;
    }

    const waLink = `https://wa.me/51970909088?text=${encodeURIComponent(msg)}`;
    window.open(waLink, '_blank');
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-brand-dark md:rounded-3xl mb-6 md:mb-10 text-white shadow-2xl min-h-[500px] flex items-center"
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

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 p-5 md:p-12 lg:p-16 items-center w-full">
        
        {/* Left Column: Content */}
        <div className="text-left relative">
          {/* Sello de Confianza (Estilo SUNEDU Premium) */}
          <div className="absolute -top-16 right-0 md:-top-24 md:-right-8 z-30">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="bg-gradient-to-b from-brand-orange to-orange-700 text-white p-3 md:p-5 rounded-b-2xl shadow-[0_10px_30px_rgba(255,126,0,0.5)] flex flex-col items-center border-x-2 border-b-2 border-white/30"
            >
               <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-1">Ranking</span>
               <span className="text-2xl md:text-5xl font-black leading-none drop-shadow-md">N°1</span>
               <span className="text-[8px] md:text-[11px] font-bold opacity-90 mt-1">CUSCO 2025</span>
            </motion.div>
          </div>

          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl lg:text-[10rem] font-black mb-6 md:mb-8 leading-[0.8] tracking-tighter hero-text-shadow"
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

          <p className="text-lg md:text-4xl text-white font-bold mb-8 md:mb-14 max-w-2xl leading-none hero-text-shadow">
            {langText('hero_subtitle')}
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
              
              <div className="flex justify-center gap-3 mt-1">
                <div className="bg-white text-brand-orange px-3 py-2 rounded-xl text-2xl font-black shadow-lg">
                  {timeLeft.split(':')[0]}
                </div>
                <div className="text-white font-black text-2xl pt-1">:</div>
                <div className="bg-white text-brand-orange px-3 py-2 rounded-xl text-2xl font-black shadow-lg">
                  {timeLeft.split(':')[1]}
                </div>
                <div className="text-white font-black text-2xl pt-1">:</div>
                <div className="bg-white text-brand-orange px-3 py-2 rounded-xl text-2xl font-black shadow-lg animate-pulse">
                  {timeLeft.split(':')[2]}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-8">
            <h3 className="text-lg md:text-2xl font-bold text-center mb-3 md:mb-6">{langText('hero_form_title')}</h3>
            
            <form onSubmit={handleConsult} className="space-y-2 md:space-y-3">
              
              {/* Name field */}
              <input 
                type="text"
                required
                placeholder={langText('hero_form_name')}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-700 outline-none focus:border-brand-cyan transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {/* Row 2: Destination and Date */}
              <div className="grid grid-cols-2 gap-2">
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-sm text-slate-700 outline-none focus:border-brand-cyan transition-all appearance-none"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                >
                  <option value="">{langText('hero_form_dest').split(':')[0]}</option>
                  <option value="Machu Picchu">M. Picchu</option>
                  <option value="Montaña de Colores">Montaña</option>
                  <option value="Laguna Humantay">Humantay</option>
                </select>
                <input 
                  type="date"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-sm text-slate-700 outline-none focus:border-brand-cyan transition-all"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              {/* Row 3: Pax */}
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">Ads:</span>
                  <input 
                    type="number"
                    min="1"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-2 py-2 text-sm text-slate-700 outline-none"
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">Chd:</span>
                  <input 
                    type="number"
                    min="0"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-2 py-2 text-sm text-slate-700 outline-none"
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsapp-hover text-white font-bold py-3 rounded-lg shadow-lg transition-all active:scale-95 text-base mt-2"
              >
                <MessageCircle size={20} />
                {langText('hero_form_btn')}
              </button>
            </form>
            
            <p className="text-center text-[10px] text-slate-400 mt-3 font-medium">
              Respuestas en menos de 5 minutos ⚡
            </p>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};
