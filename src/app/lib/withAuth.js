import { getSession } from "next-auth/react";

/**
 * Middleware para proteger rutas específicas.
 */
export function withAuth(handler) {
  return async (req, res) => {
    // Permitir acceso sin autenticación a rutas específicas
    if (req.url === "/sitemap.xml") {
      return handler(req, res);
    }

    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: "No autorizado" });
    }

    req.user = session.user; // Adjuntar datos del usuario a la request
    return handler(req, res);
  };
}
