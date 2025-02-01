'use client';

import { use } from 'react';
import BlogContent from './blog-content';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPage({ params }: PageProps) {
  const { slug } = use(params);

  return (
    <div className="container mx-auto p-4">
      <Link href="/blogs">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blogs
        </Button>
      </Link>

      <BlogContent id={slug} />
    </div>
  );
} 