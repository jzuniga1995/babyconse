import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-gray-200 relative">
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            {/* Columna 1: Redes Sociales */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">Síguenos</h3>
              <div className="flex justify-center md:justify-start space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gray-800 hover:bg-blue-600 transition-all"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="h-6 w-6 text-white" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gray-800 hover:bg-pink-500 transition-all"
                  aria-label="Instagram"
                >
                  <FaInstagram className="h-6 w-6 text-white" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gray-800 hover:bg-black transition-all"
                  aria-label="TikTok"
                >
                  <FaTiktok className="h-6 w-6 text-white" />
                </a>
              </div>
            </div>

            {/* Columna 2: Navegación */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">Navegación</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#about"
                    className="text-sm hover:text-white transition-all"
                  >
                    Sobre Nosotros
                  </a>
                </li>
                <li>
                  <a
                    href="/contacto"
                    className="text-sm hover:text-white transition-all"
                  >
                    Contacto
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy"
                    className="text-sm hover:text-white transition-all"
                  >
                    Política de Privacidad
                  </a>
                </li>
                <li>
                  <a
                    href="#terms"
                    className="text-sm hover:text-white transition-all"
                  >
                    Términos y Condiciones
                  </a>
                </li>
              </ul>
            </div>

            {/* Columna 3: Información */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">Información</h3>
              <p className="text-sm text-gray-400">
                © 2025 Salud y Ser. Todos los derechos reservados.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Desarrollado con ❤️ por Salud y Ser.
              </p>
            </div>
          </div>

          {/* Mensaje Inspirador */}
          <div className="mt-10 text-center">
            <p className="text-lg text-gray-300 italic">
              "Cuidar de tu cuerpo y mente es el primer paso para vivir plenamente. ¡Cree en ti y sigue adelante!"
            </p>
          </div>

          {/* Línea Divisoria */}
          <div className="mt-10 border-t border-gray-800 pt-6 text-center">
            <p className="text-sm text-gray-500">
              Gracias por visitarnos. ¡Te esperamos pronto!
            </p>
          </div>
        </div>
      </footer>

      {/* Botón Ir Arriba */}
      <div className="fixed bottom-16 right-5 sm:bottom-20 sm:right-8">
        <a
          href="#"
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 rounded-full shadow-md hover:shadow-xl transition-all transform hover:scale-110 hover:animate-bounce flex items-center justify-center"
          aria-label="Ir arriba"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </a>
      </div>
    </>
  );
}
