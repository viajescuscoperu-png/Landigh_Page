import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, CheckCircle2, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTracking } from '../hooks/useTracking';

export const Hero = () => {
  const { langText, language } = useLanguage();
  const { trackWhatsAppClick } = useTracking();
  const [timeLeft, setTimeLeft] = useState('02:45:00');
  
  // Form state
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');

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
      className="relative overflow-hidden bg-brand-dark md:rounded-3xl mb-6 md:mb-10 text-white shadow-2xl"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 p-5 md:p-12 lg:p-16 items-center">
        
        {/* Left Column: Content */}
        <div className="text-left">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-5xl lg:text-6xl font-extrabold mb-2 md:mb-4 leading-tight tracking-tight"
          >
            {langText('hero_title_1')} <span className="bg-brand-cyan text-brand-dark px-2 rounded-lg inline-block transform -rotate-2">{langText('hero_title_vip')}</span> <br className="hidden md:block" /> {langText('hero_title_2')}
          </motion.h1>

          <p className="text-sm md:text-xl text-slate-300 font-light mb-4 md:mb-10 max-w-lg leading-relaxed">
            {langText('hero_subtitle')}
          </p>
          
          <div className="space-y-3 mb-2 md:mb-4 hidden md:block">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="text-brand-cyan shrink-0 mt-1" size={24} />
              <p className="text-slate-200 font-medium md:text-lg">{langText('hero_check_1')}</p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="text-brand-cyan shrink-0 mt-1" size={24} />
              <p className="text-slate-200 font-medium md:text-lg">{langText('hero_check_2')}</p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="text-brand-cyan shrink-0 mt-1" size={24} />
              <p className="text-slate-200 font-medium md:text-lg">{langText('hero_check_3')}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl md:rounded-2xl shadow-xl border border-slate-100 overflow-hidden text-brand-dark"
        >
          {/* Header Card / Urgency */}
          <div className="bg-brand-dark/5 border-b border-slate-100 p-3 md:p-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
              <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Timer size={14} className="text-brand-orange" />
                {langText('hero_timer')}
              </p>
              
              {/* Desktop Boxes */}
              <div className="hidden md:flex justify-center gap-3">
                <div className="flex flex-col items-center">
                  <div className="bg-brand-dark text-white w-12 h-12 rounded-lg flex items-center justify-center text-xl font-black shadow-inner">
                    {timeLeft.split(':')[0]}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Hrs</span>
                </div>
                <div className="text-brand-dark font-black text-xl pt-2">:</div>
                <div className="flex flex-col items-center">
                  <div className="bg-brand-dark text-white w-12 h-12 rounded-lg flex items-center justify-center text-xl font-black shadow-inner">
                    {timeLeft.split(':')[1]}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Min</span>
                </div>
                <div className="text-brand-dark font-black text-xl pt-2">:</div>
                <div className="flex flex-col items-center">
                  <div className="bg-brand-dark text-white w-12 h-12 rounded-lg flex items-center justify-center text-xl font-black shadow-inner animate-pulse">
                    {timeLeft.split(':')[2]}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Seg</span>
                </div>
              </div>

              {/* Mobile Single Line */}
              <div className="md:hidden text-lg font-black text-brand-dark tracking-tighter flex items-center gap-1">
                <span className="bg-brand-dark text-white px-2 py-0.5 rounded">{timeLeft.split(':')[0]}</span>
                <span>:</span>
                <span className="bg-brand-dark text-white px-2 py-0.5 rounded">{timeLeft.split(':')[1]}</span>
                <span>:</span>
                <span className="bg-brand-dark text-white px-2 py-0.5 rounded animate-pulse text-brand-orange">{timeLeft.split(':')[2]}</span>
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
