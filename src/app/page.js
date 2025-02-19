"use client";

import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import ArticulosRandom from "./components/ArticulosRandom";
import Link from "next/link";
import Head from "next/head";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // Base URL desde variables de entorno

export default function Home() {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 📌 Función para obtener artículos
  const fetchArticulos = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/articulos/random`);
      if (!response.ok) {
        throw new Error("Error al obtener los artículos.");
      }

      const data = await response.json();
      console.log("Datos recibidos:", data); // Depuración
      setArticulos(data.data || []);
      setError(null);
    } catch (err) {
      console.error("Error al obtener los artículos:", err.message);
      setError("No se pudieron cargar los artículos. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // 📌 Cargar artículos al montar el componente
  useEffect(() => {
    fetchArticulos();
  }, []);

  // 📌 Metadatos SEO
  const metaTitle = "Salud y Ser | Guías de Bienestar Físico y Mental";
  const metaDescription =
    "Explora guías prácticas, consejos confiables y artículos de expertos para mejorar tu bienestar físico y mental.";

  // 📌 Datos estructurados (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: metaTitle,
    description: metaDescription,
    mainEntity: articulos.map((articulo) => ({
      "@type": "Article",
      headline: articulo.title,
      description: articulo.description || "Descripción no disponible.",
      image: articulo.image || "/images/default.jpg",
      url: `${baseUrl}/articulos/${articulo.slug}`,
    })),
  };

  return (
    <>
      {/* Metadatos SEO */}
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="author" content="Salud y Ser" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:image" content={`${baseUrl}/images/og-image-home.jpg`} />
        <meta property="og:locale" content="es_ES" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${baseUrl}/images/og-image-home.jpg`} />
      </Head>

      {/* Datos estructurados */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero */}
      <Hero />

      {/* Artículos Destacados */}
      <section className="container mx-auto px-6 py-16 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
          Explora los Mejores Artículos de Salud y Bienestar
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Cargando artículos...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : articulos.length > 0 ? (
          <ArticulosRandom articulos={articulos} />
        ) : (
          <p className="text-center text-gray-600">
            No hay artículos disponibles.
          </p>
        )}
      </section>

      {/* Llamado a la Acción */}
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
