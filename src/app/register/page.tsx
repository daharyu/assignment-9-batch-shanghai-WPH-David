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
import { registerUser } from '@/services/users.services';

// Define AuthUser type (matching users.services.ts)
interface AuthUser {
  name: string;
  email: string;
  password: string;
  avatar?: File;
  avatarUrl?: string;
}

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z
      .string()
      .min(8, 'Confirm password must be at least 8 characters'),
    avatar: z
      .instanceof(File)
      .optional()
      .refine(
        (file) =>
          !file ||
          ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
        { message: 'Avatar must be an image (JPEG, PNG, or WebP)' }
      )
      .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
        message: 'Avatar must be less than 5MB',
      }),
    avatarUrl: z
      .string()
      .optional()
      .refine((val) => !val || z.string().url().safeParse(val).success, {
        message: 'Invalid URL',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => !(data.avatar && data.avatarUrl), {
    message: 'Provide either an avatar file or URL, not both',
    path: ['avatarUrl'],
  });

type FormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: undefined,
    avatarUrl: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormData
  ) => {
    const value = field === 'avatar' ? e.target.files?.[0] : e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'avatar' && value ? { avatarUrl: '' } : {}),
    }));
    setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    setSubmitError(null);

    // Validate with Zod
    const validationResult = registerSchema.safeParse(formData);
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
      const { name, email, password, avatar, avatarUrl } =
        validationResult.data;

      const registerData: AuthUser = {
        name,
        email,
        password,
        avatar,
        avatarUrl,
      };

      console.log('registerData:', registerData); // Debug log
      const result = await registerUser(registerData);
      console.log('Registration successful:', result);
    } catch (err: any) {
      console.error('Registration error:', err);
      setSubmitError(err.message || 'Registration failed');
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
          <CardTitle className='font-bold text-2xl leading-9'>
            Register
          </CardTitle>
          <CardDescription className='text-sm tracking-tight leading-7'>
            Just a few steps away from your next favorite purchase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-3 lg:gap-4'
          >
            <div className='grid gap-2 relative'>
              <label
                htmlFor='name'
                className='hidden lg:block absolute text-xs leading-4 tracking-tight bg text-[#535862] top-1 left-3.5'
              >
                Name
              </label>
              <Input
                id='name'
                type='text'
                placeholder='Name'
                className='lg:pt-4 h-[47px] lg:h-[56px]'
                value={formData.name}
                onChange={(e) => handleInputChange(e, 'name')}
                required
              />
              {formErrors.name && (
                <p className='text-red-500 text-xs'>{formErrors.name}</p>
              )}
            </div>
            <div className='grid gap-2 relative'>
              <label
                htmlFor='avatar'
                className='hidden lg:block absolute text-xs leading-4 tracking-tight bg text-[#535862] top-1 left-3.5'
              >
                Avatar
              </label>
              <Input
                id='avatar'
                type='file'
                accept='image/jpeg,image/png,image/webp'
                className='lg:pt-4 h-[47px] lg:h-[56px]'
                onChange={(e) => handleInputChange(e, 'avatar')}
              />
              {formErrors.avatar && (
                <p className='text-red-500 text-xs'>{formErrors.avatar}</p>
              )}
            </div>
            <div className='grid gap-2 relative'>
              <label
                htmlFor='avatarUrl'
                className='hidden lg:block absolute text-xs leading-4 tracking-tight bg text-[#535862] top-1 left-3.5'
              >
                Avatar URL
              </label>
              <Input
                id='avatarUrl'
                type='url'
                placeholder='Avatar URL'
                className='lg:pt-4 h-[47px] lg:h-[56px]'
                value={formData?.avatarUrl || ''}
                onChange={(e) => handleInputChange(e, 'avatarUrl')}
                disabled={!!formData.avatar}
              />
              {formErrors.avatarUrl && (
                <p className='text-red-500 text-xs'>{formErrors.avatarUrl}</p>
              )}
            </div>
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
            <div className='grid gap-2 relative'>
              <label
                htmlFor='confirmPassword'
                className='hidden lg:block absolute text-xs leading-4 tracking-tight bg text-[#535862] top-1 left-3.5'
              >
                Confirm Password
              </label>
              <Input
                id='confirmPassword'
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Confirm Password'
                className='lg:pt-4 h-[47px] lg:h-[56px]'
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange(e, 'confirmPassword')}
                required
              />
              <Button
                type='button'
                size='sm'
                variant='ghost'
                className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <EyeIcon className='h-4 w-4' aria-hidden='true' />
                ) : (
                  <EyeOffIcon className='h-4 w-4' aria-hidden='true' />
                )}
                <span className='sr-only'>
                  {showConfirmPassword ? 'Hide password' : 'Show password'}
                </span>
              </Button>
              {formErrors.confirmPassword && (
                <p className='text-red-500 text-xs'>
                  {formErrors.confirmPassword}
                </p>
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
              Already have an account?
              <Button variant='link' className='font-bold' asChild>
                <Link href='/login'>Log In</Link>
              </Button>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
