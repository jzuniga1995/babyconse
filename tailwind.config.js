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
              color: "#1a202c", // Título principal: color oscuro
              fontWeight: "bold",
              fontSize: "2.25rem", // Tamaño más grande
              marginBottom: "1rem", // Espacio debajo del título
            },
            h2: {
              color: "#2d3748",
              fontWeight: "semibold",
              fontSize: "1.875rem", // Tamaño ajustado
              marginTop: "2rem", // Más espacio antes del título
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
              lineHeight: "1.8", // Mejor espaciado entre líneas
              fontSize: "1.125rem", // Tamaño más grande
              marginBottom: "1.25rem", // Espaciado entre párrafos
            },
            blockquote: {
              borderLeftColor: "#3182ce", // Línea de blockquote azul
              color: "#2d3748",
              fontStyle: "italic",
              paddingLeft: "1rem", // Espaciado interior del blockquote
              fontSize: "1.125rem",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
            },
            "ul > li::marker": {
              color: "#3182ce", // Marcadores de listas (puntos)
              fontSize: "1rem",
            },
            ul: {
              paddingLeft: "1.5rem", // Sangría de la lista
              marginBottom: "1.25rem",
            },
            ol: {
              paddingLeft: "1.5rem",
              marginBottom: "1.25rem",
            },
            li: {
              marginBottom: "0.5rem", // Espaciado entre elementos de la lista
            },
            a: {
              color: "#3182ce",
              textDecoration: "underline",
              fontWeight: "semibold",
              "&:hover": {
                color: "#2b6cb0", // Cambiar el color al pasar el cursor
              },
            },
            img: {
              borderRadius: "0.5rem", // Esquinas redondeadas para imágenes
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Sombra para imágenes
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
