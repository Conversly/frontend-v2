# Complete WhatsApp Client Onboarding Flow

## 🎯 Your Goal
Connect your **clients' WhatsApp Business accounts** to your platform so you can:
- ✅ Automate replies for them
- ✅ Manage their messages
- ✅ Send messages on their behalf
- ✅ Handle customer conversations

## 📋 What You Are: Solution Partner

You are a **Solution Partner** - you manage WhatsApp accounts for multiple clients and pay for their messaging costs using your credit line.

---

## 🔄 Complete Flow Overview

### Phase 1: CLIENT-SIDE (Your Website)
```
Client clicks "Continue with Facebook"
  ↓
Facebook Login popup appears
  ↓
Client completes Embedded Signup flow
  ↓
You receive:
  • WABA ID (WhatsApp Business Account ID)
  • Phone Number ID
  • Business ID
  • Auth Code (30-second TTL)
```

### Phase 2: SERVER-SIDE (Your Backend)
```
Exchange Auth Code → Business Token
  ↓
Subscribe to Webhooks on client's WABA
  ↓
Share your Credit Line with client
  ↓
Register client's phone number
  ↓
Save credentials to database
  ↓
✅ CLIENT READY TO USE
```

---

## ✅ What You've Completed

1. ✅ **Embedded Signup UI** - `/app/(dashboard)/chatbot/[botId]/integration/page.tsx`
2. ✅ **Token Exchange API** - `/app/api/integrations/whatsapp/exchange-token/route.ts`
3. ✅ **Onboarding API** - `/app/api/integrations/whatsapp/onboard-client/route.ts`
4. ✅ **Environment Setup** - `.env` configured with App credentials

---

## ❌ What You Still Need

### 1. System User Access Token (Critical)

**What it is:** A long-lived token that represents your business, not an individual user.

**Why you need it:** To share your credit line with clients and perform administrative tasks.

**How to get it:**

#### Step 1: Go to Business Manager
```
https://business.facebook.com/settings/system-users/{YOUR_BUSINESS_ID}
```
Replace `{YOUR_BUSINESS_ID}` with: `1046753094175139`

#### Step 2: Create System User
1. Click **"Add"** button
2. Give it a name: `WhatsApp Solution Partner System User`
3. Role: **Admin**
4. Click **"Create System User"**

#### Step 3: Generate Token
1. Click on the system user you just created
2. Click **"Generate New Token"**
3. Select your app: `1158409335748796`
4. Select permissions:
   - ✅ `whatsapp_business_management`
   - ✅ `whatsapp_business_messaging`
   - ✅ `business_management`
5. Click **"Generate Token"**
6. **COPY THE TOKEN** - you won't see it again!

#### Step 4: Add to .env
```env
FACEBOOK_SYSTEM_USER_TOKEN=your_generated_token_here
```

---

### 2. Credit Line ID (Critical for Solution Partners)

**What it is:** Your business credit line that you'll share with clients to cover their messaging costs.

**Why you need it:** Clients can't send messages until they have a credit line attached.

**How to get it:**

#### Option A: Via Business Manager UI
```
https://business.facebook.com/settings/info/{YOUR_BUSINESS_ID}
```
1. Go to **Business Settings**
2. Click **"Business Info"**
3. Scroll to **"Payment Methods"** or **"Credit Line"**
4. Copy the Credit Line ID

#### Option B: Via Graph API
```bash
curl "https://graph.facebook.com/v24.0/me?fields=extendedcredits&access_token=YOUR_SYSTEM_USER_TOKEN"
```

Look for the `extended_credit_id` in the response.

#### Step: Add to .env
```env
FACEBOOK_CREDIT_LINE_ID=your_credit_line_id_here
```

---

### 3. Webhook Configuration (Critical for Receiving Messages)

**What it is:** A URL on your server that Meta will send incoming messages to.

**Why you need it:** To receive messages from your clients' customers.

**How to set it up:**

#### Step 1: Create Webhook Endpoint
You need to create: `/app/api/webhooks/whatsapp/route.ts`

I can create this for you - it will handle:
- Incoming messages
- Message delivery status
- Customer message reads
- Other WhatsApp events

