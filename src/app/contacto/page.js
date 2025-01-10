export default function Contacto() {
    return (
      <section className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Contáctanos
        </h1>
        <p className="text-center text-gray-600 mt-4">
          ¿Tienes alguna pregunta o sugerencia? ¡Estamos aquí para ayudarte!
        </p>
        <div className="mt-8 max-w-lg mx-auto">
          <form className="bg-white shadow rounded-lg p-6 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                placeholder="Tu nombre"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                placeholder="Tu correo electrónico"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                placeholder="Tu mensaje"
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Enviar mensaje
            </button>
          </form>
        </div>
      </section>
    );
  }
  