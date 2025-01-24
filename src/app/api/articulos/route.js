import { getConnection } from "../../lib/db";
import { generateSlug } from "../../utils/slugify";

// Manejar solicitudes GET para obtener todos los artículos
export async function GET(request) {
  let connection;

  try {
    connection = await getConnection();

    const [rows] = await connection.query(
      "SELECT id, title, slug, description, image, category FROM articulos"
    );

    return new Response(JSON.stringify({ data: rows }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener los artículos:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    if (connection) connection.release();
  }
}

// Manejar solicitudes POST para crear un nuevo artículo
export async function POST(request) {
  let connection;

  try {
    const body = await request.json();
    const { title, description, link, image, category, full_content } = body;

    // Validación de campos obligatorios
    if (!title || !description || !category) {
      return new Response(
        JSON.stringify({
          error: "El título, descripción y categoría son obligatorios.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generar el slug a partir del título
    const slug = generateSlug(title);

    connection = await getConnection();

    // Verificar si el slug ya existe
    const [existingSlug] = await connection.query(
      "SELECT id FROM articulos WHERE slug = ?",
      [slug]
    );

    if (existingSlug.length > 0) {
      return new Response(
        JSON.stringify({
          error: "El slug generado ya existe. Intenta con otro título.",
        }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    // Insertar el nuevo artículo en la base de datos
    const [result] = await connection.query(
      `INSERT INTO articulos (title, description, link, image, category, full_content, slug)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, description, link, image, category, full_content, slug]
    );

    return new Response(
      JSON.stringify({
        message: "Artículo creado con éxito",
        id: result.insertId,
        slug,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error al crear el artículo:", error);
    return new Response(
      JSON.stringify({ error: "Error al crear el artículo" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    if (connection) connection.release();
  }
}
