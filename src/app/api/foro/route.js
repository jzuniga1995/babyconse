import { getConnection } from "../../lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// Manejo de solicitudes GET (obtener publicaciones con el conteo de comentarios)
export async function GET(req) {
  let connection; // Declarar la conexión fuera del bloque try
  try {
    connection = await getConnection();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page"), 10) || 1; // Página predeterminada: 1
    const limit = parseInt(searchParams.get("limit"), 10) || 20; // Límite predeterminado: 20
    const offset = (page - 1) * limit;

    // Validar que limit y offset sean números válidos
    if (limit <= 0 || offset < 0 || isNaN(limit) || isNaN(offset)) {
      return new Response(
        JSON.stringify({ error: "Parámetros de paginación inválidos." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Consulta con parámetros en lugar de interpolación
    const query = `
      SELECT 
        posts.id, 
        posts.user_name, 
        posts.content, 
        posts.likes, 
        posts.created_at,
        (SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id) AS comment_count
      FROM posts
      ORDER BY posts.created_at DESC
      LIMIT ? OFFSET ?
    `;
    const [rows] = await connection.execute(query, [limit, offset]);

    // Obtener el total de publicaciones para calcular las páginas
    const [countResult] = await connection.execute("SELECT COUNT(*) AS total FROM posts");
    const totalPosts = countResult[0].total;
    const totalPages = Math.ceil(totalPosts / limit);

    return new Response(
      JSON.stringify({
        posts: rows,
        pagination: {
          currentPage: page,
          totalPages,
          totalPosts,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error al obtener publicaciones:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener publicaciones." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    if (connection) connection.release(); // Asegura la liberación en cualquier caso
  }
}


// Manejo de solicitudes POST (crear una nueva publicación)
export async function POST(req) {
  let connection; // Declarar la conexión fuera del bloque try
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(
        JSON.stringify({ error: "No estás autenticado." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const { content } = await req.json();

    // Validar contenido
    if (!content || content.trim() === "" || content.length > 500) {
      return new Response(
        JSON.stringify({ error: "El contenido es requerido y no puede exceder 500 caracteres." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    connection = await getConnection();
    const userName = session.user.name || session.user.email;

    const [result] = await connection.execute(
      "INSERT INTO posts (user_name, content, likes) VALUES (?, ?, ?)",
      [userName, content, 0]
    );

    return new Response(
      JSON.stringify({
        id: result.insertId,
        user_name: userName,
        content,
        likes: 0,
        comment_count: 0, // Nueva publicación no tiene comentarios aún
        created_at: new Date().toISOString(),
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error al crear publicación:", error);
    return new Response(
      JSON.stringify({ error: "Error al crear publicación." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    if (connection) connection.release(); // Asegura la liberación en cualquier caso
  }
}
