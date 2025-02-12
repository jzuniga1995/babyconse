"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Trash2 } from "lucide-react";

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
    <div className="max-w-4xl mx-auto mt-10">
      <Card className="shadow-lg p-6">
        <CardHeader>
          <h1 className="text-3xl font-bold text-gray-800">Crear Nuevo Artículo</h1>
          <p className="text-gray-500">Completa los campos y publica un nuevo artículo.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Título" required />
              <Input type="text" name="slug" value={form.slug} onChange={handleChange} placeholder="Slug (URL amigable)" required />
            </div>
            <Textarea name="description" value={form.description} onChange={handleChange} placeholder="Descripción breve" rows="3" required />
            <Input type="text" name="image" value={form.image} onChange={handleChange} placeholder="URL de la imagen" />
            <Input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Categoría" required />
            <Textarea name="full_content" value={form.full_content} onChange={handleChange} placeholder="Contenido completo del artículo" rows="6" required />
            <Textarea name="meta_description" value={form.meta_description} onChange={handleChange} placeholder="Meta descripción (SEO)" rows="2" />

            <div>
              <h2 className="text-lg font-bold text-gray-700 mb-4">Referencias</h2>
              {form.referencias.map((referencia, index) => (
                <div key={index} className="flex items-center space-x-4 mb-4">
                  <Input type="text" value={referencia.title} onChange={(e) => handleReferenciaChange(index, "title", e.target.value)} placeholder="Título de la referencia" />
                  <Input type="text" value={referencia.link} onChange={(e) => handleReferenciaChange(index, "link", e.target.value)} placeholder="Enlace" />
                  <Button type="button" variant="destructive" size="icon" onClick={() => removeReferencia(index)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" className="mt-2 flex items-center gap-2" onClick={addReferencia}>
                <Plus size={16} /> Añadir Referencia
              </Button>
            </div>

            <Button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Publicar Artículo"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
