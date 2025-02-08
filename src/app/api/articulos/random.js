import { pool } from "../../lib/db"; // Conexión a tu base de datos

export default async function handler(req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM articulos ORDER BY RAND() LIMIT 10;");
    res.status(200).json({ articulos: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener artículos aleatorios" });
  }
}
