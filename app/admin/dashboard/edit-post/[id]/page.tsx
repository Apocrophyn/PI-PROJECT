'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  ImageIcon, 
  Loader2, 
  Bold, 
  Italic, 
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Eye,
  Edit3,
  Upload,
  Type,
  Palette
} from 'lucide-react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import CodeBlock from '@tiptap/extension-code-block';
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import FontFamily from '@tiptap/extension-font-family';

export default function EditPostPage({ params }: { params: { id: string } }) {
  const postId = params.id;
  const isNewPost = postId === 'new';
  const [post, setPost] = useState<Partial<BlogPost>>({
    title: '',
    content: '',
    author: '',
    published: false,
    image_url: '',
  });
  const [loading, setLoading] = useState(!isNewPost);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [featuredImageUploading, setFeaturedImageUploading] = useState(false);
  const [previewMode, setPreviewMode] = useState<'none' | 'split' | 'full'>('none');
  const router = useRouter();

  // Add authentication check
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        console.error('Authentication error:', error);
        router.push('/admin/login');
        return;
      }
    };
    checkAuth();
  }, [router]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: 'heading-default',
          },
        },
        bold: {
          HTMLAttributes: {
            class: 'font-bold',
          },
        },
        italic: {
          HTMLAttributes: {
            class: 'italic',
          },
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: 'list-disc list-outside ml-6 space-y-2',
          },
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: 'list-decimal list-outside ml-6 space-y-2',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'pl-2',
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4',
          },
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto my-4',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-200',
        },
      }),
      Underline.configure({
        HTMLAttributes: {
          class: 'underline',
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-gray-100 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm my-4',
        },
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      FontFamily,
    ],
    content: post.content,
    onUpdate: ({ editor }) => {
      setPost(prev => ({ ...prev, content: editor.getHTML() }));
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[200px] p-4',
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer?.files.length) {
          const file = event.dataTransfer.files[0];
          if (file && file.type.startsWith('image/')) {
            handleImageUpload(file);
            return true;
          }
        }
        return false;
      },
      handlePaste: (view, event) => {
        const items = Array.from(event.clipboardData?.items || []);
        const imageItem = items.find(item => item.type.startsWith('image/'));
        if (imageItem) {
          const file = imageItem.getAsFile();
          if (file) {
            handleImageUpload(file);
            return true;
          }
        }
        return false;
      },
    },
  });

  useEffect(() => {
    // Fetch post data if editing an existing post
    if (!isNewPost) {
      fetchPost(postId);
    }
  }, [isNewPost, postId, router]);

  useEffect(() => {
    // Update editor content when post changes
    if (editor && post.content) {
      if (editor.getHTML() !== post.content) {
        editor.commands.setContent(post.content);
      }
    }
  }, [editor, post.content]);

  // Add custom styles to the document head
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const style = document.createElement('style');
    style.textContent = `
      .ProseMirror h1 { font-size: 2.5em !important; font-weight: bold; margin: 1em 0 0.5em; line-height: 1.2; color: rgb(17 24 39); }
      .ProseMirror h2 { font-size: 2em !important; font-weight: bold; margin: 1em 0 0.5em; line-height: 1.25; color: rgb(17 24 39); }
      .ProseMirror h3 { font-size: 1.75em !important; font-weight: bold; margin: 1em 0 0.5em; line-height: 1.3; color: rgb(17 24 39); }
      .dark .ProseMirror h1, .dark .ProseMirror h2, .dark .ProseMirror h3 { color: white; }
      .ProseMirror p { margin: 0.75em 0; line-height: 1.6; }
      .ProseMirror img { display: block; max-width: 100%; height: auto; margin: 1em 0; }
      .ProseMirror ul, .ProseMirror ol { margin: 0.75em 0; }
      .ProseMirror blockquote { margin: 1em 0; }
      .ProseMirror pre { margin: 1em 0; }
    `;
    document.head.appendChild(style);
    return () => {
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const fetchPost = async (id: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) {
        setPost(data);
      }
    } catch (error: any) {
      console.error('Error fetching post:', error);
      setError('Failed to load post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!post.title || !post.content) {
      setError('Title and content are required');
      return;
    }
    
    try {
      setSaving(true);
      setError(null);
      
      const postData = {
        title: post.title,
        content: post.content,
        author: post.author || 'Anonymous',
        image_url: post.image_url,
        published: post.published || false,
        updated_at: new Date().toISOString()
      };
      
      let result;
      
      if (isNewPost) {
        result = await supabase
          .from('posts')
          .insert([postData])
          .select()
          .single();
      } else {
        result = await supabase
          .from('posts')
          .update(postData)
          .eq('id', postId)
          .select()
          .single();
      }
      
      if (result.error) {
        throw result.error;
      }
      
      router.push('/admin/dashboard');
    } catch (error: any) {
      console.error('Error saving post:', error);
      setError(error.message || 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file || !editor) return;
    
    try {
      setImageUploading(true);
      
      // First check authentication
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      if (authError || !session) {
        throw new Error('You must be logged in to upload images');
      }
      
      // First check if the file is an image
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file');
      }
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Image size should be less than 5MB');
      }
      
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
      
      if (!fileExt || !validExtensions.includes(fileExt)) {
        throw new Error('Please upload a valid image file (JPG, PNG, GIF, or WebP)');
      }
      
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;
      
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type,
        });
        
      if (uploadError) {
        console.error('Supabase upload error:', uploadError);
        
        // Check if it's an RLS policy error
        if (uploadError.message.includes('row-level security policy')) {
          throw new Error('Permission denied. Please check your Supabase storage bucket policies. You need to enable upload permissions for authenticated users.');
        }
        
        throw uploadError;
      }
      
      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
      
      if (data?.publicUrl) {
        editor
          .chain()
          .focus()
          .setImage({ src: data.publicUrl, alt: file.name })
          .run();
      }
    } catch (error: any) {
      console.error('Error uploading image:', error);
      setError(error.message || 'Failed to upload image. Please try again.');
    } finally {
      setImageUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleFeaturedImageUpload = async (file: File) => {
    if (!file) return;
    
    try {
      setFeaturedImageUploading(true);
      setError(null); // Clear any previous errors
      
      // Check authentication first
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      if (authError || !session) {
        throw new Error('You must be logged in to upload images');
      }
      
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file');
      }
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Image size should be less than 5MB');
      }
      
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
      
      if (!fileExt || !validExtensions.includes(fileExt)) {
        throw new Error('Please upload a valid image file (JPG, PNG, GIF, or WebP)');
      }
      
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `featured/${fileName}`; // Store featured images in a separate folder
      
      console.log('Uploading image to Supabase storage:', filePath);
      
      // Upload the file
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type,
        });
        
      if (uploadError) {
        console.error('Supabase upload error:', uploadError);
        
        if (uploadError.message.includes('storage/unauthorized')) {
          throw new Error('You are not authorized to upload images. Please check your login status.');
        }
        
        if (uploadError.message.includes('row-level security policy')) {
          throw new Error('Permission denied. Please check your Supabase storage bucket policies.');
        }
        
        throw uploadError;
      }
      
      console.log('Upload successful, getting public URL');
      
      // Get the public URL
      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
      
      console.log('Public URL data:', data);
      
      if (data?.publicUrl) {
        // Update the post state with the new image URL
        setPost(prev => ({ ...prev, image_url: data.publicUrl }));
        
        // Also update the database immediately for existing posts
        if (!isNewPost) {
          const { error: updateError } = await supabase
            .from('posts')
            .update({ image_url: data.publicUrl })
            .eq('id', postId);
            
          if (updateError) {
            console.error('Database update error:', updateError);
            throw updateError;
          }
        }
      } else {
        throw new Error('Failed to get public URL for uploaded image');
      }
    } catch (error: any) {
      console.error('Error uploading featured image:', error);
      setError(error.message || 'Failed to upload featured image. Please try again.');
    } finally {
      setFeaturedImageUploading(false);
    }
  };

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFeaturedImageUpload(e.target.files[0]);
    }
  };

  const fontFamilies = [
    { name: 'Default', value: 'Inter' },
    { name: 'Serif', value: 'Georgia' },
    { name: 'Mono', value: 'monospace' },
    { name: 'Comic', value: 'Comic Sans MS' },
  ];

  const colors = [
    '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff',
    '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff',
  ];

  const EditorToolbar = () => {
    if (!editor) return null;

    const applyFormatting = (callback: () => void) => {
      if (editor.state.selection.empty) {
        // If no text is selected, toggle the format for future typing
        callback();
      } else {
        // If text is selected, apply the format to the selection
        editor.chain().focus().run();
        callback();
      }
    };

    return (
      <div className="border border-border rounded-lg p-2 mb-4 flex flex-wrap gap-2">
        <Button
          variant={editor.isActive('bold') ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => applyFormatting(() => editor.chain().focus().toggleBold().run())}
          type="button"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant={editor.isActive('italic') ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => applyFormatting(() => editor.chain().focus().toggleItalic().run())}
          type="button"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant={editor.isActive('underline') ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => applyFormatting(() => editor.chain().focus().toggleUnderline().run())}
          type="button"
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-2" />

        <Button
          variant={editor.isActive('heading', { level: 1 }) ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => {
            if (editor.state.selection.empty) {
              // If no text is selected, insert a new heading node
              editor.chain().focus().insertContent('<h1>New Heading</h1>').run();
            } else {
              // If text is selected, apply the heading to the selection
              editor.chain().focus().toggleHeading({ level: 1 }).run();
            }
          }}
          type="button"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          variant={editor.isActive('heading', { level: 2 }) ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => {
            if (editor.state.selection.empty) {
              // If no text is selected, insert a new heading node
              editor.chain().focus().insertContent('<h2>New Heading</h2>').run();
            } else {
              // If text is selected, apply the heading to the selection
              editor.chain().focus().toggleHeading({ level: 2 }).run();
            }
          }}
          type="button"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          variant={editor.isActive('heading', { level: 3 }) ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => {
            if (editor.state.selection.empty) {
              // If no text is selected, insert a new heading node
              editor.chain().focus().insertContent('<h3>New Heading</h3>').run();
            } else {
              // If text is selected, apply the heading to the selection
              editor.chain().focus().toggleHeading({ level: 3 }).run();
            }
          }}
          type="button"
        >
          <Heading3 className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-2" />

        <Button
          variant={editor.isActive('bulletList') ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => applyFormatting(() => editor.chain().focus().toggleBulletList().run())}
          type="button"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant={editor.isActive('orderedList') ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => applyFormatting(() => editor.chain().focus().toggleOrderedList().run())}
          type="button"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant={editor.isActive('blockquote') ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => applyFormatting(() => editor.chain().focus().toggleBlockquote().run())}
          type="button"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          variant={editor.isActive('codeBlock') ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => applyFormatting(() => editor.chain().focus().toggleCodeBlock().run())}
          type="button"
        >
          <Code className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-2" />

        <Button
          variant={editor.isActive('link') ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => {
            const previousUrl = editor.getAttributes('link').href;
            const url = window.prompt('Enter the URL:', previousUrl);
            if (url === null) {
              return; // Cancelled
            }
            if (url === '') {
              editor.chain().focus().unsetLink().run();
              return;
            }
            editor.chain().focus().setLink({ href: url }).run();
          }}
          type="button"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>

        <label>
          <Button 
            variant="ghost" 
            size="sm" 
            className="cursor-pointer relative" 
            type="button"
            disabled={imageUploading}
          >
            {imageUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ImageIcon className="h-4 w-4" />
            )}
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              onChange={handleFileChange}
              disabled={imageUploading}
            />
          </Button>
        </label>

        <div className="w-px h-6 bg-border mx-2" />
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
              type="button"
            >
              <Type className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2">
            <div className="space-y-1">
              {fontFamilies.map((font) => (
                <Button
                  key={font.value}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  style={{ fontFamily: font.value }}
                  onClick={() => applyFormatting(() => editor.chain().focus().setFontFamily(font.value).run())}
                >
                  {font.name}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
              type="button"
            >
              <Palette className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2">
            <div className="grid grid-cols-10 gap-1">
              {colors.map((color) => (
                <Button
                  key={color}
                  variant="ghost"
                  size="sm"
                  className="w-6 h-6 p-0"
                  style={{ backgroundColor: color }}
                  onClick={() => applyFormatting(() => editor.chain().focus().setColor(color).run())}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" onClick={() => router.push('/admin/dashboard')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold">{isNewPost ? 'Create New Post' : 'Edit Post'}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={post.title || ''}
                  onChange={(e) => setPost(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter post title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={post.author || ''}
                  onChange={(e) => setPost(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Enter author name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Featured Image</Label>
                <div className="flex items-center gap-4">
                  {post.image_url && (
                    <div className="relative h-32 w-48 overflow-hidden rounded-lg border">
                      <img 
                        src={post.image_url} 
                        alt="Featured" 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <label className="relative">
                    <Button 
                      variant="outline" 
                      className="cursor-pointer" 
                      type="button"
                      disabled={featuredImageUploading}
                    >
                      {featuredImageUploading ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Upload className="h-4 w-4 mr-2" />
                      )}
                      Upload Featured Image
                    </Button>
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/*"
                      onChange={handleFeaturedImageChange}
                      disabled={featuredImageUploading}
                    />
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Content</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewMode(previewMode === 'none' ? 'split' : previewMode === 'split' ? 'full' : 'none')}
              >
                {previewMode === 'none' ? (
                  <>
                    <Eye className="h-4 w-4 mr-2" /> Preview
                  </>
                ) : previewMode === 'split' ? (
                  <>
                    <Eye className="h-4 w-4 mr-2" /> Full Preview
                  </>
                ) : (
                  <>
                    <Edit3 className="h-4 w-4 mr-2" /> Edit
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className={`grid ${previewMode === 'split' ? 'grid-cols-2 gap-4' : 'grid-cols-1'}`}>
              {previewMode !== 'full' && (
                <div className="space-y-4">
                  <EditorToolbar />
                  <div className="border rounded-lg min-h-[500px] p-4">
                    <EditorContent editor={editor} />
                  </div>
                </div>
              )}
              {previewMode !== 'none' && (
                <div className={`${previewMode === 'full' ? 'min-h-screen w-full' : ''}`}>
                  <div className={`mx-auto ${previewMode === 'full' ? 'max-w-7xl' : ''} px-4 sm:px-6 lg:px-8`}>
                    {/* Hero Section */}
                    {post.image_url && (
                      <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8">
                        <img 
                          src={post.image_url} 
                          alt={post.title} 
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/75 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
                          <div className="flex items-center text-gray-300">
                            <span>{post.author}</span>
                            <span className="mx-2">•</span>
                            <span>{new Date().toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* If no featured image, show title and author differently */}
                    {!post.image_url && (
                      <div className="py-12 border-b border-gray-200 dark:border-gray-800 mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <span>{post.author}</span>
                          <span className="mx-2">•</span>
                          <span>{new Date().toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                      </div>
                    )}

                    {/* Content Section */}
                    <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
                      <div 
                        className="preview-content [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:text-gray-900 dark:[&>h1]:text-white [&>h1]:mb-4 [&>h1]:mt-8
                          [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-gray-900 dark:[&>h2]:text-white [&>h2]:mb-3 [&>h2]:mt-6
                          [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-gray-900 dark:[&>h3]:text-white [&>h3]:mb-2 [&>h3]:mt-4
                          [&>p]:text-lg [&>p]:leading-relaxed [&>p]:text-gray-600 dark:[&>p]:text-gray-300 [&>p]:mb-6
                          [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:text-gray-600 dark:[&>ul]:text-gray-300
                          [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:text-gray-600 dark:[&>ol]:text-gray-300
                          [&>li]:mb-2
                          [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:my-6 [&>blockquote]:text-gray-700 dark:[&>blockquote]:text-gray-300
                          [&>pre]:bg-gray-900 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:my-6
                          [&>code]:font-mono [&>code]:text-sm [&>code]:bg-gray-100 dark:[&>code]:bg-gray-800 [&>code]:rounded [&>code]:px-1
                          [&>img]:rounded-lg [&>img]:my-6 [&>img]:mx-auto [&>img]:max-w-full [&>img]:h-auto
                          [&>a]:text-primary [&>a]:underline hover:[&>a]:text-primary/80"
                        dangerouslySetInnerHTML={{ __html: post.content || '' }} 
                      />
                    </article>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={post.published}
                  onCheckedChange={(checked) => setPost({ ...post, published: checked })}
                />
                <Label htmlFor="published">Published</Label>
              </div>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Post'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}