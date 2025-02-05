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
  
    // Obtener rutas dinámicas desde tu API
    const articlesRes = await fetch("https://www.saludyser.com/api/articulos");
    const articles = await articlesRes.json();
  
    const categoriesRes = await fetch("https://www.saludyser.com/api/categorias");
    const categories = await categoriesRes.json();
  
    // Generar URLs dinámicas para artículos
    const articleUrls = articles.map((article) => ({
      url: `https://www.saludyser.com/articulos/${article.slug}`,
      lastModified: new Date(article.updatedAt).toISOString(),
    }));
  
    // Generar URLs dinámicas para categorías
    const categoryUrls = categories.map((category) => ({
      url: `https://www.saludyser.com/categorias/${category.slug}`,
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
  
    // Retornar el sitemap como respuesta
    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  }
  