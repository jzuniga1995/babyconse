import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getConnection } from "../../lib/db";

// Manejo de solicitudes POST (dar o quitar like)
export async function POST(req) {
  let connection; // Declarar la conexión fuera del bloque try
  try {
    // Verificar sesión
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(
        JSON.stringify({ error: "No estás autenticado" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Obtener datos de la solicitud
    const { id, isComment } = await req.json();
    if (!id || typeof id !== "number") {
      return new Response(
        JSON.stringify({ error: "El ID es requerido y debe ser un número válido" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    connection = await getConnection(); // Obtener conexión del pool

    if (isComment) {
      // Manejo de likes para comentarios
      const [existingLike] = await connection.execute(
        "SELECT 1 FROM likes WHERE comment_id = ? AND user_email = ?",
        [id, session.user.email]
      );

      if (existingLike.length > 0) {
        // Si ya existe, eliminar el like
        await connection.execute(
          "DELETE FROM likes WHERE comment_id = ? AND user_email = ?",
          [id, session.user.email]
        );
        await connection.execute(
          "UPDATE comments SET likes = GREATEST(likes - 1, 0) WHERE id = ?",
          [id]
        );
      } else {
        // Si no existe, agregar un nuevo like
        await connection.execute(
          "INSERT INTO likes (comment_id, user_email) VALUES (?, ?)",
          [id, session.user.email]
        );
        await connection.execute(
          "UPDATE comments SET likes = likes + 1 WHERE id = ?",
          [id]
        );
      }

      // Obtener el comentario actualizado
      const [updatedComment] = await connection.execute(
        "SELECT id, likes FROM comments WHERE id = ?",
        [id]
      );

      return new Response(JSON.stringify(updatedComment[0]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      // Manejo de likes para posts
      const [existingLike] = await connection.execute(
        "SELECT 1 FROM likes WHERE post_id = ? AND user_email = ?",
        [id, session.user.email]
      );

      if (existingLike.length > 0) {
        // Si ya existe, eliminar el like
        await connection.execute(
          "DELETE FROM likes WHERE post_id = ? AND user_email = ?",
          [id, session.user.email]
        );
        await connection.execute(
          "UPDATE posts SET likes = GREATEST(likes - 1, 0) WHERE id = ?",
          [id]
        );
      } else {
        // Si no existe, agregar un nuevo like
        await connection.execute(
          "INSERT INTO likes (post_id, user_email) VALUES (?, ?)",
          [id, session.user.email]
        );
        await connection.execute(
          "UPDATE posts SET likes = likes + 1 WHERE id = ?",
          [id]
        );
      }

      // Obtener el post actualizado
      const [updatedPost] = await connection.execute(
        "SELECT id, likes FROM posts WHERE id = ?",
        [id]
      );

      return new Response(JSON.stringify(updatedPost[0]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error al manejar los likes:", error);
    return new Response(
      JSON.stringify({ error: "Error al manejar los likes" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    if (connection) {
      try {
        connection.release(); // Liberar conexión en cualquier caso
      } catch (releaseError) {
        console.error("Error al liberar la conexión:", releaseError);
      }
    }
  }
}
