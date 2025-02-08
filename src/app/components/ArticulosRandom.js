"use client";

import Link from "next/link";
import Image from "next/image";

export default function ArticulosRandom({ articulos }) {
  // Verificar que se reciben artículos correctamente
  console.log("Artículos recibidos:", articulos);

  if (!articulos || articulos.length === 0) {
    return <p className="text-center text-gray-600">No hay artículos disponibles.</p>;
  }

  const featuredArticle = articulos[0];
  const randomArticles = articulos.slice(1);

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
            fill
            style={{ objectFit: "cover" }}
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
        {randomArticles.map((articulo, index) => (
          <Link
            key={articulo.id || index} // Asegúrate de usar un identificador único
            href={`/articulos/${articulo.slug}`}
            className="group block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <div className="relative h-48 w-full">
              <Image
                src={articulo.image || "/images/default.jpg"}
                alt={articulo.title || "Imagen del artículo"}
                fill
                style={{ objectFit: "cover" }}
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
