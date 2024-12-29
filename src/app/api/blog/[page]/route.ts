import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request, { params }: { params: { page: string } }) {
  const apiUrl = `http://127.0.0.1:8000/api/blog/list/id/asc/1/${params.page}`;
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ message: 'Error fetching blog data' }, { status: 500 });
  }
}
