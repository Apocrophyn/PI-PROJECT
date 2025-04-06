import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Create a single supabase client for interacting with your database
export const supabase = createClientComponentClient();

// Types for our blog posts
export type BlogPost = {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
  published: boolean;
  image_url?: string;
};