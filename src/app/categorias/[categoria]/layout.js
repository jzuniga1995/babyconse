const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // Base URL desde variables de entorno

export async function generateMetadata(context) {
  const params = context.params;
  const categoriaSlug = params.categoria;
  const categoriaNombre = decodeURIComponent(categoriaSlug.replace(/-/g, " ")).toLowerCase();

  // Metadata inicial por defecto
  let metadata = {
    title: `Artículos sobre ${categoriaNombre} | Saludyser`,
    description: `Explora los mejores artículos sobre ${categoriaNombre} en Saludyser.`,
    openGraph: {
      title: `Artículos sobre ${categoriaNombre} | Saludyser`,
      description: `Descubre artículos destacados sobre ${categoriaNombre}.`,
      url: `${baseUrl}/categorias/${categoriaSlug}`,
      images: [
        {
          url: `${baseUrl}/images/categorias/default-category.jpg`, // Imagen por defecto
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
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json();

      // Actualizar metadata con datos dinámicos
      metadata = {
        ...metadata,
        description: data.meta_description || metadata.description,
        openGraph: {
          ...metadata.openGraph,
          description: data.meta_description || metadata.openGraph.description,
          images: [
            {
              url:
                data.image_url ||
                `${baseUrl}/images/categorias/${categoriaSlug}.jpg`,
              alt:
                data.image_alt ||
                `Artículos sobre ${categoriaNombre} - Saludyser`,
              width: 1200,
              height: 630,
            },
          ],
        },
        alternates: {
          canonical: data.canonical || metadata.alternates.canonical,
        },
      };
    } else if (response.status === 404) {
      console.warn(`Categoría no encontrada: ${categoriaSlug}`);
    } else {
      console.error(
        `Error en la API al obtener metadata para la categoría: ${categoriaSlug}`
      );
    }
  } catch (error) {
    console.error(
      `Error al obtener metadata para la categoría: ${categoriaSlug}`,
      error.message
    );
  }

  return metadata;
}

export default function CategoriaLayout({ children }) {
  return <>{children}</>;
}
