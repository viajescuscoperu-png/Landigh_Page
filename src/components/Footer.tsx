import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export const Footer = () => {
  const { langText } = useLanguage();

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
              <div className="flex gap-3">
                <SocialIcon href="https://viajescuscoperu.com" customClass="hover:bg-brand-orange">
                  <Globe className="w-4 h-4" />
                </SocialIcon>
                <SocialIcon href="https://www.facebook.com/ViajesCuscoPeruSalkantay/">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </SocialIcon>
                <SocialIcon href="https://www.instagram.com/viajescuscoperu">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </SocialIcon>
              </div>
            </div>

            {/* Right: Copyright & Trust Badges */}
            <div className="flex flex-col items-center md:items-end gap-3">
              <div className="flex items-center gap-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/0/02/TripAdvisor_Logo.svg" 
                  alt="TripAdvisor" 
                  className="h-5 md:h-7 w-auto brightness-200" 
                />
                <img 
                  src="https://seeklogo.com/images/M/mincetur-logo-D9712C1B4A-seeklogo.com.png" 
                  alt="Mincetur" 
                  className="h-6 md:h-10 w-auto brightness-200" 
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Logotipo_Marca_Per%C3%BA.svg" 
                  alt="Marca Perú" 
                  className="h-6 md:h-10 w-auto brightness-200" 
                />
              </div>
              <p className="text-slate-500 text-[10px] md:text-sm">
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
