-- ============================================================
-- MIGRACIÓN: Nacional vs Extranjero en la tabla "tours"
-- Ejecuta esto en el SQL Editor de Supabase DESPUÉS de haber
-- corrido setup_supabase_tours.sql alguna vez. Es seguro correrlo
-- una sola vez; no borra ningún tour existente.
-- ============================================================

-- 1. Nueva columna: a quién se le muestra cada tour.
--    'foreign' = solo extranjeros, 'national' = solo nacionales,
--    'both' = a los dos (con precio y mensaje distintos para cada uno).
ALTER TABLE tours
    ADD COLUMN IF NOT EXISTS audience TEXT NOT NULL DEFAULT 'foreign'
    CHECK (audience IN ('national', 'foreign', 'both'));

-- 2. Renombramos las columnas de precio/mensaje actuales para dejar claro
--    que son las de "extranjero" (así queda simétrico con las nuevas de
--    "nacional"). Todos los tours que ya tenías quedan intactos, solo
--    cambia el nombre de columna.
ALTER TABLE tours RENAME COLUMN price TO price_foreign;
ALTER TABLE tours RENAME COLUMN old_price TO old_price_foreign;
ALTER TABLE tours RENAME COLUMN message TO message_foreign;

-- 3. Nuevas columnas para la tarifa nacional (en soles). Quedan vacías
--    hasta que edites un tour desde el panel /?admin=1 y actives
--    "Nacional" o "Ambos".
ALTER TABLE tours ADD COLUMN IF NOT EXISTS price_national TEXT;
ALTER TABLE tours ADD COLUMN IF NOT EXISTS old_price_national TEXT;
ALTER TABLE tours ADD COLUMN IF NOT EXISTS message_national JSONB;

COMMENT ON COLUMN tours.audience IS 'A quién se muestra el tour: national, foreign o both.';
COMMENT ON COLUMN tours.price_foreign IS 'Precio actual para extranjeros (ej. "299 USD").';
COMMENT ON COLUMN tours.old_price_foreign IS 'Precio anterior (tachado) para extranjeros.';
COMMENT ON COLUMN tours.message_foreign IS 'Mensaje de WhatsApp para extranjeros, por idioma.';
COMMENT ON COLUMN tours.price_national IS 'Precio actual para nacionales (ej. "S/. 350").';
COMMENT ON COLUMN tours.old_price_national IS 'Precio anterior (tachado) para nacionales.';
COMMENT ON COLUMN tours.message_national IS 'Mensaje de WhatsApp para nacionales, por idioma.';
