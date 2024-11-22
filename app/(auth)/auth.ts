import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt-ts';
import NextAuth, { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { getUser } from '../../actions/user';
import { authConfig } from './auth.config';

// Define extended types

interface ExtendedUser extends User {
  id: string;
  password?: string;
  email: string;
  name: string;
  image: string;
}

interface ExtendedSession extends Session {
  user: ExtendedUser;
}

interface Credentials {
  email: string;
  password: string;
}

interface SignInCallbackParams {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  account: {
    provider: string;
    type: string;
    providerAccountId: string;
    access_token?: string;
    expires_at?: number;
    scope?: string;
    token_type?: string;
    id_token?: string;
  } | null;
  profile?: {
    email?: string;
    name?: string;
  };
  email?: {
    verificationRequest?: boolean;
  };
  credentials?: Record<string, unknown>;
}

const prisma = new PrismaClient();

const createUser = async (
  email: string,
  name: string | null
): Promise<ExtendedUser> => {
  return await prisma.user.create({
    data: {
      email,
      name: name ?? undefined // Handle null name
    }
  });
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  ...authConfig,
  debug: true,
  secret: process.env.AUTH_SECRET,

  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? '',
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? ''
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    }),
    CredentialsProvider({
      credentials: {},
      async authorize(credentials): Promise<ExtendedUser | null> {
        try {
          const { email, password } = credentials as Credentials;

          const user = await getUser(email);

          if (!user) {
            throw new Error('No user found with the given email.');
          }

          if (!user.password) {
            throw new Error('Invalid login method.');
          }

          const passwordsMatch = await compare(password, user.password);
          if (!passwordsMatch) {
            throw new Error('Password does not match.');
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image
          };
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      }
    })
  ],

  pages: {
    signIn: '/signin',
    newUser: '/signup',
    signOut: '/signin'
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },

  callbacks: {
    async signIn({ user, account }: SignInCallbackParams): Promise<boolean> {
      try {
        if (account?.provider === 'google' || account?.provider === 'github') {
          const email = user.email;
          const name = user.name;

          if (email) {
            const existingUser = await getUser(email);

            if (!existingUser) {
              await createUser(email, name ?? null);
            }
          }
        }
        return true;
      } catch (error) {
        console.error('Error during signIn callback:', error);
        return false;
      }
    },

    async jwt({
      token,
      user
    }: {
      token: JWT;
      user: ExtendedUser | null;
    }): Promise<JWT> {
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
      token: JWT;
    }): Promise<ExtendedSession> {
      if (token.id) {
        session.user.id = token.id as string;
      }
      return session;
    }
  }
});
