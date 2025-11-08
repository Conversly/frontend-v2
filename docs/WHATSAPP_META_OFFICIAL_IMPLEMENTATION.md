# WhatsApp Embedded Signup v4 - Official Meta Implementation

## Overview
This implementation follows **Meta's official Embedded Signup v4 documentation** exactly as specified in the WhatsApp Business Platform API documentation.

## Implementation Components

### 1. SDK Loading
**Location:** `app/(dashboard)/chatbot/[botId]/integration/page.tsx`

```typescript
// SDK loading - Load the Facebook JavaScript SDK asynchronously
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>
```

**In React:**
```typescript
const script = document.createElement('script');
script.id = 'facebook-jssdk';
script.src = 'https://connect.facebook.net/en_US/sdk.js';
script.async = true;
script.defer = true;
script.crossOrigin = 'anonymous';
document.body.appendChild(script);
```

### 2. SDK Initialization
**Purpose:** Initialize the Facebook SDK with your App ID and Graph API version

```typescript
window.fbAsyncInit = function() {
  window.FB.init({
    appId: '<APP_ID>',           // Your app ID: 1158409335748796
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v24.0'             // Latest Graph API version
  });
};
```

**Configuration:**
- App ID: `1158409335748796`
- Graph API Version: `v24.0` (latest)
- Auto Log App Events: `true`

### 3. Session Logging Message Event Listener
**Purpose:** Capture business customer's asset IDs, abandonment info, or error reports

```typescript
window.addEventListener('message', (event) => {
  if (!event.origin.endsWith('facebook.com')) return;
  
  try {
    const data = JSON.parse(event.data);
    if (data.type === 'WA_EMBEDDED_SIGNUP') {
      console.log('message event: ', data); // remove after testing
      // your code goes here
    }
  } catch {
    console.log('message event: ', event.data); // remove after testing
    // your code goes here
  }
});
```

**Event Structures:**

#### Successful Flow Completion:
```json
{
  "data": {
    "phone_number_id": "<CUSTOMER_BUSINESS_PHONE_NUMBER_ID>",
    "waba_id": "<CUSTOMER_WABA_ID>",
    "business_id": "<CUSTOMER_BUSINESS_PORTFOLIO_ID>",
    "ad_account_ids": ["<CUSTOMER_AD_ACCOUNT_ID_1>"],
    "page_ids": ["<CUSTOMER_PAGE_ID_1>"],
    "dataset_ids": ["<CUSTOMER_DATASET_ID_1>"]
  },
  "type": "WA_EMBEDDED_SIGNUP",
  "event": "FINISH"
}
```

**Event Types:**
- `FINISH` - Successful completion of Cloud API flow
- `FINISH_ONLY_WABA` - User completed flow without a phone number
- `FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING` - User completed flow with WhatsApp Business app number

#### Abandoned Flow:
```json
{
  "data": {
    "current_step": "<CURRENT_STEP>"
  },
  "type": "WA_EMBEDDED_SIGNUP",
  "event": "CANCEL"
}
```

#### User Reported Errors:
```json
{
  "data": {
    "error_message": "<ERROR_MESSAGE>",
    "error_id": "<ERROR_ID>",
    "session_id": "<SESSION_ID>",
    "timestamp": "<TIMESTAMP>"
  },
  "type": "WA_EMBEDDED_SIGNUP",
  "event": "CANCEL"
}
```

### 4. Response Callback
**Purpose:** Receive exchangeable token code (30-second TTL)

```typescript
const fbLoginCallback = (response) => {
  if (response.authResponse) {
    const code = response.authResponse.code;
    console.log('response: ', code); // remove after testing
    // your code goes here - exchange code for token
  } else {
    console.log('response: ', response); // remove after testing
    // handle auth failure
  }
}
```

**Important:** The exchangeable token code has a **30-second time-to-live**. You must exchange it quickly.

### 5. Launch Method and Callback Registration
**Purpose:** Define method to launch Embedded Signup flow

```typescript
const launchWhatsAppSignup = () => {
  FB.login(fbLoginCallback, {
    config_id: '<CONFIGURATION_ID>',  // Your config ID: 786308124216853
    response_type: 'code',
    override_default_response_type: true,
    extras: {
      setup: {},
    }
  });
}
```

**Configuration:**
- Config ID: `786308124216853`
- Response Type: `code`
- Override Default Response Type: `true`

### 6. Launch Button
**Purpose:** Trigger the Embedded Signup flow

```html
<button onclick="launchWhatsAppSignup()" 
        style="background-color: #1877f2; border: 0; border-radius: 4px; color: #fff; cursor: pointer; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: bold; height: 40px; padding: 0 24px;">
  Login with Facebook
</button>
```

**In React:**
```tsx
<Button onClick={launchWhatsAppSignup} disabled={isFacebookLoading || !sdkLoaded}>
  {isFacebookLoading ? 'Connecting...' : 'Continue with Facebook'}
</Button>
```

## Environment Variables

### Required Configuration:
```env
# Your App ID
FACEBOOK_APP_ID=1158409335748796
NEXT_PUBLIC_FACEBOOK_APP_ID=1158409335748796

# Your App Secret (server-side only)
FACEBOOK_APP_SECRET=ca182526961db7f27b510deb0e15c857

# Your Configuration ID
NEXT_PUBLIC_FACEBOOK_LOGIN_CONFIG_ID=786308124216853

# Your Business ID
FACEBOOK_BUSINESS_ID=1046753094175139

# Your app URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Token Exchange Flow

### Step 1: Receive Code (Client-Side)
When user completes Embedded Signup, you receive an auth code with 30-second TTL.

### Step 2: Exchange Code for Access Token (Server-Side)
**Endpoint:** `/api/integrations/whatsapp/exchange-token`

```typescript
POST /api/integrations/whatsapp/exchange-token
Content-Type: application/json

