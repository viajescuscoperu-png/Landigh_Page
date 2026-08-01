import { createClient } from '@supabase/supabase-js';

// Configura estas variables en tu archivo .env (ver .env.example)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// null cuando aún no se configuraron las variables de entorno, para que la
// app no se rompa en desarrollo o si falta la configuración en producción.
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
