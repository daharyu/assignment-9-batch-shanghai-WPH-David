/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import imgLogo from '../../../public/Logo.svg';
import Image from 'next/image';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import { z } from 'zod';
import { loginUser } from '@/services/users.services';
import { useRouter } from 'next/navigation';

// Define AuthUser type (matching users.services.ts)
interface AuthUser {
  email: string;
  password: string;
}

interface ReponseLoginUser {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: number | string;
      name: string;
      email: string;
      avatarUrl?: string;
    } | null;
  } | null;
}

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormData
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    setSubmitError(null);

    // Validate with Zod
    const validationResult = loginSchema.safeParse(formData);
    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      setFormErrors(
        Object.fromEntries(
          Object.entries(errors).map(([key, value]) => [key, value?.[0]])
        )
      );
      return;
    }

    try {
      const { email, password } = validationResult.data;

      const loginData: AuthUser = {
        email,
        password,
      };
      const result: ReponseLoginUser = await loginUser(loginData);
      console.log('Login successful:', result);
      router.push('/products');
      localStorage.setItem('token', result.data?.token || '');
      localStorage.setItem('user', JSON.stringify(result.data?.user || ''));
    } catch (err: any) {
      console.error('Login error:', err);
      setSubmitError(err.message || 'Login failed');
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center bg-gray-100'>
      <Card className='w-[345px] lg:w-[451px] mx-auto my-auto p-5 lg:p-6 flex flex-col gap-5 lg:gap-6 rounded-2xl'>
        <div className='logo px-5 lg:px-6'>
          <Image src={imgLogo} alt='Logo' className='size-8 lg:size-[42px]' />
          <h3>Shirt</h3>
        </div>
        <CardHeader className='flex flex-col gap-1'>
          <CardTitle className='font-bold text-2xl leading-9'>Log In</CardTitle>
          <CardDescription className='text-sm tracking-tight leading-7'>
            Access your account and start shopping in seconds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-3 lg:gap-4'
          >
            <div className='grid gap-2 relative'>
              <label
                htmlFor='email'
                className='hidden lg:block absolute text-xs leading-4 tracking-tight bg text-[#535862] top-1 left-3.5'
              >
                Email
              </label>
              <Input
                id='email'
                type='email'
                placeholder='Email'
                className='lg:pt-4 h-[47px] lg:h-[56px]'
                value={formData.email}
                onChange={(e) => handleInputChange(e, 'email')}
                required
              />
              {formErrors.email && (
                <p className='text-red-500 text-xs'>{formErrors.email}</p>
              )}
            </div>
            <div className='grid gap-2 relative'>
              <label
                htmlFor='password'
                className='hidden lg:block absolute text-xs leading-4 tracking-tight bg text-[#535862] top-1 left-3.5'
              >
                Password
              </label>
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                className='lg:pt-4 h-[47px] lg:h-[56px]'
                value={formData.password}
                onChange={(e) => handleInputChange(e, 'password')}
                required
              />
              <Button
                type='button'
                size='sm'
                variant='ghost'
                className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeIcon className='h-4 w-4' aria-hidden='true' />
                ) : (
                  <EyeOffIcon className='h-4 w-4' aria-hidden='true' />
                )}
                <span className='sr-only'>
                  {showPassword ? 'Hide password' : 'Show password'}
                </span>
              </Button>
              {formErrors.password && (
                <p className='text-red-500 text-xs'>{formErrors.password}</p>
              )}
            </div>
            {submitError && (
              <p className='text-red-500 text-xs text-center'>{submitError}</p>
            )}
            <Button type='submit' className='w-full mt-6'>
              Submit
            </Button>
          </form>
        </CardContent>
        <CardFooter className='flex-col gap-2'>
          <div>
            <p>
              Don&apos;t have an account?
              <Button variant='link' className='font-bold' asChild>
                <Link href='/register'>Register</Link>
              </Button>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
