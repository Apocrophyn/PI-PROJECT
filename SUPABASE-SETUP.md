# Supabase Database Setup Guide

This guide will help you set up the necessary database tables and storage in your Supabase project for the blog system.

## Prerequisites

Your Supabase project is already created with the following credentials (found in your `.env.local` file):
- URL: https://jepbowvempjcbtjzxazp.supabase.co
- Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplcGJvd3ZlbXBqY2J0anp4YXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4MTYyNjAsImV4cCI6MjA1OTM5MjI2MH0.S1RJUJncQLJ41sNuZbcYpBM8mMk1PEf4h3bv2P6djMc

## Step 1: Access Your Supabase Dashboard

1. Go to [https://supabase.com](https://supabase.com) and sign in to your account
2. Select your project from the dashboard

## Step 2: Create the Posts Table

1. In the Supabase dashboard, navigate to the **Table Editor** in the left sidebar
2. Click **Create a new table**
3. Set the following table configuration:
   - **Name**: `posts`
   - **Enable Row Level Security (RLS)**: Check this box
   - **Columns**:
     - `id` (type: `uuid`, Primary Key, Default: `uuid_generate_v4()`)
     - `title` (type: `text`, not nullable)
     - `content` (type: `text`, not nullable)
     - `author` (type: `text`, not nullable)
     - `created_at` (type: `timestamptz`, Default: `now()`)
     - `updated_at` (type: `timestamptz`, Default: `now()`)
     - `published` (type: `boolean`, Default: `false`)
     - `image_url` (type: `text`, nullable)
4. Click **Save** to create the table

## Step 3: Set Up Row Level Security (RLS) Policies

1. Navigate to the **Authentication** section in the left sidebar
2. Click on **Policies**
3. Find the `posts` table and click **New Policy**
4. Create the following policies:

### Policy for Authenticated Users (Admin)

1. Click **Create a policy from scratch**
2. Policy settings:
   - **Policy name**: `Authenticated users can manage posts`
   - **Target roles**: `authenticated`
   - **Using expression**: `true`
   - **Check expression**: `true`
   - **Policy definition**: Allow all operations (SELECT, INSERT, UPDATE, DELETE)
3. Click **Save Policy**

### Policy for Public Users

1. Click **Create a policy from scratch**
2. Policy settings:
   - **Policy name**: `Public users can view published posts`
   - **Target roles**: `public`
   - **Using expression**: `published = true`
   - **Policy definition**: Allow SELECT only
3. Click **Save Policy**

## Step 4: Create Storage Bucket for Images

1. Navigate to the **Storage** section in the left sidebar
2. Click **Create a new bucket**
3. Set the bucket name to `images`
4. Enable public access by checking **Public bucket**
5. Click **Create bucket**

## Step 5: Set Up Storage Policies

1. In the Storage section, click on the `images` bucket
2. Go to the **Policies** tab
3. Create the following policies:

### Policy for Authenticated Users to Upload Images

1. Click **Create a policy from scratch**
2. Policy settings:
   - **Policy name**: `Authenticated users can upload images`
   - **Target roles**: `authenticated`
   - **Using expression**: `true`
   - **Policy definition**: Allow INSERT
3. Click **Save Policy**

### Policy for Public Access to View Images

1. Click **Create a policy from scratch**
2. Policy settings:
   - **Policy name**: `Public access to images`
   - **Target roles**: `public`
   - **Using expression**: `true`
   - **Policy definition**: Allow SELECT only
3. Click **Save Policy**

## Step 6: Create an Admin User

1. Navigate to the **Authentication** section in the left sidebar
2. Click on **Users**
3. Click **Invite user**
4. Enter your email address and click **Invite**
5. Check your email for the invitation and set your password

## Step 7: Test Your Setup

1. Return to your Next.js application
2. Navigate to `/admin/login` and sign in with your admin credentials
3. Create a new blog post in the admin dashboard
4. Visit the blog page to see your published posts

## Alternative: Using SQL Script

If you prefer, you can also set up your database using the SQL script provided in the `supabase-setup.sql` file. To use this script:

1. In the Supabase dashboard, navigate to the **SQL Editor** in the left sidebar
2. Click **New query**
3. Copy and paste the contents of the `supabase-setup.sql` file
4. Click **Run** to execute the SQL commands

## Troubleshooting

If you encounter any issues:

1. Check that your Supabase URL and Anon Key in `.env.local` match your project
2. Verify that all tables and policies have been created correctly
3. Check the browser console for any error messages
4. Ensure your admin user has been created and can log in successfully