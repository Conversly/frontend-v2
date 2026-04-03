import {
  ShoppingCart,
  Laptop,
  Heart,
  Utensils,
  Building,
  GraduationCap,
  Plane,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

export interface SolutionDetail {
  slug: string;
  icon: LucideIcon;
  title: string;
  category: string;
  description: string;
  color: string;
  bg: string;
  features: string[];

  heroTagline: string;
  heroSubtitle: string;
  tags: string[];

  painPoints: { title: string; description: string }[];
  capabilities: { title: string; description: string }[];
  useCases: { title: string; scenario: string; outcome: string }[];
  metrics: { value: string; label: string }[];
  faqItems: { question: string; answer: string }[];
  relatedSlugs: string[];
}

export const solutions: SolutionDetail[] = [
  {
    slug: "e-commerce-retail",
    icon: ShoppingCart,
    title: "E-commerce & Retail",
    category: "Commerce",
    description:
      "Turn browsers into buyers with instant answers. Stop losing sales to unanswered questions — AI responds in 2 seconds, 24/7.",
    color: "text-blue-600",
    bg: "bg-blue-100",
    features: [
      "Instant order tracking via chat or WhatsApp",
      "Product recommendations that increase AOV 18%",
      "Automated returns save 15 hrs/week",
      "Support 95+ languages without hiring",
      "Works with Shopify, WooCommerce, Magento",
    ],
    heroTagline: "AI support built for online retail",
    heroSubtitle:
      "Shoppers expect instant answers. Verly handles order tracking, product questions, returns, and recommendations 24/7 — so your team focuses on growth instead of repetitive tickets.",
    tags: ["24/7 Support", "Order Tracking", "Multi-language", "Shopify"],
    painPoints: [
      {
        title: "Cart abandonment from slow support",
        description:
          "Shoppers leave when questions go unanswered. Every minute of delay costs revenue — especially during peak hours and promotions.",
      },
      {
        title: "Repetitive order status queries",
        description:
          "\"Where is my order?\" accounts for 40%+ of support volume. Your agents spend hours on questions that AI can answer instantly.",
      },
      {
        title: "Returns and refunds bottleneck",
        description:
          "Manual return processing eats 15+ hours per week. Customers wait days for simple exchanges that should take minutes.",
      },
      {
        title: "Scaling during peak seasons",
        description:
          "Black Friday, holiday sales, flash promotions — hiring seasonal agents is expensive and slow. You need support that scales instantly.",
      },
    ],
    capabilities: [
      {
        title: "Instant order tracking",
        description:
          "AI pulls real-time shipping data and responds to \"Where is my order?\" in under 2 seconds — via chat, WhatsApp, or voice.",
      },
      {
        title: "AI product recommendations",
        description:
          "Suggest complementary products during conversations. Customers who engage with recommendations have 18% higher average order value.",
      },
      {
        title: "Automated returns & refunds",
        description:
          "Process return requests end-to-end: verify eligibility, generate labels, and issue refunds — no agent involvement required.",
      },
      {
        title: "Multi-language support",
        description:
          "Serve customers in 95+ languages without hiring multilingual agents. AI detects language and responds natively.",
      },
      {
        title: "Platform integrations",
        description:
          "Connect with Shopify, WooCommerce, Magento, and your existing tools in minutes. No engineering work required.",
      },
    ],
    useCases: [
      {
        title: "Order status inquiry",
        scenario:
          "A customer messages \"Where is my order #48291?\" at 11pm on a Saturday.",
        outcome:
          "AI pulls tracking data from your shipping provider and responds with current location, estimated delivery, and a tracking link — in 2 seconds.",
      },
      {
        title: "Product discovery",
        scenario:
          "A shopper browsing your site asks the chat widget about sizing for a specific jacket.",
        outcome:
          "AI provides size chart details, recommends matching accessories, and offers a 10% discount code — increasing cart value by 22%.",
      },
      {
        title: "Automated return",
        scenario:
          "A customer wants to return a pair of shoes that doesn't fit.",
        outcome:
          "AI verifies the order, checks return eligibility, generates a prepaid shipping label, and confirms the refund timeline — all without human involvement.",
      },
    ],
    metrics: [
      { value: "2s", label: "average response time" },
      { value: "80%", label: "tickets auto-resolved" },
      { value: "18%", label: "increase in AOV" },
      { value: "15hrs", label: "saved per week on returns" },
    ],
    faqItems: [
      {
        question: "How does Verly integrate with Shopify?",
        answer:
          "Verly connects to Shopify via a native app. Install it from the Shopify App Store, authorize access, and your product catalog, order data, and customer info sync automatically. Setup takes under 5 minutes.",
      },
      {
        question: "Can it handle Black Friday traffic?",
        answer:
          "Yes. Verly auto-scales to handle unlimited concurrent conversations. Whether you get 100 or 100,000 inquiries in a day, response times stay under 3 seconds.",
      },
      {
        question: "Does it support multiple storefronts?",
        answer:
          "Absolutely. You can connect multiple Shopify stores, WooCommerce instances, or any combination of platforms under a single Verly workspace.",
      },
      {
        question: "How does the product recommendation engine work?",
        answer:
          "Verly analyzes the customer's browsing context, current cart, and conversation to suggest relevant products. It works with your existing catalog data — no additional training needed.",
      },
    ],
    relatedSlugs: ["saas-platforms", "restaurants-hospitality", "travel-tourism"],
  },
  {
    slug: "saas-platforms",
    icon: Laptop,
    title: "SaaS Platforms",
    category: "Support",
    description:
      "Cut support costs by 80% while improving CSAT. AI handles Tier 1 tickets so your team focuses on product, not repetitive questions.",
    color: "text-purple-600",
    bg: "bg-purple-100",
    features: [
      "Answer docs questions with 95% accuracy",
      "Reduce onboarding support by 70%",
      "Troubleshoot common errors instantly",
      "Handle billing inquiries automatically",
      "Smart routing to engineers when needed",
    ],
    heroTagline: "Scale support without scaling headcount",
    heroSubtitle:
      "Your engineers shouldn't be answering Tier 1 tickets. Verly learns your documentation, resolves onboarding questions, and only escalates what truly needs a human.",
    tags: ["Knowledge Base", "Ticket Routing", "Onboarding", "Billing"],
    painPoints: [
      {
        title: "Tier 1 tickets overwhelming engineering",
        description:
          "Your most expensive team members are answering password resets and setup questions instead of building product.",
      },
      {
        title: "Onboarding questions eating dev time",
        description:
          "New users ask the same questions repeatedly. Your docs exist, but nobody reads them — they open tickets instead.",
      },
      {
        title: "Inconsistent responses across agents",
        description:
          "Different agents give different answers to the same question. Customers get confused and lose trust.",
      },
      {
        title: "Documentation going unused",
        description:
          "You've invested in great docs, but support volume keeps growing. The knowledge exists — it's just not accessible at the right moment.",
      },
    ],
    capabilities: [
      {
        title: "Knowledge-powered answers",
        description:
          "AI learns your docs, changelogs, and past tickets. It answers questions with 95% accuracy and links to the relevant documentation.",
      },
      {
        title: "Automated onboarding flows",
        description:
          "Guide new users through setup with contextual, step-by-step assistance. Reduce onboarding support tickets by 70%.",
      },
      {
        title: "Smart ticket routing",
        description:
          "AI triages incoming tickets by intent, severity, and required expertise — then routes to the right team with full context.",
      },
      {
        title: "Billing automation",
        description:
          "Handle subscription inquiries, plan comparisons, invoice requests, and payment issues without human involvement.",
      },
      {
        title: "In-app support widget",
        description:
          "Embed contextual help directly in your product. AI knows which page the user is on and tailors responses accordingly.",
      },
    ],
    useCases: [
      {
        title: "Setup question",
        scenario:
          "A new user asks how to configure SSO integration during their first week.",
        outcome:
          "AI surfaces the exact SSO setup guide, walks through each step, and links to the relevant admin panel — resolving the ticket in under 30 seconds.",
      },
      {
        title: "Bug report triage",
        scenario:
          "A customer reports that exports are failing with a timeout error.",
        outcome:
          "AI collects browser, plan info, and reproduction steps, then routes to engineering with a structured bug report — saving 15 minutes of back-and-forth.",
      },
      {
        title: "Billing inquiry",
        scenario:
          "A customer asks about upgrading from Starter to Growth plan mid-cycle.",
        outcome:
          "AI calculates the prorated cost, explains the feature differences, and provides a one-click upgrade link — no agent needed.",
      },
    ],
    metrics: [
      { value: "80%", label: "reduction in support costs" },
      { value: "70%", label: "fewer onboarding tickets" },
      { value: "95%", label: "answer accuracy" },
      { value: "<30s", label: "average resolution time" },
    ],
    faqItems: [
      {
        question: "Can it learn from our documentation?",
        answer:
          "Yes. Verly ingests your docs, help center articles, changelogs, and past tickets. It stays updated as you publish new content — no manual retraining required.",
      },
      {
        question: "How does smart routing work?",
        answer:
          "AI analyzes the ticket's intent, sentiment, and technical complexity, then routes to the appropriate team (support, engineering, billing) with a summary and recommended action.",
      },
      {
        question: "Does it integrate with Intercom or Zendesk?",
        answer:
          "Verly integrates with Intercom, Zendesk, Freshdesk, and other major helpdesk platforms. You can also use it standalone as your primary support tool.",
      },
      {
        question: "Can it handle technical questions?",
        answer:
          "For questions covered in your docs, yes — with 95% accuracy. For novel technical issues, AI collects context and routes to your engineering team with a structured report.",
      },
    ],
    relatedSlugs: ["e-commerce-retail", "education", "professional-services"],
  },
  {
    slug: "healthcare",
    icon: Heart,
    title: "Healthcare",
    category: "Voice",
    description:
      "Never miss a patient call again. AI handles scheduling, insurance verification, and routine inquiries — HIPAA compliant.",
    color: "text-red-600",
    bg: "bg-red-100",
    features: [
      "100% HIPAA-compliant & secure",
      "24/7 appointment booking & reminders",
      "Verify insurance in seconds",
      "Automate prescription refills",
      "Communicate in patient's language",
    ],
    heroTagline: "HIPAA-compliant AI for patient communication",
    heroSubtitle:
      "Patients expect immediate answers, but your staff is stretched thin. Verly handles appointment scheduling, insurance verification, and routine inquiries around the clock — with full HIPAA compliance.",
    tags: ["HIPAA Compliant", "Voice AI", "Scheduling", "Insurance"],
    painPoints: [
      {
        title: "Missed calls, lost appointments",
        description:
          "When phone lines are busy or it's after hours, patients hang up and don't call back. Every missed call is a missed appointment.",
      },
      {
        title: "Staff overwhelmed by routine queries",
        description:
          "Scheduling, insurance verification, and refill requests consume 60%+ of front desk time — pulling staff away from in-office patients.",
      },
      {
        title: "Compliance makes automation risky",
        description:
          "HIPAA requirements make many automation tools off-limits. You need AI that's built for healthcare from the ground up.",
      },
      {
        title: "After-hours calls go to voicemail",
        description:
          "Patients with urgent scheduling needs after 5pm leave voicemails that don't get returned until the next day — if at all.",
      },
    ],
    capabilities: [
      {
        title: "24/7 appointment scheduling",
        description:
          "Patients book, reschedule, and cancel appointments via voice or chat — any time, any day. AI syncs directly with your practice management system.",
      },
      {
        title: "Insurance verification",
        description:
          "Verify patient insurance eligibility in seconds. AI checks coverage details, copays, and pre-authorization requirements automatically.",
      },
      {
        title: "Prescription refill automation",
        description:
          "Patients request refills via WhatsApp or voice. AI verifies the prescription, checks with the pharmacy, and confirms the pickup time.",
      },
      {
        title: "HIPAA-compliant infrastructure",
        description:
          "All data encrypted at rest and in transit. BAA available. Audit logs for every interaction. Built to meet healthcare compliance standards.",
      },
      {
        title: "Multilingual patient communication",
        description:
          "Communicate with patients in their preferred language. AI handles 95+ languages across voice, chat, and WhatsApp channels.",
      },
    ],
    useCases: [
      {
        title: "After-hours scheduling",
        scenario:
          "A patient calls at 8pm to schedule a follow-up appointment with their cardiologist.",
        outcome:
          "Voice AI checks the doctor's availability, books the next open slot, sends an SMS confirmation with prep instructions, and updates the EHR.",
      },
      {
        title: "Insurance pre-check",
        scenario:
          "A new patient needs to verify their insurance covers a specialist visit before coming in.",
        outcome:
          "AI verifies coverage, confirms the copay amount, and lets the patient know what documentation to bring — all in under 60 seconds.",
      },
      {
        title: "Prescription refill",
        scenario:
          "A patient messages on WhatsApp asking to refill their blood pressure medication.",
        outcome:
          "AI confirms the prescription details, checks with the pharmacy for availability, and texts the patient when it's ready for pickup.",
      },
    ],
    metrics: [
      { value: "100%", label: "HIPAA compliant" },
      { value: "0", label: "missed patient calls" },
      { value: "60%", label: "reduction in front desk load" },
      { value: "24/7", label: "scheduling availability" },
    ],
    faqItems: [
      {
        question: "Is Verly HIPAA compliant?",
        answer:
          "Yes. Verly is fully HIPAA compliant with end-to-end encryption, BAA agreements, audit logging, and role-based access controls. We undergo regular third-party security audits.",
      },
      {
        question: "Can it integrate with our EHR/EMR?",
        answer:
          "Verly integrates with major EHR systems including Epic, Cerner, and Athenahealth via HL7 FHIR APIs. Custom integrations are available for other systems.",
      },
      {
        question: "How does voice AI handle medical terminology?",
        answer:
          "Our voice AI is trained on healthcare-specific language models. It accurately understands medical terms, drug names, and procedure descriptions across specialties.",
      },
      {
        question: "What happens if the AI can't answer a medical question?",
        answer:
          "Verly never provides medical advice. If a patient asks a clinical question, AI immediately routes to a nurse or practitioner with the full conversation context.",
      },
    ],
    relatedSlugs: ["professional-services", "education", "restaurants-hospitality"],
  },
  {
    slug: "restaurants-hospitality",
    icon: Utensils,
    title: "Restaurants & Hospitality",
    category: "Voice",
    description:
      "Handle reservations, menu inquiries, and guest feedback without pulling staff away from service.",
    color: "text-orange-600",
    bg: "bg-orange-100",
    features: [
      "Table reservation via voice/WhatsApp",
      "Menu and allergen information",
      "Catering inquiry handling",
      "Real-time availability checking",
      "Integration with OpenTable, Resy",
    ],
    heroTagline: "Never miss a reservation or guest inquiry",
    heroSubtitle:
      "During peak hours, your staff can't answer every call. Verly handles reservations, menu questions, and catering inquiries via voice and WhatsApp — so your team stays focused on the guests in front of them.",
    tags: ["Reservations", "Voice AI", "WhatsApp", "Menu Info"],
    painPoints: [
      {
        title: "Busy lines during peak hours",
        description:
          "When the restaurant is full, nobody's answering the phone. Potential guests get a busy signal and book somewhere else.",
      },
      {
        title: "Staff pulled from service",
        description:
          "Hosts and servers stop what they're doing to answer routine calls about hours, parking, and menu items — degrading the in-house experience.",
      },
      {
        title: "Allergen and dietary confusion",
        description:
          "Guests need accurate allergen info before visiting. Wrong answers create liability. Staff can't always recall every ingredient.",
      },
      {
        title: "Catering leads falling through",
        description:
          "Corporate catering inquiries come in via voicemail, email, and DMs. Without a system, high-value leads get lost in the shuffle.",
      },
    ],
    capabilities: [
      {
        title: "Voice & WhatsApp reservations",
        description:
          "Guests book tables via phone call or WhatsApp message. AI checks real-time availability, confirms party size, and sends a confirmation.",
      },
      {
        title: "Menu & allergen information",
        description:
          "AI knows your full menu including ingredients, allergens, and dietary labels. Guests get accurate answers instantly.",
      },
      {
        title: "Catering inquiry capture",
        description:
          "AI qualifies catering requests — event date, headcount, budget, dietary needs — and forwards qualified leads to your events team.",
      },
      {
        title: "Real-time availability",
        description:
          "Connected to your reservation system, AI provides live table availability and suggests alternative times when fully booked.",
      },
      {
        title: "Platform integrations",
        description:
          "Works with OpenTable, Resy, SevenRooms, and your POS system. No double-booking, no manual sync.",
      },
    ],
    useCases: [
      {
        title: "Peak-hour reservation",
        scenario:
          "A guest calls during Saturday dinner rush to book a table for 6 next Friday.",
        outcome:
          "Voice AI checks availability, books the table, sends an SMS confirmation with parking directions, and adds a note about the large party.",
      },
      {
        title: "Allergen inquiry",
        scenario:
          "A guest messages on WhatsApp asking which appetizers are nut-free.",
        outcome:
          "AI instantly lists all nut-free appetizers with ingredient details and suggests popular choices — building confidence before the visit.",
      },
      {
        title: "Catering lead capture",
        scenario:
          "A company calls asking about catering for a 50-person corporate lunch.",
        outcome:
          "AI collects event details, dietary requirements, and budget range, then emails a qualified lead summary to the events manager within minutes.",
      },
    ],
    metrics: [
      { value: "0", label: "missed reservation calls" },
      { value: "35%", label: "more bookings captured" },
      { value: "12hrs", label: "saved per week" },
      { value: "< 3s", label: "response time" },
    ],
    faqItems: [
      {
        question: "Does it work with our existing reservation system?",
        answer:
          "Yes. Verly integrates with OpenTable, Resy, SevenRooms, and most major reservation platforms. It reads and writes availability in real time.",
      },
      {
        question: "Can it handle multiple locations?",
        answer:
          "Absolutely. Each location gets its own menu, hours, and availability data. Guests are routed to the right location based on their request.",
      },
      {
        question: "How does it handle special dietary requests?",
        answer:
          "AI references your complete menu data including ingredients and allergen labels. It can filter dishes by any dietary requirement — gluten-free, vegan, nut-free, etc.",
      },
      {
        question: "Can guests modify reservations through the AI?",
        answer:
          "Yes. Guests can change party size, date, time, or cancel entirely via voice or WhatsApp. Changes sync to your reservation system instantly.",
      },
    ],
    relatedSlugs: ["travel-tourism", "e-commerce-retail", "healthcare"],
  },
  {
    slug: "real-estate",
    icon: Building,
    title: "Real Estate",
    category: "Sales",
    description:
      "Capture every lead — even at 2am. AI qualifies prospects, schedules viewings, and answers property questions while you sleep.",
    color: "text-teal-600",
    bg: "bg-teal-100",
    features: [
      "Qualify 200+ leads/month automatically",
      "Instant answers to property questions",
      "Schedule tours 24/7 via voice or chat",
      "Calculate mortgages in real-time",
      "Auto-sync with your CRM",
    ],
    heroTagline: "Capture and qualify leads around the clock",
    heroSubtitle:
      "Real estate leads don't wait for business hours. Verly engages prospects at 2am, qualifies their budget and timeline, and schedules showings — so you wake up to booked appointments, not cold leads.",
    tags: ["Lead Qualification", "Tour Scheduling", "CRM Sync", "24/7"],
    painPoints: [
      {
        title: "Leads go cold overnight",
        description:
          "A prospect fills out a form at 10pm. By the time you call back at 9am, they've already contacted three other agents.",
      },
      {
        title: "Hours spent on repetitive questions",
        description:
          "\"How many bedrooms?\" \"Is there parking?\" \"What are the HOA fees?\" — agents answer the same property questions hundreds of times.",
      },
      {
        title: "Tour scheduling friction",
        description:
          "Coordinating showing times via email and phone tag takes 3-5 exchanges. Half of interested buyers give up before booking.",
      },
      {
        title: "Slow follow-up loses deals",
        description:
          "The first agent to respond wins 78% of the time. Manual follow-up processes mean you're rarely first.",
      },
    ],
    capabilities: [
      {
        title: "24/7 lead qualification",
        description:
          "AI engages every website visitor and inquiry instantly. It qualifies budget, timeline, location preferences, and financing status.",
      },
      {
        title: "Instant property answers",
        description:
          "AI knows every listing's details — bedrooms, square footage, HOA, schools, commute times. Prospects get answers in seconds.",
      },
      {
        title: "Automated tour scheduling",
        description:
          "AI checks your calendar, proposes available showing times, and books confirmed appointments — complete with address and directions.",
      },
      {
        title: "Mortgage estimation",
        description:
          "Prospects get instant mortgage calculations based on listing price, down payment, and current rates — keeping them engaged in the buying process.",
      },
      {
        title: "CRM integration",
        description:
          "Qualified leads and conversation summaries sync automatically to your CRM. No manual data entry, no missed follow-ups.",
      },
    ],
    useCases: [
      {
        title: "Late-night lead capture",
        scenario:
          "A prospect browses your listings at 11pm and asks the chat widget about a 3-bedroom home in Westside.",
        outcome:
          "AI qualifies their budget ($500K-600K), timeline (3 months), and financing (pre-approved), then books a showing for Saturday morning.",
      },
      {
        title: "Property details on demand",
        scenario:
          "A buyer asks about school districts and commute times for a specific listing.",
        outcome:
          "AI provides school ratings, average commute to downtown, nearby amenities, and recent comparable sales — keeping the buyer engaged.",
      },
      {
        title: "Seller inquiry routing",
        scenario:
          "A homeowner asks about listing their property for sale.",
        outcome:
          "AI collects property details, estimated value expectations, and timeline, then routes the qualified seller lead to the appropriate listing agent.",
      },
    ],
    metrics: [
      { value: "200+", label: "leads qualified per month" },
      { value: "78%", label: "faster response than competitors" },
      { value: "3x", label: "more showings booked" },
      { value: "24/7", label: "lead capture" },
    ],
    faqItems: [
      {
        question: "Can it integrate with my MLS?",
        answer:
          "Yes. Verly connects to major MLS systems and IDX feeds to pull live listing data. Property details, photos, and status updates sync automatically.",
      },
      {
        question: "How does lead qualification work?",
        answer:
          "AI engages prospects conversationally — asking about budget, timeline, location, and financing. Qualified leads are scored and synced to your CRM with a full summary.",
      },
      {
        question: "Does it sync with my CRM?",
        answer:
          "Verly integrates with Salesforce, HubSpot, Follow Up Boss, and other real estate CRMs. Leads, conversations, and appointments sync automatically.",
      },
      {
        question: "Can it handle rental and sales inquiries separately?",
        answer:
          "Absolutely. AI detects intent (buy, sell, rent) and routes to the appropriate workflow and agent team. Each gets customized qualification questions.",
      },
    ],
    relatedSlugs: ["professional-services", "saas-platforms", "e-commerce-retail"],
  },
  {
    slug: "education",
    icon: GraduationCap,
    title: "Education",
    category: "Support",
    description:
      "Support students and parents 24/7 with course information, admissions guidance, and campus services.",
    color: "text-indigo-600",
    bg: "bg-indigo-100",
    features: [
      "Course catalog information",
      "Admissions process guidance",
      "Financial aid inquiries",
      "Campus tour scheduling",
      "Student portal integration",
    ],
    heroTagline: "Streamline student and parent communication",
    heroSubtitle:
      "Admissions teams are buried in repetitive inquiries. Students can't get answers outside office hours. Verly handles it all — applications, financial aid, scheduling, and campus info — around the clock.",
    tags: ["Admissions", "Financial Aid", "Campus Tours", "Multi-language"],
    painPoints: [
      {
        title: "Admissions teams buried in inquiries",
        description:
          "Every application cycle brings thousands of identical questions about deadlines, requirements, and process. Staff can't keep up.",
      },
      {
        title: "No answers outside office hours",
        description:
          "Students and parents across time zones need help at 10pm, on weekends, and during holidays. Voicemail isn't an answer.",
      },
      {
        title: "Financial aid bottleneck",
        description:
          "Aid questions are complex but repetitive. Students wait days for responses that AI could provide in seconds.",
      },
      {
        title: "Manual tour scheduling",
        description:
          "Coordinating campus tours involves email chains, calendar juggling, and frequent no-shows. The process needs automation.",
      },
    ],
    capabilities: [
      {
        title: "Admissions guidance",
        description:
          "AI walks prospective students through application requirements, deadlines, and next steps — personalized to their program of interest.",
      },
      {
        title: "Course & program information",
        description:
          "Students get instant answers about course catalogs, prerequisites, schedules, and program details without waiting for an advisor.",
      },
      {
        title: "Financial aid support",
        description:
          "AI handles FAFSA questions, scholarship eligibility checks, and aid package explanations — reducing wait times from days to seconds.",
      },
      {
        title: "Campus tour booking",
        description:
          "Prospective students and families book campus tours via chat or WhatsApp. AI confirms dates, sends directions, and reduces no-shows with reminders.",
      },
      {
        title: "Student portal integration",
        description:
          "Connect to your SIS and LMS. AI can check enrollment status, grades, and account balances — giving students instant self-service.",
      },
    ],
    useCases: [
      {
        title: "Admissions FAQ",
        scenario:
          "A prospective student asks about application deadlines and required documents for the nursing program.",
        outcome:
          "AI provides the exact deadline, lists required documents, links to the application portal, and offers to schedule a campus tour.",
      },
      {
        title: "Financial aid check",
        scenario:
          "A current student needs to know their remaining financial aid balance and next disbursement date.",
        outcome:
          "AI checks the student portal, confirms the balance, provides the disbursement schedule, and links to the financial aid office for follow-up.",
      },
      {
        title: "Campus tour booking",
        scenario:
          "A parent messages on WhatsApp to schedule a campus tour for their high school junior.",
        outcome:
          "AI offers available tour dates, books the slot, sends a confirmation with parking info and a campus map, and follows up with a reminder the day before.",
      },
    ],
    metrics: [
      { value: "65%", label: "fewer admissions tickets" },
      { value: "24/7", label: "student support" },
      { value: "40%", label: "more tours booked" },
      { value: "< 5s", label: "average response time" },
    ],
    faqItems: [
      {
        question: "Can it connect to our student information system?",
        answer:
          "Yes. Verly integrates with Banner, PeopleSoft, Slate, and other major SIS platforms via API. Student data stays secure and up-to-date.",
      },
      {
        question: "Does it support multiple departments?",
        answer:
          "Absolutely. Each department (admissions, financial aid, registrar) can have its own knowledge base and routing rules while sharing a unified student experience.",
      },
      {
        question: "How does it handle sensitive student data?",
        answer:
          "Verly is FERPA-aware with role-based access controls, data encryption, and audit logging. Students authenticate before accessing personal information.",
      },
      {
        question: "Can it work in multiple languages for international students?",
        answer:
          "Yes. AI supports 95+ languages and automatically detects the student's preferred language — critical for institutions with international enrollment.",
      },
    ],
    relatedSlugs: ["healthcare", "saas-platforms", "professional-services"],
  },
  {
    slug: "travel-tourism",
    icon: Plane,
    title: "Travel & Tourism",
    category: "Voice",
    description:
      "Assist travelers with bookings, itinerary changes, and destination information across every channel.",
    color: "text-sky-600",
    bg: "bg-sky-100",
    features: [
      "Booking modifications via chat",
      "Flight status notifications",
      "Destination recommendations",
      "Travel documentation assistance",
      "Integration with Amadeus, Sabre",
    ],
    heroTagline: "AI concierge for modern travelers",
    heroSubtitle:
      "Travelers need instant help with bookings, delays, and itinerary changes. Verly acts as an always-available concierge — handling modifications, providing updates, and recommending destinations in any language.",
    tags: ["Booking Management", "Real-time Updates", "Multi-language", "GDS"],
    painPoints: [
      {
        title: "High volume of booking changes",
        description:
          "Flight delays, schedule conflicts, and plan changes generate a constant stream of modification requests that overwhelm support teams.",
      },
      {
        title: "Real-time information gaps",
        description:
          "Travelers need instant flight status, gate changes, and delay updates. By the time an agent responds, the information is already stale.",
      },
      {
        title: "Language barriers",
        description:
          "International travelers speak dozens of languages. Hiring multilingual agents for every market is prohibitively expensive.",
      },
      {
        title: "Peak season surges",
        description:
          "Holiday seasons and disruptions create massive support spikes. You can't hire fast enough to keep up — and you can't justify the cost year-round.",
      },
    ],
    capabilities: [
      {
        title: "Booking modifications",
        description:
          "AI handles flight changes, hotel rebookings, and itinerary adjustments. Travelers make changes via chat or voice without waiting in a queue.",
      },
      {
        title: "Real-time travel updates",
        description:
          "Proactive notifications for flight delays, gate changes, and cancellations. Travelers get alternatives before they even ask.",
      },
      {
        title: "Destination recommendations",
        description:
          "AI suggests restaurants, activities, and local experiences based on traveler preferences, location, and itinerary.",
      },
      {
        title: "Document & visa guidance",
        description:
          "AI provides passport, visa, and travel documentation requirements based on nationality and destination. No more Googling.",
      },
      {
        title: "GDS integration",
        description:
          "Connect with Amadeus, Sabre, and Travelport for real-time inventory, pricing, and booking capabilities.",
      },
    ],
    useCases: [
      {
        title: "Flight rebooking",
        scenario:
          "A traveler's connecting flight is cancelled due to weather.",
        outcome:
          "AI proactively notifies the traveler, presents 3 alternative itinerary options, rebooks the preferred option, and sends the updated boarding pass — all within minutes.",
      },
      {
        title: "Local recommendations",
        scenario:
          "A tourist in Barcelona asks for restaurant recommendations near their hotel.",
        outcome:
          "AI suggests 5 highly-rated restaurants within walking distance, filtered by cuisine preference, and offers to make a reservation at their top choice.",
      },
      {
        title: "Visa requirements",
        scenario:
          "A traveler with an Indian passport asks about visa requirements for a layover in Dubai.",
        outcome:
          "AI checks current visa policies, confirms visa-on-arrival eligibility, lists required documents, and provides processing time estimates.",
      },
    ],
    metrics: [
      { value: "70%", label: "booking changes automated" },
      { value: "< 10s", label: "disruption notification" },
      { value: "95+", label: "languages supported" },
      { value: "50%", label: "reduction in call volume" },
    ],
    faqItems: [
      {
        question: "Does it integrate with booking engines?",
        answer:
          "Yes. Verly connects with Amadeus, Sabre, Travelport, and major OTA platforms. It can read and modify bookings in real time.",
      },
      {
        question: "Can it handle multi-leg itineraries?",
        answer:
          "Absolutely. AI understands complex itineraries with multiple flights, hotels, and activities. It can modify individual segments without disrupting the rest.",
      },
      {
        question: "How does it work during travel disruptions?",
        answer:
          "AI monitors for delays and cancellations in real time, proactively notifies affected travelers, and presents rebooking options before they even call in.",
      },
      {
        question: "Does it support travel insurance claims?",
        answer:
          "AI can guide travelers through the claims process, collect required documentation, and submit initial claims to supported insurance providers.",
      },
    ],
    relatedSlugs: ["restaurants-hospitality", "e-commerce-retail", "real-estate"],
  },
  {
    slug: "professional-services",
    icon: Briefcase,
    title: "Professional Services",
    category: "Internal",
    description:
      "Automate consultation scheduling, client intake, and service inquiries — capture leads even after hours.",
    color: "text-slate-600",
    bg: "bg-slate-100",
    features: [
      "Consultation booking with calendar sync",
      "Service package information",
      "Quote generation",
      "Client onboarding automation",
      "Document collection workflows",
    ],
    heroTagline: "Automate client intake and communication",
    heroSubtitle:
      "Your team shouldn't spend hours on scheduling and intake. Verly handles consultation booking, service inquiries, document collection, and follow-ups — so you focus on delivering results for clients.",
    tags: ["Client Intake", "Scheduling", "Document Collection", "CRM"],
    painPoints: [
      {
        title: "Scheduling takes multiple exchanges",
        description:
          "Booking a consultation involves 3-5 back-and-forth emails. By the time you confirm, the prospect has moved on.",
      },
      {
        title: "Manual client onboarding",
        description:
          "Collecting documents, NDAs, and intake forms manually takes days. Clients get frustrated with the slow start.",
      },
      {
        title: "After-hours inquiries missed",
        description:
          "Potential clients visit your website at 10pm, can't get answers, and contact a competitor who responds first.",
      },
      {
        title: "Repetitive service questions",
        description:
          "\"What do you charge?\" \"What's included?\" \"How long does it take?\" — your team answers these hundreds of times per month.",
      },
    ],
    capabilities: [
      {
        title: "Consultation booking",
        description:
          "AI checks your team's calendar availability and books consultations directly. Prospects pick a time, get a confirmation, and receive a reminder.",
      },
      {
        title: "Service & pricing information",
        description:
          "AI explains your service packages, pricing tiers, and deliverables. Prospects get the information they need to make a decision.",
      },
      {
        title: "Client onboarding automation",
        description:
          "Collect intake forms, documents, and agreements automatically. AI sends requests, tracks progress, and follows up on missing items.",
      },
      {
        title: "Quote generation",
        description:
          "AI gathers project requirements and generates preliminary quotes based on your pricing rules. Complex requests are routed to the right team member.",
      },
      {
        title: "CRM & PM integration",
        description:
          "Sync client data, conversations, and project details with Salesforce, HubSpot, or your project management tool. No manual data entry.",
      },
    ],
    useCases: [
      {
        title: "After-hours lead capture",
        scenario:
          "A potential client visits your website at 10pm looking for accounting services.",
        outcome:
          "AI qualifies their needs (tax planning, monthly bookkeeping), collects contact info, and books a consultation for the next available slot.",
      },
      {
        title: "Client onboarding",
        scenario:
          "A new client needs to submit incorporation documents, ID verification, and a signed engagement letter.",
        outcome:
          "AI sends document requests via email, tracks what's been received, follows up on missing items, and notifies the assigned team member when everything is complete.",
      },
      {
        title: "Service inquiry",
        scenario:
          "A business owner asks about the difference between your Standard and Premium consulting packages.",
        outcome:
          "AI explains both packages, highlights key differences, provides pricing, and offers to book a call to discuss the best fit.",
      },
    ],
    metrics: [
      { value: "40%", label: "more consultations booked" },
      { value: "3x", label: "faster client onboarding" },
      { value: "24/7", label: "lead capture" },
      { value: "8hrs", label: "saved per week" },
    ],
    faqItems: [
      {
        question: "Can it integrate with my calendar and CRM?",
        answer:
          "Yes. Verly integrates with Google Calendar, Outlook, Calendly, Salesforce, HubSpot, and other tools. Bookings and lead data sync automatically.",
      },
      {
        question: "How does document collection work?",
        answer:
          "AI sends personalized document requests via email or WhatsApp, provides secure upload links, tracks completion status, and sends automated follow-ups for missing items.",
      },
      {
        question: "Does it handle different service lines?",
        answer:
          "Absolutely. Each service line (consulting, legal, accounting, etc.) can have its own intake flow, pricing rules, and routing logic.",
      },
      {
        question: "Can it generate custom quotes?",
        answer:
          "AI collects project requirements through a conversational flow and generates quotes based on your pricing rules. Complex or non-standard requests are routed to a team member for review.",
      },
    ],
    relatedSlugs: ["saas-platforms", "real-estate", "healthcare"],
  },
];

export const categories = [
  "All",
  "Support",
  "Voice",
  "Commerce",
  "Internal",
  "Sales",
];

export function getSolutionBySlug(
  slug: string,
): SolutionDetail | undefined {
  return solutions.find((s) => s.slug === slug);
}

export function getAllSolutionSlugs(): string[] {
  return solutions.map((s) => s.slug);
}
