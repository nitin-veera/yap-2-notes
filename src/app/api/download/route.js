import { NextResponse } from 'next/server';

export async function GET(request) {
  // Get the URL parameters
  const { searchParams } = new URL(request.url);
  const content = searchParams.get('content');

  if (!content) {
    return NextResponse.json(
      { message: "No content provided" },
      { status: 400 }
    );
  }

  // Create response with markdown content
  const response = new NextResponse(content, {
    headers: {
      'Content-Type': 'text/markdown',
      'Content-Disposition': 'attachment; filename=lecture-notes.md'
    }
  });

  return response;
} 