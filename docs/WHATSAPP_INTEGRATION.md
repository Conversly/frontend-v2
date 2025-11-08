# WhatsApp Integration Setup Guide

## Overview
This guide explains how to integrate WhatsApp Business API with your Conversly chatbot using Facebook OAuth.

## Prerequisites

1. **Facebook Business Account**
   - Create an account at [business.facebook.com](https://business.facebook.com)
   - Verify your business information

2. **WhatsApp Business Account**
   - Set up through Meta Business Suite
   - Verify your phone number
   - Complete business verification

3. **Facebook App**
   - Create a Facebook app with WhatsApp product enabled
   - Configure OAuth settings

## Setup Steps

### 1. Create Facebook App

1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Click "My Apps" → "Create App"
3. Choose "Business" as app type
4. Fill in app details:
   - App Name: "Conversly WhatsApp Integration" (or your preference)
   - App Contact Email: Your email
   - Business Account: Select your business

5. Add WhatsApp Product:
   - Go to "Add Product"
   - Select "WhatsApp" → "Set Up"

### 2. Configure OAuth Settings

1. In your Facebook App, go to **Settings** → **Basic**
2. Note your **App ID** and **App Secret**
3. Add to your `.env.local`:
   ```env
   FACEBOOK_APP_ID=your_app_id_here
   FACEBOOK_APP_SECRET=your_app_secret_here
   NEXT_PUBLIC_FACEBOOK_APP_ID=your_app_id_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000  # or your production URL
   ```

4. In **Facebook Login** → **Settings**:
   - Enable "Client OAuth Login"
   - Enable "Web OAuth Login"
   - Add Valid OAuth Redirect URIs:
     ```
     http://localhost:3000/chatbot/[botId]/integration
     https://yourdomain.com/chatbot/[botId]/integration
     ```

### 3. Configure WhatsApp Business API

1. In your Facebook App, go to **WhatsApp** → **API Setup**
2. Select or create a WhatsApp Business Account
3. Add a phone number (will be used for WhatsApp Business)
4. Complete phone number verification

### 4. Set Up Webhook (After OAuth Connection)

Once connected via Facebook OAuth, you'll need to configure the webhook:

1. In **WhatsApp** → **Configuration**
2. Set Callback URL: 
   ```
   https://api.conversly.ai/webhook/whatsapp/[botId]
   ```
3. Set Verify Token: (provided after OAuth connection)
4. Subscribe to webhook fields:
   - `messages`
   - `messaging_postbacks`
   - `message_deliveries`
   - `message_reads`

### 5. Request Permissions

Your app needs the following permissions:
- `whatsapp_business_management` - Manage WhatsApp Business accounts
- `whatsapp_business_messaging` - Send and receive messages
- `business_management` - Access business information
- `pages_read_engagement` - Read page content
- `pages_manage_metadata` - Manage page settings

These are automatically requested during Facebook OAuth flow.

## How It Works

### OAuth Flow

1. **User Initiates Connection**
   - User clicks "Connect with Facebook" button
   - App redirects to Facebook OAuth dialog

2. **Facebook Authorization**
   ```
   https://www.facebook.com/v18.0/dialog/oauth?
     client_id={app_id}
     &redirect_uri={redirect_uri}
     &state={random_string}
     &scope={permissions}
     &response_type=code
   ```

3. **Callback Handler**
   - Facebook redirects back with authorization code
   - Backend exchanges code for access token
   - Fetches WhatsApp Business Account details
   - Saves configuration to database

4. **Token Exchange**
   ```javascript
   POST https://graph.facebook.com/v18.0/oauth/access_token
   {
     client_id: APP_ID,
     client_secret: APP_SECRET,
     redirect_uri: REDIRECT_URI,
     code: AUTHORIZATION_CODE
   }
   ```

5. **Fetch WhatsApp Details**
   ```javascript
   GET https://graph.facebook.com/v18.0/me/businesses?
     fields=owned_whatsapp_business_accounts{
       id,
       name,
       phone_numbers
     }
     &access_token={access_token}
   ```

### Message Flow

1. **Incoming Messages**
   ```
   WhatsApp → Webhook → Your Backend → Conversly Chatbot → Response
   ```

2. **Outgoing Messages**
   ```
   Chatbot → WhatsApp API → User
   ```

## API Endpoints

### POST /api/integrations/whatsapp/facebook-callback

Handles Facebook OAuth callback and exchanges code for tokens.

**Request Body:**
```json
{
  "code": "string",
  "state": "string",
  "botId": "string"
}
```

**Response:**
```json
{
  "success": true,
  "phoneNumberId": "string",
  "accessToken": "string",
  "verifyToken": "string",
  "businessAccountId": "string",
  "displayPhoneNumber": "string",
  "verifiedName": "string"
}
```

## Environment Variables

Create a `.env.local` file in your project root:

```env
# Facebook App Credentials
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
NEXT_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id

# App URL (use localhost for development)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# WhatsApp API Configuration (optional, if using direct API)
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
```

## Security Best Practices

1. **Never expose App Secret**
   - Keep `FACEBOOK_APP_SECRET` server-side only
   - Don't commit secrets to version control

2. **Validate State Parameter**
   - Always verify state to prevent CSRF attacks
   - Use secure random strings

3. **Store Tokens Securely**
   - Encrypt access tokens in database
   - Use environment variables for sensitive data

4. **Implement Token Refresh**
   - User access tokens expire
   - Exchange for long-lived tokens
   - Implement refresh mechanism

5. **Verify Webhook Requests**
   - Use verify token to validate webhook calls
   - Verify signature of incoming requests

## Troubleshooting

### Common Issues

1. **OAuth Redirect URI Mismatch**
   - Ensure redirect URI in code matches Facebook app settings
   - Check for trailing slashes

2. **Missing Permissions**
   - Verify all required permissions are enabled
   - Re-authenticate if permissions changed

3. **No WhatsApp Business Accounts Found**
   - Ensure WhatsApp Business is set up in Meta Business Suite
   - User must have admin access to the account

4. **Token Expired**
   - Implement token refresh flow
   - Exchange short-lived for long-lived tokens

### Debug Mode

Enable detailed logging in development:

```javascript
// In your API route
console.log('OAuth Code:', code);
console.log('Access Token Response:', tokenData);
console.log('WhatsApp Accounts:', wabsData);
```

## Testing

1. **Development Testing**
   - Use test phone numbers provided by Meta
   - Test in WhatsApp API sandbox

2. **Production Testing**
   - Complete Business Verification
   - Use real phone numbers
   - Test webhook deliverability

## Resources

- [WhatsApp Business API Documentation](https://developers.facebook.com/docs/whatsapp)
- [Facebook OAuth Documentation](https://developers.facebook.com/docs/facebook-login)
- [Meta Business Suite](https://business.facebook.com)
- [WhatsApp Business API Setup Guide](https://developers.facebook.com/docs/whatsapp/getting-started)

## Support

For issues or questions:
- Check [Facebook Developer Community](https://developers.facebook.com/community/)
- Review [WhatsApp Business API Changelog](https://developers.facebook.com/docs/whatsapp/changelog)
- Contact Conversly support at support@conversly.ai
