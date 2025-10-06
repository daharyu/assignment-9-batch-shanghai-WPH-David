import { axiosInstance } from '@/api/axiosInstance';

export const getAllProducts = async (pageParam: number = 1) => {
  const res = await axiosInstance.get(`/products`);
  console.log(pageParam);
  return res.data;
};

export const getProductById = async (id: string) => {
  const res = await axiosInstance.get(`/products/${id}`);
  return res.data;
};
