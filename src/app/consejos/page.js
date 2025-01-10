import Card from "../components/Card";

export default function Consejos() {
  const consejos = [
    {
      title: "Cómo establecer rutinas de sueño",
      description:
        "Aprende a establecer horarios de sueño efectivos para tu bebé.",
      link: "/consejos/rutinas-de-sueno",
    },
    {
      title: "Alimentación saludable",
      description:
        "Consejos sobre lactancia materna y alimentos recomendados.",
      link: "/consejos/alimentacion-saludable",
    },
    {
      title: "Primeros pasos en el desarrollo",
      description:
        "Actividades y juegos para estimular el desarrollo temprano.",
      link: "/consejos/desarrollo-temprano",
    },
  ];

  return (
    <section className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Consejos para Padres Primerizos
      </h1>
      <p className="text-center text-gray-600 mt-4">
        Descubre los mejores consejos para cuidar y criar a tu bebé.
      </p>
      <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {consejos.map((consejo, index) => (
          <Card
            key={index}
            title={consejo.title}
            description={consejo.description}
            link={consejo.link}
          />
        ))}
      </div>
    </section>
  );
}
