export async function GET() {
  console.log("Generando sitemap...");

  // Rutas estáticas
  const staticUrls = [
    { url: "https://www.saludyser.com", lastModified: new Date().toISOString() },
    { url: "https://www.saludyser.com/contacto", lastModified: new Date().toISOString() },
    { url: "https://www.saludyser.com/foro", lastModified: new Date().toISOString() },
    { url: "https://www.saludyser.com/politica", lastModified: new Date().toISOString() },
    { url: "https://www.saludyser.com/terminos", lastModified: new Date().toISOString() },
    { url: "https://www.saludyser.com/nosotros", lastModified: new Date().toISOString() },
  ];

  // Generar XML del sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticUrls
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
  console.log("Sitemap generado con", staticUrls.length, "URLs estáticas");

  // Retornar el sitemap
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate", // Evitar caché
    },
  });
}
