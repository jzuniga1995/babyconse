import { getConnection } from "../../../lib/db";

export async function GET(request, context) {
  let connection;
  try {
    // Resolver context.params de forma asíncrona
    const params = await Promise.resolve(context.params);
    const categoria = params.categoria;

    if (!categoria) {
      return new Response(JSON.stringify({ error: "Categoría no proporcionada." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    connection = await getConnection();

    // Normalizar el slug de la categoría para comparación en la base de datos
    const categoriaNombre = decodeURIComponent(categoria).replace(/-/g, " ").toLowerCase();

    // Buscar datos de la categoría en la base de datos
    const [rows] = await connection.query(
      `SELECT 
         category AS name, 
         meta_description, 
         meta_keywords
       FROM articulos
       WHERE LOWER(category) = ?
       LIMIT 1`,
      [categoriaNombre]
    );

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ error: "Categoría no encontrada." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = rows[0];

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener datos de la categoría:", error.message);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    if (connection) connection.release();
  }
}
