"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { generateSlug } from "../utils/slugify";

export default function ArticulosRandom({ articulos }) {
  const [randomArticles, setRandomArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);

  // Función para seleccionar artículos aleatorios
  const selectRandomArticles = () => {
    if (articulos.length > 0) {
      const shuffled = [...articulos].sort(() => 0.5 - Math.random());
      setFeaturedArticle(shuffled[0]); // Seleccionar un artículo destacado
      setRandomArticles(shuffled.slice(1, 10)); // Seleccionar el resto
    }
  };

  useEffect(() => {
    selectRandomArticles();
    const interval = setInterval(() => {
      selectRandomArticles();
    }, 60000); // Actualiza cada 1 minuto

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, [articulos]);

  if (!featuredArticle || randomArticles.length === 0) {
    return (
      <p className="text-center text-gray-600">No hay artículos disponibles.</p>
    );
  }

  return (
    <>
      {/* Artículo Destacado */}
      <Link
        href={`/articulos/${generateSlug(featuredArticle.title)}`}
        className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition mb-12"
      >
        <img
          src={featuredArticle.image || "/images/default.jpg"}
          alt={featuredArticle.title || "Imagen del artículo"}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h4 className="text-2xl font-semibold text-gray-800 hover:text-blue-500 transition">
            {featuredArticle.title || "Título no disponible"}
          </h4>
          <p className="text-gray-600 mt-3">
            {featuredArticle.description || "Descripción no disponible"}
          </p>
          <span className="inline-block mt-4 text-blue-500 hover:text-blue-700">
            Leer más →
          </span>
        </div>
      </Link>

      {/* Otros Artículos */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {randomArticles.map((articulo) => (
          <Link
            key={articulo.id}
            href={`/articulos/${generateSlug(articulo.title)}`}
            className="group block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={articulo.image || "/images/default.jpg"}
              alt={articulo.title || "Imagen del artículo"}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold text-gray-800 group-hover:text-blue-500 transition">
                {articulo.title || "Título no disponible"}
              </h4>
              <p className="text-gray-600 mt-2">
                {articulo.description || "Descripción no disponible"}
              </p>
              <span className="inline-block mt-4 text-blue-500 group-hover:text-blue-700">
                Leer más →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
