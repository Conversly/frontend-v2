# Solution Partner Onboarding Implementation

This document describes the implementation of the Solution Partner onboarding flow for WhatsApp Embedded Signup, as per Meta's official documentation.

## Overview

After a business customer completes the Embedded Signup flow, Solution Partners must perform several API calls to fully onboard the customer. This implementation automates all required onboarding steps.

## Onboarding Steps

### Step 1: Exchange Token Code for Business Token ✅
**Status:** Already implemented in `/api/integrations/whatsapp/exchange-token`

Exchanges the authorization code returned by Embedded Signup for a business integration system user access token ("business token").

### Step 2: Subscribe to Webhooks on Customer's WABA ✅
**Endpoint:** `POST /api/integrations/whatsapp/subscribe-webhooks`

Subscribes your app to webhooks on the business customer's WABA. This allows your app to receive webhook events from the customer's WhatsApp Business Account.

**Request:**
```json
{
  "businessToken": "EAAAN6tcBzAUBO...",
  "wabaId": "102290129340398"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to webhooks",
  "data": {
    "success": true
  }
}
```

### Step 3: Share Credit Line with Customer ✅
**Endpoint:** `POST /api/integrations/whatsapp/share-credit-line`

Shares your extended credit line with an onboarded business customer. This step requires:
- System user access token (`FACEBOOK_SYSTEM_TOKEN`)
- Extended credit line ID (`FACEBOOK_EXTENDED_CREDIT_LINE_ID`)

**Request:**
```json
{
  "wabaId": "102290129340398",
  "currency": "USD"
}
```

**Supported Currencies:**
- AUD (Australian Dollar)
- EUR (Euro)
- GBP (British Pound)
- IDR (Indonesian Rupiah)
- INR (Indian Rupee)
- USD (US Dollar)

**Response:**
```json
{
  "success": true,
  "message": "Successfully shared credit line with customer",
  "data": {
    "allocationConfigId": "58501441721238",
    "wabaId": "102290129340398"
  }
}
```

### Step 4: Register Customer's Phone Number ✅
**Endpoint:** `POST /api/integrations/whatsapp/register-phone`

Registers the customer's business phone number for use with Cloud API. This sets up two-step verification with a 6-digit PIN.

**Request:**
```json
{
  "businessToken": "EAAAN6tcBzAUBO...",
  "phoneNumberId": "106540352242922",
  "pin": "581063" // Optional - will be auto-generated if not provided
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully registered phone number",
  "data": {
    "success": true
  },
  "pin": "581063"
}
```

**Note:** The PIN should be stored securely as it's required for two-step verification.

### Step 5: Send Test Message (Optional) ✅
**Endpoint:** `POST /api/integrations/whatsapp/send-test-message`

Sends a test message to verify messaging capabilities. This step is optional but recommended for testing.

**Request:**
```json
{
  "businessToken": "EAAAN6tcBzAUBO...",
  "phoneNumberId": "106540352242922",
  "recipientPhoneNumber": "+16505551234",
  "messageBody": "Message received, loud and clear!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully sent test message",
  "data": {
    "messageId": "wamid.HBgLMTY0NjcwNDM1OTUVAgARGBI1RjQyNUE3NEYxMzAzMzQ5MkEA",
    "whatsappUserId": "16505551234",
    "recipient": "+16505551234"
  }
}
```

## Main Onboarding Endpoint

**Endpoint:** `POST /api/integrations/whatsapp/onboard`

This endpoint orchestrates all onboarding steps (2-5) in a single call. It's automatically called by the frontend after token exchange completes.

**Request:**
```json
{
  "businessToken": "EAAAN6tcBzAUBO...",
  "wabaId": "102290129340398",
  "phoneNumberId": "106540352242922",
  "botId": "your-bot-id",
  "currency": "USD",
  "testMessagePhoneNumber": "+16505551234", // Optional
  "testMessageBody": "Test message" // Optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Onboarding completed successfully",
  "results": {
    "step1": {
      "status": "skipped",
      "message": "Token exchange already completed"
    },
    "step2": {
      "status": "success",
      "message": "Successfully subscribed to webhooks",
      "data": { "success": true }
    },
    "step3": {
      "status": "success",
      "message": "Successfully shared credit line",
      "data": {
        "allocationConfigId": "58501441721238",
        "wabaId": "102290129340398"
      }
    },
    "step4": {
      "status": "success",
      "message": "Successfully registered phone number",
      "data": { "success": true },
      "pin": "581063"
    },
    "step5": {
      "status": "success",
      "message": "Successfully sent test message",
      "data": { ... }
    }
  },
  "wabaId": "102290129340398",
  "phoneNumberId": "106540352242922"
}
```

## Environment Variables

Add these to your `.env.local` file:

