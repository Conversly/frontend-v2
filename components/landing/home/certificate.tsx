import React from "react";
import Image from "next/image";
import Link from "next/link";

const Certificate = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8f9ff_50%,#ffffff_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(49,94,234,0.04),transparent_62%)]" />

      <div className="relative mx-auto max-w-[1240px] px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left: Copy */}
          <div className="flex flex-col gap-8">
            <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[34px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#221f1b] md:text-[48px]">
              The best AI support platform,{" "}
              <span className="text-[#315EEA]">
                at an (almost) unbelievable value
              </span>
            </h2>

            <p className="max-w-[540px] text-[16px] leading-[1.7] text-[#6d665d] md:text-[17px]">
              You don&apos;t need to spend a fortune to deliver stellar service.
              Replace Zendesk, Freshdesk, Intercom, and other point solutions
              with Verly to cut costs and get better results.
            </p>

            <div className="rounded-[28px] border border-[#e6e9f2] bg-[#f8f9fd] p-4 shadow-[0_18px_40px_rgba(17,24,39,0.05)]">
              <Image
                src="/g2-badges.svg"
                alt="Award badges for Users Love Us, Best Support, Best Usability, High Performer, and Leader"
                width={830}
                height={158}
                className="h-auto w-full"
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#315EEA] px-8 py-4 text-[17px] font-bold text-white shadow-[0_12px_30px_rgba(49,94,234,0.22)] transition-all duration-300 hover:bg-[#2850d0] hover:shadow-[0_16px_36px_rgba(49,94,234,0.30)] hover:-translate-y-0.5"
              >
                Start free trial
              </Link>
              <Link
                href="https://calendly.com/rdhakad2002/30min"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-4 text-[17px] font-medium text-[#111827] transition-colors hover:bg-gray-50"
              >
                Book a demo
              </Link>
            </div>
          </div>

          {/* Right: Love Wall Visual */}
          <div className="flex items-center justify-center">
            <Image
              src="/love_wall.png"
              alt="Customer love wall with reviews, ratings, and trust signals"
              width={520}
              height={520}
              className="w-full max-w-[520px] h-auto rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificate;
