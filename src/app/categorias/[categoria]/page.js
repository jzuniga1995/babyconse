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

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // Base URL desde variables de entorno
const limit = 9;

// 📌 Generar rutas estáticas con `generateStaticParams`
export async function generateStaticParams() {
  try {
    const response = await fetch(`${baseUrl}/api/categorias`, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();

    return Array.isArray(data)
      ? data.map((categoria) => ({
          categoria: categoria.slug,
        }))
      : [];
  } catch (error) {
    console.error("Error al generar rutas estáticas:", error.message);
    return []; // Retornar un array vacío para evitar errores en el build
  }
}

// 📌 Generar metadatos dinámicos
export async function generateMetadata({ params }) {
  const categoriaSlug = params.categoria;
  const categoria = decodeURIComponent(categoriaSlug.replace(/-/g, " "));

  return {
    title: `Artículos sobre ${categoria} | Saludyser`,
    description: `Explora artículos destacados sobre ${categoria} en Saludyser.`,
  };
}

// 📌 Página de categoría
export default async function CategoriaPage({ params, searchParams }) {
  const categoriaSlug = params.categoria;
  const categoria = decodeURIComponent(categoriaSlug.replace(/-/g, " "));
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const offset = (page - 1) * limit;

  let articulos = [];
  let total = 0;

  try {
    const response = await fetch(
      `${baseUrl}/api/articulos?category=${categoria}&limit=${limit}&offset=${offset}`,
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    articulos = Array.isArray(data.data) ? data.data : [];
    total = data.total || 0;
  } catch (error) {
    console.error("Error al obtener artículos para la categoría:", error.message);
  }

  const pages = Math.ceil(total / limit);

  return (
    <div className="container mx-auto px-6 py-12">
      {categoria ? (
        <>
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Artículos sobre {capitalize(categoria)}
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

      {articulos.length > 0 ? (
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
            <Pagination
              page={page}
              pages={pages}
              onPageChange={(newPage) =>
                window.location.assign(
                  `/categorias/${categoriaSlug}?page=${newPage}`
                )
              }
            />
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600">No se encontraron artículos en esta categoría.</p>
      )}
    </div>
  );
}
