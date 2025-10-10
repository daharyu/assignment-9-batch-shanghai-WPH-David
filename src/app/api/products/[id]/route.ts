import { axiosAuthInstance } from '@/api/axiosClientInstance';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const res = await axiosAuthInstance.get(`/api/products/${id}`);
    return NextResponse.json(res.data);
  } catch (error: unknown) {
    console.error('Error fetching product:', error);
    return NextResponse.error();
  }
}

export async function POST(request: NextRequest) {
  try {
    const { token, productId, qty } = await request.json();

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
