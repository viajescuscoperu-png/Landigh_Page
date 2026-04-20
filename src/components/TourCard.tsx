import { motion } from 'framer-motion';
import { MessageCircle, CheckCircle2 } from 'lucide-react';
import type { Tour } from '../data/tours';

interface TourCardProps {
  tour: Tour;
  onAction: () => void;
}

export const TourCard = ({ tour, onAction }: TourCardProps) => {
  const phone = "51970909088";
  const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(tour.message)}`;

  return (
    <motion.div 
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 relative transition-all hover:border-brand-cyan/40 hover:shadow-brand-cyan/10 flex flex-col"
    >
      {tour.urgency && (
        <div className="absolute top-4 right-4 z-10 bg-brand-orange text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg animate-pulse uppercase tracking-wider">
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
      
      <div className="p-6 md:p-8 flex-grow flex flex-col">
        <h3 className="text-xl md:text-2xl font-bold text-brand-dark mb-2">
          {tour.name}
        </h3>
        
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-slate-400 line-through text-sm">{tour.oldPrice}</span>
          <span className="text-brand-orange font-black text-2xl md:text-3xl">{tour.price}</span>
        </div>

        <div className="space-y-2 mb-6 flex-grow">
          {tour.includes.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-600 text-sm">
              <CheckCircle2 size={15} className="text-brand-cyan shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        
        <a 
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onAction}
          className="flex items-center justify-center gap-3 w-full bg-whatsapp hover:bg-whatsapp-hover text-white font-bold py-4 rounded-full shadow-lg shadow-green-500/25 transition-all hover:scale-[1.03] active:scale-[0.95] text-base mt-auto"
        >
          <MessageCircle size={22} fill="currentColor" />
          Quero esta Oferta!
        </a>
      </div>
    </motion.div>
  );
};
