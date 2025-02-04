import mysql from "mysql2/promise";

// Crear un pool de conexiones usando la variable DATABASE_URL
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL, // Usa DATABASE_URL directamente
  waitForConnections: true,
  connectionLimit: 10, // Máximo número de conexiones simultáneas
  queueLimit: 0, // Sin límite de solicitudes en cola
  idleTimeout: 60000, // Cerrar conexiones inactivas después de 60s (opcional)
});

// Opción 1: Usar el pool directamente para ejecutar consultas
export async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

// Opción 2: Obtener una conexión manualmente (si es necesario)
export async function getConnection() {
  const connection = await pool.getConnection();
  return connection;
}

// Cerrar el pool al finalizar la aplicación
process.on("SIGINT", async () => {
  console.log("Cerrando todas las conexiones del pool...");
  await pool.end();
  console.log("Conexiones cerradas. Saliendo...");
  process.exit(0);
});
