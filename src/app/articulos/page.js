
import MenuCategorias from "../components/MenuCategorias"; // Importar el componente correcto

// Metadata para SEO dinámico
export const metadata = {
  title: "Artículos - Salud y Ser",
  description:
    "Explora todos los artículos útiles sobre diferentes categorías de salud, bienestar, y más.",
  keywords:
    "artículos, alimentación, ejercicio, sueño, salud mental, prevención",
  openGraph: {
    title: "Artículos - Salud y Ser",
    description:
      "Explora artículos útiles sobre diferentes temas de salud y bienestar.",
    type: "website",
    url: "https://tu-sitio.com/articulos",
  },
  alternates: {
    canonical: "https://tu-sitio.com/articulos",
  },
};

export default async function ArticulosPage() {
  // Obtener los datos desde la API
  let articulos = [];
  try {
    const response = await fetch("http://localhost:3000/api/articulos", {
      cache: "no-store",
    });
    if (response.ok) {
      const data = await response.json();
      articulos = data.data || [];
    }
  } catch (error) {
    console.error("Error al obtener los artículos:", error.message);
  }

  // Pasar los artículos al componente cliente
  return (
    <section className="bg-gray-50 min-h-screen mt-16">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 py-8">
        Artículos por Categoría
      </h1>
      {/* Aseguramos pasar siempre un array válido */}
      <MenuCategorias articulos={articulos || []} />
    </section>
  );
}
