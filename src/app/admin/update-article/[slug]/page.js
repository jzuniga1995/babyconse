"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function UpdateArticle() {
  const router = useRouter();
  const { slug } = useParams(); 
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

  const handleSubmit = async (e, append = false) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/articulos/${slug}?append=${append}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article),
      });

      if (response.ok) {
        alert("Artículo actualizado correctamente.");
        router.push("/admin");
      } else {
        console.error("Error al actualizar el artículo.");
        alert("Error al actualizar el artículo.");
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Hubo un error al actualizar el artículo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Actualizar Artículo</h1>
      <form className="space-y-6">
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
          placeholder="Añadir nuevo contenido"
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

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, false)}
            className="flex-1 bg-red-500 text-white px-4 py-3 rounded-lg text-lg font-semibold hover:bg-red-600"
            disabled={isSubmitting}
          >
            Reemplazar Contenido
          </button>

          <button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            className="flex-1 bg-green-500 text-white px-4 py-3 rounded-lg text-lg font-semibold hover:bg-green-600"
            disabled={isSubmitting}
          >
            Agregar Contenido
          </button>
        </div>
      </form>
    </div>
  );
}
