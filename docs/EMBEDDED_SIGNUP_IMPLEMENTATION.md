# WhatsApp Business Platform - Embedded Signup v4 Implementation Guide

## Overview
This implementation follows Meta's official WhatsApp Business Platform Embedded Signup v4 documentation. It allows business customers to onboard their WhatsApp Business Accounts directly through your application.

## Prerequisites

### Required Roles
- ✅ **Solution Partner** or **Tech Provider** status with Meta
- ✅ **Line of Credit** (for Solution Partners)
- ✅ **SSL Certificate** on your domain

### Technical Requirements
- ✅ Familiarity with WhatsApp Business API (sending/receiving messages)
- ✅ Knowledge of message templates
- ✅ Webhooks callback endpoint set up
- ✅ Subscription to `account_update` webhook

## Step-by-Step Implementation

### Step 1: Configure Facebook App Settings

1. **Navigate to App Dashboard**
   ```
   https://developers.facebook.com/apps/YOUR_APP_ID
   ```

2. **Go to Facebook Login for Business > Settings**
   
3. **Enable Client OAuth Settings**
   Set the following to **Yes**:
   - ✅ Client OAuth login
   - ✅ Web OAuth login
   - ✅ Enforce HTTPS
   - ✅ Embedded Browser OAuth Login
   - ✅ Use Strict Mode for redirect URIs
   - ✅ Login with the JavaScript SDK

4. **Add Allowed Domains**
   Add your domains to both fields (only HTTPS domains are supported):
   - **Allowed domains for the JavaScript SDK:**
     ```
     localhost (for development)
     yourdomain.com
     ```
   - **Valid OAuth Redirect URIs:**
     ```
     https://localhost:3000/chatbot/[botId]/integration
     https://yourdomain.com/chatbot/[botId]/integration
     ```

### Step 2: Create Facebook Login for Business Configuration

1. **Navigate to Configurations**
   ```
   Facebook Login for Business > Configurations
   ```

2. **Create from Template** (Recommended)
   - Click "Create from template"
   - Select: **"WhatsApp Embedded Signup Configuration With 60 Expiration Token"**
   - This auto-configures common permissions and access levels

   **OR**

3. **Create Custom Configuration**
   - Click "Create configuration"
   - Name your configuration (e.g., "WhatsApp Onboarding Config")
   - Select login variation: **"WhatsApp Embedded Signup"**
   - Choose products to onboard
   - Select required assets and permissions:
     - ✅ WhatsApp Business Management
     - ✅ WhatsApp Business Messaging
     - ✅ Business Management
     - ✅ Pages (if needed)

4. **Capture Configuration ID**
   After creating, copy the **Configuration ID** - you'll need it in your `.env.local` file.

### Step 3: Set Environment Variables

Create or update `.env.local`:

```env
# Facebook App ID
FACEBOOK_APP_ID=your_app_id
NEXT_PUBLIC_FACEBOOK_APP_ID=your_app_id

# Facebook App Secret
FACEBOOK_APP_SECRET=your_app_secret

# Configuration ID from Step 2
NEXT_PUBLIC_FACEBOOK_LOGIN_CONFIG_ID=your_config_id_here

# Your app URL
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Step 4: Implementation Details

#### What's Included

The implementation includes:

1. **Facebook SDK Integration**
   - Automatic SDK loading on page mount
   - SDK initialization with your app credentials
   - Proper cleanup on unmount

2. **Embedded Signup Flow**
   ```javascript
   // Launches the Embedded Signup modal
   launchWhatsAppSignup()
   ```

3. **Message Event Listener**
   - Captures business customer data
   - Handles completion events
   - Tracks abandonment
   - Reports errors

4. **Token Exchange**
   - Exchanges authorization code for access token
   - Converts to long-lived token (60-day expiration)
   - Generates webhook verify token

#### Event Handling

The implementation handles three main event types:

**1. Successful Completion**
```javascript
{
  type: 'WA_EMBEDDED_SIGNUP',
  event: 'FINISH', // or 'FINISH_ONLY_WABA' or 'FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING'
  data: {
    phone_number_id: '106540352242922',
    waba_id: '524126980791429',
    business_id: '2729063490586005'
  }
}
```

**2. User Cancellation**
```javascript
{
  type: 'WA_EMBEDDED_SIGNUP',
  event: 'CANCEL',
  data: {
    current_step: 'PHONE_NUMBER_SETUP'
  }
}
```

**3. Error Reporting**
```javascript
{
  type: 'WA_EMBEDDED_SIGNUP',
  event: 'CANCEL',
  data: {
    error_message: 'Your verified name violates WhatsApp guidelines',
    error_id: '524126',
    session_id: 'f34b51dab5e0498',
    timestamp: 1746041036
  }
}
```

### Step 5: Testing

1. **Development Testing**
   ```bash
   npm run dev
   # Navigate to http://localhost:3000/chatbot/[botId]/integration
   ```

2. **Test with Your Credentials**
   - Any admin or developer on your app can test
   - Use your own Meta credentials
   - Complete the flow to verify all steps work

3. **Check Console Logs**
   - Open browser developer console
   - Monitor for event messages
   - Verify token exchange

### Step 6: Production Deployment

1. **Update Environment Variables**
   - Set production URLs in `.env.local`
   - Ensure HTTPS is enabled

2. **Add Production Domain**
   - Add to Facebook app settings
   - Update OAuth redirect URIs

3. **Test Production Flow**
   - Complete end-to-end test
   - Verify webhooks work
   - Test with real business account

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    User Journey                              │
└─────────────────────────────────────────────────────────────┘

1. User clicks "Continue with Facebook"
   │
   ├─> SDK launches Embedded Signup modal
   │
2. User goes through signup steps:
   │
   ├─> Business verification
   ├─> WhatsApp Business Account selection/creation
   ├─> Phone number setup
   ├─> Review permissions
   │
3. User completes or cancels:
   │
   ├─> COMPLETION: Message event with WABA ID, Phone Number ID
   │   └─> Auth response with exchangeable code
   │       └─> POST /api/integrations/whatsapp/exchange-token
   │           └─> Receive access token + verify token
   │               └─> Save to database
   │                   └─> WhatsApp connected! ✓
   │
   └─> CANCELLATION: Message event with current_step
       └─> Show user-friendly message
```

