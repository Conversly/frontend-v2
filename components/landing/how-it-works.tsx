"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { MessageSquare, MessageCircle, Mic, Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

const chatbotFeatures: Feature[] = [
  {
    step: "Step 1",
    title: "Create Your Chatbot",
    content:
      "Start by entering your website URL and selecting a use case. Our AI automatically analyzes your content and creates a personalized chatbot tailored to your business needs.",
    image: "/create_chatbot.png",
  },
  {
    step: "Step 2",
    title: "Add Your Data Sources",
    content:
      "Connect documents, PDFs, or additional websites to expand your chatbot's knowledge base. Upload files or integrate with your existing data sources for comprehensive coverage.",
    image: "/data_sources.png",
  },
  {
    step: "Step 3",
    title: "Customize Appearance",
    content:
      "Brand your chatbot with your colors, logo, and personality. Adjust the chat widget's design to match your website's aesthetic and set the tone of conversations.",
    image: "/customise_apperances.png",
  },
  {
    step: "Step 4",
    title: "Embed on Your Website",
    content:
      "Copy the embed code and paste it into your website. Your chatbot will be live instantly, ready to answer customer questions 24/7 and improve engagement.",
    image: "/embeded_web.png",
  },
]

const whatsappFeatures: Feature[] = [
  {
    step: "Step 1",
    title: "Create Meta App",
    content:
      "Go to Meta for Developers and create a new Business app. Choose 'Business' as app type and add WhatsApp product to get started.",
    image: "/create_meta_app.png",
  },
  {
    step: "Step 2",
    title: "Get Phone Number ID",
    content:
      "In your app dashboard, go to WhatsApp → API Setup. Copy the Phone Number ID (15-16 digits) which will be used to connect your WhatsApp account.",
    image: "/get_phone_id.png",
  },
  {
    step: "Step 3",
    title: "Generate Access Token",
    content:
      "Create a System User in Business Settings and generate a permanent token with whatsapp_business_messaging permission for production use.",
    image: "/generate_access_token.png",
  },
  {
    step: "Step 4",
    title: "Configure Webhook",
    content:
      "Add the webhook URL and verify token in WhatsApp → Configuration. Subscribe to messages and message_template_status_update events to start receiving messages.",
    image: "/embeed.png",
  },
]

