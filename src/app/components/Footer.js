export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Columna 1: Navegación */}
          <div>
            <h3 className="text-lg font-bold mb-4">Navegación</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-sm hover:underline">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm hover:underline">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-sm hover:underline">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#terms" className="text-sm hover:underline">
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 2: Redes Sociales */}
          <div>
            <h3 className="text-lg font-bold mb-4">Síguenos</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99h-2.54v-2.888h2.54V9.797c0-2.507 1.493-3.891 3.775-3.891 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.876h2.773l-.443 2.888h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016.87 2c-2.66 0-4.41 2.22-3.74 4.7A12.94 12.94 0 013 4.09s-4 9 5 13a13 13 0 01-7 2c9 5.5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 1.5A4 4 0 0 0 3.5 7.5v9a4 4 0 0 0 4 4h9a4 4 0 0 0 4-4v-9a4 4 0 0 0-4-4h-9zM12 6.75a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zM17.125 6a.875.875 0 1 1 0 1.75.875.875 0 0 1 0-1.75z" />
                </svg>
              </a>
              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                aria-label="TikTok"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M9 3h4.5c.2 1.5.8 3 2 3h3v3h-3c-1.2 0-2-.5-2.5-1.5v8.4c0 3-2.4 5.6-5.6 5.6S2 19.5 2 16.4c0-3 2.4-5.4 5.6-5.4H9v3H7.5a3.1 3.1 0 1 0 3.1 3.1V3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Columna 3: Información */}
          <div>
            <h3 className="text-lg font-bold mb-4">Información</h3>
            <p className="text-sm text-gray-400">
              © 2025 Guía para Padres Primerizos.
            </p>
            <p className="text-sm text-gray-400">Todos los derechos reservados.</p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-400">
            Desarrollado con ❤️ por Guía para Padres Primerizos.
          </p>
        </div>
      </div>
    </footer>
  );
}
