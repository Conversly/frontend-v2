# WhatsApp Client Onboarding - Visual Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     YOUR PLATFORM (Solution Partner)                     │
│                                                                          │
│  You help clients connect their WhatsApp accounts                       │
│  You manage messaging and automation for them                           │
│  You pay for their messaging costs using your credit line               │
└─────────────────────────────────────────────────────────────────────────┘


┌──────────────────────── PHASE 1: CLIENT SIGNUP ────────────────────────┐
│                                                                          │
│  1. Client visits your platform                                         │
│     https://yourplatform.com/chatbot/123/integration                   │
│                                                                          │
│  2. Client clicks "Continue with Facebook" button                       │
│     ↓                                                                    │
│  3. Facebook Login popup appears                                        │
│     ↓                                                                    │
│  4. Client completes Embedded Signup flow:                              │
│     • Business name                                                     │
│     • Phone number verification                                         │
│     • Display name                                                      │
│     • Business category                                                 │
│     • Permissions approval                                              │
│     ↓                                                                    │
│  5. You receive (via message event):                                    │
│     ✅ WABA ID: 524126980791429                                         │
│     ✅ Phone Number ID: 106540352242922                                 │
│     ✅ Business ID: 2729063490586005                                    │
│     ↓                                                                    │
│  6. You receive (via callback):                                         │
│     ✅ Auth Code: AQD7xK9... (30-second TTL)                           │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘


┌───────────────── PHASE 2: SERVER-SIDE ONBOARDING ──────────────────────┐
│                                                                          │
│  STEP 1: Exchange Auth Code for Business Token                         │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │ POST /api/integrations/whatsapp/exchange-token                  │   │
│  │                                                                  │   │
│  │ You send: Auth Code (from callback)                            │   │
│  │ You get: Business Token (60-day access token)                  │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                             ↓                                            │
│                                                                          │
│  STEP 2: Subscribe to Webhooks                                          │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │ POST /{WABA_ID}/subscribed_apps                                │   │
│  │                                                                  │   │
│  │ This allows you to receive incoming messages                   │   │
│  │ for this client's WhatsApp number                              │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                             ↓                                            │
│                                                                          │
│  STEP 3: Share Your Credit Line                                         │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │ POST /{CREDIT_LINE_ID}/whatsapp_credit_sharing_and_attach     │   │
│  │                                                                  │   │
│  │ This allows client to send messages                            │   │
│  │ Costs are billed to YOUR credit line                           │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                             ↓                                            │
│                                                                          │
│  STEP 4: Register Phone Number                                          │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │ POST /{PHONE_NUMBER_ID}/register                               │   │
│  │                                                                  │   │
│  │ You send: 6-digit PIN for 2FA                                  │   │
│  │ Phone is now ready to send/receive messages                    │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                             ↓                                            │
│                                                                          │
│  STEP 5: Save to Database                                               │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │ Store in your database (ENCRYPTED):                            │   │
│  │ • WABA ID                                                       │   │
│  │ • Phone Number ID                                               │   │
│  │ • Business Token                                                │   │
│  │ • PIN                                                            │   │
│  │ • Client name & metadata                                        │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ✅ CLIENT IS NOW ONBOARDED!                                            │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘


┌────────────────── PHASE 3: RECEIVE MESSAGES ───────────────────────────┐
│                                                                          │
│  Customer sends message to client's WhatsApp number                     │
│                             ↓                                            │
│  Meta forwards message to your webhook                                  │
│                             ↓                                            │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │ POST /api/webhooks/whatsapp                                     │   │
│  │                                                                  │   │
│  │ You receive:                                                    │   │
│  │ • Customer's phone number                                       │   │
│  │ • Message content                                                │   │
│  │ • Message type (text, image, etc.)                             │   │
│  │ • Timestamp                                                      │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                             ↓                                            │
│  You process the message:                                               │
│  1. Save to database                                                    │
│  2. Generate AI response                                                │
│  3. Send automated reply                                                │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘


┌─────────────────── PHASE 4: SEND MESSAGES ─────────────────────────────┐
│                                                                          │
│  Your platform generates automated reply                                │
│                             ↓                                            │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │ POST /{PHONE_NUMBER_ID}/messages                               │   │
│  │ Authorization: Bearer {CLIENT_BUSINESS_TOKEN}                  │   │
│  │                                                                  │   │
│  │ {                                                                │   │
│  │   "messaging_product": "whatsapp",                             │   │
│  │   "to": "+1234567890",                                          │   │
│  │   "type": "text",                                                │   │
│  │   "text": {                                                      │   │
│  │     "body": "AI generated reply"                               │   │
│  │   }                                                              │   │
│  │ }                                                                │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                             ↓                                            │
│  Message sent to customer                                               │
│                             ↓                                            │
│  Meta sends delivery status to your webhook:                            │
│  • sent                                                                 │
│  • delivered                                                            │
│  • read                                                                 │
│  • failed                                                               │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘


