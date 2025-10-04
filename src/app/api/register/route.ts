/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { axiosAuthInstance } from '@/api/axiosClientInstance';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    console.log(
      'Received request to /api/auth/register, Content-Type:',
      contentType
    );

    let response;
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      console.log('Forwarding FormData:', [...formData.entries()]);
      response = await axiosAuthInstance.post('/api/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } else if (contentType.includes('application/json')) {
      const body = await request.json();
      console.log('Forwarding JSON:', body);
      response = await axiosAuthInstance.post('/api/auth/register', body);
    } else {
      throw new Error('Unsupported Content-Type: ' + contentType);
    }

    console.log('External API response:', response.data);
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Registration error:', error.message, error.stack, {
      response: error.response?.data,
      status: error.response?.status,
    });
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Registration failed',
        data: null,
      },
      { status: error.response?.status || 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message: 'Method GET not allowed for this endpoint',
      data: null,
    },
    { status: 405 }
  );
}
