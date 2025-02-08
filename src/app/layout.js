"use client"; // Indica que este es un Client Component

import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CookieConsent from "./components/CookieConsent";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react"; // ✅ Importación de Vercel Analytics

// Determinar si una ruta es especial basada en las props del componente
function isSpecialRoute(pathname) {
  const specialRoutes = ["/sitemap.xml", "/robots.txt"];
  return specialRoutes.includes(pathname);
}

export default function RootLayout({ children }) {
  // Obtener la ruta actual del servidor o del cliente (usando props dinámicas)
  const pathname =
    typeof window !== "undefined"
      ? window.location.pathname // Cliente
      : ""; // Servidor (puedes ajustar si pasas props con la ruta)

  const specialRoute = isSpecialRoute(pathname);

  return (
    <html lang="es">
      <head>
        {/* ✅ Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        <meta charSet="UTF-8" />
        <meta name="description" content="Guías de bienestar físico y mental en Salud y Ser." />
      </head>
      <body className="bg-gray-50 font-sans">
        {/* Excluir componentes globales en rutas especiales */}
        {!specialRoute && (
          <SessionProvider>
            <Header />
            <main className="min-h-[calc(100vh-64px)]">{children}</main>
            <Footer />
            <CookieConsent />
          </SessionProvider>
        )}

        {/* Mostrar solo el contenido sin layout en rutas especiales */}
        {specialRoute && <main>{children}</main>}

        {/* ✅ Analítica de Vercel (excluida en rutas especiales) */}
        {!specialRoute && <Analytics />}
      </body>
    </html>
  );
}
