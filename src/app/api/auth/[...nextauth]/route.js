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
    async session({ session, token }) {
      session.user.id = token.sub; // Añade el ID del usuario al objeto de sesión
      return session;
    },
  },
};

// Exportar los manejadores de los métodos HTTP
const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
