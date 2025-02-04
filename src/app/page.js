import React from "react";
import Hero from "./components/Hero";
import ArticulosRandom from "./components/ArticulosRandom";
import Link from "next/link";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // Base URL desde variables de entorno

// Función para obtener artículos en el servidor
async function fetchArticulos() {
  try {
    const response = await fetch(`${baseUrl}/api/articulos`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los artículos");
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error al obtener los artículos:", error.message);
    return [];
  }
}

// Generar metadatos dinámicos basados en datos de la API
export async function generateMetadata() {
  const metadataBase = new URL(baseUrl);
  const articulos = await fetchArticulos();

  let metadata = {
    title: "Salud y Ser | Guías de Bienestar Físico y Mental",
    description:
      "Mejora tu bienestar físico y mental con artículos confiables, guías prácticas y consejos de salud respaldados por expertos.",
    openGraph: {
      title: "Salud y Ser | Artículos y Guías de Salud y Bienestar",
      description:
        "Explora consejos y guías prácticas para mejorar tu calidad de vida respaldados por expertos en salud.",
      type: "website",
      url: metadataBase.href,
      images: [
        {
          url: `${metadataBase.href}/images/og-image-home.jpg`,
          alt: "Salud y Ser - Página Principal",
        },
      ],
    },
    alternates: {
      canonical: metadataBase.href,
    },
    keywords: [
      "salud",
      "bienestar",
      "guías de salud",
      "artículos de salud",
      "bienestar físico",
      "bienestar mental",
      "vida saludable",
    ],
  };

  if (articulos.length > 0) {
    const topArticulos = articulos.slice(0, 5);

    metadata = {
      ...metadata,
      description: `Descubre artículos destacados como ${topArticulos
        .map((a) => a.title)
        .join(", ")}. Mejora tu bienestar físico y mental con guías prácticas de salud respaldadas por expertos.`,
      openGraph: {
        ...metadata.openGraph,
        description: `Descubre artículos destacados como ${topArticulos
          .map((a) => a.title)
          .join(", ")} para mejorar tu bienestar físico y mental.`,
        images: topArticulos.map((articulo) => ({
          url: new URL(
            articulo.image || "/images/default.jpg",
            metadataBase
          ).href,
          alt: articulo.title,
        })),
      },
      keywords: articulos
        .flatMap((articulo) => articulo.meta_keywords?.split(",") || [])
        .map((kw) => kw.trim())
        .concat([
          "salud",
          "bienestar",
          "guías de salud",
          "artículos de salud",
          "bienestar físico",
          "bienestar mental",
          "vida saludable",
        ]),
    };
  }

  return metadata;
}

export default async function Home() {
  const articulos = await fetchArticulos();

  return (
    <>
      <Hero />

      {/* Artículos Destacados */}
      <section className="container mx-auto px-6 py-16 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
          Explora los Mejores Artículos de Salud y Bienestar
        </h1>

        {articulos.length > 0 ? (
          <ArticulosRandom articulos={articulos} />
        ) : (
          <p className="text-center text-gray-600">
            No hay artículos disponibles.
          </p>
        )}
      </section>

      {/* Llamado a la Acción Profesional */}
      <section className="container mx-auto px-6 py-16 mt-16 mb-20 rounded-xl text-center shadow-xl bg-gradient-to-r from-green-500 to-green-400 text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-4">Cuida tu Bienestar Integral</h2>
          <p className="text-lg font-light mb-8 leading-relaxed">
            Explora consejos, artículos y guías prácticas para mejorar tu calidad de vida.
            Descubre información confiable diseñada por expertos para potenciar tu bienestar físico y mental.
          </p>
          <Link
            href="/articulos"
            className="inline-block px-8 py-4 text-lg font-semibold bg-white text-green-600 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-green-100"
          >
            Ver Artículos de Salud
          </Link>
        </div>
      </section>
    </>
  );
}
