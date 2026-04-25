import { motion } from 'framer-motion';
import { MessageCircle, CheckCircle2, Crown } from 'lucide-react';
import type { Tour } from '../data/tours';
import { useLanguage } from '../context/LanguageContext';

interface TourCardProps {
  tour: Tour;
  onAction: () => void;
}

export const TourCard = ({ tour, onAction }: TourCardProps) => {
  const { langText, language } = useLanguage();
  const phone = "51970909088";
  
  // Use localized text
  const message = tour.message[language];
  const urgency = tour.urgency ? tour.urgency[language] : null;
  const includes = tour.includes.map(inc => inc[language]);

  const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  const isGold = tour.isGold;

  return (
    <motion.div 
      whileHover={{ y: -6 }}
      className={`rounded-2xl overflow-hidden shadow-lg border relative transition-all flex flex-col ${
        isGold 
          ? 'bg-gradient-to-b from-white to-amber-50/30 border-amber-300 shadow-amber-200/40 hover:border-amber-400 hover:shadow-amber-300/50' 
          : 'bg-white border-slate-100 hover:border-brand-cyan/40 hover:shadow-brand-cyan/10'
      }`}
    >
      {urgency && (
        <div className={`absolute top-4 right-4 z-10 text-white text-[10px] md:text-xs font-bold px-4 py-1.5 rounded-full shadow-lg animate-pulse uppercase tracking-widest ${
          isGold ? 'bg-gradient-to-r from-amber-500 to-yellow-600' : 'bg-brand-orange'
        }`}>
          {isGold ? '✨ ' : '🔥 '}{urgency}
        </div>
      )}

      {isGold && (
        <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm text-amber-600 text-[10px] font-black px-3 py-1 rounded-full shadow-sm border border-amber-200 flex items-center gap-1">
          <Crown size={12} className="fill-amber-600" />
          PREMIUM
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
        <h3 className={`text-xl md:text-2xl font-bold mb-2 ${isGold ? 'text-amber-900' : 'text-brand-dark'}`}>
          {tour.name}
        </h3>
        
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-slate-400 line-through text-sm">{tour.oldPrice}</span>
          <span className={`font-black text-2xl md:text-3xl ${isGold ? 'text-amber-600' : 'text-brand-orange'}`}>{tour.price}</span>
        </div>

        <div className="space-y-2 mb-6 flex-grow">
          {includes.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-600 text-sm">
              <CheckCircle2 size={15} className={`${isGold ? 'text-amber-500' : 'text-brand-cyan'} shrink-0`} />
              <span className={isGold ? 'font-medium' : ''}>{item}</span>
            </div>
          ))}
        </div>
        
        <a 
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onAction}
          className={`flex items-center justify-center gap-3 w-full text-white font-bold py-4 rounded-full shadow-lg transition-all hover:scale-[1.03] active:scale-[0.95] text-base mt-auto ${
            isGold 
              ? 'bg-gradient-to-r from-whatsapp to-green-500 shadow-amber-500/10' 
              : 'bg-whatsapp hover:bg-whatsapp-hover shadow-green-500/25'
          }`}
        >
          <MessageCircle size={22} fill="currentColor" />
          {langText('tour_button')}
        </a>
      </div>
    </motion.div>
  );
};
