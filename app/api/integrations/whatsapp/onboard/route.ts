import { NextRequest, NextResponse } from 'next/server';

/**
 * Solution Partner Onboarding Endpoint
 * 
 * This endpoint orchestrates all the steps required to onboard a business customer
 * after they complete the Embedded Signup flow:
 * 
 * 1. Exchange token code for business token (already done in exchange-token)
 * 2. Subscribe to webhooks on customer's WABA
 * 3. Share credit line with customer
 * 4. Register customer's phone number
 * 5. (Optional) Send test message
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      businessToken,
      wabaId,
      phoneNumberId,
      botId,
      currency = 'USD',
      testMessagePhoneNumber,
      testMessageBody
    } = body;

    // Validate required parameters
    if (!businessToken || !wabaId || !phoneNumberId || !botId) {
      return NextResponse.json(
        { 
          error: 'Missing required parameters',
          required: ['businessToken', 'wabaId', 'phoneNumberId', 'botId']
        },
        { status: 400 }
      );
    }

    const results: any = {
      step1: { status: 'skipped', message: 'Token exchange already completed' },
      step2: null,
      step3: null,
      step4: null,
      step5: null
    };

    // Step 2: Subscribe to webhooks on customer's WABA
    try {
      const subscribeResponse = await fetch(
        `https://graph.facebook.com/v21.0/${wabaId}/subscribed_apps`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${businessToken}`
          }
        }
      );

      if (!subscribeResponse.ok) {
        const error = await subscribeResponse.json();
        throw new Error(error.error?.message || 'Failed to subscribe to webhooks');
      }

      const subscribeData = await subscribeResponse.json();
      results.step2 = {
        status: 'success',
        message: 'Successfully subscribed to webhooks',
        data: subscribeData
      };
    } catch (error) {
      results.step2 = {
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to subscribe to webhooks',
        error: error
      };
    }

    // Step 3: Share credit line with customer
    const SYSTEM_TOKEN = process.env.FACEBOOK_SYSTEM_TOKEN;
    const EXTENDED_CREDIT_LINE_ID = process.env.FACEBOOK_EXTENDED_CREDIT_LINE_ID;

    if (SYSTEM_TOKEN && EXTENDED_CREDIT_LINE_ID) {
      try {
        const creditLineUrl = new URL(
          `https://graph.facebook.com/v21.0/${EXTENDED_CREDIT_LINE_ID}/whatsapp_credit_sharing_and_attach`
        );
        creditLineUrl.searchParams.append('waba_currency', currency);
        creditLineUrl.searchParams.append('waba_id', wabaId);

        const creditLineResponse = await fetch(creditLineUrl.toString(), {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${SYSTEM_TOKEN}`
          }
        });

        if (!creditLineResponse.ok) {
          const error = await creditLineResponse.json();
          throw new Error(error.error?.message || 'Failed to share credit line');
        }

        const creditLineData = await creditLineResponse.json();
        results.step3 = {
          status: 'success',
          message: 'Successfully shared credit line',
          data: creditLineData
        };
      } catch (error) {
        results.step3 = {
          status: 'error',
          message: error instanceof Error ? error.message : 'Failed to share credit line',
          error: error
        };
      }
    } else {
      results.step3 = {
        status: 'skipped',
        message: 'System token or credit line ID not configured'
      };
    }

    // Step 4: Register customer's phone number
    try {
      // Generate a 6-digit PIN for two-step verification
      const pin = Math.floor(100000 + Math.random() * 900000).toString();

      const registerResponse = await fetch(
        `https://graph.facebook.com/v21.0/${phoneNumberId}/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${businessToken}`
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            pin: pin
          })
        }
      );

      if (!registerResponse.ok) {
        const error = await registerResponse.json();
        throw new Error(error.error?.message || 'Failed to register phone number');
      }

      const registerData = await registerResponse.json();
      results.step4 = {
        status: 'success',
        message: 'Successfully registered phone number',
        data: registerData,
        pin: pin // Return PIN for reference (should be stored securely)
      };
    } catch (error) {
      results.step4 = {
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to register phone number',
        error: error
      };
    }

    // Step 5: Send test message (optional)
    if (testMessagePhoneNumber && testMessageBody) {
      try {
        const messageResponse = await fetch(
          `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${businessToken}`
            },
            body: JSON.stringify({
              messaging_product: 'whatsapp',
              recipient_type: 'individual',
              to: testMessagePhoneNumber,
              type: 'text',
              text: {
                body: testMessageBody
              }
            })
          }
        );

        if (!messageResponse.ok) {
          const error = await messageResponse.json();
          throw new Error(error.error?.message || 'Failed to send test message');
        }

        const messageData = await messageResponse.json();
        results.step5 = {
          status: 'success',
          message: 'Successfully sent test message',
          data: messageData
        };
      } catch (error) {
        results.step5 = {
          status: 'error',
          message: error instanceof Error ? error.message : 'Failed to send test message',
          error: error
        };
      }
    } else {
      results.step5 = {
        status: 'skipped',
        message: 'Test message not requested'
      };
    }

    // Determine overall success
    const criticalSteps = [results.step2, results.step4];
    const hasErrors = criticalSteps.some(step => step?.status === 'error');
    const allCriticalSuccess = criticalSteps.every(step => step?.status === 'success' || step?.status === 'skipped');

    // TODO: Save onboarding results to database
    // await saveOnboardingResults({
    //   botId,
    //   wabaId,
    //   phoneNumberId,
    //   results,
    //   completedAt: new Date()
    // });

    return NextResponse.json({
      success: !hasErrors && allCriticalSuccess,
      message: hasErrors 
        ? 'Onboarding completed with some errors. Check individual steps for details.'
        : 'Onboarding completed successfully',
      results,
      wabaId,
      phoneNumberId
    });

  } catch (error) {
    console.error('Onboarding error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

