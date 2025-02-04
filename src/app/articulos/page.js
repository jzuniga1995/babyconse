import MenuCategorias from "../components/MenuCategorias"; // Importar el componente correcto
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const dynamic = "force-dynamic"; // Asegurar renderizado dinámico

// Metadata dinámica
export async function generateMetadata() {
  let metadata = {
    title: "Categorías de Salud y Bienestar | Artículos - Salud y Ser",
    description:
      "Descubre todas las categorías y artículos sobre salud, bienestar físico y mental, nutrición, ejercicio, prevención médica y más temas esenciales para tu calidad de vida.",
    keywords:
      "categorías de salud, bienestar, nutrición, ejercicio, salud mental, prevención médica, vida saludable, artículos sobre salud",
    openGraph: {
      title: "Categorías de Salud y Bienestar | Artículos - Salud y Ser",
      description:
        "Explora una variedad de categorías y artículos sobre salud y bienestar.",
      type: "website",
      url: `${baseUrl}/articulos`,
      images: [
        {
          url: `${baseUrl}/images/og-articulos.jpg`,
          alt: "Categorías de Salud y Bienestar - Salud y Ser",
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/articulos`,
    },
    scripts: [],
  };

  try {
    const response = await fetch(`${baseUrl}/api/articulos`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (Array.isArray(data.data)) {
      const categorias = Array.from(
        new Set(data.data.map((articulo) => articulo.category))
      );

      metadata = {
        ...metadata,
        keywords: categorias.join(", ") + ", salud, bienestar, vida saludable",
        description: `Explora artículos en categorías como ${categorias
          .slice(0, 3)
          .join(", ")} y más temas esenciales para tu salud y bienestar.`,
        openGraph: {
          ...metadata.openGraph,
          description: `Explora una variedad de categorías como ${categorias
            .slice(0, 3)
            .join(", ")} y más temas esenciales para tu salud.`,
        },
      };

      metadata.scripts.push({
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Categorías de Artículos sobre Salud y Bienestar",
          "description": metadata.description,
          "publisher": {
            "@type": "Organization",
            "name": "SaludySer",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/logo.jpg`,
            },
          },
          "mainEntity": categorias.map((categoria) => ({
            "@type": "Category",
            "name": categoria,
          })),
        }),
      });
    }
  } catch (error) {
    console.error("Error al generar metadata dinámica:", error.message);
  }

  return metadata;
}

// 📌 Página principal de artículos
export default async function ArticulosPage() {
  let articulos = [];
  try {
    const response = await fetch(`${baseUrl}/api/articulos`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    articulos = Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    console.error("Error al obtener los artículos:", error.message);
  }

  return (
    <section className="bg-gray-50 min-h-screen mt-16">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 py-8">
        Categorías de Artículos sobre Salud y Bienestar
      </h1>
      <p className="text-center text-gray-600 mb-8 text-lg px-4">
        Explora una variedad de categorías relacionadas con el bienestar físico,
        mental y emocional. Aprende más sobre nutrición, ejercicio, salud
        mental, y prevención médica.
      </p>
      {articulos.length > 0 ? (
        <MenuCategorias
          articulos={articulos.map((articulo) => ({
            id: articulo.id,
            title: articulo.title,
            description: articulo.description,
            category: articulo.category,
            image: articulo.image,
          }))}
        />
      ) : (
        <p className="text-center text-gray-600">No hay artículos disponibles.</p>
      )}
    </section>
  );
}
