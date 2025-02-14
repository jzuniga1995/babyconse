import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Definir rutas protegidas
  const protectedRoutes = ["/admin", "/admin/update-article"];

  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url)); // Redirigir si no es admin
    }
  }

  return NextResponse.next(); // Permitir acceso si es admin
}

export const config = {
  matcher: "/admin/:path*",
};
