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
    return []; // Devolver un arreglo vacío para evitar que el build falle
  }
}

// 📌 Generar metadatos dinámicos
export async function generateMetadata({ params }) {
  const resolvedParams = await params; // Resuelve la promesa de params
  const { categoria: categoriaSlug } = resolvedParams;
  const categoriaNombre = decodeURIComponent(categoriaSlug.replace(/-/g, " ")).toLowerCase();

  let metadata = {
    title: `Artículos sobre ${categoriaNombre} | Saludyser`,
    description: `Explora los mejores artículos sobre ${categoriaNombre} en Saludyser.`,
    openGraph: {
      title: `Artículos sobre ${categoriaNombre} | Saludyser`,
      description: `Descubre artículos destacados sobre ${categoriaNombre}.`,
      url: `${baseUrl}/categorias/${categoriaSlug}`,
      images: [
        {
          url: `${baseUrl}/images/categorias/default-category.jpg`,
          alt: `Artículos sobre ${categoriaNombre} - Saludyser`,
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/categorias/${categoriaSlug}`,
    },
  };

  try {
    const response = await fetch(`${baseUrl}/api/categorias/${categoriaSlug}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();

    if (data && data.name) {
      metadata = {
        ...metadata,
        title: `Artículos sobre ${data.name} | Saludyser`,
        description: data.meta_description || metadata.description,
        openGraph: {
          ...metadata.openGraph,
          title: `Artículos sobre ${data.name} | Saludyser`,
          description: data.meta_description || metadata.openGraph.description,
          images: [
            {
              url: data.image_url || `${baseUrl}/images/categorias/${categoriaSlug}.jpg`,
              alt: data.image_alt || `Artículos sobre ${categoriaNombre} - Saludyser`,
              width: 1200,
              height: 630,
            },
          ],
        },
      };
    }
  } catch (error) {
    console.error(`Error al generar metadatos para la categoría: ${categoriaSlug}`, error.message);
  }

  return metadata;
}


// 📌 Layout de Categorías
export default function CategoriaLayout({ children }) {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-4 py-8">{children}</section>
    </main>
  );
}
