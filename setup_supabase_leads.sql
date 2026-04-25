-- ============================================================
-- SCRIPT DE CONFIGURACIÓN DE BASE DE DATOS - LEADS_RAW
-- Copia y pega este código en el SQL Editor de Supabase
-- ============================================================

-- 1. Reinicio de tabla (Opcional, ten cuidado si ya tienes datos)
-- DROP TABLE IF EXISTS leads_raw;

-- 2. Creación de la tabla principal de leads y analítica
CREATE TABLE IF NOT EXISTS leads_raw (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Identificadores de sesión
    lead_id         TEXT,                      -- ID generado (VCP-XXXX)
    event_type      TEXT DEFAULT 'page_view',  -- 'page_view' | 'whatsapp_click' | 'contact_phone' | 'contact_email'
    tour_selected   TEXT,                      -- Nombre del tour + ubicación del botón
    
    -- Parámetros de seguimiento (Ads)
    utm_source      TEXT DEFAULT 'direct',     -- facebook | google | instagram
    utm_medium      TEXT DEFAULT 'none',       -- cpc | social | organic
    utm_campaign    TEXT DEFAULT 'none',       -- nombre de la campaña
    utm_content     TEXT DEFAULT 'none',       -- nombre del anuncio
    utm_term        TEXT DEFAULT 'none',       -- nombre del conjunto de anuncios
    
    -- Métricas de comportamiento
    time_on_page    INTEGER DEFAULT 0,         -- Segundos en la página
    scroll_depth    INTEGER DEFAULT 0,         -- Porcentaje máximo de scroll (0-100)
    
    -- Información técnica y de ventas
    user_agent      TEXT,                      -- Navegador/Dispositivo
    status          TEXT DEFAULT 'visita',     -- visita | nuevo | vendido | perdido
    notes           TEXT                       -- Observaciones o datos de redes sociales
);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE leads_raw ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de Acceso Público
-- Permite que la Landing Page inserte nuevos registros
DROP POLICY IF EXISTS "Public Insert" ON leads_raw;
CREATE POLICY "Public Insert" ON leads_raw FOR INSERT WITH CHECK (true);

-- Permite que la Landing Page actualice el tiempo y scroll del lead actual
DROP POLICY IF EXISTS "Public Update" ON leads_raw;
CREATE POLICY "Public Update" ON leads_raw FOR UPDATE USING (true);

-- 5. Índices para optimizar consultas de analista
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads_raw (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_utm_campaign ON leads_raw (utm_campaign);
CREATE INDEX IF NOT EXISTS idx_leads_event_type ON leads_raw (event_type);

-- 6. Comentario informativo
COMMENT ON TABLE leads_raw IS 'Tabla para capturar leads y métricas de comportamiento de la landing page de Viajes Cusco Perú.';
