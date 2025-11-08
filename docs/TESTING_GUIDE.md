# WhatsApp Embedded Signup - Testing Guide

## 🚀 Quick Start (5 Minutes)

### Step 1: Configure Facebook App (One-time Setup)
**URL:** https://developers.facebook.com/apps/1158409335748796/fb-login/settings/

#### A. Client OAuth Settings
Set ALL to **Yes**:
- [x] Client OAuth Login → **Yes**
- [x] Web OAuth Login → **Yes**  
- [x] Force Web OAuth Reauthentication → **Yes**
- [x] Enforce HTTPS → **Yes**
- [x] Embedded Browser OAuth Login → **Yes**
- [x] Use Strict Mode for Redirect URIs → **Yes**

#### B. Allowed Domains for JavaScript SDK
Add this domain:
```
localhost
```

#### C. Valid OAuth Redirect URIs
Add these URIs (replace `[botId]` with your actual bot ID):
```
http://localhost:3000/chatbot/[botId]/integration
https://localhost:3000/chatbot/[botId]/integration
```

Example if your bot ID is `123`:
```
http://localhost:3000/chatbot/123/integration
https://localhost:3000/chatbot/123/integration
```

#### D. Save Changes
Click **"Save Changes"** button at the bottom

---

### Step 2: Verify Environment Variables
Check your `.env` file has these values:

```env
FACEBOOK_APP_ID=1158409335748796
NEXT_PUBLIC_FACEBOOK_APP_ID=1158409335748796
FACEBOOK_APP_SECRET=ca182526961db7f27b510deb0e15c857
NEXT_PUBLIC_FACEBOOK_LOGIN_CONFIG_ID=786308124216853
FACEBOOK_BUSINESS_ID=1046753094175139
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

✅ **Status:** All configured correctly!

---

### Step 3: Start Development Server

```bash
# Navigate to project directory
cd /Users/raghvendradhakar/Desktop/code/conversly/frontend-v2

# Start the server
npm run dev

# Expected output:
# ▲ Next.js 14.x.x
# - Local:        http://localhost:3000
```

**Wait for:** "Ready in X ms" message

---

### Step 4: Open Integration Page

**URL Format:**
```
http://localhost:3000/chatbot/[YOUR_BOT_ID]/integration
```

**Example:**
```
http://localhost:3000/chatbot/abc123/integration
```

Replace `[YOUR_BOT_ID]` with your actual chatbot ID.

---

### Step 5: Open Browser Console

**Chrome/Edge:**
- Press `F12` or `Cmd+Option+I` (Mac)
- Click **"Console"** tab

**Firefox:**
- Press `F12` or `Cmd+Option+K` (Mac)
- Click **"Console"** tab

**Safari:**
- Enable Developer menu: Safari > Preferences > Advanced > Show Develop menu
- Press `Cmd+Option+C`

---

### Step 6: Click "Continue with Facebook"

1. Find the **"Continue with Facebook"** button
2. Click it
3. Facebook login popup will appear

---

### Step 7: Complete Embedded Signup

#### A. Facebook Login
- Enter your Facebook credentials
- Click **"Continue"** or **"Log In"**

#### B. WhatsApp Business Setup
Follow the on-screen prompts:
1. **Business Information** - Enter your business details
2. **Phone Number** - Verify your business phone number
3. **Display Name** - Choose your WhatsApp business name
4. **Category** - Select your business category
5. **Review** - Review and confirm

#### C. Permissions
- Click **"Allow"** or **"Authorize"** when prompted

---

### Step 8: Watch Console Output

#### Expected Console Messages:

**1. SDK Initialization:**
```javascript
Facebook SDK initialized
```

**2. Message Event (Asset IDs):**
```javascript
message event: {
  type: 'WA_EMBEDDED_SIGNUP',
  event: 'FINISH',
  data: {
    phone_number_id: '106540352242922',
    waba_id: '524126980791429',
    business_id: '2729063490586005'
  }
}
```

**3. Response (Auth Code):**
```javascript
response: AQD7xK9J... (auth code string)
```

**4. Success Notification:**
You should see a green toast notification:
```
✅ WhatsApp connected successfully!
```

---

## ✅ Success Indicators

### Visual Indicators:
- ✅ Green success toast appears
- ✅ Integration status changes to "Connected"
- ✅ WhatsApp credentials displayed on page

### Console Indicators:
- ✅ `Facebook SDK initialized`
- ✅ `message event:` with `event: 'FINISH'`
- ✅ `response:` with auth code
- ✅ No error messages in red

---

## ❌ Troubleshooting

### Problem: "Facebook SDK not loaded"
**Solution:**
- Refresh the page
- Check internet connection
- Verify facebook.com is accessible
- Clear browser cache

### Problem: "Facebook configuration not set"
**Solution:**
- Verify `.env` file has `NEXT_PUBLIC_FACEBOOK_LOGIN_CONFIG_ID=786308124216853`
- Restart development server: `Ctrl+C` then `npm run dev`

### Problem: OAuth Redirect URI Mismatch
**Error:** "Can't Load URL: The domain of this URL isn't included in the app's domains"

**Solution:**
1. Go to: https://developers.facebook.com/apps/1158409335748796/fb-login/settings/
2. Check **"Allowed Domains for JavaScript SDK"** includes `localhost`
3. Check **"Valid OAuth Redirect URIs"** includes your exact URL
4. Make sure to include `http://` prefix
5. Click **"Save Changes"**

