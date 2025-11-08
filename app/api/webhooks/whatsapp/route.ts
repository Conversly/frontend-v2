import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * WhatsApp Cloud API Webhook Handler
 * 
 * This endpoint receives webhooks from Meta WhatsApp Business Platform:
 * - Incoming messages from customers
 * - Message delivery status updates
 * - Message read receipts
 * - Template status updates
 * 
 * Documentation: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks
 */

// Webhook verification (GET request)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN;

  console.log('📞 Webhook verification request received');
  console.log('Mode:', mode);
  console.log('Token:', token);

  // Check if mode and token are correct
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('✅ Webhook verified successfully');
    return new NextResponse(challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    });
  } else {
    console.error('❌ Webhook verification failed');
    console.error('Expected token:', VERIFY_TOKEN);
    console.error('Received token:', token);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 403 }
    );
  }
}

// Webhook events (POST request)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('📨 Webhook event received:', JSON.stringify(body, null, 2));

    // Verify webhook signature (recommended for production)
    const signature = request.headers.get('x-hub-signature-256');
    if (signature && process.env.FACEBOOK_APP_SECRET) {
      const isValid = verifyWebhookSignature(
        await request.text(),
        signature,
        process.env.FACEBOOK_APP_SECRET
      );
      
      if (!isValid) {
        console.error('❌ Invalid webhook signature');
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }
    }

    // Process webhook entries
    if (body.object === 'whatsapp_business_account') {
      for (const entry of body.entry) {
        const businessAccountId = entry.id;
        
        for (const change of entry.changes) {
          const { field, value } = change;

          // Handle different webhook types
          if (field === 'messages') {
            await handleMessagesWebhook(businessAccountId, value);
          } else if (field === 'message_template_status_update') {
            await handleTemplateStatusUpdate(businessAccountId, value);
          } else {
            console.log(`ℹ️ Unhandled webhook field: ${field}`);
          }
        }
      }
    }

    // Always return 200 OK to acknowledge receipt
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    console.error('❌ Webhook processing error:', error);
    // Still return 200 to prevent Meta from retrying
    return NextResponse.json({ success: true }, { status: 200 });
  }
}

/**
 * Handle incoming messages webhook
 */
async function handleMessagesWebhook(businessAccountId: string, value: any) {
  const { metadata, contacts, messages, statuses } = value;

  // Get phone number ID that received the message
  const phoneNumberId = metadata?.phone_number_id;
  const displayPhoneNumber = metadata?.display_phone_number;

  console.log('📱 Message webhook for phone:', displayPhoneNumber);

  // Process incoming messages
  if (messages && messages.length > 0) {
    for (const message of messages) {
      await handleIncomingMessage(phoneNumberId, businessAccountId, message, contacts);
    }
  }

  // Process message status updates (sent, delivered, read, failed)
  if (statuses && statuses.length > 0) {
    for (const status of statuses) {
      await handleMessageStatus(phoneNumberId, businessAccountId, status);
    }
  }
}

/**
 * Handle individual incoming message
 */
async function handleIncomingMessage(
  phoneNumberId: string,
  businessAccountId: string,
  message: any,
  contacts: any[]
) {
  const messageId = message.id;
  const from = message.from; // Customer's WhatsApp number
  const timestamp = message.timestamp;
  const type = message.type; // text, image, audio, video, document, etc.

  // Get customer profile info
  const contact = contacts?.find(c => c.wa_id === from);
  const customerName = contact?.profile?.name || 'Unknown';

  console.log('💬 New message received:');
  console.log('  From:', customerName, `(${from})`);
  console.log('  Type:', type);
  console.log('  Message ID:', messageId);

  // TODO: Find which bot/client this phone number belongs to
  // Example: const botId = await database.findBotByPhoneNumberId(phoneNumberId);

  // Process different message types
  let messageContent = '';

  switch (type) {
    case 'text':
      messageContent = message.text?.body || '';
      console.log('  Content:', messageContent);
      break;

    case 'image':
      const imageId = message.image?.id;
      const imageCaption = message.image?.caption || '';
      console.log('  Image ID:', imageId);
      console.log('  Caption:', imageCaption);
      messageContent = imageCaption || '[Image]';
      // TODO: Download image using Media API
      break;

    case 'audio':
      const audioId = message.audio?.id;
      console.log('  Audio ID:', audioId);
      messageContent = '[Voice message]';
      // TODO: Download audio using Media API
      break;

    case 'video':
      const videoId = message.video?.id;
      const videoCaption = message.video?.caption || '';
      console.log('  Video ID:', videoId);
      messageContent = videoCaption || '[Video]';
      // TODO: Download video using Media API
      break;

    case 'document':
      const documentId = message.document?.id;
      const documentFilename = message.document?.filename || 'document';
      console.log('  Document ID:', documentId);
      console.log('  Filename:', documentFilename);
      messageContent = `[Document: ${documentFilename}]`;
      // TODO: Download document using Media API
      break;

    case 'location':
      const latitude = message.location?.latitude;
      const longitude = message.location?.longitude;
      console.log('  Location:', latitude, longitude);
      messageContent = `[Location: ${latitude}, ${longitude}]`;
      break;

    case 'button':
      const buttonText = message.button?.text;
      const buttonPayload = message.button?.payload;
      console.log('  Button:', buttonText, buttonPayload);
      messageContent = buttonText || '';
      break;

    case 'interactive':
      const interactiveType = message.interactive?.type; // button_reply or list_reply
      if (interactiveType === 'button_reply') {
        messageContent = message.interactive.button_reply?.title || '';
      } else if (interactiveType === 'list_reply') {
        messageContent = message.interactive.list_reply?.title || '';
      }
      console.log('  Interactive reply:', messageContent);
      break;

    default:
      console.log('  Unsupported message type:', type);
      messageContent = `[Unsupported message type: ${type}]`;
  }

  // TODO: Store message in database
  /*
  await database.messages.create({
    messageId,
    phoneNumberId,
    businessAccountId,
    from,
    customerName,
    type,
    content: messageContent,
    timestamp: new Date(parseInt(timestamp) * 1000),
    direction: 'inbound',
    status: 'received'
  });
  */

  // TODO: Trigger automated reply logic
  /*
  const bot = await database.bots.findByPhoneNumberId(phoneNumberId);
  if (bot?.autoReplyEnabled) {
    await sendAutomatedReply(phoneNumberId, from, messageContent, bot);
  }
  */

  console.log('✅ Message processed successfully');
}

