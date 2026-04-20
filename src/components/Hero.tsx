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
  const [destination, setDestination] = useState('');
  const [pax, setPax] = useState('');

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
    trackWhatsAppClick('Hero Form');
    
    let msg = `Hola, quiero consultar disponibilidad.`;
    if (destination) msg += ` Destino: ${destination}.`;
    if (pax) msg += ` Pasajeros: ${pax}.`;
    
    // Convert logic depending on language can be added later, for now we keep it standard
    if(language === 'pt') {
      msg = `Olá, quero verificar a disponibilidade.`;
      if (destination) msg += ` Destino: ${destination}.`;
      if (pax) msg += ` Passageiros: ${pax}.`;
    } else if (language === 'en') {
      msg = `Hello, I want to check availability.`;
      if (destination) msg += ` Destination: ${destination}.`;
      if (pax) msg += ` Passengers: ${pax}.`;
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
          <div className="bg-brand-cyan/10 border-b border-brand-cyan/20 p-4 flex items-center justify-center gap-2 text-brand-dark font-bold text-sm">
            <Timer className="text-brand-orange animate-pulse" size={18} />
            {langText('hero_timer')} <span className="text-brand-orange font-black text-lg ml-1">{timeLeft}</span>
          </div>

          <div className="p-6 md:p-8">
            <h3 className="text-2xl font-bold text-center mb-6">{langText('hero_form_title')}</h3>
            
            <form onSubmit={handleConsult} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">{langText('hero_form_dest')}</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition-all appearance-none"
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

              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">{langText('hero_form_pax')}</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition-all appearance-none"
                  value={pax}
                  onChange={(e) => setPax(e.target.value)}
                >
                  <option value="">-- Seleccionar --</option>
                  <option value="1">1 persona</option>
                  <option value="2">2 personas</option>
                  <option value="3-4">3 a 4 personas</option>
                  <option value="5+">5 o más (Grupo)</option>
                </select>
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
