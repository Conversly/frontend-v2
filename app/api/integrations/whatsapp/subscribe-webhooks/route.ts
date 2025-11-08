import { NextRequest, NextResponse } from 'next/server';

/**
 * Subscribe to Webhooks on Customer's WABA
 * 
 * Step 2 of Solution Partner onboarding
 * Subscribes your app to webhooks on the business customer's WABA
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessToken, wabaId } = body;

    if (!businessToken || !wabaId) {
      return NextResponse.json(
        { error: 'Missing required parameters: businessToken and wabaId' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://graph.facebook.com/v21.0/${wabaId}/subscribed_apps`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${businessToken}`
        }
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { 
          error: 'Failed to subscribe to webhooks',
          details: error.error?.message || 'Unknown error'
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to webhooks',
      data
    });

  } catch (error) {
    console.error('Webhook subscription error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

