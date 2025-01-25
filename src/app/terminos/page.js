import Link from "next/link";

export default function TerminosYCondiciones() {
  return (
    <div className="container mx-auto px-6 py-12 text-center">
      {/* Título principal */}
      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        Términos y Condiciones
      </h1>

      {/* Introducción */}
      <section className="mb-16">
        <p className="text-lg text-gray-600 max-w-lg mx-auto">
          Bienvenido a <span className="font-bold text-green-600">SaludySer</span>. Al acceder y utilizar este sitio web, aceptas cumplir con los
          siguientes términos y condiciones. Te recomendamos leerlos cuidadosamente antes de continuar navegando.
        </p>
      </section>

      {/* Uso del sitio */}
      <section className="bg-gray-100 py-8 px-6 rounded-lg mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Uso del Sitio</h2>
        <p className="text-gray-600 mb-4 max-w-lg mx-auto">
          El contenido de este sitio web es solo para fines informativos y educativos. No reemplaza el asesoramiento médico, diagnóstico o tratamiento profesional. Consulta siempre a un profesional de la salud para cualquier duda relacionada con tu salud.
        </p>
        <p className="text-gray-600 max-w-lg mx-auto">
          Como usuario, te comprometes a utilizar este sitio de manera responsable y a no realizar actividades que puedan dañar, interrumpir o afectar el funcionamiento del sitio o la experiencia de otros usuarios.
        </p>
      </section>

      {/* Propiedad intelectual */}
      <section className="py-8 px-6 rounded-lg mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Propiedad Intelectual
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto">
          Todo el contenido de <span className="font-bold text-green-600">SaludySer</span>, incluyendo textos, imágenes, logotipos y diseño, está protegido por derechos de autor y otras leyes de propiedad intelectual. Está prohibido copiar, reproducir o distribuir cualquier contenido sin el permiso explícito del propietario.
        </p>
      </section>

      {/* Limitación de responsabilidad */}
      <section className="bg-gray-100 py-8 px-6 rounded-lg mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Limitación de Responsabilidad
        </h2>
        <p className="text-gray-600 mb-4 max-w-lg mx-auto">
          Aunque hacemos todo lo posible por garantizar la exactitud y calidad del contenido en <span className="font-bold text-green-600">SaludySer</span>, no ofrecemos garantías sobre su precisión, integridad o actualidad. El uso de este sitio web es bajo tu propia responsabilidad.
        </p>
        <p className="text-gray-600 max-w-lg mx-auto">
          No somos responsables de cualquier daño o pérdida resultante del uso de la información presentada en este sitio.
        </p>
      </section>

      {/* Enlaces externos */}
      <section className="py-8 px-6 rounded-lg mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Enlaces a Terceros</h2>
        <p className="text-gray-600 max-w-lg mx-auto">
          Este sitio puede contener enlaces a sitios web externos. No tenemos control sobre el contenido, políticas o prácticas de esos sitios y no asumimos responsabilidad alguna por ellos.
        </p>
      </section>

      {/* Modificaciones a los términos */}
      <section className="bg-gray-100 py-8 px-6 rounded-lg mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Modificaciones a Estos Términos
        </h2>
        <p className="text-gray-600 mb-4 max-w-lg mx-auto">
          Nos reservamos el derecho de actualizar o modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en esta página.
        </p>
        <p className="text-gray-600 max-w-lg mx-auto">
          Te recomendamos revisar periódicamente esta página para estar al tanto de cualquier cambio.
        </p>
      </section>

      {/* CTA final */}
      <section className="bg-green-600 text-white py-8 px-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold mb-4">¿Tienes preguntas?</h3>
        <p className="text-lg mb-6 max-w-lg mx-auto">
          Si tienes dudas sobre estos Términos y Condiciones, visita nuestra página de contacto.
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
