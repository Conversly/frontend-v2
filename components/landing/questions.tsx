'use client';

import { MessageCircle, ChevronDown } from 'lucide-react';
import { useMemo, useState } from 'react';

type FaqItem = {
  question: string;
  answer: string;
};

type FaqCategory = {
  id: 'training-and-support' | 'pricing' | 'technology-and-integrations';
  label: string;
  items: FaqItem[];
};

const DEFAULT_SUPPORT_EMAIL = 'support@conversly.ai';

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'training-and-support',
    label: 'Chatbot Training and Support',
    items: [
      {
        question: `Can I train the chatbot with raw text (no pages/files)?`,
        answer: `Yes — paste raw text into your knowledge base and we’ll index it the same way as scraped pages or uploaded docs. This is perfect for internal SOPs, policies, and “things that aren’t on your website”.`
      },
      {
        question: `What content can I use to train the chatbot?`,
        answer: `Website URLs (single page or full site), sitemaps, docs/knowledge bases, and uploads like PDF/DOCX/TXT/MD. Mix sources — the bot learns better with broader coverage and fewer gaps.`
      },
      {
        question: `Do you automatically re-train when my website changes?`,
        answer: `If you enable auto-sync, we periodically re-crawl/re-index your sources so the bot stays up to date. You can also trigger a manual sync anytime when you ship a big update.`
      },
      {
        question: `What happens when the bot can’t answer?`,
        answer: `You can configure escalation rules so the bot hands off to a human, captures contact info, creates a ticket, or routes the conversation to a team inbox — while preserving full conversation context.`
      },
      {
        question: `How long does training take?`,
        answer: `Usually minutes. It depends on the total content volume and the number of sources. You can start testing immediately as new content is indexed.`
      }
    ]
  },
  {
    id: 'pricing',
    label: 'Pricing',
    items: [
      {
        question: `How does the free trial work?`,
        answer: `You get full access for the trial period (no long-term commitment). When the trial ends, you can upgrade to keep the bot live or stay on a limited/free tier if available.`
      },
      {
        question: `What counts toward usage limits?`,
        answer: `Typically: message volume, indexed content size, and/or number of chatbots/workspaces. If you’re unsure which lever matters most for you, ping support and we’ll map your expected traffic to the right plan.`
      },
      {
        question: `Do you offer plans for agencies?`,
        answer: `Yes — if you’re building bots for clients, we can set you up with an agency-style workflow (multiple bots, separate client environments, and billing options). Email us and we’ll get you the details.`
      }
    ]
  },
  {
    id: 'technology-and-integrations',
    label: 'Technology and Integrations',
    items: [
      {
        question: `Can I embed the chatbot on my website?`,
        answer: `Yes. You can embed it with a snippet and customize branding, colors, position, and behavior. You can also link directly to a hosted chat page.`
      },
      {
        question: `Can I integrate with Slack/Zendesk/CRM tools?`,
        answer: `Yes — integrate via API/webhooks and connect support workflows (handoff, ticket creation, lead capture). If you tell us your stack, we’ll recommend the cleanest integration path.`
      },
      {
        question: `Is the widget customizable / white-label?`,
        answer: `Yes. You can match your site’s design and optionally remove branding depending on your plan. You can also tune tone, model behavior, and escalation triggers.`
      }
    ]
  }
];

function splitIntoColumns<T>(items: T[]) {
  const left: T[] = [];
  const right: T[] = [];
  for (let i = 0; i < items.length; i += 1) {
    (i % 2 === 0 ? left : right).push(items[i]);
  }
  return { left, right };
}