{
  "code": "AUTH_CODE_FROM_CALLBACK",
  "botId": "YOUR_BOT_ID"
}
```

**Server-Side Exchange:**
```typescript
// Exchange code for short-lived access token
const tokenUrl = `https://graph.facebook.com/v24.0/oauth/access_token?` +
  `client_id=${FACEBOOK_APP_ID}&` +
  `client_secret=${FACEBOOK_APP_SECRET}&` +
  `code=${code}`;

const tokenResponse = await fetch(tokenUrl);
const { access_token } = await tokenResponse.json();

// Exchange short-lived token for long-lived token (60 days)
const longLivedUrl = `https://graph.facebook.com/v24.0/oauth/access_token?` +
  `grant_type=fb_exchange_token&` +
  `client_id=${FACEBOOK_APP_ID}&` +
  `client_secret=${FACEBOOK_APP_SECRET}&` +
  `fb_exchange_token=${access_token}`;

const longLivedResponse = await fetch(longLivedUrl);
const { access_token: longLivedToken } = await longLivedResponse.json();
```

## Testing Instructions

### Prerequisites
1. **App Dashboard:** https://developers.facebook.com/apps/1158409335748796
2. **App Roles:** Add testers as Admin or Developer in App Roles panel
3. **Environment:** All environment variables configured

### Step 1: Configure Facebook App Settings
1. Go to **Facebook Login > Settings**
2. **Client OAuth Settings** - Set ALL to **Yes**:
   - ✅ Client OAuth Login
   - ✅ Web OAuth Login
   - ✅ Force Web OAuth Reauthentication
   - ✅ Enforce HTTPS
   - ✅ Embedded Browser OAuth Login
   - ✅ Use Strict Mode for Redirect URIs
3. **Allowed Domains for the JavaScript SDK:**
   - Add: `localhost`
4. **Valid OAuth Redirect URIs:**
   - Add: `http://localhost:3000/chatbot/[botId]/integration`
   - Add: `https://localhost:3000/chatbot/[botId]/integration`
5. Click **Save Changes**

### Step 2: Start Development Server
```bash
cd /Users/raghvendradhakar/Desktop/code/conversly/frontend-v2
npm run dev
```

### Step 3: Test Integration
1. Navigate to: `http://localhost:3000/chatbot/[botId]/integration`
2. Open Browser Console (F12)
3. Click **"Continue with Facebook"** button
4. Complete Embedded Signup flow
5. Watch Console for:
   ```
   message event: { type: 'WA_EMBEDDED_SIGNUP', event: 'FINISH', data: {...} }
   response: AUTH_CODE_HERE
   ```
6. Verify Success Toast notification

### Expected Console Output:

**Message Event (Asset IDs):**
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

**Response (Auth Code):**
```javascript
response: AQD7xK9... (auth code)
```

## Testing Console Logs

### Important Notes:
The official Meta documentation includes these console.log statements for testing:

```typescript
console.log('message event: ', data); // remove after testing
console.log('message event: ', event.data); // remove after testing
console.log('response: ', code); // remove after testing
console.log('response: ', response); // remove after testing
```

**⚠️ These should be REMOVED in production** but are useful for debugging during setup.

## Troubleshooting

### SDK Not Loading
- Check browser console for errors
- Verify internet connection
- Check if `facebook.com` is accessible

### Config ID Not Found
- Verify `NEXT_PUBLIC_FACEBOOK_LOGIN_CONFIG_ID=786308124216853` in `.env`
- Restart development server after changing environment variables

### OAuth Redirect URI Mismatch
- Verify redirect URIs in Facebook App Settings match exactly
- Include both `http://` and `https://` versions for localhost

### Token Exchange Fails
- Check App Secret is correct in `.env`
- Verify code hasn't expired (30-second TTL)
- Check server logs for detailed error messages

## Production Checklist

Before deploying to production:

- [ ] Remove all testing console.log statements
- [ ] Update `NEXT_PUBLIC_APP_URL` to production domain
- [ ] Add production domain to Facebook App Settings:
  - [ ] Allowed Domains for JavaScript SDK
  - [ ] Valid OAuth Redirect URIs
- [ ] Update Graph API version if needed
- [ ] Implement secure token storage (database)
- [ ] Set up token refresh mechanism (60-day expiry)
- [ ] Implement webhook handlers for incoming messages
- [ ] Add proper error logging and monitoring
- [ ] Test with real business accounts

## Resources

- **Meta Documentation:** https://developers.facebook.com/docs/whatsapp/embedded-signup
- **App Dashboard:** https://developers.facebook.com/apps/1158409335748796
- **Graph API Reference:** https://developers.facebook.com/docs/graph-api
- **WhatsApp Business Platform:** https://developers.facebook.com/docs/whatsapp

## Your Configuration

```
App ID: 1158409335748796
Config ID: 786308124216853
Business ID: 1046753094175139
Graph API Version: v24.0
```

---

**Last Updated:** November 8, 2024
**Implementation Version:** Embedded Signup v4
**Status:** ✅ Ready for Testing
