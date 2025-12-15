import { createClient } from '@supabase/supabase-js';

/**
 * Inicializa el cliente de Supabase usando las variables de entorno.
 * Las variables requeridas son:
 * - VITE_SUPABASE_URL: URL del proyecto Supabase
 * - VITE_SUPABASE_ANON_KEY: Clave anónima de Supabase
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY son requeridas');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
