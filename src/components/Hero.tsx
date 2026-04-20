import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Timer } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Hero = () => {
  const { langText } = useLanguage();
  const [timeLeft, setTimeLeft] = useState('02:45:00');

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

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-brand-dark rounded-3xl p-8 md:p-16 mb-14 text-center text-white shadow-2xl"
    >
      <div className="relative z-10">
        {/* Countdown badge */}
        <div className="inline-flex items-center gap-2 bg-brand-orange/20 text-brand-orange px-5 py-2.5 rounded-full text-sm font-bold mb-8 border border-brand-orange/30">
          <Timer size={16} />
          {langText('hero_timer')} {timeLeft}
        </div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight"
        >
          {langText('hero_title_1')} <span className="text-brand-cyan">{langText('hero_title_vip')}</span> <br className="hidden md:block" /> {langText('hero_title_2')}
        </motion.h1>

        <p className="text-lg md:text-xl text-slate-400 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
          {langText('hero_subtitle')}
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 text-sm mb-10">
          <Badge text={langText('hero_badge_1')} />
          <Badge text={langText('hero_badge_2')} />
          <Badge text={langText('hero_badge_3')} />
        </div>

        <div className="inline-flex items-center gap-2 text-slate-500 text-sm bg-white/5 px-6 py-3 rounded-full border border-white/10">
          <Users size={16} className="text-brand-cyan" />
          <span>{langText('hero_social_proof')}</span>
        </div>
      </div>
    </motion.section>
  );
};

const Badge = ({ text }: { text: string }) => (
  <span className="bg-white/5 px-4 py-2 rounded-full border border-white/10 font-medium text-slate-300 text-xs md:text-sm">
    {text}
  </span>
);
