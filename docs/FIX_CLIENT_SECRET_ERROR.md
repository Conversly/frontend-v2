# Fix: "Error validating client secret" - Step by Step Guide

## Problem
You're getting this error:
```
Error validating client secret.
type: OAuthException
code: 1
```

This means your `FACEBOOK_APP_SECRET` environment variable is either missing, incorrect, or has formatting issues.

## Solution

### Step 1: Get Your App Secret from Facebook

1. **Go to your Facebook App Dashboard:**
   ```
   https://developers.facebook.com/apps/1158409335748796/settings/basic/
   ```
   (Replace `1158409335748796` with your actual App ID)

2. **Find the "App Secret" section**
   - Scroll down to find "App Secret"
   - Click the **"Show"** button
   - Copy the entire secret (it's a long alphanumeric string)

### Step 2: Update Your .env.local File

1. **Open your `.env.local` file** in the project root:
   ```
   /Users/raghvendradhakar/Desktop/code/conversly/frontend-v2/.env.local
   ```

2. **Find or add this line:**
   ```env
   FACEBOOK_APP_SECRET=your_app_secret_here
   ```

3. **Replace `your_app_secret_here` with your actual App Secret:**
   ```env
   FACEBOOK_APP_SECRET=ca182526961db7f27b510deb0e15c857
   ```
   ⚠️ **Important:** 
   - No spaces before or after the `=`
   - No quotes around the value
   - Copy the exact value from Facebook (case-sensitive)
   - No trailing spaces

### Step 3: Verify Your .env.local File

Your `.env.local` should look like this:

```env
# Facebook App Credentials
FACEBOOK_APP_ID=1158409335748796
FACEBOOK_APP_SECRET=ca182526961db7f27b510deb0e15c857
NEXT_PUBLIC_FACEBOOK_APP_ID=1158409335748796
NEXT_PUBLIC_FACEBOOK_LOGIN_CONFIG_ID=786308124216853

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 4: Restart Your Development Server

**This is critical!** Environment variables are only loaded when the server starts.

1. **Stop your current server:**
   - Press `Ctrl+C` in your terminal

2. **Start it again:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

### Step 5: Test Again

1. Navigate to: `http://localhost:3000/chatbot/8/integration`
2. Click "Continue with Facebook"
3. Complete the flow
4. Check if the error is resolved

## Common Mistakes to Avoid

❌ **Wrong:**
```env
FACEBOOK_APP_SECRET = ca182526961db7f27b510deb0e15c857  # Space before =
FACEBOOK_APP_SECRET="ca182526961db7f27b510deb0e15c857"   # Quotes
FACEBOOK_APP_SECRET=ca182526961db7f27b510deb0e15c857      # Trailing space
```

✅ **Correct:**
```env
FACEBOOK_APP_SECRET=ca182526961db7f27b510deb0e15c857
```

## Verify It's Working

After restarting, check your server logs. You should see:
```
✓ Compiled successfully
```

And when you click the button, you should **NOT** see:
```
Error validating client secret
```

Instead, you should see:
```
Exchanging code for token...
Long-lived token obtained successfully
WhatsApp configuration saved successfully
```

## If Still Not Working

1. **Double-check the App Secret:**
   - Go back to Facebook Dashboard
   - Click "Show" again
   - Copy it fresh (don't use an old copy)

2. **Check for hidden characters:**
   - Open `.env.local` in a text editor
   - Make sure there are no invisible characters
   - Try deleting the line and retyping it

3. **Verify App ID matches:**
   - Your `FACEBOOK_APP_ID` should match the App ID in the URL
   - Example: If URL is `/apps/1158409335748796/`, then `FACEBOOK_APP_ID=1158409335748796`

4. **Check if App Secret was reset:**
   - If you reset your App Secret in Facebook Dashboard, you MUST update `.env.local`
   - Old secrets become invalid immediately

5. **Try regenerating App Secret:**
   - In Facebook Dashboard → Settings → Basic
   - Click "Reset" next to App Secret
   - Copy the new secret
   - Update `.env.local`
   - Restart server

## Security Note

⚠️ **Never commit `.env.local` to git!**

Make sure `.env.local` is in your `.gitignore`:
```gitignore
# Environment variables
.env.local
.env*.local
```

## Need More Help?

If you're still having issues:
1. Check browser console for full error messages
2. Check server logs for detailed errors
3. Verify you're using the correct App ID and App Secret pair
4. Ensure your Facebook App is not in "Development Mode" restrictions (if testing with non-admin users)

