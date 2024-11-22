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

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { FaGithub, FaGoogle, FaSpinner } from 'react-icons/fa';
import { useSignIn } from './hooks/useSignIn';

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
  preload: false
});

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
            {/* Existing email and password fields */}
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
          <Button
            type="button"
            className={cn(
              'bg-black hover:bg-gray-800 text-white rounded-[8px] h-10 w-full text-sm font-semibold transition-colors duration-200 3xl:w-[462px] 3xl:h-[48px]',
              font.className
            )}
            onClick={() => signIn('github', { redirectTo: '/dashboard' })}
            disabled={isPending}
          >
            <FaGithub className="mr-2" /> Sign in with GitHub
            {loading && <FaSpinner className="animate-spin ml-2" />}
          </Button>
          <Button
            type="button"
            className={cn(
              'bg-black hover:bg-gray-800 text-white rounded-[8px] h-10 w-full text-sm font-semibold transition-colors duration-200 3xl:w-[462px] 3xl:h-[48px]',
              font.className
            )}
            onClick={() => signIn('google', { redirectTo: '/dashboard' })}
            disabled={isPending}
          >
            <FaGoogle className="mr-2" /> Sign in with Google
            {loading && <FaSpinner className="animate-spin ml-2" />}
          </Button>

          <Button
            type="submit"
            className={cn(
              'bg-black hover:bg-gray-800 text-white rounded-[8px] h-10 w-full text-sm font-semibold transition-colors duration-200 3xl:w-[462px] 3xl:h-[48px]',
              font.className
            )}
            disabled={isPending}
          >
            Sign in
            {loading && <FaSpinner className="animate-spin ml-2" />}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SignInContainer;
