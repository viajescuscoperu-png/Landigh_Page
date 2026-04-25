import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const StickyMobileCTA = () => {
  const { langText } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar el botón después de 400px de scroll
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const msg = "Olá! Vi a oferta na landing page e gostaria de mais informações sobre os pacotes VIP.";
    window.open(`https://wa.me/51970909088?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 z-[100] md:hidden pointer-events-none"
        >
          <div className="max-w-md mx-auto pointer-events-auto">
            <button 
              onClick={handleClick}
              className="w-full bg-whatsapp text-white flex items-center justify-center gap-3 p-3 rounded-2xl shadow-[0_15px_35px_-5px_rgba(34,197,94,0.5)] border-2 border-white/30 active:scale-95 transition-transform"
            >
              <MessageCircle size={24} fill="white" />
              <span className="text-sm font-black uppercase tracking-tight">{langText('sticky_cta_text')}</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
