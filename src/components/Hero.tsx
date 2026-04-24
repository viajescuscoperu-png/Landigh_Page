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
      className="relative overflow-hidden bg-brand-dark rounded-3xl mb-14 text-white shadow-2xl"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-8 md:p-12 lg:p-16 items-center">
        
        {/* Left Column: Content */}
        <div className="text-left">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight"
          >
            {langText('hero_title_1')} <span className="bg-brand-cyan text-brand-dark px-2 rounded-lg inline-block transform -rotate-2">{langText('hero_title_vip')}</span> <br /> {langText('hero_title_2')}
          </motion.h1>

          <p className="text-lg md:text-xl text-slate-300 font-light mb-10 max-w-lg leading-relaxed">
            {langText('hero_subtitle')}
          </p>
          
          <div className="space-y-4 mb-4">
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
          className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden text-brand-dark"
        >
          {/* Header Card / Urgency */}
          <div className="bg-brand-dark/5 border-b border-slate-100 p-6">
            <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
              <Timer size={14} className="text-brand-orange" />
              {langText('hero_timer')}
            </p>
            <div className="flex justify-center gap-3">
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
          </div>

          <div className="p-6 md:p-8">
            <h3 className="text-2xl font-bold text-center mb-6">{langText('hero_form_title')}</h3>
            
            <form onSubmit={handleConsult} className="space-y-4">
              
              {/* Name field */}
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1.5">{langText('hero_form_name')}</label>
                <input 
                  type="text"
                  required
                  placeholder="Ej: Juan Pérez"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 font-medium outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Destination */}
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1.5">{langText('hero_form_dest')}</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 font-medium outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition-all appearance-none"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                >
                  <option value="">-- Seleccionar --</option>
                  <option value="Machu Picchu">Machu Picchu</option>
                  <option value="Montaña de Colores">Montaña de Colores</option>
                  <option value="Laguna Humantay">Laguna Humantay</option>
                  <option value="Paquete Completo">Paquete Completo (Varios Días)</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1.5">{langText('hero_form_date')}</label>
                <input 
                  type="date"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 font-medium outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition-all"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              {/* Pax Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1.5">{langText('hero_form_adults')}</label>
                  <input 
                    type="number"
                    min="1"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 font-medium outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition-all"
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1.5">{langText('hero_form_kids')}</label>
                  <input 
                    type="number"
                    min="0"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 font-medium outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition-all"
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsapp-hover text-white font-bold py-4 rounded-xl shadow-lg shadow-green-500/30 transition-all hover:-translate-y-1 mt-4 text-lg"
              >
                <MessageCircle size={24} />
                {langText('hero_form_btn')}
              </button>
            </form>
            
            <p className="text-center text-xs text-slate-400 mt-4 font-medium">
              Respuestas en menos de 5 minutos ⚡
            </p>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};
