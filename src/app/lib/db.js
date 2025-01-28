import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  idleTimeout: 60000, // Opcional: cerrar conexiones inactivas después de 60s
});

// Opción 1: Usar el pool directamente
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
