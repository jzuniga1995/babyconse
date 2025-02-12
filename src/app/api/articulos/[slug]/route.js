import { getConnection } from "../../../lib/db";

export async function GET(request, { params }) {
  let connection;

  try {
    const { slug } = params; // Obtener el slug desde la URL

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
         published_at, views, meta_description
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

// ✅ NUEVA FUNCIÓN PARA ACTUALIZAR EL ARTÍCULO (PUT)
export async function PUT(request, { params }) {
  let connection;
  try {
    const { slug } = params; // Obtener el slug desde la URL

    if (!slug) {
      return new Response(
        JSON.stringify({ error: "Slug no proporcionado." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await request.json();
    const { title, description, link, image, category, full_content, meta_description } = body;

    if (!title || !description || !category || !full_content) {
      return new Response(
        JSON.stringify({ error: "Todos los campos obligatorios deben estar completos." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    connection = await getConnection();

    // Verificar si el artículo con el slug existe
    const [existingArticle] = await connection.query(
      "SELECT id FROM articulos WHERE slug = ?",
      [slug]
    );

    if (existingArticle.length === 0) {
      return new Response(
        JSON.stringify({ error: "Artículo no encontrado." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const articuloId = existingArticle[0].id;

    // Actualizar los datos del artículo
    await connection.query(
      `UPDATE articulos 
       SET title = ?, description = ?, link = ?, image = ?, category = ?, full_content = ?, meta_description = ?
       WHERE slug = ?`,
      [title, description, link || null, image || null, category, full_content, meta_description || null, slug]
    );

    return new Response(
      JSON.stringify({ message: "Artículo actualizado con éxito", id: articuloId, slug }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error al actualizar el artículo:", error.message, error.stack);
    return new Response(
      JSON.stringify({ error: "Error al actualizar el artículo." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    if (connection) connection.release();
  }
}
