import { createClient } from '@supabase/supabase-js';

// Reemplaza estos valores con tus credenciales de Supabase cuando las tengas
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'TU_URL_AQUI';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'TU_KEY_AQUI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
