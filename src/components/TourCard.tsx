import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
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
      className="bg-white rounded-3xl overflow-hidden shadow-lg border border-white relative transition-all hover:border-cyan-400 hover:shadow-cyan-400/10"
    >
      {tour.urgency && (
        <div className="absolute top-4 right-4 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
          🔥 {tour.urgency}
        </div>
      )}
      
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={tour.image} 
          alt={tour.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2 font-poppins">
          {tour.name}
        </h3>
        
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-slate-400 line-through text-sm">{tour.oldPrice}</span>
          <span className="text-orange-600 font-extrabold text-2xl">{tour.price}</span>
        </div>
        
        <a 
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onAction}
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-green-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <MessageCircle size={20} fill="currentColor" />
          Reservar Tour Agora
        </a>
      </div>
    </motion.div>
  );
};
