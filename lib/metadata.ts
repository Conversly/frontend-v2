import { Metadata } from 'next';

export const siteConfig = {
  name: 'VerlyAI',
  description: 'VerlyAI is an AI-powered customer support platform that deploys intelligent chatbots, voice assistants, and WhatsApp bots to handle customer inquiries, resolve issues, and escalate to human agents when needed.',
  url: 'https://dev.verlyai.xyz',
  ogImage: 'https://dev.verlyai.xyz/verly_logo.png',
  links: {
    twitter: 'https://x.com/VerlyAI',
    linkedin: 'https://www.linkedin.com/company/verlyai/',
  },
};

export const defaultMetadata: Metadata = {
  title: {
    default: 'VerlyAI - AI Customer Support Automation Platform',
    template: '%s | VerlyAI',
  },
  description: 'VerlyAI is the developer-first platform for building, testing, and deploying LLM-based agents. Automate customer support with reliable Voice, WhatsApp, and Web AI agents.',
  keywords: [
    'AI customer support',
    'LLM agents',
    'RAG',
    'Function Calling',
    'Voice AI agents',
    'WhatsApp bot',
    'Developer platform',
    'conversational AI',
    'automated support',
    'customer service automation',
    'voice agents',
    'business automation',
    'Enterprise GenAI',
    'Customer Experience Automation',
    'CX Automation',
    'GPT-4 Support Bot',
    'Claude for Customer Service',
    'Twilio Voice AI',
    'Real-time Voice AI',
    'Inbound Call Automation',
    'Outbound AI Sales',
    'Omnichannel Support Platform',
    'Headless AI Support',
    'AI SDK for Developers',
    'Next.js AI Chatbot',
    'Programmable Voice AI',
    'Automated Appointment Booking',
    'WhatsApp Commerce',
    'Shopify AI Agent'
  ],
  authors: [{ name: 'VerlyAI' }],
  creator: 'VerlyAI',
  publisher: 'VerlyAI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: 'VerlyAI - AI Customer Support Automation Platform',
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'VerlyAI - AI Customer Support Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VerlyAI - AI Customer Support Automation Platform',
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@VerlyAI',
    site: '@VerlyAI',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/verly_logo.png',
    shortcut: '/verly_logo.png',
    apple: '/verly_logo.png',
  },
  manifest: '/site.webmanifest',
};

// Structured data for the organization
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'VerlyAI',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://dev.verlyai.xyz',
  description:
    'VerlyAI is an AI-powered customer support platform that helps businesses automate customer interactions through intelligent chatbots, voice assistants, and WhatsApp integration.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '120',
  },
  creator: {
    '@type': 'Organization',
    name: 'VerlyAI',
    url: 'https://dev.verlyai.xyz',
    logo: 'https://dev.verlyai.xyz/verly_logo.png',
    sameAs: [
      'https://x.com/VerlyAI',
      'https://www.linkedin.com/company/verlyai/',
    ],
  },
  featureList: [
    'AI-powered chatbots',
    'Voice assistant integration',
    'WhatsApp business automation',
    'Multi-channel customer support',
    'Automated ticket resolution',
    'Human handoff escalation',
    'Real-time analytics',
    'Custom knowledge base integration',
  ],
};
