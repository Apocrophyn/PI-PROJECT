// Script to test Supabase connection and check if tables exist

const { createClient } = require('@supabase/supabase-js');

// Get Supabase credentials from environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase credentials not found in .env.local file');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Testing Supabase connection...');
  console.log(`URL: ${supabaseUrl}`);
  
  try {
    // Test authentication
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      throw authError;
    }
    
    console.log('✅ Supabase connection successful');
    
    // Check if posts table exists
    const { data, error } = await supabase
      .from('posts')
      .select('count')
      .limit(1);
    
    if (error) {
      if (error.code === '42P01') { // Table doesn't exist
        console.log('❌ Posts table not found. Please run the database setup script.');
      } else {
        throw error;
      }
    } else {
      console.log('✅ Posts table exists');
      console.log(`Number of posts: ${data.length > 0 ? data[0].count : 0}`);
    }
    
    // Check if storage bucket exists
    const { data: bucketData, error: bucketError } = await supabase
      .storage
      .getBucket('images');
    
    if (bucketError) {
      console.log('❌ Images storage bucket not found. Please run the database setup script.');
    } else {
      console.log('✅ Images storage bucket exists');
    }
    
  } catch (error) {
    console.error('Error testing Supabase connection:', error.message);
  }
}

testConnection();