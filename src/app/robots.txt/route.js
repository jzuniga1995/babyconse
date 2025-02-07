export async function GET() {
  const content = `
User-agent: *
Disallow: /author/
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /static/
Allow: /

Sitemap: https://www.saludyser.com/sitemap.xml
  `.trim();

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}


