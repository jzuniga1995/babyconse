import { getConnection } from "../../../lib/db";

export async function GET(request, context) {
  let connection;

  try {
    const params = await Promise.resolve(context.params);
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({ error: "ID del artículo no proporcionado." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    connection = await getConnection();

    // Obtener las referencias relacionadas con el artículo
    const [referencias] = await connection.query(
      `SELECT title, link FROM articulo_referencias WHERE articulo_id = ?`,
      [id]
    );

    return new Response(
      JSON.stringify({ references: referencias }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error al obtener las referencias:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    if (connection) connection.release();
  }
}
