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
              color: "#1a202c", // Color del texto de h1 (puedes ajustarlo)
              fontWeight: "bold",
            },
            h2: {
              color: "#2d3748",
              fontWeight: "semibold",
            },
            h3: {
              color: "#4a5568",
              fontWeight: "medium",
            },
            p: {
              color: "#4a5568",
              lineHeight: "1.8",
            },
            blockquote: {
              borderLeftColor: "#3182ce", // Color de la línea de blockquote
              color: "#2d3748",
              fontStyle: "italic",
            },
            "ul > li::marker": {
              color: "#3182ce", // Color de los marcadores de lista
            },
            a: {
              color: "#3182ce",
              textDecoration: "underline",
              "&:hover": {
                color: "#2b6cb0",
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
