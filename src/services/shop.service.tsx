/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from '@/api/axiosInstance';
import { sl } from 'zod/locales';

interface AuthShop {
  name: string;
  slug: string;
  address: string;
  logo?: File;
}

export const getShop = async (pageParam: number = 1) => {
  const res = await axiosInstance.get(`/shop`);
  console.log(pageParam);
  return res.data;
};

export const registerShop = async (props: AuthShop) => {
  try {
    if (props.logo instanceof File) {
      console.log('Sending FormData with file:', props.logo.name);
      const formData = new FormData();
      formData.append('name', props.name);
      formData.append('slug', props.slug);
      formData.append('address', props.address);
      formData.append('avatar', props.logo);

      // Log FormData contents
      for (const [key, value] of formData.entries()) {
        console.log(
          `FormData ${key}:`,
          value instanceof File ? `File: ${value.name}` : value
        );
      }

      const res = await axiosInstance.post('/open-store', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', res.data);
      return res.data;
    }
  } catch (error: any) {
    console.error('Registration error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    if (error.response) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
    throw new Error('An unexpected error occurred during registration');
  }
};
