"use client";

export default function Contacto() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Captura los datos del formulario
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      // Llama a la API de contacto
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        alert("Mensaje enviado exitosamente. ¡Gracias por contactarnos!");
        e.target.reset(); // Limpia el formulario después del envío
      } else {
        alert("Hubo un problema al enviar el mensaje. Por favor, inténtalo más tarde.");
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      alert("Ocurrió un error. Por favor, inténtalo nuevamente.");
    }
  };

  return (
    <section className="container mx-auto px-6 py-16 mt-16">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">Contáctanos</h1>
        <p className="text-gray-600 mt-4 text-lg">
          ¿Tienes alguna pregunta o sugerencia? ¡Estamos aquí para ayudarte!
        </p>
      </div>
      <div className="mt-12 max-w-2xl mx-auto">
        <form
          className="bg-white shadow-lg rounded-2xl p-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Tu nombre"
              className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu correo electrónico"
              className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Tu mensaje"
              rows="5"
              className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  );
}
