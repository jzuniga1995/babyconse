import { getConnection } from "../../../lib/db";

export async function GET(request, context) {
  let connection;

  try {
    // Log de parámetros iniciales
    console.log("context.params:", context.params);

    const { categoria } = context.params;

    // Validar el parámetro `categoria`
    if (!categoria || typeof categoria !== "string" || categoria.trim() === "") {
      console.warn("Categoría no válida o no proporcionada.");
      return new Response(
        JSON.stringify({ error: "Categoría no válida o no proporcionada." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    connection = await getConnection();
    console.log("Conexión a la base de datos establecida.");

    let categoriaNombre;

    try {
      categoriaNombre = decodeURIComponent(categoria)
        .replace(/-/g, " ")
        .toLowerCase();
    } catch (error) {
      console.error("Error al decodificar la categoría:", error.message);
      return new Response(
        JSON.stringify({ error: "Categoría no válida o malformada." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log("Nombre de la categoría decodificado:", categoriaNombre);

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

    console.log("Resultados de la consulta:", rows);

    if (rows.length === 0) {
      console.warn("Categoría no encontrada:", categoriaNombre);
      return new Response(
        JSON.stringify({ error: "Categoría no encontrada." }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = rows[0];

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
