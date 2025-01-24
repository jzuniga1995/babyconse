"use client";

import Link from "next/link";
import { generateSlug } from "../utils/slugify"; // Importar la función reutilizable

// Definir categorías predeterminadas
const defaultCategorias = [
  {
    name: "Nutrición",
    image: "/images/nutricion.jpg",
    bgColor: "bg-green-50",
    textColor: "text-green-800",
  },
  {
    name: "Ejercicio",
    image: "/images/ejercicio.jpg",
    bgColor: "bg-blue-50",
    textColor: "text-blue-800",
  },
  {
    name: "Sueño",
    image: "/images/sueno.jpg",
    bgColor: "bg-purple-50",
    textColor: "text-purple-800",
  },
  {
    name: "Salud Mental",
    image: "/images/salud-mental.jpg",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-800",
  },
  {
    name: "Prevención",
    image: "/images/prevencion.jpg",
    bgColor: "bg-red-50",
    textColor: "text-red-800",
  },
];

export default function MenuCategorias({ categorias }) {
  // Usar las categorías predeterminadas si `categorias` no se pasa o no es un array
  const finalCategorias = Array.isArray(categorias) && categorias.length > 0 ? categorias : defaultCategorias;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-12">
        {finalCategorias.map((category, index) => (
          <Link
            key={index}
            href={`/categorias/${generateSlug(category.name)}`} // Generar el slug con la función importada
          >
            <div
              className={`relative p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer ${category.bgColor}`}
              style={{ height: "200px" }}
            >
              {/* Imagen de fondo */}
              <div className="absolute inset-0">
                <img
                  src={category.image || "/images/default.jpg"}
                  alt={`Categoría ${category.name}`}
                  className="w-full h-full object-cover rounded-xl opacity-80 hover:opacity-100 transition"
                />
              </div>
              {/* Filtro para texto legible */}
              <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl"></div>
              {/* Contenido */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <h3 className="text-2xl font-semibold text-white">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
