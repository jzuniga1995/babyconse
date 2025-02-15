import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * Middleware para proteger rutas de API y verificar roles.
 * @param {Function} handler - La función que manejará la solicitud.
 * @param {Array} allowedRoles - Lista de roles permitidos (opcional).
 */
export function withAuth(handler, allowedRoles = []) {
  return async (req) => {
    // Permitir acceso sin autenticación a rutas específicas
    if (req.nextUrl?.pathname === "/sitemap.xml") {
      return handler(req);
    }

    // Obtener sesión desde el backend (App Router)
    const session = await getServerSession(authOptions);

    // Si el usuario no está autenticado, devolver un error
    if (!session || !session.user) {
      return new Response(
        JSON.stringify({ error: "No autorizado" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Si se especifican roles permitidos, verificar si el usuario tiene uno de ellos
    if (allowedRoles.length > 0 && !allowedRoles.includes(session.user.role)) {
      return new Response(
        JSON.stringify({ error: "Acceso prohibido" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // Pasar el request al handler con la sesión del usuario
    return handler(req);
  };
}
