import { getSession } from "@auth0/nextjs-auth0";

export default function withAuth(handler) {
  return async (req, res) => {
    // Excluir rutas específicas como sitemap.xml
    if (req.url === "/sitemap.xml") {
      return handler(req, res); // Permitir acceso sin validación de sesión
    }

    const session = getSession(req, res);

    if (!session) {
      return res.status(401).json({ error: "No autorizado" });
    }

    req.user = session.user; // Añade datos del usuario al request
    return handler(req, res);
  };
}
