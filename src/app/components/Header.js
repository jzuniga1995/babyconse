"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const user = session?.user;

  return (
    <header className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white shadow-md relative z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex flex-col">
          <Link href="/" className="text-3xl font-bold tracking-wide">
            Salud y Ser
          </Link>
          <p className="text-sm text-green-200">
            Tu guía para el bienestar físico y mental
          </p>
        </div>

        {/* Botón Menú móvil */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block sm:hidden text-white focus:outline-none z-50"
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
                  ? "M6 18L18 6M6 6l12 12" // Icono de "Cerrar" (X)
                  : "M4 6h16M4 12h16M4 18h16" // Icono de "Menú" (hamburguesa)
              }
            />
          </svg>
        </button>

        {/* Navegación */}
        <nav
          className={`absolute top-0 left-0 w-full bg-green-600 sm:bg-transparent sm:static sm:w-auto sm:flex sm:items-center sm:gap-8 z-40 transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          } sm:opacity-100 sm:visible`}
        >
          <Link
            href="/"
            className="block px-4 py-2 text-lg hover:text-green-200 sm:px-6"
            onClick={() => setIsOpen(false)}
          >
            Inicio
          </Link>
          <Link
            href="/articulos"
            className="block px-4 py-2 text-lg hover:text-green-200 sm:px-6"
            onClick={() => setIsOpen(false)}
          >
            Artículos
          </Link>
          <Link
            href="/foro"
            className="block px-4 py-2 text-lg hover:text-green-200 sm:px-6"
            onClick={() => setIsOpen(false)}
          >
            Foro
          </Link>
          <Link
            href="/contacto"
            className="block px-4 py-2 text-lg hover:text-green-200 sm:px-6"
            onClick={() => setIsOpen(false)}
          >
            Contacto
          </Link>
          {isLoading ? (
            <p className="text-white px-4 py-2">Cargando...</p>
          ) : user ? (
            <div className="flex flex-col sm:flex-row items-center gap-4 px-4 sm:px-6">
              <span className="text-sm sm:text-lg text-green-200">
                Hola, {user.name}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-white text-green-600 font-semibold px-4 py-2 rounded-full hover:bg-green-100 transition-all"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="mt-4 block sm:mt-0 sm:inline-block bg-white text-green-600 font-semibold px-4 py-2 rounded-full hover:bg-green-100 transition-all"
            >
              Iniciar sesión
            </button>
          )}
        </nav>
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
