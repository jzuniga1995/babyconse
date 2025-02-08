"use client"; // Indica que este es un Client Component

import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CookieConsent from "./components/CookieConsent";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import { usePathname } from "next/navigation";

// Determinar si una ruta es especial basada en las props del componente
function isSpecialRoute(pathname) {
  const specialRoutes = ["/sitemap.xml", "/robots.txt"];
  return specialRoutes.includes(pathname);
}

// Función para generar el título dinámico
function generateTitle(pathname) {
  switch (pathname) {
    case "/":
      return "Inicio | Salud y Ser | Guías de Bienestar Físico y Mental";
    case "/articulos":
      return "Artículos | Salud y Ser | Información de Salud y Bienestar";
    case "/contacto":
      return "Contacto | Salud y Ser | Ponte en Contacto con Nosotros";
    default:
      return "Salud y Ser | Bienestar Físico y Mental";
  }
}

// Función para determinar si la página tiene una meta descripción personalizada
function hasCustomMetaDescription(pathname) {
  // Rutas dinámicas a considerar
  const dynamicRoutes = ["/articulos/[slug]", "/categorias/[categoria]"];

  // Verificar coincidencias
  for (const route of dynamicRoutes) {
    const routeBase = route.replace(/\[.*?\]/g, ""); // Remover dinámicos
    if (pathname.startsWith(routeBase)) return true;
  }

  // Rutas estáticas
  const staticRoutes = ["/articulos"];
  return staticRoutes.includes(pathname);
}

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Usar el hook para obtener la ruta actual
  const specialRoute = isSpecialRoute(pathname);

  const title = generateTitle(pathname); // Generar título dinámico
  const includeMetaDescription = !hasCustomMetaDescription(pathname);

  return (
    <html lang="es">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Título dinámico */}
        <title>{title}</title>

        {/* Meta descripción solo si es necesario */}
        {includeMetaDescription && (
          <meta
            name="description"
            content="Explora guías y consejos prácticos sobre salud, bienestar físico y mental."
          />
        )}
      </head>
      <body className="bg-gray-50 font-sans">
        {!specialRoute && (
          <SessionProvider>
            <Header />
            <main className="min-h-[calc(100vh-64px)]">{children}</main>
            <Footer />
            <CookieConsent />
            <Analytics />
          </SessionProvider>
        )}
        {specialRoute && <main>{children}</main>}
      </body>
    </html>
  );
}
