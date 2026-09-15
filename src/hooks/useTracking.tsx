import { createContext, useContext, useEffect, useCallback, useRef, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';

// Todo lo de acá vive UNA sola vez por visita real, en un solo Provider en la
// raíz de la app (ver main.tsx). Antes cada componente que llamaba a
// useTracking() traía su propia copia de este estado y de este useEffect,
// así que una sola carga de página generaba varias filas "page_view" en
// Supabase y varios PageView duplicados a Meta Pixel (uno por componente
// montado). Con Context, todos comparten el mismo lead_id y el mismo efecto
// de "acabo de cargar la página" se dispara una sola vez.

interface TrackingContextProps {
  trackWhatsAppClick: (tourName: string, location?: string) => Promise<void>;
  trackSocialClick: (platform: string) => Promise<void>;
  trackContactClick: (type: 'phone' | 'email') => Promise<void>;
}

const TrackingContext = createContext<TrackingContextProps | undefined>(undefined);

export const TrackingProvider = ({ children }: { children: ReactNode }) => {
  const currentLeadId = useRef<string | null>(null);
  const maxScroll = useRef(0);

  const getUtms = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || 'direct',
      utm_medium: params.get('utm_medium') || 'none',
      utm_campaign: params.get('utm_campaign') || 'none',
      utm_content: params.get('utm_content') || 'none',
      utm_term: params.get('utm_term') || 'none',
    };
  }, []);

  const updateLeadData = useCallback(async (isFinal: boolean = false) => {
    if (!supabase || !currentLeadId.current) return;

    try {
      await supabase.from('leads_raw').update({
        scroll_depth: maxScroll.current,
        event_type: isFinal ? 'whatsapp_click' : 'page_view'
      }).eq('id', currentLeadId.current);
    } catch (error) {
      console.error('Error updating scroll stats:', error);
    }
  }, []);

  const logInitialVisit = useCallback(async () => {
    if (!supabase) return;

    const utms = getUtms();
    const leadId = localStorage.getItem('vcp_lead_id') || `VCP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    localStorage.setItem('vcp_lead_id', leadId);

    try {
      const { data, error } = await supabase.from('leads_raw').insert({
        lead_id: leadId,
        event_type: 'page_view',
        tour_selected: 'LANDING',
        ...utms,
        user_agent: navigator.userAgent,
        status: 'visita'
      }).select().single();

      if (data) {
        currentLeadId.current = data.id;
      }
      if (error) throw error;
    } catch (error) {
      console.error('Initial tracking error:', error);
    }
  }, [getUtms]);

  const trackWhatsAppClick = useCallback(async (tourName: string, location: string = 'form') => {
    // Meta Pixel Lead Event
    if ((window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: tourName,
        content_category: location,
        currency: 'USD'
      });
    }

    // Data Layer Push (para el tag de conversión de Google Ads en GTM)
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'whatsapp_conversion',
      tour_name: tourName,
      button_location: location,
      lead_id: currentLeadId.current
    });

    if (!supabase || !currentLeadId.current) return;

    try {
      await supabase.from('leads_raw').update({
        event_type: 'whatsapp_click',
        tour_selected: `${tourName} (${location})`,
        status: 'nuevo',
        scroll_depth: maxScroll.current
      }).eq('id', currentLeadId.current);
    } catch (error) {
      console.error('WhatsApp tracking error:', error);
    }
  }, []);

  const trackSocialClick = useCallback(async (platform: string) => {
    if (!supabase || !currentLeadId.current) return;

    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'social_click',
      platform: platform
    });

    try {
      await supabase.from('leads_raw').update({
        notes: `Clic en redes sociales: ${platform}`,
        scroll_depth: maxScroll.current
      }).eq('id', currentLeadId.current);
    } catch (error) {
      console.error('Social tracking error:', error);
    }
  }, []);

  const trackContactClick = useCallback(async (type: 'phone' | 'email') => {
    if (!supabase || !currentLeadId.current) return;

    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'contact_click',
      contact_type: type
    });

    try {
      await supabase.from('leads_raw').update({
        event_type: `contact_${type}`,
        scroll_depth: maxScroll.current
      }).eq('id', currentLeadId.current);
    } catch (error) {
      console.error('Contact tracking error:', error);
    }
  }, []);

  useEffect(() => {
    logInitialVisit();

    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = Math.round((winScroll / height) * 100);

      if (scrolled > maxScroll.current) {
        maxScroll.current = scrolled;
      }
    };

    // Sync scroll stats every 10 seconds
    const syncInterval = setInterval(() => updateLeadData(), 10000);

    window.addEventListener('scroll', handleScroll);

    // Meta Pixel PageView
    if ((window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(syncInterval);
      updateLeadData(); // Final sync on unmount
    };
  }, [logInitialVisit, updateLeadData]);

  return (
    <TrackingContext.Provider value={{ trackWhatsAppClick, trackSocialClick, trackContactClick }}>
      {children}
    </TrackingContext.Provider>
  );
};

export const useTracking = (): TrackingContextProps => {
  const context = useContext(TrackingContext);
  if (!context) {
    throw new Error('useTracking must be used within a TrackingProvider');
  }
  return context;
};
