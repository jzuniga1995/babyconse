/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tusitio.com', // Dominio principal
        port: '', // Deja vacío si no usas un puerto específico
        pathname: '/images/**', // Ruta de las imágenes
      },
      {
        protocol: 'https',
        hostname: 'cdn.tusitio.com', // Ejemplo de otro dominio
        port: '',
        pathname: '/assets/images/**', // Ruta de imágenes en el CDN
      },
    ],
  },
};

export default nextConfig;
