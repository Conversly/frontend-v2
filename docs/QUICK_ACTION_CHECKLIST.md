# ⚡ Quick Action Checklist

## 🎯 Goal
Connect client WhatsApp accounts and automate their replies

---

## ✅ ALREADY DONE
- [x] Embedded Signup implementation
- [x] Token exchange API
- [x] Client onboarding API  
- [x] Webhook handler
- [x] Environment setup

---

## 🚨 DO THIS NOW (Critical - 10 minutes)

### 1. Get System User Token
```
🔗 URL: https://business.facebook.com/settings/system-users/1046753094175139
```

**Steps:**
1. Click **"Add"** → Name: `WhatsApp System User` → Role: **Admin**
2. Click the user → **"Generate New Token"**
3. Select App: `1158409335748796`
4. Permissions: `whatsapp_business_management`, `whatsapp_business_messaging`, `business_management`
5. **Copy token immediately!**
6. Add to `.env`:
   ```env
   FACEBOOK_SYSTEM_USER_TOKEN=paste_token_here
   ```

### 2. Get Credit Line ID
```
🔗 URL: https://business.facebook.com/settings/info/1046753094175139
```

**Steps:**
1. Go to **"Business Info"** or **"Payment Methods"**
2. Find **"Credit Line ID"** or **"Extended Credit"**
3. Copy the ID
4. Add to `.env`:
   ```env
   FACEBOOK_CREDIT_LINE_ID=paste_id_here
   ```

**Alternative - Use API:**
```bash
curl "https://graph.facebook.com/v24.0/me?fields=extendedcredits&access_token=YOUR_SYSTEM_TOKEN"
```

### 3. Set Webhook Verify Token
Add a random string to `.env`:
```env
WEBHOOK_VERIFY_TOKEN=my_secret_verify_token_12345
```

### 4. Restart Server
```bash
# Stop server: Ctrl+C
pnpm run dev
```

---

## 📱 TEST FLOW (5 minutes)

### Step 1: Configure Facebook App
```
🔗 https://developers.facebook.com/apps/1158409335748796/fb-login/settings/
```

**Client OAuth Settings** - Set ALL to **Yes**:
- [x] Client OAuth Login
- [x] Web OAuth Login  
- [x] Enforce HTTPS
- [x] Embedded Browser OAuth Login
- [x] Use Strict Mode for Redirect URIs

**Add Domains:**
- Allowed Domains: `localhost`
- Valid OAuth Redirect URIs: `http://localhost:3000/chatbot/test/integration`

**SAVE CHANGES!**

### Step 2: Test Integration
```bash
# 1. Start server
pnpm run dev

# 2. Open in browser
http://localhost:3000/chatbot/test/integration

# 3. Open Console (F12)

# 4. Click "Continue with Facebook"

# 5. Complete Embedded Signup

# 6. Watch for success messages
```

**Expected Console Output:**
```javascript
✅ Facebook SDK initialized
✅ message event: { type: 'WA_EMBEDDED_SIGNUP', event: 'FINISH', ... }
✅ response: AUTH_CODE
✅ Token exchange successful
✅ Client onboarded successfully!
```

---

## 🌐 SETUP WEBHOOKS (15 minutes)

### Step 1: Deploy or Use ngrok
**For Local Testing (ngrok):**
```bash
# Install ngrok
brew install ngrok

# Start tunnel
ngrok http 3000

# Copy HTTPS URL (e.g., https://abc123.ngrok.io)
```

### Step 2: Configure Webhook in Meta
```
🔗 https://developers.facebook.com/apps/1158409335748796/webhooks/
```

1. **Callback URL:** 
   - Local: `https://YOUR_NGROK_URL/api/webhooks/whatsapp`
   - Production: `https://yourdomain.com/api/webhooks/whatsapp`

2. **Verify Token:** Same as `WEBHOOK_VERIFY_TOKEN` in `.env`

3. **Subscribe to:**
   - [x] messages
   - [x] message_template_status_update

4. Click **"Verify and Save"**

### Step 3: Test Webhook
Send a message to client's WhatsApp number → Check server logs for:
```
📨 Webhook event received
💬 New message received
✅ Message processed successfully
```

---

## 📊 DATABASE SETUP (Next)

### What You Need to Store:

```typescript
// Client/Bot Credentials
{
  botId: string,
  clientName: string,
  wabaId: string,
  phoneNumberId: string,
  businessToken: string,  // ⚠️ ENCRYPT!
  pin: string,           // ⚠️ ENCRYPT!
  status: 'active',
  onboardedAt: Date
}

// Messages
{
  messageId: string,
  botId: string,
  from: string,          // Customer number
  to: string,            // Business number
  content: string,
  type: 'text' | 'image' | ...,
  direction: 'inbound' | 'outbound',
  status: 'sent' | 'delivered' | 'read',
  timestamp: Date
}
```

