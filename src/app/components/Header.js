"use client"; // Necesario para manejar estados en el cliente

import Link from "next/link";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import SideMenu from "./SideMenu";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const user = session?.user;

  return (
    <header className="bg-gradient-to-r from-green-500 via-green-600 to-teal-600 text-white shadow-md fixed top-0 w-full z-50">
<div className="container mx-auto flex items-center justify-between py-4 px-6">
  {/* Logo y Nombre */}
  <div className="flex items-center space-x-3">
    {/* ✅ Logo optimizado */}
    <Link href="/" className="flex items-center">
      <Image
        src="/logo.png" // Reemplázalo por el archivo final
        alt="SaludySer Logo"
        width={90} // 🔹 Aumentar el tamaño base
        height={90}
        className="w-15 h-15" // 🔹 Ajuste en Tailwind para mejor visualización
        priority
      />
    </Link>

    {/* ✅ Texto del logo con alineación mejorada */}
    <div className="flex flex-col">
      <Link href="/" className="text-3xl md:text-4xl font-bold tracking-wide">
        SaludySer
      </Link>
      <p className="text-sm md:text-base text-green-200 mt-1">
        Tu guía para el bienestar físico y mental
      </p>
    </div>
  </div>
 

        {/* Navegación en escritorio */}
        <nav className="hidden sm:flex items-center gap-8">
          <Link href="/" className="text-base md:text-lg hover:text-green-200 transition-all">
            Inicio
          </Link>
          <Link href="/articulos" className="text-base md:text-lg hover:text-green-200 transition-all">
            Artículos
          </Link>
          <Link href="/foro" className="text-base md:text-lg hover:text-green-200 transition-all">
            Foro
          </Link>
          <Link href="/contacto" className="text-base md:text-lg hover:text-green-200 transition-all">
            Contacto
          </Link>

          {status === "loading" ? (
            <button
              disabled
              className="bg-white text-gray-500 font-semibold px-4 py-2 rounded-full cursor-not-allowed"
            >
              Cargando sesión...
            </button>
          ) : user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm md:text-base text-green-200">
                Hola, {user.name}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-white text-green-600 font-semibold px-4 py-2 rounded-full hover:bg-green-100 transition-all"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google", { callbackUrl: window.location.href })}
              className="bg-white text-green-600 font-semibold px-4 py-2 rounded-full hover:bg-green-100 transition-all"
            >
              Iniciar sesión
            </button>
          )}
        </nav>

        {/* Botón Menú móvil */}
        <button
          onClick={() => setIsOpen(true)}
          className="block sm:hidden text-white focus:outline-none z-50"
          aria-label="Abrir menú"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Menú lateral móvil */}
        <SideMenu
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          user={user}
          isLoading={status === "loading"}
        />
      </div>
    </header>
  );
}
