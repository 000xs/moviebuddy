// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Credentials({
      // The name to display on the sign-in form (e.g., "Sign in with...")
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Here, you should look up the user in your DB and verify the credentials
        if (credentials.username === "user" && credentials.password === "pass") {
          // If the login is successful, return the user object
          return { id: 1, name: "User", email: "user@example.com" };
        }
        // If login fails, return null
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
});
