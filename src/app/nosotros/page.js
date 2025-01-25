import Link from "next/link";
export default function SobreNosotros() {
    return (
      <div className="container mx-auto px-6 py-12">
        {/* Título principal */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Sobre Mí
        </h1>
  
        {/* Introducción personal */}
        <section className="text-center mb-12">
          <p className="text-lg text-gray-600">
            ¡Hola! Soy el creador de <span className="font-bold text-green-600">SaludySer</span>, 
            un espacio dedicado a explorar temas de salud y bienestar desde una perspectiva accesible, basada en información confiable y respaldada por investigaciones.
          </p>
          <p className="mt-4 text-gray-600">
            Aunque no soy médico, mi compromiso es ofrecer contenido que inspire, eduque y motive a quienes buscan mejorar su calidad de vida. Mi objetivo es aprender junto a ti y compartir información que pueda marcar la diferencia en tu día a día.
          </p>
          {/* Párrafo adicional: motivación */}
          <p className="mt-6 text-gray-600">
            Este proyecto nació de mi interés personal por el bienestar y la necesidad de contar con información clara y práctica en un mundo lleno de datos confusos. En <span className="font-bold text-green-600">SaludySer</span>, encontrarás artículos basados en investigaciones y estudios confiables, con un enfoque en temas como alimentación, ejercicio, salud mental y estilos de vida saludables. Mi meta es ayudarte a tomar decisiones informadas y prácticas para mejorar tu calidad de vida.
          </p>
        </section>
  
        {/* Misión, visión y valores */}
        <section className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 mb-12">
          {/* Misión */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">Mi Misión</h3>
            <p className="text-gray-600">
              Compartir investigaciones y artículos bien documentados para ayudar a las personas a tomar decisiones informadas sobre su salud y bienestar.
            </p>
          </div>
          {/* Visión */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">Mi Visión</h3>
            <p className="text-gray-600">
              Construir una comunidad en línea donde el conocimiento y la curiosidad sean las herramientas principales para vivir mejor.
            </p>
          </div>
          {/* Valores */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">Mis Valores</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Compromiso con la calidad de la información</li>
              <li>Honestidad y transparencia</li>
              <li>Pasión por aprender y compartir</li>
              <li>Empatía hacia quienes buscan mejorar su vida</li>
            </ul>
          </div>
        </section>
  
        {/* CTA final */}
        <section className="text-center bg-green-600 text-white py-8 px-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4">
            ¿Te interesa aprender más sobre salud y bienestar?
          </h3>
          <p className="text-lg mb-6">
            Explora los artículos que he preparado con dedicación y compromiso. Juntos, podemos construir hábitos más saludables y conscientes.
          </p>
          <Link
          href="/articulos"
          className="inline-block bg-white text-green-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          Ver Artículos
        </Link>
        </section>
      </div>
    );
  }
  