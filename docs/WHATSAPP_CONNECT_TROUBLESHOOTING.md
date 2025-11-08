# WhatsApp Connect Button Troubleshooting Guide

## Issue: Clicking "Continue with Facebook" doesn't redirect/connect

### Quick Checks

1. **Check the Debug Panel** (Development Mode Only)
   - Look for the gray debug box above the button
   - Verify all items show ✅ (green checkmarks)
   - If any show ❌, that's your issue

2. **Check Browser Console**
   - Open Developer Tools (F12)
   - Look for error messages
   - Check for "Facebook SDK" related logs

### Common Issues and Solutions

#### 1. SDK Not Loading ❌
**Symptoms:**
- Debug panel shows "SDK Status: ❌ Not Loaded"
- Button shows "Loading SDK..." and stays disabled

**Solutions:**
- Check internet connection
- Check browser console for script loading errors
- Try refreshing the page
- Check if `connect.facebook.net` is blocked by ad blocker or firewall
- Verify HTTPS is enabled (Facebook SDK requires HTTPS)

#### 2. Environment Variables Missing ❌
**Symptoms:**
- Debug panel shows "App ID: ❌ Missing" or "Config ID: ❌ Missing"
- Button is disabled

**Solutions:**
- Check `.env.local` file exists in project root
- Verify these variables are set:
  ```env
  NEXT_PUBLIC_FACEBOOK_APP_ID=your_app_id
  NEXT_PUBLIC_FACEBOOK_LOGIN_CONFIG_ID=your_config_id
  ```
- Restart development server after adding variables:
  ```bash
  # Stop server (Ctrl+C)
  npm run dev
  # or
  pnpm dev
  ```

#### 3. Popup Blocker Preventing Dialog
**Symptoms:**
- Button click works but nothing happens
- Console shows "FB.login called" but no popup appears

**Solutions:**
- Allow popups for your domain
- Check browser popup blocker settings
- Try in incognito/private mode
- Some browsers require user interaction before allowing popups

#### 4. Facebook App Configuration Issues
**Symptoms:**
- SDK loads but login fails
- Error messages about redirect URIs or domains

**Solutions:**
- Verify your domain is added to Facebook App settings:
  - Go to [Facebook App Dashboard](https://developers.facebook.com/apps)
  - Navigate to **Facebook Login for Business** → **Settings**
  - Add your domain to "Allowed domains for the JavaScript SDK"
  - Add redirect URI to "Valid OAuth Redirect URIs"
  
- For localhost development:
  ```
  Allowed domains: localhost
  Redirect URIs: http://localhost:3000/chatbot/[botId]/integration
  ```

#### 5. Configuration ID Not Valid
**Symptoms:**
- Config ID is set but login fails
- Error about invalid configuration

**Solutions:**
- Verify Configuration ID in Facebook App Dashboard:
  - Go to **Facebook Login for Business** → **Configurations**
  - Copy the correct Configuration ID
  - Ensure it's for "WhatsApp Embedded Signup"

### Step-by-Step Debugging

1. **Open Browser Console** (F12 → Console tab)

2. **Click the button** and watch for logs:
   ```
   Launching WhatsApp Signup...
   FB: true/false
   sdkLoaded: true/false
   configId: ...
   appId: ...
   ```

3. **Check for errors:**
   - Red error messages indicate the problem
   - Look for Facebook SDK errors specifically

4. **Verify SDK loaded:**
   - Type `window.FB` in console
   - Should return an object, not `undefined`

5. **Test manually:**
   ```javascript
   // In browser console
   window.FB.login((response) => {
     console.log('Login response:', response);
   }, {
     config_id: 'YOUR_CONFIG_ID',
     response_type: 'code',
     override_default_response_type: true,
     extras: { setup: {} }
   });
   ```

### Environment Variables Checklist

Create/verify `.env.local` file:

```env
# Required
NEXT_PUBLIC_FACEBOOK_APP_ID=your_app_id_here
NEXT_PUBLIC_FACEBOOK_LOGIN_CONFIG_ID=your_config_id_here

# Optional (for onboarding)
FACEBOOK_SYSTEM_TOKEN=your_system_token
FACEBOOK_EXTENDED_CREDIT_LINE_ID=your_credit_line_id
```

**Important:** 
- Variables starting with `NEXT_PUBLIC_` are exposed to the browser
- Restart dev server after changing `.env.local`
- Never commit `.env.local` to git

### Testing Checklist

- [ ] Debug panel shows all ✅ (in development mode)
- [ ] Browser console shows "Facebook SDK initialized successfully"
- [ ] No popup blocker warnings
- [ ] Domain added to Facebook App settings
- [ ] Configuration ID is correct
- [ ] App ID is correct
- [ ] HTTPS enabled (required for production)

### Still Not Working?

1. **Clear browser cache** and reload
2. **Try different browser** (Chrome, Firefox, Safari)
3. **Check Facebook App Status** - ensure app is not in development mode restrictions
4. **Verify user permissions** - you must be admin/developer on the Facebook App
5. **Check Facebook App Review** - some features require app review

### Expected Behavior

When working correctly:
1. Click "Continue with Facebook"
2. Facebook login dialog/popup appears
3. User authenticates with Facebook
4. Embedded Signup flow opens
5. User completes WhatsApp Business setup
6. Success message appears
7. Onboarding completes automatically

### Getting Help

If still having issues:
1. Check browser console for full error messages
2. Check Network tab for failed requests
3. Verify Facebook App Dashboard settings
4. Review [Meta's Embedded Signup Documentation](https://developers.facebook.com/docs/whatsapp/embedded-signup)

