import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About VerlyAI - Developer-First AI Agent Platform',
  description: 'VerlyAI is a developer-first platform for building, testing, and deploying LLM-based agents. Deploy autonomous AI agents across WhatsApp, Voice, and Web with full API control.',
  keywords: [
    'LLM platform',
    'AI agent development',
    'developer platform',
    'voice AI SDK',
    'WhatsApp automation API',
    'conversational AI framework',
  ],
  openGraph: {
    title: 'About VerlyAI - Developer-First AI Agent Platform',
    description: 'Build and deploy LLM-based agents across multiple channels with a developer-first platform.',
    url: 'https://dev.verlyai.xyz/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About VerlyAI - Developer-First AI Agent Platform',
    description: 'Build and deploy LLM-based agents across multiple channels with a developer-first platform.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
