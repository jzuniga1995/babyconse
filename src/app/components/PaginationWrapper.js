"use client";

import Pagination from "@/app/components/Pagination";

export default function PaginationWrapper({ page, pages, categoriaSlug }) {
  const handlePageChange = (newPage) => {
    window.location.href = `/categorias/${categoriaSlug}?page=${newPage}`;
  };

  return <Pagination page={page} pages={pages} onPageChange={handlePageChange} />;
}
