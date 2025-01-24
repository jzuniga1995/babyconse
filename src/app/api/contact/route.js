import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    // Parsear los datos del cuerpo de la solicitud
    const { name, email, message } = await req.json();

    // Configurar el transportador de correo con Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Tu correo de Gmail
        pass: process.env.GMAIL_PASS, // Contraseña o App Password
      },
    });

    // Enviar el correo
    await transporter.sendMail({
      from: `"Formulario de contacto" <${email}>`, // Remitente
      to: process.env.GMAIL_USER, // Tu correo de destino
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