```env
# Required - Already configured
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret
NEXT_PUBLIC_FACEBOOK_APP_ID=your_app_id
NEXT_PUBLIC_FACEBOOK_LOGIN_CONFIG_ID=your_config_id

# Required for Step 3 (Credit Line Sharing)
FACEBOOK_SYSTEM_TOKEN=your_system_user_access_token
FACEBOOK_EXTENDED_CREDIT_LINE_ID=your_extended_credit_line_id
```

### Getting Your System Token

1. Go to [Meta Business Manager](https://business.facebook.com)
2. Navigate to **Business Settings** → **System Users**
3. Create or select a system user
4. Generate a new access token with the following permissions:
   - `whatsapp_business_management`
   - `whatsapp_business_messaging`
   - `business_management`
5. Copy the token to `FACEBOOK_SYSTEM_TOKEN`

### Getting Your Extended Credit Line ID

1. Go to [Meta Business Manager](https://business.facebook.com)
2. Navigate to **Business Settings** → **Business Info**
3. Find your **Extended Credit Line ID**
4. Copy it to `FACEBOOK_EXTENDED_CREDIT_LINE_ID`

**OR** via API:
```bash
curl -X GET "https://graph.facebook.com/v21.0/me/extended_credit?access_token=YOUR_SYSTEM_TOKEN"
```

## Frontend Integration

The onboarding flow is automatically triggered after Embedded Signup completes:

1. User completes Embedded Signup flow
2. `handleEmbeddedSignupEvent` captures WABA ID and Phone Number ID
3. `handleFacebookCallback` exchanges code for business token
4. Onboarding endpoint is called automatically with all required data
5. User sees success/error notifications for each step

## Error Handling

The onboarding endpoint handles errors gracefully:

- **Critical Steps (2, 4):** If these fail, onboarding is marked as incomplete
- **Optional Steps (3, 5):** Failures are logged but don't block completion
- **Step 3:** Skipped if system token or credit line ID not configured
- **Step 5:** Skipped if test message parameters not provided

All errors are logged to the console and returned in the response for debugging.

## Testing

### Manual Testing

You can test individual endpoints using curl or Postman:

```bash
# Test webhook subscription
curl -X POST http://localhost:3000/api/integrations/whatsapp/subscribe-webhooks \
  -H "Content-Type: application/json" \
  -d '{
    "businessToken": "YOUR_BUSINESS_TOKEN",
    "wabaId": "YOUR_WABA_ID"
  }'

# Test credit line sharing
curl -X POST http://localhost:3000/api/integrations/whatsapp/share-credit-line \
  -H "Content-Type: application/json" \
  -d '{
    "wabaId": "YOUR_WABA_ID",
    "currency": "USD"
  }'

# Test phone registration
curl -X POST http://localhost:3000/api/integrations/whatsapp/register-phone \
  -H "Content-Type: application/json" \
  -d '{
    "businessToken": "YOUR_BUSINESS_TOKEN",
    "phoneNumberId": "YOUR_PHONE_NUMBER_ID"
  }'
```

### End-to-End Testing

1. Navigate to `/chatbot/[botId]/integration`
2. Click "Continue with Facebook"
3. Complete the Embedded Signup flow
4. Check browser console for onboarding results
5. Verify all steps completed successfully

## Troubleshooting

### Step 2 Fails: Webhook Subscription
- **Error:** "Failed to subscribe to webhooks"
- **Solution:** Ensure the business token has `whatsapp_business_management` permission

### Step 3 Fails: Credit Line Sharing
- **Error:** "System token or credit line ID not configured"
- **Solution:** Add `FACEBOOK_SYSTEM_TOKEN` and `FACEBOOK_EXTENDED_CREDIT_LINE_ID` to `.env.local`
- **Error:** "Failed to share credit line"
- **Solution:** Ensure system user has access to the WABA and credit line

### Step 4 Fails: Phone Registration
- **Error:** "Failed to register phone number"
- **Solution:** Ensure business token has `whatsapp_business_messaging` permission
- **Note:** Phone number must be verified in Meta Business Suite first

### Step 5 Fails: Test Message
- **Error:** "Failed to send test message"
- **Solution:** 
  - Ensure recipient phone number can receive WhatsApp messages
  - Verify phone number is registered (Step 4)
  - Check that you're not using a business phone number as recipient

## Security Notes

1. **Never expose system tokens** - Keep `FACEBOOK_SYSTEM_TOKEN` server-side only
2. **Store PINs securely** - Phone registration PINs should be encrypted in database
3. **Validate all inputs** - All endpoints validate required parameters
4. **Use HTTPS** - All API calls use HTTPS endpoints

## Next Steps

After onboarding completes:

1. **Configure Webhooks:** Set up your webhook endpoint to receive messages
2. **Verify Webhook:** Use the verify token to validate webhook requests
3. **Test Messaging:** Send and receive test messages
4. **Monitor Usage:** Track message usage and billing

## References

- [Meta WhatsApp Business Platform Documentation](https://developers.facebook.com/docs/whatsapp)
- [Solution Partner Onboarding Guide](https://developers.facebook.com/docs/whatsapp/embedded-signup/onboarding-business-customers)

