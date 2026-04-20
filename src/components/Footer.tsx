import React from 'react';
import { Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 py-12 border-t border-slate-200 text-center">
      <div className="container mx-auto px-4">
        <h3 className="font-bold text-slate-800 text-lg mb-2">Viajes Cusco Peru</h3>
        <p className="text-slate-500 text-sm mb-6">Especialistas em Turismo VIP no Peru 🇵🇪</p>
        
        <a 
          href="https://viajescuscoperu.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-cyan-400 bg-cyan-50 text-cyan-600 font-bold text-sm transition-all hover:bg-cyan-100 mb-8"
        >
          <Globe size={16} />
          Visitar Site Oficial
        </a>
        
        <p className="text-slate-400 text-xs font-light">
          © 2026 Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};
