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
    <section className="py-4 md:py-20 bg-brand-dark px-6 md:px-12 overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="hidden md:block text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{langText('testi_title')}</h2>
          <div className="h-1 w-20 bg-brand-cyan mx-auto rounded-full mb-6" />
          <p className="text-slate-400 max-w-lg mx-auto">{langText('testi_subtitle')}</p>
        </div>
        
        <div className="relative px-0 md:px-2">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="md:bg-white/5 md:backdrop-blur-md md:border md:border-white/10 p-2 md:p-12 rounded-3xl relative text-center md:text-left"
            >
              <Quote className="hidden md:block absolute top-6 right-8 text-brand-cyan/20" size={60} />
              
              <div className="flex justify-center md:justify-start gap-1 mb-2 md:mb-8">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={12} md:size={18} className="fill-brand-orange text-brand-orange" />
                ))}
              </div>
              
              <p className="text-sm md:text-2xl text-white mb-3 md:mb-8 italic font-light leading-snug">
                "{testimonials[currentIndex].content[language]}"
              </p>
              
              <div className="flex items-center justify-center md:justify-start gap-2 md:gap-4">
                <div className="h-6 w-6 md:h-12 md:w-12 bg-brand-cyan/20 rounded-full flex items-center justify-center text-brand-cyan font-bold text-xs md:text-xl">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-bold text-[10px] md:text-lg">{testimonials[currentIndex].name}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls - Smaller on Mobile */}
          <div className="flex justify-center gap-3 mt-4 md:mt-12">
            <button 
              onClick={prev}
              className="p-1 md:p-3 rounded-full bg-white/5 text-white"
            >
              <ChevronLeft size={14} md:size={20} />
            </button>
            <div className="flex items-center gap-1 md:gap-2">
              {testimonials.map((_, i) => (
                <div 
                  key={i}
                  className={`h-1 transition-all duration-300 rounded-full ${i === currentIndex ? 'w-4 md:w-8 bg-brand-cyan' : 'w-1 md:w-2 bg-white/20'}`}
                />
              ))}
            </div>
            <button 
              onClick={next}
              className="p-1 md:p-3 rounded-full bg-white/5 text-white"
            >
              <ChevronRight size={14} md:size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
