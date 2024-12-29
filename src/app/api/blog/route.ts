import { NextResponse } from 'next/server';
import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/api/blog/list/id/asc/3/1';
const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
const secretHeaderKey = 'wqH0CWwzRdDJis1wwyaZ9pCcuDTcT5GpK4EY34aihDfYdkaZfd'; // Key rahasia

export async function GET(request: Request) {
  // Validasi header custom
  const clientHeader = request.headers.get('x-affalximamv7-header');
  if (clientHeader !== secretHeaderKey) {
    return NextResponse.redirect(new URL('/', request.url));
  }

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
