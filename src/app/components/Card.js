import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/outline";

export default function Card({ title = "Título no disponible", description = "Descripción no disponible", link = "#" }) {
  return (
    <div className="relative overflow-hidden p-6 bg-gradient-to-r from-white to-gray-50 shadow-lg border border-gray-200 rounded-2xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-200 to-purple-200 opacity-10 pointer-events-none"></div>
      
      {/* Título clickeable */}
      <Link href={link} className="group">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
          {title}
        </h2>
      </Link>
      
      {/* Descripción */}
      <p className="text-gray-700 text-base leading-relaxed mb-6 line-clamp-3">
        {description}
      </p>
      
      {/* Botón */}
      <Link
        href={link}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        aria-label={`Leer más sobre ${title}`}
      >
        Leer más
        <ArrowRightIcon className="w-5 h-5" />
      </Link>
    </div>
  );
}
