import { getConnection } from "../lib/db";

export async function GET() {
  // Rutas estáticas del sitio
  const staticUrls = [
    { url: "https://www.saludyser.com", lastModified: new Date().toISOString() },
    { url: "https://www.saludyser.com/contacto", lastModified: new Date().toISOString() },
    { url: "https://www.saludyser.com/foro", lastModified: new Date().toISOString() },
    { url: "https://www.saludyser.com/politica", lastModified: new Date().toISOString() },
    { url: "https://www.saludyser.com/terminos", lastModified: new Date().toISOString() },
    { url: "https://www.saludyser.com/nosotros", lastModified: new Date().toISOString() },
  ];

  let articles = [];
  let categories = [];

  // Normalizar slugs
  const normalizeSlug = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remover tildes
      .replace(/\s+/g, "-") // Reemplazar espacios con guiones
      .replace(/[^\w\-]+/g, ""); // Eliminar caracteres no válidos

  // Obtener artículos directamente desde la base de datos
  try {
    const connection = await getConnection();
    const articlesQuery = `
      SELECT slug, published_at, image, title
      FROM articulos
      ORDER BY published_at DESC
    `;
    const [articlesRows] = await connection.query(articlesQuery);
    articles = articlesRows;
    connection.release();
  } catch (error) {
    console.error("Error al cargar artículos:", error.message);
  }

  // Obtener categorías desde API o estructura estática
  try {
    const categoriesRes = await fetch("https://www.saludyser.com/api/categorias");
    if (!categoriesRes.ok) throw new Error("Error al obtener categorías");
    const categoriesData = await categoriesRes.json();
    categories = Array.isArray(categoriesData) ? categoriesData : Object.values(categoriesData);
  } catch (error) {
    console.error("Error al cargar categorías dinámicas:", error.message);
  }

  // Generar URLs dinámicas para artículos (incluyendo imágenes)
  const articleUrls = articles.map((article) => ({
    url: `https://www.saludyser.com/articulos/${encodeURIComponent(article.slug)}`,
    lastModified: new Date(article.published_at || new Date()).toISOString(),
    image: {
      url: `https://www.saludyser.com/images/articulos/${article.image}`,
      title: article.title || "",
    },
  }));

  // Generar URLs dinámicas para categorías
  const categoryUrls = categories.map((category) => ({
    url: `https://www.saludyser.com/categorias/${normalizeSlug(category.slug)}`,
    lastModified: new Date().toISOString(),
  }));

  // Combinar todas las URLs
  const urls = [...staticUrls, ...articleUrls, ...categoryUrls];

  // Generar el XML del sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    ${urls
      .map(({ url, lastModified, image }) => `
      <url>
        <loc>${url}</loc>
        <lastmod>${lastModified}</lastmod>
        ${
          image
            ? `
        <image:image>
          <image:loc>${image.url}</image:loc>
          <image:title>${image.title}</image:title>
        </image:image>
        `
            : ""
        }
      </url>
    `)
      .join("")}
  </urlset>`;

  // Retornar el sitemap
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, s-maxage=3600, must-revalidate",
    },
  });
}
