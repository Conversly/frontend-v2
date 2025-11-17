# WhatsApp Integration API Endpoints

This document lists all WhatsApp integration API endpoints for z-terminal API services.

## Base URL
```
/api/v1/whatsapp
```

## Summary of Endpoints

1. **Create WhatsApp Integration** - `POST /integration`
2. **Get WhatsApp Integration** - `GET /integration?chatbotId={chatbotId}`
3. **Update WhatsApp Integration** - `PATCH /integration?chatbotId={chatbotId}`
4. **Delete WhatsApp Integration** - `DELETE /integration?chatbotId={chatbotId}`
5. **Send WhatsApp Message** - `POST /send?chatbotId={chatbotId}`
6. **Get WhatsApp Chats** - `GET /chats/:chatbotId/:whatsappId`
7. **Get Contact Messages** - `GET /chats/:chatbotId/:whatsappId/:contactId`
8. **Add WhatsApp Contact** - `POST /contacts/:chatbotId/:whatsappId`
9. **Get WhatsApp Analytics** - `GET /analytics/:chatbotId/:whatsappId`
10. **Get WhatsApp Analytics Per Day** - `GET /analytics/per-day/:chatbotId/:whatsappId?days=30`

## Endpoints

### 1. Create WhatsApp Integration
**POST** `/integration`

Create a new WhatsApp integration for a chatbot.

**Request Body:**
```json
{
  "chatbotId": "string (UUID)",
  "phoneNumberId": "string",
  "accessToken": "string",
  "verifyToken": "string",
  "webhookSecret": "string (optional)",
  "businessAccountId": "string (optional)",
  "webhookUrl": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Integration created successfully",
  "data": {
    "id": "string",
    "chatbotId": "string (UUID)",
    "phoneNumberId": "string",
    "accessToken": "string",
    "verifyToken": "string",
    "webhookSecret": "string | null",
    "businessAccountId": "string | null",
    "webhookUrl": "string | null",
    "createdAt": "Date | null",
    "updatedAt": "Date | null"
  }
}
```

---

### 2. Get WhatsApp Integration
**GET** `/integration?chatbotId={chatbotId}`

Get WhatsApp integration for a chatbot.

**Query Parameters:**
- `chatbotId` (required): UUID of the chatbot

**Response:**
```json
{
  "success": true,
  "message": "Integration retrieved successfully",
  "data": {
    "id": "string",
    "chatbotId": "string (UUID)",
    "phoneNumberId": "string",
    "accessToken": "string",
    "verifyToken": "string",
    "webhookSecret": "string | null",
    "businessAccountId": "string | null",
    "webhookUrl": "string | null",
    "createdAt": "Date | null",
    "updatedAt": "Date | null"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Integration not found",
  "data": null
}
```

---

### 3. Update WhatsApp Integration
**PATCH** `/integration?chatbotId={chatbotId}`

Update an existing WhatsApp integration.

**Query Parameters:**
- `chatbotId` (required): UUID of the chatbot

**Request Body:**
```json
{
  "phoneNumberId": "string (optional)",
  "accessToken": "string (optional)",
  "verifyToken": "string (optional)",
  "webhookSecret": "string (optional)",
  "businessAccountId": "string (optional)",
  "webhookUrl": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Integration updated successfully",
  "data": {
    "id": "string",
    "chatbotId": "string (UUID)",
    "phoneNumberId": "string",
    "accessToken": "string",
    "verifyToken": "string",
    "webhookSecret": "string | null",
    "businessAccountId": "string | null",
    "webhookUrl": "string | null",
    "createdAt": "Date | null",
    "updatedAt": "Date | null"
  }
}
```

---

### 4. Delete WhatsApp Integration
**DELETE** `/integration?chatbotId={chatbotId}`

Delete a WhatsApp integration.

**Query Parameters:**
- `chatbotId` (required): UUID of the chatbot

**Response:**
```json
{
  "success": true,
  "message": "Integration deleted successfully",
  "data": {
    "success": true,
    "message": "Integration deleted successfully"
  }
}
```

---

### 5. Send WhatsApp Message
**POST** `/send?chatbotId={chatbotId}`

Send a message via WhatsApp.

**Query Parameters:**
- `chatbotId` (required): UUID of the chatbot

**Request Body:**
```json
{
  "to": "string (phone number)",
  "message": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "success": true,
    "messageId": "string (optional)",
    "error": "string (optional)"
  }
}
```

---

### 6. Get WhatsApp Chats
**GET** `/chats/:chatbotId/:whatsappId`

Get all contacts/chats for a WhatsApp integration.

**Path Parameters:**
- `chatbotId` (required): UUID of the chatbot
- `whatsappId` (required): ID of the WhatsApp integration

**Response:**
```json
{
  "success": true,
  "message": "Chats retrieved successfully",
  "data": {
    "success": true,
    "data": [
      {
        "id": "string",
        "phoneNumber": "string",
        "displayName": "string (optional)",
        "userMetadata": "any (optional)"
      }
    ]
  }
}
```

---

