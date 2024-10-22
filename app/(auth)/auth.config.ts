import { NextAuthConfig } from 'next-auth';

console.log(process.env.AUTH_GITHUB_ID);
console.log(process.env.AUTH_GITHUB_SECRET);
export const authConfig = {
  pages: {
    signIn: '/signin',
    newUser: '/signup'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      let isLoggedIn = !!auth?.user;
      let isOnChat = nextUrl.pathname.startsWith('/dashboard');
      let isOnRegister = nextUrl.pathname.startsWith('/signup');
      let isOnLogin = nextUrl.pathname.startsWith('/signin');

      if (isLoggedIn && (isOnLogin || isOnRegister)) {
        return Response.redirect(new URL('/', nextUrl));
      }

      if (isOnRegister || isOnLogin) {
        return true; // Always allow access to register and login pages
      }

      if (isOnChat) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }

      if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    }
  }
} satisfies NextAuthConfig;