const voiceFeatures: Feature[] = [
  {
    step: "Step 1",
    title: "Create Your Chatbot",
    content:
      "Start by creating your chatbot with your knowledge base. This serves as the foundation for your voice agent, providing the AI with context and information.",
    image: "/create_chatbot_voice.png",
  },
  {
    step: "Step 2",
    title: "Configure Voice Settings",
    content:
      "Choose your voice model, language, and voice characteristics. Select from various TTS providers and customize the voice to match your brand personality.",
    image: "/voice_config.png",
  },
  {
    step: "Step 3",
    title: "Set Up Voice Model",
    content:
      "Configure speech-to-text and text-to-speech models. Choose from Deepgram, AssemblyAI, or ElevenLabs to ensure natural conversations with optimal accuracy.",
    image: "/set_up_voice.png",
  },
  {
    step: "Step 4",
    title: "Deploy Voice Agent",
    content:
      "Your voice agent is ready! Integrate it into your phone system or use our hosted solution. Start handling calls 24/7 with natural, AI-powered conversations.",
    image: "/deploy_voice.png",
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

function ScrollableFeatureSteps({ features }: { features: Feature[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (latest) => {
      // Map scroll progress (0 to 1) to steps (0 to features.length - 1)
      const stepSize = 1 / features.length
      const currentStep = Math.min(
        Math.floor(latest / stepSize),
        features.length - 1
      )
      setActiveIndex(currentStep)
    })
    return () => unsub()
  }, [scrollYProgress, features.length])

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full">
      <div className="sticky top-[100px] h-[calc(100vh-140px)] w-full overflow-hidden flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-center">

        {/* Left Side: Steps */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center h-full px-4 lg:pl-8 z-20">
          <div className="space-y-8 lg:space-y-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={cn(
                  "group flex gap-4 transition-all duration-300",
                  activeIndex === index ? "opacity-100 scale-100" : "opacity-40 scale-95"
                )}
                animate={{
                  opacity: activeIndex === index ? 1 : 0.4,
                  scale: activeIndex === index ? 1 : 0.95,
                  x: activeIndex === index ? 0 : -20
                }}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={cn(
                    "relative flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold transition-all duration-300 z-10",
                    activeIndex === index
                      ? "bg-primary border-primary text-primary-foreground"
                      : "bg-muted border-border text-muted-foreground"
                  )}>
                    {index + 1}
                  </div>
                  {index < features.length - 1 && (
                    <div className="w-[2px] h-full bg-border/50 absolute top-8 left-[15px] -z-10" />
                  )}
                </div>

                <div className="flex-1 space-y-2 pt-1">
                  <h3 className={cn(
                    "text-xl font-semibold transition-colors duration-300",
                    activeIndex === index ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {feature.title || feature.step}
                  </h3>
                  <p className="text-muted-foreground text-sm lg:text-base max-w-md">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Image with Isometric/3D effect */}
        <div className="hidden lg:flex w-1/2 h-full items-center justify-center relative perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="relative w-[500px] h-[500px]"
              initial={{ opacity: 0, rotateX: -20, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, rotateX: 20, y: -50, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Decorative background blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-3xl opacity-20 rounded-full pointer-events-none" />

              {/* Glassmorphism Card */}
              <div className="relative z-10 w-full h-full bg-background/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl transform-gpu">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                <div className="p-8 h-full flex items-center justify-center">
                  <Image
                    src={features[activeIndex].image}
                    alt={features[activeIndex].title || "Feature Image"}
                    width={500}
                    height={500}
                    className="object-contain w-full h-full drop-shadow-xl"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <section className="py-20 relative bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
            Get started in minutes
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            How to get Started
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We transform your knowledge base into a{" "}
            <span className="text-foreground font-medium">production-ready</span>{" "}
            AI agent optimized for{" "}
            <span className="text-primary font-medium">accuracy and speed</span>.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue={tabs[0].value} className="w-full">
          <div className="flex justify-center mb-12 sticky top-20 z-30">
            <div className="bg-muted/80 backdrop-blur-sm border border-border/50 p-1.5 rounded-full inline-flex shadow-sm">
              <TabsList className="h-auto bg-transparent border-0 p-0 gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="group flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-300 hover:bg-background/50"
                    >
                      <Icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
                      {tab.label}
                    </TabsTrigger>
                  )
                })}
              </TabsList>
            </div>
          </div>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-0">
              <ScrollableFeatureSteps features={tab.features} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}



// "use client"

// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { cn } from "@/lib/utils"
// import { MessageSquare, MessageCircle, Mic, Check } from "lucide-react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import Image from "next/image"

// interface Feature {
//   step: string
//   title?: string
//   content: string
//   image: string
// }

// interface FeatureStepsProps {
//   features: Feature[]
//   className?: string
//   title?: string
//   autoPlayInterval?: number
//   imageHeight?: string
// }

// function FeatureSteps({
//   features,
//   className,

//   autoPlayInterval = 3000,
//   imageHeight = "h-[400px]",
// }: FeatureStepsProps) {
//   const [currentFeature, setCurrentFeature] = useState(0)
//   const [progress, setProgress] = useState(0)

//   useEffect(() => {
//     const timer = setInterval(() => {
//       if (progress < 100) {
//         setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
//       } else {
//         setCurrentFeature((prev) => (prev + 1) % features.length)
//         setProgress(0)
//       }
//     }, 100)

//     return () => clearInterval(timer)
//   }, [progress, features.length, autoPlayInterval])

//   return (
//     <div className={cn("py-8 md:py-12", className)}>
//       <div className="w-full">


