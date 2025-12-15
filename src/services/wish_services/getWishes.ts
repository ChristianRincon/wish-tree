import { supabase } from '../../database/supabase';
import type { WishModel } from '../../models/wishModel';

/**
 * Obtiene todos los deseos de la tabla 'wishes' en Supabase.
 * 
 * @returns Promise con un array de objetos Wish tipados
 * @throws Error si hay problemas al conectar con Supabase
 */
export async function getWishes(): Promise<WishModel[]> {
  const { data, error } = await supabase
    .from('wishes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error al obtener deseos:', error);
    throw new Error(`No se pudieron obtener los deseos: ${error.message}`);
  }

  return data as WishModel[];
}
