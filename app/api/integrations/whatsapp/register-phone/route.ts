import { NextRequest, NextResponse } from 'next/server';

/**
 * Register Customer's Phone Number
 * 
 * Step 4 of Solution Partner onboarding
 * Registers the customer's business phone number for use with Cloud API
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessToken, phoneNumberId, pin } = body;

    if (!businessToken || !phoneNumberId) {
      return NextResponse.json(
        { error: 'Missing required parameters: businessToken and phoneNumberId' },
        { status: 400 }
      );
    }

    // Generate PIN if not provided (must be 6 digits)
    const registrationPin = pin || Math.floor(100000 + Math.random() * 900000).toString();

    if (!/^\d{6}$/.test(registrationPin)) {
      return NextResponse.json(
        { error: 'PIN must be a 6-digit number' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://graph.facebook.com/v24.0/${phoneNumberId}/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${businessToken}`
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          pin: registrationPin
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { 
          error: 'Failed to register phone number',
          details: error.error?.message || 'Unknown error'
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: 'Successfully registered phone number',
      data,
      pin: registrationPin // Return PIN for reference (should be stored securely)
    });

  } catch (error) {
    console.error('Phone registration error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

