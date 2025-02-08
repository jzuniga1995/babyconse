import Link from "next/link";
import Image from "next/image";
import PaginationWrapper from "@/app/components/PaginationWrapper";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // Base URL desde variables de entorno
const limit = 9;

// 📌 Página de categoría
export default async function CategoriaPage({ params, searchParams }) {
  // Resolver `params` y `searchParams`
  const resolvedParams = await params; // Resolver params como promesa
  const resolvedSearchParams = await searchParams; // Resolver searchParams como promesa

  const categoriaSlug = resolvedParams?.categoria || "";
  const categoria = categoriaSlug
    ? decodeURIComponent(categoriaSlug.replace(/-/g, " "))
    : "Categoría no válida";

  // Obtener página actual desde searchParams
  const page = resolvedSearchParams?.page ? parseInt(resolvedSearchParams.page, 10) : 1;
  const offset = (page - 1) * limit;

  let articulos = [];
  let total = 0;

  try {
    const response = await fetch(
      `${baseUrl}/api/articulos?category=${categoria}&limit=${limit}&offset=${offset}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    articulos = Array.isArray(data.data) ? data.data : [];
    total = data.total || 0;
  } catch (error) {
    console.error("Error al obtener artículos para la categoría:", error.message);
  }

  const pages = total > 0 ? Math.ceil(total / limit) : 0;

  // JSON-LD para SEO (Datos estructurados)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Artículos sobre ${categoria}`,
    description: `Explora los mejores artículos sobre ${categoria} en Saludyser.`,
    mainEntity: articulos.map((articulo) => ({
      "@type": "Article",
      headline: articulo.title,
      description: articulo.description || "Descripción no disponible.",
      image: articulo.image || "/images/default.jpg",
      url: `${baseUrl}/articulos/${articulo.slug}`,
    })),
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
      {/* Datos estructurados para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Título dinámico de la categoría */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 capitalize text-center">
        {categoria}
      </h1>

      {/* Grid de artículos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articulos.length > 0 ? (
          articulos.map((articulo) => (
            <Link
              key={articulo.id}
              href={`/articulos/${articulo.slug}`}
              className="group block relative overflow-hidden rounded-lg shadow-md bg-white transition-transform transform hover:scale-105"
            >
              <div className="relative w-full h-48">
                <Image
                  src={articulo.image || "/images/default.jpg"} // Imagen predeterminada si no hay
                  alt={`Imagen del artículo ${articulo.title || "sin título"}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-500 transition">
                  {articulo.title}
                </h3>
                <p className="text-gray-600 mt-2 text-sm">
                  {articulo.description || "Descripción no disponible."}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-600 mt-8 text-lg">
            No se encontraron artículos en esta categoría.
          </p>
        )}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-16">
        {pages > 1 ? (
          <PaginationWrapper page={page} pages={pages} categoriaSlug={categoriaSlug} />
        ) : (
          <p className="text-gray-500">No hay más páginas para mostrar.</p>
        )}
      </div>
    </div>
  );
}
