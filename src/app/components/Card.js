import Link from "next/link";

export default function Card({ title, description, link }) {
  return (
    <div className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="mt-2 text-gray-600">{description}</p>
      <Link
        href={link}
        className="inline-block mt-4 text-blue-500 hover:underline"
      >
        Leer más →
      </Link>
    </div>
  );
}
