import { getConnection } from "../../lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// Manejo de solicitudes en la ruta /api/comments
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");
    const page = parseInt(searchParams.get("page"), 10) || 1;
    const limit = parseInt(searchParams.get("limit"), 10) || 20;
    const offset = (page - 1) * limit;

    const connection = await getConnection();

    if (postId) {
      // Obtener comentarios de una publicación específica
      const [comments] = await connection.execute(
        "SELECT id, post_id, user_name, content, likes, created_at FROM comments WHERE post_id = ? ORDER BY created_at DESC",
        [postId]
      );

      connection.release();

      return new Response(JSON.stringify(comments), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      // Obtener publicaciones con conteo de comentarios
      const [posts] = await connection.execute(
        `
        SELECT 
          posts.id, 
          posts.user_name, 
          posts.content, 
          posts.likes, 
          posts.created_at, 
          COUNT(comments.id) AS comment_count
        FROM posts
        LEFT JOIN comments ON posts.id = comments.post_id
        GROUP BY posts.id
        ORDER BY posts.created_at DESC
        LIMIT ? OFFSET ?
        `,
        [limit, offset]
      );

      const [countResult] = await connection.execute("SELECT COUNT(*) AS total FROM posts");
      const totalPosts = countResult[0].total;
      const totalPages = Math.ceil(totalPosts / limit);

      connection.release();

      return new Response(
        JSON.stringify({
          posts,
          pagination: {
            currentPage: page,
            totalPages,
            totalPosts,
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener datos" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(
        JSON.stringify({ error: "No estás autenticado" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const { postId, content } = await req.json();

    if (!postId || !content.trim()) {
      return new Response(
        JSON.stringify({ error: "El ID de la publicación y el contenido son requeridos" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const connection = await getConnection();
    const userName = session.user.name || session.user.email;

    const [result] = await connection.execute(
      "INSERT INTO comments (post_id, user_name, content) VALUES (?, ?, ?)",
      [postId, userName, content]
    );

    connection.release();

    return new Response(
      JSON.stringify({
        id: result.insertId,
        post_id: postId,
        user_name: userName,
        content,
        created_at: new Date().toISOString(),
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error al crear comentario:", error);
    return new Response(
      JSON.stringify({ error: "Error al crear comentario" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
