"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false); // Estado para mostrar u ocultar el banner
  const pathname = usePathname(); // Hook para obtener la ruta actual
  const excludedPaths = ["/politica", "/terminos"]; // Rutas donde no se muestra el banner

  useEffect(() => {
    // Verificar si la ruta actual está excluida
    const isExcluded = excludedPaths.some((path) => pathname.startsWith(path));
    if (isExcluded) {
      setIsVisible(false);
      return; // Salir si la ruta está excluida
    }

    // Revisar si el usuario ya aceptó/rechazó las cookies
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true); // Mostrar banner si no se ha dado consentimiento
    } else {
      setIsVisible(false); // Ocultar banner si ya hay un estado guardado
    }
  }, [pathname]); // Dependencia clara: actualiza si cambia la ruta

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true"); // Guardar el consentimiento
    setIsVisible(false); // Ocultar banner
    initializeNonEssentialCookies(); // Inicializar cookies no esenciales
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected"); // Guardar rechazo
    setIsVisible(false); // Ocultar banner
  };

  const initializeNonEssentialCookies = () => {
    console.log("Inicializando cookies no esenciales...");
    // Aquí puedes incluir el código para habilitar cookies o scripts como Google Analytics
  };

  // Si el banner no debe mostrarse, no renderiza nada
  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white py-4 px-4 sm:px-6 md:px-10 lg:px-16 flex flex-col sm:flex-row items-center sm:items-center justify-between z-50 gap-4 sm:gap-0"
      role="dialog"
      aria-labelledby="cookieConsentHeading"
      aria-describedby="cookieConsentText"
    >
      <h2 id="cookieConsentHeading" className="sr-only">
        Preferencias de cookies
      </h2>
      <p id="cookieConsentText" className="text-sm text-center sm:text-left">
        Este sitio utiliza cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestro{" "}
        <a href="/politica" className="underline text-green-400 hover:text-green-300">
          uso de cookies
        </a>.
      </p>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        <button
          onClick={handleAccept}
          className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-500 transition w-full sm:w-auto"
          aria-label="Aceptar cookies"
        >
          Aceptar
        </button>
        <button
          onClick={handleReject}
          className="bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-500 transition w-full sm:w-auto"
          aria-label="Rechazar cookies"
        >
          Rechazar
        </button>
      </div>
    </div>
  );
}
