const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load env
const envPath = path.join(__dirname, '..', '.env');
let envContent = '';
try {
    envContent = fs.readFileSync(envPath, 'utf8');
} catch (e) {
    console.error('Could not read .env file');
    process.exit(1);
}

const env = {};
envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
        const key = parts[0].trim();
        const val = parts.slice(1).join('=').trim().replace(/^"|"$/g, '');
        env[key] = val;
    }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function signUp() {
    const email = 'khannayash394@gmail.com';
    const password = 'ChangeMe123!';

    console.log(`Attempting to sign up user: ${email}`);

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.error('Error signing up:', error.message);
    } else {
        console.log('Sign up successful!');
        if (data.user && data.user.identities && data.user.identities.length === 0) {
            console.log('User already exists');
        } else {
            console.log('User ID:', data.user ? data.user.id : 'unknown');
        }

        if (data.session) {
            console.log('Session created (Auto-confirm is on). You can now login.');
        } else if (data.user && !data.session) {
            console.log('Check your email for the confirmation link. If you are developing locally, check the Inbucket/Supabase logs.');
        }
    }
}

signUp();
