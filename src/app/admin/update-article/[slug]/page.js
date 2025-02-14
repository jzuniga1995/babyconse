"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";

export default function UpdateArticle() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { slug } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const textAreaRef = useRef(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [article, setArticle] = useState({
    title: "",
    description: "",
    link: "",
    image: "",
    category: "",
    full_content: "",
    meta_description: "",
  });

  // Protege la ruta: solo permite acceso si es admin
  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user.role !== "admin") {
      router.push("/"); // Redirige si no es admin
    } else {
      setIsAuthorized(true);
    }
  }, [session, status, router]);

  // Obtiene el artículo
  useEffect(() => {
    if (slug) {
      fetch(`/api/articulos/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.articulo) {
            setArticle({
              title: data.articulo.title || "",
              description: data.articulo.description || "",
              link: data.articulo.link || "",
              image: data.articulo.image || "",
              category: data.articulo.category || "",
              full_content: data.articulo.full_content || "",
              meta_description: data.articulo.meta_description || "",
            });
          } else {
            setAlert({ message: "No se encontró el artículo.", type: "error" });
          }
        })
        .catch(() =>
          setAlert({ message: "Error al obtener el artículo.", type: "error" })
        );
    }
  }, [slug]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [article.full_content]);

  const handleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value || "" });
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: "", type: "" }), 3000);
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
        showAlert("✅ Artículo actualizado correctamente.", "success");
        setTimeout(() => {
          router.push("/admin");
        }, 2000);
      } else {
        showAlert("❌ Error al actualizar el artículo.", "error");
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
      showAlert("❌ Hubo un error al actualizar el artículo.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthorized) {
    return <p className="text-center mt-10">Cargando...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-16 bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Actualizar Artículo
      </h1>

      {alert.message && (
        <div
          className={`p-3 mb-6 text-white rounded-lg text-center ${
            alert.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {alert.message}
        </div>
      )}

      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={article.title || ""}
            onChange={handleChange}
            placeholder="Título"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="text"
            name="category"
            value={article.category || ""}
            onChange={handleChange}
            placeholder="Categoría"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <textarea
          name="description"
          value={article.description || ""}
          onChange={handleChange}
          placeholder="Descripción breve"
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows="3"
          required
        />

        <input
          type="text"
          name="image"
          value={article.image || ""}
          onChange={handleChange}
          placeholder="URL de la imagen"
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="text"
          name="link"
          value={article.link || ""}
          onChange={handleChange}
          placeholder="Enlace externo (opcional)"
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <textarea
          name="full_content"
          ref={textAreaRef}
          value={article.full_content || ""}
          onChange={handleChange}
          placeholder="Añadir nuevo contenido"
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none overflow-hidden resize-none"
          required
        />

        <input
          type="text"
          name="meta_description"
          value={article.meta_description || ""}
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