#### Step 2: Configure in Meta App Dashboard
```
https://developers.facebook.com/apps/1158409335748796/webhooks/
```

1. Click **"Edit Subscription"** for WhatsApp
2. **Callback URL:** `https://yourdomain.com/api/webhooks/whatsapp`
3. **Verify Token:** Create a random string and add to `.env`:
   ```env
   WEBHOOK_VERIFY_TOKEN=your_random_verify_token_123
   ```
4. Subscribe to these fields:
   - ✅ `messages`
   - ✅ `message_template_status_update`
   - ✅ `message_template_quality_update`
5. Click **"Verify and Save"**

---

### 4. Database Schema (Critical for Production)

You need to store client credentials securely. Here's the recommended schema:

```typescript
interface WhatsAppClient {
  id: string;
  botId: string;                    // Your internal client/bot ID
  clientName: string;               // Client's business name
  
  // WhatsApp credentials (ENCRYPT THESE!)
  wabaId: string;                   // WhatsApp Business Account ID
  phoneNumberId: string;            // Business Phone Number ID
  businessId: string;               // Business Portfolio ID
  businessToken: string;            // ENCRYPT! Client's access token
  pin: string;                      // ENCRYPT! 6-digit 2FA PIN
  
  // Phone details
  displayPhoneNumber: string;       // E.g., +1 650 555 1234
  verifiedName: string;             // Business display name
  qualityRating: string;            // GREEN, YELLOW, RED
  
  // Status
  status: 'active' | 'suspended' | 'inactive';
  onboardedAt: Date;
  lastMessageAt: Date;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}
```

**⚠️ CRITICAL SECURITY:**
- **NEVER** store `businessToken` in plain text
- **NEVER** store `pin` in plain text
- Use encryption (AES-256) before storing
- Use environment variables for encryption keys

---

## 🚀 Complete Testing Flow

### Prerequisites Check:
```bash
# 1. Check .env file has all required values
✅ FACEBOOK_APP_ID=1158409335748796
✅ FACEBOOK_APP_SECRET=ca182526961db7f27b510deb0e15c857
✅ NEXT_PUBLIC_FACEBOOK_LOGIN_CONFIG_ID=786308124216853
✅ FACEBOOK_BUSINESS_ID=1046753094175139
❌ FACEBOOK_SYSTEM_USER_TOKEN=?  # YOU NEED THIS
❌ FACEBOOK_CREDIT_LINE_ID=?      # YOU NEED THIS
❌ WEBHOOK_VERIFY_TOKEN=?         # YOU NEED THIS
```

### Step 1: Configure Facebook App
1. Go to: https://developers.facebook.com/apps/1158409335748796/fb-login/settings/
2. Set **Client OAuth Settings** (all to Yes):
   - Client OAuth Login
   - Web OAuth Login  
   - Enforce HTTPS
   - Embedded Browser OAuth Login
   - Use Strict Mode for Redirect URIs
3. Add to **Allowed Domains**: `localhost`
4. Add to **Valid OAuth Redirect URIs**:
   ```
   http://localhost:3000/chatbot/[botId]/integration
   ```
5. Save Changes

### Step 2: Start Server
```bash
cd /Users/raghvendradhakar/Desktop/code/conversly/frontend-v2
pnpm run dev
```

### Step 3: Test Complete Flow

1. **Open integration page:**
   ```
   http://localhost:3000/chatbot/YOUR_BOT_ID/integration
   ```

2. **Open browser console** (F12)

3. **Click "Continue with Facebook"**

4. **Complete Embedded Signup:**
   - Login to Facebook
   - Complete WhatsApp Business setup
   - Authorize permissions

5. **Watch Console for:**
   ```javascript
   // Message event with client's IDs
   message event: {
     type: 'WA_EMBEDDED_SIGNUP',
     event: 'FINISH',
     data: {
       phone_number_id: '...',
       waba_id: '...',
       business_id: '...'
     }
   }
   
   // Auth code received
   response: AQD7xK9...
   
   // Onboarding completed
   ✅ Client onboarded successfully!
   ```

