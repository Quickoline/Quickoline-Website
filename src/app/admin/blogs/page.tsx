'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Trash2, Edit } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const storedBlogs = localStorage.getItem('blogs');
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    }
  }, []);

  const handleDeleteBlog = (id: string) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(updatedBlogs);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Blogs</h1>
        <Link href="/admin/blogs/create">
          <Button>Create New Blog</Button>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-10 bg-gray-100 rounded">
          <p className="text-gray-600">No blogs found. Create your first blog!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div 
              key={blog.id} 
              className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
            >
              <div className="flex-grow">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-500 text-sm">
                  Created: {new Date(blog.createdAt).toLocaleString()}
                </p>
                <div 
                  className="text-gray-700 mt-2 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
              <div className="flex space-x-2">
                <Link href={`/admin/blogs/edit/${blog.id}`}>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button 
                  variant="destructive" 
                  size="icon"
                  onClick={() => handleDeleteBlog(blog.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}