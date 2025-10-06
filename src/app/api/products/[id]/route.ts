import { axiosAuthInstance } from '@/api/axiosClientInstance';
import { NextResponse } from 'next/server';

type Params = {
  params: {
    id: string;
  };
};

export async function GET(req: Request, { params }: Params) {
  try {
    const { id } = params;
    const res = await axiosAuthInstance.get(`/api/products/${id}`);
    return NextResponse.json(res.data);
  } catch (error: Error | unknown) {
    console.log(error);
    return NextResponse.error();
  }
}
