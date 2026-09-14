// Adjunta al mensaje de WhatsApp un marcador de atribución invisible para
// el CRM (proyecto "wacrm"), replicando el mismo patrón ya usado en la web
// principal y el catálogo digital. El cliente nunca ve el marcador: no
// cambia ni una palabra del texto visible del mensaje.

export const WHATSAPP_NUMBER = '51980023248';

// Bloque Unicode "Tags" (U+E0000-U+E007F): el mismo que WhatsApp ya
// renderiza invisible para los emojis de bandera regional. Codifica cada
// carácter del marcador como su equivalente en ese bloque, así viaja
// pegado al mensaje sin que se vea nada raro.
const TAG_BASE = 0xe0000;

export function encodeInvisibleMarker(marker: string): string {
  return Array.from(marker)
    .map((ch) => String.fromCodePoint(TAG_BASE + ch.codePointAt(0)!))
    .join('');
}

// Códigos dedicados a ESTA landing page (no se comparten con la web
// principal ni con el catálogo digital, cada propiedad tiene los suyos).
const CODE_GOOGLE_ADS = 'k2vhb9x';
const CODE_FACEBOOK_ADS = 'r7ldxq3';
const CODE_TIKTOK_ADS = 'n5wtme8';
const CODE_ORGANIC = 'q1pzsl6';

const AD_PARAM_KEYS = ['gclid', 'fbclid', 'ttclid', 'utm_source', 'utm_medium', 'utm_campaign'] as const;
type AdParamKey = (typeof AD_PARAM_KEYS)[number];
type AdParams = Partial<Record<AdParamKey, string>>;

// GTM ya captura estos parámetros de la URL para sus propios tags; acá solo
// los leemos de la misma URL (no se duplica ningún sistema de captura). La
// landing es de una sola página sin ruteo, así que la URL con la que llegó
// el cliente se mantiene igual durante toda la visita.
function getAdParams(): AdParams {
  const params = new URLSearchParams(window.location.search);
  const result: AdParams = {};
  for (const key of AD_PARAM_KEYS) {
    const val = params.get(key);
    if (val) result[key] = val;
  }
  return result;
}

export function getWhatsAppUrl(baseText: string): string {
  const ad = getAdParams();

  let code: string;
  let source: string;

  if (ad.gclid || (ad.utm_source === 'google' && ad.utm_medium === 'cpc')) {
    code = CODE_GOOGLE_ADS;
    source = 'google_ads';
  } else if (ad.fbclid) {
    code = CODE_FACEBOOK_ADS;
    source = 'facebook_ads';
  } else if (ad.ttclid) {
    code = CODE_TIKTOK_ADS;
    source = 'tiktok_ads';
  } else {
    code = CODE_ORGANIC;
    source = 'google_organic';
  }

  const isAd = source !== 'google_organic';
  const campaign = isAd ? ad.utm_campaign : undefined;
  const marker = `[src:${source}|${code}${campaign ? `|${campaign}` : ''}]`;

  const text = `${baseText}${encodeInvisibleMarker(marker)}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
