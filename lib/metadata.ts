import { Metadata } from 'next';

export const siteConfig = {
  name: 'VerlyAI',
  description: 'VerlyAI is an AI-powered customer support platform that helps businesses automate customer service using intelligent AI chatbots, voice assistants, and WhatsApp agents. It enables instant issue resolution, 24/7 availability, and seamless escalation to human support teams across web, voice, and messaging channels.',
  url: 'https://verlyai.xyz',
  ogImage: 'https://verlyai.xyz/verly_logo.png',
  links: {
    twitter: 'https://x.com/VerlyAI',
    linkedin: 'https://www.linkedin.com/company/verlyai/',
  },
};

export const defaultMetadata: Metadata = {
  title: {
    default: 'VerlyAI - AI Agent for Customer Support',
    template: '%s | VerlyAI',
  },
  description: 'Automate customer support with VerlyAI. Deploy intelligent AI agents for Voice, WhatsApp, and Web Chat in minutes. Reduce support costs by 80% and handle unlimited conversations simultaneously.',
  keywords: [
    'AI customer support',
    'AI customer support platform',
    'Voice AI agents',
    'WhatsApp automation',
    'WhatsApp chatbot',
    'Customer service chatbot',
    'VerlyAI',
    'Automated support platform',
    'Reduce support costs',
    '24/7 customer service',
    'Twilio Voice AI',
    'Real-time AI agents',
    'Enterprise GenAI',
    'Inbound call automation',
    'omnichannel customer support',
    'AI help desk',
    'chatbot for website',
    'automated customer service',
    'conversational AI',
    'customer support automation',
    'AI agent platform',
    'support ticket automation',
    'self-service customer support',
    'e-commerce customer support AI',
    'healthcare chatbot',
    'SaaS customer support automation',
  ],
  authors: [{ name: 'VerlyAI Team' }],
  creator: 'VerlyAI',
  publisher: 'VerlyAI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: 'VerlyAI - AI Agent for Customer Support',
    description: 'Deploy AI agents that handle 10X more customers without hiring. Instant answers on Voice, WhatsApp, and Web. Start for free.',
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 512,
        height: 512,
        alt: 'VerlyAI - AI Customer Support Platform',
      },
    ],
  },
  twitter: {
    // Using summary card because the current og image is a square logo (512x512).
    // Upgrade to summary_large_image once a proper 1200x630 og image is added to /public/.
    card: 'summary',
    title: 'VerlyAI - AI Agent for Customer Support',
    description: 'Deploy AI agents that handle 10X more customers without hiring. Instant answers on Voice, WhatsApp, and Web.',
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

// Organization schema — primary entity recognized by Google Knowledge Graph
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://verlyai.xyz/#organization',
  name: 'VerlyAI',
  url: 'https://verlyai.xyz',
  logo: {
    '@type': 'ImageObject',
    url: 'https://verlyai.xyz/verly_logo.png',
    width: 512,
    height: 512,
  },
  description:
    'VerlyAI is an AI-powered customer support platform that helps businesses automate customer interactions through intelligent chatbots, voice assistants, and WhatsApp integration.',
  foundingDate: '2025',
  areaServed: 'Global',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'support@verlyai.xyz',
    availableLanguage: 'English',
  },
  sameAs: [
    'https://x.com/VerlyAI',
    'https://www.linkedin.com/company/verlyai/',
  ],
};

// SoftwareApplication schema — helps appear in Google's software/app results
export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'VerlyAI',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Customer Support Automation',
  operatingSystem: 'Cloud, Web',
  url: 'https://verlyai.xyz',
  description:
    'VerlyAI is an AI-powered customer support platform that helps businesses automate customer interactions through intelligent chatbots, voice assistants, and WhatsApp integration. Deploy AI agents that handle 10X more customers without hiring.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    name: 'Free Starter Plan',
    description: 'Start for free with 50 messages included per month.',
  },
  creator: {
    '@id': 'https://verlyai.xyz/#organization',
  },
  featureList: [
    'AI-powered chatbots for website',
    'Voice AI agents for phone calls',
    'WhatsApp business automation',
    'Multi-channel customer support',
    'Automated ticket resolution',
    'Human handoff escalation',
    'Real-time analytics dashboard',
    'Custom knowledge base integration',
    '24/7 availability',
    'Support for 95+ languages',
    'Smart AI model switching',
    'Seamless CRM integrations',
  ],
  screenshot: 'https://verlyai.xyz/verly_dashboard_preview.png',
};

// WebSite schema for homepage
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://verlyai.xyz/#website',
  name: 'VerlyAI - AI Customer Support Agents',
  url: 'https://verlyai.xyz',
  description: 'Deploy AI agents across Website chat, Voice & WhatsApp in minutes. Automate 80% of customer support tickets with intelligent AI that handles unlimited conversations simultaneously.',
  publisher: {
    '@id': 'https://verlyai.xyz/#organization',
  },
  mainEntity: {
    '@type': 'Service',
    name: 'AI Customer Support Automation',
    description: 'AI-powered customer support agents that work across Voice, WhatsApp, and Web Chat to handle unlimited conversations 24/7.',
    provider: {
      '@id': 'https://verlyai.xyz/#organization',
    },
    areaServed: 'Global',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Support Plans',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Free Plan',
            description: '1 chatbot, 50 messages/month',
          },
          price: '0',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Hobby Plan',
            description: '3 chatbots, 3,000 messages/month',
          },
          price: '29.99',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Standard Plan',
            description: '10 chatbots, 12,000 messages/month',
          },
          price: '79.99',
          priceCurrency: 'USD',
        },
      ],
    },
  },
};
