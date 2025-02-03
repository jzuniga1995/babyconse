/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'tusitio.com',
          port: '', // Deja vacío si no hay un puerto específico
          pathname: '/images/**', // Ajusta el path si tus imágenes están en una ruta diferente
        },
      ],
    },
  };
  
  export default nextConfig;
  