"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/components/Pagination";

// Capitalizar texto
function capitalize(text) {
  if (!text) return "";
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function CategoriaPage() {
  const { categoria: categoriaSlug } = useParams();
  const categoria = categoriaSlug
    ? capitalize(decodeURIComponent(categoriaSlug.replace(/-/g, " ")))
    : null;

  const [articulos, setArticulos] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const limit = 9;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // Base URL desde variables de entorno

  useEffect(() => {
    if (!categoria) {
      setError("Categoría no válida.");
      return;
    }

    const controller = new AbortController();
    const fetchArticulos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const offset = (page - 1) * limit;
        const response = await fetch(
          `${baseUrl}/api/articulos?category=${categoria}&limit=${limit}&offset=${offset}`,
          { signal: controller.signal, cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error(`Error al obtener artículos: ${response.statusText}`);
        }

        const data = await response.json();
        setArticulos(data.data || []);
        setPages(Math.ceil(data.total / limit));
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticulos();

    return () => controller.abort();
  }, [categoria, page, baseUrl]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {categoria ? (
        <>
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Artículos sobre {categoria}
          </h1>
          <Link
            href="/articulos"
            className="inline-block mb-6 text-blue-500 hover:text-blue-700 transition"
          >
            ← Explorar todas las categorías
          </Link>
        </>
      ) : (
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Categoría no válida</h1>
      )}

      {isLoading ? (
        <p className="text-center text-gray-600">Cargando artículos...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : articulos.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articulos.map((articulo) => (
              <Link
                key={articulo.id}
                href={`/articulos/${articulo.slug}`}
                className="group block relative overflow-hidden rounded-lg shadow-md bg-white transition-transform transform hover:scale-105"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={articulo.image || "/images/default.jpg"}
                    alt={`Imagen del artículo ${articulo.title}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-500 transition">
                    {articulo.title}
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm">
                    {articulo.description || "Descripción no disponible."}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <Pagination page={page} pages={pages} onPageChange={handlePageChange} />
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600">No se encontraron artículos en esta categoría.</p>
      )}
    </div>
  );
}
