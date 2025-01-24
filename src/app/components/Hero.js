import Link from "next/link";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-400 via-green-500 to-teal-600 text-white py-20 sm:py-32 relative mt-[64px]">
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
          Bienvenidos a <span className="text-yellow-300">SaludySer</span>
        </h1>
        <p className="mt-4 text-sm sm:text-lg lg:text-xl text-gray-100">
          Descubre artículos, consejos y herramientas para mejorar tu bienestar
          físico, mental y emocional.
        </p>

        {/* Botones */}
        <div className="mt-6 flex flex-col sm:flex-row gap-6 lg:gap-8 justify-center">
          <Link href="/articulos" passHref>
            <Button
              text={
                <>
                  <span className="inline-block mr-2 text-base sm:text-lg">📖</span> Leer Artículos
                </>
              }
              className="bg-yellow-400 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-300 hover:shadow-xl hover:scale-110 transition-transform duration-300"
            />
          </Link>
          <Link href="/foro" passHref>
            <Button
              text={
                <>
                  <span className="inline-block mr-2 text-base sm:text-lg">💬</span> Foro
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
            "Tu bienestar es nuestra prioridad. Explora consejos respaldados por expertos para mejorar tu calidad de vida."
          </p>
        </div>
      </div>

      {/* Decoración: íconos */}
      <div className="absolute top-16 left-6 sm:left-10 animate-bounce hover:scale-105 hover:opacity-75 transition-transform duration-300 z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-10 sm:w-14 lg:w-16 opacity-70 text-white"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          <path d="M3 11h3l2-2 4 4 3-3 2 2h3" />
        </svg>
      </div>
      <div className="absolute bottom-8 right-4 sm:bottom-12 sm:right-10 animate-bounce hover:scale-105 hover:opacity-75 transition-transform duration-300 z-10">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 sm:w-12 lg:w-16 opacity-70 text-white"
  >
    <circle cx="12" cy="5" r="2" />
    <path d="M12 22v-5M9 12l3 3 3-3" />
    <path d="M6 12a6 6 0 0 1 12 0" />
  </svg>
</div>

    </section>
  );
}
