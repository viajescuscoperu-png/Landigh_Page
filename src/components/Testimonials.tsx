import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/tours';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export const Testimonials = () => {
  const { langText, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 bg-brand-dark px-6 md:px-12 overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{langText('testi_title')}</h2>
          <div className="h-1 w-20 bg-brand-cyan mx-auto rounded-full mb-6" />
          <p className="text-slate-400 max-w-lg mx-auto">{langText('testi_subtitle')}</p>
        </div>
        
        <div className="relative px-4">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl relative"
            >
              <Quote className="absolute top-6 right-8 text-brand-cyan/20" size={60} />
              
              <div className="flex gap-1 mb-8">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-brand-orange text-brand-orange" />
                ))}
              </div>
              
              <p className="text-white text-lg md:text-2xl mb-8 italic font-light leading-relaxed">
                "{testimonials[currentIndex].content[language]}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-brand-cyan/20 rounded-full flex items-center justify-center text-brand-cyan font-bold text-xl">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-bold text-lg">{testimonials[currentIndex].name}</p>
                  <p className="text-brand-cyan text-sm font-medium uppercase tracking-widest">
                    {testimonials[currentIndex].city}, {testimonials[currentIndex].country[language]}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-12">
            <button 
              onClick={prev}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-brand-cyan hover:text-brand-dark transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <div 
                  key={i}
                  className={`h-1.5 transition-all duration-300 rounded-full ${i === currentIndex ? 'w-8 bg-brand-cyan' : 'w-2 bg-white/20'}`}
                />
              ))}
            </div>
            <button 
              onClick={next}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-brand-cyan hover:text-brand-dark transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
