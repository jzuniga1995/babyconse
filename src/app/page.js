import Hero from "./components/Hero";


export default function Home() {
  return (
    <>
      <Hero/>
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Descubre nuestros recursos
        </h2>
        <p className="text-gray-600 text-center mt-4">
          Encuentra consejos prácticos, herramientas y más.
        </p>
      </section>
    </>
  );
}
