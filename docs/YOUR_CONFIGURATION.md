# 🎯 Your WhatsApp Integration Configuration

## Your Credentials

```
App ID:           1158409335748796
Configuration ID: 786308124216853
Business ID:      1046753094175139
```

## Quick Links

### Facebook App Dashboard
```
https://developers.facebook.com/apps/1158409335748796
```

### Configuration Settings
1. **App Settings:**
   ```
   https://developers.facebook.com/apps/1158409335748796/settings/basic/
   ```

2. **Facebook Login for Business:**
   ```
   https://developers.facebook.com/apps/1158409335748796/fb-login/
   ```

3. **Your Configuration:**
   ```
   Facebook Login for Business > Configurations
   Configuration ID: 786308124216853
   ```

## ⚡ Quick Start

### 1. Get Your App Secret
Visit: https://developers.facebook.com/apps/1158409335748796/settings/basic/

1. Scroll to "App Secret"
2. Click "Show"
3. Copy the secret
4. Paste it in `.env.local` file

### 2. Update .env.local
Open `/Users/raghvendradhakar/Desktop/code/conversly/frontend-v2/.env.local`

Replace this line:
```env
FACEBOOK_APP_SECRET=your_app_secret_here_replace_this
```

With:
```env
FACEBOOK_APP_SECRET=your_actual_secret_here
```

### 3. Verify Domain Settings

**Location:** Facebook Login for Business > Settings

**Add these domains:**

**Allowed domains for the JavaScript SDK:**
```
localhost
yourdomain.com
```

**Valid OAuth Redirect URIs:**
```
https://localhost:3000/chatbot/[botId]/integration
https://yourdomain.com/chatbot/[botId]/integration
```

### 4. Enable Required Settings

**Location:** Facebook Login for Business > Settings > Client OAuth Settings

Set all to **Yes**:
- ✅ Client OAuth login
- ✅ Web OAuth login
- ✅ Enforce HTTPS
- ✅ Embedded Browser OAuth Login
- ✅ Use Strict Mode for redirect URIs
- ✅ Login with the JavaScript SDK

### 5. Test Your Integration

```bash
# Start the development server
npm run dev

# Navigate to
http://localhost:3000/chatbot/[botId]/integration

# Click "Continue with Facebook"
# Complete the flow
# Check console for events
```

## 🔍 Debugging

### Check if SDK is loaded
Open browser console and type:
```javascript
window.FB
```
Should return: `Object { init: init(), login: login(), ... }`

### Check Configuration
```javascript
console.log(process.env.NEXT_PUBLIC_FACEBOOK_APP_ID)
// Should show: 1158409335748796

console.log(process.env.NEXT_PUBLIC_FACEBOOK_LOGIN_CONFIG_ID)
// Should show: 786308124216853
```

### Monitor Events
Keep console open while testing. You should see:
```
Embedded Signup Event: { type: "WA_EMBEDDED_SIGNUP", event: "FINISH", data: {...} }
Auth Code: AQD...
```

## 📋 Checklist

### Pre-Setup
- [ ] You are a Solution Partner or Tech Provider
- [ ] You have a line of credit (if Solution Partner)
- [ ] Your domain has SSL certificate
- [ ] Webhooks are set up and subscribed to `account_update`

### Configuration
- [ ] App Secret added to `.env.local`
- [ ] Domains added to Facebook app settings
- [ ] OAuth redirect URIs added
- [ ] Client OAuth settings enabled
- [ ] Configuration ID verified: `786308124216853`

### Testing
- [ ] Development server running
- [ ] Browser console open
- [ ] Clicked "Continue with Facebook"
- [ ] Completed the signup flow
- [ ] Received WABA ID and Phone Number ID
- [ ] Access token exchanged successfully

## 🎯 Expected Flow

1. **User clicks button** → SDK loaded ✓
2. **Modal opens** → Configuration `786308124216853` applied ✓
3. **User completes flow** → Message event received ✓
4. **Receives callback** → Auth code received ✓
5. **Token exchange** → Access token obtained ✓
6. **Save to database** → Configuration saved ✓

## ⚠️ Common Issues

### Issue: "Configuration ID not found"
**Check:** Environment variable is set correctly
```bash
# In terminal
echo $NEXT_PUBLIC_FACEBOOK_LOGIN_CONFIG_ID
# Should show: 786308124216853
```

### Issue: "Invalid OAuth Redirect URI"
**Fix:** Add your exact URL to Facebook app settings:
```
https://localhost:3000/chatbot/YOUR_BOT_ID/integration
```

### Issue: "App ID doesn't match"
**Verify:** Using correct App ID `1158409335748796` in both:
- `.env.local` file
- Facebook app dashboard

### Issue: "No events received"
**Check:**
1. Domain in "Allowed domains"
2. HTTPS enabled (use `https://localhost:3000` in production mode)
3. Console for origin errors

## 📞 Support

**Facebook Resources:**
- App Dashboard: https://developers.facebook.com/apps/1158409335748796
- Developer Docs: https://developers.facebook.com/docs/whatsapp/embedded-signup
- Community: https://developers.facebook.com/community/

**Your Configuration:**
- Configuration Manager: Facebook Login for Business > Configurations
- Your Config ID: `786308124216853`
- Your Business ID: `1046753094175139`

## 🚀 Ready to Go?

1. ✅ Get App Secret from dashboard
2. ✅ Update `.env.local`
3. ✅ Add domains to app settings
4. ✅ Run `npm run dev`
5. ✅ Test the integration

---

**Your Setup:**
- App: `1158409335748796`
- Config: `786308124216853`
- Business: `1046753094175139`

**Status:** ⏳ Waiting for App Secret
**Next:** Complete Step 1 above to get started!
