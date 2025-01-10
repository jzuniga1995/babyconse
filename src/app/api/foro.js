import { getConnection } from "../../lib/db";
import withAuth from "../../lib/withAuth"; // Middleware para validar autenticación

async function handler(req, res) {
  try {
    const connection = await getConnection();

    if (req.method === "POST") {
      // Capturar datos del usuario autenticado y contenido de la publicación
      const { content } = req.body;
      const user = req.user; // Usuario autenticado gracias al middleware

      if (!content) {
        return res.status(400).json({ error: "El contenido es requerido" });
      }

      // Guardar publicación en la base de datos
      const [result] = await connection.execute(
        "INSERT INTO posts (user, content, likes) VALUES (?, ?, ?)",
        [user.name || user.email, content, 0] // Se guardan el nombre/correo, contenido y likes iniciales
      );

      res.status(201).json({
        id: result.insertId,
        user: user.name || user.email,
        content,
        likes: 0,
      });
    } else if (req.method === "GET") {
      // Obtener todas las publicaciones ordenadas por fecha
      const [rows] = await connection.execute(
        "SELECT id, user, content, likes, created_at FROM posts ORDER BY created_at DESC"
      );
      res.status(200).json(rows);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Método ${req.method} no permitido`);
    }

    connection.end();
  } catch (error) {
    console.error("Error en el manejo de publicaciones:", error);
    res.status(500).json({ error: "Error al manejar las publicaciones" });
  }
}

export default withAuth(handler); // Protegemos la API con autenticación
