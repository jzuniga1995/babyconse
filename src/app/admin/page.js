'use client';

import { useState } from 'react';

export default function AdminForm() {
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    image: '',
    category: '',
    full_content: '',
    meta_description: '',
    referencias: [{ title: '', link: '' }],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleReferenciaChange = (index, field, value) => {
    const updatedReferencias = [...form.referencias];
    updatedReferencias[index][field] = value;
    setForm({ ...form, referencias: updatedReferencias });
  };

  const addReferencia = () => {
    setForm({
      ...form,
      referencias: [...form.referencias, { title: '', link: '' }],
    });
  };

  const removeReferencia = (index) => {
    const updatedReferencias = form.referencias.filter((_, i) => i !== index);
    setForm({ ...form, referencias: updatedReferencias });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.slug || !form.description || !form.category || !form.full_content) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const referenciasFiltradas = form.referencias.filter(
      (ref) => ref.title.trim() !== '' && ref.link.trim() !== ''
    );

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/articulos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, referencias: referenciasFiltradas }),
      });
      const data = await response.json();

      if (response.ok) {
        alert('Artículo creado con éxito.');
        setForm({
          title: '',
          slug: '',
          description: '',
          image: '',
          category: '',
          full_content: '',
          meta_description: '',
          referencias: [{ title: '', link: '' }],
        });
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Ocurrió un error inesperado al enviar el formulario.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto mt-16 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Crear Nuevo Artículo
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Título */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Título del artículo*</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Escribe el título del artículo"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Slug (URL amigable)*</label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="Ejemplo: beneficios-del-agua"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Descripción breve */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Descripción breve*</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Escribe una breve descripción del artículo"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows="3"
            required
          />
        </div>

        {/* Imagen */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">URL de la imagen*</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="URL de la imagen principal del artículo"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Categoría*</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Categoría del artículo (e.g., Nutrición)"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Contenido completo */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Contenido completo*</label>
          <textarea
            name="full_content"
            value={form.full_content}
            onChange={handleChange}
            placeholder="Escribe el contenido completo del artículo"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows="6"
            required
          />
        </div>

        {/* Meta descripción */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Meta descripción (SEO)</label>
          <textarea
            name="meta_description"
            value={form.meta_description}
            onChange={handleChange}
            placeholder="Escribe una meta descripción para SEO"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows="2"
          />
        </div>

        {/* Referencias */}
        <div>
          <h2 className="text-lg font-bold text-gray-700 mb-4">Referencias (opcional)</h2>
          {form.referencias.map((referencia, index) => (
            <div key={index} className="flex items-center space-x-4 mb-4">
              <input
                type="text"
                value={referencia.title}
                onChange={(e) =>
                  handleReferenciaChange(index, 'title', e.target.value)
                }
                placeholder="Título de la referencia"
                className="flex-1 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                value={referencia.link}
                onChange={(e) =>
                  handleReferenciaChange(index, 'link', e.target.value)
                }
                placeholder="Enlace de la referencia"
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
          <button
            type="button"
            onClick={addReferencia}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Añadir Referencia
          </button>
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className={`w-full text-white px-4 py-3 rounded-lg text-lg font-semibold ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Publicar Artículo'}
        </button>
      </form>
    </div>
  );
}
