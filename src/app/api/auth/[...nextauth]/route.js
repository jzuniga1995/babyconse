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
    async redirect({ url, baseUrl }) {
      // Verificar si se proporciona un callbackUrl válido
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};

// Configuración de NextAuth
const handler = NextAuth(authOptions);

// Exportar el manejador de NextAuth y las opciones de autenticación
export { handler as GET, handler as POST };
