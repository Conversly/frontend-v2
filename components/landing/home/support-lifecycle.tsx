import { Sparkles } from "lucide-react";

import FullscreenVideo from "@/components/landing/home/fullscreen-video";

export default function SupportLifecycle() {
  return (
    <section
      id="support-lifecycle"
      className="landing-home-section landing-home-section--soft py-14 text-[#19253b] md:py-16 lg:py-[4.5rem]"
    >
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,450px)_minmax(0,1fr)] xl:gap-10">
          <div className="max-w-[540px] lg:pr-4">
            <div className="landing-home-eyebrow mb-6">
              <Sparkles className="h-4 w-4" />
              Lifecycle Solution
            </div>
            <h2 className="landing-home-title max-w-[13ch] sm:text-[32px] md:text-[42px] lg:max-w-none lg:text-[48px]">
              A complete customer support lifecycle solution
            </h2>
            <p className="landing-home-copy mt-7 max-w-[560px] text-[18px] leading-[1.65] sm:text-[20px]">
              Verly captures every conversation, learns your business context, provides instant
              support on WhatsApp and Voice, and escalates to humans when it matters most.
            </p>
          </div>

          <ProductMockup />
        </div>
      </div>
    </section>
  );
}
function ProductMockup() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-[#0050d4]/5 via-transparent to-[#6a37d4]/4" />

      <div className="relative w-full max-w-[1080px]">
        <div className="overflow-hidden rounded-[24px] border border-[#d7e3f5] bg-[#081121] shadow-[0_28px_70px_rgba(15,23,42,0.16)]">
          <FullscreenVideo
            as="div"
            embedded
            className="aspect-[21/11] min-h-[360px] bg-[#081121] sm:min-h-[420px] lg:min-h-[500px]"
          />
        </div>
      </div>
    </div>
  );
}
