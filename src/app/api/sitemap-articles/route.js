import { getConnection } from "../../lib/db";

export async function GET(request) {
  let connection;

  try {
    // Conexión a la base de datos
    connection = await getConnection();

    // Consulta sin paginación para obtener todos los artículos
    const query = `
      SELECT 
        id, title, slug, description, image, category, 
        meta_keywords, meta_description, full_content, published_at, views
      FROM articulos
      ORDER BY published_at DESC
    `;

    const [rows] = await connection.query(query);

    // Devolver los artículos como JSON
    return new Response(JSON.stringify({ data: rows }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=3599",
      },
    });
  } catch (error) {
    console.error("Error al obtener los artículos para el sitemap:", error.message);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    if (connection) connection.release();
  }
}
