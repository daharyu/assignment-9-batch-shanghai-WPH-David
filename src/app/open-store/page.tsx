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
import Link from 'next/link';
import { z } from 'zod';
import { registerShop } from '@/services/shop.service';

// Define AuthShop type (matching users.services.ts)
interface AuthShop {
  name: string;
  slug: string;
  address: string;
  logo?: File;
}

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Slug must not contain spaces or special characters except hyphens and underscores'
    ),
  address: z.string().min(1, 'Address must not be empty'),
  logo: z
    .instanceof(File)
    .optional()
    .refine(
      (file) =>
        !file || ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      { message: 'Avatar must be an image (JPEG, PNG, or WebP)' }
    )
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: 'Avatar must be less than 5MB',
    }),
});

type FormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    slug: '',
    address: '',
    logo: undefined,
  });
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
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
      const { name, slug, address, logo } = validationResult.data;

      const registerData: AuthShop = {
        name,
        slug,
        address,
        logo,
      };

      console.log('registerData:', registerData); // Debug log
      const result = await registerShop(registerData);
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
            Open Your Store Today
          </CardTitle>
          <CardDescription className='text-sm tracking-tight leading-7'>
            Start selling in minutes and reach thousands of customers instantly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-3 lg:gap-4'
          >
            <div className='grid gap-2 relative'>
              <label className='font-bold text-sm lg:text-[16px] leading-4 tracking-tight'>
                STORE PROFILE
              </label>
              <Input
                id='name'
                name='name'
                type='text'
                placeholder='Store Name'
                className='h-[47px] lg:h-[56px]'
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {formErrors.name && (
                <p className='text-red-500 text-xs'>{formErrors.name}</p>
              )}
              <Input
                id='slug'
                name='slug'
                type='text'
                placeholder='Store Slug'
                className='h-[47px] lg:h-[56px]'
                value={formData.slug}
                onChange={handleInputChange}
                required
              />
              {formErrors.slug && (
                <p className='text-red-500 text-xs'>{formErrors.slug}</p>
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
                id='logo'
                type='file'
                accept='image/jpeg,image/png,image/webp'
                className='lg:pt-4 h-[47px] lg:h-[56px]'
                onChange={handleInputChange}
              />
              {formErrors.logo && (
                <p className='text-red-500 text-xs'>{formErrors.logo}</p>
              )}
            </div>

            <div className='grid gap-2 relative'>
              <label className='font-bold text-sm lg:text-[16px] leading-4 tracking-tight'>
                STORE ADDRESS
              </label>

              <Input
                id='address'
                name='address'
                type='text'
                placeholder='Detail Address'
                className='h-[47px] lg:h-[56px]'
                value={formData.address}
                onChange={handleInputChange}
                required
              />
              {formErrors.address && (
                <p className='text-red-500 text-xs'>{formErrors.address}</p>
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
            <Button variant='link' className='font-bold' asChild>
              <Link href='/'>Back</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
