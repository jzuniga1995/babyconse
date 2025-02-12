"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function UpdateArticle() {
  const router = useRouter();
  const { slug } = useParams(); // Obtenemos el slug desde la URL
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [article, setArticle] = useState({
    title: "",
    description: "",
    link: "",
    image: "",
    category: "",
    full_content: "",
    meta_description: "",
  });

  useEffect(() => {
    if (slug) {
      fetch(`/api/articulos/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.articulo) {
            setArticle(data.articulo);
          } else {
            console.error("No se encontró el artículo.");
          }
        })
        .catch((err) => console.error("Error al obtener el artículo:", err));
    }
  }, [slug]);

  const handleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await fetch(`/api/articulos/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    });

    if (response.ok) {
      router.push("/admin");
    } else {
      console.error("Error al actualizar el artículo");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Actualizar Artículo</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Grid para organizar los campos */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={article.title}
            onChange={handleChange}
            placeholder="Título"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="text"
            name="category"
            value={article.category}
            onChange={handleChange}
            placeholder="Categoría"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <textarea
          name="description"
          value={article.description}
          onChange={handleChange}
          placeholder="Descripción breve"
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows="3"
          required
        />

        <input
          type="text"
          name="image"
          value={article.image}
          onChange={handleChange}
          placeholder="URL de la imagen"
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="text"
          name="link"
          value={article.link}
          onChange={handleChange}
          placeholder="Enlace externo (opcional)"
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <textarea
          name="full_content"
          value={article.full_content}
          onChange={handleChange}
          placeholder="Contenido completo del artículo"
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows="6"
          required
        />

        <input
          type="text"
          name="meta_description"
          value={article.meta_description}
          onChange={handleChange}
          placeholder="Meta descripción para SEO"
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* Botón de Enviar */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
          ) : (
            "Guardar Cambios"
          )}
        </button>
      </form>
    </div>
  );
}
