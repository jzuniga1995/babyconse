import { query } from "../../../lib/db";

export async function GET(req) {
  try {
    // Obtener los IDs de todos los artículos
    const idsResult = await query("SELECT id FROM articulos;");
    const ids = idsResult.map((row) => row.id);

    if (ids.length === 0) {
      return new Response(JSON.stringify({ error: "No se encontraron artículos." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Seleccionar 10 IDs aleatorios
    const randomIds = [];
    while (randomIds.length < 10 && ids.length > 0) {
      const randomIndex = Math.floor(Math.random() * ids.length);
      randomIds.push(ids.splice(randomIndex, 1)[0]);
    }

    // Consultar los artículos correspondientes a los IDs seleccionados
    const placeholders = randomIds.map(() => "?").join(", ");
    const articulos = await query(
      `SELECT id, title, slug, description, image, category
       FROM articulos
       WHERE id IN (${placeholders});`,
      randomIds
    );

    return new Response(JSON.stringify({ data: articulos }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error en el endpoint '/api/articulos/random':", error.message);

    return new Response(
      JSON.stringify({ error: "Error al obtener artículos aleatorios." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
