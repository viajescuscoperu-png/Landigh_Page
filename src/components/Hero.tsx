import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-slate-900 rounded-3xl p-8 mb-10 text-center text-white shadow-2xl shadow-slate-900/20"
    >
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-50 to-slate-400 bg-clip-text text-transparent leading-tight">
          Aventura VIP em Cusco
        </h1>
        <p className="text-lg md:text-xl text-slate-400 font-light mb-8 max-w-2xl mx-auto">
          Viva a magia dos Andes com atendimento oficial 100% em Português
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <Badge text="✅ Agência Oficial MINCETUR" />
          <Badge text="🏷️ Membro APTAE" />
          <Badge text="⭐ TripAdvisor Premium" />
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />
    </motion.section>
  );
};

const Badge: React.FC<{ text: string }> = ({ text }) => (
  <span className="bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/5 font-semibold text-slate-200">
    {text}
  </span>
);
