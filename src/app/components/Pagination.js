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
    const startPage = Math.max(1, page - Math.floor(visiblePages / 2));
    const endPage = Math.min(pages, startPage + visiblePages - 1);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
      const pageNumber = startPage + index;
      return (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`px-3 py-2 text-xs sm:text-sm md:text-base rounded-lg font-medium transition-all duration-300 shadow-md ${
            page === pageNumber
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
    <nav className="flex flex-col items-center mt-8 w-full" aria-label="Paginación">
      {/* Logo personalizado similar a Google */}
      <div className="text-lg sm:text-2xl font-bold text-gray-700 mb-4">
        {"SALUDY"}
        {Array.from({ length: pages > 5 ? 6 : pages }).map((_, index) => (
          <span key={index} className={page === index + 1 ? "text-blue-500" : "text-gray-700"}>
            o
          </span>
        ))}
        {"SER"}
      </div>

      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
        {/* Botón Anterior */}
        <button
          onClick={handlePrevious}
          disabled={page <= 1}
          className={`px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded-lg font-medium transition-all duration-300 shadow-md ${
            page > 1
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          aria-disabled={page <= 1}
          aria-label="Página anterior"
        >
          ⬅️ Anterior
        </button>

        {/* Números de página */}
        {renderPageNumbers}

        {/* Botón Siguiente */}
        <button
          onClick={handleNext}
          disabled={page >= pages}
          className={`px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded-lg font-medium transition-all duration-300 shadow-md ${
            page < pages
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
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
