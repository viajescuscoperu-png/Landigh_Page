import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { type Language, t } from '../data/translations';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  langText: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const langText = (key: string): string => {
    if (t[key] && t[key][language]) {
      return t[key][language];
    }
    console.warn(`Translation key not found: ${key}`);
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, langText }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
