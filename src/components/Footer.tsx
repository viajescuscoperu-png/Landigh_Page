import { Phone, Mail, MapPin, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { langText } = useLanguage();

  return (
    <footer className="relative mt-10">
      {/* Smooth Wave Separator */}
      <div className="relative h-16 md:h-24 bg-white overflow-hidden leading-[0]">
        <svg 
          viewBox="0 0 1440 120" 
          className="absolute bottom-0 w-full text-brand-dark h-full block"
          preserveAspectRatio="none"
        >
          <path 
            fill="currentColor" 
            d="M0,60 C320,120 420,0 720,60 C1020,120 1120,0 1440,60 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

      {/* Footer content */}
      <div className="bg-[#080d1e] text-white pt-2">
        <div className="container mx-auto px-6 py-8 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-12">
            
            {/* Column 1: Brand (Wider) */}
            <div className="md:col-span-12 lg:col-span-5">
              <a href="#" className="inline-block mb-6 h-16 md:h-20">
                <img 
                  src="/logo.png" 
                  alt="Viajes Cusco Perú" 
                  className="h-full w-auto object-contain transform scale-[1.5] origin-left"
                />
              </a>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
                {langText('footer_desc')}
              </p>
              <div className="flex gap-4">
                <SocialIcon href="https://www.facebook.com/ViajesCuscoPeruSalkantay/" customClass="hover:bg-blue-600">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </SocialIcon>
                <SocialIcon href="https://www.instagram.com/viajescuscoperu" customClass="hover:bg-pink-600">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </SocialIcon>
                <SocialIcon href="https://viajescuscoperu.com/" customClass="hover:bg-brand-cyan">
                  <Globe size={20} />
                </SocialIcon>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-6 lg:col-span-3">
              <h4 className="text-base font-bold uppercase tracking-wider text-white mb-6 relative inline-block">
                {langText('footer_title_links')}
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-cyan rounded-full"></span>
              </h4>
              <ul className="space-y-4 text-slate-400">
                <FooterLink href="https://viajescuscoperu.com/">{langText('footer_link_1')}</FooterLink>
                <FooterLink href="https://viajescuscoperu.com/destinos">{langText('footer_link_2')}</FooterLink>
                <FooterLink href="https://viajescuscoperu.com/blog">{langText('footer_link_3')}</FooterLink>
                <FooterLink href="https://wa.me/51970909088">{langText('footer_link_4')}</FooterLink>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div className="md:col-span-6 lg:col-span-4">
              <h4 className="text-base font-bold uppercase tracking-wider text-white mb-6 relative inline-block">
                {langText('footer_title_contact')}
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-cyan rounded-full"></span>
              </h4>
              <ul className="space-y-5 text-slate-400">
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0 transition-colors">
                    <Phone size={18} />
                  </div>
                  <span className="group-hover:text-white transition-colors">{langText('whatsapp_number')}</span>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0 transition-colors">
                    <Mail size={18} />
                  </div>
                  <a href="mailto:viajescuscoperu@gmail.com" className="group-hover:text-white transition-colors">{langText('email')}</a>
                </li>
                <li className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0 transition-colors mt-1">
                    <MapPin size={18} />
                  </div>
                  <span className="group-hover:text-white transition-colors leading-relaxed">{langText('location')} 🇵🇪</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              {langText('footer_copyright')}
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white/5 text-slate-400 rounded-full text-xs font-semibold border border-white/10">100% Seguro</span>
              <span className="px-3 py-1 bg-white/5 text-slate-400 rounded-full text-xs font-semibold border border-white/10">Garantía MINCETUR</span>
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
    className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 transition-all duration-300 hover:text-white hover:scale-110 ${customClass || 'hover:bg-brand-cyan'}`}
  >
    {children}
  </a>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center text-slate-400 hover:text-white transition-colors duration-300">
      <span className="w-0 group-hover:w-3 opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden text-brand-cyan font-bold">▸</span>
      <span className="group-hover:translate-x-1 transition-transform duration-300">{children}</span>
    </a>
  </li>
);
