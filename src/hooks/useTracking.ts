import { useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || '';
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

export const useTracking = () => {
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

  const logEvent = useCallback(async (eventType: string, tourSelected: string = 'NONE') => {
    if (!supabase) return;

    const utms = getUtms();
    const leadId = localStorage.getItem('vcp_lead_id') || `VCP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    localStorage.setItem('vcp_lead_id', leadId);

    try {
      await supabase.from('leads_raw').insert({
        lead_id: leadId,
        event_type: eventType,
        tour_selected: tourSelected,
        ...utms,
        user_agent: navigator.userAgent,
        status: 'nuevo'
      });
    } catch (error) {
      console.error('Tracking error:', error);
    }
  }, [getUtms]);

  const trackWhatsAppClick = useCallback((tourName: string) => {
    logEvent('whatsapp_click', tourName);
    
    // Meta Pixel Lead Event
    if ((window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: tourName,
        currency: 'USD'
      });
    }
  }, [logEvent]);

  useEffect(() => {
    // Initial Page View
    logEvent('PAGE_VIEW', 'LANDING');

    // Meta Pixel PageView
    if ((window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }
  }, [logEvent]);

  return { trackWhatsAppClick };
};
