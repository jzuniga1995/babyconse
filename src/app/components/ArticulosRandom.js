"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ArticulosRandom() {
  const [randomArticles, setRandomArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);

  const fetchRandomArticles = async () => {
    try {
      const response = await fetch("/api/articulos/random");
      if (!response.ok) throw new Error("Error al obtener artículos aleatorios.");
      const data = await response.json();
      if (data.articulos.length > 0) {
        setFeaturedArticle(data.articulos[0]);
        setRandomArticles(data.articulos.slice(1));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchRandomArticles();
    const interval = setInterval(() => {
      fetchRandomArticles();
    }, 60000); // Refrescar cada 60 segundos
    return () => clearInterval(interval);
  }, []);

  if (!featuredArticle || randomArticles.length === 0) {
    return <p className="text-center text-gray-600">No hay artículos disponibles.</p>;
  }

  return (
    <>
      {/* Artículo Destacado */}
      <Link
        href={`/articulos/${featuredArticle.slug}`}
        className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition mb-12"
      >
        <div className="relative w-full h-64">
          <Image
            src={featuredArticle.image || "/images/default.jpg"}
            alt={featuredArticle.title || "Imagen del artículo"}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-6">
          <h4 className="text-2xl font-semibold text-gray-800 hover:text-green-500 transition">
            {featuredArticle.title || "Título no disponible"}
          </h4>
          <p className="text-gray-600 mt-3">
            {featuredArticle.description || "Descripción no disponible"}
          </p>
          <span className="inline-block mt-4 text-blue-500 hover:text-green-700">
            Leer más →
          </span>
        </div>
      </Link>

      {/* Otros Artículos */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {randomArticles.map((articulo) => (
          <Link
            key={articulo.id}
            href={`/articulos/${articulo.slug}`}
            className="group block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <div className="relative h-48 w-full">
              <Image
                src={articulo.image || "/images/default.jpg"}
                alt={articulo.title || "Imagen del artículo"}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4">
              <h4 className="text-xl font-semibold text-gray-800 group-hover:text-green-500 transition">
                {articulo.title || "Título no disponible"}
              </h4>
              <p className="text-gray-600 mt-2">
                {articulo.description || "Descripción no disponible"}
              </p>
              <span className="inline-block mt-4 text-blue-500 group-hover:text-green-700">
                Leer más →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
