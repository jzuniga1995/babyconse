import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Agregar el rol al token JWT
    async jwt({ token, user }) {
      if (user) {
        // Define un rol basado en el correo electrónico del administrador
        token.role = user.email === process.env.ADMIN_EMAIL ? "admin" : "user";
      }
      return token;
    },
    // Añadir información del rol a la sesión
    async session({ session, token }) {
      session.user.id = token.sub; // Añade el ID del usuario al objeto de sesión
      session.user.role = token.role; // Añade el rol del usuario a la sesión
      return session;
    },
  },
};

// Exportar los manejadores de los métodos HTTP
const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
