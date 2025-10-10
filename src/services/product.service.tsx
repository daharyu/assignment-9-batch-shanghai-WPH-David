import { axiosAuthInstance } from '@/api/axiosClientInstance';
import { axiosInstance } from '@/api/axiosInstance';

type PropsCart = {
  productId: string;
  qty: number;
  token: string;
};

export const getAllProducts = async () => {
  const res = await axiosInstance.get(`/products`);
  return res.data;
};

export const getProductInfinite = async (pageParam: number = 1) => {
  const res = await axiosAuthInstance.get(`/api/products`, {
    params: {
      page: pageParam,
    },
  });
  return res.data;
};
export const getAllProductsCatalog = async () => {
  const res = await axiosInstance.get(`/catalog`);
  return res.data;
};

export const getProductById = async (id: string) => {
  const res = await axiosInstance.get(`/products/${id}`);
  return res.data;
};
export const postCart = async ({ productId, qty, token }: PropsCart) => {
  try {
    const payload = { productId, qty, token }; // Send token in body
    const res = await axiosInstance.post(`/products/${productId}`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error: unknown) {
    console.error('Error in postCart:', error);
    throw error; // Let the caller handle the error
  }
};
