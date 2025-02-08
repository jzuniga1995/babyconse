import { getConnection } from "../../../lib/db";

export async function GET(request, context) {
  let connection;

  try {
    // 🔴 Resolver `context.params` como una promesa
    const resolvedParams = await context.params; // Resolver la promesa
    const { slug } = resolvedParams; // Extraer `slug` de los parámetros resueltos

    if (!slug) {
      return new Response(
        JSON.stringify({ error: "Slug no proporcionado." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    connection = await getConnection();

    // Incrementar las vistas del artículo
    await connection.query(
      `UPDATE articulos SET views = views + 1 WHERE slug = ?`,
      [slug]
    );

    // Obtener el artículo principal
    const [rows] = await connection.query(
      `SELECT 
         id, title, description, link, image, category, full_content, 
         published_at, views,meta_description
       FROM articulos 
       WHERE slug = ?`,
      [slug]
    );

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ error: "Artículo no encontrado." }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const articulo = rows[0];

    // Obtener referencias relacionadas
    const [referencias] = await connection.query(
      `SELECT title, link 
       FROM articulo_referencias 
       WHERE articulo_id = ?`,
      [articulo.id]
    );

    // Obtener artículos relacionados
    const [relacionados] = await connection.query(
      `SELECT id, title, description, slug, image 
       FROM articulos 
       WHERE category = ? AND slug != ?
       ORDER BY published_at DESC, views DESC
       LIMIT 5`,
      [articulo.category, slug]
    );

    // Respuesta con datos y encabezados de caché
    return new Response(
      JSON.stringify({
        articulo,
        referencias: referencias || [], // Asegurar que sea un arreglo
        relacionados: relacionados || [], // Asegurar que sea un arreglo
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "s-maxage=3600, stale-while-revalidate=3599", // Cache por 1 hora
        },
      }
    );
  } catch (error) {
    console.error("Error al obtener el artículo:", error);

    return new Response(
      JSON.stringify({ error: "Error interno del servidor." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    if (connection) connection.release();
  }
}
