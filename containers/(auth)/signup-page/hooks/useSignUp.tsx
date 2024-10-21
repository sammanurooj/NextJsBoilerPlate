import { RegisterSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSearchParams } from 'next/navigation';

import { register } from '@/actions/auth';

export const useSignUp = () => {
  const searchParams = useSearchParams();

  const defaultValues = useMemo(
    () => ({
      email: '',
      password: '',
      name: ''
    }),
    []
  );

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues
  });

  const [error, setError] = useState<string | undefined>('');
  const [successMessage, setSuccessMessage] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState<boolean>(false);

  const clearMessages = useCallback(() => {
    setError('');
    setSuccessMessage('');
  }, []);

  const onSubmit = useCallback(
    async (values: z.infer<typeof RegisterSchema>) => {
      clearMessages(); // Reset states
      setLoading(true);
      try {
        console.log('try', values);
        const registerData = await register({
          email: values?.email,
          name: values?.name,
          password: values?.password
        });

        if (registerData?.status === 'success') {
          setSuccessMessage('User register sucessfully');
        } else {
          setError(registerData?.error || 'Registration failed.');
        }
      } catch (err) {
        setError(
          'Unable to connect to the server. Please check your internet connection and try again.'
        );
      } finally {
        setLoading(false);
      }
    },
    [error, successMessage, loading]
  );

  return useMemo(
    () => ({
      form,
      error,
      successMessage,
      onSubmit,
      isPending,
      loading
    }),
    [form, error, successMessage, onSubmit, isPending, loading]
  );
};
