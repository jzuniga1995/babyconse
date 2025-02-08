import { getConnection } from "../../../lib/db";

export async function GET(request, context) {
  let connection;

  try {
    console.log("Resolviendo context.params...");
    const params = await context.params; // Resuelve context.params si es una promesa

    if (!params || typeof params !== "object") {
      console.error("Los parámetros no están definidos o no son válidos.");
      return new Response(
        JSON.stringify({ error: "Los parámetros no son válidos." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { categoria } = params;

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
      categoriaNombre = decodeURIComponent(categoria).replace(/-/g, " ").toLowerCase();
      console.log("Nombre de la categoría decodificado:", categoriaNombre);
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

    const [rows] = await connection.query(
      `SELECT 
         category AS name, 
         meta_description
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
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=3599",
      },
    });
  } catch (error) {
    console.error("Error interno del servidor:", error.message, error.stack);

    return new Response(
      JSON.stringify({ error: "Error interno del servidor." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    if (connection) {
      try {
        connection.release();
        console.log("Conexión liberada.");
      } catch (releaseError) {
        console.error("Error al liberar la conexión:", releaseError.message);
      }
    }
  }
}
