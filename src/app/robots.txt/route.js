export async function GET() {
    const content = `
  User-agent: *
  Disallow:
  
  Sitemap: https://www.saludyser.com/sitemap.xml
    `.trim(); // El contenido del robots.txt
  
    return new Response(content, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  
  