### 7. Get Contact Messages
**GET** `/chats/:chatbotId/:whatsappId/:contactId`

Get all messages for a specific contact.

**Path Parameters:**
- `chatbotId` (required): UUID of the chatbot
- `whatsappId` (required): ID of the WhatsApp integration
- `contactId` (required): Phone number or ID of the contact

**Response:**
```json
{
  "success": true,
  "message": "Messages retrieved successfully",
  "data": {
    "success": true,
    "data": [
      {
        "id": "string",
        "content": "string",
        "type": "user" | "assistant" | "agent",
        "timestamp": "Date | string",
        "metadata": "any (optional)"
      }
    ]
  }
}
```

---

## Error Responses

All endpoints may return the following error format:

```json
{
  "success": false,
  "message": "Error message description",
  "data": null
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

---

## Example Usage

### Create Integration
```bash
curl -X POST https://api.example.com/api/v1/whatsapp/integration \
  -H "Content-Type: application/json" \
  -d '{
    "chatbotId": "123e4567-e89b-12d3-a456-426614174000",
    "phoneNumberId": "123456789012345",
    "accessToken": "your_access_token",
    "verifyToken": "your_verify_token",
    "webhookUrl": "https://webhook.example.com/webhook"
  }'
```

### Send Message
```bash
curl -X POST "https://api.example.com/api/v1/whatsapp/send?chatbotId=123e4567-e89b-12d3-a456-426614174000" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "+1234567890",
    "message": "Hello from WhatsApp!"
  }'
```

### Get Chats
```bash
curl -X GET "https://api.example.com/api/v1/whatsapp/chats/123e4567-e89b-12d3-a456-426614174000/whatsapp-integration-id"
```

---

### 8. Add WhatsApp Contact
**POST** `/contacts/:chatbotId/:whatsappId`

Add a new contact to the WhatsApp integration.

**Path Parameters:**
- `chatbotId` (required): UUID of the chatbot
- `whatsappId` (required): ID of the WhatsApp integration

**Request Body:**
```json
{
  "phoneNumber": "string (digits only, with country code, e.g., 918435271074 or 1234567890)",
  "displayName": "string (optional)"
}
```

**Note:** Phone numbers should be provided without the "+" prefix. Include country code (e.g., 91 for India, 1 for US).

**Response:**
```json
{
  "success": true,
  "message": "Contact added successfully",
  "data": {
    "id": "string",
    "phoneNumber": "string",
    "displayName": "string (optional)",
    "userMetadata": "any (optional)"
  }
}
```

**Example Request:**
```bash
curl -X POST "https://api.example.com/api/v1/whatsapp/contacts/123e4567-e89b-12d3-a456-426614174000/whatsapp-integration-id" \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "918435271074",
    "displayName": "John Doe"
  }'
```

---

### 9. Get WhatsApp Analytics
**GET** `/analytics/:chatbotId/:whatsappId`

Get aggregated analytics for a WhatsApp integration.

**Path Parameters:**
- `chatbotId` (required): UUID of the chatbot
- `whatsappId` (required): ID of the WhatsApp integration

**Response:**
```json
{
  "success": true,
  "message": "Analytics retrieved successfully",
  "data": {
    "totalMessages": 0,
    "totalContacts": 0,
    "activeConversations": 0,
    "userMessages": 0,
    "aiResponses": 0,
    "agentResponses": 0,
    "uniqueWhatsappConversations": 0,
    "uniqueContacts": 0
  }
}
```

**Example Request:**
```bash
curl -X GET "https://api.example.com/api/v1/whatsapp/analytics/123e4567-e89b-12d3-a456-426614174000/whatsapp-integration-id"
```

---

### 10. Get WhatsApp Analytics Per Day
**GET** `/analytics/per-day/:chatbotId/:whatsappId?days=30`

Get daily analytics data for a WhatsApp integration.

**Path Parameters:**
- `chatbotId` (required): UUID of the chatbot
- `whatsappId` (required): ID of the WhatsApp integration

**Query Parameters:**
- `days` (optional): Number of days to retrieve (default: 30)

**Response:**
```json
{
  "success": true,
  "message": "Analytics per day retrieved successfully",
  "data": {
    "success": true,
    "data": [
      {
        "date": "2024-01-15",
        "userMessages": 10,
        "aiResponses": 8,
        "agentResponses": 2,
        "uniqueWhatsappConversations": 5,
        "uniqueContacts": 3
      }
    ]
  }
}
```

**Example Request:**
```bash
curl -X GET "https://api.example.com/api/v1/whatsapp/analytics/per-day/123e4567-e89b-12d3-a456-426614174000/whatsapp-integration-id?days=30"
```

---

## Notes

1. All `chatbotId` parameters must be valid UUIDs
2. Phone numbers should be provided without "+" prefix, digits only with country code (e.g., `918435271074` for India, `1234567890` for US)
3. Access tokens should be permanent tokens from Meta Business Settings (System User)
4. Verify tokens should be secure random strings (minimum 8 characters)
5. Webhook URLs should be publicly accessible HTTPS endpoints

