export default function Comunidad() {
    return (
      <section className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Comunidad de Padres
        </h1>
        <p className="text-center text-gray-600 mt-4">
          Únete a nuestra comunidad para compartir experiencias y consejos con
          otros padres.
        </p>
        <div className="mt-8 flex flex-col items-center space-y-4">
          <div className="w-full max-w-2xl bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Foro de discusión
            </h2>
            <p className="mt-2 text-gray-600">
              Participa en debates sobre temas importantes de crianza.
            </p>
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Explorar el foro
            </button>
          </div>
          <div className="w-full max-w-2xl bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Historias inspiradoras
            </h2>
            <p className="mt-2 text-gray-600">
              Lee y comparte experiencias de padres primerizos como tú.
            </p>
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Ver historias
            </button>
          </div>
        </div>
      </section>
    );
  }
  