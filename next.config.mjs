/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.saludyser.com", // Dominio principal
        pathname: "/images/**", // Ruta de imágenes dentro de tu dominio
      },
      {
        protocol: "https",
        hostname: "cdn.saludyser.com", // Si tienes un CDN
        pathname: "/assets/images/**",
      },
    ],
  },
};

export default nextConfig;
