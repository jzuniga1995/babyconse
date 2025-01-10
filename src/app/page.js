import Hero from "./components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Introducción */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center leading-tight">
          Bienvenidos a <span className="text-blue-500">Consejos para Padres Primerizos</span>
        </h2>
        <p className="text-lg text-gray-600 text-center mt-4 max-w-3xl mx-auto">
          Encuentra herramientas prácticas, guías y recursos diseñados para hacer de la paternidad una experiencia inolvidable. Porque ser padre primerizo puede ser retador, ¡pero también increíble!
        </p>
      </section>

      {/* Sección de Recursos Destacados */}
      <section className="container mx-auto px-6 py-16 bg-gray-100 rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Recursos más populares
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Recurso 1 */}
          <div className="group relative overflow-hidden rounded-lg shadow-md bg-white transition-transform transform hover:scale-105">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Guía de Lactancia"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h4 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-500 transition">
                Guía de Lactancia
              </h4>
              <p className="text-gray-600 mt-3">
                Aprende las mejores prácticas para una lactancia exitosa y disfruta de una conexión especial con tu bebé.
              </p>
              <a
                href="consejos"
                className="mt-4 inline-block text-blue-600 font-medium hover:underline"
              >
                Leer más →
              </a>
            </div>
          </div>

          {/* Recurso 2 */}
          <div className="group relative overflow-hidden rounded-lg shadow-md bg-white transition-transform transform hover:scale-105">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Rutinas de Sueño"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h4 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-500 transition">
                Rutinas de Sueño
              </h4>
              <p className="text-gray-600 mt-3">
                Descubre cómo establecer hábitos saludables de sueño para tu bebé desde el primer día.
              </p>
              <a
                href="#"
                className="mt-4 inline-block text-blue-600 font-medium hover:underline"
              >
                Leer más →
              </a>
            </div>
          </div>

          {/* Recurso 3 */}
          <div className="group relative overflow-hidden rounded-lg shadow-md bg-white transition-transform transform hover:scale-105">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Alimentación Complementaria"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h4 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-500 transition">
                Alimentación Complementaria
              </h4>
              <p className="text-gray-600 mt-3">
                Aprende cómo introducir alimentos sólidos de manera segura y divertida.
              </p>
              <a
                href="#"
                className="mt-4 inline-block text-blue-600 font-medium hover:underline"
              >
                Leer más →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Testimonios */}
      <section className="container mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold text-gray-800 text-center">
          Historias de nuestros lectores
        </h3>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Testimonio 1 */}
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
            <p className="text-gray-700 text-lg italic">
              "Gracias a los consejos de esta página, mi pareja y yo pudimos establecer rutinas de sueño desde el primer mes. ¡Es un recurso increíble!"
            </p>
            <p className="text-right mt-6 text-sm font-semibold text-gray-600">
              — Ana G.
            </p>
          </div>

          {/* Testimonio 2 */}
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
            <p className="text-gray-700 text-lg italic">
              "Como padre primerizo, estaba lleno de dudas. Los recursos y guías me ayudaron a sentirme más preparado y a disfrutar cada momento."
            </p>
            <p className="text-right mt-6 text-sm font-semibold text-gray-600">
              — Carlos M.
            </p>
          </div>
        </div>
      </section>

      {/* Llamado a la Acción */}
      <section className="container mx-auto px-6 py-16 bg-blue-500 text-white rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold text-center">
          ¡Empieza a disfrutar la paternidad hoy!
        </h3>
        <p className="text-lg text-center mt-4 max-w-2xl mx-auto">
          Explora todos los recursos que hemos preparado para ti y descubre cómo convertir los desafíos de ser padre primerizo en momentos inolvidables.
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href="#"
            className="bg-white text-blue-500 font-medium px-6 py-3 rounded-md shadow hover:shadow-lg hover:bg-gray-100 transition"
          >
            Explorar Recursos
          </a>
        </div>
      </section>
    </>
  );
}
