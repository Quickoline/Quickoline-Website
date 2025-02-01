'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, User, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Blog } from '@/types/blog';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { useRouter } from 'next/navigation';

function extractFirstImage(content: string): string | null {
  const match = content.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
}

function stripImageFromContent(content: string): string {
  return content.replace(/<img[^>]+>/, '');
}

// Function to split content into pages based on word count
function splitContentIntoPages(content: string, wordsPerPage: number = 500): string[] {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  const words = tempDiv.textContent?.split(/\s+/) || [];
  const pages: string[] = [];
  let currentPage: string[] = [];
  let currentWordCount = 0;
  let currentElement: Element | null = tempDiv.firstElementChild;

  while (currentElement) {
    const elementText = currentElement.textContent || '';
    const elementWords = elementText.split(/\s+/);
    
    if (currentWordCount + elementWords.length > wordsPerPage && currentPage.length > 0) {
      pages.push(currentPage.join(''));
      currentPage = [];
      currentWordCount = 0;
    }

    currentPage.push(currentElement.outerHTML);
    currentWordCount += elementWords.length;
    currentElement = currentElement.nextElementSibling;
  }

  if (currentPage.length > 0) {
    pages.push(currentPage.join(''));
  }

  return pages;
}

interface BlogContentProps {
  id: string;
}

export default function BlogContent({ id }: BlogContentProps) {
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        console.log('Fetching blog with ID:', id); // Debug log
        console.log('API URL:', `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog/posts/${id}`); // Debug URL

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog/posts/${id}`, {
          // Add CORS headers
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          console.error('Response not OK:', response.status);
          throw new Error('Failed to fetch blog');
        }

        const result = await response.json();
        console.log('API Response:', result);

        if (result.success && result.data) {
          setBlog(result.data);
        } else {
          console.error('Invalid data structure:', result);
          throw new Error('Blog not found');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  useEffect(() => {
    if (blog) {
      const contentWithoutImage = stripImageFromContent(blog.content);
      const splitPages = splitContentIntoPages(contentWithoutImage);
      setPages(splitPages);
      setCurrentPage(0);
    }
  }, [blog]);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => router.push('/blogs')}
          className="text-blue-500 hover:underline"
        >
          Return to Blogs
        </button>
      </Card>
    );
  }

  if (!blog) {
    return (
      <Card className="p-6">
        <div>Blog not found</div>
        <button
          onClick={() => router.push('/blogs')}
          className="text-blue-500 hover:underline mt-4"
        >
          Return to Blogs
        </button>
      </Card>
    );
  }

  const featuredImage = extractFirstImage(blog.content);

  return (
    <Card className="p-6">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
      {blog.categories && blog.categories.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Categories:</h3>
          <div className="flex gap-2">
            {blog.categories.map(category => (
              <span key={category._id} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {category.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
} 