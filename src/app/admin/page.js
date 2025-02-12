"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminForm() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.push("/");
    } else {
      setIsAuthorized(true);
    }
  }, [status, session, router]);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
    category: "",
    full_content: "",
    meta_description: "",
    referencias: [{ title: "", link: "" }],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReferenciaChange = (index, field, value) => {
    const updatedReferencias = [...form.referencias];
    updatedReferencias[index][field] = value;
    setForm({ ...form, referencias: updatedReferencias });
  };

  const addReferencia = () => {
    setForm({
      ...form,
      referencias: [...form.referencias, { title: "", link: "" }],
    });
  };

  const removeReferencia = (index) => {
    setForm({
      ...form,
      referencias: form.referencias.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.slug || !form.description || !form.category || !form.full_content) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/articulos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          referencias: form.referencias.filter((ref) => ref.title.trim() !== "" && ref.link.trim() !== ""),
        }),
      });

      if (response.ok) {
        alert("Artículo creado con éxito.");
        setForm({
          title: "",
          slug: "",
          description: "",
          image: "",
          category: "",
          full_content: "",
          meta_description: "",
          referencias: [{ title: "", link: "" }],
        });
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Ocurrió un error inesperado al enviar el formulario.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthorized) {
    return <p className="text-center mt-10">Cargando...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center">Crear Nuevo Artículo</h1>
      <p className="text-gray-500 text-center mb-6">Completa los campos y publica un nuevo artículo.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Título"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="text"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="Slug (URL amigable)"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descripción breve"
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows="3"
          required
        />

        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="URL de la imagen"
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Categoría"
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        <textarea
          name="full_content"
          value={form.full_content}
          onChange={handleChange}
          placeholder="Contenido completo del artículo"
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows="6"
          required
        />

        <textarea
          name="meta_description"
          value={form.meta_description}
          onChange={handleChange}
          placeholder="Meta descripción (SEO)"
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows="2"
        />

        <div>
          <h2 className="text-lg font-bold text-gray-700 mb-4">Referencias</h2>
          {form.referencias.map((referencia, index) => (
            <div key={index} className="flex items-center space-x-4 mb-4">
              <input
                type="text"
                value={referencia.title}
                onChange={(e) => handleReferenciaChange(index, "title", e.target.value)}
                placeholder="Título de la referencia"
                className="flex-1 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                value={referencia.link}
                onChange={(e) => handleReferenciaChange(index, "link", e.target.value)}
                placeholder="Enlace"
                className="flex-1 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeReferencia(index)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          ))}
          <button type="button" onClick={addReferencia} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            Añadir Referencia
          </button>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Publicar Artículo"}
        </button>
      </form>
    </div>
  );
}
