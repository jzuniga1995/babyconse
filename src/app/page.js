import React from "react";
import Hero from "./components/Hero";
import ArticulosRandom from "./components/ArticulosRandom"; // Componente para artículos aleatorios

// Función para obtener artículos en el servidor
async function fetchArticulos() {
  try {
    const response = await fetch("http://localhost:3000/api/articulos", {
      cache: "no-store", // Evita el almacenamiento en caché para obtener datos actualizados
    });

    if (!response.ok) {
      throw new Error("Error al obtener los artículos");
    }

    const data = await response.json();
    return data.data || []; // Devuelve el arreglo de artículos
  } catch (error) {
    console.error(error.message);
    return []; // Devuelve un arreglo vacío si ocurre un error
  }
}

// Generar metadatos dinámicos
export async function generateMetadata() {
  const metadataBase = new URL("https://tusitio.com"); // Cambia por la URL de tu dominio en producción
  const articulos = await fetchArticulos();

  if (articulos.length === 0) {
    return {
      metadataBase,
      title: "Salud y Ser | Artículos de Salud y Bienestar",
      description:
        "Descubre los mejores artículos sobre salud, bienestar y consejos para una vida plena.",
      openGraph: {
        title: "Salud y Ser | Artículos de Salud y Bienestar",
        description:
          "Explora contenido confiable sobre la salud, el bienestar y la vida saludable.",
        type: "website",
        url: metadataBase.href,
      },
    };
  }

  const description = `Explora artículos como ${articulos
    .slice(0, 5)
    .map((a) => a.title)
    .join(", ")} y más temas relacionados con la salud y el bienestar.`;

  const openGraphImages = articulos.map((articulo) => ({
    url: new URL(articulo.image || "/images/default.jpg", metadataBase).href, // Construye URLs completas
    alt: articulo.title,
  }));

  return {
    metadataBase, // Base de la URL
    title: "Artículos Destacados y Más | Salud y Ser",
    description,
    openGraph: {
      title: "Artículos Destacados y Más | Salud y Ser",
      description,
      type: "website",
      url: metadataBase.href,
      images: openGraphImages,
    },
  };
}

export default async function Home() {
  const articulos = await fetchArticulos();

  return (
    <>
      <Hero />

      {/* Artículos Aleatorios con Destacado */}
      <section className="container mx-auto px-6 py-16 bg-gray-100 rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Artículos Destacados
        </h3>

        {articulos.length > 0 ? (
          <ArticulosRandom articulos={articulos} />
        ) : (
          <p className="text-center text-gray-600">
            No hay artículos disponibles.
          </p>
        )}
      </section>
    </>
  );
}
