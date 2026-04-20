import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Timer } from 'lucide-react';

export const Hero: React.FC = () => {
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
      className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-10 md:p-20 mb-16 text-center text-white shadow-2xl"
    >
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-bold mb-8 border border-orange-500/30">
          <Timer size={16} />
          Ofertas de Hoje expiram em: {timeLeft}
        </div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-7xl font-extrabold mb-8 bg-gradient-to-br from-white via-slate-200 to-slate-500 bg-clip-text text-transparent leading-[1.1] tracking-tight"
        >
          Aventura VIP <br className="hidden md:block" /> em Cusco
        </motion.h1>

        <p className="text-xl md:text-2xl text-slate-400 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
          Viva a magia dos Andes com atendimento oficial <span className="text-cyan-400 font-semibold">100% em Português</span>. Especialistas em brasileiros.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm mb-12">
          <Badge text="✅ Agência Oficial MINCETUR" />
          <Badge text="🏷️ Membro APTAE" />
          <Badge text="⭐ TripAdvisor Premium" />
        </div>

        <div className="inline-flex items-center gap-2 text-slate-500 text-sm bg-black/20 px-6 py-3 rounded-full backdrop-blur-md">
          <Users size={16} className="text-cyan-500" />
          <span>Mais de <span className="text-white font-bold">500 brasileiros</span> viajaram conosco este mês</span>
        </div>
      </div>
      
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />
    </motion.section>
  );
};

const Badge: React.FC<{ text: string }> = ({ text }) => (
  <span className="bg-white/5 px-5 py-2 rounded-full backdrop-blur-md border border-white/10 font-semibold text-slate-300">
    {text}
  </span>
);
