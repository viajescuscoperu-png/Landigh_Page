# Guía Maestra de Configuración: Supabase + Analítica

Este archivo contiene todo el código necesario para activar el rastreo de leads, scroll y campañas de anuncios en tu landing page.

## 1. Configuración de la Base de Datos (SQL)
Copia y pega este código en el **SQL Editor** de tu panel de Supabase y presiona **RUN**.

```sql
-- 1. Eliminar si existe para evitar conflictos
DROP TABLE IF EXISTS leads_raw;

-- 2. Crear la tabla con todas las métricas de analista
CREATE TABLE leads_raw (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    lead_id         TEXT,                      -- ID único de sesión VCP-XXXX
    event_type      TEXT DEFAULT 'page_view',  -- 'page_view' o 'whatsapp_click'
    tour_selected   TEXT,                      -- Nombre del tour + Ubicación del botón
    
    -- Parámetros de Facebook / Google Ads
    utm_source      TEXT DEFAULT 'direct',
    utm_medium      TEXT DEFAULT 'none',
    utm_campaign    TEXT DEFAULT 'none',
    utm_content     TEXT DEFAULT 'none',
    utm_term        TEXT DEFAULT 'none',
    
    -- Métricas de comportamiento
    time_on_page    INTEGER DEFAULT 0,         -- Segundos totales
    scroll_depth    INTEGER DEFAULT 0,         -- % máximo leído (0-100)
    
    -- Datos técnicos
    user_agent      TEXT,
    status          TEXT DEFAULT 'visita',     -- visita / nuevo / vendido
    notes           TEXT
);

-- 3. Habilitar seguridad (RLS) para que la web pueda escribir
ALTER TABLE leads_raw ENABLE ROW LEVEL SECURITY;

-- Política para permitir que los usuarios (público) inserten sus datos
CREATE POLICY "Public Insert" ON leads_raw FOR INSERT WITH CHECK (true);

-- Política para permitir que la web actualice el scroll y tiempo
CREATE POLICY "Public Update" ON leads_raw FOR UPDATE USING (true);

-- 4. Índices para que tus reportes sean rápidos
CREATE INDEX idx_leads_created ON leads_raw (created_at DESC);
CREATE INDEX idx_leads_campaign ON leads_raw (utm_campaign);
```

---

## 2. Archivo de Conexión (`src/lib/supabase.ts`)
Este archivo ya está creado en tu proyecto. Asegúrate de que tenga este contenido:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
```

---

## 3. Variables de Entorno (Archivo `.env`)
Crea un archivo llamado `.env` en la carpeta raíz del proyecto y pega tus credenciales:

```bash
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anon-publica-larga
```

---

## 4. ¿Cómo ver los datos?
Una vez configurado, solo tienes que ir a tu panel de Supabase en la sección **Table Editor** y seleccionar la tabla `leads_raw`. 

Ahí verás en tiempo real:
1. Qué anuncio trajo al cliente (UTMs).
2. Cuánto tiempo leyó la página.
3. Hasta qué parte de la página bajó (Scroll).
4. En qué botón de tour hizo clic exactamente.

¡Listo para dominar tus campañas! 📊🚀🏔️
