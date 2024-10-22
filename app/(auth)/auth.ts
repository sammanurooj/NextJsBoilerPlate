import { compare } from 'bcrypt-ts';
import NextAuth, { User, Session } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { getUser } from '../../actions/user';
import { authConfig } from './auth.config';

interface ExtendedSession extends Session {
  user: User & { id: string };
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {},
      async authorize({
        email,
        password
      }: {
        email: string;
        password: string;
      }) {
        try {
          const users = await getUser(email);
          console.log(users, 'users');

          if (!users) {
            throw new Error('No user found with the given email.');
          }

          const passwordsMatch = await compare(password, users.password!);
          if (!passwordsMatch) {
            throw new Error('Password does not match.');
          }

          return { ...users, id: users.id }; // Make sure `id` exists here
        } catch (error) {
          console.error('Authorization error:', error);
          throw new Error('Unable to login.');
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({
      session,
      token
    }: {
      session: ExtendedSession;
      token: any;
    }) {
      if (token?.id) {
        session.user.id = token.id as string; // Ensure the token has an id
      }

      return session;
    }
  }
});
