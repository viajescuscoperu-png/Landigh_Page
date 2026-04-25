import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useTracking } from '../hooks/useTracking';
import { useLanguage } from '../context/LanguageContext';

export const FloatingWhatsApp = () => {
  const { trackWhatsAppClick } = useTracking();
  const { langText } = useLanguage();
  const phone = "51970909088";
  const message = langText('whatsapp_msg');
  const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick('Floating Button', 'floating_bubble')}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-whatsapp hover:bg-whatsapp-hover text-white rounded-full shadow-2xl hover:shadow-green-500/50 transition-all hover:scale-110"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="absolute inset-0 w-full h-full bg-whatsapp rounded-full animate-ping opacity-25"></div>
      <MessageCircle className="w-8 h-8 md:w-10 md:h-10 relative z-10" fill="currentColor" />
    </motion.a>
  );
};
