import { supabase } from '../../database/supabase';
import type { WishModel } from '../../models/wishModel';

/**
 * Añade un nuevo deseo a la tabla 'wishes' en Supabase.
 * 
 * @param wish - Objeto con { name, age?, country?, wish_text }
 * @returns Promise con el objeto insertado tipado como WishModel
 * @throws Error si hay problemas al insertar en Supabase
 */
export async function addWish(wish: {
  name: string;
  age?: number;
  country?: string;
  wish_text: string;
}): Promise<WishModel> {
  const { data, error } = await supabase
    .from('wishes')
    .insert([wish])
    .select();

  if (error) {
    console.error('Error al añadir deseo:', error);
    throw new Error(`No se pudo añadir el deseo: ${error.message}`);
  }

  if (!data || data.length === 0) {
    throw new Error('No se recibió confirmación de inserción');
  }

  return data[0] as WishModel;
}
