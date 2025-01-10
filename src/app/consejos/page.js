
export default function Consejos() {
  const consejos = [
    {
      title: "Cómo establecer rutinas de sueño",
      description:
        "Aprende a establecer horarios de sueño efectivos para tu bebé y garantizar un descanso reparador.",
      link: "/consejos/rutinas-de-sueno",
      image: "https://via.placeholder.com/300x200", // URL de la imagen
    },
    {
      title: "Alimentación saludable",
      description:
        "Consejos esenciales sobre lactancia materna y los mejores alimentos para el desarrollo de tu bebé.",
      link: "/consejos/alimentacion-saludable",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Primeros pasos en el desarrollo",
      description:
        "Actividades y juegos para estimular el desarrollo físico y cognitivo temprano.",
      link: "/consejos/desarrollo-temprano",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Preparación para la llegada del bebé",
      description:
        "Todo lo que necesitas saber para preparar tu hogar y tus emociones para el gran día.",
      link: "/consejos/preparacion-para-el-bebe",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Cómo manejar el llanto del bebé",
      description:
        "Técnicas para calmar a tu bebé y comprender lo que necesita en cada momento.",
      link: "/consejos/manejar-el-llanto",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Importancia del tiempo de calidad",
      description:
        "La relevancia de dedicar tiempo exclusivo para fortalecer el vínculo con tu bebé.",
      link: "/consejos/tiempo-de-calidad",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <section className="container mx-auto px-6 py-12">
      {/* Título y Descripción */}
      <h1 className="text-4xl font-extrabold text-center text-gray-800">
        Consejos para Padres Primerizos
      </h1>
      <p className="text-lg text-center text-gray-600 mt-4 max-w-3xl mx-auto">
        Encuentra los mejores consejos y recursos prácticos para afrontar cada etapa de la crianza con confianza y amor.
      </p>

      {/* Grid de Artículos */}
      <div className="grid gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
        {consejos.map((consejo, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Imagen del Artículo */}
            <img
              src={consejo.image}
              alt={consejo.title}
              className="w-full h-48 object-cover transition-transform transform group-hover:scale-105"
            />

            {/* Contenido del Artículo */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-500 transition">
                {consejo.title}
              </h3>
              <p className="text-gray-600 mt-2">{consejo.description}</p>
              <a
                href={consejo.link}
                className="text-blue-600 font-medium mt-4 inline-block hover:underline"
              >
                Leer más →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
