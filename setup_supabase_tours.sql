-- ============================================================
-- SCRIPT DE CONFIGURACIÓN DE BASE DE DATOS - TOURS
-- Permite crear, editar y eliminar tours desde el Panel de
-- Administrador (/?admin=1). Las imágenes NO se suben acá: siguen
-- siendo archivos en public/ del proyecto, esto solo guarda su ruta.
-- Copia y pega este código en el SQL Editor de Supabase
-- ============================================================

-- 1. Tabla de tours (reemplaza al array estático src/data/tours.ts como fuente de verdad)
CREATE TABLE IF NOT EXISTS tours (
    id           TEXT PRIMARY KEY,
    name         TEXT NOT NULL,
    price        TEXT NOT NULL,
    old_price    TEXT NOT NULL,
    image        TEXT NOT NULL,
    message      JSONB NOT NULL,           -- {"pt":"...","es":"...","en":"..."}
    includes     JSONB NOT NULL,           -- [{"pt":"...","es":"...","en":"..."}, ...]
    urgency      JSONB,                    -- {"pt":"...","es":"...","en":"..."} o NULL
    curiosity    JSONB,                    -- {"pt":"...","es":"...","en":"..."} o NULL
    is_gold      BOOLEAN NOT NULL DEFAULT false,
    sort_order   INTEGER NOT NULL DEFAULT 0,
    created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Sembrado con los 5 tours que hoy están hardcodeados en el código,
--    para no perder nada al migrar a la base de datos.
INSERT INTO tours (id, name, price, old_price, image, message, includes, urgency, curiosity, is_gold, sort_order)
VALUES
(
    'mp-premium', 'Machu Picchu Premium', '299 USD', '380 USD', '/mp-premium.jpg',
    '{"pt":"Olá! Quero o pacote Machu Picchu Premium com Trem Panorâmico por 299 USD.","es":"¡Hola! Quiero el paquete Machu Picchu Premium con Tren Panorámico por 299 USD.","en":"Hello! I want the Machu Picchu Premium package with Panoramic Train for 299 USD."}'::jsonb,
    '[{"pt":"Trem Panorâmico incluso","es":"Tren Panorámico incluido","en":"Panoramic Train included"},{"pt":"Guia oficial em Português","es":"Guía oficial en Español","en":"Official English Guide"},{"pt":"Entradas para a cidadela","es":"Entradas a la ciudadela","en":"Entrance to the citadel"},{"pt":"Traslado hotel-estação","es":"Traslado hotel-estación","en":"Hotel-station transfer"},{"pt":"Ônibus de subida e descida","es":"Bus de subida y bajada","en":"Bus up and down"}]'::jsonb,
    '{"pt":"Exclusivo!","es":"¡Exclusivo!","en":"Exclusive!"}'::jsonb,
    '{"pt":"Sabia que Machu Picchu foi construída sem usar nem uma gota de argamassa entre as pedras?","es":"¿Sabías que Machu Picchu fue construida sin usar ni una sola gota de mortero entre sus piedras?","en":"Did you know Machu Picchu was built without using a single drop of mortar between its stones?"}'::jsonb,
    true, 1
),
(
    'mp-express', 'Machu Picchu Express', '239 USD', '300 USD', '/machu.jpg',
    '{"pt":"Olá! Quero aproveitar a oferta de Machu Picchu Express por 239 USD.","es":"¡Hola! Quiero aprovechar la oferta de Machu Picchu Express por 239 USD.","en":"Hello! I want to take advantage of the Machu Picchu Express offer for 239 USD."}'::jsonb,
    '[{"pt":"Bilhetes de trem inclusos","es":"Tickets de tren incluidos","en":"Train tickets included"},{"pt":"Guia oficial em Português","es":"Guía oficial en Español","en":"Official English Guide"},{"pt":"Entradas para a cidadela","es":"Entradas a la ciudadela","en":"Entrance to the citadel"},{"pt":"Traslado hotel-estação","es":"Traslado hotel-estación","en":"Hotel-station transfer"},{"pt":"Ônibus de subida e descida","es":"Bus de subida y bajada","en":"Bus up and down"}]'::jsonb,
    '{"pt":"Alta demanda!","es":"¡Alta demanda!","en":"High Demand!"}'::jsonb,
    '{"pt":"Sabia que Machu Picchu foi construída sem usar nem uma gota de argamassa entre as pedras?","es":"¿Sabías que Machu Picchu fue construida sin usar ni una sola gota de mortero entre sus piedras?","en":"Did you know Machu Picchu was built without using a single drop of mortar between its stones?"}'::jsonb,
    false, 2
),
(
    'humantay-vip', 'Humantay Lake', '23 USD', '35 USD', '/humantay.jpg',
    '{"pt":"Olá! Quero Humantay Lake por USD 23.","es":"¡Hola! Quiero Humantay Lake por USD 23.","en":"Hello! I want Humantay Lake for USD 23."}'::jsonb,
    '[{"pt":"Transporte turístico","es":"Transporte turístico","en":"Tourist transport"},{"pt":"Café da manhã e almoço","es":"Desayuno y almuerzo","en":"Breakfast and lunch"},{"pt":"Bastões de caminhada","es":"Bastones de caminata","en":"Walking sticks"},{"pt":"Guia profissional","es":"Guía profesional","en":"Professional guide"},{"pt":"Kit de primeiros socorros","es":"Kit de primeros auxilios","en":"First aid kit"}]'::jsonb,
    '{"pt":"Últimas 5 vagas","es":"Últimas 5 vacantes","en":"Last 5 spots"}'::jsonb,
    '{"pt":"É uma lagoa sagrada onde as comunidades ainda fazem oferendas à Pachamama.","es":"Es una laguna sagrada donde las comunidades aún realizan ofrendas a la Pachamama.","en":"It is a sacred lagoon where communities still make offerings to Pachamama."}'::jsonb,
    false, 3
),
(
    'rainbow-mountain', 'Rainbow Mountain', '23 USD', '35 USD', '/rainbow.jpg',
    '{"pt":"Olá! Quero Rainbow Mountain por USD 23.","es":"¡Hola! Quiero Rainbow Mountain por USD 23.","en":"Hello! I want Rainbow Mountain for USD 23."}'::jsonb,
    '[{"pt":"Café da manhã e almoço","es":"Desayuno y almuerzo","en":"Breakfast and lunch"},{"pt":"Transporte turístico","es":"Transporte turístico","en":"Tourist transport"},{"pt":"Guia profissional","es":"Guía profesional","en":"Professional guide"},{"pt":"Oxigênio a bordo","es":"Oxígeno a bordo","en":"Oxygen on board"},{"pt":"Bastões de caminhada","es":"Bastones de caminata","en":"Walking sticks"}]'::jsonb,
    '{"pt":"Limitado","es":"Limitado","en":"Limited"}'::jsonb,
    '{"pt":"Suas cores são resultado de minerais oxidados por milhões de anos.","es":"Sus colores son producto de minerales oxidados durante millones de años.","en":"Its colors are the result of minerals oxidized over millions of years."}'::jsonb,
    false, 4
),
(
    'pallay-punchu', 'Pallay Punchu Intenso', '35 USD', '50 USD', '/pallay.jpg',
    '{"pt":"Olá! Quero Pallay Punchu por USD 35.","es":"¡Hola! Quiero Pallay Punchu por USD 35.","en":"Hello! I want Pallay Punchu for USD 35."}'::jsonb,
    '[{"pt":"Novo destino 2026","es":"Nuevo destino 2026","en":"New 2026 destination"},{"pt":"Bastões de caminhada","es":"Bastones de caminata","en":"Walking sticks"},{"pt":"Guia profissional","es":"Guía profesional","en":"Professional guide"},{"pt":"Transporte turístico","es":"Transporte turístico","en":"Tourist transport"},{"pt":"Lanche de trilha","es":"Snack de ruta","en":"Trail snack"}]'::jsonb,
    '{"pt":"Apenas fins de semana!","es":"¡Solo fines de semana!","en":"Only weekends!"}'::jsonb,
    '{"pt":"É o novo destino secreto de Cusco, descoberto recentemente para o turismo.","es":"Es el nuevo destino secreto de Cusco, descubierto recientemente para el turismo.","en":"It is Cusco''s new secret destination, recently discovered for tourism."}'::jsonb,
    false, 5
)
ON CONFLICT (id) DO NOTHING;

-- 3. Seguridad (RLS): cualquiera puede leer, solo un usuario logueado puede escribir
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read" ON tours;
CREATE POLICY "Public read" ON tours FOR SELECT USING (true);

DROP POLICY IF EXISTS "Auth insert" ON tours;
CREATE POLICY "Auth insert" ON tours FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Auth update" ON tours;
CREATE POLICY "Auth update" ON tours FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Auth delete" ON tours;
CREATE POLICY "Auth delete" ON tours FOR DELETE USING (auth.role() = 'authenticated');

-- 4. El precio ahora vive en la fila de cada tour, así que site_content ya no
--    necesita guardar precios por separado (si ya lo habías creado antes).
ALTER TABLE site_content DROP COLUMN IF EXISTS tour_prices;

-- Nota: las imágenes de los tours NO se suben a Supabase. Siguen siendo
-- archivos del proyecto en la carpeta public/ (subidos por git/deploy);
-- la columna "image" de esta tabla solo guarda la ruta (ej. "/mi-foto.jpg").

COMMENT ON TABLE tours IS 'Tours mostrados en la landing, editables desde el panel /?admin=1 (crear, editar, eliminar).';
