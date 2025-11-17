"use client"

import { useState, useEffect } from "react"

const steps = [
  {
    title: "Connect Your Data",
    description: "Upload documents or connect your website to train your AI assistant with your knowledge base.",
    image: "https://images.unsplash.com/photo-1720371300677-ba4838fa0678?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Deploy AI Assistant",
    description: "Embed on your website, integrate via API, or use our hosted solution for instant deployment.",
    image: "https://images.unsplash.com/photo-1720371300677-ba4838fa0678?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Track & Optimize",
    description: "Monitor usage, gather insights, and continuously improve your AI's performance.",
    image: "https://images.unsplash.com/photo-1720371300677-ba4838fa0678?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]

const CYCLE_DURATION = 5000 // 5 seconds per step

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + (100 / (CYCLE_DURATION / 50))
      })
    }, 50)

    return () => clearInterval(progressInterval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      setActiveIndex((prev) => (prev + 1) % steps.length)
      setProgress(0)
    }
  }, [progress])

  const handleAccordionClick = (index: number) => {
    setActiveIndex(index)
    setProgress(0)
  }

  return (
    <section className="bg-background py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-transparent opacity-30" />
        <div className="absolute inset-0 bg-grid-foreground/5 [mask-image:radial-gradient(background,transparent_70%)]" />
      </div>

      <div className="container mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">How it works</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We transform your knowledge base into an <span className="text-foreground">reliable and production-ready</span>{" "}
            AI-powered <span className="text-primary">answer engine optimized for accuracy</span>.
          </p>
        </div>

        {/* Main Content */}
        <div className="w-full h-full lg:h-[450px] flex items-center justify-center">
          <div className="w-full">
            <div className="flex w-full flex-col items-center justify-center max-w-7xl mx-auto">
              <div className="grid h-full grid-cols-5 gap-x-10 px-10 md:px-20 items-center w-full">
                {/* Accordion - Desktop Only */}
                <div className="col-span-2 w-full h-full hidden lg:flex md:items-center justify-start">
                  <div className="w-full h-full flex flex-col gap-8" data-orientation="vertical">
                    {steps.map((step, index) => {
                      const isOpen = activeIndex === index
                      return (
                        <div
                          key={index}
                          data-state={isOpen ? "open" : "closed"}
                          data-orientation="vertical"
                          className="mt-px overflow-hidden focus-within:relative focus-within:z-10 relative data-[state=open]:bg-white dark:data-[state=open]:bg-[#27272A] rounded-lg data-[state=closed]:rounded-none data-[state=closed]:border-0 dark:data-[state=open]:shadow-[0px_0px_0px_1px_rgba(249,250,251,0.06),0px_0px_0px_1px_var(--color-zinc-800,#27272A),0px_1px_2px_-0.5px_rgba(0,0,0,0.24),0px_2px_4px_-1px_rgba(0,0,0,0.24)] data-[state=open]:shadow-[0px_0px_1px_0px_rgba(0,0,0,0.16),0px_1px_2px_-0.5px_rgba(0,0,0,0.16)]"
                        >
                          {/* Progress Bar */}
                          <div
                            className="absolute overflow-hidden rounded-lg transition-opacity data-[state=closed]:opacity-0 data-[state=open]:opacity-100 bg-neutral-300/50 dark:bg-neutral-300/30 left-0 right-0 bottom-0 h-0.5 w-full"
                            data-state={isOpen ? "open" : "closed"}
                          >
                            <div
                              className="absolute transition-all ease-linear bg-primary left-0 top-0 h-full"
                              style={{
                                width: isOpen ? `${progress}%` : "0%",
                                transitionDuration: "50ms",
                              }}
                            />
                          </div>

                          {/* Accordion Header */}
                          <h3 data-orientation="vertical" data-state={isOpen ? "open" : "closed"} className="flex">
                            <button
                              type="button"
                              aria-expanded={isOpen}
                              data-state={isOpen ? "open" : "closed"}
                              data-orientation="vertical"
                              onClick={() => handleAccordionClick(index)}
                              className="group flex h-[45px] flex-1 cursor-pointer items-center justify-between p-3 outline-none font-semibold text-lg tracking-tight text-left"
                            >
                              {step.title}
                            </button>
                          </h3>

                          {/* Accordion Content */}
                          {isOpen && (
                            <div
                              data-state="open"
                              role="region"
                              data-orientation="vertical"
                              className="overflow-hidden text-sm font-medium"
                            >
                              <div className="p-3">{step.description}</div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Image Display */}
                <div className="col-span-5 h-[350px] min-h-[200px] w-auto lg:col-span-3">
                  <div className="relative h-full w-full overflow-hidden">
                    <img
                      alt={steps[activeIndex].title}
                      className="aspect-auto h-full w-full rounded-xl border border-neutral-300/50 object-cover p-1 transition-all duration-300"
                      loading="eager"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      src={steps[activeIndex].image}
                      style={{ opacity: 1, filter: "blur(0px)" }}
                    />
                  </div>
                </div>

                {/* Mobile Horizontal Scroll */}
                <ul
                  className="col-span-5 flex snap-x flex-nowrap overflow-x-auto [-ms-overflow-style:none] [-webkit-mask-image:linear-gradient(90deg,transparent,black_10%,white_90%,transparent)] [mask-image:linear-gradient(90deg,transparent,black_10%,white_90%,transparent)] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden snap-mandatory"
                  style={{ padding: "50px calc(50%)" }}
                >
                  {steps.map((step, index) => {
                    const isActive = activeIndex === index
                    return (
                      <a
                        key={index}
                        onClick={() => handleAccordionClick(index)}
                        className="card relative grid h-full max-w-64 shrink-0 items-start justify-center p-3 bg-background border-l last:border-r border-t border-b first:rounded-tl-xl last:rounded-tr-xl cursor-pointer"
                        style={{ scrollSnapAlign: "center" }}
                      >
                        <div
                          className="absolute overflow-hidden rounded-lg transition-opacity data-[state=closed]:opacity-0 data-[state=open]:opacity-100 bg-neutral-300/50 dark:bg-neutral-300/30 left-0 right-0 bottom-0 h-0.5 w-full"
                          data-state={isActive ? "open" : "closed"}
                        >
                          <div
                            className="absolute transition-all ease-linear bg-primary left-0 top-0 h-full"
                            style={{
                              width: isActive ? `${progress}%` : "0%",
                              transitionDuration: "50ms",
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <h2 className="text-lg font-bold">{step.title}</h2>
                          <p className="mx-0 max-w-sm text-balance text-sm font-medium leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </a>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