## API Endpoints

### POST `/api/integrations/whatsapp/exchange-token`

**Request:**
```json
{
  "code": "authorization_code_here",
  "botId": "chatbot_id_here"
}
```

**Response:**
```json
{
  "success": true,
  "accessToken": "long_lived_access_token",
  "verifyToken": "verify_token_for_webhooks",
  "message": "Token exchanged successfully"
}
```

## Security Considerations

### Implemented
✅ Origin verification for message events  
✅ HTTPS enforcement  
✅ Strict redirect URI mode  
✅ Long-lived token exchange (60-day expiration)  
✅ Secure token storage server-side  

### TODO
⚠️ Database encryption for access tokens  
⚠️ Token refresh mechanism before expiration  
⚠️ Webhook signature verification  
⚠️ Rate limiting on API endpoints  

## Common Issues & Solutions

### Issue: SDK Not Loading
**Solution:** Check browser console for errors. Ensure domain is allowed in Facebook app settings.

### Issue: Configuration ID Not Working
**Solution:** Verify the configuration ID in Facebook Login for Business > Configurations. Ensure it's properly set in environment variables.

### Issue: No Message Events Received
**Solution:** 
- Check if domain is in "Allowed domains for the JavaScript SDK"
- Verify HTTPS is enabled
- Check browser console for origin errors

### Issue: Token Exchange Fails
**Solution:**
- Verify `FACEBOOK_APP_ID` and `FACEBOOK_APP_SECRET` are correct
- Check that code hasn't expired (30-second TTL)
- Ensure API endpoint is accessible

### Issue: User Abandons Flow
**Solution:** Check the `current_step` value in the CANCEL event to identify where users are dropping off. Common steps:
- `BUSINESS_INFO` - Business verification issues
- `PHONE_NUMBER_SETUP` - Phone number problems
- `PERMISSIONS_REVIEW` - Too many permissions requested

## Abandoned Flow Screens

| `current_step` Value | Description |
|---------------------|-------------|
| `BUSINESS_INFO` | Business information/verification screen |
| `WABA_SELECTION` | WhatsApp Business Account selection |
| `PHONE_NUMBER_SETUP` | Phone number configuration |
| `PERMISSIONS_REVIEW` | Permissions review screen |
| `VERIFY_BUSINESS` | Business verification step |

## Resources

- [WhatsApp Business Platform Docs](https://developers.facebook.com/docs/whatsapp/embedded-signup)
- [Facebook JavaScript SDK Reference](https://developers.facebook.com/docs/javascript/reference)
- [Graph API Reference](https://developers.facebook.com/docs/graph-api)
- [Embedded Signup Errors](https://developers.facebook.com/docs/whatsapp/embedded-signup/errors)

## Support

For implementation issues:
1. Check Facebook Developer Community
2. Review Meta Business Help Center
3. Contact Meta Partner Support (for Solution Partners)

For application-specific issues:
- Email: support@conversly.ai
- Documentation: `/docs/WHATSAPP_INTEGRATION.md`

---

**Last Updated:** November 8, 2025  
**API Version:** v21.0  
**Embedded Signup Version:** v4
