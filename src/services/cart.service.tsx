import { axiosAuthInstance } from '@/api/axiosClientInstance';
import { NextResponse } from 'next/server';

type PropsCart = {
  itemId: string | number;
  token: string;
};

export const deleteById = async ({ itemId, token }: PropsCart) => {
  try {
    // Validate the payload
    if (!token || !itemId) {
      return NextResponse.json(
        {
          error: 'Missing required fields: token and itemId are required',
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

    const res = await axiosAuthInstance.delete(
      `/api/cart/items/${itemId}`,
      config
    );

    return NextResponse.json(res.data);
  } catch (error: unknown) {
    console.error('Error deleting item from cart:', error);
    return NextResponse.json(
      { error: 'An error occurred while deleting item from cart' },
      { status: 500 }
    );
  }
};
