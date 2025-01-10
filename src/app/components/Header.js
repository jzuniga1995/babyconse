"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white shadow-md relative z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold tracking-wide">
          Guía para Padres
        </Link>

        {/* Botón Menú móvil */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="block sm:hidden text-white focus:outline-none"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isOpen
                  ? "M6 18L18 6M6 6l12 12" // Icono de "Cerrar"
                  : "M4 6h16M4 12h16M4 18h16" // Icono de "Menú"
              }
            />
          </svg>
        </button>

        {/* Navegación */}
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } absolute top-0 left-0 w-full bg-teal-600 sm:bg-transparent sm:static sm:w-auto sm:flex sm:items-center sm:gap-8 sm:block z-40`}
        >
          {/* Botón para cerrar en el menú móvil */}
          <button
            onClick={() => setIsOpen(false)}
            className="block sm:hidden text-white text-right py-4 px-6 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Enlaces */}
          <Link
            href="/"
            className="block px-4 py-2 text-lg sm:text-white hover:text-teal-200 sm:hover:text-teal-200"
            onClick={() => setIsOpen(false)}
          >
            Inicio
          </Link>
          <Link
            href="/consejos"
            className="block px-4 py-2 text-lg sm:text-white hover:text-teal-200 sm:hover:text-teal-200"
            onClick={() => setIsOpen(false)}
          >
            Consejos
          </Link>
          <Link
            href="/comunidad"
            className="block px-4 py-2 text-lg sm:text-white hover:text-teal-200 sm:hover:text-teal-200"
            onClick={() => setIsOpen(false)}
          >
            Comunidad
          </Link>
          <Link
            href="/contacto"
            className="block px-4 py-2 text-lg sm:text-white hover:text-teal-200 sm:hover:text-teal-200"
            onClick={() => setIsOpen(false)}
          >
            Contacto
          </Link>
        </nav>

        {/* Botón de registro/inicio de sesión */}
        {isAuthenticated ? (
          <div className="hidden sm:flex items-center gap-4">
            <p className="text-white">Hola, {user?.name || "Usuario"}</p>
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              className="bg-white text-teal-600 font-semibold px-5 py-2 rounded-full hover:bg-teal-100 transition-all"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <button
            onClick={() => loginWithRedirect()}
            className="hidden sm:inline-block bg-white text-teal-600 font-semibold px-5 py-2 rounded-full hover:bg-teal-100 transition-all"
          >
            Regístrate
          </button>
        )}
      </div>

      {/* Fondo oscuro para cerrar el menú móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 sm:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </header>
  );
}
