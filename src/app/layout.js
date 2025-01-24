"use client"; // Indica que este es un Client Component

import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 font-sans">
        {/* Proveedor de sesión para manejar la autenticación */}
        <SessionProvider>
          <Header />
          <main className="min-h-[calc(100vh-64px)]">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
