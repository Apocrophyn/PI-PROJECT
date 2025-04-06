# Supabase Database Setup for Blog System

This README provides instructions on how to set up your Supabase database for the blog system and test the connection.

## Overview

Your Next.js application is already configured to use Supabase for:
- Authentication (admin login)
- Database (blog posts storage)
- Storage (image uploads)

However, the database tables and storage buckets need to be created in your Supabase project.

## Quick Start

1. **Install dependencies for the test script**:
   ```bash
   npm install dotenv @supabase/supabase-js
   ```

2. **Run the test script** to check your Supabase connection:
   ```bash
   node test-supabase-connection.js
   ```

3. **Set up your database** by following the instructions in `SUPABASE-SETUP.md`

4. **Run the test script again** to verify your setup:
   ```bash
   node test-supabase-connection.js
   ```

5. **Start your Next.js application**:
   ```bash
   pnpm run dev
   ```

## Files Included

- `supabase-setup.sql`: SQL script to create the necessary database tables and policies
- `SUPABASE-SETUP.md`: Detailed step-by-step instructions for setting up Supabase
- `test-supabase-connection.js`: Script to test your Supabase connection and verify table creation

## Database Schema

The blog system uses the following schema:

### Posts Table

| Column     | Type      | Description                       |
|------------|-----------|-----------------------------------|
| id         | UUID      | Primary key, auto-generated       |
| title      | TEXT      | Post title                        |
| content    | TEXT      | Post content (HTML)               |
| author     | TEXT      | Post author name                  |
| created_at | TIMESTAMP | Creation timestamp               |
| updated_at | TIMESTAMP | Last update timestamp            |
| published  | BOOLEAN   | Whether the post is published     |
| image_url  | TEXT      | URL to the post's featured image  |

### Storage

- `images` bucket: Stores blog post images

## Authentication

After setting up your database, you'll need to create an admin user in the Supabase dashboard. This user will be able to log in to the admin dashboard at `/admin/login`.

## Troubleshooting

If you encounter issues:

1. Verify your Supabase credentials in `.env.local`
2. Check that all tables and policies have been created correctly
3. Ensure your admin user has been created in Supabase
4. Look for error messages in the browser console or server logs