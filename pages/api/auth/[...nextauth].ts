import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Replace with your actual authentication logic
        // Example: hardcoded user for demonstration
        const user = { id: '1', name: 'John Doe', email: 'john@example.com' };

        // Validate credentials here (e.g., check against a user list or external service)
        if (credentials.email === user.email && credentials.password === 'password') {
          return user;
        } else {
          throw new Error('Invalid credentials');
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newAccount: '/auth/new-account'
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
    }
  },
});
