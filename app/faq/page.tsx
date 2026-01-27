import { Metadata } from 'next';
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: 'FAQ - Developer Guide & Platform Questions | VerlyAI',
  description: 'Technical FAQs about VerlyAI: Latency specs, LLM model support, data isolation, and API integration details for developers.',
  openGraph: {
    title: 'FAQ - Developer Guide & Platform Questions | VerlyAI',
    description: 'Technical FAQs about VerlyAI: Latency specs, LLM model support, and API integration.',
    url: 'https://dev.verlyai.xyz/faq',
  },
};

const faqCategories = [
  {
    category: "General & Platform",
    questions: [
      {
        question: "What is VerlyAI?",
        answer: "VerlyAI is a developer-first platform for building and deploying omni-channel AI agents. We provide the infrastructure (LLM orchestration, RAG, telephony, and state management) so you can focus on building great support experiences via code or our config UI."
      },
      {
        question: "Who is VerlyAI for?",
        answer: "We are built for engineering and product teams who want full control over their AI support stack. Unlike black-box chatbot tools, VerlyAI offers comprehensive SDKs, webhooks, and observability to integrate deeply with your existing backend."
      },
      {
        question: "Which LLMs do you support?",
        answer: "We are model-agnostic. You can bring your own API keys for OpenAI (GPT-4), Anthropic (Claude), or use open-source models hosted on Groq/Together AI for ultra-low latency. We also handle model fallback and context window management automatically."
      }
    ]
  },
  {
    category: "Chatbot Training and Support",
    questions: [
      {
        question: "Can I train the chatbot with raw text (no pages/files)?",
        answer: "Yes — paste raw text into your knowledge base and we’ll index it the same way as scraped pages or uploaded docs. This is perfect for internal SOPs, policies, and “things that aren’t on your website”."
      },
      {
        question: "What content can I use to train the chatbot?",
        answer: "Website URLs (single page or full site), sitemaps, docs/knowledge bases, and uploads like PDF/DOCX/TXT/MD. Mix sources — the bot learns better with broader coverage and fewer gaps."
      },
      {
        question: "Do you automatically re-train when my website changes?",
        answer: "If you enable auto-sync, we periodically re-crawl/re-index your sources so the bot stays up to date. You can also trigger a manual sync anytime when you ship a big update."
      },
      {
        question: "What happens when the bot can’t answer?",
        answer: "You can configure escalation rules so the bot hands off to a human, captures contact info, creates a ticket, or routes the conversation to a team inbox — while preserving full conversation context."
      },
      {
        question: "How long does training take?",
        answer: "Usually minutes. It depends on the total content volume and the number of sources. You can start testing immediately as new content is indexed."
      }
    ]
  },
  {
    category: "Integration & Deployment",
    questions: [
      {
        question: "How do I integrate VerlyAI with my database?",
        answer: "Agents can trigger 'Actions' (function calling) to fetch data or perform tasks in your system. simply define your API schema, and the agent will intelligently query your backend to check order status, book appointments, or update user records."
      },
      {
        question: "Can I deploy to WhatsApp and Web simultaneously?",
        answer: "Yes. You define your agent's behavior once—prompts, tools, and knowledge base—and deploy it across multiple channels (Web Widget, WhatsApp, Twilio Voice) instantly. We handle the channel-specific protocol conversion."
      },
      {
        question: "What is the latency for Voice Agents?",
        answer: "Our voice infrastructure is optimized for real-time conversation. By using streaming transcription and edge caching, we achieve varying latencies as low as 500ms, providing a natural 'interruptible' conversation experience."
      },
      {
        question: "Can I embed the chatbot on my website?",
        answer: "Yes. You can embed it with a snippet and customize branding, colors, position, and behavior. You can also link directly to a hosted chat page."
      },
      {
        question: "Can I integrate with Slack/Zendesk/CRM tools?",
        answer: "Yes — integrate via API/webhooks and connect support workflows (handoff, ticket creation, lead capture). If you tell us your stack, we’ll recommend the cleanest integration path."
      },
      {
        question: "Is the widget customizable / white-label?",
        answer: "Yes. You can match your site’s design and optionally remove branding depending on your plan. You can also tune tone, model behavior, and escalation triggers."
      }
    ]
  },
  {
    category: "Security & Pricing",
    questions: [
      {
        question: "Is my data used to train models?",
        answer: "No. VerlyAI offers strict data isolation. We do not use your customer conversations to train our foundational models, and we support enterprise agreements with zero-retention policies for sensitive industries like Healthcare and Finance."
      },
      {
        question: "How does pricing work?",
        answer: "We offer a usage-based pricing model. You pay for what you use—per conversation minute for voice, and per message for chat. There are no mandatory upfront contracts for our Starter tier."
      },
      {
        question: "Do you offer on-premise deployment?",
        answer: "Yes, for Enterprise customers, VerlyAI can be deployed within your own VPC (AWS/GCP/Azure) or creating a dedicated instance to ensure maximum compliance and security."
      },
      {
        question: "How does the free trial work?",
        answer: "You get full access for the trial period (no long-term commitment). When the trial ends, you can upgrade to keep the bot live or stay on a limited/free tier if available."
      },
      {
        question: "What counts toward usage limits?",
        answer: "Typically: message volume, indexed content size, and/or number of chatbots/workspaces. If you’re unsure which lever matters most for you, ping support and we’ll map your expected traffic to the right plan."
      },
      {
        question: "Do you offer plans for agencies?",
        answer: "Yes — if you’re building bots for clients, we can set you up with an agency-style workflow (multiple bots, separate client environments, and billing options). Email us and we’ll get you the details."
      }
    ]
  }
];

const FaqPage = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      <div className="relative z-10">
        <Navbar />

        <main className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Everything you need to know about VerlyAI. Can't find the answer you're looking for? Reach out to our support team.
              </p>
            </div>

            {/* FAQ Sections */}
            <div className="space-y-12">
              {faqCategories.map((category, idx) => (
                <div key={idx}>
                  <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">
                    {category.category}
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, qIdx) => (
                      <AccordionItem key={qIdx} value={`${idx}-${qIdx}`}>
                        <AccordionTrigger className="text-left text-base font-semibold hover:text-primary">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-16 text-center bg-primary/5 p-12 rounded-lg">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Still have questions?
              </h2>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <a
                href="mailto:support@verlyai.xyz"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary-foreground bg-primary rounded-lg hover:opacity-90 transition-all"
              >
                Contact Support
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default FaqPage;
