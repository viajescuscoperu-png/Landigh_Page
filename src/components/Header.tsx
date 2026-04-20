import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 text-center">
      <a 
        href="https://viajescuscoperu.com/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block"
      >
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          VIAJES <span className="text-cyan-400">CUSCO</span> PERÚ
        </h2>
      </a>
    </header>
  );
};
