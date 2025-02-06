"use client"; // Indica que este es un Client Component

import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CookieConsent from "./components/CookieConsent";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react"; // ✅ Importación de Vercel Analytics

export default function RootLayout({ children }) {
  // Detectar si la ruta actual es una ruta especial (como sitemap.xml o robots.txt)
  const isSpecialRoute =
    typeof window !== "undefined" &&
    ["/sitemap.xml", "/robots.txt"].includes(window.location.pathname);

  return (
    <html lang="es">
      <head>
        {/* ✅ Favicon */}
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className="bg-gray-50 font-sans">
        {/* Excluir componentes globales en rutas especiales */}
        {!isSpecialRoute && (
          <SessionProvider>
            <Header />
            <main className="min-h-[calc(100vh-64px)]">{children}</main>
            <Footer />
            <CookieConsent />
          </SessionProvider>
        )}

        {/* Mostrar solo el contenido sin layout en rutas especiales */}
        {isSpecialRoute && <main>{children}</main>}

        {/* ✅ Analítica de Vercel (excluida en rutas especiales) */}
        {!isSpecialRoute && <Analytics />}
      </body>
    </html>
  );
}