### Problem: "Failed to complete setup"
**Solution:**
- Check browser console for detailed error
- Verify App Secret in `.env` is correct
- Ensure code exchange happens within 30 seconds
- Check server logs for API errors

### Problem: Message Event with "CANCEL"
**Meaning:** User cancelled or error occurred

**Check:**
```javascript
// If current_step is present
message event: {
  event: 'CANCEL',
  data: { current_step: 'PHONE_NUMBER_SETUP' }
}
// User abandoned at that step

// If error_message is present
message event: {
  event: 'CANCEL',
  data: {
    error_message: 'Error description',
    error_id: '524126',
    session_id: 'f34b51dab5e0498',
    timestamp: '1746041036'
  }
}
// An error occurred - contact support with error_id and session_id
```

---

## 🧪 Advanced Testing

### Test Abandonment Flow
1. Click "Continue with Facebook"
2. Start Embedded Signup
3. Click "Cancel" or close popup
4. Check console for:
```javascript
message event: {
  type: 'WA_EMBEDDED_SIGNUP',
  event: 'CANCEL',
  data: { current_step: '...' }
}
```

### Test Different Scenarios
- ✅ Complete full signup (FINISH)
- ✅ Complete without phone number (FINISH_ONLY_WABA)
- ✅ Cancel at different steps (CANCEL with current_step)
- ✅ Test with different Facebook accounts

---

## 📋 Testing Checklist

Before marking as complete:

- [ ] Facebook app OAuth settings configured (6 settings to Yes)
- [ ] Localhost added to Allowed Domains
- [ ] Redirect URIs added and saved
- [ ] Environment variables verified in `.env`
- [ ] Development server started successfully
- [ ] Integration page loads without errors
- [ ] Browser console open and visible
- [ ] "Continue with Facebook" button clicked
- [ ] Facebook login completed
- [ ] Embedded Signup flow completed
- [ ] Console shows "Facebook SDK initialized"
- [ ] Console shows `message event:` with asset IDs
- [ ] Console shows `response:` with auth code
- [ ] Green success toast notification appears
- [ ] No red errors in console
- [ ] WhatsApp credentials visible on page

---

## 📞 Support

### If You Get Stuck:

1. **Check Console First**
   - Look for red error messages
   - Copy full error text

2. **Verify Configuration**
   - Double-check all environment variables
   - Verify Facebook app settings

3. **Check Network Tab**
   - Open Network tab in browser DevTools
   - Look for failed requests (red)
   - Check response details

4. **Common Issues**
   - Most issues are OAuth redirect URI mismatches
   - Second most common: Environment variables not loaded
   - Third: App Secret incorrect

### Still Having Issues?

Include this information:
- Console error messages (full text)
- Network tab errors (screenshot)
- Which step failed (1-8)
- Browser and version
- Environment variables (hide sensitive values)

---

## 🎉 Next Steps After Successful Test

Once you see success:

1. **Store Credentials**
   - Save `waba_id`, `phone_number_id`, `business_id` to database
   - Encrypt and store `access_token` securely

2. **Set Up Webhooks**
   - Configure webhook URL in Meta app
   - Implement webhook verification
   - Handle incoming message events

3. **Implement Message Sending**
   - Use WhatsApp Cloud API
   - Send template messages
   - Handle message delivery receipts

4. **Token Management**
   - Implement token refresh (60-day expiry)
   - Monitor token expiration
   - Handle token refresh failures

5. **Production Preparation**
   - Remove console.log statements
   - Update domain to production URL
   - Configure production Facebook app settings
   - Set up monitoring and alerts

---

**Last Updated:** November 8, 2024  
**Estimated Time:** 5-10 minutes for first-time setup  
**Difficulty:** Beginner-Friendly 🟢
