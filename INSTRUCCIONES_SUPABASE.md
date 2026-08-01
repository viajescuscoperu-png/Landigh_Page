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

---

## 5. Panel de administrador (precios, subtítulo, contador y tours)

La landing tiene un panel privado para cambiar, sin tocar código ni volver a desplegar:
- El subtítulo que aparece debajo del título principal (en los 3 idiomas) y la fecha en la que expira el contador regresivo.
- Los tours: crear uno nuevo, editar cualquier campo (precio, nombre, imagen, mensaje de WhatsApp, qué incluye, etc.) o eliminarlo.

### 5.1 Crear las tablas de contenido
Corre, en este orden, en el **SQL Editor** de Supabase:
1. `setup_supabase_site_content.sql` → crea la tabla `site_content` (subtítulo + contador) con los valores actuales ya precargados.
2. `setup_supabase_tours.sql` → crea la tabla `tours` con los 5 tours actuales ya precargados.

### 5.2 Crear tu usuario de administrador
El panel se protege con un login real (no una contraseña escrita en el código). Para crear tu usuario:
1. Ve a tu proyecto en Supabase → **Authentication** → **Users**.
2. Haz clic en **Add user** (Create new user).
3. Ingresa tu email y una contraseña. Puedes marcar "Auto Confirm User" para no tener que verificar el email.

### 5.3 Entrar al panel
Abre `https://tu-dominio.com/?admin=1`, ingresa con el email y contraseña que creaste. Hay dos secciones:
- **General**: contador y subtítulo.
- **Tours**: lista de tours con botones "Editar" y "Eliminar", y "+ Nuevo tour" para crear uno.

Los cambios se reflejan en la landing la próxima vez que alguien la carga.

**Sobre las imágenes:** el panel no sube fotos. El campo "Imagen" del formulario de cada tour solo guarda una ruta de texto (ej. `/nuevo-tour.jpg`). Para usar una foto nueva:
1. Copia el archivo a la carpeta `public/` del proyecto.
2. Haz commit y sube ese cambio (Git → deploy), como ya haces con las fotos actuales.
3. En el panel, escribe esa misma ruta en el campo "Imagen" del tour.

**Nota:** el mensaje que se envía por WhatsApp al hacer clic en un tour es el texto que escribas en el campo "Mensaje de WhatsApp" del formulario — si cambias el precio, recuerda actualizar también ese texto si quieres que diga el precio nuevo.
