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

  // Cargar publicaciones al inicio
  useEffect(() => {
    fetchPosts();
  }, []);

  if (status === "loading") return <p className="text-center mt-8">Cargando...</p>;

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen">
    <button
  onClick={() => signIn("google", { callbackUrl: "/foro" })}
  className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
>
  Iniciar Sesión
</button>

      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <section className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Publicar sección */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Crea una nueva publicación</h2>
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
              handleLike={handleLike} // Pasar la función para manejar likes
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
