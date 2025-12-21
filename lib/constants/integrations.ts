import {
  IntegrationConfig,
  IntegrationSetupGuide,
  IntegrationSidebarItem,
  IntegrationPlatform
} from '@/types/integration';

// Available Integration Platforms
export const INTEGRATION_PLATFORMS: IntegrationConfig[] = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Manage your Slack conversations and notifications',
    icon: 'Slack',
    status: 'coming-soon',
    category: 'messaging',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Manage payments, billing, and automate financial operations',
    icon: 'CreditCard',
    status: 'coming-soon',
    category: 'payment',
  },
  {
    id: 'calendly',
    name: 'Calendly',
    description: 'Schedule meetings and manage your calendar',
    icon: 'Calendar',
    status: 'coming-soon',
    category: 'scheduling',
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Sync data and automate workflows with Notion',
    icon: 'FileText',
    status: 'coming-soon',
    category: 'productivity',
  },
  {
    id: 'zendesk',
    name: 'Zendesk',
    description: 'Create and manage support tickets automatically',
    icon: 'Cloud',
    status: 'coming-soon',
    category: 'support',
  },
];

// WhatsApp Setup Guide
export const WHATSAPP_SETUP_GUIDE: IntegrationSetupGuide = {
  platform: 'whatsapp',
  steps: [
    {
      id: 1,
      title: 'Create Meta App',
      description: 'Go to Meta for Developers and create a new Business app.',
      tip: 'Choose "Business" as app type → Add WhatsApp product',
      externalLink: {
        url: 'https://developers.facebook.com/apps',
        label: 'Meta for Developers',
      },
    },
    {
      id: 2,
      title: 'Get Phone Number ID',
      description: 'In your app dashboard, go to WhatsApp → API Setup. Copy the Phone Number ID (15-16 digits).',
      tip: 'Example: 123456789012345',
    },
    {
      id: 3,
      title: 'Generate Access Token',
      description: 'For production, create a System User in Business Settings and generate a permanent token with whatsapp_business_messaging permission.',
      tip: 'Temporary tokens expire in 24 hours. Use System User tokens for production.',
    },
    {
      id: 4,
      title: 'Create Verify Token',
      description: 'Create a secure random string (8+ characters) to verify webhook requests.',
      tip: 'Generate one: openssl rand -hex 20',
    },
    {
      id: 5,
      title: 'Configure Webhook in Meta',
      description: 'In WhatsApp → Configuration, add the webhook URL and your verify token.',
      tip: 'Subscribe to events: messages • message_template_status_update',
    },
  ],
  credentialFields: [
    {
      id: 'webhookUrl',
      label: 'Webhook URL',
      type: 'readonly',
      required: false,
      helpText: 'Copy this URL and paste it in Meta WhatsApp Configuration → Webhook settings',
      stepReference: 5,
    },
    {
      id: 'phoneNumberId',
      label: 'Phone Number ID',
      type: 'text',
      placeholder: 'Enter your Phone Number ID',
      required: true,
      stepReference: 2,
    },
    {
      id: 'businessAccountId',
      label: 'Business Account ID',
      type: 'text',
      placeholder: 'Enter your Business Account ID (optional)',
      required: false,
    },
    {
      id: 'accessToken',
      label: 'Access Token',
      type: 'password',
      placeholder: 'Enter your WhatsApp Access Token',
      required: true,
      stepReference: 3,
    },
    {
      id: 'verifyToken',
      label: 'Verify Token',
      type: 'text',
      placeholder: 'Enter your Verify Token',
      required: true,
      helpText: 'A secure string you create to verify webhook requests. Use the same token in your WhatsApp webhook configuration.',
      stepReference: 4,
    },
  ],
};

// WhatsApp-specific sidebar items
// WhatsApp-specific sidebar items
export const WHATSAPP_SIDEBAR_ITEMS: IntegrationSidebarItem[] = [
  {
    id: 'live-chat',
    label: 'Live Chat',
    icon: 'MessageSquare',
    path: '/live-chat',
  },
  {
    id: 'contacts',
    label: 'Contacts',
    icon: 'Users', // You might need to add this to iconMap
    path: '/contacts',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'BarChart3',
    path: '/analytics',
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: 'User',
    path: '/profile',
  },
  {
    id: 'templates',
    label: 'Templates',
    icon: 'FileText',
    path: '/templates',
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    icon: 'Calendar',
    path: '/campaigns',
  },
  {
    id: 'automation',
    label: 'Automation',
    icon: 'Bot',
    path: '/automation',
  },
  {
    id: 'manage',
    label: 'Manage',
    icon: 'Settings',
    path: '/manage',
  },
];

// Helper function to get sidebar items for a platform
export const getIntegrationSidebarItems = (platform: IntegrationPlatform): IntegrationSidebarItem[] => {
  switch (platform) {
    case 'whatsapp':
      return WHATSAPP_SIDEBAR_ITEMS;
    // Add more cases for other platforms
    default:
      return [];
  }
};

// Helper function to get setup guide for a platform
export const getIntegrationSetupGuide = (platform: IntegrationPlatform): IntegrationSetupGuide | null => {
  switch (platform) {
    case 'whatsapp':
      return WHATSAPP_SETUP_GUIDE;
    // Add more cases for other platforms
    default:
      return null;
  }
};
