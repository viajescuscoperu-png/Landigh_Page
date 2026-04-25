import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export const Footer = () => {
  const { langText } = useLanguage();
  const { trackSocialClick } = useTracking();

  return (
    <footer className="relative mt-2">
      {/* Footer content */}
      <div className="bg-[#080d1e] text-white border-t border-white/5 pb-20 md:pb-0">
        <div className="container mx-auto px-6 py-3 md:py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Left: Brand & Socials (Minimal) */}
            <div className="flex items-center gap-4">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="h-6 md:h-12 w-auto object-contain"
              />
              <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
              <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
                {/* Enlace Web */}
                <SocialIcon 
                  href="https://viajescuscoperu.com" 
                  onClick={() => trackSocialClick('footer_main_website')}
                  customClass="hover:bg-brand-orange"
                >
                  <Globe className="w-4 h-4" />
                </SocialIcon>
                
                {/* Redes Sociales */}
                <SocialIcon 
                  href="https://www.facebook.com/ViajesCuscoPeruSalkantay/"
                  onClick={() => trackSocialClick('footer_facebook')}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </SocialIcon>
                <SocialIcon 
                  href="https://www.instagram.com/viajescuscoperu"
                  onClick={() => trackSocialClick('footer_instagram')}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </SocialIcon>

                {/* Sellos de Confianza (SVG Integrado para que nunca falle) */}
                <div className="flex items-center gap-6 pl-6 border-l border-white/10 ml-2">
                  {/* TripAdvisor SVG */}
                  <div className="flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm0 21c-4.963 0-9-4.037-9-9s4.037-9 9-9 9 4.037 9 9-4.037 9-9 9zm4.5-12.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-6 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM12 15c-2.332 0-4.445-.933-6-2.45V11c0-1.654 1.346-3 3-3h6c1.654 0 3 1.346 3 3v1.55c-1.555 1.517-3.668 2.45-6 2.45z"/>
                    </svg>
                    <span className="text-[11px] font-black tracking-tighter">Tripadvisor</span>
                  </div>

                  {/* Marca Perú (Simplificado) */}
                  <div className="flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
                    <span className="text-[13px] font-black tracking-tighter italic border-b-2 border-brand-orange">Marca PERÚ</span>
                  </div>

                  {/* MINCETUR */}
                  <div className="text-[10px] font-black leading-none text-white/80 border border-white/30 px-2 py-1 rounded tracking-tighter hover:text-white hover:border-white transition-all">
                    MINCETUR
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Copyright Only */}
            <div className="flex flex-col items-center md:items-end">
              <p className="text-slate-500 text-[10px] md:text-sm text-center md:text-right">
                {langText('footer_copyright')}
              </p>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, children, customClass }: { href: string; children: React.ReactNode; customClass?: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 transition-all duration-300 hover:text-white hover:scale-110 ${customClass || 'hover:bg-brand-cyan'}`}
  >
    {children}
  </a>
);
