'use client';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const Page = () => {
  const { data: session, status } = useSession();

  // While loading, show a loading state
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If no session, redirect to signin
  if (!session) {
    redirect('/signin');
  }

  // If we have a session, show the profile
  return (
    <div className="flex flex-col items-center m-4">
      <h1 className="text-3xl my-2">Welcome, {session?.user?.name}</h1>
      {session?.user?.image && (
        <Image
          src={session.user.image}
          alt={session.user.name || 'Profile picture'}
          width={72}
          height={72}
          className="rounded-full my-4"
        />
      )}
      <button
        onClick={() => signOut({ callbackUrl: '/signin' })}
        className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
      >
        Sign out
      </button>
    </div>
  );
};

export default Page;
