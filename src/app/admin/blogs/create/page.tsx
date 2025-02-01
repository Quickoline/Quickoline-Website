'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { blogApi, categoryApi, tagApi } from '@/lib/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface Category {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}

const RichTextEditor = dynamic(
  () => import('@/components/ui/rich-text-editor').then((mod) => mod.RichTextEditor),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[300px] border rounded-lg bg-gray-50 animate-pulse" />
    ),
  }
);

export default function CreateBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch categories and tags on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, tagsData] = await Promise.all([
          categoryApi.list(),
          tagApi.list()
        ]);
        setCategories(categoriesData);
        setTags(tagsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        const createdCategory = await categoryApi.create({ name: newCategory.trim() });
        setCategories([...categories, createdCategory]);
        setNewCategory('');
        setIsCategoryDialogOpen(false);
      } catch (error) {
        console.error('Error creating category:', error);
        alert('Failed to create category. Please try again.');
      }
    }
  };

  const handleAddTag = async () => {
    if (newTag.trim()) {
      try {
        const createdTag = await tagApi.create({ name: newTag.trim() });
        setTags([...tags, createdTag]);
        setNewTag('');
        setIsTagDialogOpen(false);
      } catch (error) {
        console.error('Error creating tag:', error);
        alert('Failed to create tag. Please try again.');
      }
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    if (!selectedCategories.includes(categoryId)) {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleTagSelect = (tagId: string) => {
    if (!selectedTags.includes(tagId)) {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleRemoveCategory = (categoryId: string) => {
    setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
  };

  const handleRemoveTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter(id => id !== tagId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await blogApi.create({
        title,
        content,
        categories: selectedCategories,
        tags: selectedTags,
        status: 'draft',
        createdAt: new Date().toISOString(),
      });
      router.push('/admin/blogs');
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Create New Blog Post</h1>
        <p className="text-gray-500 mt-2">Write and publish your new blog post</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="categories">Categories</Label>
            <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Category</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Category Name</Label>
                    <Input
                      id="name"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Enter category name"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddCategory} disabled={!newCategory.trim()}>
                    Create Category
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedCategories.map((categoryId) => {
              const category = categories.find(c => c.id === categoryId);
              return category ? (
                <Badge key={category.id} variant="secondary" className="gap-1">
                  {category.name}
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(category.id)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ) : null;
            })}
          </div>
          
          <Select onValueChange={handleCategorySelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem 
                  key={category.id} 
                  value={category.id}
                  disabled={selectedCategories.includes(category.id)}
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="tags">Tags</Label>
            <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tag
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Tag</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="tagName">Tag Name</Label>
                    <Input
                      id="tagName"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Enter tag name"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddTag} disabled={!newTag.trim()}>
                    Create Tag
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
            {selectedTags.map((tagId) => {
              const tag = tags.find(t => t.id === tagId);
              return tag ? (
                <Badge key={tag.id} variant="outline" className="gap-1">
                  {tag.name}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag.id)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ) : null;
            })}
          </div>

          <Select onValueChange={handleTagSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select a tag" />
            </SelectTrigger>
            <SelectContent>
              {tags.map((tag) => (
                <SelectItem 
                  key={tag.id} 
                  value={tag.id}
                  disabled={selectedTags.includes(tag.id)}
                >
                  {tag.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Content</Label>
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Write your blog content here..."
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Post'}
          </Button>
        </div>
      </form>
    </div>
  );
}