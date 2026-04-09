-- SCRIPT DE CONFIGURACIÓN DE BASE DE DATOS PARA CONVERSIONES OFFLINE
-- Copia y pega este código en el SQL Editor de tu proyecto en Supabase.

CREATE TABLE IF NOT EXISTS leads_raw (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Identificadores de Seguimiento
    lead_id TEXT UNIQUE,               -- Generado por la App (Ej: VCP-8271)
    tour_selected TEXT,               -- Tour que generó el clic
    
    -- Parámetros Dinámicos de Meta Ads
    utm_source TEXT,                  -- facebook
    utm_medium TEXT,                  -- cpc
    utm_campaign TEXT,                -- {{campaign.name}}
    utm_content TEXT,                 -- {{ad.name}}
    utm_term TEXT,                    -- {{adset.name}}
    
    -- Datos del Dispositivo (Match Rate)
    user_agent TEXT,                  -- Navegador/Móvil
    
    -- Control de Ventas Offline
    status TEXT DEFAULT 'nuevo',      -- nuevo / vendido / perdido
    sale_value NUMERIC DEFAULT 0,     -- Para medir ROI real
    notes TEXT                        -- Observaciones del vendedor
);

-- Habilitar inserción pública para la Landing Page
ALTER TABLE leads_raw ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Insert" ON leads_raw;
CREATE POLICY "Public Insert" ON leads_raw FOR INSERT WITH CHECK (true);

-- Comentario para el analista
COMMENT ON TABLE leads_raw IS 'Tabla de leads capturados desde Meta Ads para reconciliación offline.';
