"use client";

import { useMemo } from "react";
import PropTypes from "prop-types";

export default function Pagination({ page, pages, onPageChange }) {
  if (typeof onPageChange !== "function") {
    console.error("Propiedad `onPageChange` no está definida o no es una función.");
    return null;
  }

  const handlePrevious = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < pages) onPageChange(page + 1);
  };

  const renderPageNumbers = useMemo(() => {
    if (pages <= 0) return null;

    const visiblePages = 5;
    let startPage = Math.max(1, page - Math.floor(visiblePages / 2));
    let endPage = Math.min(pages, startPage + visiblePages - 1);

    const pageButtons = [];

    if (startPage > 1) {
      pageButtons.push(
        <button key={1} onClick={() => onPageChange(1)} className="px-3 py-2 text-sm rounded-md font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-100">1</button>
      );
      if (startPage > 2) {
        pageButtons.push(<span key="ellipsis-start" className="px-3 py-2 text-gray-500">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-2 text-sm rounded-md font-medium border transition-all duration-300 ${
            page === i ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
          aria-current={page === i ? "page" : undefined}
          aria-label={`Ir a la página ${i}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < pages) {
      if (endPage < pages - 1) {
        pageButtons.push(<span key="ellipsis-end" className="px-3 py-2 text-gray-500">...</span>);
      }
      pageButtons.push(
        <button key={pages} onClick={() => onPageChange(pages)} className="px-3 py-2 text-sm rounded-md font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-100">{pages}</button>
      );
    }

    return pageButtons;
  }, [page, pages, onPageChange]);

  return (
    <nav className="flex flex-col items-center mt-6 w-full px-4" aria-label="Paginación">
      <div className="text-lg sm:text-xl font-bold text-yellow-500 mb-3 text-center">SaludySer</div>

      <div className="flex justify-center items-center gap-2 sm:gap-3 p-2 bg-gray-100 rounded-lg shadow-md w-auto">
        <button
          onClick={handlePrevious}
          disabled={page <= 1}
          className={`px-3 py-2 text-sm rounded-md font-medium transition-all duration-300 shadow-sm flex items-center gap-2 ${
            page > 1 ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          aria-disabled={page <= 1}
          aria-label="Página anterior"
        >
          ⬅️
        </button>

        <div className="flex gap-1 bg-white p-1 rounded-md shadow-sm">{renderPageNumbers}</div>

        <button
          onClick={handleNext}
          disabled={page >= pages}
          className={`px-3 py-2 text-sm rounded-md font-medium transition-all duration-300 shadow-sm flex items-center gap-2 ${
            page < pages ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          aria-disabled={page >= pages}
          aria-label="Página siguiente"
        >
          ➡️
        </button>
      </div>
    </nav>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
