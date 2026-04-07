import Image from "next/image";

const showcaseItems = [
  {
    id: "conversations",
    title: "Every Conversation",
    eyebrow: "Learning from real interactions",
    shortDesc: "Each chat makes the system smarter.",
    description:
      "Every customer conversation is a training signal. The system captures what was asked, how it was resolved, and what language worked - building a deeper understanding of your customers with every interaction.",
    image: "/escalation-analytics.png",
    highlights: [
      "Real-time learning",
      "Pattern recognition",
      "Context retention",
      "Resolution tracking",
    ],
  },
  {
    id: "user-feedback",
    title: "Customer Feedback",
    eyebrow: "Powered by real ratings",
    shortDesc: "Customers shape the responses they get.",
    description:
      "Thumbs up, thumbs down, CSAT scores - every piece of customer feedback tells the system what's working and what isn't. Responses that delight get reinforced; ones that miss the mark get refined automatically.",
    image: "/customer_feedback.png",
    highlights: [
      "CSAT-driven tuning",
      "Sentiment analysis",
      "Quality scoring",
      "Auto-refinement",
    ],
  },
  {
    id: "self-improving",
    title: "Continuous Evolution",
    eyebrow: "Gets better every single day",
    shortDesc: "AI that never stops improving.",
    description:
      "Conversations, customer ratings, and agent corrections all feed into a single loop. The system compounds what it learns - so your support quality keeps climbing week after week, without extra effort.",
    image: "/always_improve.png",
    highlights: [
      "Compounding intelligence",
      "Adaptive responses",
      "Zero manual training",
      "Always improving",
    ],
  },
  {
    id: "agent-feedback",
    title: "Agent Corrections",
    eyebrow: "Your team trains the AI",
    shortDesc: "Agents teach, the system remembers.",
    description:
      "When an agent edits a draft, overrides a suggestion, or adds missing context - the system learns from it. Your team's expertise feeds directly into smarter, more accurate responses over time.",
    image: "/improve-the-ans.png",
    highlights: [
      "Draft corrections",
      "Override learning",
      "Expertise capture",
      "Accuracy improvement",
    ],
  },
] as const;

export default function FeatureShowcase() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f4ee_0%,#efeade_100%)] py-16 text-[#1d1d1b] md:py-24"
    >
      <div className="mx-auto flex max-w-[1360px] flex-col gap-10 px-4 md:px-6">
        <div className="mx-auto max-w-[780px] text-center">
          <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[36px] leading-[1.05] tracking-[-0.04em] text-[#221f1b] md:text-[56px]">
            A system that learns
            <span className="block text-[#8a7d6b]">and never stops improving.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-7 text-[#6d665d] md:text-[17px]">
            Every conversation, customer rating, and agent correction feeds back into the system -
            so your support gets smarter every single day.
          </p>
        </div>

        <div className="grid gap-6">
          {showcaseItems.map((item, index) => {
            const reverseLayout = index % 2 === 1;

            return (
              <article
                key={item.id}
                className="overflow-hidden rounded-[28px] border border-[#ddd7ca] bg-white shadow-[0_30px_80px_rgba(59,43,22,0.10)]"
              >
                <div className="grid gap-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
                  <div className={`${reverseLayout ? "lg:order-2" : ""}`}>
                    <div className="p-3 md:p-4">
                      <div className="relative min-h-[380px] w-full overflow-hidden rounded-[20px] border border-[#ebe5da] bg-[#f7f3ec] sm:min-h-[440px] lg:min-h-[520px]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-contain object-center"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className={`relative overflow-hidden bg-gradient-to-br from-[#e8e0d0] via-[#ddd5c3] to-[#d0c7b3] px-5 py-6 md:px-7 md:py-7 lg:px-6 lg:py-6 ${
                      reverseLayout ? "lg:order-1" : ""
                    }`}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.04]"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 1px 1px, #000 0.5px, transparent 0.5px)",
                        backgroundSize: "24px 24px",
                      }}
                    />

                    <div className="relative mx-auto flex h-full max-w-[430px] flex-col justify-center">
                      <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#7b6f5f]">
                        {item.eyebrow}
                      </p>
                      <h3 className="mt-3 font-[Georgia,Times,'Times_New_Roman',serif] text-[32px] leading-[1.05] tracking-[-0.04em] text-[#221f1b] md:text-[40px]">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-[15px] leading-7 text-[#655e55] md:text-[16px]">
                        {item.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="rounded-full border border-white/60 bg-white/75 px-3.5 py-1.5 text-[12px] font-medium text-[#474038]"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
