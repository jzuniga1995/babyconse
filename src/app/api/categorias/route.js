import { getConnection } from "../../../lib/db";

export async function GET() {
  let connection;

  try {
    connection = await getConnection();

    // Consulta para obtener todas las categorías únicas
    const [rows] = await connection.query(`
      SELECT DISTINCT category AS slug
      FROM articulos
    `);

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener categorías:", error.message);
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    if (connection) connection.release();
  }
}
