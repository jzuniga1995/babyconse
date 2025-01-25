import React from "react";
import Hero from "./components/Hero";
import Link from "next/link";
import { generateSlug } from "./utils/slugify";

// Función para generar metadata dinámica para la página principal
export const metadata = {
  title: "Salud y Ser | Artículos de Salud y Bienestar",
  description:
    "Descubre los mejores artículos sobre salud, bienestar y consejos para una vida plena. Desde guías prácticas hasta rutinas saludables.",
  openGraph: {
    title: "Salud y Ser | Artículos de Salud y Bienestar",
    description:
      "Explora contenido confiable sobre la salud, el bienestar y la vida saludable.",
    type: "website",
    url: "https://tusitio.com",
    images: [
      {
        url: "https://via.placeholder.com/1200x630",
        width: 1200,
        height: 630,
        alt: "Explora Artículos de Salud y Bienestar",
      },
    ],
  },
};

// Obtener datos de los artículos desde el servidor
async function fetchArticles() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000"; // URL base
    const response = await fetch(`${baseUrl}/api/articulos?limit=9`, {
      cache: "no-store", // Evitar almacenamiento en caché
    });

    if (!response.ok) {
      throw new Error(`Error al obtener artículos. Status: ${response.status}`);
    }

    const data = await response.json();

    // Generar slugs únicos para los artículos
    return data.data.map((article) => ({
      ...article,
      slug: generateSlug(article.title),
    }));
  } catch (error) {
    console.error("Error al cargar artículos:", error);
    return [];
  }
}

// Componente principal de la página Home
export default async function Home() {
  const articles = await fetchArticles();

  return (
    <>
      <Hero />


      <section className="container mx-auto px-6 py-16 bg-gray-100 rounded-lg shadow-lg">
  <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">
    Artículos Destacados
  </h3>
  {articles.length > 0 ? (
    <>
      {/* Artículo Principal */}
      <div className="mb-12">
        <div className="relative overflow-hidden rounded-lg shadow-md bg-white transition-transform transform hover:scale-105">
          <img
            src={articles[0].image || "https://via.placeholder.com/1200x600"}
            alt={`Imagen del artículo ${articles[0].title}`}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="p-6">
            <Link href={`/articulos/${articles[0].slug}`}>
              <h4 className="text-4xl font-semibold text-gray-800 group-hover:text-blue-500 transition cursor-pointer">
                {articles[0].title}
              </h4>
            </Link>
            <p className="text-gray-600 mt-3">{articles[0].description}</p>
            <Link
              href={`/articulos/${articles[0].slug}`}
              className="mt-4 inline-block text-blue-600 font-medium hover:underline"
            >
              Leer más →
            </Link>
          </div>
        </div>
      </div>

      {/* Otros Artículos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(1, 13).map((article) => (
          <div
            key={article.id}
            className="group relative overflow-hidden rounded-lg shadow-md bg-white transition-transform transform hover:scale-105"
          >
            <img
              src={article.image || "https://via.placeholder.com/300x200"}
              alt={`Imagen del artículo ${article.title}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <Link href={`/articulos/${article.slug}`}>
                <h4 className="text-xl font-semibold text-gray-800 group-hover:text-blue-500 transition cursor-pointer">
                  {article.title}
                </h4>
              </Link>
              <p className="text-gray-600 mt-2 text-sm">
                {article.description}
              </p>
              <Link
                href={`/articulos/${article.slug}`}
                className="mt-3 inline-block text-blue-600 font-medium hover:underline"
              >
                Leer más →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <p className="text-center text-gray-600">Cargando artículos...</p>
  )}
</section>
<section className="container mx-auto px-6 py-16 bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 text-white rounded-2xl shadow-lg mb-20 mt-20">
  <h3 className="text-4xl font-extrabold text-center leading-tight">
    ¡Empieza a cuidar tu salud hoy!
  </h3>
  <p className="text-lg text-center mt-4 max-w-3xl mx-auto">
    Explora artículos actualizados y mejora tu calidad de vida con consejos
    prácticos y efectivos. ¡Da el primer paso hacia una vida más saludable!
  </p>
  <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
    {/* Botón Ver Artículos */}
    <Link
      href="/articulos"
      className="flex items-center justify-center bg-white text-blue-700 font-semibold px-8 py-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h8m-8 6h16"
        />
      </svg>
      Ver Artículos
    </Link>


  </div>
</section>





    </>
  );
}
