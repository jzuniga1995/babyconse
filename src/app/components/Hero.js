import Button from "./Button";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white py-16 sm:py-24">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-[url('/images/hero-bg.svg')] bg-cover bg-center opacity-20 pointer-events-none"></div>

      {/* Contenido del Hero */}
      <div className="container mx-auto px-6 text-center relative">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
          Bienvenidos a la <span className="text-yellow-300">Guía para Padres</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-100">
          Encuentra consejos prácticos, recursos valiosos y una comunidad para apoyarte en cada paso del camino.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            text="Explorar Consejos"
            className="bg-yellow-400 text-gray-800 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition duration-300"
          />
          <Button
            text="Únete a la Comunidad"
            className="bg-gray-100 text-teal-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition duration-300"
          />
        </div>
      </div>
    </section>
  );
}
