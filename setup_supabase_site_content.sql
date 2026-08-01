-- ============================================================
-- SCRIPT DE CONFIGURACIÓN DE BASE DE DATOS - SITE_CONTENT
-- Contenido editable desde el Panel de Administrador (/?admin=1)
-- Copia y pega este código en el SQL Editor de Supabase
-- ============================================================

-- 1. Tabla de fila única con el contenido editable de la landing
CREATE TABLE IF NOT EXISTS site_content (
    id                INTEGER PRIMARY KEY DEFAULT 1,
    countdown_target  TEXT NOT NULL DEFAULT '2026-08-15T23:59:59', -- mismo formato que usaba el código
    hero_subtitle_pt  TEXT,
    hero_subtitle_es  TEXT,
    hero_subtitle_en  TEXT,
    tour_prices       JSONB NOT NULL DEFAULT '{}'::jsonb, -- { "<tour-id>": {"price":"299 USD","oldPrice":"380 USD"} }
    updated_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT single_row CHECK (id = 1)
);

-- 2. Fila inicial con los valores que hoy están hardcodeados en el código
INSERT INTO site_content (id, countdown_target, hero_subtitle_pt, hero_subtitle_es, hero_subtitle_en, tour_prices)
VALUES (
    1,
    '2026-08-15T23:59:59',
    'Viva a magia dos Andes com uma agência oficial certificada em Cusco',
    'Vive la magia de los Andes con una agencia oficial certificada en Cusco',
    'Experience the magic of the Andes with a certified official agency in Cusco',
    '{
      "mp-premium": {"price": "299 USD", "oldPrice": "380 USD"},
      "mp-express": {"price": "239 USD", "oldPrice": "300 USD"},
      "humantay-vip": {"price": "23 USD", "oldPrice": "35 USD"},
      "rainbow-mountain": {"price": "23 USD", "oldPrice": "35 USD"},
      "pallay-punchu": {"price": "35 USD", "oldPrice": "50 USD"}
    }'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- 4. Cualquiera puede LEER (la landing pública necesita mostrar precios/textos)
DROP POLICY IF EXISTS "Public read" ON site_content;
CREATE POLICY "Public read" ON site_content FOR SELECT USING (true);

-- 5. Solo un usuario logueado (Supabase Auth) puede ACTUALIZAR
-- Crea tu usuario admin en: Supabase Dashboard > Authentication > Users > Add user
DROP POLICY IF EXISTS "Auth update" ON site_content;
CREATE POLICY "Auth update" ON site_content FOR UPDATE USING (auth.role() = 'authenticated');

-- 6. Comentario informativo
COMMENT ON TABLE site_content IS 'Contenido editable de la landing (precios, subtítulo del hero, fecha del contador) desde el panel /?admin=1.';
