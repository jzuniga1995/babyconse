import React from "react";
import Hero from "./components/Hero";
import Link from "next/link";

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
      slug: `${article.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[áéíóúñ]/g, (c) =>
          ({ á: "a", é: "e", í: "i", ó: "o", ú: "u", ñ: "n" }[c])
        )}`,
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

      {/* Introducción */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center leading-tight">
          Bienvenidos a <span className="text-blue-500">Salud y Ser</span>
        </h2>
        <p className="text-lg text-gray-600 text-center mt-4 max-w-3xl mx-auto">
          Encuentra herramientas prácticas, guías y recursos diseñados para
          mejorar tu salud y bienestar. Desde consejos alimenticios hasta
          rutinas de sueño, aquí lo tienes todo.
        </p>
      </section>

      {/* Sección de Artículos Destacados */}
      <section className="container mx-auto px-6 py-16 bg-gray-100 rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Artículos Destacados
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {articles.length > 0 ? (
            articles.map((article) => (
              <div
                key={article.id}
                className="group relative overflow-hidden rounded-lg shadow-md bg-white transition-transform transform hover:scale-105"
              >
                <img
                  src={article.image || "https://via.placeholder.com/300x200"}
                  alt={`Imagen del artículo ${article.title}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-500 transition">
                    {article.title}
                  </h4>
                  <p className="text-gray-600 mt-3">{article.description}</p>
                  <Link
                    href={`/articulos/${article.slug}`}
                    className="mt-4 inline-block text-blue-600 font-medium hover:underline"
                  >
                    Leer más →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">Cargando artículos...</p>
          )}
        </div>
      </section>

      {/* Llamado a la Acción */}
      <section className="container mx-auto px-6 py-16 bg-blue-500 text-white rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold text-center">
          ¡Empieza a cuidar tu salud hoy!
        </h3>
        <p className="text-lg text-center mt-4 max-w-2xl mx-auto">
          Explora los artículos más recientes y mejora tu calidad de vida con
          consejos prácticos y efectivos.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/articulos"
            className="bg-white text-blue-500 font-medium px-6 py-3 rounded-md shadow hover:shadow-lg hover:bg-gray-100 transition"
          >
            Ver todos los artículos
          </Link>
        </div>
      </section>
    </>
  );
}
