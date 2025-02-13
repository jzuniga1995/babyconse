/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // Todos los archivos en "app"
    "./src/components/**/*.{js,ts,jsx,tsx}", // Todos los componentes
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              color: "#1a202c",
              fontWeight: "bold",
              fontSize: "2.25rem",
              marginBottom: "1rem",
            },
            h2: {
              color: "#2d3748",
              fontWeight: "semibold",
              fontSize: "1.875rem",
              marginTop: "2rem",
              marginBottom: "1rem",
            },
            h3: {
              color: "#4a5568",
              fontWeight: "medium",
              fontSize: "1.5rem",
              marginTop: "1.5rem",
              marginBottom: "0.75rem",
            },
            p: {
              color: "#4a5568",
              lineHeight: "1.8",
              fontSize: "1.125rem",
              marginBottom: "1.25rem",
            },
            blockquote: {
              borderLeftColor: "#3182ce",
              color: "#2d3748",
              fontStyle: "italic",
              paddingLeft: "1rem",
              fontSize: "1.125rem",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
            },
            "ul > li::marker": {
              color: "#3182ce",
              fontSize: "1rem",
            },
            ul: {
              paddingLeft: "1.5rem",
              marginBottom: "1.25rem",
            },
            ol: {
              paddingLeft: "1.5rem",
              marginBottom: "1.25rem",
            },
            li: {
              marginBottom: "0.5rem",
            },
            a: {
              color: "#3182ce",
              textDecoration: "underline",
              fontWeight: "semibold",
              "&:hover": {
                color: "#2b6cb0",
              },
            },
            img: {
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
            },
            // 📌 ✅ Estilos personalizados para TABLAS
            table: {
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
            },
            "thead th": {
              backgroundColor: "#f3f4f6",
              border: "1px solid #ddd",
              padding: "0.75rem",
              textAlign: "left",
              fontWeight: "bold",
            },
            "tbody td": {
              border: "1px solid #ddd",
              padding: "0.75rem",
            },
            "tbody tr:nth-child(even)": {
              backgroundColor: "#f9fafb",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
