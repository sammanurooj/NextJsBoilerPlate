'use client';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Plus_Jakarta_Sans } from 'next/font/google';

import { signIn } from 'next-auth/react';
import { FaGithub, FaGoogle, FaSpinner } from 'react-icons/fa';
import { useSignIn } from './hooks/useSignIn';

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
  preload: false
});

const buttonStyles =
  'w-full h-10 rounded-lg flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-white'; // Added text-white here

const SignInContainer = () => {
  const { form, error, successMessage, onSubmit, isPending, loading } =
    useSignIn();
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 px-4 sm:px-16 w-full"
        >
          <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
            <h3 className="text-xl font-semibold dark:text-zinc-50">Sign In</h3>
          </div>
          <div className="flex flex-col gap-2 ">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="bg-white">
                  <FormLabel
                    className={cn(
                      'text-signupLabel text-sm font-semibold',
                      font.className
                    )}
                  >
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="rounded-[6px] pl-4 h-10 w-full"
                      disabled={isPending}
                      placeholder="Enter Email Address"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      'text-signupLabel text-sm font-semibold',
                      font.className
                    )}
                  >
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="rounded-[6px] pl-4 h-10 w-full"
                      disabled={isPending}
                      placeholder="Enter Password"
                      type="password"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="max-h-[4px]">
            <FormError message={error} />
            <FormSuccess message={successMessage} />
          </div>

          {/* GitHub Sign In Button */}
          <button
            type="button"
            className={`${buttonStyles} bg-black hover:bg-gray-800`}
            onClick={() => signIn('github', { redirectTo: '/dashboard' })}
            disabled={isPending}
            style={{
              backgroundColor: '#000000',
              color: '#ffffff' // Added explicit white color
            }}
          >
            <FaGithub size={20} color="white" /> {/* Added color="white" */}
            <span className="text-white">Sign in with GitHub</span>{' '}
            {/* Added text-white class */}
            {loading && <FaSpinner className="animate-spin text-white" />}{' '}
            {/* Added text-white */}
          </button>

          {/* Google Sign In Button */}
          <button
            type="button"
            className={`${buttonStyles} bg-black hover:bg-gray-800`}
            onClick={() => signIn('google', { redirectTo: '/dashboard' })}
            disabled={isPending}
            style={{
              backgroundColor: '#000000',
              color: '#ffffff' // Added explicit white color
            }}
          >
            <FaGoogle size={20} color="white" /> {/* Added color="white" */}
            <span className="text-white">Sign in with Google</span>{' '}
            {/* Added text-white class */}
            {loading && <FaSpinner className="animate-spin text-white" />}{' '}
            {/* Added text-white */}
          </button>

          {/* Regular Sign In Button */}
          <button
            type="submit"
            className={`${buttonStyles} bg-black hover:bg-gray-800`}
            disabled={isPending}
            style={{
              backgroundColor: '#000000',
              color: '#ffffff' // Added explicit white color
            }}
          >
            <span className="text-white">Sign in</span>{' '}
            {/* Added text-white class */}
            {loading && <FaSpinner className="animate-spin text-white" />}{' '}
            {/* Added text-white */}
          </button>
        </form>
      </Form>
    </>
  );
};

export default SignInContainer;