### Add Database Logic To:
1. `/app/api/integrations/whatsapp/onboard-client/route.ts` (Line 150)
2. `/app/api/webhooks/whatsapp/route.ts` (Multiple locations marked with TODO)

---

## 🤖 IMPLEMENT AUTO-REPLY (Final Step)

### 1. Create Message Sending Helper
File: `/lib/whatsapp/send-message.ts`

```typescript
export async function sendWhatsAppMessage(
  phoneNumberId: string,
  businessToken: string,
  to: string,
  message: string
) {
  const response = await fetch(
    `https://graph.facebook.com/v24.0/${phoneNumberId}/messages`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${businessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: to,
        type: 'text',
        text: { body: message }
      })
    }
  );
  
  return response.json();
}
```

### 2. Add Auto-Reply Logic
In `/app/api/webhooks/whatsapp/route.ts`:

```typescript
async function handleIncomingMessage(...) {
  // ... existing code ...
  
  // Get bot configuration
  const bot = await database.bots.findByPhoneNumberId(phoneNumberId);
  
  if (bot?.autoReplyEnabled) {
    // Generate AI response using your chatbot
    const aiResponse = await yourChatbotAPI.generateReply(
      messageContent,
      bot.configuration
    );
    
    // Send reply
    await sendWhatsAppMessage(
      phoneNumberId,
      bot.businessToken,
      from,
      aiResponse
    );
  }
}
```

---

## 📋 PRODUCTION CHECKLIST

### Security:
- [ ] Encrypt businessToken in database
- [ ] Encrypt PIN in database
- [ ] Implement rate limiting
- [ ] Add request validation
- [ ] Enable webhook signature verification
- [ ] Use HTTPS everywhere

### Monitoring:
- [ ] Set up error tracking (Sentry)
- [ ] Add logging (Winston/Pino)
- [ ] Monitor token expiry
- [ ] Track message delivery rates
- [ ] Set up alerts for failures

### Features:
- [ ] Token refresh (60-day expiry)
- [ ] Message template management
- [ ] Conversation history UI
- [ ] Client dashboard
- [ ] Usage analytics
- [ ] Billing integration

---

## 🆘 TROUBLESHOOTING

### "Token exchange failed"
- Check `FACEBOOK_APP_SECRET` in `.env`
- Verify code hasn't expired (30-second TTL)
- Check server logs for detailed error

### "Credit line sharing failed"
- Verify `FACEBOOK_SYSTEM_USER_TOKEN` is valid
- Check system user has permissions
- Ensure `FACEBOOK_CREDIT_LINE_ID` is correct

### "Webhook verification failed"
- Check `WEBHOOK_VERIFY_TOKEN` matches in:
  - `.env` file
  - Meta webhook configuration
- Restart server after changing `.env`

### "Phone registration failed"
- Verify PIN is exactly 6 digits
- Check businessToken is valid
- Phone may already be registered

### No webhooks received
- Check webhook URL is publicly accessible
- Verify webhook subscribed to correct fields
- Test webhook with Meta's test button
- Check ngrok/server logs

---

## 🎯 SUCCESS METRICS

You'll know it's working when:
- ✅ Client completes Embedded Signup without errors
- ✅ All 5 onboarding steps succeed
- ✅ Client credentials saved to database
- ✅ Webhooks received when someone messages client
- ✅ Auto-replies sent successfully
- ✅ Message status updates received
- ✅ No errors in server logs

---

## 📞 QUICK REFERENCE

### Your IDs:
```
App ID: 1158409335748796
Config ID: 786308124216853  
Business ID: 1046753094175139
```

### Important URLs:
- **App Dashboard:** https://developers.facebook.com/apps/1158409335748796
- **Facebook Login Settings:** https://developers.facebook.com/apps/1158409335748796/fb-login/settings/
- **Webhooks:** https://developers.facebook.com/apps/1158409335748796/webhooks/
- **System Users:** https://business.facebook.com/settings/system-users/1046753094175139
- **Business Info:** https://business.facebook.com/settings/info/1046753094175139

### API Endpoints:
```
POST /api/integrations/whatsapp/exchange-token
POST /api/integrations/whatsapp/onboard-client
POST /api/webhooks/whatsapp (webhook handler)
GET  /api/webhooks/whatsapp (verification)
```

---

## ⏰ TIME ESTIMATE

- Get System Token: **5 min**
- Get Credit Line ID: **3 min**
- Update .env & restart: **2 min**
- Configure Facebook app: **5 min**
- Test flow: **5 min**
- Setup webhooks: **15 min**
- **TOTAL: ~35 minutes**

---

**Next Action:** Get System User Token NOW → https://business.facebook.com/settings/system-users/1046753094175139
