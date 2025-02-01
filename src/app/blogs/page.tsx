'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, CalendarDays } from 'lucide-react';
import { Blog } from '@/types/blog';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { useRouter } from 'next/navigation';

function extractFirstImage(content: string): string | null {
  const match = content.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
}

function stripHtml(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

export default function BlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog/posts`);
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const result = await response.json();
        console.log('Blogs response:', result);
        if (result.success) {
          setBlogs(result.data.docs);
        } else {
          throw new Error(result.message || 'Failed to fetch blogs');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (slug: string) => {
    router.push(`/blogs/${slug}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-full">
              <div className="aspect-video bg-gray-200 animate-pulse" />
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse mb-2" />
                <div className="h-6 bg-gray-200 rounded w-full animate-pulse" />
                <div className="flex gap-2 mt-2">
                  <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
                  <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
        <div className="text-center py-10 bg-red-50 rounded">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => {
          const thumbnail = extractFirstImage(blog.content);
          const excerpt = stripHtml(blog.content).slice(0, 150) + '...';
          
          return (
            <Link href={`/blogs/${blog._id}`} key={blog._id}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                {blog.featuredImage && (
                  <div className="relative w-full h-48">
                    <Image
                      src={blog.featuredImage.url}
                      alt={blog.featuredImage.alt}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{blog.title}</CardTitle>
                  {blog.author && (
                    <div className="flex items-center gap-2">
                      {blog.author.avatar && (
                        <Avatar>
                          <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                          <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
                        </Avatar>
                      )}
                      <span className="text-sm text-gray-600">{blog.author.name}</span>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3">
                    {blog.meta.description || blog.content.substring(0, 150)}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <time dateTime={blog.created_at}>
                      {new Date(blog.created_at).toLocaleDateString()}
                    </time>
                  </div>
                  {blog.categories.length > 0 && (
                    <Badge>{blog.categories[0].name}</Badge>
                  )}
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 