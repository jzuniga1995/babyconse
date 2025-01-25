import Link from "next/link";

export default function PoliticaDePrivacidad() {
  return (
    <div className="container mx-auto px-6 py-12 text-center">
      {/* Título principal */}
      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        Política de Privacidad
      </h1>

      {/* Introducción */}
      <section className="mb-16">
        <p className="text-lg text-gray-600">
          En <span className="font-bold text-green-600">SaludySer</span>, valoramos tu privacidad y nos comprometemos a proteger
          cualquier información personal que compartas con nosotros. Esta Política de Privacidad describe cómo recopilamos,
          usamos y protegemos tus datos cuando visitas nuestro sitio web.
        </p>
      </section>

      {/* Información recopilada */}
      <section className="bg-gray-100 py-8 px-6 rounded-lg mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Información que Recopilamos
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-4 inline-block text-left max-w-lg">
          <li>
            <span className="font-semibold">Información personal</span>: Como tu nombre, correo electrónico u otra información que proporciones al suscribirte a nuestras noticias o enviar consultas.
          </li>
          <li>
            <span className="font-semibold">Datos de navegación</span>: Como tu dirección IP, tipo de navegador, tiempo de visita y páginas que has explorado.
          </li>
          <li>
            <span className="font-semibold">Cookies</span>: Usamos cookies para mejorar tu experiencia y personalizar el contenido que ves.
          </li>
        </ul>
      </section>

      {/* Uso de la información */}
      <section className="py-8 px-6 rounded-lg mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Cómo Usamos Tu Información
        </h2>
        <p className="text-gray-600 mb-4 max-w-lg mx-auto">
          La información que recopilamos se utiliza para:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-4 inline-block text-left max-w-lg">
          <li>Proporcionarte acceso a nuestros artículos y servicios.</li>
          <li>Mejorar tu experiencia en el sitio web.</li>
          <li>Enviar actualizaciones y noticias relacionadas con <span className="font-bold text-green-600">SaludySer</span>.</li>
          <li>Analizar datos de tráfico para optimizar nuestro contenido y diseño.</li>
        </ul>
      </section>

      {/* Derechos del usuario */}
      <section className="bg-gray-100 py-8 px-6 rounded-lg mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Tus Derechos
        </h2>
        <p className="text-gray-600 mb-4 max-w-lg mx-auto">
          Tienes derecho a:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-4 inline-block text-left max-w-lg">
          <li>Acceder, corregir o eliminar tu información personal.</li>
          <li>Solicitar que dejemos de usar tu información para ciertos fines.</li>
          <li>Retirar tu consentimiento para el uso de tus datos en cualquier momento.</li>
        </ul>
        <p className="text-gray-600 mt-6 max-w-lg mx-auto">
          Para ejercer estos derechos, por favor visita nuestra página de contacto:{" "}
          <Link href="/contacto" className="text-green-600 underline">
            Contacto
          </Link>.
        </p>
      </section>

      {/* CTA final */}
      <section className="bg-green-600 text-white py-8 px-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4">¿Tienes dudas?</h3>
        <p className="text-lg mb-6 max-w-lg mx-auto">
          Si tienes preguntas sobre esta Política de Privacidad, no dudes en contactarnos a través de nuestra página de contacto.
        </p>
        <Link
          href="/contacto"
          className="inline-block bg-white text-green-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          Ir a Contacto
        </Link>
      </section>
    </div>
  );
}
