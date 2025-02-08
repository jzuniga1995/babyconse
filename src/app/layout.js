"use client"; // Indica que este es un Client Component

import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CookieConsent from "./components/CookieConsent";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import { usePathname } from "next/navigation"; // Hook recomendado para obtener la ruta

// Determinar si una ruta es especial basada en las props del componente
function isSpecialRoute(pathname) {
  const specialRoutes = ["/sitemap.xml", "/robots.txt"];
  return specialRoutes.includes(pathname);
}

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Usar el hook para obtener la ruta actual
  const specialRoute = isSpecialRoute(pathname);

  return (
    <html lang="es">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Meta */}
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Explora guías y consejos prácticos sobre salud, bienestar físico y mental."
        />
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
