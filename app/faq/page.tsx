import { Metadata } from "next";
import {
  Bot,
  BrainCircuit,
  Headphones,
  LockKeyhole,
  MessageSquareMore,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import FAQAskAIBanner from "@/components/landing/faq-ask-ai-banner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://verlyai.xyz",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "FAQ",
      item: "https://verlyai.xyz/faq",
    },
  ],
};

export const metadata: Metadata = {
  title: "FAQ — Questions About Verly Answered",
  description:
    "Everything you wanted to know about Verly — pricing, security, integrations, human handoff, voice AI, and more. Read the FAQ or ask the AI directly.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ - Verly Platform Questions & Answers",
    description:
      "Answers to common questions about Verly, including pricing, security, integrations, chatbot training, and automation workflows.",
    url: "https://verlyai.xyz/faq",
    type: "website",
  },
  twitter: {
    title: "FAQ - Verly Customer Support Questions & Answers",
    description:
      "Answers to common questions about Verly, including pricing, security, integrations, and automation workflows.",
  },
};

const faqCategories = [
  {
    category: "General & Platform",
    description:
      "Core product positioning, supported models, and who Verly is built for.",
    accentClassName: "faq-category-card--blue",
    panelClassName: "faq-panel--blue",
    icon: Bot,
    questions: [
      {
        question: "What is Verly?",
        answer:
          "Verly is the AI customer support platform that ships like software. One agent handles voice, WhatsApp, and web chat — trained on your docs, your tone, and your edge cases. You can branch your prompts in dev, preview before you ship, and roll back in one click. Set it up without code, or go deeper with the SDK.",
      },
      {
        question: "Who is Verly for?",
        answer:
          "Customer support and operations teams at growing companies — typically 10 to 500 people — who want one AI agent across voice, WhatsApp, and web chat. You can run it without writing code, or go deeper with the SDK, webhooks, and observability if your team is technical.",
      },
      {
        question: "Which LLMs do you support?",
        answer:
          "We are model-agnostic. You can bring your own API keys for OpenAI (GPT-4), Anthropic (Claude), or use open-source models hosted on Groq/Together AI for ultra-low latency. We also handle model fallback and context window management automatically.",
      },
    ],
  },
  {
    category: "Chatbot Training and Support",
    description:
      "How training, syncs, escalations, and support workflows work in day-to-day operations.",
    accentClassName: "faq-category-card--green",
    panelClassName: "faq-panel--green",
    icon: BrainCircuit,
    questions: [
      {
        question: "Can I train the chatbot with raw text (no pages/files)?",
        answer:
          "Yes — paste raw text into your knowledge base and we’ll index it the same way as scraped pages or uploaded docs. This is perfect for internal SOPs, policies, and “things that aren’t on your website”.",
      },
      {
        question: "What content can I use to train the chatbot?",
        answer:
          "Website URLs (single page or full site), sitemaps, docs/knowledge bases, and uploads like PDF/DOCX/TXT/MD. Mix sources — the bot learns better with broader coverage and fewer gaps.",
      },
      {
        question: "Do you automatically re-train when my website changes?",
        answer:
          "If you enable auto-sync, we periodically re-crawl/re-index your sources so the bot stays up to date. You can also trigger a manual sync anytime when you ship a big update.",
      },
      {
        question: "What happens when the bot can’t answer?",
        answer:
          "You can configure escalation rules so the bot hands off to a human, captures contact info, creates a ticket, or routes the conversation to a team inbox — while preserving full conversation context.",
      },
      {
        question: "How long does training take?",
        answer:
          "Usually minutes. It depends on the total content volume and the number of sources. You can start testing immediately as new content is indexed.",
      },
    ],
  },
  {
    category: "Integration & Deployment",
    description:
      "Deployment across web, WhatsApp, voice, and backend-connected automation flows.",
    accentClassName: "faq-category-card--amber",
    panelClassName: "faq-panel--amber",
    icon: Headphones,
    questions: [
      {
        question: "How do I integrate Verly with my database?",
        answer:
          "Agents trigger 'Actions' (function calling) to fetch data or perform tasks in your system. Define your API schema once, and the agent queries your backend to check order status, book appointments, or update user records.",
      },
      {
        question: "Can I deploy to WhatsApp and Web simultaneously?",
        answer:
          "Yes. You define your agent's behavior once—prompts, tools, and knowledge base—and deploy it across multiple channels (Web Widget, WhatsApp, Twilio Voice) instantly. We handle the channel-specific protocol conversion.",
      },
      {
        question: "What is the latency for Voice Agents?",
        answer:
          "Typical response latency is under 500ms — fast enough for a natural, interruptible back-and-forth. We use streaming transcription and edge caching to keep it that way, even during peak load.",
      },
      {
        question: "Can I embed the chatbot on my website?",
        answer:
          "Yes. You can embed it with a snippet and customize branding, colors, position, and behavior. You can also link directly to a hosted chat page.",
      },
      {
        question: "Can I integrate with Slack/Zendesk/CRM tools?",
        answer:
          "Yes — integrate via API/webhooks and connect support workflows (handoff, ticket creation, lead capture). If you tell us your stack, we’ll recommend the cleanest integration path.",
      },
      {
        question: "Is the widget customizable / white-label?",
        answer:
          "Yes. You can match your site’s design and optionally remove branding depending on your plan. You can also tune tone, model behavior, and escalation triggers.",
      },
    ],
  },
  {
    category: "Security & Pricing",
    description:
      "Data handling, plans, enterprise deployment models, and billing expectations.",
    accentClassName: "faq-category-card--violet",
    panelClassName: "faq-panel--violet",
    icon: LockKeyhole,
    questions: [
      {
        question: "Is my data used to train models?",
        answer:
          "No. Verly offers strict data isolation. We do not use your customer conversations to train our foundational models, and we support enterprise agreements with zero-retention policies for sensitive industries like Healthcare and Finance.",
      },
      {
        question: "How does pricing work?",
        answer:
          "We offer a usage-based pricing model. You pay for what you use—per conversation minute for voice, and per message for chat. There are no mandatory upfront contracts for our Starter tier.",
      },
      {
        question: "Do you offer on-premise deployment?",
        answer:
          "Yes, for Enterprise customers, Verly can be deployed within your own VPC (AWS/GCP/Azure) or creating a dedicated instance to ensure maximum compliance and security.",
      },
      {
        question: "How does the free trial work?",
        answer:
          "You get full access for the trial period (no long-term commitment). When the trial ends, you can upgrade to keep the bot live or stay on a limited/free tier if available.",
      },
      {
        question: "What counts toward usage limits?",
        answer:
          "Typically: message volume, indexed content size, and/or number of chatbots/workspaces. If you’re unsure which lever matters most for you, ping support and we’ll map your expected traffic to the right plan.",
      },
      {
        question: "Do you offer plans for agencies?",
        answer:
          "Yes — if you’re building bots for clients, we can set you up with an agency-style workflow (multiple bots, separate client environments, and billing options). Email us and we’ll get you the details.",
      },
    ],
  },
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategories.flatMap((category) =>
    category.questions.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  ),
};

