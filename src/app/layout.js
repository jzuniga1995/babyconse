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
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

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