/**
 * Handle message status updates
 */
async function handleMessageStatus(
  phoneNumberId: string,
  businessAccountId: string,
  status: any
) {
  const messageId = status.id;
  const statusValue = status.status; // sent, delivered, read, failed
  const timestamp = status.timestamp;
  const recipientId = status.recipient_id;

  console.log('📊 Message status update:');
  console.log('  Message ID:', messageId);
  console.log('  Status:', statusValue);
  console.log('  Recipient:', recipientId);

  if (statusValue === 'failed') {
    const errorCode = status.errors?.[0]?.code;
    const errorMessage = status.errors?.[0]?.title;
    console.error('  ❌ Delivery failed:', errorCode, errorMessage);
  }

  // TODO: Update message status in database
  /*
  await database.messages.updateStatus(messageId, {
    status: statusValue,
    deliveredAt: statusValue === 'delivered' ? new Date(parseInt(timestamp) * 1000) : null,
    readAt: statusValue === 'read' ? new Date(parseInt(timestamp) * 1000) : null,
    failedReason: statusValue === 'failed' ? status.errors?.[0]?.title : null
  });
  */
}

/**
 * Handle template status updates
 */
async function handleTemplateStatusUpdate(businessAccountId: string, value: any) {
  const { event, message_template_id, message_template_name, message_template_language } = value;

  console.log('📋 Template status update:');
  console.log('  Template:', message_template_name);
  console.log('  Language:', message_template_language);
  console.log('  Event:', event); // APPROVED, REJECTED, PAUSED, etc.

  // TODO: Update template status in database
  /*
  await database.messageTemplates.updateStatus(message_template_id, {
    status: event,
    updatedAt: new Date()
  });
  */
}

/**
 * Verify webhook signature (recommended for production)
 */
function verifyWebhookSignature(
  payload: string,
  signature: string,
  appSecret: string
): boolean {
  try {
    const expectedSignature = 'sha256=' + 
      crypto
        .createHmac('sha256', appSecret)
        .update(payload)
        .digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

/**
 * Example: Send automated reply
 */
async function sendAutomatedReply(
  phoneNumberId: string,
  to: string,
  incomingMessage: string,
  bot: any
) {
  try {
    // TODO: Get business token for this bot from database
    const businessToken = 'bot.businessToken'; // Decrypt from database

    // Generate AI reply based on incoming message and bot configuration
    const replyText = await generateAIReply(incomingMessage, bot);

    // Send reply via WhatsApp Cloud API
    const response = await fetch(
      `https://graph.facebook.com/v24.0/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${businessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: to,
          type: 'text',
          text: {
            body: replyText
          }
        })
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Auto-reply sent:', data.messages[0].id);
    } else {
      const error = await response.json();
      console.error('❌ Failed to send auto-reply:', error);
    }
  } catch (error) {
    console.error('❌ Auto-reply error:', error);
  }
}

/**
 * Example: Generate AI reply (integrate with your chatbot logic)
 */
async function generateAIReply(message: string, bot: any): Promise<string> {
  // TODO: Integrate with your AI/chatbot service
  // This is just a placeholder
  return `Thank you for your message. We'll get back to you soon!`;
}
