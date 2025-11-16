export type IntegrationStatus = 'connected' | 'not-connected' | 'coming-soon';

export type IntegrationPlatform = 
  | 'whatsapp' 
  | 'slack' 
  | 'stripe' 
  | 'calendly' 
  | 'notion'
  | 'zendesk'
  | 'telegram'
  | 'discord';

export interface IntegrationConfig {
  id: IntegrationPlatform;
  name: string;
  description: string;
  icon: string; // Icon component name or emoji
  status: IntegrationStatus;
  docsUrl?: string;
  category: 'messaging' | 'payment' | 'scheduling' | 'productivity' | 'support';
}

export interface WhatsAppCredentials {
  phoneNumberId: string;
  accessToken: string;
  verifyToken: string;
  webhookSecret?: string; // Facebook App Secret for webhook verification
  businessAccountId?: string;
  webhookUrl?: string;
}

export interface SlackCredentials {
  workspaceId: string;
  botToken: string;
  signingSecret: string;
}

export interface StripeCredentials {
  publishableKey: string;
  secretKey: string;
  webhookSecret: string;
}

export interface CalendlyCredentials {
  apiKey: string;
  webhookSigningKey: string;
}

export type IntegrationCredentials = 
  | WhatsAppCredentials 
  | SlackCredentials 
  | StripeCredentials 
  | CalendlyCredentials;

export interface IntegrationSetupStep {
  id: number;
  title: string;
  description: string;
  tip?: string;
  externalLink?: {
    url: string;
    label: string;
  };
}

export interface IntegrationSetupGuide {
  platform: IntegrationPlatform;
  steps: IntegrationSetupStep[];
  credentialFields: CredentialField[];
}

export interface CredentialField {
  id: string;
  label: string;
  type: 'text' | 'password' | 'url' | 'readonly';
  placeholder?: string;
  required: boolean;
  helpText?: string;
  stepReference?: number;
  defaultValue?: string;
}

export interface IntegrationSidebarItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: string | number;
}

export interface ConnectedIntegration {
  platform: IntegrationPlatform;
  connectedAt: Date;
  credentials: Partial<IntegrationCredentials>;
  isActive: boolean;
}

export interface WhatsAppIntegrationResponse {
  id: number;
  chatbotId: string; // UUID
  phoneNumberId: string;
  accessToken: string;
  verifyToken: string;
  webhookSecret?: string | null; // Facebook App Secret for webhook verification
  businessAccountId?: string | null;
  webhookUrl?: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
