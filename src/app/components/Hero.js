import Link from "next/link";
import Button from "./Button";

export default function Hero() {
  const heroTitle = "Bienvenidos a SaludySer";
  const heroSubtitle =
    "Descubre artículos, consejos y herramientas para mejorar tu bienestar físico, mental y emocional.";

  return (
    <section className="bg-gradient-to-br from-green-400 via-green-500 to-teal-600 text-white py-20 sm:py-32 relative mt-[64px]">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute inset-0"
        >
          <path
            fill="#ffffff"
            fillOpacity="0.3"
            d="M0,64L48,85.3C96,107,192,149,288,170.7C384,192,480,192,576,192C672,192,768,192,864,160C960,128,1056,64,1152,64C1248,64,1344,128,1392,160L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-6 text-center relative animate-fadeIn">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight drop-shadow-lg mt-6 sm:mt-8">
          {heroTitle} <span className="text-yellow-300">SaludySer</span>
        </h1>
        <p className="mt-4 text-sm sm:text-lg lg:text-xl text-gray-100">
          {heroSubtitle}
        </p>

        {/* Beneficios destacados */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold text-yellow-300">💪 Salud física</h3>
            <p className="text-sm mt-2 text-gray-200">
              Encuentra rutinas de ejercicio y consejos para mantenerte activo.
            </p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold text-yellow-300">🧠 Bienestar mental</h3>
            <p className="text-sm mt-2 text-gray-200">
              Aprende a manejar el estrés y mejorar tu claridad mental.
            </p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold text-yellow-300">🥗 Nutrición</h3>
            <p className="text-sm mt-2 text-gray-200">
              Explora recetas saludables y aprende a comer mejor.
            </p>
          </div>
        </div>

        {/* Botones */}
        <div className="mt-6 flex flex-col sm:flex-row gap-6 lg:gap-8 justify-center">
          <Link href="/articulos" passHref>
            <Button
              text={
                <>
                  <span className="inline-block mr-2 text-base sm:text-lg">📖</span>{" "}
                  Leer Artículos
                </>
              }
              className="bg-yellow-400 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-300 hover:shadow-xl hover:scale-110 transition-transform duration-300"
            />
          </Link>
          <Link href="/foro" passHref>
            <Button
              text={
                <>
                  <span className="inline-block mr-2 text-base sm:text-lg">💬</span>{" "}
                  Foro
                </>
              }
              className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-400 hover:shadow-xl hover:scale-110 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Frase motivacional */}
        <div className="mt-8 sm:mt-10">
          <div className="w-20 sm:w-24 mx-auto border-t-2 border-gray-200 my-4"></div>
          <p className="text-sm sm:text-base lg:text-lg text-gray-100 font-light">
            "Tu bienestar es nuestra prioridad. Explora consejos respaldados por
            expertos para mejorar tu calidad de vida."
          </p>
        </div>
      </div>

      {/* Sección decorativa de estadísticas 
      <div className="mt-12 container mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div>
          <h3 className="text-2xl font-extrabold text-yellow-300">+100</h3>
          <p className="text-sm text-gray-100">Artículos publicados</p>
        </div>
        <div>
          <h3 className="text-2xl font-extrabold text-yellow-300">+10k</h3>
          <p className="text-sm text-gray-100">Usuarios satisfechos</p>
        </div>
        <div>
          <h3 className="text-2xl font-extrabold text-yellow-300">+5</h3>
          <p className="text-sm text-gray-100">Áreas de enfoque</p>
        </div>
      </div>*/}
    </section>
  );
}
