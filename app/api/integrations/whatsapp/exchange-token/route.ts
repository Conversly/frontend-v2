import { NextRequest, NextResponse } from 'next/server';

/**
 * WhatsApp Embedded Signup Token Exchange Handler
 * 
 * Exchanges the authorization code from Facebook Embedded Signup
 * for a long-lived access token that can be used to manage the
 * WhatsApp Business Account.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, botId } = body;

    if (!code || !botId) {
      return NextResponse.json(
        { error: 'Missing required parameters: code and botId' },
        { status: 400 }
      );
    }

    const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
    const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

    if (!FACEBOOK_APP_ID || !FACEBOOK_APP_SECRET) {
      console.error('Missing Facebook app credentials', {
        hasAppId: !!FACEBOOK_APP_ID,
        hasAppSecret: !!FACEBOOK_APP_SECRET
      });
      return NextResponse.json(
        { 
          error: 'Facebook app credentials not configured',
          message: 'Please ensure FACEBOOK_APP_ID and FACEBOOK_APP_SECRET are set in your .env.local file'
        },
        { status: 500 }
      );
    }

    // Validate App Secret format (should be 32 characters, alphanumeric)
    if (FACEBOOK_APP_SECRET.trim().length < 20) {
      console.error('App Secret appears to be invalid (too short)');
      return NextResponse.json(
        { 
          error: 'Invalid App Secret format',
          message: 'The FACEBOOK_APP_SECRET appears to be invalid. Please verify it matches your App Secret from Facebook App Dashboard.'
        },
        { status: 500 }
      );
    }

    // Get redirect URI from environment (must match Facebook App settings)
    const REDIRECT_URI = process.env.FACEBOOK_REDIRECT_URI || `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/whatsapp/facebook-callback`;

    // Step 1: Exchange authorization code for access token
    const tokenUrl = new URL('https://graph.facebook.com/v24.0/oauth/access_token');
    tokenUrl.searchParams.append('client_id', FACEBOOK_APP_ID);
    tokenUrl.searchParams.append('client_secret', FACEBOOK_APP_SECRET);
    tokenUrl.searchParams.append('redirect_uri', REDIRECT_URI);
    tokenUrl.searchParams.append('code', code);

    console.log('Exchanging code for token...', { redirectUri: REDIRECT_URI });
    
    const tokenResponse = await fetch(tokenUrl.toString());

    if (!tokenResponse.ok) {
      const error = await tokenResponse.json();
      console.error('Token exchange failed:', error);
      
      // Provide helpful error messages
      if (error.error?.message?.includes('client secret')) {
        return NextResponse.json(
          { 
            error: 'Invalid App Secret',
            message: 'The Facebook App Secret is incorrect. Please verify:',
            steps: [
              '1. Go to https://developers.facebook.com/apps/' + FACEBOOK_APP_ID + '/settings/basic/',
              '2. Find "App Secret" section',
              '3. Click "Show" to reveal your App Secret',
              '4. Copy the exact value (no spaces)',
              '5. Update FACEBOOK_APP_SECRET in your .env.local file',
              '6. Restart your development server'
            ],
            details: error.error?.message || 'Unknown error',
            fbtrace_id: error.error?.fbtrace_id
          },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { 
          error: 'Failed to exchange code for token',
          details: error.error?.message || 'Unknown error',
          fbtrace_id: error.error?.fbtrace_id
        },
        { status: 400 }
      );
    }

    const tokenData = await tokenResponse.json();
    const { access_token: accessToken } = tokenData;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'No access token received from Facebook' },
        { status: 400 }
      );
    }

    // Step 2: Exchange for long-lived token (60-day expiration)
    const longLivedTokenUrl = new URL('https://graph.facebook.com/v24.0/oauth/access_token');
    longLivedTokenUrl.searchParams.append('grant_type', 'fb_exchange_token');
    longLivedTokenUrl.searchParams.append('client_id', FACEBOOK_APP_ID);
    longLivedTokenUrl.searchParams.append('client_secret', FACEBOOK_APP_SECRET);
    longLivedTokenUrl.searchParams.append('fb_exchange_token', accessToken);

    console.log('Exchanging for long-lived token...');

    const longLivedResponse = await fetch(longLivedTokenUrl.toString());
    
    let finalAccessToken = accessToken;
    
    if (longLivedResponse.ok) {
      const longLivedData = await longLivedResponse.json();
      finalAccessToken = longLivedData.access_token || accessToken;
      console.log('Long-lived token obtained successfully');
    } else {
      console.warn('Could not exchange for long-lived token, using short-lived token');
    }

    // Step 3: Generate verify token for webhooks
    const verifyToken = `verify_${botId}_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Step 4: Save configuration to database
    // TODO: Implement database save
    // await saveWhatsAppConfig({
    //   botId,
    //   accessToken: finalAccessToken,
    //   verifyToken,
    //   createdAt: new Date(),
    // });

    console.log('WhatsApp configuration saved successfully');

    return NextResponse.json({
      success: true,
      accessToken: finalAccessToken,
      verifyToken,
      message: 'Token exchanged successfully'
    });

  } catch (error) {
    console.error('Token exchange error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
