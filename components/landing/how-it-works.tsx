"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { MessageSquare, MessageCircle, Mic, Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  autoPlayInterval?: number
  imageHeight?: string
}

function FeatureSteps({
  features,
  className,

  autoPlayInterval = 3000,
  imageHeight = "h-[400px]",
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setProgress(0)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [progress, features.length, autoPlayInterval])

  return (
    <div className={cn("p-8 md:p-12", className)}>
      <div className="max-w-7xl mx-auto w-full">


        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10">
          <div className="order-2 md:order-1 space-y-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-6 md:gap-8 cursor-pointer"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: index === currentFeature ? 1 : 0.3 }}
                transition={{ duration: 0.5 }}
                onClick={() => {
                  setCurrentFeature(index)
                  setProgress(0)
                }}
              >
                <motion.div
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all",
                    index === currentFeature
                      ? "bg-primary border-primary text-primary-foreground scale-110"
                      : "bg-muted border-muted-foreground",
                  )}
                >
                  {index <= currentFeature ? (
                    <span className="text-lg font-bold">✓</span>
                  ) : (
                    <span className="text-lg font-semibold">{index + 1}</span>
                  )}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {feature.title || feature.step}
                  </h3>
                  <p className="text-sm md:text-lg text-muted-foreground">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className={cn(
              "order-1 md:order-2 relative h-[300px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg"
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 rounded-lg overflow-hidden"
                      initial={{ y: 100, opacity: 0, rotateX: -20 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -100, opacity: 0, rotateX: 20 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <img
                        src={feature.image}
                        alt={feature.step}
                        className="w-full h-full object-contain transition-transform transform"
                      />

                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

const chatbotFeatures: Feature[] = [
  {
    step: "Step 1",
    title: "Create Your Chatbot",
    content:
      "Start by entering your website URL and selecting a use case. Our AI automatically analyzes your content and creates a personalized chatbot tailored to your business needs.",
    image:
      "/create_chatbot.png",
  },
  {
    step: "Step 2",
    title: "Add Your Data Sources",
    content:
      "Connect documents, PDFs, or additional websites to expand your chatbot's knowledge base. Upload files or integrate with your existing data sources for comprehensive coverage.",
    image:
      "/data_sources.png",
  },
  {
    step: "Step 3",
    title: "Customize Appearance",
    content:
      "Brand your chatbot with your colors, logo, and personality. Adjust the chat widget's design to match your website's aesthetic and set the tone of conversations.",
    image:
      "/customise_apperances.png",
  },
  {
    step: "Step 4",
    title: "Embed on Your Website",
    content:
      "Copy the embed code and paste it into your website. Your chatbot will be live instantly, ready to answer customer questions 24/7 and improve engagement.",
    image:
      "/embeded_web.png",
  },
]

const whatsappFeatures: Feature[] = [
  {
    step: "Step 1",
    title: "Create Meta App",
    content:
      "Go to Meta for Developers and create a new Business app. Choose 'Business' as app type and add WhatsApp product to get started.",
    image:
      "/create_meta_app.png",
  },
  {
    step: "Step 2",
    title: "Get Phone Number ID",
    content:
      "In your app dashboard, go to WhatsApp → API Setup. Copy the Phone Number ID (15-16 digits) which will be used to connect your WhatsApp account.",
    image:
      "/get_phone_id.png",
  },
  {
    step: "Step 3",
    title: "Generate Access Token",
    content:
      "Create a System User in Business Settings and generate a permanent token with whatsapp_business_messaging permission for production use.",
    image:
      "/generate_access_token.png",
  },
  {
    step: "Step 4",
    title: "Configure Webhook",
    content:
      "Add the webhook URL and verify token in WhatsApp → Configuration. Subscribe to messages and message_template_status_update events to start receiving messages.",
    image:
      "/embeed.png",
  },
]

const voiceFeatures: Feature[] = [
  {
    step: "Step 1",
    title: "Create Your Chatbot",
    content:
      "Start by creating your chatbot with your knowledge base. This serves as the foundation for your voice agent, providing the AI with context and information.",
    image:
      "/create_chatbot_voice.png",
  },
  {
    step: "Step 2",
    title: "Configure Voice Settings",
    content:
      "Choose your voice model, language, and voice characteristics. Select from various TTS providers and customize the voice to match your brand personality.",
    image:
      "/voice_config.png",
  },
  {
    step: "Step 3",
    title: "Set Up Voice Model",
    content:
      "Configure speech-to-text and text-to-speech models. Choose from Deepgram, AssemblyAI, or ElevenLabs to ensure natural conversations with optimal accuracy.",
    image:
      "/set_up_voice.png",
  },
  {
    step: "Step 4",
    title: "Deploy Voice Agent",
    content:
      "Your voice agent is ready! Integrate it into your phone system or use our hosted solution. Start handling calls 24/7 with natural, AI-powered conversations.",
    image:
      "/deploy_voice.png",
  },
]

const tabs = [
  {
    value: "chatbot",
    icon: MessageSquare,
    label: "Chatbot",
    features: chatbotFeatures,
  },
  {
    value: "whatsapp",
    icon: MessageCircle,
    label: "WhatsApp",
    features: whatsappFeatures,
  },
  {
    value: "voice",
    icon: Mic,
    label: "Voice",
    features: voiceFeatures,
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-transparent opacity-30" />
      </div>

      <div className="relative w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How to get Started
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            We transform your knowledge base into a{" "}
            <span className="text-foreground">reliable and production-ready</span>{" "}
            AI-powered{" "}
            <span className="text-primary">
              answer engine optimized for accuracy
            </span>
            .
          </p>
        </div>

        <Tabs defaultValue={tabs[0].value} className="relative z-10 w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="flex flex-col sm:flex-row h-auto bg-muted/50 p-1 rounded-full gap-1 border border-border/50">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="group flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-300"
                  >
                    <Icon className="h-4 w-4 shrink-0 group-data-[state=active]:hidden" />
                    <Check className="h-4 w-4 shrink-0 hidden group-data-[state=active]:block" />
                    {tab.label}
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </div>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <FeatureSteps
                features={tab.features}
                autoPlayInterval={4000}
                className="relative z-10"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
