"use client"; // Indica que este es un Client Component

import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CookieConsent from "./components/CookieConsent";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react"; // ✅ Importación de Vercel Analytics

export default function RootLayout({ children }) {
  const isClient = typeof window !== "undefined";
  const isSpecialRoute = isClient
    ? ["/sitemap.xml", "/robots.txt"].includes(window.location.pathname)
    : false;

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
