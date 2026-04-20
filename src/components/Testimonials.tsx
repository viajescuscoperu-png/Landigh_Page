import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/tours';
import { motion } from 'framer-motion';

export const Testimonials = () => {
  return (
    <section className="py-16 bg-brand-dark px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">O que dizem os viajantes</h2>
          <p className="text-slate-400">Mais de 500 brasileiros já viveram essa aventura</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl relative"
            >
              <Quote className="absolute top-4 right-4 text-white/5" size={40} />
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-brand-orange text-brand-orange" />
                ))}
              </div>
              <p className="text-slate-300 text-sm mb-4 italic leading-relaxed">"{t.content}"</p>
              <div>
                <p className="text-white font-bold text-sm">{t.name}</p>
                <p className="text-slate-500 text-xs">{t.city}, Brasil</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
