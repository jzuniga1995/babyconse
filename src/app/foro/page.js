"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

// Componente para renderizar un comentario
const Comment = ({ comment, handleCommentLike }) => {
  const likeIconClass = `text-gray-500 transition-transform transform group-hover:scale-125 ${
    comment.likes > 0 ? "text-red-500" : ""
  }`;
  const likeCountClass = `text-sm font-medium transition-colors ${
    comment.likes > 0 ? "text-red-500" : "text-gray-500"
  }`;

  return (
    <div className="p-4 bg-gray-100 rounded-lg border-t border-gray-300 mt-2">
      <p className="text-sm text-gray-500">
        {comment.user_name} - {new Date(comment.created_at).toLocaleString()}
      </p>
      <p>{comment.content}</p>
      <button
        className="flex items-center space-x-2 group mt-2"
        onClick={() => handleCommentLike(comment.id)}
      >
        <span className={likeIconClass}>❤️</span>
        <span className={likeCountClass}>{comment.likes || 0}</span>
      </button>
    </div>
  );
};

export default function Foro() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [commentsByPost, setCommentsByPost] = useState({});
  const [newComment, setNewComment] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [visibleComments, setVisibleComments] = useState(null);

  const user = session?.user;

  // Cargar publicaciones con paginación
  const fetchPosts = async (page = 1) => {
    setIsLoading(true);
    const response = await fetch(`/api/foro?page=${page}&limit=20`);
    if (response.ok) {
      const { posts, pagination } = await response.json();
      setPosts(posts);
      setTotalPages(pagination.totalPages);
      setCurrentPage(pagination.currentPage);
    } else {
      console.error("Error al cargar las publicaciones");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Crear una nueva publicación
  const handleAddPost = async () => {
    if (!newPost.trim()) return;

    const response = await fetch("/api/foro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newPost }),
    });

    if (response.ok) {
      const savedPost = await response.json();
      if (currentPage === 1) {
        setPosts((prevPosts) => [savedPost, ...prevPosts.slice(0, 19)]);
      }
      setNewPost("");
    } else {
      console.error("Error al guardar la publicación");
    }
  };

  // Dar o quitar like a una publicación
  const handleLike = async (postId) => {
    const response = await fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: postId, isComment: false }),
    });

    if (response.ok) {
      const updatedPost = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: updatedPost.likes } : post
        )
      );
    } else {
      console.error("Error al manejar el like");
    }
  };

  // Cargar comentarios de una publicación
  const fetchComments = async (postId) => {
    setIsLoadingComments(true);

    if (visibleComments === postId) {
      setVisibleComments(null);
      setIsLoadingComments(false);
      return;
    }

    const response = await fetch(`/api/comments?postId=${postId}`);
    if (response.ok) {
      const data = await response.json();
      setCommentsByPost((prev) => ({ ...prev, [postId]: data }));
      setVisibleComments(postId);
    } else {
      console.error("Error al cargar los comentarios");
    }
    setIsLoadingComments(false);
  };

  // Crear un comentario
  const handleAddComment = async (postId) => {
    if (!newComment.trim()) return;

    const response = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, content: newComment }),
    });

    if (response.ok) {
      const savedComment = await response.json();
      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: [savedComment, ...prev[postId] || []],
      }));
      setNewComment("");
    } else {
      console.error("Error al guardar el comentario");
    }
  };

  // Dar o quitar like a un comentario
  const handleCommentLike = async (commentId) => {
    const response = await fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: commentId, isComment: true }),
    });

    if (response.ok) {
      const updatedComment = await response.json();
      setCommentsByPost((prev) => ({
        ...prev,
        [visibleComments]: prev[visibleComments]?.map((comment) =>
          comment.id === commentId ? { ...comment, likes: updatedComment.likes } : comment
        ),
      }));
    } else {
      console.error("Error al manejar el like en el comentario");
    }
  };

  // Render
  if (status === "loading") return <p className="text-center mt-8">Cargando...</p>;

  if (!user)
    return (
      <div className="text-center mt-8">
        <p className="text-lg">Debes iniciar sesión para participar en el foro.</p>
        <button
          onClick={() => signIn("google")}
          className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition"
        >
          Iniciar Sesión
        </button>
      </div>
    );

  return (
    <section
      className={`container mx-auto px-6 py-12 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="fixed top-4 right-4 p-2 bg-gray-300 rounded-full hover:bg-gray-400"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
      <h1 className="text-3xl font-extrabold text-center">Foro de Padres</h1>
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
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div>
                <h3 className="font-bold">{post.user_name}</h3>
                <p className="text-gray-600 mt-2">{post.content}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(post.created_at).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="flex items-center space-x-2 group"
                  onClick={() => handleLike(post.id)}
                >
                  <span
                    className={`text-gray-500 transition-transform transform group-hover:scale-125 ${
                      post.likes > 0 ? "text-red-500" : ""
                    }`}
                  >
                    ❤️
                  </span>
                  <span
                    className={`text-sm font-medium transition-colors ${
                      post.likes > 0 ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    {post.likes || 0}
                  </span>
                </button>
                <button
                  className="text-green-500 hover:underline"
                  onClick={() => fetchComments(post.id)}
                >
                  {visibleComments === post.id ? "Ocultar comentarios" : "Ver comentarios"} (
                  {post.comment_count || 0})
                </button>
              </div>
              {visibleComments === post.id && (
                <div className="mt-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Escribe un comentario..."
                    className="w-full p-2 border rounded"
                  ></textarea>
                  <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => handleAddComment(post.id)}
                  >
                    Comentar
                  </button>
                  {isLoadingComments ? (
                    <div className="flex justify-center mt-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    commentsByPost[post.id]?.map((comment) => (
                      <Comment
                        key={comment.id}
                        comment={comment}
                        handleCommentLike={handleCommentLike}
                      />
                    ))
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="mt-8 flex justify-center items-center space-x-2">
  {/* Botón para ir a la página anterior */}
  <button
    onClick={() => currentPage > 1 && fetchPosts(currentPage - 1)}
    className={`px-4 py-2 rounded ${
      currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-gray-200 hover:bg-gray-300"
    }`}
    disabled={currentPage === 1}
  >
    Anterior
  </button>

  {/* Mostrar solo 10 páginas o el rango actual */}
  {Array.from({ length: Math.min(10, totalPages) }, (_, index) => {
    const page = index + 1 + Math.floor((currentPage - 1) / 10) * 10;

    if (page > totalPages) return null;

    return (
      <button
        key={page}
        onClick={() => fetchPosts(page)}
        className={`px-4 py-2 rounded ${
          currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        {page}
      </button>
    );
  })}

  {/* Botón para ir a la página siguiente */}
  <button
    onClick={() => currentPage < totalPages && fetchPosts(currentPage + 1)}
    className={`px-4 py-2 rounded ${
      currentPage === totalPages ? "bg-gray-300 text-gray-500" : "bg-gray-200 hover:bg-gray-300"
    }`}
    disabled={currentPage === totalPages}
  >
    Siguiente
  </button>
</div>

    </section>
  );
}
