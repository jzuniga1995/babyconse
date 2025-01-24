import { getConnection } from "../../../lib/db";

export async function GET(request, context) {
  let connection;

  try {
    const params = await Promise.resolve(context.params); // Resolver `params` explícitamente
    const { slug } = params;

    if (!slug) {
      console.error("Slug no proporcionado.");
      return new Response(
        JSON.stringify({ error: "Slug del artículo no proporcionado." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("Slug recibido en API:", slug);

    connection = await getConnection();

    const [rows] = await connection.query(
      `SELECT id, title, description, link, image, category, full_content
       FROM articulos
       WHERE slug = ?`,
      [slug]
    );

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ error: "Artículo no encontrado." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(rows[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener el artículo:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    if (connection) connection.release();
  }
}
