import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solutions - AI Agents for Every Industry | VerlyAI',
  description: 'Deploy production-ready AI agents for e-commerce, SaaS, healthcare, hospitality and more. Developer-first platform with full API control. Build on WhatsApp, Voice, and Web.',
  keywords: [
    'AI solutions by industry',
    'e-commerce AI agent',
    'SaaS customer support automation',
    'healthcare chatbot HIPAA',
    'restaurant reservation AI',
    'real estate lead qualification',
    'AI agent use cases',
    'industry-specific AI agents',
  ],
  openGraph: {
    title: 'Solutions - AI Agents for Every Industry | VerlyAI',
    description: 'Deploy production-ready AI agents for any industry with our developer-first platform.',
    url: 'https://dev.verlyai.xyz/solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solutions - AI Agents for Every Industry | VerlyAI',
    description: 'Deploy production-ready AI agents for any industry with our developer-first platform.',
  },
};

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
