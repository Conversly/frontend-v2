# ⚡ Quick Reference Card

## 🎯 What You're Building
**Solution Partner Platform** - Manage WhatsApp accounts for multiple clients with automated replies

---

## 📋 3 Things You MUST Do Now

### 1️⃣ Get System User Token (5 min)
```
🔗 https://business.facebook.com/settings/system-users/1046753094175139

1. Click "Add" → Create system user
2. Generate token with these permissions:
   • whatsapp_business_management
   • whatsapp_business_messaging  
   • business_management
3. COPY TOKEN (you won't see it again!)
4. Add to .env:
   FACEBOOK_SYSTEM_USER_TOKEN=paste_here
```

### 2️⃣ Get Credit Line ID (3 min)
```
🔗 https://business.facebook.com/settings/info/1046753094175139

1. Go to Business Info
2. Find "Credit Line ID"
3. Add to .env:
   FACEBOOK_CREDIT_LINE_ID=paste_here
```

### 3️⃣ Restart Server
```bash
pnpm run dev
```

---

## ✅ What's Already Done

| Component | Status | File |
|-----------|--------|------|
| Embedded Signup UI | ✅ | `/app/(dashboard)/chatbot/[botId]/integration/page.tsx` |
| Token Exchange API | ✅ | `/app/api/integrations/whatsapp/exchange-token/route.ts` |
| Onboarding API | ✅ | `/app/api/integrations/whatsapp/onboard-client/route.ts` |
| Webhook Handler | ✅ | `/app/api/webhooks/whatsapp/route.ts` |
| Documentation | ✅ | `/docs/*.md` (7 files) |
| Environment Setup | ⚠️ | `.env` (needs 2 tokens) |

---

## 🧪 Quick Test (After Adding Tokens)

```bash
# 1. Configure Facebook app
Open: https://developers.facebook.com/apps/1158409335748796/fb-login/settings/
Set OAuth settings to "Yes"
Add "localhost" to Allowed Domains
Add redirect URI: http://localhost:3000/chatbot/test/integration

# 2. Start server
pnpm run dev

# 3. Test
Open: http://localhost:3000/chatbot/test/integration
Click "Continue with Facebook"
Complete signup
Watch console for ✅ success messages
```

---

## 🔄 How It Works

```
Client clicks button → Facebook login → Embedded Signup →
You get WABA ID + Phone ID + Auth Code →
Exchange code for token → Subscribe webhooks →
Share credit line → Register phone → Save to database →
✅ CLIENT READY TO USE
```

---

## 📊 What You Can Do After Setup

✅ Connect unlimited client WhatsApp accounts  
✅ Receive all messages to your webhook  
✅ Send automated replies via API  
✅ Manage conversations for all clients  
✅ Pay for messaging with your credit line  

---

## 🔑 Your Configuration

```
App ID: 1158409335748796
App Secret: ca182526961db7f27b510deb0e15c857
Config ID: 786308124216853
Business ID: 1046753094175139
```

---

## 📞 Quick Links

| What | URL |
|------|-----|
| App Dashboard | https://developers.facebook.com/apps/1158409335748796 |
| System Users | https://business.facebook.com/settings/system-users/1046753094175139 |
| Business Info | https://business.facebook.com/settings/info/1046753094175139 |
| OAuth Settings | https://developers.facebook.com/apps/1158409335748796/fb-login/settings/ |
| Webhooks | https://developers.facebook.com/apps/1158409335748796/webhooks/ |

---

## 🆘 Common Issues

**"Onboarding failed"**
→ Check System User Token is valid

**"Credit line sharing failed"**  
→ Verify Credit Line ID is correct

**"Webhook not working"**  
→ Check WEBHOOK_VERIFY_TOKEN matches in Meta dashboard

**"Token expired"**  
→ Auth code has 30-second TTL, must exchange quickly

---

## 📚 Documentation

| Need Help With | See File |
|----------------|----------|
| Next immediate steps | `QUICK_ACTION_CHECKLIST.md` |
| Visual flow diagram | `VISUAL_FLOW_DIAGRAM.md` |
| Complete flow details | `COMPLETE_CLIENT_ONBOARDING_FLOW.md` |
| Testing instructions | `TESTING_GUIDE.md` |
| Official Meta docs | `WHATSAPP_META_OFFICIAL_IMPLEMENTATION.md` |
| Implementation summary | `IMPLEMENTATION_COMPLETE.md` |

---

## ⏱️ Time to Working System

```
Add tokens: 10 min
Configure app: 5 min
Test flow: 5 min
────────────────────
TOTAL: 20 minutes ⚡
```

---

## 🎯 Success Looks Like

```javascript
// Console output
✅ Facebook SDK initialized
✅ message event: { event: 'FINISH', data: {...} }
✅ response: AQD7xK9...
✅ Token exchange successful
✅ Webhooks subscribed
✅ Credit line shared
✅ Phone registered
✅ Client onboarded successfully!
```

---

## 🚀 Your Next Action

**RIGHT NOW:** Get System User Token

**Go to:** https://business.facebook.com/settings/system-users/1046753094175139

**Then:** Follow "3 Things You MUST Do Now" at the top ⬆️

---

**Status:** ⚠️ Waiting for 2 tokens  
**Time to working:** 20 minutes  
**You're 90% there!** 🎉
