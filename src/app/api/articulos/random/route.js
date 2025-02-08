import { query } from "../../../lib/db";

export async function GET(req) {
  try {
    const articulos = await query(
      "SELECT id, title, slug, description, image, category FROM articulos ORDER BY RAND() LIMIT 10;"
    );

    if (!articulos || articulos.length === 0) {
      return new Response(JSON.stringify({ error: "No se encontraron artículos." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

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
