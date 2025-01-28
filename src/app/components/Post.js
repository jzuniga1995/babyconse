import { useState } from "react";
import CommentSection from "./CommentSection.js";

const Post = ({
  post,
  fetchComments,
  commentsByPost = {}, // Inicializa como un objeto vacío
  setCommentsByPost, // Asegúrate de pasar esta función
  handleAddComment,
  handleCommentLike,
  handleLike, // Agrega handleLike como prop
}) => {
  const [visibleComments, setVisibleComments] = useState(false);

  if (!post || !post.id || !post.user_name || !post.content) {
    console.error("Datos de la publicación no válidos:", post);
    return <p className="text-red-500">Error: Datos de la publicación no válidos.</p>;
  }

  // Asegúrate de obtener la estructura correcta de comments y newComment
  const { comments = [], newComment = "" } = commentsByPost[post.id] || {};

  const toggleComments = () => {
    if (visibleComments) {
      setVisibleComments(false);
    } else {
      fetchComments(post.id);
      setVisibleComments(true);
    }
  };

  return (
    <div className="bg-white p-6 mb-6 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
      <div className="mb-4">
        <h3 className="font-semibold text-lg text-gray-800">{post.user_name}</h3>
        <p className="text-gray-700 mt-2 text-sm">{post.content}</p>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(post.created_at).toLocaleString()}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        {/* Botón para dar like */}
        <button
          className="flex items-center space-x-2 group focus:outline-none"
          onClick={() => {
            if (typeof handleLike === "function") {
              handleLike(post.id);
            } else {
              console.error("handleLike no es una función válida.");
            }
          }}
        >
          <span
            className={`text-xl transition-transform duration-200 transform group-hover:scale-125 ${
              post.likes > 0 ? "text-red-500" : "text-gray-400"
            }`}
          >
            ❤️
          </span>
          <span className="text-sm font-medium text-gray-600">{post.likes || 0}</span>
        </button>

        {/* Botón para ver/ocultar comentarios */}
        <button
          className="text-sm font-semibold text-blue-500 hover:text-blue-600 transition duration-200 focus:outline-none"
          onClick={toggleComments}
        >
          {visibleComments ? "Ocultar comentarios" : "Ver comentarios"} ({post.comment_count || 0})
        </button>
      </div>

      {visibleComments && (
        <div className="mt-4 border-t border-gray-200 pt-4">
          <CommentSection
            postId={post.id}
            comments={comments}
            handleAddComment={handleAddComment}
            handleCommentLike={handleCommentLike}
            newComment={newComment}
            setNewComment={(value) => {
              if (typeof setCommentsByPost === "function") {
                setCommentsByPost((prev) => ({
                  ...prev,
                  [post.id]: { ...prev[post.id], newComment: value },
                }));
              } else {
                console.error("setCommentsByPost no es una función válida.");
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Post;
