# 🚀 WhatsApp Embedded Signup - Quick Setup Checklist

## ✅ Before You Start

- [ ] You are a **Solution Partner** or **Tech Provider**
- [ ] You have a **line of credit** (Solution Partners only)
- [ ] Your domain has a **valid SSL certificate**
- [ ] You can **send/receive WhatsApp messages** via API
- [ ] You have **webhooks** set up and subscribed to `account_update`

## 📋 Setup Steps (5 minutes)

### 1️⃣ Facebook App Settings
**Location:** App Dashboard > Facebook Login for Business > Settings

Enable these toggles:
- [ ] Client OAuth login → **Yes**
- [ ] Web OAuth login → **Yes**
- [ ] Enforce HTTPS → **Yes**
- [ ] Embedded Browser OAuth Login → **Yes**
- [ ] Use Strict Mode for redirect URIs → **Yes**
- [ ] Login with the JavaScript SDK → **Yes**

### 2️⃣ Add Your Domains
**Add to both fields:**

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

### 3️⃣ Create Configuration
**Location:** Facebook Login for Business > Configurations

**Option A - Quick (Recommended):**
- [ ] Click "Create from template"
- [ ] Select: **"WhatsApp Embedded Signup Configuration With 60 Expiration Token"**
- [ ] Copy the **Configuration ID**

**Option B - Custom:**
- [ ] Click "Create configuration"
- [ ] Name it (e.g., "WhatsApp Onboarding")
- [ ] Select login variation: **"WhatsApp Embedded Signup"**
- [ ] Choose assets/permissions
- [ ] Copy the **Configuration ID**

### 4️⃣ Environment Variables
**Create `.env.local` file:**

```env
FACEBOOK_APP_ID=your_app_id
NEXT_PUBLIC_FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret
NEXT_PUBLIC_FACEBOOK_LOGIN_CONFIG_ID=your_config_id_from_step_3
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### 5️⃣ Test It!
```bash
npm run dev
```

Navigate to: `http://localhost:3000/chatbot/[botId]/integration`

- [ ] Click "Continue with Facebook"
- [ ] Complete the flow
- [ ] Check console for events
- [ ] Verify data is captured

## 🎯 What Gets Captured

### On Success:
```javascript
{
  phone_number_id: '106540352242922',
  waba_id: '524126980791429',
  business_id: '2729063490586005',
  access_token: 'long_lived_token' // via separate callback
}
```

### On Cancel:
```javascript
{
  current_step: 'PHONE_NUMBER_SETUP' // where they quit
}
```

### On Error:
```javascript
{
  error_message: 'Error description',
  error_id: '524126',
  session_id: 'f34b51dab5e0498'
}
```

## 🔍 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| SDK not loading | Check domain in "Allowed domains" |
| Modal doesn't open | Verify Configuration ID in env vars |
| No events received | Ensure HTTPS enabled, check console |
| Token exchange fails | Verify App ID/Secret, check 30s timeout |
| Users abandoning | Check `current_step` to find blocker |

## 📞 Need Help?

**Facebook Resources:**
- [Embedded Signup Docs](https://developers.facebook.com/docs/whatsapp/embedded-signup)
- [Developer Community](https://developers.facebook.com/community/)

**Application Support:**
- Email: support@conversly.ai
- Full Guide: `/docs/EMBEDDED_SIGNUP_IMPLEMENTATION.md`

## ⚡ Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Implementation Files

```
✓ /app/(dashboard)/chatbot/[botId]/integration/page.tsx
  - Main integration UI with Embedded Signup
  
✓ /app/api/integrations/whatsapp/exchange-token/route.ts
  - Token exchange API endpoint
  
✓ /types/facebook-sdk.d.ts
  - TypeScript definitions for FB SDK
  
✓ /components/chatbot/WhatsAppSetupChecklist.tsx
  - Interactive setup checklist component
```

## 🔐 Security Reminders

- ✅ Never commit `.env.local` to git
- ✅ Use HTTPS in production
- ✅ Verify message event origins
- ✅ Implement token encryption in database
- ✅ Set up token refresh before 60-day expiration

---

**Ready to Go?** Start with Step 1 above! 🚀
