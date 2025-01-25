"use client";

import Link from "next/link";
import { generateSlug } from "../utils/slugify"; // Importar la función reutilizable

// Definir categorías predeterminadas
const defaultCategorias = [
  {
    name: "Nutrición y Alimentación Saludable",
    image: "/images/nutricion.jpg",
    bgColor: "bg-green-50",
    textColor: "text-green-800",
  },
  {
    name: "Ejercicio y Bienestar Físico",
    image: "/images/pesas.jpg",
    bgColor: "bg-blue-50",
    textColor: "text-blue-800",
  },
  {
    name: "Salud Infantil y Familiar",
    image: "/images/saludinfantil.jpg",
    bgColor: "bg-purple-50",
    textColor: "text-purple-800",
  },
  {
    name: "Salud Mental y Emocional",
    image: "/images/saludmental.jpg",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-800",
  },
  {
    name: "Prevención y Cuidados Médicos",
    image: "/images/prevencion.jpg",
    bgColor: "bg-red-50",
    textColor: "text-red-800",
  },
  {
    name: "Enfermedades Crónicas y Condiciones de Salud",
    image: "/images/cronica.jpg",
    bgColor: "bg-red-50",
    textColor: "text-red-800",
  },
  {
    name: "Estilo de Vida Saludable",
    image: "/images/saludable.jpg",
    bgColor: "bg-red-50",
    textColor: "text-red-800",
  },
  {
    name: "Salud y Tecnología",
    image: "/images/smart.jpg",
    bgColor: "bg-red-50",
    textColor: "text-red-800",
  },



];

export default function MenuCategorias({ categorias }) {
  const finalCategorias =
    Array.isArray(categorias) && categorias.length > 0
      ? categorias
      : defaultCategorias;

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Explora Nuestras Categorías
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {finalCategorias.map((category, index) => (
          <Link
            key={index}
            href={`/categorias/${generateSlug(category.name)}`} // Generar el slug con la función importada
          >
            <div
              className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
              style={{ height: "250px" }}
            >
              {/* Imagen de fondo */}
              <img
                src={category.image || "/images/default.jpg"}
                alt={`Categoría ${category.name}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Filtro oscuro para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50 group-hover:opacity-60 transition duration-300"></div>
              {/* Contenido de la tarjeta */}
              <div className="relative z-10 flex items-center justify-center h-full">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white text-center px-4">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 bg-green-600 text-white py-8 px-6 rounded-xl text-center shadow-lg">
        <h3 className="text-2xl font-bold mb-4">
          ¿Listo para transformar tu salud?
        </h3>
        <p className="text-lg mb-6">
          Explora nuestras categorías y descubre consejos prácticos, artículos
          informativos y mucho más. ¡Empieza hoy a cuidar de ti!
        </p>
        <Link
          href="/articulos"
          className="inline-block bg-white text-green-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          Ver Todas las Categorías
        </Link>
      </div>
    </div>
  );
}
