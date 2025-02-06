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

  // Variables dinámicas para artículos y categorías
  let articles = [];
  let categories = [];

  // Normalizar slugs
  function normalizeSlug(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remover tildes
      .replace(/\s+/g, "-") // Reemplazar espacios por guiones
      .replace(/[^\w\-]+/g, ""); // Eliminar caracteres no válidos
  }

  // Obtener artículos desde API
  try {
    const articlesRes = await fetch("https://www.saludyser.com/api/articulos");
    if (!articlesRes.ok) throw new Error("Error al obtener artículos");
    const articlesData = await articlesRes.json();
    articles = articlesData.data || [];
  } catch (error) {
    console.error("Error al cargar artículos:", error.message);
  }

  // Obtener categorías desde API
  try {
    const categoriesRes = await fetch("https://www.saludyser.com/api/categorias");
    if (!categoriesRes.ok) throw new Error("Error al obtener categorías");
    const categoriesData = await categoriesRes.json();
    categories = Array.isArray(categoriesData) ? categoriesData : Object.values(categoriesData);
  } catch (error) {
    console.error("Error al cargar categorías:", error.message);
  }

  // Generar URLs dinámicas para artículos
  const articleUrls = articles.map((article) => ({
    url: `https://www.saludyser.com/articulos/${encodeURIComponent(article.slug)}`,
    lastModified: new Date(article.updatedAt || article.published_at || new Date()).toISOString(),
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

  // Retornar el sitemap
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
