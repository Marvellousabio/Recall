import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables from .env file
const envPath = path.join(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars: Record<string, string> = {};

envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim();
    envVars[key] = value;
  }
});

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseAnonKey = envVars.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAuth() {
  console.log('=== Testing Authentication Flow ===\n');

  // Test 1: Sign up a new user
  const testUsername = `testuser_${Date.now()}`;
  const testPassword = 'TestPass123!';
  const testEmail = `${testUsername}@miaoda.com`;

  console.log('Test 1: Sign Up');
  console.log(`Username: ${testUsername}`);
  console.log(`Email: ${testEmail}`);

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: testEmail,
    password: testPassword,
    options: {
      data: {
        username: testUsername
      }
    }
  });

  if (signUpError) {
    console.error('❌ Sign up failed:', signUpError.message);
    return;
  }

  console.log('✅ Sign up successful');
  console.log('User ID:', signUpData.user?.id);
  console.log('Session exists:', !!signUpData.session);
  console.log('Email confirmed:', signUpData.user?.email_confirmed_at ? 'Yes' : 'No');

  if (!signUpData.session) {
    console.log('⚠️  No session created - email confirmation may be required');
    return;
  }

  // Test 2: Check if profile was created
  console.log('\nTest 2: Check Profile Creation');
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', signUpData.user?.id)
    .maybeSingle();

  if (profileError) {
    console.error('❌ Profile check failed:', profileError.message);
  } else if (!profileData) {
    console.error('❌ Profile not found');
  } else {
    console.log('✅ Profile created successfully');
    console.log('Profile:', profileData);
  }

  // Test 3: Sign out
  console.log('\nTest 3: Sign Out');
  const { error: signOutError } = await supabase.auth.signOut();
  if (signOutError) {
    console.error('❌ Sign out failed:', signOutError.message);
  } else {
    console.log('✅ Sign out successful');
  }

  // Test 4: Sign in with the same credentials
  console.log('\nTest 4: Sign In');
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: testEmail,
    password: testPassword,
  });

  if (signInError) {
    console.error('❌ Sign in failed:', signInError.message);
    return;
  }

  console.log('✅ Sign in successful');
  console.log('User ID:', signInData.user?.id);
  console.log('Session exists:', !!signInData.session);

  // Test 5: Test with admin account
  console.log('\nTest 5: Admin Account Sign In');
  const { data: adminData, error: adminError } = await supabase.auth.signInWithPassword({
    email: 'admin@miaoda.com',
    password: 'Adm!n2026#Recall$',
  });

  if (adminError) {
    console.error('❌ Admin sign in failed:', adminError.message);
  } else {
    console.log('✅ Admin sign in successful');
    console.log('Admin User ID:', adminData.user?.id);
    
    // Check admin profile
    const { data: adminProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', adminData.user?.id)
      .maybeSingle();
    
    console.log('Admin Profile:', adminProfile);
  }

  console.log('\n=== Tests Complete ===');
}

testAuth().catch(console.error);
