import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    // Parsear los datos del cuerpo de la solicitud
    const { name, email, message } = await req.json();

    // Configurar el transportador de correo con Zoho SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com", // Servidor SMTP de Zoho
      port: 465, // Puerto para SSL
      secure: true, // Usar conexión segura
      auth: {
        user: process.env.EMAIL_FROM, // Tu correo de Zoho
        pass: process.env.EMAIL_PASS, // Contraseña de la app generada en Zoho
      },
    });

    // Enviar el correo
    await transporter.sendMail({
      from: `"Formulario de contacto" <${process.env.EMAIL_FROM}>`, // Remitente
      to: process.env.EMAIL_TO || process.env.EMAIL_FROM, // Correo de destino
      subject: `Nuevo mensaje de ${name}`, // Asunto
      text: message, // Mensaje en texto plano
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `, // Mensaje en HTML
    });

    // Respuesta exitosa
    return new Response(
      JSON.stringify({ success: true, message: "Correo enviado exitosamente." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error al enviar el correo:", error);

    // Respuesta de error
    return new Response(
      JSON.stringify({ success: false, message: "Error al enviar el correo." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
