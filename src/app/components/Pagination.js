export default function Pagination({ page, pages, onPageChange }) {
  const handlePrevious = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < pages) onPageChange(page + 1);
  };

  const renderPageNumbers = () => {
    const visiblePages = 5; // Máximo número de páginas visibles a la vez
    const startPage = Math.max(1, page - Math.floor(visiblePages / 2));
    const endPage = Math.min(pages, startPage + visiblePages - 1);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
      const pageNumber = startPage + index;
      return (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`px-4 py-2 rounded-lg font-medium shadow-md transition-all duration-300 ${
            page === pageNumber
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {pageNumber}
        </button>
      );
    });
  };

  return (
    <div className="flex justify-center items-center mt-8 space-x-2">
      {/* Botón Anterior */}
      <button
        onClick={handlePrevious}
        disabled={page <= 1}
        className={`px-4 py-2 rounded-lg font-medium shadow-md transition-all duration-300 ${
          page > 1
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        ⬅️ Anterior
      </button>

      {/* Números de página */}
      {renderPageNumbers()}

      {/* Botón Siguiente */}
      <button
        onClick={handleNext}
        disabled={page >= pages}
        className={`px-4 py-2 rounded-lg font-medium shadow-md transition-all duration-300 ${
          page < pages
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Siguiente ➡️
      </button>
    </div>
  );
}
