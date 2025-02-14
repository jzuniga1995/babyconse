import { getSession } from "next-auth/react";

/**
 * Middleware para proteger rutas de API y verificar roles.
 * @param {Function} handler - La función que manejará la solicitud.
 * @param {Array} allowedRoles - Lista de roles permitidos (opcional).
 */
export function withAuth(handler, allowedRoles = []) {
  return async (req, res) => {
    // Permitir acceso sin autenticación a rutas específicas
    if (req.url === "/sitemap.xml") {
      return handler(req, res);
    }

    const session = await getSession({ req });

    // Si el usuario no está autenticado, devolver un error
    if (!session) {
      return res.status(401).json({ error: "No autorizado" });
    }

    // Si se especifican roles permitidos, verificar si el usuario tiene uno de ellos
    if (allowedRoles.length > 0 && !allowedRoles.includes(session.user.role)) {
      return res.status(403).json({ error: "Acceso prohibido" });
    }

    req.user = session.user; // Adjuntar datos del usuario a la request
    return handler(req, res);
  };
}
