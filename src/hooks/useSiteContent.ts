import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { t } from '../data/translations';

export interface SiteContent {
  countdownTarget: string;
  heroSubtitle: { pt: string; es: string; en: string };
}

// Valores por defecto: los mismos que estaban hardcodeados en el código
// antes de existir el panel de administrador. Se usan mientras carga la
// consulta a Supabase, o si Supabase no está configurado / falla.
export const DEFAULT_SITE_CONTENT: SiteContent = {
  countdownTarget: '2026-08-15T23:59:59',
  heroSubtitle: {
    pt: t.hero_subtitle.pt,
    es: t.hero_subtitle.es,
    en: t.hero_subtitle.en,
  },
};

export const useSiteContent = () => {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [loading, setLoading] = useState(supabase !== null);

  useEffect(() => {
    if (!supabase) return;

    let cancelled = false;

    (async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('countdown_target, hero_subtitle_pt, hero_subtitle_es, hero_subtitle_en')
        .eq('id', 1)
        .single();

      if (cancelled) return;

      if (error || !data) {
        console.error('Error loading site content:', error);
      } else {
        setContent({
          countdownTarget: data.countdown_target || DEFAULT_SITE_CONTENT.countdownTarget,
          heroSubtitle: {
            pt: data.hero_subtitle_pt || DEFAULT_SITE_CONTENT.heroSubtitle.pt,
            es: data.hero_subtitle_es || DEFAULT_SITE_CONTENT.heroSubtitle.es,
            en: data.hero_subtitle_en || DEFAULT_SITE_CONTENT.heroSubtitle.en,
          },
        });
      }

      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { content, loading };
};