export default function QuestionsSection({
  supportEmail = DEFAULT_SUPPORT_EMAIL
}: {
  supportEmail?: string;
}) {
  const [categoryId, setCategoryId] = useState<FaqCategory['id']>('training-and-support');

  const activeCategory = useMemo(
    () => FAQ_CATEGORIES.find((c) => c.id === categoryId) ?? FAQ_CATEGORIES[0],
    [categoryId]
  );

  const columns = useMemo(() => splitIntoColumns(activeCategory.items), [activeCategory.items]);

  const handleAsk = async (question: string) => {
    // Let the embed/widget listen for this.
    window.dispatchEvent(new CustomEvent('conversly:faqAsk', { detail: { question } }));

    // Copy question for quick paste into the chatbot.
    try {
      await navigator.clipboard.writeText(question);
    } catch {
      // ignore
    }

    // If a widget exists on the page, scroll it into view.
    const widget =
      document.querySelector('#conversly-chat-widget') ??
      document.querySelector('[data-conversly-widget]');
    if (widget instanceof HTMLElement) {
      widget.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section
      className="bg-background py-12 sm:py-16 lg:py-20"
      id="faq"
      data-fast-scroll="faq_viewed"
      data-fast-scroll-threshold="0.6"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center lg:max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            FAQs
          </h2>
          <p className="text-base font-normal text-muted-foreground mt-4 sm:text-lg">
            Have a different question and can&apos;t find the answer you&apos;re looking for? Reach
            out by{' '}
            <a
              href={`mailto:${supportEmail}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              sending us an email
            </a>{' '}
            and we&apos;ll get back to you as soon as we can.
          </p>
        </div>

        <div className="mt-12 border-b border-border sm:mt-16">
          <nav className="flex w-full flex-nowrap gap-6 overflow-x-auto -mb-px sm:gap-8">
            {FAQ_CATEGORIES.map((c) => {
              const active = c.id === categoryId;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategoryId(c.id)}
                  className={[
                    'whitespace-nowrap text-base font-semibold transition-all duration-150 border-b-2 px-0.5 pb-3',
                    active
                      ? 'text-primary border-primary'
                      : 'text-muted-foreground border-transparent hover:text-foreground hover:border-border'
                  ].join(' ')}
                >
                  {c.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="grid grid-cols-1 gap-x-16 gap-y-5 mt-8 lg:grid-cols-2">
          <div className="flow-root">
            <div className="divide-y divide-border -my-6">
              {columns.left.map((faq) => (
                <div key={faq.question} className="relative py-6">
                  <details className="group cursor-pointer transition-all duration-150">
                    <summary className="flex select-none items-center justify-between text-lg font-medium text-foreground pr-16">
                      <span className="flex-1">{faq.question}</span>
                      <button
                        type="button"
                        title="Ask chatbot"
                        className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary transition-colors ml-2 hover:text-primary/90"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          void handleAsk(faq.question);
                        }}
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        Ask
                      </button>
                    </summary>

                    <div className="mt-4">
                      <p className="text-base text-muted-foreground">{faq.answer}</p>
                    </div>
                  </details>

                  <div className="pointer-events-none absolute right-0 top-0 py-7 pl-7 pr-0">
                    <ChevronDown
                      className="h-5 w-5 text-muted-foreground transition-transform duration-150 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flow-root">
            <div className="divide-y divide-border -my-6">
              {columns.right.map((faq) => (
                <div key={faq.question} className="relative py-6">
                  <details className="group cursor-pointer transition-all duration-150">
                    <summary className="flex select-none items-center justify-between text-lg font-medium text-foreground pr-16">
                      <span className="flex-1">{faq.question}</span>
                      <button
                        type="button"
                        title="Ask chatbot"
                        className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary transition-colors ml-2 hover:text-primary/90"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          void handleAsk(faq.question);
                        }}
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        Ask
                      </button>
                    </summary>

                    <div className="mt-4">
                      <p className="text-base text-muted-foreground">{faq.answer}</p>
                    </div>
                  </details>

                  <div className="pointer-events-none absolute right-0 top-0 py-7 pl-7 pr-0">
                    <ChevronDown
                      className="h-5 w-5 text-muted-foreground transition-transform duration-150 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}