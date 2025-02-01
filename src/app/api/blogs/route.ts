import { NextResponse } from 'next/server';

export interface Blog {
  _id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  meta: {
    description: string;
    keywords: string[];
  };
  categories: Array<{
    _id: string;
    name: string;
    slug: string;
  }>;
  tags: string[];
  published: boolean;
  slug: string;
  author?: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  featuredImage?: {
    url: string;
    alt: string;
  };
}

let blogs: Blog[] = [];

export async function GET() {
  return NextResponse.json(blogs);
}

export async function POST(request: Request) {
  try {
    const blog = await request.json();

    if (!blog.title || !blog.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const newBlog: Blog = {
      id: Date.now().toString(),
      title: blog.title,
      content: blog.content,
      createdAt: blog.createdAt || new Date().toISOString(),
      status: blog.status || 'draft',
      author: blog.author,
      categories: blog.categories || [],
      tags: blog.tags || [],
    };

    blogs.push(newBlog);

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
} 