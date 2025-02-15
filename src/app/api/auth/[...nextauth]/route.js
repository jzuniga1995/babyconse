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
      } else {
        token.role = "user";
      }
      return { ...token }; // ✅ Asegurar que siempre es JSON serializable
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || null;
        session.user.role = token.role || "user";
      }
      return { ...session }; // ✅ Asegurar que siempre es JSON serializable
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
};

// ✅ Corrección en la exportación para Next.js App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