const totalQuestions = faqCategories.reduce(
  (count, category) => count + category.questions.length,
  0,
);

const heroHighlights = [
  {
    icon: MessageSquareMore,
    label: `${totalQuestions}+ verified answers`,
    description: "Across setup, training, integrations, and pricing.",
  },
  {
    icon: PhoneCall,
    label: "Web, WhatsApp, and voice",
    description:
      "One support stack, deployed anywhere your customers reach you.",
  },
  {
    icon: Sparkles,
    label: "Built for fast evaluation",
    description: "Scan category summaries first, then jump into the details.",
  },
];

const FaqPage = () => {
  return (
    <div className="faq-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="faq-page__aurora faq-page__aurora--one" />
      <div className="faq-page__aurora faq-page__aurora--two" />
      <div className="faq-page__grid" />

      <div className="relative z-10">
        <Navbar />

        <main className="faq-shell">
          <section className="faq-hero faq-hero--centered">
            <div className="faq-hero__badge">
              <Sparkles className="h-4 w-4" />
              <span>Verly FAQ</span>
            </div>

            <div className="faq-hero__copy faq-hero__copy--centered">
              <h1 className="faq-hero__title faq-hero__title--centered">
                The questions teams ask
                <span className="faq-hero__title-accent"> before they switch to Verly.</span>
              </h1>
              <p className="faq-hero__subtitle faq-hero__subtitle--centered">
                Pricing, security, setup time, handoff, voice latency — the real stuff. Grouped by topic so you can find what matters fast, or ask the AI directly.
              </p>
            </div>

            <div className="faq-hero__highlights">
              {heroHighlights.map((highlight) => {
                const Icon = highlight.icon;

                return (
                  <div key={highlight.label} className="faq-highlight-card">
                    <div className="faq-highlight-card__icon">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="faq-highlight-card__title">
                        {highlight.label}
                      </p>
                      <p className="faq-highlight-card__description">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="faq-category-grid">
              {faqCategories.map((category) => {
                const Icon = category.icon;

                return (
                  <article
                    key={category.category}
                    className={`faq-category-card ${category.accentClassName}`}
                  >
                    <div className="faq-category-card__header">
                      <div className="faq-category-card__icon">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h2 className="faq-category-card__title">
                      {category.category}
                    </h2>
                    <p className="faq-category-card__description">
                      {category.description}
                    </p>
                    <div className="faq-category-card__footer">
                      <span>{category.questions.length} questions</span>
                      <span>Ready to scan</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="faq-panels">
            {faqCategories.map((category, idx) => {
              const Icon = category.icon;

              return (
                <article
                  key={category.category}
                  className={`faq-panel ${category.panelClassName}`}
                >
                  <div className="faq-panel__header">
                    <div>
                      <h2 className="faq-panel__title">
                        <Icon className="h-5 w-5" />
                        <span>{category.category}</span>
                      </h2>
                      <p className="faq-panel__description">
                        {category.description}
                      </p>
                    </div>
                    <div className="faq-panel__count">
                      {category.questions.length} Q&amp;A
                    </div>
                  </div>

                  <Accordion
                    type="single"
                    collapsible
                    className="faq-accordion"
                  >
                    {category.questions.map((faq, qIdx) => (
                      <AccordionItem
                        key={faq.question}
                        value={`${idx}-${qIdx}`}
                        className="faq-accordion__item"
                      >
                        <AccordionTrigger className="faq-accordion__trigger">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="faq-accordion__content">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </article>
              );
            })}
          </section>

          <FAQAskAIBanner />

        </main>

        <Footer />
      </div>
    </div>
  );
};

export default FaqPage;
