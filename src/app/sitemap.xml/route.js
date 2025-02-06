export async function GET() {
    console.log("Generando sitemap...");
  

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
  
    // Cargar artículos dinámicos
    try {
      const articlesRes = await fetch("https://www.saludyser.com/api/articulos");
      if (!articlesRes.ok) throw new Error(`Error al obtener artículos: ${articlesRes.status}`);
      const articlesData = await articlesRes.json();
      articles = Array.isArray(articlesData?.data) ? articlesData.data : [];
      console.log("Artículos cargados:", articles.length);
    } catch (error) {
      console.error("Error al cargar artículos:", error.message);
    }
  
    // Cargar categorías dinámicas
    try {
      const categoriesRes = await fetch("https://www.saludyser.com/api/categorias");
      if (!categoriesRes.ok) throw new Error(`Error al obtener categorías: ${categoriesRes.status}`);
      const categoriesData = await categoriesRes.json();
      categories = Array.isArray(categoriesData) ? categoriesData : Object.values(categoriesData);
      console.log("Categorías cargadas:", categories.length);
    } catch (error) {
      console.error("Error al cargar categorías:", error.message);
    }
  
    // Generar URLs para artículos
    const articleUrls = articles.map((article) => ({
      url: `https://www.saludyser.com/articulos/${encodeURIComponent(article.slug)}`,
      lastModified: new Date(article.updatedAt || article.published_at || new Date()).toISOString(),
    }));
  
    // Generar URLs para categorías
    const categoryUrls = categories.map((category) => ({
      url: `https://www.saludyser.com/categorias/${normalizeSlug(category.slug)}`,
      lastModified: new Date().toISOString(),
    }));
  
    // Combinar URLs
    const urls = [...staticUrls, ...articleUrls, ...categoryUrls];
  
    // Generar XML del sitemap
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
  
    // Verificar el sitemap generado (opcional, solo para debugging)
    console.log("Sitemap generado con", urls.length, "URLs");
  
    // Retornar el sitemap
    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate", // Evitar caché
      },
    });
  }
  