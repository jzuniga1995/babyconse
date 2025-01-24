import { getConnection } from "../../lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// Manejo de solicitudes GET (obtener publicaciones con el conteo de comentarios)
export async function GET(req) {
  try {
    const connection = await getConnection();

    // Obtener parámetros de la URL
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page"), 10) || 1; // Página predeterminada: 1
    const limit = parseInt(searchParams.get("limit"), 10) || 20; // Límite predeterminado: 20
    const offset = (page - 1) * limit;

    // Validar que limit y offset sean números válidos
    if (isNaN(limit) || isNaN(offset)) {
      return new Response(
        JSON.stringify({ error: "Los parámetros 'limit' y 'page' deben ser números válidos" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Reemplazar directamente `limit` y `offset` en la consulta principal
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
      LIMIT ${connection.escape(limit)} OFFSET ${connection.escape(offset)}
    `;

    const [rows] = await connection.query(query);

    // Obtener el total de publicaciones para calcular las páginas
    const [countResult] = await connection.execute("SELECT COUNT(*) AS total FROM posts");
    const totalPosts = countResult[0].total;
    const totalPages = Math.ceil(totalPosts / limit);

    connection.release();


    return new Response(
      JSON.stringify({
        posts: rows,
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
  } catch (error) {
    console.error("Error al obtener publicaciones:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener publicaciones" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Manejo de solicitudes POST (crear una nueva publicación)
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(
        JSON.stringify({ error: "No estás autenticado" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { content } = await req.json();

    if (!content || content.trim() === "") {
      return new Response(
        JSON.stringify({ error: "El contenido es requerido" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const connection = await getConnection();
    const userName = session.user.name || session.user.email;

    const [result] = await connection.execute(
      "INSERT INTO posts (user_name, content, likes) VALUES (?, ?, ?)",
      [userName, content, 0]
    );
    connection.release();


    return new Response(
      JSON.stringify({
        id: result.insertId,
        user_name: userName,
        content,
        likes: 0,
        comment_count: 0, // Nueva publicación no tiene comentarios aún
        created_at: new Date().toISOString(),
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error al crear publicación:", error);
    return new Response(
      JSON.stringify({ error: "Error al crear publicación" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
