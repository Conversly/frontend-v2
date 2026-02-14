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
    'Voice AI agents',
    'WhatsApp automation',
    'Customer service chatbot',
    'VerlyAI',
    'Automated support platform',
    'Reduce support costs',
    '24/7 customer service',
    'Twilio Voice AI',
    'Real-time AI agents',
    'Enterprise GenAI',
    'Inbound call automation',
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
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: '',
    description: 'Deploy AI agents that handle 10X more customers without hiring. Instant answers on Voice, WhatsApp, and Web. Start for free.',
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'VerlyAI Dashboard - AI Support Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
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

// Structured data for the organization
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'VerlyAI',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Customer Support Automation',
  operatingSystem: 'Cloud, Web',
  url: 'https://verlyai.xyz',
  description:
    'VerlyAI is an AI-powered customer support platform that helps businesses automate customer interactions through intelligent chatbots, voice assistants, and WhatsApp integration.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    name: 'Free Starter Plan',
    description: 'Start for free with 500 messages included.',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '124',
  },
  creator: {
    '@type': 'Organization',
    name: 'VerlyAI',
    url: 'https://verlyai.xyz',
    logo: 'https://verlyai.xyz/verly_logo.png',
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
  screenshot: 'https://verlyai.xyz/verly_dashboard_preview.png',
};
