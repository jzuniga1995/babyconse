"use client";

import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";

export default function Foro() {
  const { user, isLoading } = useUser();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  // Función para agregar una nueva publicación
  const handleAddPost = async () => {
    if (!newPost.trim()) return;

    const newPostData = {
      user: user.name || user.email, // Información del usuario autenticado
      content: newPost,
    };

    // Enviar a la base de datos (API)
    const response = await fetch("/api/foro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPostData),
    });

    if (response.ok) {
      const savedPost = await response.json();
      setPosts([...posts, savedPost]);
      setNewPost("");
    } else {
      console.error("Error al guardar la publicación");
    }
  };

  // Cargar publicaciones desde la base de datos
  const fetchPosts = async () => {
    const response = await fetch("/api/foro");
    if (response.ok) {
      const data = await response.json();
      setPosts(data);
    } else {
      console.error("Error al cargar las publicaciones");
    }
  };

  // Efecto para cargar publicaciones al iniciar
  useEffect(() => {
    fetchPosts();
  }, []);

  // Mostrar cargando si el estado de autenticación está en proceso
  if (isLoading) return <p className="text-center mt-8">Cargando...</p>;

  // Mostrar mensaje si el usuario no está autenticado
  if (!user)
    return (
      <div className="text-center mt-8">
        <p className="text-lg">Debes iniciar sesión para participar en el foro.</p>
        <a
          href="/api/auth/login"
          className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition"
        >
          Iniciar Sesión
        </a>
      </div>
    );

  return (
    <section className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold text-gray-800 text-center">
        Foro de Padres
      </h1>
      <p className="text-lg text-gray-600 text-center mt-4">
        Comparte tus experiencias, preguntas y consejos con otros padres.
      </p>
      <div className="mt-8 mx-auto max-w-2xl">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Escribe algo aquí..."
          className="w-full h-24 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        ></textarea>
        <button
          onClick={handleAddPost}
          className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition"
        >
          Publicar
        </button>
      </div>
      <div className="mt-8 mx-auto max-w-2xl space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow space-y-4">
            <div>
              <h3 className="font-bold text-gray-800">{post.user}</h3>
              <p className="text-gray-600 mt-2">{post.content}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-blue-500 hover:underline">
                👍 {post.likes || 0} Me gusta
              </button>
              <span className="text-gray-500">{post.replies?.length || 0} respuestas</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