┌────────────────────── KEY COMPONENTS ──────────────────────────────────┐
│                                                                          │
│  📱 Client's Assets (created by Embedded Signup):                       │
│     • WABA (WhatsApp Business Account)                                 │
│     • Business Phone Number                                             │
│     • Business Manager Profile                                          │
│                                                                          │
│  🔑 Your Assets (required for Solution Partner):                        │
│     • Meta App (App ID: 1158409335748796)                              │
│     • System User Token                                                 │
│     • Credit Line ID                                                    │
│     • Webhook Endpoint                                                  │
│                                                                          │
│  💾 What You Store (per client):                                        │
│     • WABA ID → Identify the WhatsApp account                          │
│     • Phone Number ID → Send/receive messages                          │
│     • Business Token → Authenticate API calls                          │
│     • PIN → 2FA for phone registration                                  │
│                                                                          │
│  🔄 Message Flow:                                                        │
│     Customer → WhatsApp → Meta → Your Webhook → Your AI →             │
│     Your API → Meta → WhatsApp → Customer                             │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘


┌───────────────────── WHAT YOU STILL NEED ──────────────────────────────┐
│                                                                          │
│  ⚠️  CRITICAL (Without these, onboarding will fail):                    │
│                                                                          │
│      1. System User Token                                               │
│         Get from: Business Manager > System Users                       │
│         Add to: .env as FACEBOOK_SYSTEM_USER_TOKEN                     │
│                                                                          │
│      2. Credit Line ID                                                  │
│         Get from: Business Manager > Business Info                      │
│         Add to: .env as FACEBOOK_CREDIT_LINE_ID                        │
│                                                                          │
│      3. Webhook Verify Token                                            │
│         Create: Any random string                                       │
│         Add to: .env as WEBHOOK_VERIFY_TOKEN                           │
│                                                                          │
│  📝 RECOMMENDED (For production):                                        │
│                                                                          │
│      4. Database setup                                                  │
│      5. Encryption for tokens/PINs                                      │
│      6. Auto-reply logic implementation                                 │
│      7. Message template management                                     │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘


┌────────────────── TESTING CHECKLIST ───────────────────────────────────┐
│                                                                          │
│  Before you can test:                                                   │
│  ☐ Get System User Token                                               │
│  ☐ Get Credit Line ID                                                  │
│  ☐ Add both to .env                                                    │
│  ☐ Restart server (pnpm run dev)                                       │
│  ☐ Configure Facebook app OAuth settings                               │
│  ☐ Add localhost to allowed domains                                    │
│                                                                          │
│  Test flow:                                                             │
│  ☐ Open http://localhost:3000/chatbot/test/integration                │
│  ☐ Open browser console (F12)                                          │
│  ☐ Click "Continue with Facebook"                                      │
│  ☐ Complete Embedded Signup                                            │
│  ☐ Verify console shows success messages                               │
│  ☐ Check server logs for onboarding steps                              │
│                                                                          │
│  Success indicators:                                                    │
│  ✅ Console: "message event: { event: 'FINISH' }"                      │
│  ✅ Console: "response: AUTH_CODE"                                      │
│  ✅ Toast: "Client onboarded successfully!"                            │
│  ✅ Server: "🏁 Onboarding completed"                                   │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘


┌────────────────── AFTER ONBOARDING ────────────────────────────────────┐
│                                                                          │
│  You can now:                                                           │
│  ✅ Send messages on behalf of client                                   │
│  ✅ Receive messages to client's number                                 │
│  ✅ Automate replies using your AI                                      │
│  ✅ Manage conversations                                                │
│  ✅ Track message delivery                                              │
│  ✅ View analytics                                                      │
│                                                                          │
│  Client doesn't need to:                                                │
│  ❌ Manage WhatsApp API themselves                                      │
│  ❌ Pay for messaging (you pay with your credit line)                  │
│  ❌ Handle technical setup                                              │
│  ❌ Monitor conversations (you automate it)                             │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

## 🎯 Next Action

**Go to:** https://business.facebook.com/settings/system-users/1046753094175139

**Do this:**
1. Create System User
2. Generate token with permissions
3. Copy token
4. Add to `.env` as `FACEBOOK_SYSTEM_USER_TOKEN`
5. Get Credit Line ID from Business Info
6. Add to `.env` as `FACEBOOK_CREDIT_LINE_ID`
7. Restart server: `pnpm run dev`
8. Test the flow!

**Time needed:** ~10 minutes

**Result:** Complete working WhatsApp client onboarding system 🚀
