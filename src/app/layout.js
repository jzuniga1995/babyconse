"use client";

import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { UserProvider } from "@auth0/nextjs-auth0"; // Asegúrate de que esta línea esté correcta

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 font-sans">
        <UserProvider>
          <Header />
          <main className="min-h-[calc(100vh-64px)]">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
