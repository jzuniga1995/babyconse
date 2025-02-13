"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminForm() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

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

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: "", type: "" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones de datos
    if (!form.title.trim() || !form.slug.trim() || !form.description.trim() || 
        !form.category.trim() || !form.full_content.trim()) {
      showAlert("⚠️ Todos los campos obligatorios deben ser completados.", "error");
      return;
    }

    setIsSubmitting(true);

    // Log para depuración
    console.log("📩 Enviando datos:", JSON.stringify({
      title: form.title.trim(),
      slug: form.slug.trim(),
      description: form.description.trim(),
      image: form.image.trim() || null,
      category: form.category.trim(),
      full_content: form.full_content.trim(),
      meta_description: form.meta_description.trim() || null,
      referencias: form.referencias.filter(ref => ref.title.trim() && ref.link.trim()),
    }, null, 2));

    try {
      const response = await fetch("/api/articulos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          slug: form.slug.trim(),
          description: form.description.trim(),
          image: form.image.trim() || null,
          category: form.category.trim(),
          full_content: form.full_content.trim(),
          meta_description: form.meta_description.trim() || null,
          referencias: form.referencias.filter(ref => ref.title.trim() && ref.link.trim()),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showAlert("✅ Artículo creado con éxito.", "success");
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
        showAlert(`❌ Error: ${data.error || "Error desconocido"}`, "error");
      }
    } catch (error) {
      console.error("❌ Error en la solicitud:", error);
      showAlert("❌ Error en la conexión con el servidor.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthorized) {
    return <p className="text-center mt-10">Cargando...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-16 bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center">Crear Nuevo Artículo</h1>
      <p className="text-gray-500 text-center mb-6">Completa los campos y publica un nuevo artículo.</p>

      {alert.message && (
        <div className={`p-3 mb-6 text-white rounded-lg text-center ${alert.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {alert.message}
        </div>
      )}

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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Publicar Artículo"}
        </button>
      </form>
    </div>
  );
}
