import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useTracking } from '../hooks/useTracking';

export const FloatingWhatsApp = () => {
  const { trackWhatsAppClick } = useTracking();
  const phone = "51970909088";
  const message = "Olá! Gostaria de mais informações sobre as ofertas de Cusco.";
  const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick('Floating Button')}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-whatsapp hover:bg-whatsapp-hover text-white rounded-full shadow-2xl hover:shadow-green-500/50 transition-all hover:scale-110"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="absolute inset-0 w-full h-full bg-whatsapp rounded-full animate-ping opacity-25"></div>
      <MessageCircle size={30} className="relative z-10" fill="currentColor" />
    </motion.a>
  );
};
