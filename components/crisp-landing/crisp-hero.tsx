"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function CrispHero() {
  return (
    <div className="home-hero">
      <div className="common-hero home-hero__inner">
        <div className="common-hero__wrapper">
          <motion.div
            className="page-main-title page-main-title--large page-main-title--black page-main-title--title common-hero__title"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <div className="page-wrapper page-wrapper--generic page-wrapper--regular page-main-title__wrapper">
              <motion.div variants={fadeUp} className="page-main-title__title-wrapper">
                <h1 className="page-main-title__title font-[Georgia,Times,'Times_New_Roman',serif]">
                  <span>
                    The AI customer support platform for{" "}
                    <span className="emphasis">
                      <span className="emphasis-text">Web, WhatsApp & Voice.</span>
                    </span>
                  </span>
                </h1>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="mx-auto mt-5 max-w-[620px] text-[17px] leading-[1.7] text-slate-600 md:text-[19px]"
              >
                One platform for AI agents, human handoff, and omnichannel support — deploy in minutes, not months.
              </motion.p>

              <motion.div variants={fadeUp} className="page-main-title__buttons mt-8">
                <div className="common-signup-cta common-signup-cta--medium home-hero__signup-cta">
                  <div className="common-signup-cta__field">
                    <a
                      href="/login"
                      rel="noopener noreferrer"
                      className="common-button common-button--blue common-button--medium font-sans-bold common-button--roundish"
                    >
                      <span className="common-button__label ellipsis">Start free</span>
                      <svg
                        className="common-icon common-button__icon common-button__icon--right"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 10h10M11 6l4 4-4 4" />
                      </svg>
                    </a>
                    <a
                      href="https://calendly.com/rdhakad2002/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="common-button common-button--white common-button--medium font-sans-bold common-button--roundish"
                    >
                      <span className="common-button__label ellipsis">Book a demo</span>
                    </a>
                  </div>

                  <motion.div
                    variants={fadeUp}
                    className="mt-10 flex flex-wrap justify-center gap-3"
                  >
                    {["No setup fee", "24/7 AI support", "No credit card required", "Cancel any time", "30-day free trial"].map(
                      (chip, i) => (
                        <motion.span
                          key={chip}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + i * 0.06, duration: 0.4 }}
                          className="home-hero__benefit-chip"
                        >
                          {chip}
                        </motion.span>
                      )
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="home-hero-app home-hero__app"
          style={{ "--73f2e486": "40%" } as React.CSSProperties}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          <div className="home-hero-app__container">
            <div className="common-ghost-container common-ghost-container--white home-hero-app__screenshot-container">
              <div className="common-ghost-container__content home-hero-app__content">
                <div className="home-hero-app__screenshot">
                  <Image
                    src="/dashboard.png"
                    alt="Verly AI helpdesk dashboard"
                    width={980}
                    height={600}
                    priority
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="common-hero__background">
        <div
          className="common-decor common-decor--hide-on-mobile home-hero-background"
          style={{ backgroundColor: "transparent" } as React.CSSProperties}
        >
          <div className="common-decor__grid" />
          <picture className="common-decor__texture common-decor__texture--full">
            <img
              alt="home-hero-background"
              loading="eager"
              src="/wallpaper.jpg"
              className="w-full h-full object-cover object-center"
            />
          </picture>
        </div>
      </div>
    </div>
  );
}
