import { getConnection } from "../../lib/db";
import withAuth from "../../lib/withAuth"; // Middleware para validar autenticación

async function handler(req, res) {
  try {
    const connection = await getConnection();

    if (req.method === "POST") {
      // Incrementar los likes de una publicación
      const { postId } = req.body;

      if (!postId) {
        return res.status(400).json({ error: "El ID de la publicación es requerido" });
      }

      // Validar si la publicación existe
      const [rows] = await connection.execute("SELECT * FROM posts WHERE id = ?", [postId]);

      if (rows.length === 0) {
        return res.status(404).json({ error: "La publicación no existe" });
      }

      // Incrementar los likes
      await connection.execute("UPDATE posts SET likes = likes + 1 WHERE id = ?", [postId]);

      res.status(200).json({ message: "Like agregado correctamente" });
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Método ${req.method} no permitido`);
    }

    connection.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al manejar los likes" });
  }
}

export default withAuth(handler); // Aplicamos el middleware de autenticación
