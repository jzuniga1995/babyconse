import { getConnection } from "../../../lib/db";

export async function GET(request, context) {
  let connection;

  try {
    // Resolver el parámetro `categoria`
    const { categoria } = context.params;

    // Validar el parámetro `categoria`
    if (!categoria || typeof categoria !== "string" || categoria.trim() === "") {
      return new Response(
        JSON.stringify({ error: "Categoría no válida o no proporcionada." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    connection = await getConnection();

    // Normalizar el slug de la categoría para búsqueda
    const categoriaNombre = decodeURIComponent(categoria)
      .replace(/-/g, " ")
      .toLowerCase();

    // Consultar la base de datos para la categoría
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
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = rows[0];

    // Respuesta exitosa con datos
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=3599", // Cache por 1 hora
      },
    });
  } catch (error) {
    console.error("Error al obtener datos de la categoría:", error.message, error.stack);

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
