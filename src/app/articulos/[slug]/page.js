import ReactMarkdown from "react-markdown";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import remarkGfm from "remark-gfm";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;



// 📌 Generar rutas estáticas con `generateStaticParams`
export async function generateStaticParams() {
  try {
    const response = await fetch(`${baseUrl}/api/articulos`);
    if (!response.ok) throw new Error("Error al obtener los artículos.");
    const data = await response.json();

    return data.data.map((articulo) => ({
      slug: articulo.slug,
    }));
  } catch (error) {
    console.error("Error al generar rutas estáticas:", error.message);
    return [];
  }
}
export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params; // Se mantiene la estructura original
    const { slug } = resolvedParams || {}; // Validación de parámetros

    if (!slug) {
      throw new Error("El parámetro 'slug' es obligatorio.");
    }

    const response = await fetch(`${baseUrl}/api/articulos/${slug}`, {
      next: { revalidate: 60 },
    });

    if (response.ok) {
      const data = await response.json();
      const articulo = data.articulo;

      return {
        title: `${articulo.title} | Salud y Ser`, 
        description: articulo.meta_description || articulo.description || "Lee más sobre este tema en Salud y Ser.",
        keywords: articulo.meta_keywords || "salud, bienestar, nutrición",
        openGraph: {
          title: `${articulo.title} | Información y Consejos en Salud y Ser`,
          description: articulo.meta_description || articulo.description || "Descubre información útil.",
          type: "article",
          image: articulo.image || "/images/default.jpg",
          url: `${baseUrl}/articulos/${slug}`,
          article: {
            publishedTime: articulo.published_at,
            modifiedTime: articulo.updated_at,
            section: articulo.category,
            tags: articulo.meta_keywords ? articulo.meta_keywords.split(",") : [],
          },
        },
        alternates: {
          canonical: `${baseUrl}/articulos/${slug}`,
        },
      };
    }
  } catch (error) {
    console.error("Error al generar metadatos:", error.message);
  }

  return {
    title: "Artículo no encontrado | Salud y Ser",
    description: "El artículo que buscas no está disponible.",
    alternates: {
      canonical: `${baseUrl}/articulos/${slug}`,
    },
  };
}


// 📌 Página del artículo
export default async function ArticuloDetallesPage({ params }) {
  const resolvedParams = await params; // Resolver params como promesa
  const { slug } = resolvedParams;

  let articulo = null;
  let articulosRelacionados = [];

  try {
    const response = await fetch(`${baseUrl}/api/articulos/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) throw new Error("No se encontró el artículo.");
    const data = await response.json();

    articulo = data.articulo;
    articulosRelacionados = data.relacionados || [];
  } catch (error) {
    console.error("Error al obtener los datos:", error.message);
  }

  const fullContent = articulo?.full_content || "Contenido no disponible.";
  const tooManyH2 = (fullContent.match(/^##\s+/gm) || []).length > 10;
  
  
  const structuredData = articulo
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": articulo.title,
        "description": articulo.meta_description || articulo.description,
        "image": articulo.image || "/default-image.jpg",
        "author": {
          "@type": "Person",
          "name": "Salud y Ser",
          "url": "https://www.saludyser.com/nosotros",
        },
        "datePublished": articulo.published_at,
        "dateModified": articulo.updated_at,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${baseUrl}/articulos/${slug}`,
        },
      }
    : null;

  return (
    <section className="bg-gray-50 min-h-screen py-10 mt-16">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/articulos"
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700 transition-colors"
        >
          <FaArrowLeft />
          Volver
        </Link>
      </div>

      {articulo?.image && (
        <div className="max-w-4xl mx-auto px-4 mt-6">
          <Image
            src={articulo.image}
            alt={`Imagen del artículo: ${articulo.title}`}
            width={800}
            height={450}
            className="rounded-lg shadow-md"
            priority
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 mt-8 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800">{articulo?.title || "Título no disponible"}</h1>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mt-8 space-y-6">
<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    h1: ({ ...props }) => (
      <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mt-8" {...props} />
    ),
    h2: ({ ...props }) => {
      return tooManyH2 ? (
        <h3 className="text-xl font-semibold text-gray-700 mt-6" {...props} />
      ) : (
        <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mt-8" {...props} />
      );
    },
    strong: ({ ...props }) => <span className="font-medium text-gray-900" {...props} />,
    table: ({ ...props }) => (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300" {...props} />
      </div>
    ),
    th: ({ ...props }) => (
      <th className="border border-gray-300 px-4 py-2 bg-gray-200 text-left" {...props} />
    ),
    td: ({ ...props }) => <td className="border border-gray-300 px-4 py-2" {...props} />,
    blockquote: ({ ...props }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4" {...props} />
    ),
    ul: ({ ...props }) => <ul className="list-disc pl-6 space-y-2" {...props} />,
    ol: ({ ...props }) => <ol className="list-decimal pl-6 space-y-2" {...props} />,
    li: ({ ...props }) => <li className="mb-2" {...props} />,
  }}
>
  {fullContent}
</ReactMarkdown>

        </div>
      </div>

      {articulosRelacionados.length > 0 ? (
        <div className="max-w-6xl mx-auto px-4 mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Más artículos sobre {articulo?.category || "este tema"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {articulosRelacionados.map((rel) => (
              <Link key={rel.id} href={`/articulos/${rel.slug}`} className="block group">
                <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
                  <Image
                    src={rel.image || "/default-image.jpg"}
                    alt={`Imagen del artículo: ${rel.title}`}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-500 transition-colors">
                      {rel.title || "Título no disponible"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {rel.meta_description || rel.description || "No hay descripción disponible."}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 mt-10 text-center">
          <p className="text-gray-600">No se encontraron artículos relacionados.</p>
        </div>
      )}

      {structuredData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      )}
    </section>
  );
}
