const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// 📌 Ruta de imágenes a procesar
const inputDir = path.join(__dirname, "../../public/images/articulos");
const tempDir = path.join(__dirname, "../../public/images/temp"); // 📌 Carpeta temporal para evitar conflictos

// Crear la carpeta temporal si no existe
fs.mkdirSync(tempDir, { recursive: true });

// Función para procesar imágenes recursivamente
const processImages = (dir) => {
    fs.readdirSync(dir).forEach((file) => {
        const inputPath = path.join(dir, file);

        if (fs.statSync(inputPath).isDirectory()) {
            processImages(inputPath); // 📌 Si es una carpeta, procesarla recursivamente
        } else if (/\.(jpg|png|webp)$/i.test(file)) {  
            const tempOutputPath = path.join(tempDir, file); // 📌 Guardar temporalmente
            const finalOutputPath = inputPath.replace(/\.(jpg|png|webp)$/, ".webp");

            sharp(inputPath)
                .resize({ width: 800 }) // Ajustar tamaño
                .modulate({ brightness: 1.2, saturation: 1.4 }) // **Más brillo y saturación**
                .toFormat("webp") // Convertir a WebP
                .toFile(tempOutputPath) // 📌 Guardar temporalmente
                .then(() => {
                    fs.renameSync(tempOutputPath, finalOutputPath); // 📌 Reemplazar el archivo original
                    console.log(`✅ Optimizado: ${inputPath}`);
                })
                .catch((err) => console.error(`❌ Error en ${inputPath}:`, err));
        }
    });
};

// Ejecutar el procesamiento de imágenes
processImages(inputDir);

console.log("🚀 Edición de imágenes completada.");
