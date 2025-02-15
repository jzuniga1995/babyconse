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
    async jwt({ token, user }) {
      if (user && user.email) {
        token.role = user.email === process.env.ADMIN_EMAIL ? "admin" : "user";
      }
      return token; // ✅ JSON válido
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || null;
        session.user.role = token.role || "user";
      }
      return session; // ✅ JSON válido
    },
  },
  pages: {
    signIn: "/login", // ✅ Redirigir a página de login personalizada
    error: "/auth/error", // (Opcional) Página de errores de autenticación
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt", // ✅ Usa JWT en lugar de sesiones en base de datos
  },
};

// ✅ Exportación correcta para Next.js App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
