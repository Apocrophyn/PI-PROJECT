'use client';

import { Suspense } from 'react';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { BlogCTA } from '@/components/ui/blog-cta';

function BlogContent({ id }: { id: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  const fetchPost = async (postId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .eq('published', true)
        .single();

      if (error) throw error;
      if (data) {
        // Process content to ensure proper formatting for TipTap output
        let processedContent = data.content;
        
        // Ensure proper heading styles
        processedContent = processedContent
          .replace(/<h1/g, '<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4 mt-8"')
          .replace(/<h2/g, '<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-3 mt-6"')
          .replace(/<h3/g, '<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2 mt-4"');
        
        // Ensure paragraphs have proper spacing
        processedContent = processedContent
          .replace(/<p>/g, '<p class="mb-4 text-gray-600 dark:text-gray-300">');
        
        // Ensure lists have proper spacing
        processedContent = processedContent
          .replace(/<ul>/g, '<ul class="list-disc pl-6 mb-4">')
          .replace(/<ol>/g, '<ol class="list-decimal pl-6 mb-4">')
          .replace(/<li>/g, '<li class="mb-1">');
        
        // Ensure blockquotes have proper styling
        processedContent = processedContent
          .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-primary pl-4 italic my-4">');
        
        // Ensure code blocks have proper styling
        processedContent = processedContent
          .replace(/<pre>/g, '<pre class="bg-gray-800 p-4 rounded-lg overflow-x-auto my-4">')
          .replace(/<code>/g, '<code class="font-mono text-sm">');

        setPost({
          ...data,
          content: processedContent
        });
      } else {
        setError('Post not found');
      }
    } catch (error: any) {
      console.error('Error fetching post:', error);
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">{error || 'Post not found'}</h1>
        <Button onClick={() => router.push('/blog')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="outline"
            className="mb-8"
            onClick={() => router.push('/blog')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <span>{formatDate(post.created_at)}</span>
              <span className="mx-2">•</span>
              <span>{post.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
          </div>
        </div>
      </section>
      
      {/* CTA Component */}
      <BlogCTA />
    </div>
  );
}

type PageParams = { id: string };

export default function BlogPostPage({ params }: { params: Promise<PageParams> }) {
  const resolvedParams = use(params);
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <BlogContent id={resolvedParams.id} />
    </Suspense>
  );
} 