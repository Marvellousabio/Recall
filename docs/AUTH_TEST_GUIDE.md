# Quick Authentication Test Guide

## Test Steps

### 1. Test Admin Login
1. Navigate to the app
2. Go to `/signin`
3. Enter credentials:
   - Username: `admin`
   - Password: `Adm!n2026#Recall$`
4. Click "Sign In"
5. Should redirect to `/dashboard`
6. Should see admin navigation options

### 2. Test New User Sign Up
1. Go to `/signup`
2. Enter:
   - Username: `testuser` (or any unique username)
   - Password: `TestPass123!`
   - Confirm Password: `TestPass123!`
3. Check "I agree to the Terms of Service and Privacy Policy"
4. Click "Create Account"
5. Should automatically sign in and redirect to `/dashboard`

### 3. Test Sign Out and Sign In
1. From dashboard, click user menu
2. Click "Sign Out"
3. Should redirect to home page
4. Go to `/signin`
5. Enter the username and password you just created
6. Should sign in successfully

### 4. Test Protected Route Access
1. Sign out if signed in
2. Try to access `/dashboard` directly
3. Should redirect to `/signin`
4. After signing in, should redirect back to `/dashboard`

### 5. Use Debug Page
1. Go to `/auth-debug`
2. Check all status indicators are green
3. Click "Test Sign Up" - should create a new user
4. Click "Test Sign In" - should sign in as admin
5. Check browser console for detailed logs

## Expected Behavior

### Successful Sign Up
- ✅ Toast: "Account created successfully!"
- ✅ Redirects to `/dashboard`
- ✅ User menu shows username
- ✅ Can access all dashboard pages

### Successful Sign In
- ✅ Toast: "Signed in successfully!"
- ✅ Redirects to `/dashboard` or previous page
- ✅ User menu shows username
- ✅ Can access all dashboard pages

### Failed Authentication
- ❌ Toast shows error message
- ❌ Stays on sign in/sign up page
- ❌ Form remains enabled for retry

### Protected Route Access (Not Signed In)
- ❌ Redirects to `/signin`
- ✅ After sign in, redirects back to original page

## Browser Console Logs

### On Page Load
```
Supabase client initialized with URL: https://nsyzbhfnlcnbubqwbdgr.supabase.co
AuthContext: Initializing...
AuthContext: Initial session: Found (or None)
AuthContext: Profile loaded: {...} (if session exists)
AuthContext: Initialization complete
```

### On Sign In
```
Attempting sign in with email: username@miaoda.com
Sign in successful: {...}
AuthContext: Auth state changed: SIGNED_IN Session exists
AuthContext: Profile updated: {...}
```

### On Sign Up
```
Attempting sign up with email: username@miaoda.com
Sign up successful: {...}
AuthContext: Auth state changed: SIGNED_IN Session exists
AuthContext: Profile updated: {...}
```

## Common Issues and Solutions

### Issue: "Missing Supabase environment variables"
**Solution:** Check `.env` file exists and contains VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

### Issue: Redirects to `/signin` immediately after sign up
**Solution:** Email verification might be enabled. Run: `supabase_verification(email=false)`

### Issue: "Invalid login credentials"
**Solution:** 
- Check username is correct (no spaces, special characters except underscore)
- Check password is correct
- Try admin account to verify system is working

### Issue: Can't access dashboard after sign in
**Solution:**
- Check browser console for errors
- Visit `/auth-debug` to check auth state
- Verify session exists in console logs

### Issue: Profile not found
**Solution:**
- Check `handle_new_user` trigger exists in database
- Check profiles table has correct structure
- Try creating a new user to test trigger

## Database Verification

### Check if user exists:
```sql
SELECT id, email, email_confirmed_at, created_at
FROM auth.users
WHERE email = 'username@miaoda.com';
```

### Check if profile exists:
```sql
SELECT id, username, email, role, created_at
FROM profiles
WHERE username = 'username';
```

### Check trigger exists:
```sql
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';
```

## Test Script

Run the automated test script:
```bash
cd /workspace/app-ble4yjujkqv5
npx tsx scripts/test-auth.ts
```

This will:
1. Create a new test user
2. Verify profile creation
3. Test sign out
4. Test sign in
5. Test admin account

All tests should pass with ✅ marks.
