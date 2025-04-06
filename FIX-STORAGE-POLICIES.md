# Fixing Supabase Storage Bucket Policies

If you're encountering the error `StorageApiError: new row violates row-level security policy` when trying to upload images, you need to fix the storage bucket policies in your Supabase project.

## Option 1: Using the Supabase Dashboard

1. Go to your [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Navigate to **Storage** in the left sidebar
4. Click on the **images** bucket (or create it if it doesn't exist)
5. Go to the **Policies** tab
6. Click **New Policy**
7. Create the following policies:

### Policy for Authenticated Users to Upload Images

- **Policy name**: `Authenticated users can upload images`
- **Target roles**: `authenticated`
- **Using expression**: `bucket_id = 'images'`
- **Policy definition**: Allow INSERT

### Policy for Authenticated Users to Update Images

- **Policy name**: `Authenticated users can update their own images`
- **Target roles**: `authenticated`
- **Using expression**: `bucket_id = 'images'`
- **Policy definition**: Allow UPDATE

### Policy for Authenticated Users to Delete Images

- **Policy name**: `Authenticated users can delete their own images`
- **Target roles**: `authenticated`
- **Using expression**: `bucket_id = 'images'`
- **Policy definition**: Allow DELETE

### Policy for Public Access to View Images

- **Policy name**: `Public access to images`
- **Target roles**: `public`
- **Using expression**: `bucket_id = 'images'`
- **Policy definition**: Allow SELECT

## Option 2: Using the SQL Editor

1. Go to your [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Navigate to **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste the contents of the `fix-storage-policies.sql` file
6. Click **Run** to execute the SQL commands

## Verifying the Fix

After applying the policies, try uploading an image again. The error should be resolved, and you should be able to upload images successfully.

If you're still encountering issues, make sure:

1. You're properly authenticated (logged in)
2. The bucket exists and is named `images`
3. The policies have been applied correctly
4. Your Supabase client is properly configured with the correct URL and API key 