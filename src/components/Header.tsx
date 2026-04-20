import { Phone, Mail, MapPin } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar - Cyan contact strip */}
      <div className="bg-brand-cyan text-white text-xs md:text-sm">
        <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-center gap-4 md:gap-8">
          <a href="https://wa.me/51970909088" className="flex items-center gap-1.5 hover:underline">
            <Phone size={13} />
            <span>Whatsapp: +51 970 909 088</span>
          </a>
          <a href="mailto:viajescuscoperu@gmail.com" className="flex items-center gap-1.5 hover:underline">
            <Mail size={13} />
            <span>viajescuscoperu@gmail.com</span>
          </a>
          <span className="hidden md:flex items-center gap-1.5">
            <MapPin size={13} />
            <span>Cusco, Perú</span>
          </span>
        </div>
      </div>

      {/* Main Nav - Dark bar with logo */}
      <div className="bg-brand-dark/95 backdrop-blur-md border-b border-white/10 shadow-xl">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-4 flex items-center justify-start">
          <a 
            href="https://viajescuscoperu.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center group transition-transform hover:scale-105"
          >
            <img 
              src="/logo.png" 
              alt="Viajes Cusco Perú" 
              className="h-12 md:h-14 w-auto object-contain"
            />
          </a>
        </div>
      </div>
    </header>
  );
};