//         <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10">
//           <div className="order-2 md:order-1 space-y-8">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={index}
//                 className="flex items-center gap-6 md:gap-8 cursor-pointer group"
//                 initial={{ opacity: 0.6, x: -20 }}
//                 whileInView={{ opacity: index === currentFeature ? 1 : 0.6, x: 0 }}
//                 viewport={{ once: true }}
//                 animate={{ opacity: index === currentFeature ? 1 : 0.6 }}
//                 transition={{ duration: 0.5 }}
//                 whileHover={{ x: 5, opacity: index === currentFeature ? 1 : 0.8 }}
//                 onClick={() => {
//                   setCurrentFeature(index)
//                   setProgress(0)
//                 }}
//               >
//                 <motion.div
//                   className={cn(
//                     "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all",
//                     index === currentFeature
//                       ? "bg-primary border-primary text-primary-foreground scale-110"
//                       : "bg-muted border-muted-foreground",
//                   )}
//                 >
//                   {index <= currentFeature ? (
//                     <span className="text-lg font-bold">✓</span>
//                   ) : (
//                     <span className="text-lg font-semibold">{index + 1}</span>
//                   )}
//                 </motion.div>

//                 <div className="flex-1">
//                   <h3 className="text-xl md:text-2xl font-semibold">
//                     {feature.title || feature.step}
//                   </h3>
//                   <p className="text-sm md:text-lg text-muted-foreground">
//                     {feature.content}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           <div
//             className={cn(
//               "order-1 md:order-2 relative h-[300px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg"
//             )}
//           >
//             <AnimatePresence mode="wait">
//               {features.map(
//                 (feature, index) =>
//                   index === currentFeature && (
//                     <motion.div
//                       key={index}
//                       className="absolute inset-0 rounded-lg overflow-hidden"
//                       initial={{ y: 100, opacity: 0, rotateX: -20 }}
//                       animate={{ y: 0, opacity: 1, rotateX: 0 }}
//                       exit={{ y: -100, opacity: 0, rotateX: 20 }}
//                       transition={{ duration: 0.5, ease: "easeInOut" }}
//                     >
//                       <Image
//                         src={feature.image}
//                         alt={feature.step}
//                         fill
//                         sizes="(max-width: 768px) 100vw, 50vw"
//                         className="object-contain"
//                       />
//                     </motion.div>
//                   ),
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// const chatbotFeatures: Feature[] = [
//   {
//     step: "Step 1",
//     title: "Create Your Chatbot",
//     content:
//       "Start by entering your website URL and selecting a use case. Our AI automatically analyzes your content and creates a personalized chatbot tailored to your business needs.",
//     image:
//       "/create_chatbot.png",
//   },
//   {
//     step: "Step 2",
//     title: "Add Your Data Sources",
//     content:
//       "Connect documents, PDFs, or additional websites to expand your chatbot's knowledge base. Upload files or integrate with your existing data sources for comprehensive coverage.",
//     image:
//       "/data_sources.png",
//   },
//   {
//     step: "Step 3",
//     title: "Customize Appearance",
//     content:
//       "Brand your chatbot with your colors, logo, and personality. Adjust the chat widget's design to match your website's aesthetic and set the tone of conversations.",
//     image:
//       "/customise_apperances.png",
//   },
//   {
//     step: "Step 4",
//     title: "Embed on Your Website",
//     content:
//       "Copy the embed code and paste it into your website. Your chatbot will be live instantly, ready to answer customer questions 24/7 and improve engagement.",
//     image:
//       "/embeded_web.png",
//   },
// ]

// const whatsappFeatures: Feature[] = [
//   {
//     step: "Step 1",
//     title: "Create Meta App",
//     content:
//       "Go to Meta for Developers and create a new Business app. Choose 'Business' as app type and add WhatsApp product to get started.",
//     image:
//       "/create_meta_app.png",
//   },
//   {
//     step: "Step 2",
//     title: "Get Phone Number ID",
//     content:
//       "In your app dashboard, go to WhatsApp → API Setup. Copy the Phone Number ID (15-16 digits) which will be used to connect your WhatsApp account.",
//     image:
//       "/get_phone_id.png",
//   },
//   {
//     step: "Step 3",
//     title: "Generate Access Token",
//     content:
//       "Create a System User in Business Settings and generate a permanent token with whatsapp_business_messaging permission for production use.",
//     image:
//       "/generate_access_token.png",
//   },
//   {
//     step: "Step 4",
//     title: "Configure Webhook",
//     content:
//       "Add the webhook URL and verify token in WhatsApp → Configuration. Subscribe to messages and message_template_status_update events to start receiving messages.",
//     image:
//       "/embeed.png",
//   },
// ]

