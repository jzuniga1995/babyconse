"use client"; // Indica que este es un Client Component

import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CookieConsent from "./components/CookieConsent";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react"; // ✅ Importación de Vercel Analytics

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* ✅ Favicon */}
        <link rel="icon" href="/favicon.png" />
        {/* Opcional: Agregar más íconos o metadatos */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="bg-gray-50 font-sans">
        {/* Proveedor de sesión para manejar la autenticación */}
        <SessionProvider>
          <Header />
          <main className="min-h-[calc(100vh-64px)]">{children}</main>
          <Footer />
          <CookieConsent />
        </SessionProvider>

        {/* ✅ Analítica de Vercel */}
        <Analytics />
      </body>
    </html>
  );
}
