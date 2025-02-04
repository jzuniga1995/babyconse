import ReactMarkdown from "react-markdown";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

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

// 📌 Generar metadatos dinámicos
export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const response = await fetch(`${baseUrl}/api/articulos/${slug}`, {
      next: { revalidate: 3600 },
    });

    if (response.ok) {
      const data = await response.json();
      const articulo = data.articulo;

      return {
        title: `${articulo.title} | Salud y Ser`,
        description:
          articulo.meta_description || articulo.description || "Lee más sobre este interesante tema.",
        openGraph: {
          title: articulo.title,
          description:
            articulo.meta_description || articulo.description || "Descubre más información útil.",
          type: "article",
          image: articulo.image || "/default-image.jpg",
          url: `${baseUrl}/articulos/${slug}`,
        },
      };
    }
  } catch (error) {
    console.error("Error al generar metadatos:", error.message);
  }

  return {
    title: "Artículo no encontrado - Salud y Ser",
    description: "El artículo que buscas no está disponible.",
  };
}

// 📌 Página del artículo
export default async function ArticuloDetallesPage({ params }) {
  const { slug } = params;

  let articulo = null;
  let articulosRelacionados = [];
  let referencias = [];

  try {
    // Obtener el artículo y sus datos relacionados
    const response = await fetch(`${baseUrl}/api/articulos/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error("No se encontró el artículo.");
    const data = await response.json();

    articulo = data.articulo;
    articulosRelacionados = data.relacionados || [];

    // Obtener referencias del artículo
    const refResponse = await fetch(`${baseUrl}/api/articulo_referencias/${articulo.id}`, {
    next: { revalidate: 3600 },
    });
    if (refResponse.ok) {
      const refData = await refResponse.json();
      referencias = refData.references || [];
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error.message);
  }

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
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mt-8 space-y-6">
          <ReactMarkdown
            components={{
              h2: ({ ...props }) => (
                <h2
                  className="text-2xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mt-8"
                  {...props}
                />
              ),
              h3: ({ ...props }) => (
                <h3 className="text-xl font-medium text-gray-700 mt-6" {...props} />
              ),
              blockquote: ({ ...props }) => (
                <blockquote
                  className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4"
                  {...props}
                />
              ),
              ul: ({ ...props }) => <ul className="list-disc pl-6 space-y-2" {...props} />,
              ol: ({ ...props }) => <ol className="list-decimal pl-6 space-y-2" {...props} />,
              li: ({ ...props }) => <li className="mb-2" {...props} />,
            }}
          >
            {articulo?.full_content || "Contenido no disponible."}
          </ReactMarkdown>
        </div>

        {referencias.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2">
              Fuentes y Referencias
            </h2>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              {referencias.map((ref, index) => (
                <li key={index}>
                  <a
                    href={ref.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 underline"
                  >
                    {ref.title || "Referencia sin título"}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {articulosRelacionados.length > 0 ? (
        <div className="max-w-4xl mx-auto px-4 mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Más artículos sobre {articulo?.category || "este tema"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {articulosRelacionados.map((rel) => (
              <Link key={rel.id} href={`/articulos/${rel.slug}`} className="block group">
                <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
                  <Image
                    src={rel.image || "/default-image.jpg"}
                    alt={`Imagen del artículo: ${rel.title}`}
                    width={400}
                    height={200}
                    className="object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-500 transition-colors">
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
    </section>
  );
}