// const voiceFeatures: Feature[] = [
//   {
//     step: "Step 1",
//     title: "Create Your Chatbot",
//     content:
//       "Start by creating your chatbot with your knowledge base. This serves as the foundation for your voice agent, providing the AI with context and information.",
//     image:
//       "/create_chatbot_voice.png",
//   },
//   {
//     step: "Step 2",
//     title: "Configure Voice Settings",
//     content:
//       "Choose your voice model, language, and voice characteristics. Select from various TTS providers and customize the voice to match your brand personality.",
//     image:
//       "/voice_config.png",
//   },
//   {
//     step: "Step 3",
//     title: "Set Up Voice Model",
//     content:
//       "Configure speech-to-text and text-to-speech models. Choose from Deepgram, AssemblyAI, or ElevenLabs to ensure natural conversations with optimal accuracy.",
//     image:
//       "/set_up_voice.png",
//   },
//   {
//     step: "Step 4",
//     title: "Deploy Voice Agent",
//     content:
//       "Your voice agent is ready! Integrate it into your phone system or use our hosted solution. Start handling calls 24/7 with natural, AI-powered conversations.",
//     image:
//       "/deploy_voice.png",
//   },
// ]

// const tabs = [
//   {
//     value: "chatbot",
//     icon: MessageSquare,
//     label: "Chatbot",
//     features: chatbotFeatures,
//   },
//   {
//     value: "whatsapp",
//     icon: MessageCircle,
//     label: "WhatsApp",
//     features: whatsappFeatures,
//   },
//   {
//     value: "voice",
//     icon: Mic,
//     label: "Voice",
//     features: voiceFeatures,
//   },
// ]

// export default function HowItWorks() {
//   return (
//     <section className="py-10 lg:py-20 relative overflow-hidden">
//       {/* Background Effects */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-transparent opacity-30" />
//       </div>

//       <div className="relative w-full">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16 space-y-4"
//         >
//           <p className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
//             Get started in minutes
//           </p>
//           <motion.h2
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.1, duration: 0.6 }}
//             className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground"
//           >
//             How to get Started
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.2, duration: 0.6 }}
//             className="text-lg text-muted-foreground max-w-3xl mx-auto"
//           >
//             We transform your knowledge base into a{" "}
//             <span className="text-foreground">reliable and production-ready</span>{" "}
//             AI-powered{" "}
//             <span className="text-primary">
//               answer engine optimized for accuracy
//             </span>
//             .
//           </motion.p>
//         </motion.div>

//         <Tabs defaultValue={tabs[0].value} className="relative z-10 w-full">
//           <div className="flex justify-center mb-8">
//             <TabsList className="flex flex-col sm:flex-row h-auto bg-muted/50 p-1 rounded-full gap-1 border border-border/50">
//               {tabs.map((tab) => {
//                 const Icon = tab.icon
//                 return (
//                   <motion.div
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <TabsTrigger
//                       key={tab.value}
//                       value={tab.value}
//                       className="group flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-300 hover:bg-muted/50"
//                     >
//                       <Icon className="h-4 w-4 shrink-0 group-data-[state=active]:hidden transition-transform group-hover:scale-110" />
//                       <Check className="h-4 w-4 shrink-0 hidden group-data-[state=active]:block" />
//                       {tab.label}
//                     </TabsTrigger>
//                   </motion.div>
//                 )
//               })}
//             </TabsList>
//           </div>

//           {tabs.map((tab) => (
//             <TabsContent key={tab.value} value={tab.value}>
//               <FeatureSteps
//                 features={tab.features}
//                 autoPlayInterval={4000}
//                 className="relative z-10"
//               />
//             </TabsContent>
//           ))}
//         </Tabs>
//       </div>
//     </section>
//   )
// }
