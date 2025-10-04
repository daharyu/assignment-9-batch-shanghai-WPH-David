/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from '@/api/axiosInstance';

type AuthUser = {
  name: string;
  email: string;
  password: string;
  avatar?: File; // File upload for avatar
  avatarUrl?: string; // Alternative URL
};

type ReponseRegisterUser = {
  success: boolean;
  message: string;
  data: {
    id: number | string;
    name: string;
    email: string;
    avatarUrl?: string;
    avatar?: string;
  } | null;
};

type LoginUser = {
  email: string;
  password: string;
};

type ReponseLoginUser = {
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
};

export const registerUser = async (
  props: AuthUser
): Promise<ReponseRegisterUser> => {
  try {
    let res;
    if (props.avatar instanceof File) {
      console.log('Sending FormData with file:', props.avatar.name);
      const formData = new FormData();
      formData.append('name', props.name);
      formData.append('email', props.email);
      formData.append('password', props.password);
      formData.append('avatar', props.avatar);

      // Log FormData contents
      for (const [key, value] of formData.entries()) {
        console.log(
          `FormData ${key}:`,
          value instanceof File ? `File: ${value.name}` : value
        );
      }

      res = await axiosInstance.post('/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } else {
      console.log('Sending JSON:', props);
      const payload = {
        name: props.name,
        email: props.email,
        password: props.password,
        avatarUrl: props.avatarUrl,
      };
      res = await axiosInstance.post('/register', payload);
    }
    console.log('Response:', res.data);
    return res.data as ReponseRegisterUser;
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

export const loginUser = async (props: LoginUser) => {
  try {
    const formData = new FormData();
    formData.append('email', props.email);
    formData.append('password', props.password);

    const res = await axiosInstance.post('/login', formData);
    console.log('Response:', res.data);
    return res.data as ReponseLoginUser;
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
