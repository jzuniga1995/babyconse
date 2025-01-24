"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { generateSlug } from "../utils/slugify"

export default function ArticulosRandom({ articulos }) {
  const [randomArticles, setRandomArticles] = useState([]);

  // Función para seleccionar 10 artículos aleatorios
  const selectRandomArticles = () => {
    if (articulos.length > 0) {
      const shuffled = articulos.sort(() => 0.5 - Math.random());
      setRandomArticles(shuffled.slice(0, 10));
    }
  };

  // Actualizar los artículos aleatorios cada 1 minuto
  useEffect(() => {
    selectRandomArticles();
    const interval = setInterval(() => {
      selectRandomArticles();
    }, 60000); // 1 minuto

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, [articulos]);

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {randomArticles.map((articulo) => (
        <div
          key={articulo.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
        >
          <img
            src={articulo.image || "/images/default.jpg"}
            alt={articulo.title || "Imagen del artículo"}
            className="h-48 w-full object-cover"
          />
          <div className="p-4">
            {/* Título con enlace */}
            <Link
              href={`/articulos/${generateSlug(articulo.title)}`}
              className="block text-xl font-semibold text-gray-800 hover:text-blue-500 transition"
            >
              {articulo.title || "Título no disponible"}
            </Link>
            <p className="text-gray-600 mt-2">
              {articulo.description || "Descripción no disponible"}
            </p>
            {/* Enlace "Leer más" */}
            <Link
              href={`/articulos/${generateSlug(articulo.title)}`}
              className="inline-block mt-4 text-blue-500 hover:text-blue-700"
            >
              Leer más →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
