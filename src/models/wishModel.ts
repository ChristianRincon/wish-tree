/**
 * Interfaz que define la estructura de un deseo en la base de datos
 */
export interface WishModel {
  id: string;
  name: string;
  age?: number;
  wish_text: string;
  country?: string;
  created_at: string;
}
