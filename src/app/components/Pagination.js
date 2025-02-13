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

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
      const pageNumber = startPage + index;
      return (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`px-3 py-2 text-sm sm:text-base md:text-lg rounded-md font-medium transition-all duration-300 shadow-md border ${
            page === pageNumber
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
          }`}
          aria-current={page === pageNumber ? "page" : undefined}
          aria-label={`Ir a la página ${pageNumber}`}
        >
          {pageNumber}
        </button>
      );
    });
  }, [page, pages, onPageChange]);

  return (
    <nav className="flex flex-col items-center mt-6 w-full px-4" aria-label="Paginación">
      {/* Logo personalizado */}
      <div className="text-lg sm:text-2xl font-bold text-gray-800 mb-4">SALUDYSER</div>

      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
        {/* Botón Anterior */}
        <button
          onClick={handlePrevious}
          disabled={page <= 1}
          className={`px-4 py-2 text-sm sm:text-base rounded-full font-medium transition-all duration-300 shadow-md flex items-center gap-2 w-24 justify-center ${
            page > 1
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          aria-disabled={page <= 1}
          aria-label="Página anterior"
        >
          ⬅️ Anterior
        </button>

        {/* Números de página */}
        <div className="flex gap-1">{renderPageNumbers}</div>

        {/* Botón Siguiente */}
        <button
          onClick={handleNext}
          disabled={page >= pages}
          className={`px-4 py-2 text-sm sm:text-base rounded-full font-medium transition-all duration-300 shadow-md flex items-center gap-2 w-24 justify-center ${
            page < pages
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          aria-disabled={page >= pages}
          aria-label="Página siguiente"
        >
          Siguiente ➡️
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
