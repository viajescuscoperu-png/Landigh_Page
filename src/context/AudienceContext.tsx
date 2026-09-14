import React, { createContext, useContext, useState, type ReactNode } from 'react';

export type AudienceType = 'national' | 'foreign';

interface AudienceContextProps {
  audience: AudienceType;
  setAudience: (audience: AudienceType) => void;
}

const AudienceContext = createContext<AudienceContextProps | undefined>(undefined);

export const AudienceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [audience, setAudience] = useState<AudienceType>('foreign');

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const audienceParam = params.get('audience') as AudienceType;
    if (audienceParam && ['national', 'foreign'].includes(audienceParam)) {
      setAudience(audienceParam);
    }
  }, []);

  return (
    <AudienceContext.Provider value={{ audience, setAudience }}>
      {children}
    </AudienceContext.Provider>
  );
};

export const useAudience = (): AudienceContextProps => {
  const context = useContext(AudienceContext);
  if (!context) {
    throw new Error('useAudience must be used within an AudienceProvider');
  }
  return context;
};
