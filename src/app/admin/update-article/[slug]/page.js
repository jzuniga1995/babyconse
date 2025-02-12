"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";

export default function UpdateArticle() {
  const router = useRouter();
  const { slug } = useParams(); // Obtenemos el slug desde la URL
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      fetch(`/api/articulos/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.articulo) {
            setArticle(data.articulo);
          } else {
            console.error("No se encontró el artículo.");
          }
        })
        .catch((err) => console.error("Error al obtener el artículo:", err))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  const handleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Card className="shadow-lg p-6">
        <CardHeader>
          <h1 className="text-3xl font-bold text-gray-800">Actualizar Artículo</h1>
          <p className="text-gray-500">Modifica los datos del artículo y guarda los cambios.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                name="title"
                value={article.title}
                onChange={handleChange}
                placeholder="Título"
                className="w-full"
                required
              />
              <Input
                type="text"
                name="category"
                value={article.category}
                onChange={handleChange}
                placeholder="Categoría"
                className="w-full"
                required
              />
            </div>
            <Input
              type="text"
              name="description"
              value={article.description}
              onChange={handleChange}
              placeholder="Descripción"
              className="w-full"
              required
            />
            <Input
              type="text"
              name="image"
              value={article.image}
              onChange={handleChange}
              placeholder="URL de la imagen"
              className="w-full"
            />
            <Input
              type="text"
              name="link"
              value={article.link}
              onChange={handleChange}
              placeholder="Enlace externo (opcional)"
              className="w-full"
            />
            <Textarea
              name="full_content"
              value={article.full_content}
              onChange={handleChange}
              placeholder="Contenido completo del artículo"
              className="w-full h-48"
              required
            />
            <Input
              type="text"
              name="meta_description"
              value={article.meta_description}
              onChange={handleChange}
              placeholder="Meta descripción para SEO"
              className="w-full"
            />
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : <Save />}
              {loading ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
