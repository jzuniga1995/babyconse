export async function GET() {
  // Rutas estáticas
  const staticUrls = [
    { url: "https://www.saludyser.com", lastModified: new Date().toISOString() },
    { url: "https://www.saludyser.com/contacto", lastModified: new Date().toISOString() },
    { url: "https://www.saludyser.com/foro", lastModified: new Date().toISOString() },
    { url: "https://www.saludyser.com/politica", lastModified: new Date().toISOString() },
    { url: "https://www.saludyser.com/terminos", lastModified: new Date().toISOString() },
    { url: "https://www.saludyser.com/nosotros", lastModified: new Date().toISOString() },
  ];

  // Variables para datos dinámicos
  let articles = [];
  let categories = [];

  // Obtener datos dinámicos de artículos
  try {
    const articlesRes = await fetch("https://www.saludyser.com/api/articulos");
    if (!articlesRes.ok) throw new Error("Error al obtener artículos");
    articles = await articlesRes.json();
  } catch (error) {
    console.error("Error al cargar artículos:", error.message);
  }

  // Obtener datos dinámicos de categorías
  try {
    const categoriesRes = await fetch("https://www.saludyser.com/api/categorias");
    if (!categoriesRes.ok) throw new Error("Error al obtener categorías");
    categories = await categoriesRes.json();
  } catch (error) {
    console.error("Error al cargar categorías:", error.message);
  }

  // Generar URLs dinámicas para artículos
  const articleUrls = Array.isArray(articles)
    ? articles
        .filter((article) => article.slug) // Filtrar artículos sin slug
        .map((article) => ({
          url: `https://www.saludyser.com/articulos/${encodeURIComponent(article.slug)}`,
          lastModified: new Date(article.updatedAt || new Date()).toISOString(),
        }))
    : [];

  // Generar URLs dinámicas para categorías
  const categoryUrls = Array.isArray(categories)
    ? categories
        .filter((category) => category.slug) // Filtrar categorías sin slug
        .map((category) => ({
          url: `https://www.saludyser.com/categorias/${encodeURIComponent(category.slug)}`,
          lastModified: new Date().toISOString(),
        }))
    : [];

  // Combinar todas las URLs
  const urls = [...staticUrls, ...articleUrls, ...categoryUrls];

  // Generar el XML del sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
        .map(
          ({ url, lastModified }) => `
        <url>
          <loc>${url}</loc>
          <lastmod>${lastModified}</lastmod>
        </url>
      `
        )
        .join("")}
    </urlset>`;

  // Retornar el sitemap como respuesta
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
