import { NextRequest, NextResponse } from 'next/server';

/**
 * Complete WhatsApp Business Onboarding for Clients
 * This endpoint performs all 5 steps required after Embedded Signup completion
 * 
 * Reference: Meta Solution Partner Onboarding Documentation
 * https://developers.facebook.com/docs/whatsapp/embedded-signup/onboarding
 */

interface OnboardClientRequest {
  // From Embedded Signup (message event)
  wabaId: string;              // WhatsApp Business Account ID
  phoneNumberId: string;       // Business Phone Number ID
  businessId: string;          // Business Portfolio ID
  
  // From token exchange
  businessToken: string;       // Client's business access token
  
  // For phone registration
  pin: string;                 // 6-digit PIN for two-step verification
  
  // Client metadata
  botId: string;               // Your internal bot/client ID
  clientName?: string;         // Client's business name
}

interface OnboardingResult {
  success: boolean;
  step: string;
  data?: any;
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: OnboardClientRequest = await request.json();
    
    const {
      wabaId,
      phoneNumberId,
      businessId,
      businessToken,
      pin,
      botId,
      clientName
    } = body;

    // Validate required fields
    if (!wabaId || !phoneNumberId || !businessToken || !pin) {
      return NextResponse.json(
        { error: 'Missing required fields: wabaId, phoneNumberId, businessToken, pin' },
        { status: 400 }
      );
    }

    // Validate PIN format (6 digits)
    if (!/^\d{6}$/.test(pin)) {
      return NextResponse.json(
        { error: 'PIN must be exactly 6 digits' },
        { status: 400 }
      );
    }

    const results: OnboardingResult[] = [];
    const APP_ID = process.env.FACEBOOK_APP_ID!;
    const SYSTEM_TOKEN = process.env.FACEBOOK_SYSTEM_USER_TOKEN!;
    const CREDIT_LINE_ID = process.env.FACEBOOK_CREDIT_LINE_ID!;

    // Check if we have system token and credit line
    if (!SYSTEM_TOKEN) {
      console.warn('⚠️ FACEBOOK_SYSTEM_USER_TOKEN not set - skipping credit line sharing');
    }

    console.log('🚀 Starting client onboarding:', {
      botId,
      clientName,
      wabaId,
      phoneNumberId,
      businessId
    });

    // ============================================================================
    // STEP 1: Subscribe to Webhooks on Client's WABA
    // ============================================================================
    console.log('📡 Step 1: Subscribing to webhooks...');
    try {
      const webhookUrl = `https://graph.facebook.com/v24.0/${wabaId}/subscribed_apps`;
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${businessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!webhookResponse.ok) {
        const error = await webhookResponse.json();
        throw new Error(`Webhook subscription failed: ${JSON.stringify(error)}`);
      }

      const webhookData = await webhookResponse.json();
      results.push({
        success: true,
        step: 'webhook_subscription',
        data: webhookData
      });
      console.log('✅ Step 1 completed: Webhooks subscribed');
    } catch (error: any) {
      console.error('❌ Step 1 failed:', error);
      results.push({
        success: false,
        step: 'webhook_subscription',
        error: error.message
      });
      // Continue with other steps
    }

    // ============================================================================
    // STEP 2: Share Credit Line with Client (Solution Partner Only)
    // ============================================================================
    if (SYSTEM_TOKEN && CREDIT_LINE_ID) {
      console.log('💳 Step 2: Sharing credit line...');
      try {
        const creditUrl = `https://graph.facebook.com/v24.0/${CREDIT_LINE_ID}/whatsapp_credit_sharing_and_attach`;
        const creditResponse = await fetch(creditUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${SYSTEM_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            waba_currency: 'USD', // Default to USD, can be made configurable
            waba_id: wabaId
          })
        });

        if (!creditResponse.ok) {
          const error = await creditResponse.json();
          throw new Error(`Credit line sharing failed: ${JSON.stringify(error)}`);
        }

