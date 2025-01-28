"use client";

const Comment = ({ comment, handleCommentLike }) => {
  // Validación de datos
  if (!comment || !comment.user_name || !comment.content) {
    return <p className="text-red-500">Error: Datos del comentario no válidos</p>;
  }

  // Formateo de fecha
  const createdAt = comment.created_at
    ? new Date(comment.created_at).toLocaleString()
    : "Fecha desconocida";

  // Clases dinámicas para el icono y el contador de likes
  const likeIconClass = `text-lg transition-transform transform group-hover:scale-125 ${
    (comment.likes || 0) > 0 ? "text-red-500" : "text-gray-400"
  }`;
  const likeCountClass = `text-sm font-medium transition-colors ${
    (comment.likes || 0) > 0 ? "text-red-500" : "text-gray-500"
  }`;

  // Manejo del click en "like"
  const handleLikeClick = () => {
    console.log("Like clicked for comment ID:", comment.id);
    handleCommentLike(comment.id);
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow mt-4">
      {/* Encabezado del comentario */}
      <div className="mb-2">
        <p className="text-sm font-semibold text-gray-800">{comment.user_name}</p>
        <p className="text-xs text-gray-500">{createdAt}</p>
      </div>

      {/* Contenido del comentario */}
      <p className="text-gray-700 text-sm mb-4">{comment.content}</p>

      {/* Botón de "like" */}
      <button
        className="flex items-center space-x-2 group focus:outline-none"
        onClick={handleLikeClick}
      >
        <span className={likeIconClass}>❤️</span>
        <span className={likeCountClass}>{comment.likes || 0}</span>
      </button>
    </div>
  );
};

export default Comment;
