-- ============================================================
-- SCRIPT COMPLETO DE REINICIO - TABLA leads_raw
-- Copia y pega TODO esto en el SQL Editor de Supabase
-- ============================================================

-- PASO 1: Eliminar la tabla anterior (reinicio limpio)
DROP TABLE IF EXISTS leads_raw;

-- PASO 2: Crear la tabla completa y correcta
CREATE TABLE leads_raw (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Identificadores de Seguimiento
    lead_id         TEXT,                      -- VCP-XXXX (puede repetirse por visitas)
    event_type      TEXT DEFAULT 'page_view',  -- 'page_view' o 'whatsapp_click'
    tour_selected   TEXT,                      -- Tour clickeado o 'PAGE_VIEW'

    -- Parámetros Dinámicos de Meta Ads
    utm_source      TEXT DEFAULT 'direct',     -- facebook / instagram
    utm_medium      TEXT DEFAULT 'none',       -- cpc / organic
    utm_campaign    TEXT DEFAULT 'none',       -- nombre de la campaña
    utm_content     TEXT DEFAULT 'none',       -- nombre del anuncio
    utm_term        TEXT DEFAULT 'none',       -- nombre del conjunto

    -- Métricas de Comportamiento
    time_on_page    INTEGER DEFAULT 0,         -- Segundos en la página
    scroll_depth    INTEGER DEFAULT 0,         -- % de scroll leído

    -- Datos del Dispositivo
    user_agent      TEXT,                      -- Navegador/Móvil

    -- Control de Ventas Offline
    status          TEXT DEFAULT 'visita',     -- visita / nuevo / vendido / perdido
    sale_value      NUMERIC DEFAULT 0,         -- Para medir ROI real
    notes           TEXT                       -- Observaciones del vendedor
);

-- PASO 3: Habilitar Row Level Security
ALTER TABLE leads_raw ENABLE ROW LEVEL SECURITY;

-- PASO 4: Permitir inserción pública (Landing Page)
DROP POLICY IF EXISTS "Public Insert" ON leads_raw;
CREATE POLICY "Public Insert" ON leads_raw
    FOR INSERT WITH CHECK (true);

-- PASO 5: Permitir lectura solo al dueño (tú en el dashboard)
DROP POLICY IF EXISTS "Owner Select" ON leads_raw;
CREATE POLICY "Owner Select" ON leads_raw
    FOR SELECT USING (true);

-- PASO 6: Índices para consultas rápidas en el dashboard
CREATE INDEX IF NOT EXISTS idx_leads_created   ON leads_raw (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_campaign  ON leads_raw (utm_campaign);
CREATE INDEX IF NOT EXISTS idx_leads_status    ON leads_raw (status);
CREATE INDEX IF NOT EXISTS idx_leads_lead_id   ON leads_raw (lead_id);

-- Comentario de la tabla
COMMENT ON TABLE leads_raw IS
    'Tabla de leads capturados desde Meta Ads. Incluye visitas (page_view) y clics de WhatsApp.';

-- ============================================================
-- VERIFICACIÓN: Esto debe mostrar la tabla con sus columnas
-- ============================================================
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'leads_raw'
ORDER BY ordinal_position;
