import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "f8bruno" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        if (credentials?.username === "f8bruno@outlook.com") {
          return {
            name: "Bruno Figueiredo",
            avatar: "BF",
            email: "f8bruno@gmail.com",
          };
        }

        return null;
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 3600,
  },
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
