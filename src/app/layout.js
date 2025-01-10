"use client";

import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Auth0Provider } from "@auth0/auth0-react";

export default function RootLayout({ children }) {
  const domain = "dev-70zkgn75bnwcf2et.us.auth0.com"; // Reemplaza con tu dominio de Auth0
  const clientId = "B28ePO06j1fWIVcEQCrJM0ecF4IZUJXT"; // Reemplaza con tu Client ID de Auth0

  return (
    <html lang="es">
      <body className="bg-gray-50 font-sans">
        {/* Configuración de Auth0Provider */}
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          authorizationParams={{
            redirect_uri: "http://localhost:3005", // URL local para desarrollo
          }}
        >
          <Header />
          <main className="min-h-[calc(100vh-64px)]">{children}</main>
          <Footer />
        </Auth0Provider>
      </body>
    </html>
  );
}
