import { axiosAuthInstance } from '@/api/axiosClientInstance';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await axiosAuthInstance.get('/api/products');
    return NextResponse.json(res.data);
  } catch (error: Error | unknown) {
    console.log(error);
    return NextResponse.error();
  }
}