        const creditData = await creditResponse.json();
        results.push({
          success: true,
          step: 'credit_line_sharing',
          data: creditData
        });
        console.log('✅ Step 2 completed: Credit line shared');
      } catch (error: any) {
        console.error('❌ Step 2 failed:', error);
        results.push({
          success: false,
          step: 'credit_line_sharing',
          error: error.message
        });
        // Continue with other steps
      }
    } else {
      console.log('⏭️ Step 2 skipped: Credit line credentials not configured');
      results.push({
        success: true,
        step: 'credit_line_sharing',
        data: { skipped: true, reason: 'Credentials not configured' }
      });
    }

    // ============================================================================
    // STEP 3: Register Client's Phone Number
    // ============================================================================
    console.log('📱 Step 3: Registering phone number...');
    try {
      const registerUrl = `https://graph.facebook.com/v24.0/${phoneNumberId}/register`;
      const registerResponse = await fetch(registerUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${businessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          pin: pin
        })
      });

      if (!registerResponse.ok) {
        const error = await registerResponse.json();
        throw new Error(`Phone registration failed: ${JSON.stringify(error)}`);
      }

      const registerData = await registerResponse.json();
      results.push({
        success: true,
        step: 'phone_registration',
        data: registerData
      });
      console.log('✅ Step 3 completed: Phone number registered');
    } catch (error: any) {
      console.error('❌ Step 3 failed:', error);
      results.push({
        success: false,
        step: 'phone_registration',
        error: error.message
      });
      // Phone registration is critical - if this fails, stop here
      return NextResponse.json({
        success: false,
        message: 'Phone registration failed - this is a critical step',
        results,
        error: error.message
      }, { status: 500 });
    }

    // ============================================================================
    // STEP 4: Get Phone Number Details
    // ============================================================================
    console.log('📋 Step 4: Fetching phone number details...');
    try {
      const detailsUrl = `https://graph.facebook.com/v24.0/${phoneNumberId}?fields=verified_name,display_phone_number,quality_rating`;
      const detailsResponse = await fetch(detailsUrl, {
        headers: {
          'Authorization': `Bearer ${businessToken}`
        }
      });

      if (!detailsResponse.ok) {
        const error = await detailsResponse.json();
        throw new Error(`Failed to get phone details: ${JSON.stringify(error)}`);
      }

      const phoneDetails = await detailsResponse.json();
      results.push({
        success: true,
        step: 'phone_details',
        data: phoneDetails
      });
      console.log('✅ Step 4 completed: Phone details retrieved');
    } catch (error: any) {
      console.error('⚠️ Step 4 failed (non-critical):', error);
      results.push({
        success: false,
        step: 'phone_details',
        error: error.message
      });
      // Non-critical, continue
    }

    // ============================================================================
    // STEP 5: Store Client Credentials in Database
    // ============================================================================
    console.log('💾 Step 5: Saving client credentials...');
    try {
      // TODO: Replace with your actual database logic
      // This is where you store the client's WhatsApp credentials
      const clientData = {
        botId,
        clientName,
        wabaId,
        phoneNumberId,
        businessId,
        businessToken, // Encrypt this before storing!
        pin, // Encrypt this before storing!
        registeredAt: new Date().toISOString(),
        status: 'active'
      };

      // Example: await database.whatsappClients.create(clientData);
      console.log('📝 Client data ready for storage:', {
        botId,
        wabaId,
        phoneNumberId,
        businessId
      });

      results.push({
        success: true,
        step: 'database_storage',
        data: { message: 'Ready to store in database', botId }
      });
      console.log('✅ Step 5 completed: Ready for database storage');
    } catch (error: any) {
      console.error('❌ Step 5 failed:', error);
      results.push({
        success: false,
        step: 'database_storage',
        error: error.message
      });
    }

    // ============================================================================
    // Summary
    // ============================================================================
    const allSuccessful = results.every(r => r.success);
    const criticalSuccess = results
      .filter(r => ['webhook_subscription', 'phone_registration'].includes(r.step))
      .every(r => r.success);

    console.log('🏁 Onboarding completed:', {
      allSuccessful,
      criticalSuccess,
      botId,
      wabaId
    });

    return NextResponse.json({
      success: criticalSuccess,
      message: criticalSuccess 
        ? 'Client onboarded successfully! Ready to send/receive messages.'
        : 'Critical onboarding steps failed',
      botId,
      wabaId,
      phoneNumberId,
      businessId,
      results,
      nextSteps: criticalSuccess ? [
        'Configure webhook handlers to receive incoming messages',
        'Create message templates in Meta Business Manager',
        'Test sending messages using the Cloud API',
        'Implement automated reply logic'
      ] : [
        'Check the results array for specific failures',
        'Verify environment variables are set correctly',
        'Ensure business token is valid',
        'Try the onboarding process again'
      ]
    }, { status: criticalSuccess ? 200 : 500 });

  } catch (error: any) {
    console.error('❌ Onboarding error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Unknown error during onboarding',
        details: error.toString()
      },
      { status: 500 }
    );
  }
}
