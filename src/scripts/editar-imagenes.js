const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = path.join(__dirname, "../../public/images/articulos");
const tempDir = path.join(__dirname, "../../public/images/temp");

// Crear la carpeta temporal si no existe
fs.mkdirSync(tempDir, { recursive: true });

// Función para limpiar la carpeta temporal
const cleanTempDir = () => {
    fs.readdirSync(tempDir).forEach((file) => {
        const tempPath = path.join(tempDir, file);
        fs.unlinkSync(tempPath);
    });
};

// Función para procesar imágenes
const processImages = (dir) => {
    fs.readdirSync(dir).forEach((file) => {
        const inputPath = path.join(dir, file);
        const outputPath = inputPath.replace(/\.(jpg|png|webp)$/i, ".webp");
        const tempOutputPath = path.join(tempDir, file.replace(/\.(jpg|png|webp)$/i, ".webp"));

        if (fs.statSync(inputPath).isDirectory()) {
            processImages(inputPath); // Procesar subcarpetas
        } else if (/\.(jpg|png|webp)$/i.test(file)) {
            // Verificar si el archivo .webp ya existe
            if (fs.existsSync(outputPath)) {
                console.log(`⚠️  Ya optimizado: ${outputPath}`);
                return;
            }

            // Procesar solo si no existe el archivo WebP
            sharp(inputPath)
            .resize({ width: 800 })  // Redimensiona a 800px de ancho
            .modulate({ brightness: 1.05, saturation: 1.1 })  // Filtro más natural
            .toFormat("webp")
            .toFile(tempOutputPath)
        
                .then(() => {
                    fs.renameSync(tempOutputPath, outputPath); // Reemplazar el archivo original
                    console.log(`✅ Optimizado: ${inputPath}`);
                })
                .catch((err) => {
                    console.error(`❌ Error en ${inputPath}:`, err);
                    if (fs.existsSync(tempOutputPath)) {
                        fs.unlinkSync(tempOutputPath); // Eliminar archivos incompletos
                    }
                });
        }
    });
};

// Ejecutar y limpiar la carpeta temporal después
processImages(inputDir);
cleanTempDir();

console.log("🚀 Edición de imágenes completada.");