6. **Expected Toast Notifications:**
   ```
   ✅ WhatsApp Business Account connected!
   ℹ️ Completing onboarding steps...
   ✅ Client onboarded successfully!
   ```

---

## 🎯 After Successful Onboarding

### You Can Now:

1. **Send Messages on Behalf of Client:**
   ```bash
   POST https://graph.facebook.com/v24.0/{PHONE_NUMBER_ID}/messages
   Authorization: Bearer {BUSINESS_TOKEN}
   
   {
     "messaging_product": "whatsapp",
     "to": "+1234567890",
     "type": "template",
     "template": {
       "name": "hello_world",
       "language": { "code": "en_US" }
     }
   }
   ```

2. **Receive Messages from Client's Customers:**
   - Messages sent to client's WhatsApp number
   - Meta forwards to your webhook
   - You process and auto-reply

3. **Manage Message Templates:**
   - Create templates in Business Manager
   - Send approved templates via API
   - Track template status

4. **Monitor Quality & Analytics:**
   - Message delivery rates
   - Read rates
   - Quality rating (Green/Yellow/Red)
   - Usage analytics

---

## 🔧 Implementation Checklist

### Immediate (Required):
- [ ] Get System User Token
- [ ] Get Credit Line ID
- [ ] Add both to `.env`
- [ ] Restart development server
- [ ] Test complete flow

### Short-term (This Week):
- [ ] Create webhook endpoint
- [ ] Configure webhooks in Meta dashboard
- [ ] Implement database storage
- [ ] Add encryption for sensitive data
- [ ] Test message sending
- [ ] Test message receiving

### Medium-term (Next 2 Weeks):
- [ ] Build automated reply logic
- [ ] Create message template management UI
- [ ] Implement conversation history
- [ ] Add client dashboard
- [ ] Set up monitoring/alerts

### Long-term (Production):
- [ ] Implement token refresh (60-day expiry)
- [ ] Add rate limiting
- [ ] Set up error tracking (Sentry)
- [ ] Add usage analytics
- [ ] Implement billing/invoicing
- [ ] Create admin panel
- [ ] Add multi-language support

---

## 📞 Quick Reference

### Your Configuration:
```
App ID: 1158409335748796
App Secret: ca182526961db7f27b510deb0e15c857
Config ID: 786308124216853
Business ID: 1046753094175139
```

### Important URLs:
- **App Dashboard:** https://developers.facebook.com/apps/1158409335748796
- **Business Manager:** https://business.facebook.com/settings
- **System Users:** https://business.facebook.com/settings/system-users/1046753094175139
- **Webhooks:** https://developers.facebook.com/apps/1158409335748796/webhooks/

### API Endpoints Created:
- `POST /api/integrations/whatsapp/exchange-token` - Exchange auth code for business token
- `POST /api/integrations/whatsapp/onboard-client` - Complete 5-step onboarding

### API Endpoints Needed:
- `POST /api/webhooks/whatsapp` - Receive incoming messages
- `POST /api/whatsapp/send-message` - Send messages to customers
- `GET /api/whatsapp/clients` - List all connected clients
- `GET /api/whatsapp/messages/{botId}` - Get message history

---

## ❓ FAQ

**Q: Do I need a credit line if I'm just testing?**  
A: For testing with your own account, no. For onboarding real clients who will send messages, yes.

**Q: How much does messaging cost?**  
A: Varies by country. US: ~$0.005-0.01 per conversation. Check Meta's pricing.

**Q: Can clients see my credit line?**  
A: No, you pay but they can't see your billing details.

**Q: What happens if a client's token expires?**  
A: Business tokens last 60 days. Implement refresh logic before expiry.

**Q: Can one client have multiple phone numbers?**  
A: Yes, one WABA can have multiple phone numbers. Repeat onboarding for each.

**Q: What's the difference between WABA ID and Phone Number ID?**  
A: WABA = Account container. Phone Number = Actual messaging number. One WABA can have many numbers.

---

**Last Updated:** November 8, 2024  
**Status:** ⚠️ Awaiting System User Token & Credit Line ID  
**Next Action:** Get System User Token from Business Manager
