import { FaBook, FaUsers } from "react-icons/fa";

export default function QuickStats() {
  return (
    <div className="p-6 border-t border-green-600 mt-6 space-y-4">
      {/* Artículos publicados */}
      <div className="flex items-center justify-center space-x-3 group">
        <div className="p-2 bg-green-600 rounded-full group-hover:bg-green-500 transition-colors duration-300">
          <FaBook className="text-white w-5 h-5" aria-hidden="true" />
        </div>
        <p className="text-sm text-center text-white group-hover:text-green-200 transition-colors duration-300">
          <span className="font-semibold">500+</span> artículos publicados
        </p>
      </div>

      {/* Lectores activos */}
      <div className="flex items-center justify-center space-x-3 group">
        <div className="p-2 bg-green-600 rounded-full group-hover:bg-green-500 transition-colors duration-300">
          <FaUsers className="text-white w-5 h-5" aria-hidden="true" />
        </div>
        <p className="text-sm text-center text-white group-hover:text-green-200 transition-colors duration-300">
          <span className="font-semibold">10,000+</span> lectores activos
        </p>
      </div>
    </div>
  );
}
