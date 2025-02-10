import { getConnection } from "../../lib/db";
import { generateSlug } from "../../utils/slugify";

// Manejar solicitudes GET para obtener artículos con soporte para paginación
export async function GET(request) {
  let connection;

  try {
    connection = await getConnection();

    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    const limit = Math.min(Math.max(parseInt(url.searchParams.get("limit"), 10) || 10, 1), 100);
    const offset = Math.max(parseInt(url.searchParams.get("offset"), 10) || 0, 0);

    let query = `
      SELECT 
        id, title, slug, description, image, category, meta_description, full_content, published_at, views
      FROM articulos
    `;
    let countQuery = `SELECT COUNT(*) as total FROM articulos`;
    const queryParams = [];

    if (category) {
      query += " WHERE category = ?";
      countQuery += " WHERE category = ?";
      queryParams.push(category);
    }

    query += " LIMIT ?, ?";
    queryParams.push(offset, limit);

    const [rows] = await connection.query(query, queryParams);
    const [totalRows] = await connection.query(countQuery, queryParams);

    return new Response(
      JSON.stringify({ data: rows, total: totalRows[0]?.total || 0 }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "s-maxage=3600, stale-while-revalidate=3599",
        },
      }
    );
  } catch (error) {
    console.error("Error al obtener los artículos:", error.message, error.stack);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    if (connection) connection.release();
  }
}

export async function POST(request) {
  let connection;

  try {
    const body = await request.json();
    const {
      title,
      description,
      link,
      image,
      category,
      full_content,
      meta_description,
      referencias,
    } = body;

    if (!title || !description || !category || !full_content) {
      console.error('Campos obligatorios faltantes:', { title, description, category, full_content });
      return new Response(
        JSON.stringify({
          error: 'El título, descripción, categoría y contenido son obligatorios.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const slug = generateSlug(title);

    connection = await getConnection();

    const [existingSlug] = await connection.query(
      'SELECT id FROM articulos WHERE slug = ?',
      [slug]
    );

    if (existingSlug.length > 0) {
      console.error('El slug ya existe:', slug);
      return new Response(
        JSON.stringify({ error: 'El slug generado ya existe. Intenta con otro título.' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const [result] = await connection.query(
      `INSERT INTO articulos (
        title, description, link, image, category, full_content, slug, meta_description
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        link || null,
        image || null,
        category,
        full_content,
        slug,
        meta_description || null,
      ]
    );

    const articuloId = result.insertId;

    if (Array.isArray(referencias) && referencias.length > 0) {
      const referenciaQueries = referencias.map((ref) => [
        articuloId,
        ref.title,
        ref.link,
      ]);

      const placeholders = referenciaQueries.map(() => '(?, ?, ?)').join(', ');
      const flatValues = referenciaQueries.flat();

      await connection.query(
        `INSERT INTO articulo_referencias (articulo_id, title, link) VALUES ${placeholders}`,
        flatValues
      );
    }

    console.log('Artículo y referencias creados con éxito.');
    return new Response(
      JSON.stringify({ message: 'Artículo creado con éxito', id: articuloId, slug }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error) {
    console.error('Error al crear el artículo:', error.message, error.stack);
    return new Response(
      JSON.stringify({ error: 'Error al crear el artículo.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  } finally {
    if (connection) connection.release();
  }
}
