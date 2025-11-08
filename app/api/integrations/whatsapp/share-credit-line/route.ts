import { NextRequest, NextResponse } from 'next/server';

/**
 * Share Credit Line with Customer
 * 
 * Step 3 of Solution Partner onboarding
 * Shares your extended credit line with an onboarded business customer
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { wabaId, currency = 'USD' } = body;

    if (!wabaId) {
      return NextResponse.json(
        { error: 'Missing required parameter: wabaId' },
        { status: 400 }
      );
    }

    const SYSTEM_TOKEN = process.env.FACEBOOK_SYSTEM_TOKEN;
    const EXTENDED_CREDIT_LINE_ID = process.env.FACEBOOK_EXTENDED_CREDIT_LINE_ID;

    if (!SYSTEM_TOKEN || !EXTENDED_CREDIT_LINE_ID) {
      return NextResponse.json(
        { 
          error: 'System token or credit line ID not configured',
          message: 'Please set FACEBOOK_SYSTEM_TOKEN and FACEBOOK_EXTENDED_CREDIT_LINE_ID in your environment variables'
        },
        { status: 500 }
      );
    }

    // Validate currency
    const validCurrencies = ['AUD', 'EUR', 'GBP', 'IDR', 'INR', 'USD'];
    if (!validCurrencies.includes(currency)) {
      return NextResponse.json(
        { 
          error: 'Invalid currency',
          message: `Currency must be one of: ${validCurrencies.join(', ')}`
        },
        { status: 400 }
      );
    }

    const url = new URL(
      `https://graph.facebook.com/v24.0/${EXTENDED_CREDIT_LINE_ID}/whatsapp_credit_sharing_and_attach`
    );
    url.searchParams.append('waba_currency', currency);
    url.searchParams.append('waba_id', wabaId);

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SYSTEM_TOKEN}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { 
          error: 'Failed to share credit line',
          details: error.error?.message || 'Unknown error'
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: 'Successfully shared credit line with customer',
      data: {
        allocationConfigId: data.allocation_config_id,
        wabaId: data.waba_id
      }
    });

  } catch (error) {
    console.error('Credit line sharing error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

