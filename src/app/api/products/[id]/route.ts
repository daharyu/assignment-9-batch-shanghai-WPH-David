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

export async function POST(req: Request) {
  try {
    const { token, productId, qty } = await req.json();

    // Validate the payload
    if (!token || !productId || qty == null) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: token, productId, and qty are required',
        },
        { status: 400 }
      );
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const data = { productId, qty };
    const res = await axiosAuthInstance.post('/api/cart/items', data, config);

    return NextResponse.json(res.data);
  } catch (error: unknown) {
    console.error('Error adding item to cart:', error);
    return NextResponse.json(
      { error: 'An error occurred while adding item to cart' },
      { status: 500 }
    );
  }
}
