import { getConnection } from "../../lib/db";
import { generateSlug } from "../../utils/slugify";
import { withAuth } from "@/app/lib/withAuth";

// Función para manejar errores de respuesta
const errorResponse = (message, status = 500) => {
  console.error(`❌ ERROR ${status}: ${message}`);
  return new Response(
    JSON.stringify({ error: message }),
    { status, headers: { "Content-Type": "application/json" } }
  );
};

// ✅ Obtener artículos con paginación (GET) → Acceso público
export async function GET(request) {
  let connection;
  try {
    connection = await getConnection();
    console.log("✅ Conectado a la base de datos para obtener artículos.");

    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    const limit = Math.min(Math.max(parseInt(url.searchParams.get("limit"), 10) || 10, 1), 100);
    const offset = Math.max(parseInt(url.searchParams.get("offset"), 10) || 0, 0);

    let query = `SELECT id, title, slug, description, image, category, meta_description, full_content, published_at, views FROM articulos`;
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
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return errorResponse("Error interno al obtener artículos.");
  } finally {
    if (connection) connection.release();
  }
}

// ✅ Crear un nuevo artículo (POST) → SOLO ADMIN
export const POST = withAuth(async function (request) {
  let connection;
  try {
    const body = await request.json();
    console.log("📩 Datos recibidos:", body);

    const { title, description, link, image, category, full_content, meta_description, referencias } = body;

    if (![title, description, category, full_content].every(field => field?.trim())) {
      return errorResponse("El título, descripción, categoría y contenido son obligatorios.", 400);
    }

    const slug = generateSlug(title);
    connection = await getConnection();
    console.log("✅ Conectado a la base de datos para crear artículo.");

    // Verificar si el slug ya existe
    const [existingSlug] = await connection.query("SELECT id FROM articulos WHERE slug = ?", [slug]);
    if (existingSlug.length > 0) {
      return errorResponse("El slug generado ya existe. Intenta con otro título.", 409);
    }

    const [result] = await connection.query(
      `INSERT INTO articulos (title, description, link, image, category, full_content, slug, meta_description) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, link || null, image || null, category, full_content, slug, meta_description || null]
    );

    const articuloId = result.insertId;
    console.log(`✅ Artículo creado con ID: ${articuloId}`);

    if (Array.isArray(referencias) && referencias.length > 0) {
      const referenciaQueries = referencias.map(ref => [articuloId, ref.title, ref.link]);
      const placeholders = referenciaQueries.map(() => "(?, ?, ?)").join(", ");
      const flatValues = referenciaQueries.flat();

      await connection.query(`INSERT INTO articulo_referencias (articulo_id, title, link) VALUES ${placeholders}`, flatValues);
    }

    return new Response(
      JSON.stringify({ message: "Artículo creado con éxito", id: articuloId, slug }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ Error en POST /api/articulos:", error);
    return errorResponse("Error al crear el artículo.");
  } finally {
    if (connection) connection.release();
  }
}, ["admin"]); // Solo admin puede crear artículos

// ✅ Actualizar un artículo existente (PUT) → SOLO ADMIN
export const PUT = withAuth(async function (request) {
  let connection;
  try {
    const url = new URL(request.url);
    const slug = url.pathname.split("/").pop(); // ✅ Obtiene el slug correctamente
    const append = url.searchParams.get("append") === "true";

    if (!slug) {
      return errorResponse("El slug del artículo es obligatorio.", 400);
    }

    const body = await request.json();
    console.log("📩 Datos recibidos para actualización:", body);

    const { title, description, link, image, category, full_content, meta_description } = body;

    if (![title, description, category, full_content].every(field => field?.trim())) {
      return errorResponse("Todos los campos son obligatorios.", 400);
    }

    connection = await getConnection();
    console.log("✅ Conectado a la base de datos para actualizar artículo.");

    let contenidoFinal = full_content;

    if (append) {
      const [existingArticle] = await connection.query("SELECT full_content FROM articulos WHERE slug = ?", [slug]);

      if (existingArticle.length === 0) {
        return errorResponse("Artículo no encontrado.", 404);
      }

      contenidoFinal = `${existingArticle[0].full_content}\n\n${full_content}`;
    }

    await connection.query(
      `UPDATE articulos 
       SET title = ?, description = ?, link = ?, image = ?, category = ?, full_content = ?, meta_description = ?
       WHERE slug = ?`,
      [title, description, link || null, image || null, category, contenidoFinal, meta_description || null, slug]
    );

    console.log(`✅ Artículo actualizado con slug: ${slug}`);

    return new Response(
      JSON.stringify({ message: "Artículo actualizado con éxito", slug }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ Error en PUT /api/articulos:", error);
    return errorResponse("Error al actualizar el artículo.");
  } finally {
    if (connection) connection.release();
  }
}, ["admin"]); // Solo admin puede actualizar artículos
