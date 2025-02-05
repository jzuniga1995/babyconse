import { getConnection } from "../../../lib/db";

export async function GET(request, context) {
  let connection;

  try {
    // 🔴 Resolver `context.params` como una promesa
    const resolvedParams = await context.params; // Resolver la promesa de params
    const { id } = resolvedParams; // Extraer `id` de los parámetros resueltos

    // Validar que el ID es un número entero positivo
    if (!id || isNaN(parseInt(id, 10)) || parseInt(id, 10) <= 0) {
      return new Response(
        JSON.stringify({ error: "ID del artículo no válido." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    connection = await getConnection();

    // Obtener las referencias relacionadas con el artículo
    const [referencias] = await connection.query(
      `SELECT title, link 
       FROM articulo_referencias 
       WHERE articulo_id = ?`,
      [parseInt(id, 10)]
    );

    return new Response(
      JSON.stringify({ references: referencias || [] }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "s-maxage=3600, stale-while-revalidate=3599", // Cachea por 1 hora
        },
      }
    );
  } catch (error) {
    console.error("Error al obtener las referencias:", error.message, error.stack);

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
