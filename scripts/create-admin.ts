import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const envPath = path.join(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars: Record<string, string> = {};

envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const SUPABASE_URL = envVars.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = envVars.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const adminUsername = 'admin';
const adminPassword = 'Adm!n2026#Recall$';
const adminEmail = `${adminUsername}@miaoda.com`;

async function createAdmin() {
  try {
    console.log('Creating admin account...');
    
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: adminEmail,
      password: adminPassword,
      options: {
        data: {
          username: adminUsername
        }
      }
    });

    if (signUpError && signUpError.message !== 'User already registered') {
      console.error('Error creating admin user:', signUpError);
      return;
    }

    let userId = authData?.user?.id;

    if (!userId) {
      console.log('User already exists, fetching user ID...');
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', adminUsername)
        .single();
      
      userId = profiles?.id;
    }

    if (!userId) {
      console.error('Could not determine user ID');
      return;
    }

    console.log('Updating admin role...');

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', userId);

    if (updateError) {
      console.error('Error updating admin role:', updateError);
      return;
    }

    console.log('✅ Admin account created successfully!');
    console.log('Username:', adminUsername);
    console.log('Password:', adminPassword);
    console.log('Email:', adminEmail);
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

createAdmin();
