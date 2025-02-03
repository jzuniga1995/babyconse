"use client"; // Indica que este componente es un Client Component

import Link from "next/link";
import QuickStats from "./QuickStats";
import SocialLinks from "./SocialLinks";
import { signIn, signOut } from "next-auth/react";

export default function SideMenu({ isOpen, onClose, user, isLoading }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-green-700 text-white z-40 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } w-3/4 max-w-xs shadow-lg`}
    >
      {/* Botón de cierre */}
      <button
        className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
        onClick={onClose}
        aria-label="Cerrar menú"
      >
        ✖
      </button>

      {/* Contenido del Menú */}
      <div className="p-6 flex flex-col justify-between h-full">
        {/* Información del Usuario */}
        <div className="text-center mb-8">
          {isLoading ? (
            <p className="text-lg">Cargando...</p>
          ) : user ? (
            <div className="space-y-4">
              <p className="text-sm text-green-200">Hola, {user.name}</p>
              <button
                onClick={() => {
                  onClose();
                  signOut();
                }}
                className="bg-white text-green-600 font-semibold px-4 py-2 rounded-full hover:bg-green-100 transition-all"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onClose();
                signIn("google");
              }}
              className="bg-white text-green-600 font-semibold px-4 py-2 rounded-full hover:bg-green-100 transition-all"
            >
              Iniciar sesión
            </button>
          )}
        </div>

        {/* Enlaces principales */}
        <nav className="mt-6">
          <ul className="space-y-6">
            {[
              { href: "/", label: "Inicio", icon: "M3 10h11M9 21V3M9 21l-6-6m6 6l6-6" },
              { href: "/articulos", label: "Artículos", icon: "M3 5h16M8 5V3M16 5V3M5 15h14" },
              { href: "/foro", label: "Foro", icon: "M3 6l3 6h9l3-6M4 16h16" },
              { href: "/contacto", label: "Contacto", icon: "M3 6h18M3 6l9 9 9-9" },
            ].map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="flex items-center text-lg hover:text-green-200 transition-all"
                  onClick={onClose}
                  aria-label={`Ir a ${link.label}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5 mr-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={link.icon}
                    />
                  </svg>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Métricas rápidas */}
        <div className="mt-6 border-t border-green-600 pt-6">
          <QuickStats />
        </div>

        {/* Redes sociales */}
        <div className="mt-6">
          <SocialLinks />
        </div>

        {/* Botón destacado */}
        <div className="mt-6 text-center">
          <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 px-4 py-2 rounded-lg font-semibold shadow-lg hover:from-yellow-500 hover:to-yellow-600 transition-all">
            ¡Suscríbete ahora!
          </button>
        </div>
      </div>
    </div>
  );
}
