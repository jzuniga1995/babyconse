"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function UpdateArticle() {
  const router = useRouter();
  const { slug } = useParams(); // Obtenemos el slug desde la URL

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
      fetch(`/api/articles/${slug}`) // Usamos slug en lugar de id
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
    const response = await fetch(`/api/articles/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    });

    if (response.ok) {
      router.push("/admin");
    } else {
      console.error("Error al actualizar el artículo");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Actualizar Artículo</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" value={article.title} onChange={handleChange} placeholder="Título" className="w-full p-2 border rounded" required />
        <input type="text" name="description" value={article.description} onChange={handleChange} placeholder="Descripción" className="w-full p-2 border rounded" required />
        <input type="text" name="category" value={article.category} onChange={handleChange} placeholder="Categoría" className="w-full p-2 border rounded" required />
        <input type="text" name="image" value={article.image} onChange={handleChange} placeholder="URL de la imagen" className="w-full p-2 border rounded" />
        <input type="text" name="link" value={article.link} onChange={handleChange} placeholder="Enlace externo (opcional)" className="w-full p-2 border rounded" />
        <textarea name="full_content" value={article.full_content} onChange={handleChange} placeholder="Contenido completo del artículo" className="w-full p-2 border rounded h-40" required />
        <input type="text" name="meta_description" value={article.meta_description} onChange={handleChange} placeholder="Meta descripción para SEO" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Guardar Cambios</button>
      </form>
    </div>
  );
}
