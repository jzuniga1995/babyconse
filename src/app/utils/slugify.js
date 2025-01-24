/**
 * Genera un slug basado en un texto dado
 * @param {string} text - El texto a convertir en un slug
 * @returns {string} - Slug generado
 */
export function generateSlug(text) {
  if (!text) return ''; // Manejar texto vacío o nulo

  return text
    .toLowerCase() // Convierte a minúsculas
    .normalize("NFD") // Normaliza caracteres con acentos
    .replace(/[\u0300-\u036f]/g, '') // Elimina los acentos y diacríticos
    .replace(/[^a-z0-9\s-]/g, '') // Elimina caracteres especiales no válidos
    .trim() // Elimina espacios al inicio y al final
    .replace(/\s+/g, '-'); // Reemplaza espacios por guiones
}
