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
import router from 'next/router';

// Define AuthShop type (matching API expectations)
interface AuthShop {
  name: string;
  slug: string;
  address: string;
  logo?: File; // File for client-side, sent as binary in FormData
}

const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(255, 'Name must be less than 255 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .max(100, 'Slug must be less than 100 characters')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Slug must not contain spaces or special characters except hyphens and underscores'
    ),
  address: z
    .string()
    .min(1, 'Address must not be empty')
    .max(500, 'Address must be less than 500 characters'),
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
    const { name, value, files } = e.target;
    if (name === 'logo' && files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        logo: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    setSubmitError(null);
  };

  const postShop = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('slug', formData.slug);
      formDataToSend.append('address', formData.address);
      if (formData.logo) {
        formDataToSend.append('logo', formData.logo);
      }

      // Log FormData for debugging
      for (const [key, value] of formDataToSend.entries()) {
        console.log(`FormData: ${key} =`, value);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/seller/activate`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.message || errorData.error || (await response.text());
        console.error('Error response:', errorMessage);
        throw new Error(
          `HTTP ${response.status}: ${errorMessage || 'Bad request'}`
        );
      }

      return await response.json();
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'An error occurred'
      );
    }
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
      const result = await postShop();
      router.push('/products');
      console.log('Shop registered successfully:', result);
      // Optionally redirect or show success message
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to register shop'
      );
    }
  };

  return (
    <div className='h-screen flex justify-center items-center mx-0'>
      <Card className='w-[345px] lg:w-[451px] mx-auto p-5 lg:p-6 flex flex-col gap-5 lg:gap-6 rounded-2xl'>
        <div className='logo px-5 lg:px-6 flex items-center gap-2'>
          <Image src={imgLogo} alt='Logo' className='size-8 lg:size-[42px]' />
          <h3 className='text-lg font-semibold'>Shirt</h3>
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
                htmlFor='logo'
                className='hidden lg:block absolute text-xs leading-4 tracking-tight bg-white text-[#535862] top-1 left-3.5'
              >
                Avatar
              </label>
              <Input
                id='logo'
                name='logo'
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
        <CardFooter className='flex flex-col gap-2'>
          <Button variant='link' className='font-bold' asChild>
            <Link href='/'>Back</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
