import { Phone, Mail, MapPin } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar - Dark like main site */}
      <div className="bg-[#0b132b] text-slate-300 text-xs md:text-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <a href="https://wa.me/51970909088" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={13} />
              <span>Whatsapp: +51 970 909 088</span>
            </a>
            <a href="mailto:viajescuscoperu@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={13} />
              <span>viajescuscoperu@gmail.com</span>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-6">
             <a href="https://viajescuscoperu.com/blog" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Blog</a>
             <span className="flex items-center gap-1.5">
               <MapPin size={13} />
               <span>Cusco, Perú</span>
             </span>
          </div>
        </div>
      </div>

      {/* Main Nav - Dark bar with MASSIVE logo */}
      <div className="bg-brand-dark/95 backdrop-blur-md border-b border-white/10 shadow-xl">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-4 md:py-6 flex items-center justify-start">
          <a 
            href="https://viajescuscoperu.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center group transition-transform hover:scale-105"
            style={{ width: '100%', maxWidth: '350px' }}
          >
            <img 
              src="/logo.png" 
              alt="Viajes Cusco Perú" 
              className="h-20 md:h-28 w-auto object-contain"
            />
          </a>
        </div>
      </div>
    </header>
  );
};
