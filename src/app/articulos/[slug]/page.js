import ReactMarkdown from "react-markdown";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

// Generar Metadata Dinámica
export async function generateMetadata(context) {
  const params = await Promise.resolve(context.params); // Resolver `params` explícitamente
  const { slug } = params;

  let metadata = {
    title: "Artículo no encontrado - Salud y Ser",
    description: "El artículo que buscas no está disponible.",
    openGraph: {
      title: "Artículo no encontrado",
      description: "El artículo que buscas no está disponible.",
      type: "article",
      image: "/default-image.jpg",
      url: `https://tusitio.com/articulos/${slug}`,
    },
  };

  try {
    const response = await fetch(`http://localhost:3000/api/articulos/${slug}`, {
      cache: "no-store",
    });

    if (response.ok) {
      const articulo = await response.json();

      metadata = {
        title: `${articulo.title} - Salud y Ser`,
        description: articulo.description,
        openGraph: {
          title: articulo.title,
          description: articulo.description,
          type: "article",
          image: articulo.image || "/default-image.jpg",
          url: `https://tusitio.com/articulos/${slug}`,
        },
        alternates: {
          canonical: `https://tusitio.com/articulos/${slug}`,
        },
      };
    }
  } catch (error) {
    console.error("Error al generar metadata dinámica:", error.message);
  }

  return metadata;
}

// Componente de Detalles de Artículo
export default async function ArticuloDetallesPage(context) {
  const params = await Promise.resolve(context.params); // Resolver `params` explícitamente
  const { slug } = params;

  if (!slug) {
    console.error("Slug no proporcionado en el frontend.");
    return (
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <p>Error: Slug no válido.</p>
      </section>
    );
  }

  let articulo = null;
  let articulosRelacionados = [];

  try {
    // Fetch del artículo principal
    const response = await fetch(`http://localhost:3000/api/articulos/${slug}`, {
      cache: "no-store",
    });

    if (!response.ok) throw new Error("No se encontró el artículo.");
    articulo = await response.json();

    // Fetch de los artículos relacionados
    const relacionadosResponse = await fetch(
      `http://localhost:3000/api/articulos?category=${encodeURIComponent(
        articulo.category
      )}&limit=5`,
      { cache: "no-store" }
    );

    if (relacionadosResponse.ok) {
      const relacionadosData = await relacionadosResponse.json();
      articulosRelacionados = relacionadosData.data.filter(
        (a) => a.slug !== slug
      );
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error.message);
  }

  return (
    <section className="bg-gray-50 min-h-screen py-10 mt-16">

      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/articulos"
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700 transition-colors"
        >
          <FaArrowLeft />
          Volver
        </Link>
      </div>

      {/* Render del artículo */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        {articulo?.image && (
          <img
            src={articulo.image}
            alt={`Imagen del artículo ${articulo.title}`}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          {articulo?.title || "Artículo no encontrado"}
        </h1>
        <p className="text-lg text-gray-600 mb-6 text-center">
          {articulo?.description || "Descripción no disponible."}
        </p>
        <div className="text-gray-700 leading-relaxed border-t border-gray-200 pt-4">
          <ReactMarkdown>
            {articulo?.full_content || "Contenido no disponible."}
          </ReactMarkdown>
        </div>
      </div>

      {/* Render de artículos relacionados */}
      {articulosRelacionados.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Más artículos sobre {articulo?.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {articulosRelacionados.map((rel) => (
              <Link
                key={rel.slug}
                href={`/articulos/${rel.slug}`}
                className="block group"
              >
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <img
                    src={rel.image || "/default-image.jpg"}
                    alt={`Imagen del artículo ${rel.title}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-500">
                      {rel.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {rel.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
