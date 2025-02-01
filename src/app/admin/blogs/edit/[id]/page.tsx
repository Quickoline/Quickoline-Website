'use client';

import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { blogApi } from '@/lib/api';

import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon,
  Strikethrough,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Eye,
  Pencil,
  Save,
  Heading1,
  Heading2,
  Heading3,
  Code,
  Undo,
  Redo
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { X } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author?: {
    name: string;
    avatar?: string;
  };
  status: 'draft' | 'published';
  categories?: string[];
  tags?: string[];
}

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [previewMode, setPreviewMode] = useState(false);
  const [title, setTitle] = useState('');
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextStyle,
      Color,
      Highlight,
      Link.configure({
        openOnClick: true,
        linkOnPaste: true,
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: '<p>Loading...</p>',
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await blogApi.getById(params.id);
        setTitle(blog.title);
        setStatus(blog.status);
        setCategories(blog.categories || []);
        setTags(blog.tags || []);
        editor?.commands.setContent(blog.content);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    };

    if (editor) {
      fetchBlog();
    }
  }, [editor, params.id]);

  const handleLinkSubmit = () => {
    if (editor && linkUrl) {
      if (linkText) {
        editor
          .chain()
          .focus()
          .insertContent(`<a href="${linkUrl}">${linkText}</a>`)
          .run();
      } else {
        editor.chain().focus().setLink({ href: linkUrl }).run();
      }
    }
    setLinkDialogOpen(false);
    setLinkUrl('');
    setLinkText('');
  };

  const handleAddCategory = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newCategory.trim()) {
      e.preventDefault();
      if (!categories.includes(newCategory.trim())) {
        setCategories([...categories, newCategory.trim()]);
      }
      setNewCategory('');
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()]);
      }
      setNewTag('');
    }
  };

  const handleRemoveCategory = (category: string) => {
    setCategories(categories.filter(c => c !== category));
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSave = async () => {
    if (!editor || editor.isEmpty || !title.trim()) {
      alert('Please add both title and content before saving.');
      return;
    }

    try {
      setSaving(true);
      const content = editor.getHTML();
      const updatedBlog = {
        title: title.trim(),
        content,
        status,
        categories,
        tags,
      };

      await blogApi.update(params.id, updatedBlog);
      alert('Blog updated successfully!');
      // Optionally redirect to blog list
      // router.push('/admin/blogs');
    } catch (error) {
      alert('Failed to update blog: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">{error}</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => router.push('/admin/blogs')}
            >
              Back to Blog List
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!editor) {
    return <p>Loading editor...</p>;
  }

  return (
    <TooltipProvider>
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Blog Post</CardTitle>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your title here..."
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div>
            <Label htmlFor="categories">Categories</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {categories.map((category) => (
                <Badge key={category} variant="secondary" className="gap-1">
                  {category}
                  <button
                    onClick={() => handleRemoveCategory(category)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Input
              id="categories"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={handleAddCategory}
              placeholder="Add a category (press Enter)"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="gap-1">
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Input
              id="tags"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Add a tag (press Enter)"
              className="mt-1"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!previewMode && (
          <div className="flex flex-wrap gap-2 mb-4 p-2 border rounded-lg bg-slate-50">
            <div className="flex items-center gap-0.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'bg-slate-200' : ''}
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Bold</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'bg-slate-200' : ''}
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Italic</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive('underline') ? 'bg-slate-200' : ''}
                  >
                    <UnderlineIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Underline</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'bg-slate-200' : ''}
                  >
                    <Strikethrough className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Strikethrough</TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center gap-0.5">
              <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Link</DialogTitle>
                    <DialogDescription>
                      Enter the URL and optional text for your link.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="url">URL</Label>
                      <Input
                        id="url"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="https://example.com"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="text">Link Text (optional)</Label>
                      <Input
                        id="text"
                        value={linkText}
                        onChange={(e) => setLinkText(e.target.value)}
                        placeholder="Enter link text"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleLinkSubmit}>Add Link</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.onchange = (e: Event) => {
                        const target = e.target as HTMLInputElement;
                        const file = target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e: ProgressEvent<FileReader>) => {
                            const result = e.target?.result;
                            if (typeof result === 'string' && editor) {
                              editor.chain().focus().setImage({ src: result }).run();
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      };
                      input.click();
                    }}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add Image</TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center gap-0.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'bg-slate-200' : ''}
                  >
                    <Heading1 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Heading 1</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'bg-slate-200' : ''}
                  >
                    <Heading2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Heading 2</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'bg-slate-200' : ''}
                  >
                    <Heading3 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Heading 3</TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center gap-0.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={editor.isActive({ textAlign: 'left' }) ? 'bg-slate-200' : ''}
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Align Left</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={editor.isActive({ textAlign: 'center' }) ? 'bg-slate-200' : ''}
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Align Center</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={editor.isActive({ textAlign: 'right' }) ? 'bg-slate-200' : ''}
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Align Right</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    className={editor.isActive({ textAlign: 'justify' }) ? 'bg-slate-200' : ''}
                  >
                    <AlignJustify className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Justify</TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center gap-0.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'bg-slate-200' : ''}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Bullet List</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'bg-slate-200' : ''}
                  >
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Numbered List</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'bg-slate-200' : ''}
                  >
                    <Quote className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Quote</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'bg-slate-200' : ''}
                  >
                    <Code className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Code Block</TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center gap-0.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().undo().run()}
                  >
                    <Undo className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Undo</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().redo().run()}
                  >
                    <Redo className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Redo</TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center gap-0.5 ml-auto">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPreviewMode(true)}
                    disabled={saving}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Preview</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Save</TooltipContent>
              </Tooltip>
            </div>
          </div>
        )}

        <div className={previewMode ? 'prose max-w-none' : ''}>
          {previewMode ? (
            <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
          ) : (
            <EditorContent editor={editor} className="min-h-[500px] border rounded-lg p-4" />
          )}
        </div>

        {previewMode && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreviewMode(false)}
            className="mt-4"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Return to Edit Mode
          </Button>
        )}
      </CardContent>
    </Card>
    </TooltipProvider>
  );
}