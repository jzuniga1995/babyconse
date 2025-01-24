import Link from "next/link";
import ArticulosRandom from "../../components/ArticulosRandom"; // Importa el componente cliente

// Función para capitalizar correctamente el texto
function capitalize(text) {
  if (!text) return "";
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// SEO dinámico con generateMetadata
export async function generateMetadata(context) {
  const params = await Promise.resolve(context.params); // Forzar resolución de parámetros
  const categoriaSlug = params.categoria;
  const categoria = capitalize(decodeURIComponent(categoriaSlug.replace(/-/g, " ")));

  return {
    title: `Artículos sobre ${categoria} - Salud y Ser`,
    description: `Descubre información sobre ${categoria}, consejos y más temas relacionados.`,
    openGraph: {
      title: `Artículos sobre ${categoria} - Salud y Ser`,
      description: `Explora información valiosa sobre ${categoria}.`,
      url: `https://tu-sitio.com/categorias/${categoriaSlug}`,
      type: "website",
    },
    alternates: {
      canonical: `https://tu-sitio.com/categorias/${categoriaSlug}`,
    },
  };
}

export default async function CategoriaPage(context) {
  const params = await Promise.resolve(context.params); // Forzar resolución de parámetros
  const categoriaSlug = params.categoria;
  const categoria = capitalize(decodeURIComponent(categoriaSlug.replace(/-/g, " ")));

  let articulos = [];
  try {
    const response = await fetch(
      `http://localhost:3000/api/articulos?category=${categoria}`,
      { cache: "no-store" }
    );

    if (response.ok) {
      const data = await response.json();
      articulos = data.data || [];
    } else {
      console.error(`Error al obtener artículos: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error al obtener los artículos:", error.message);
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Título de la categoría */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Artículos sobre {categoria}
      </h1>

      {/* Botón para regresar */}
      <Link
        href="/articulos"
        className="inline-block mb-6 text-blue-500 hover:text-blue-700 transition"
      >
        ← Volver a todas las categorías
      </Link>

      {/* Renderizar el componente de artículos aleatorios */}
      <ArticulosRandom articulos={articulos} />
    </div>
  );
}
