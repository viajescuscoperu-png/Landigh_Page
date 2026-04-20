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

      {/* Main Nav - White bar with logo */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-center">
          <a 
            href="https://viajescuscoperu.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
          >
            {/* Logo icon - llama circle */}
            <div className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-white text-lg font-bold">
              🦙
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl md:text-2xl font-extrabold tracking-tight text-brand-dark">
                VIAJES <span className="text-brand-orange">CUSCO</span> PERÚ
              </span>
              <span className="text-[10px] text-slate-400 tracking-[0.2em] uppercase">Agência Oficial de Turismo</span>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
};
