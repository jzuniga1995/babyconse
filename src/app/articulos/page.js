import MenuCategorias from "../components/MenuCategorias";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

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
      canonical: `${baseUrl}/articulos`, // URL canónica predeterminada
    },
  };

  try {
    const response = await fetch(`${baseUrl}/api/articulos`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    const articulos = Array.isArray(data.data) ? data.data : [];

    if (articulos.length > 0) {
      const categorias = Array.from(
        new Set(articulos.map((articulo) => articulo.category).filter(Boolean))
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
        // ✅ Actualizar la URL canónica según las categorías
        alternates: {
          canonical: `${baseUrl}/articulos`,
        },
      };
    }
  } catch (error) {
    console.error("Error al generar metadata dinámica:", error.message);
  }

  return metadata;
}


// 📌 Página principal
export default async function ArticulosPage() {
  let articulos = [];
  let categorias = [];

  try {
    const response = await fetch(`${baseUrl}/api/articulos`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error("Error al obtener los artículos.");

    const data = await response.json();
    articulos = Array.isArray(data.data) ? data.data : [];

    // Generar categorías únicas
    categorias = Array.from(
      new Set(articulos.map((articulo) => articulo.category).filter(Boolean))
    );
  } catch (error) {
    console.error("Error al obtener los artículos:", error.message);
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Categorías de Artículos sobre Salud y Bienestar",
    description:
      "Descubre todas las categorías y artículos sobre salud, bienestar físico y mental, nutrición, ejercicio, prevención médica y más temas esenciales para tu calidad de vida.",
    publisher: {
      "@type": "Organization",
      name: "Salud y Ser",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.jpg`,
      },
    },
    mainEntity: categorias.map((categoria) => ({
      "@type": "Category",
      name: categoria,
    })),
  };

  return (
    <section className="bg-gray-50 min-h-screen mt-16">
      {/* Datos estructurados */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <h1 className="text-5xl font-extrabold text-center text-gray-800 py-8">
        Categorías de Artículos sobre Salud, Nutrición y Bienestar
      </h1>
      <p className="text-center text-gray-600 mb-8 text-lg px-4">
        Explora una variedad de categorías relacionadas con el bienestar físico,
        mental y emocional. Aprende sobre nutrición, ejercicio, salud mental,
        prevención médica y más temas esenciales para tu calidad de vida.
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
        <div className="text-center text-gray-600 py-16">
          <p className="text-lg">No hay artículos disponibles en este momento.</p>
        </div>
      )}
    </section>
  );
}
