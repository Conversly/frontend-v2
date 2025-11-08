import { NextRequest, NextResponse } from 'next/server';

/**
 * Facebook OAuth Callback Handler for WhatsApp Integration
 * 
 * This endpoint handles the OAuth callback from Facebook and exchanges
 * the authorization code for access tokens to connect WhatsApp Business API.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, state, botId } = body;

    if (!code || !state || !botId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Verify state to prevent CSRF attacks
    // In production, verify this against stored state in session/database
    
    const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
    const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
    const REDIRECT_URI = process.env.FACEBOOK_REDIRECT_URI || 
      `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/whatsapp/facebook-callback`;

    if (!FACEBOOK_APP_ID || !FACEBOOK_APP_SECRET) {
      return NextResponse.json(
        { error: 'Facebook app credentials not configured' },
        { status: 500 }
      );
    }

    // Step 1: Exchange authorization code for access token
    const tokenResponse = await fetch(
      `https://graph.facebook.com/v24.0/oauth/access_token?` +
      `client_id=${FACEBOOK_APP_ID}` +
      `&client_secret=${FACEBOOK_APP_SECRET}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&code=${code}`
    );

    if (!tokenResponse.ok) {
      const error = await tokenResponse.json();
      console.error('Facebook token exchange error:', error);
      return NextResponse.json(
        { error: 'Failed to exchange code for token' },
        { status: 400 }
      );
    }

    const tokenData = await tokenResponse.json();
    const { access_token: userAccessToken } = tokenData;

    // Step 2: Get WhatsApp Business Accounts associated with the user
    const wabsResponse = await fetch(
      `https://graph.facebook.com/v18.0/me/businesses?` +
      `fields=owned_whatsapp_business_accounts{id,name,phone_numbers}` +
      `&access_token=${userAccessToken}`
    );

    if (!wabsResponse.ok) {
      const error = await wabsResponse.json();
      console.error('Failed to fetch WhatsApp Business Accounts:', error);
      return NextResponse.json(
        { error: 'Failed to fetch WhatsApp Business Accounts' },
        { status: 400 }
      );
    }

    const wabsData = await wabsResponse.json();
    
    // Get the first WhatsApp Business Account and Phone Number
    const businesses = wabsData.data || [];
    if (businesses.length === 0) {
      return NextResponse.json(
        { error: 'No WhatsApp Business Accounts found' },
        { status: 404 }
      );
    }

    const firstBusiness = businesses[0];
    const whatsappAccounts = firstBusiness.owned_whatsapp_business_accounts?.data || [];
    
    if (whatsappAccounts.length === 0) {
      return NextResponse.json(
        { error: 'No WhatsApp accounts found in your business' },
        { status: 404 }
      );
    }

    const whatsappAccount = whatsappAccounts[0];
    const phoneNumbers = whatsappAccount.phone_numbers?.data || [];
    
    if (phoneNumbers.length === 0) {
      return NextResponse.json(
        { error: 'No phone numbers found in your WhatsApp account' },
        { status: 404 }
      );
    }

    const phoneNumber = phoneNumbers[0];

    // Step 3: Get or create a permanent access token for the WABA
    // In production, you should request a System User Token or use token exchange
    const permanentTokenResponse = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?` +
      `grant_type=fb_exchange_token` +
      `&client_id=${FACEBOOK_APP_ID}` +
      `&client_secret=${FACEBOOK_APP_SECRET}` +
      `&fb_exchange_token=${userAccessToken}`
    );

    const permanentTokenData = await permanentTokenResponse.json();
    const permanentAccessToken = permanentTokenData.access_token || userAccessToken;

    // Step 4: Generate a verify token for webhook validation
    const verifyToken = `verify_${botId}_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Step 5: Save the configuration to your database
    // TODO: Replace with actual database save
    // await saveWhatsAppConfig({
    //   botId,
    //   phoneNumberId: phoneNumber.id,
    //   accessToken: permanentAccessToken,
    //   verifyToken,
    //   businessAccountId: whatsappAccount.id,
    //   displayPhoneNumber: phoneNumber.display_phone_number,
    //   verifiedName: phoneNumber.verified_name
    // });

    // Step 6: Subscribe to webhook events (optional, can be done separately)
    // const subscribeResponse = await fetch(
    //   `https://graph.facebook.com/v18.0/${whatsappAccount.id}/subscribed_apps`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       access_token: permanentAccessToken,
    //     }),
    //   }
    // );

    return NextResponse.json({
      success: true,
      phoneNumberId: phoneNumber.id,
      accessToken: permanentAccessToken,
      verifyToken,
      businessAccountId: whatsappAccount.id,
      displayPhoneNumber: phoneNumber.display_phone_number,
      verifiedName: phoneNumber.verified_name,
      message: 'WhatsApp Business connected successfully'
    });

  } catch (error) {
    console.error('Facebook callback error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
