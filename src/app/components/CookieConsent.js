"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname(); // Hook se ejecuta siempre

  // Lista de rutas donde el banner no debe mostrarse
  const excludedPaths = ["/politica", "/terminos"];

  useEffect(() => {
    // Verificar si la ruta está excluida
    if (excludedPaths.includes(pathname)) {
      setIsVisible(false); // No mostrar el banner en rutas excluidas
      return;
    }

    // Mostrar el banner si no se ha aceptado antes
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
      document.body.style.paddingBottom = "64px"; // Ajuste dinámico del espacio
    }

    return () => {
      document.body.style.paddingBottom = "0px"; // Restaurar espacio
    };
  }, [pathname]); // Dependencia del pathname

  // Manejar la aceptación de cookies
  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
    document.body.style.paddingBottom = "0px"; // Restaurar espacio
    // Inicializar cookies no esenciales (por ejemplo, Google Analytics)
    console.log("Cookies no esenciales habilitadas");
  };

  // Si no es visible, no renderizar nada
  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white py-4 px-6 flex items-center justify-between z-50"
      role="dialog"
      aria-live="polite"
    >
      <p className="text-sm">
        Este sitio utiliza cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestro{" "}
        <a href="/politica" className="underline text-green-400 hover:text-green-300">
          uso de cookies
        </a>.
      </p>
      <button
        onClick={handleAccept}
        className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-500 transition"
      >
        Aceptar
      </button>
    </div>
  );
}
