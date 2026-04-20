import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, CheckCircle2 } from 'lucide-react';
import type { Tour } from '../data/tours';

interface TourCardProps {
  tour: Tour;
  onAction: () => void;
}

export const TourCard: React.FC<TourCardProps> = ({ tour, onAction }) => {
  const phone = "51970909088";
  const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(tour.message)}`;

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 relative transition-all hover:border-cyan-400/50 hover:shadow-cyan-400/10 flex flex-col"
    >
      {tour.urgency && (
        <div className="absolute top-5 right-5 z-10 bg-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg animate-pulse uppercase tracking-wider">
          🔥 {tour.urgency}
        </div>
      )}
      
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={tour.image} 
          alt={tour.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      
      <div className="p-8 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold text-slate-900 mb-2 font-poppins">
          {tour.name}
        </h3>
        
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-slate-400 line-through text-base">{tour.oldPrice}</span>
          <span className="text-orange-600 font-black text-3xl">{tour.price}</span>
        </div>

        <div className="space-y-2 mb-8 flex-grow">
          {tour.includes.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-600 text-sm">
              <CheckCircle2 size={16} className="text-green-500 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        
        <a 
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onAction}
          className="flex items-center justify-center gap-3 w-full bg-whatsapp hover:bg-whatsapp-hover text-white font-bold py-5 rounded-[1.25rem] shadow-xl shadow-green-500/30 transition-all hover:scale-[1.03] active:scale-[0.95] text-lg mt-auto"
        >
          <MessageCircle size={24} fill="currentColor" />
          Quero esta Oferta!
        </a>
      </div>
    </motion.div>
  );
};
