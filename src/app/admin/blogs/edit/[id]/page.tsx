'use client';

import { useState } from 'react';
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

const Tiptap = () => {
  const [previewMode, setPreviewMode] = useState(false);
  const [title, setTitle] = useState('');
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

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
    content: '<p>Write something awesome here! 🌟</p>',
  });

  // Update the handleImageUpload function with proper typing:
const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
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

  const handleSave = () => {
    if (!editor || editor.isEmpty || !title.trim()) {
      alert('Please add both title and content before saving.');
      return;
    }
    const content = editor.getHTML();
    const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    const newBlog = {
      id: Date.now().toString(),
      title: title.trim(),
      content,
      createdAt: new Date().toISOString(),
    };
    blogs.push(newBlog);
    localStorage.setItem('blogs', JSON.stringify(blogs));
    alert('Content saved successfully!');
  };

  if (!editor) {
    return <p>Loading editor...</p>;
  }

  return (
    <TooltipProvider>
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Rich Text Editor</CardTitle>
        <div className="mt-4">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your title here..."
            className="mt-1"
          />
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
              <Input
                type="color"
                className="w-8 h-8 p-1"
                onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
                title="Text Color"
              />
              <Input
                type="color"
                className="w-8 h-8 p-1"
                onChange={(e) =>
                  editor.chain().focus().setHighlight({ color: e.target.value }).run()
                }
                title="Background Color"
              />
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
                    className={editor.isActive('orderedList') ? 'bg-slate-200' : ''}>
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

            <div className="flex gap-2 ml-auto">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSave}
                className="bg-white hover:bg-slate-100"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
                className="bg-white hover:bg-slate-100"
              >
                {previewMode ? (
                  <>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        <div className="border rounded-lg p-4 min-h-[400px] bg-white">
          {previewMode ? (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: editor?.getHTML() || '' }}
            />
          ) : (
            <EditorContent editor={editor} className="prose max-w-none" />
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
};

export default Tiptap;