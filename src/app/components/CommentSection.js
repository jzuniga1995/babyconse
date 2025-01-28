"use client";

import Comment from "./Comment";

const CommentSection = ({
  postId,
  comments = [], // Asegúrate de inicializar como un array vacío
  handleAddComment,
  handleCommentLike,
  newComment,
  setNewComment,
}) => {
  const handleAddCommentClick = () => {
    if (!newComment.trim()) {
      console.error("El comentario no puede estar vacío");
      alert("Por favor, escribe algo en el comentario.");
      return;
    }
    handleAddComment(postId, newComment); // Envía el contenido del comentario y el ID de la publicación
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Comentarios</h3>
      <div className="mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escribe un comentario..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        ></textarea>
        <button
          className="mt-2 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
          onClick={handleAddCommentClick}
        >
          Comentar
        </button>
      </div>
      {comments.length === 0 ? (
        <p className="text-gray-500 text-sm">No hay comentarios disponibles</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              handleCommentLike={(id) => handleCommentLike(id, postId)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
