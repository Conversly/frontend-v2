import { NextRequest, NextResponse } from 'next/server';

/**
 * Send Test Message
 * 
 * Step 5 of Solution Partner onboarding (optional)
 * Sends a test message to verify messaging capabilities
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessToken, phoneNumberId, recipientPhoneNumber, messageBody } = body;

    if (!businessToken || !phoneNumberId || !recipientPhoneNumber || !messageBody) {
      return NextResponse.json(
        { 
          error: 'Missing required parameters',
          required: ['businessToken', 'phoneNumberId', 'recipientPhoneNumber', 'messageBody']
        },
        { status: 400 }
      );
    }

    // Validate message body length (max 4096 characters)
    if (messageBody.length > 4096) {
      return NextResponse.json(
        { error: 'Message body exceeds maximum length of 4096 characters' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://graph.facebook.com/v24.0/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${businessToken}`
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: recipientPhoneNumber,
          type: 'text',
          text: {
            body: messageBody
          }
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { 
          error: 'Failed to send test message',
          details: error.error?.message || 'Unknown error'
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: 'Successfully sent test message',
      data: {
        messageId: data.messages?.[0]?.id,
        whatsappUserId: data.contacts?.[0]?.wa_id,
        recipient: data.contacts?.[0]?.input
      }
    });

  } catch (error) {
    console.error('Test message error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

