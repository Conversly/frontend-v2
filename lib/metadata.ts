import { Metadata } from 'next';

export const siteConfig = {
  name: 'Verly',
  description: 'Verly is the AI customer support platform for voice, WhatsApp, and web chat — with human handoff built in. One platform for AI, routing, and escalation across every channel your customers use.',
  url: 'https://verlyai.xyz',
  ogImage: 'https://verlyai.xyz/verly_logo.png',
  links: {
    twitter: 'https://x.com/VerlyAI',
    linkedin: 'https://www.linkedin.com/company/verlyai/',
  },
};

export const defaultMetadata: Metadata = {
  title: {
    default: 'Verly — AI Customer Support for Voice, WhatsApp & Chat',
    template: '%s | Verly',
  },
  description: 'Deploy an AI support agent across voice, WhatsApp, and web chat in under a day. Verly answers 80% of tickets and hands the rest to your team with full context. Start free.',
  keywords: [
    'AI customer support',
    'AI customer support platform',
    'Voice AI agents',
    'WhatsApp automation',
    'WhatsApp chatbot',
    'Customer service chatbot',
    'Verly',
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
  authors: [{ name: 'Verly Team' }],
  creator: 'Verly',
  publisher: 'Verly',
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
    title: 'Verly — AI Customer Support for Voice, WhatsApp & Chat',
    description: 'Deploy an AI support agent across voice, WhatsApp, and web chat in under a day. Verly answers 80% of tickets and hands the rest to your team with full context.',
    siteName: siteConfig.name,
    // Image is provided by app/opengraph-image.tsx (1200×630, rendered at build).
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verly — AI Customer Support for Voice, WhatsApp & Chat',
    description: 'Deploy an AI support agent across voice, WhatsApp, and web chat in under a day. Answers 80% of tickets, hands off the rest with full context.',
    // Image is provided by app/twitter-image.tsx (shares the same 1200×630 render).
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
  name: 'Verly',
  alternateName: 'Verly AI',
  url: 'https://verlyai.xyz',
  logo: {
    '@type': 'ImageObject',
    url: 'https://verlyai.xyz/verly_logo.png',
    width: 560,
    height: 374,
  },
  description:
    'Verly is the AI customer support platform for voice, WhatsApp, and web chat — with human handoff built in. One platform for AI, routing, and escalation across every channel.',
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
  name: 'Verly',
  alternateName: 'Verly AI',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Customer Support Automation',
  operatingSystem: 'Cloud, Web',
  url: 'https://verlyai.xyz',
  description:
    'Verly is the AI customer support platform for voice, WhatsApp, and web chat — with human handoff built in. Deploy an AI agent that answers 80% of tickets and hands the rest to your team with full context.',
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
  name: 'Verly — AI Customer Support',
  url: 'https://verlyai.xyz',
  description: 'The AI customer support platform for voice, WhatsApp, and web chat — with human handoff built in. Answer 80% of tickets automatically and escalate the rest with full context.',
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
