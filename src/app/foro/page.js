"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import Post from "../components/Post";

export default function Foro() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [commentsByPost, setCommentsByPost] = useState({});

  const user = session?.user;

  useEffect(() => {
    if (status === "authenticated") {
      fetchPosts();
    }
  }, [status]); // Se ejecuta solo cuando el estado de la sesión cambia

  // Obtener publicaciones
  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/foro?page=1&limit=20");
      if (response.ok) {
        const { posts } = await response.json();
        setPosts(posts);
      } else {
        console.error("Error al cargar las publicaciones");
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
    }
  };

  // Agregar publicación
  const handleAddPost = async () => {
    if (!newPost.trim()) {
      alert("Por favor, escribe algo antes de publicar.");
      return;
    }
    try {
      const response = await fetch("/api/foro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newPost }),
      });
      if (response.ok) {
        const savedPost = await response.json();
        setPosts((prev) => [savedPost, ...prev]);
        setNewPost("");
      }
    } catch (error) {
      console.error("Error al guardar la publicación:", error);
    }
  };

  // Manejar likes en publicaciones
  const handleLike = async (postId) => {
    try {
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: postId, isComment: false }),
      });
      if (response.ok) {
        const updatedPost = await response.json();
        setPosts((prev) =>
          prev.map((post) =>
            post.id === postId ? { ...post, likes: updatedPost.likes } : post
          )
        );
      } else {
        console.error("Error al manejar el like");
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
    }
  };

  // Obtener comentarios
  const fetchComments = async (postId) => {
    try {
      const response = await fetch(`/api/comments?postId=${postId}`);
      if (response.ok) {
        const data = await response.json();
        setCommentsByPost((prev) => ({
          ...prev,
          [postId]: { comments: data, newComment: "" },
        }));
      } else {
        console.error("Error al cargar los comentarios");
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
    }
  };

  // Agregar comentario
  const handleAddComment = async (postId) => {
    const newComment = commentsByPost[postId]?.newComment?.trim();
    if (!newComment) {
      alert("Por favor, escribe algo antes de comentar.");
      return;
    }
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, content: newComment }),
      });
      if (response.ok) {
        const savedComment = await response.json();
        setCommentsByPost((prev) => ({
          ...prev,
          [postId]: {
            comments: [savedComment, ...(prev[postId]?.comments || [])],
            newComment: "",
          },
        }));
      }
    } catch (error) {
      console.error("Error al guardar el comentario:", error);
    }
  };

  // Manejar likes en comentarios
  const handleCommentLike = async (commentId, postId) => {
    try {
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: commentId, isComment: true }),
      });
      if (response.ok) {
        const updatedComment = await response.json();
        setCommentsByPost((prev) => ({
          ...prev,
          [postId]: {
            ...prev[postId],
            comments: prev[postId]?.comments?.map((comment) =>
              comment.id === commentId
                ? { ...comment, likes: updatedComment.likes }
                : comment
            ),
          },
        }));
      }
    } catch (error) {
      console.error("Error al manejar el like en el comentario:", error);
    }
  };

  // Muestra un mensaje de carga mientras se obtiene el estado de la sesión
  if (status === "loading") {
    return <p className="text-center mt-8">Cargando...</p>;
  }

// Si el usuario no está autenticado, redirigir a inicio de sesión
if (!user) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
    <p className="mb-4 text-lg text-gray-700">
      Debes iniciar sesión para participar en el foro y unirte a la conversación.
    </p>
 <button
  onClick={() => signIn("google", { callbackUrl: "/foro" })}
  aria-label="Iniciar sesión con Google"
  className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95"
>
  Iniciar Sesión
</button>

    </div>
  );
}


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <section className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Publicar sección */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Crea una nueva publicación
          </h2>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="¿Qué tienes en mente?"
            className="w-full h-28 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button
            onClick={handleAddPost}
            className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition"
          >
            Publicar
          </button>
        </div>

        {/* Lista de publicaciones */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              handleLike={handleLike}
              fetchComments={fetchComments}
              commentsByPost={commentsByPost}
              setCommentsByPost={setCommentsByPost}
              handleAddComment={handleAddComment}
              handleCommentLike={handleCommentLike}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
