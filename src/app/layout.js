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

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Obtener la ruta actual
  const specialRoute = isSpecialRoute(pathname);

  return (
    <html lang="es">
      <head>
        {/* Favicon */}
       {/* Favicon */}
  <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
  <link rel="shortcut icon" href="/logo.png" />

        {/* 🚨 Se eliminó el <title> global para evitar duplicados */}
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
