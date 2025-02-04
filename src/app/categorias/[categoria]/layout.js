const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// 📌 Generar rutas estáticas con `generateStaticParams`
export async function generateStaticParams() {
  try {
    const response = await fetch(`${baseUrl}/api/categorias`, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();

    return Array.isArray(data) ? data.map((categoria) => ({
      categoria: categoria.slug,
    })) : [];
  } catch (error) {
    console.error("Error al generar rutas estáticas:", error.message);
    return []; // Devolver un arreglo vacío para evitar que el build falle
  }
}

// 📌 Generar metadatos dinámicos
export async function generateMetadata({ params }) {
  const { categoria: categoriaSlug } = params;
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
export default async function CategoriaLayout({ children, params }) {
  const { categoria: categoriaSlug } = params;
  let categoria = null;

  try {
    const response = await fetch(`${baseUrl}/api/categorias/${categoriaSlug}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

    categoria = await response.json();
  } catch (error) {
    console.error(`Error al obtener datos para la categoría: ${categoriaSlug}`, error.message);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {categoria ? (
          <>
            <h1 className="text-4xl font-bold text-gray-800">{categoria.name}</h1>
            <p className="text-lg text-gray-600 mt-4">
              {categoria.meta_description || "Explora los mejores artículos en esta categoría."}
            </p>
          </>
        ) : (
          <h1 className="text-4xl font-bold text-red-600">Categoría no encontrada</h1>
        )}
      </div>
      <section className="max-w-6xl mx-auto px-4 py-8">{children}</section>
    </main>
  );
}
