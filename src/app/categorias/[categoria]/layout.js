const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

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
    return []; // Devuelve un arreglo vacío para evitar errores en el build
  }
}

// 📌 Generar metadatos dinámicos
export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params; // Se mantiene la estructura original
    const { categoria: categoriaSlug } = resolvedParams || {}; // Validación de parámetros

    if (!categoriaSlug) {
      throw new Error("El parámetro 'categoriaSlug' es obligatorio.");
    }

    const categoriaNombre = decodeURIComponent(categoriaSlug.replace(/-/g, " ")).toLowerCase();

    let metadata = {
      title: `Guía sobre ${categoriaNombre} | Saludyser`,  
      description: `Encuentra artículos destacados y consejos sobre ${categoriaNombre} en Saludyser.`,
      openGraph: {
        title: `Guía sobre ${categoriaNombre} | Saludyser`,
        description: `Explora información de calidad sobre ${categoriaNombre} en Saludyser.`,
        url: `${baseUrl}/categorias/${categoriaSlug}`,
        images: [
          {
            url: `${baseUrl}/images/categorias/default-category.jpg`,
            alt: `Guía sobre ${categoriaNombre} - Saludyser`,
            width: 1200,
            height: 630,
          },
        ],
      },
      alternates: {
        canonical: `${baseUrl}/categorias/${categoriaSlug}`,
      },
    };

    // 🔹 Obtener datos de la categoría
    const response = await fetch(`${baseUrl}/api/categorias/${categoriaSlug}`, {
      next: { revalidate: 60 },
    });

    if (response.ok) {
      const data = await response.json();

      if (data && data.name) {
        metadata = {
          ...metadata,
          title: `Descubre todo sobre ${data.name} | Saludyser`,
          description: data.meta_description 
            ? `Aprende sobre ${data.name}: información útil, consejos y más en Saludyser.` 
            : metadata.description,  
          openGraph: {
            ...metadata.openGraph,
            title: `Explora ${data.name} | Saludyser`,
            description: data.meta_description 
              ? `Guía detallada sobre ${data.name} en Saludyser.` 
              : metadata.openGraph.description,
            images: [
              {
                url: data.image_url || `${baseUrl}/images/categorias/${categoriaSlug}.jpg`,
                alt: `Información sobre ${data.name} - Saludyser`,
                width: 1200,
                height: 630,
              },
            ],
          },
        };
      }
    }

    return metadata;
  } catch (error) {
    console.error("Error al generar metadatos dinámicos:", error.message);
    return {
      title: "Error - Saludyser",
      description: "Ocurrió un problema al generar los metadatos.",
    };
  }
}

// 📌 Layout de Categorías
export default function CategoriaLayout({ children }) {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Datos Estructurados */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Categorías en Saludyser",
            description:
              "Explora las mejores categorías de salud, bienestar y vida saludable en Saludyser.",
            publisher: {
              "@type": "Organization",
              name: "Saludyser",
              logo: {
                "@type": "ImageObject",
                url: `${baseUrl}/logo.jpg`,
              },
            },
            mainEntityOfPage: {
              "@type": "CategoryPage",
              name: "Categorías de Artículos",
            },
          }),
        }}
      />
      <section className="max-w-6xl mx-auto px-4 py-8">{children}</section>
    </main>
  );
}
