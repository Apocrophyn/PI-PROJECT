'use client';

import { useState, useEffect } from 'react';
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/lib/supabase';
import { useSearchParams, useRouter } from 'next/navigation';

// Number of posts per page
const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get page from URL or default to 1
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;

  useEffect(() => {
    setCurrentPage(page);
    fetchPosts(page);
  }, [page]);

  const fetchPosts = async (page: number) => {
    try {
      setLoading(true);
      
      // Calculate range for pagination
      const from = (page - 1) * POSTS_PER_PAGE;
      const to = from + POSTS_PER_PAGE - 1;
      
      // Get total count of published posts
      const { count, error: countError } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })
        .eq('published', true);
        
      if (countError) throw countError;
      
      // Set total posts and calculate total pages
      setTotalPosts(count || 0);
      setTotalPages(Math.ceil((count || 0) / POSTS_PER_PAGE));
      
      // Fetch paginated posts
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      console.error('Error fetching posts:', error);
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Function to create excerpt from HTML content
  const createExcerpt = (htmlContent: string, maxLength: number = 150) => {
    // Remove HTML tags
    const textContent = htmlContent.replace(/<[^>]+>/g, '');
    // Trim and limit length
    return textContent.length > maxLength 
      ? `${textContent.substring(0, maxLength)}...` 
      : textContent;
  };

  // Function to handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    
    // Update URL with new page number
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/blog?${params.toString()}`);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    // Always show first page
    pageNumbers.push(1);
    
    // Calculate start and end of visible page numbers
    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3);
    
    // Adjust if we're near the end
    if (endPage - startPage < maxVisiblePages - 3) {
      startPage = Math.max(2, endPage - (maxVisiblePages - 3));
    }
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pageNumbers.push('...');
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push('...');
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Our Blog
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              Latest Articles
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Stay updated with our latest insights, tips, and educational resources.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      {loading ? (
        <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-800/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Loading blog posts...</p>
          </div>
        </section>
      ) : error ? (
        <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-800/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-red-500">{error}</p>
            <Button onClick={() => fetchPosts(currentPage)} className="mt-4">Try Again</Button>
          </div>
        </section>
      ) : posts.length === 0 ? (
        <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-800/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">No blog posts available yet.</p>
          </div>
        </section>
      ) : (
        <section className="bg-gray-50 py-16 md:py-24 dark:bg-gray-800/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.image_url || `/placeholder.svg?height=300&width=600&text=${encodeURIComponent(post.title)}`}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span>{formatDate(post.created_at)}</span>
                      <span className="mx-2">•</span>
                      <span>{post.author}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{post.title}</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">{createExcerpt(post.content)}</p>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/blog/${post.id}`}>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {getPageNumbers().map((pageNum, index) => (
                  pageNum === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-gray-500">...</span>
                  ) : (
                    <Button
                      key={`page-${pageNum}`}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      onClick={() => handlePageChange(pageNum as number)}
                      className="min-w-[40px]"
                    >
                      {pageNum}
                    </Button>
                  )
                ))}
                
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

