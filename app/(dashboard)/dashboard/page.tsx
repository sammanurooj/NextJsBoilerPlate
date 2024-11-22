
'use client';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const page = () => {
  const { data: session } = useSession();

  console.log('hello', session);

  if (session) {
    return (
      <div className="flex flex-col items-center m-4">
        <h1 className="text-3xl my-2">Welcome, {session?.user?.name}</h1>
        <Image
          src={session?.user?.image}
          alt={session?.user?.name}
          width={72}
          height={72}
          className="rounded-full"
        />
        <button onClick={() => signOut({ redirectTo: '/signin' })}>
          Sign out
        </button>
      </div>
    );
  }
};

export default page;
