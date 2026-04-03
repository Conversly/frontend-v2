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
  primaryTeam: string;
  primaryChannels: string[];
  starterAutomations: string[];
  knowledgeSources: string[];
  systemActions: string[];
  handoffTriggers: string[];
  integrations: string[];
  workflowSteps: { title: string; description: string }[];
  cardImage: string;
  cardImageAlt: string;
  heroImage: string;
  heroImageAlt: string;
  heroPanelLabel: string;
  heroSummary: string[];
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
      "Resolve order, delivery, and return questions instantly across web chat, WhatsApp, and voice without bloating your support team.",
    color: "text-[#315EEA]",
    bg: "bg-[#eaf0ff]",
    primaryTeam:
      "CX, support, and retention teams handling pre-purchase and post-purchase demand.",
    primaryChannels: ["Web chat", "WhatsApp", "Voice"],
    starterAutomations: [
      "Order-status and delivery updates tied to live shipment data",
      "Return, exchange, and refund flows with policy checks built in",
      "Pre-purchase product questions, size guidance, and cart-recovery nudges",
    ],
    knowledgeSources: [
      "Shopify or WooCommerce order data",
      "Fulfillment and tracking updates",
      "Return policy, product catalog, and FAQ content",
    ],
    systemActions: [
      "Look up order and shipping status in real time",
      "Start return or exchange workflows and confirm next steps",
      "Send tracking links, confirmations, and revenue-recovery offers",
    ],
    handoffTriggers: [
      "Lost parcels, damaged shipments, or chargeback-related exceptions",
      "VIP orders or goodwill cases that need manual review",
      "Situations where policy overrides or human negotiation are required",
    ],
    integrations: ["Shopify or WooCommerce", "Logistics and tracking tools", "Helpdesk or CRM systems"],
    workflowSteps: [
      {
        title: "Catch the demand instantly",
        description:
          "Verly answers shipping, delivery, return, and product questions across web, WhatsApp, and voice without making shoppers wait in queue.",
      },
      {
        title: "Use live commerce context",
        description:
          "It pulls order status, fulfillment events, and policy rules into the conversation so the answer is specific to the shopper's situation.",
      },
      {
        title: "Resolve or route with context",
        description:
          "Common motions finish automatically, while damaged shipments, exceptions, or VIP cases escalate to the team with the order summary already attached.",
      },
    ],
    cardImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1800&h=1400&fit=crop&crop=faces",
    cardImageAlt: "Retail team supporting customers across commerce channels",
    heroImage: "/solutions/e-commerce-retail.png",
    heroImageAlt: "Retail support command center visual",
    heroPanelLabel: "Commerce operating layer",
    heroSummary: [
      "Answer order-status, return, and delivery questions in seconds.",
      "Turn support into a revenue surface with product recommendations and recovery offers.",
      "Keep Shopify, WooCommerce, and fulfillment data available inside every conversation.",
    ],
    features: [
      "Instant order tracking across chat, WhatsApp, and voice",
      "Return and refund automation with policy checks built in",
      "Product recommendations and cart-recovery nudges in live conversations",
      "95+ language coverage for global support teams",
      "Shopify, WooCommerce, Magento, and logistics integrations",
    ],
    heroTagline: "AI support built for modern retail operations",
    heroSubtitle:
      "Retail teams lose revenue when shoppers wait on sizing, shipping, and return questions. Verly handles the repetitive volume, surfaces the right order context instantly, and keeps your human team focused on VIP issues and exceptions.",
    tags: ["Order Tracking", "Returns", "Revenue Recovery", "Shopify"],
    painPoints: [
      {
        title: "Shoppers abandon carts when support goes dark",
        description:
          "Questions about shipping, sizing, stock, and delivery timing often show up after hours or during campaign spikes. When nobody responds quickly, the purchase disappears.",
      },
      {
        title: "Order-status tickets bury the team",
        description:
          "\"Where is my order?\" and \"Can I change my address?\" should not consume your highest-volume support queue, but they usually do.",
      },
      {
        title: "Returns create operational drag",
        description:
          "Manual checks for eligibility, policy windows, and exchange options slow down customers and force agents into repetitive admin work.",
      },
      {
        title: "Peak demand is expensive to staff",
        description:
          "Holiday launches, creator drops, and flash sales create support surges that require coverage immediately, not a hiring cycle.",
      },
    ],
    capabilities: [
      {
        title: "Real-time order answers",
        description:
          "Pull shipment, payment, and fulfillment context directly into the conversation so customers get accurate updates without waiting in queue.",
      },
      {
        title: "Return and exchange workflows",
        description:
          "Verify policy eligibility, collect reasons, trigger labels, and guide exchanges or refunds without a manual agent handoff.",
      },
      {
        title: "Revenue-aware product guidance",
        description:
          "Use purchase context and browsing intent to recommend alternates, bundles, and cross-sells while helping the customer move forward.",
      },
      {
        title: "Channel-consistent support",
        description:
          "Run the same support logic across web chat, WhatsApp, and voice while keeping all order context and escalation history unified.",
      },
      {
        title: "Operational routing for exceptions",
        description:
          "Escalate chargebacks, lost parcels, and VIP customers to the right team with summaries and customer history attached.",
      },
    ],
    useCases: [
      {
        title: "After-hours shipping question",
        scenario:
          "A customer messages at 11:42pm asking whether order #48291 will arrive before a birthday in two days.",
        outcome:
          "Verly checks shipment status, confirms ETA, offers expedited options if needed, and shares a tracking link with no agent required.",
      },
      {
        title: "Self-serve exchange flow",
        scenario:
          "A shopper wants to exchange a jacket for a different size from the confirmation email thread.",
        outcome:
          "Verly verifies the policy window, confirms replacement inventory, generates the exchange flow, and updates the customer instantly.",
      },
      {
        title: "Pre-purchase conversion support",
        scenario:
          "A buyer compares two products and asks which one is better for travel use.",
        outcome:
          "Verly answers the product question, recommends the right SKU, and suggests a bundle that improves AOV during the same conversation.",
      },
    ],
    metrics: [
      { value: "80%", label: "retail tickets resolved automatically" },
      { value: "2s", label: "response time on common order questions" },
      { value: "18%", label: "higher AOV from guided product discovery" },
      { value: "24/7", label: "coverage during launches and peak demand" },
    ],
    faqItems: [
      {
        question: "Does Verly integrate directly with Shopify and WooCommerce?",
        answer:
          "Yes. Verly can connect with commerce platforms and related operational systems so product catalog, order status, fulfillment updates, and customer context remain available inside support conversations.",
      },
      {
        question: "Can it support both pre-purchase and post-purchase flows?",
        answer:
          "Yes. Teams commonly use Verly for sales-assist questions before checkout and order support after purchase, with different routing, guardrails, and response goals for each motion.",
      },
      {
        question: "What happens with damaged shipments or policy exceptions?",
        answer:
          "Those conversations can escalate automatically with a summary, order context, and reason code so your human team starts from the right place instead of re-triaging the issue.",
      },
      {
        question: "Can the experience stay on-brand across channels?",
        answer:
          "Yes. You can keep one support brain across web, messaging, and voice while tuning copy, channel behavior, and escalation rules for each surface.",
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
      "Deflect repetitive tickets, guide onboarding, and automate billing or account questions with grounded product context inside the app.",
    color: "text-[#5b5bd6]",
    bg: "bg-[#efeefe]",
    primaryTeam:
      "Support, success, and product operations teams handling onboarding, technical triage, and account workflows.",
    primaryChannels: ["In-app chat", "Web chat", "WhatsApp"],
    starterAutomations: [
      "Docs-backed answers for setup, onboarding, and feature questions",
      "Structured bug and incident intake before engineering handoff",
      "Billing, invoice, plan-change, and account-management support",
    ],
    knowledgeSources: [
      "Product docs, release notes, and internal support playbooks",
      "Workspace or account context from the app",
      "Billing rules, plan entitlements, and help-center content",
    ],
    systemActions: [
      "Answer feature questions from synced knowledge",
      "Collect repro steps, screenshots, and workspace context",
      "Guide upgrades, invoices, and entitlement-related requests",
    ],
    handoffTriggers: [
      "Confirmed bugs, outages, or security-sensitive issues",
      "High-value account escalations that need a human owner",
      "Cases that require product, engineering, or manual billing intervention",
    ],
    integrations: ["Docs and knowledge base", "Billing or subscription systems", "Helpdesk, CRM, or issue tracker"],
    workflowSteps: [
      {
        title: "Answer in context",
        description:
          "Verly responds inside the app or on the site using synced docs, release notes, and account context instead of a static FAQ.",
      },
      {
        title: "Collect technical details early",
        description:
          "When the request is not solvable instantly, it gathers structured context like workspace state, screenshots, and repro steps before handoff.",
      },
      {
        title: "Protect engineering time",
        description:
          "Onboarding, billing, and common support motions stay automated while true product issues reach the right team with a clean summary.",
      },
    ],
    cardImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1800&h=1400&fit=crop",
    cardImageAlt: "SaaS support team working on customer onboarding and product help",
    heroImage: "/solutions/saas-platforms.png",
    heroImageAlt: "SaaS support workspace visual",
    heroPanelLabel: "Support command center",
    heroSummary: [
      "Answer docs and onboarding questions with grounded product knowledge.",
      "Collect technical context before escalation so engineering stops doing intake work.",
      "Automate billing, upgrade, and account-management conversations inside the product.",
    ],
    features: [
      "Knowledge-backed answers from docs, changelogs, and internal help content",
      "Contextual onboarding guidance directly inside the product",
      "Technical triage with structured issue collection before handoff",
      "Billing, invoice, and upgrade automation for common account workflows",
      "In-app widget support with page-aware responses",
    ],
    heroTagline: "Scale SaaS support without scaling headcount",
    heroSubtitle:
      "Fast-growing software products need more than a FAQ bot. Verly resolves repetitive product questions, guides onboarding, and captures the technical details your engineers need when a case actually deserves human review.",
    tags: ["In-App Support", "Technical Triage", "Billing", "Docs"],
    painPoints: [
      {
        title: "Engineers get dragged into Tier 1 support",
        description:
          "Simple setup questions and recurring troubleshooting issues land in the same queue as real incidents, which slows both support and product velocity.",
      },
      {
        title: "Onboarding friction creates avoidable churn",
        description:
          "New customers ask the same implementation questions repeatedly because answers are scattered across docs, release notes, and the product UI.",
      },
      {
        title: "Support replies are inconsistent",
        description:
          "Customers should not get different answers depending on who is online. Inconsistent guidance creates confusion and makes debugging harder.",
      },
      {
        title: "Escalations arrive without the right data",
        description:
          "A bug report without repro steps, workspace state, or browser context still forces someone on your team to start from zero.",
      },
    ],
    capabilities: [
      {
        title: "Grounded product answers",
        description:
          "Use synced docs, release notes, and internal playbooks to answer setup and feature questions with links and source-backed guidance.",
      },
      {
        title: "Onboarding assistance in context",
        description:
          "Guide users through setup, configuration, and adoption flows based on where they are in the product and what they are trying to do.",
      },
      {
        title: "Structured bug and support triage",
        description:
          "Collect screenshots, browser details, workspace context, and repro steps before a ticket reaches engineering or product support.",
      },
      {
        title: "Billing and account operations",
        description:
          "Handle invoices, upgrades, renewals, plan comparisons, and entitlement questions automatically while preserving escalation paths for edge cases.",
      },
      {
        title: "Unified escalation workflow",
        description:
          "Route technical issues, high-value accounts, and urgent incidents with summaries and next-step context already attached.",
      },
    ],
    useCases: [
      {
        title: "SSO setup guidance",
        scenario:
          "An admin asks how to complete SAML setup while they are inside your settings page.",
        outcome:
          "Verly explains the exact steps, maps them to your UI, highlights common errors, and links the right docs before the ticket ever reaches support.",
      },
      {
        title: "Bug report intake",
        scenario:
          "A customer reports failed exports but only provides a vague description in chat.",
        outcome:
          "Verly gathers the affected workspace, date range, browser details, and reproduction steps so engineering receives a structured report instead of a loose complaint.",
      },
      {
        title: "Plan upgrade conversation",
        scenario:
          "A customer asks if upgrading mid-cycle unlocks audit logs and higher usage limits immediately.",
        outcome:
          "Verly explains the differences, handles the billing logic, and routes the user toward the upgrade path without pulling in a human rep.",
      },
    ],
    metrics: [
      { value: "70%", label: "fewer onboarding tickets for product teams" },
      { value: "95%", label: "answer accuracy on grounded knowledge flows" },
      { value: "<30s", label: "resolution time for common SaaS questions" },
      { value: "80%", label: "lower support-cost pressure on scaling teams" },
    ],
    faqItems: [
      {
        question: "Can Verly answer from our docs and release notes without retraining every week?",
        answer:
          "Yes. Verly is designed around synced knowledge sources so answers stay grounded in current content rather than a stale static FAQ workflow.",
      },
      {
        question: "Can it work inside the product instead of only on the marketing site?",
        answer:
          "Yes. Teams often use Verly in-app so support can respond with knowledge, account context, and workflow guidance where the user is actually working.",
      },
      {
        question: "How do you prevent low-quality escalation to engineering?",
        answer:
          "Verly can gather structured context before handoff, including intent, priority, reproduction details, and any required metadata your team needs to act quickly.",
      },
      {
        question: "Can billing and technical support use different rules?",
        answer:
          "Yes. Each motion can use different guardrails, knowledge sources, and escalation behavior while still operating inside one support system.",
      },
    ],
    relatedSlugs: ["education", "professional-services", "e-commerce-retail"],
  },
  {
    slug: "healthcare",
    icon: Heart,
    title: "Healthcare",
    category: "Voice",
    description:
      "Handle patient scheduling, refill requests, and routine triage with guardrails, multilingual access, and always-on response coverage.",
    color: "text-[#dc5b5b]",
    bg: "bg-[#fdeeed]",
    primaryTeam:
      "Patient-access, front-desk, and healthcare operations teams managing routine inbound communication.",
    primaryChannels: ["Voice", "Web chat", "WhatsApp"],
    starterAutomations: [
      "Appointment booking, rescheduling, and visit-prep questions",
      "Refill intake and routine follow-up workflows",
      "Office, referral, insurance, and intake guidance with guardrails",
    ],
    knowledgeSources: [
      "Scheduling and availability data",
      "Approved visit-prep, office, and intake guidance",
      "Operational policies for referrals, refills, and escalation boundaries",
    ],
    systemActions: [
      "Confirm or change appointments and share next steps",
      "Collect refill or intake details before routing",
      "Send follow-up instructions in the patient's preferred channel",
    ],
    handoffTriggers: [
      "Clinical, urgent, or symptom-sensitive conversations",
      "Policy-sensitive exceptions or cases needing staff judgment",
      "Requests that require direct review by care or access teams",
    ],
    integrations: ["Scheduling systems", "Patient-access workflows", "Helpdesk or routing systems"],
    workflowSteps: [
      {
        title: "Stay available after hours",
        description:
          "Verly answers routine patient questions when front-desk staff are offline, especially on evenings, weekends, and call spikes.",
      },
      {
        title: "Follow approved boundaries",
        description:
          "It uses operational guidance for scheduling, prep, refill intake, and routine questions while staying inside guardrails defined by the team.",
      },
      {
        title: "Escalate sensitive cases correctly",
        description:
          "Anything urgent, clinical, or policy-sensitive routes to staff with the conversation already summarized so the patient is not forced to repeat it.",
      },
    ],
    cardImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1800&h=1400&fit=crop",
    cardImageAlt: "Healthcare support staff assisting patients in a clinic",
    heroImage: "/solutions/healthcare.png",
    heroImageAlt: "Healthcare patient access visual",
    heroPanelLabel: "Patient access flow",
    heroSummary: [
      "Automate appointment requests, reschedules, and routine patient questions.",
      "Keep refill and intake workflows moving without forcing patients to wait on hold.",
      "Add compliance-aware guardrails and escalation logic for sensitive conversations.",
    ],
    features: [
      "24/7 scheduling and rescheduling for patient access teams",
      "Prescription refill intake and follow-up workflows",
      "Insurance, referral, and intake question automation",
      "Multilingual support for high-volume patient communication",
      "Voice, messaging, and web coverage from one operating model",
    ],
    heroTagline: "Patient communication that does not stop when the front desk closes",
    heroSubtitle:
      "Healthcare teams spend too much time on routine calls and portal questions while patients wait for simple answers. Verly helps patient access and operations teams automate the repetitive volume, preserve guardrails, and escalate only when clinical nuance or policy requires it.",
    tags: ["Patient Access", "Scheduling", "Refills", "Compliance-Aware"],
    painPoints: [
      {
        title: "Missed calls turn into missed appointments",
        description:
          "When the line is busy or voicemail takes over, patients often do not try again. That creates revenue loss and a poor care-access experience.",
      },
      {
        title: "Routine questions overwhelm staff",
        description:
          "Office hours, appointment prep, referral requirements, and refill updates should not consume the same staff time needed for higher-value care coordination.",
      },
      {
        title: "Automation is risky without clear guardrails",
        description:
          "Healthcare teams need escalation and data-handling rules that respect policy, privacy, and operational boundaries, not generic chatbot behavior.",
      },
      {
        title: "After-hours demand never disappears",
        description:
          "Patients call outside business hours because that is when they remember, worry, or need to make a change. The operation still needs to respond.",
      },
    ],
    capabilities: [
      {
        title: "Appointment management",
        description:
          "Handle scheduling, rescheduling, cancellations, reminders, and intake preparation across the channels patients already use.",
      },
      {
        title: "Routine patient-question automation",
        description:
          "Answer office, provider, and visit-prep questions quickly while keeping the conversation inside approved operational boundaries.",
      },
      {
        title: "Refill and follow-up workflows",
        description:
          "Collect refill details, confirm the right workflow, and route the request or status update without long hold times.",
      },
      {
        title: "Multilingual patient communication",
        description:
          "Support diverse patient populations with natural language handling across voice and messaging instead of maintaining separate manual coverage.",
      },
      {
        title: "Escalation for sensitive cases",
        description:
          "Route symptom-based, urgent, or policy-sensitive issues with the right summary so your team stays in control when a conversation should leave automation.",
      },
    ],
    useCases: [
      {
        title: "After-hours scheduling",
        scenario:
          "A patient calls after work to reschedule tomorrow's appointment and ask what they need to bring.",
        outcome:
          "Verly checks availability, confirms the new slot, shares visit-prep details, and sends a follow-up message without forcing a callback the next day.",
      },
      {
        title: "Prescription refill intake",
        scenario:
          "A patient wants a refill update and is unsure whether the request was submitted correctly.",
        outcome:
          "Verly captures the required details, confirms the next step, and routes the request according to your refill process instead of leaving the patient in a phone queue.",
      },
      {
        title: "Insurance and referral guidance",
        scenario:
          "A new patient asks whether a referral is required before booking a specialist visit.",
        outcome:
          "Verly explains the intake path, collects the needed information, and moves the patient toward the correct scheduling flow quickly.",
      },
    ],
    metrics: [
      { value: "24/7", label: "patient-access coverage outside office hours" },
      { value: "60%", label: "fewer routine calls reaching front-desk staff" },
      { value: "<1 min", label: "faster scheduling resolution for common requests" },
      { value: "95+", label: "languages available for patient communication" },
    ],
    faqItems: [
      {
        question: "Can Verly support healthcare teams with stricter data-handling requirements?",
        answer:
          "Yes. The product can be configured with operational guardrails, workflow boundaries, and escalation rules so automation only handles the motions your team approves.",
      },
      {
        question: "Is this only for chat, or can it handle phone traffic too?",
        answer:
          "Healthcare teams often need voice coverage as much as messaging coverage. Verly is designed to support both instead of forcing separate systems for each channel.",
      },
      {
        question: "What kinds of conversations should still escalate to staff?",
        answer:
          "Anything involving clinical nuance, urgency, policy-sensitive exceptions, or workflows your team does not want automated can escalate immediately with conversation context attached.",
      },
      {
        question: "Can the patient experience be multilingual?",
        answer:
          "Yes. Teams can support multiple languages without maintaining independent manual queues for each one, which is especially useful for patient-access operations.",
      },
    ],
    relatedSlugs: ["education", "restaurants-hospitality", "professional-services"],
  },
  {
    slug: "restaurants-hospitality",
    icon: Utensils,
    title: "Restaurants & Hospitality",
    category: "Voice",
    description:
      "Automate reservations, guest questions, and catering intake across calls and messages so staff stay focused on service.",
    color: "text-[#d48536]",
    bg: "bg-[#fff4e7]",
    primaryTeam:
      "Host stand, guest-services, and multi-location hospitality teams balancing live service with inbound demand.",
    primaryChannels: ["Voice", "WhatsApp", "Web chat"],
    starterAutomations: [
      "Reservations, confirmations, and availability checks",
      "Menu, allergen, parking, and opening-hours questions",
      "Large-party, catering, and event inquiry capture",
    ],
    knowledgeSources: [
      "Reservation policies and availability",
      "Menu, allergen, and venue-specific guest information",
      "Location details, hours, and event intake requirements",
    ],
    systemActions: [
      "Book reservations and confirm details automatically",
      "Answer common guest questions without pulling staff off the floor",
      "Capture event and catering leads with structured intake",
    ],
    handoffTriggers: [
      "VIP events, large parties, or unusual service requests",
      "Special allergen or policy exceptions needing staff confirmation",
      "Requests that require manager approval or manual availability checks",
    ],
    integrations: ["Reservation systems", "Location and menu data", "CRM or catering lead workflows"],
    workflowSteps: [
      {
        title: "Handle the rush-time questions",
        description:
          "Verly covers repetitive guest questions and reservation demand during the exact moments when the team should stay focused on in-person service.",
      },
      {
        title: "Keep the guest information consistent",
        description:
          "Hours, menu guidance, allergen notes, and location details come from one approved source instead of ad hoc staff answers.",
      },
      {
        title: "Capture the valuable exceptions",
        description:
          "Large parties, catering requests, and special guest situations are routed to managers with the intake already collected.",
      },
    ],
    cardImage:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800&h=1400&fit=crop",
    cardImageAlt: "Restaurant and hospitality team serving guests",
    heroImage: "/solutions/restaurants-hospitality.png",
    heroImageAlt: "Hospitality reservations visual",
    heroPanelLabel: "Guest operations desk",
    heroSummary: [
      "Handle reservations, opening-hours questions, and large-party requests instantly.",
      "Keep menu, allergen, and location details available over voice and messaging.",
      "Capture catering and event leads instead of letting them die in voicemail.",
    ],
    features: [
      "Reservation capture over voice, WhatsApp, and web chat",
      "Menu, hours, and allergen answers without pulling staff off the floor",
      "Large-party and catering inquiry capture with qualification built in",
      "Location-aware routing for multi-venue operators",
      "Always-on guest communication for peak hours and closed periods",
    ],
    heroTagline: "Never miss a guest inquiry during the rush",
    heroSubtitle:
      "Hospitality teams lose covers and event revenue when phones go unanswered or staff have to leave service to handle repetitive questions. Verly keeps reservations, guest information, and lead capture moving without disrupting the in-person experience.",
    tags: ["Reservations", "Guest Messaging", "Catering", "Voice AI"],
    painPoints: [
      {
        title: "Peak-hour calls overwhelm the host stand",
        description:
          "The busiest moments for guest service are also the worst times to stop and answer repetitive phone questions about hours, reservations, and menu details.",
      },
      {
        title: "Staff get pulled away from the floor",
        description:
          "Every routine phone interruption reduces table attention, slows service, and creates operational drag right when guests expect the opposite.",
      },
      {
        title: "Guest information is inconsistent",
        description:
          "Allergen details, parking instructions, and policy questions need consistent answers, but busy teams often answer from memory instead of a shared playbook.",
      },
      {
        title: "High-value inquiries slip through",
        description:
          "Catering and event leads often arrive after hours or during service rushes, which means valuable conversations can get lost before anyone follows up.",
      },
    ],
    capabilities: [
      {
        title: "Reservation automation",
        description:
          "Handle booking, confirmations, updates, and availability checks without forcing a guest to wait for a host to free up.",
      },
      {
        title: "Guest information coverage",
        description:
          "Answer questions about hours, locations, parking, menu items, allergen notes, and house policies with consistent guidance.",
      },
      {
        title: "Catering and event lead capture",
        description:
          "Collect date, party size, budget, and intent so the right team gets a qualified lead instead of an incomplete voicemail.",
      },
      {
        title: "Multi-location support logic",
        description:
          "Route conversations by venue, local hours, and availability while keeping one support system behind the scenes.",
      },
      {
        title: "Escalation for VIP or exception handling",
        description:
          "Special events, large parties, and edge-case requests can route directly to managers with a clean summary of what the guest already asked for.",
      },
    ],
    useCases: [
      {
        title: "Peak-hour reservation call",
        scenario:
          "A guest calls during dinner rush asking for a table for six and whether the patio is available.",
        outcome:
          "Verly checks availability, books the reservation, confirms the seating preference, and sends the guest a follow-up confirmation without interrupting service staff.",
      },
      {
        title: "Allergen and menu question",
        scenario:
          "A customer messages to ask which dishes are safe for a gluten-free diner with a shellfish allergy.",
        outcome:
          "Verly answers from the approved menu guidance and can escalate if the venue requires a manager or chef to confirm a special case.",
      },
      {
        title: "Catering lead capture",
        scenario:
          "A business owner reaches out after hours about catering a 40-person lunch next week.",
        outcome:
          "Verly captures the event details, qualifies the request, and routes the lead to the catering team with all context attached for morning follow-up.",
      },
    ],
    metrics: [
      { value: "24/7", label: "guest-response coverage beyond service hours" },
      { value: "65%", label: "reservation and FAQ volume handled automatically" },
      { value: "40%", label: "more catering leads captured cleanly" },
      { value: "<10s", label: "response time for common guest questions" },
    ],
    faqItems: [
      {
        question: "Can Verly handle reservations across multiple locations?",
        answer:
          "Yes. Teams can route by venue, local operating hours, and availability rules while still running one support system for the overall brand.",
      },
      {
        question: "What about menu or allergen accuracy?",
        answer:
          "The system works best when guest-facing answers are grounded in approved operational content so staff are not improvising sensitive responses from memory.",
      },
      {
        question: "Can it capture high-value event inquiries instead of just FAQ traffic?",
        answer:
          "Yes. Catering, private dining, and event requests can use separate intake paths so the commercial value of those conversations is not lost in a generic support queue.",
      },
      {
        question: "Can staff still step in when needed?",
        answer:
          "Yes. Special requests, VIP guests, and exception cases can escalate quickly with context preserved so the guest does not have to repeat everything.",
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
      "Qualify property inquiries, answer listing questions, and book tours around the clock across web chat and messaging.",
    color: "text-[#0f8b8d]",
    bg: "bg-[#e7fbfa]",
    primaryTeam:
      "Brokerage, ISA, and agent teams handling buyer, renter, seller, and landlord demand.",
    primaryChannels: ["Web chat", "WhatsApp", "Voice"],
    starterAutomations: [
      "Listing questions and property-availability responses",
      "Buyer, renter, and seller qualification before agent handoff",
      "Tour scheduling, reminders, and next-step coordination",
    ],
    knowledgeSources: [
      "Listing data and availability",
      "Neighborhood, property, and qualification guidance",
      "Agent rules for routing by budget, timeline, and geography",
    ],
    systemActions: [
      "Answer property questions instantly",
      "Collect budget, intent, financing, and timeline details",
      "Book tours and push qualified demand into the CRM",
    ],
    handoffTriggers: [
      "High-intent prospects ready for agent follow-up",
      "Negotiation, financing, or property-specific edge cases",
      "Seller or landlord situations needing a dedicated team member",
    ],
    integrations: ["Listing inventory or property data", "Calendars for tour booking", "CRM and lead-routing systems"],
    workflowSteps: [
      {
        title: "Respond before the lead cools down",
        description:
          "Verly answers late-night and weekend inquiries the moment they arrive instead of waiting for office-hour follow-up.",
      },
      {
        title: "Qualify before routing",
        description:
          "It collects buying timeline, budget, location preference, and intent so top-performing agents are not doing first-pass intake manually.",
      },
      {
        title: "Book the next step fast",
        description:
          "Tours, callbacks, and CRM handoff happen with the prospect summary already captured so momentum is not lost.",
      },
    ],
    cardImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&h=1400&fit=crop",
    cardImageAlt: "Real estate property inquiry and buyer support visual",
    heroImage: "/solutions/real-estate.png",
    heroImageAlt: "Real estate lead routing visual",
    heroPanelLabel: "Lead routing system",
    heroSummary: [
      "Capture and qualify buyer, seller, and renter inquiries 24/7.",
      "Answer property questions instantly with listing and neighborhood context.",
      "Book tours and route qualified leads into the right agent workflow fast.",
    ],
    features: [
      "Always-on property inquiry capture and qualification",
      "Tour scheduling with calendar coordination and reminders",
      "Instant answers on listings, neighborhoods, and availability",
      "Lead routing by budget, timeline, intent, and geography",
      "CRM synchronization for agents and brokerage teams",
    ],
    heroTagline: "Capture high-intent property demand before it goes cold",
    heroSubtitle:
      "The best real-estate lead is the one you respond to first. Verly helps teams qualify prospects, answer listing questions, and book next steps immediately so late-night inquiries and weekend traffic do not disappear before an agent can respond.",
    tags: ["Lead Qualification", "Tour Booking", "Listings", "CRM Sync"],
    painPoints: [
      {
        title: "Leads go cold outside business hours",
        description:
          "Property interest is high at night and on weekends, but most brokerage response systems are still built around office-hour follow-up.",
      },
      {
        title: "Agents repeat the same listing answers",
        description:
          "Square footage, HOA fees, move-in dates, school zones, and financing basics consume time that should be spent on high-conviction conversations.",
      },
      {
        title: "Tour scheduling creates friction",
        description:
          "Coordinating calendars, confirming availability, and chasing responses makes the first real next step harder than it should be.",
      },
      {
        title: "Unqualified leads still reach top performers",
        description:
          "Without early qualification, valuable agent time disappears into conversations that should have been filtered or routed sooner.",
      },
    ],
    capabilities: [
      {
        title: "Property inquiry handling",
        description:
          "Answer listing, neighborhood, and availability questions immediately using live property context and approved agent guidance.",
      },
      {
        title: "Lead qualification",
        description:
          "Collect buyer or renter intent, financing readiness, budget, location preference, and timing before routing the conversation onward.",
      },
      {
        title: "Tour booking workflows",
        description:
          "Offer viewing slots, coordinate calendars, and send confirmation or reminder messages without a string of manual follow-ups.",
      },
      {
        title: "Seller and landlord intake",
        description:
          "Route listing-owner and landlord inquiries through a different qualification flow than buyer demand so both motions stay organized.",
      },
      {
        title: "CRM and agent routing",
        description:
          "Sync qualified leads and conversation summaries into the systems your agents already use so nothing has to be re-entered later.",
      },
    ],
    useCases: [
      {
        title: "Late-night buyer inquiry",
        scenario:
          "A buyer asks about a property at 10:30pm and wants to know whether they can tour it this weekend.",
        outcome:
          "Verly answers key listing questions, qualifies the buyer's timing and budget, and books the next available showing before the lead drifts elsewhere.",
      },
      {
        title: "Rental listing question",
        scenario:
          "A renter asks about move-in dates, pet policies, and parking for a newly listed apartment.",
        outcome:
          "Verly provides the approved property details instantly and moves qualified renters toward an application or tour instead of forcing manual follow-up.",
      },
      {
        title: "Seller lead routing",
        scenario:
          "A homeowner wants to know what your brokerage would need to evaluate their property for sale.",
        outcome:
          "Verly captures the property details, timeline, and goals, then routes the inquiry to the right agent with a clean intake summary.",
      },
    ],
    metrics: [
      { value: "24/7", label: "lead capture across nights and weekends" },
      { value: "50%", label: "faster response to inbound listing interest" },
      { value: "35%", label: "more tours booked from inbound demand" },
      { value: "2x", label: "better qualification before agent handoff" },
    ],
    faqItems: [
      {
        question: "Can Verly support both buyer and renter workflows?",
        answer:
          "Yes. Each motion can use different qualification questions, routing rules, and next steps while still running inside one system.",
      },
      {
        question: "Does it need to replace our CRM?",
        answer:
          "No. The common pattern is to use Verly for capture, qualification, and scheduling while syncing the output into the CRM your brokerage or team already operates from.",
      },
      {
        question: "Can it handle seller inquiries too?",
        answer:
          "Yes. Seller and landlord intake can route through dedicated qualification flows rather than mixing with general buyer demand.",
      },
      {
        question: "What gets escalated to agents?",
        answer:
          "High-intent leads, special negotiation questions, and complex property-specific scenarios can move to agents quickly with a summary of what has already been captured.",
      },
    ],
    relatedSlugs: ["professional-services", "travel-tourism", "e-commerce-retail"],
  },
  {
    slug: "education",
    icon: GraduationCap,
    title: "Education",
    category: "Support",
    description:
      "Support prospective students, current students, and families with admissions, aid, and campus-service answers across chat, voice, and messaging.",
    color: "text-[#4669d9]",
    bg: "bg-[#edf2ff]",
    primaryTeam:
      "Admissions, student-services, registrar, and financial-aid teams managing high-volume inquiry cycles.",
    primaryChannels: ["Web chat", "Voice", "WhatsApp"],
    starterAutomations: [
      "Admissions, deadline, and program-fit questions",
      "Financial-aid, document, and process guidance",
      "Campus tour booking and next-step routing",
    ],
    knowledgeSources: [
      "Admissions calendars, program pages, and application requirements",
      "Approved aid, registrar, and campus-service content",
      "Tour availability and institution-specific routing rules",
    ],
    systemActions: [
      "Answer student and family questions at any time",
      "Guide applicants through required next steps and document needs",
      "Book tours or route cases to admissions, aid, or registrar teams",
    ],
    handoffTriggers: [
      "Account-specific aid, registrar, or student-record issues",
      "Exceptions that require institutional review or policy judgment",
      "Conversations that need a live staff owner for follow-through",
    ],
    integrations: ["Admissions and tour workflows", "Knowledge base or program content", "CRM or student-service routing systems"],
    workflowSteps: [
      {
        title: "Answer the repetitive intake volume",
        description:
          "Verly handles deadline, program, document, and campus questions across channels so staff are not buried in the same requests every cycle.",
      },
      {
        title: "Guide the next action clearly",
        description:
          "It uses approved institutional content to tell students and families what to submit, when to act, and which office owns the next step.",
      },
      {
        title: "Escalate account-specific cases cleanly",
        description:
          "When a conversation reaches aid exceptions, student records, or sensitive review, the right team receives the full intake and context.",
      },
    ],
    cardImage:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1800&h=1400&fit=crop",
    cardImageAlt: "Students and staff in an education support setting",
    heroImage: "/solutions/education.png",
    heroImageAlt: "Education student services visual",
    heroPanelLabel: "Student services desk",
    heroSummary: [
      "Answer admissions, deadline, and program questions at any time.",
      "Handle financial-aid and campus-service inquiries with clearer routing.",
      "Book tours, guide next steps, and reduce repetitive intake work for staff.",
    ],
    features: [
      "Admissions and application guidance across channels",
      "Financial-aid and student-services FAQ automation",
      "Tour booking and reminder workflows",
      "Program, catalog, and campus information support",
      "Role-based routing for admissions, registrar, and service teams",
    ],
    heroTagline: "Give students and families answers when they actually need them",
    heroSubtitle:
      "Education teams face intense inquiry volume around admissions, aid, deadlines, and campus logistics. Verly helps institutions respond faster, book next steps sooner, and keep repetitive support from overwhelming staff during peak enrollment periods.",
    tags: ["Admissions", "Student Services", "Aid Questions", "Campus Tours"],
    painPoints: [
      {
        title: "Admissions teams drown in repeated questions",
        description:
          "Every cycle creates the same flood of deadline, requirement, and program-fit questions that should be answered instantly, not days later.",
      },
      {
        title: "Students need help outside office hours",
        description:
          "Questions about deadlines, documents, or enrollment often come up late at night, on weekends, or across time zones when nobody is available to respond.",
      },
      {
        title: "Aid and process questions take too long to resolve",
        description:
          "Financial-aid workflows are sensitive and repetitive, which makes them a poor fit for manual back-and-forth and a strong fit for guided automation.",
      },
      {
        title: "Scheduling tours and next steps is fragmented",
        description:
          "Campus tours, callbacks, and department-specific follow-ups often require too many manual messages for a high-volume admissions team.",
      },
    ],
    capabilities: [
      {
        title: "Admissions guidance",
        description:
          "Help prospective students understand program requirements, deadlines, application steps, and the right next action for their situation.",
      },
      {
        title: "Student-services coverage",
        description:
          "Answer common registrar, campus, and support questions so current students do not have to wait for staff to handle routine requests.",
      },
      {
        title: "Financial-aid workflow support",
        description:
          "Guide students through common aid questions, application preparation, and status-related next steps with approved operational answers.",
      },
      {
        title: "Tour and appointment scheduling",
        description:
          "Book campus tours, department visits, or admissions follow-ups while keeping reminders and confirmations automatic.",
      },
      {
        title: "Team-based routing and escalation",
        description:
          "Send complex cases to admissions, aid, registrar, or student-support staff with the right context already captured.",
      },
    ],
    useCases: [
      {
        title: "Application deadline question",
        scenario:
          "A prospective student asks whether late materials are accepted for a specific graduate program.",
        outcome:
          "Verly provides the approved deadline guidance, clarifies the requirement, and offers the correct next step instead of leaving the student waiting for email follow-up.",
      },
      {
        title: "Financial-aid support",
        scenario:
          "A student wants to understand what still needs to be submitted before aid can be processed.",
        outcome:
          "Verly explains the document path, highlights what is commonly missing, and routes any account-specific exception to the right office.",
      },
      {
        title: "Campus tour booking",
        scenario:
          "A family wants to schedule a campus visit and ask whether engineering facilities can be included.",
        outcome:
          "Verly presents available dates, books the visit, and captures the program interest so the institution can personalize follow-up.",
      },
    ],
    metrics: [
      { value: "24/7", label: "coverage for admissions and student-service questions" },
      { value: "65%", label: "fewer repetitive inquiries reaching staff" },
      { value: "40%", label: "more tours and next steps booked quickly" },
      { value: "<5s", label: "response time on common student questions" },
    ],
    faqItems: [
      {
        question: "Can different campus teams use different support rules?",
        answer:
          "Yes. Admissions, aid, registrar, and campus-service teams can each use different routing, content, and escalation behavior while keeping one student-facing experience.",
      },
      {
        question: "Is this only for prospective students?",
        answer:
          "No. Institutions often use Verly for both admissions workflows and current-student support motions that generate repetitive operational questions.",
      },
      {
        question: "Can it support multilingual enrollment or student communication?",
        answer:
          "Yes. Institutions can use multilingual coverage so international students and families are not blocked on office-hour availability.",
      },
      {
        question: "What happens when the conversation becomes account-specific?",
        answer:
          "Those cases can escalate with conversation context and intake details attached so staff can respond faster and avoid re-asking the basics.",
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
      "Help travelers with booking changes, disruption support, and live itinerary questions across voice and messaging without long queues.",
    color: "text-[#3d8fd2]",
    bg: "bg-[#eaf6ff]",
    primaryTeam:
      "Travel operations, support, and service teams handling urgent itinerary and disruption conversations.",
    primaryChannels: ["Voice", "WhatsApp", "Web chat"],
    starterAutomations: [
      "Booking-change, cancellation, and itinerary-update requests",
      "Delay, disruption, and next-step travel guidance",
      "Destination, document, and service questions across time zones",
    ],
    knowledgeSources: [
      "Booking and itinerary context",
      "Operational travel policies and disruption guidance",
      "Destination, document, and service information approved by the team",
    ],
    systemActions: [
      "Guide travelers through changes and disruption flows",
      "Share live next steps across voice and messaging",
      "Capture preferences and route urgent cases to operations teams",
    ],
    handoffTriggers: [
      "Complex refunds, rebooking exceptions, or policy overrides",
      "Urgent disruptions needing a live operations decision",
      "Cases where the traveler's request falls outside standard support rules",
    ],
    integrations: ["Booking or itinerary systems", "Travel policy and service data", "Operations or helpdesk routing"],
    workflowSteps: [
      {
        title: "Respond during the disruption spike",
        description:
          "Verly keeps urgent traveler questions moving when delays, cancellations, or missed connections create sudden queue pressure.",
      },
      {
        title: "Use the latest trip context",
        description:
          "It answers from itinerary, policy, and operational guidance so the traveler gets relevant next steps instead of generic FAQ copy.",
      },
      {
        title: "Route exceptions without losing time",
        description:
          "Refund, rebooking, and edge-case escalation moves to live teams with the history already captured, which matters most in urgent moments.",
      },
    ],
    cardImage:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1800&h=1400&fit=crop",
    cardImageAlt: "Travel operations visual with airport and flight activity",
    heroImage: "/solutions/travel-tourism.png",
    heroImageAlt: "Travel disruption support visual",
    heroPanelLabel: "Travel disruption desk",
    heroSummary: [
      "Handle booking changes, cancellations, and schedule disruptions quickly.",
      "Keep real-time travel information available across voice and messaging channels.",
      "Support multilingual travelers with one consistent concierge-style operating layer.",
    ],
    features: [
      "Booking modifications and itinerary update support",
      "Delay, cancellation, and disruption communication workflows",
      "Destination and local-guidance assistance for travelers",
      "Visa, document, and process guidance for common cases",
      "Multi-channel support for urgent travel conversations",
    ],
    heroTagline: "Give travelers a faster path through disruption",
    heroSubtitle:
      "Travel support gets hardest when urgency is highest. Verly helps travel teams handle booking changes, deliver real-time updates, and guide travelers across channels so they are not stuck waiting when plans shift quickly.",
    tags: ["Disruption Support", "Booking Changes", "Multilingual", "Travel Ops"],
    painPoints: [
      {
        title: "Booking changes arrive in waves",
        description:
          "Delays, missed connections, and changing plans create sudden spikes in urgent conversations that traditional support teams struggle to absorb.",
      },
      {
        title: "Travel information becomes stale fast",
        description:
          "If a traveler waits too long for a response, the original question may already be obsolete because the gate changed or the itinerary moved again.",
      },
      {
        title: "Global traveler coverage is expensive",
        description:
          "Supporting multiple languages and time zones manually is difficult, especially for teams that need fast response during disruption events.",
      },
      {
        title: "Queues destroy confidence during urgent moments",
        description:
          "Travelers remember the support experience most when things go wrong. Long holds or delayed replies damage trust at the worst possible time.",
      },
    ],
    capabilities: [
      {
        title: "Booking modification support",
        description:
          "Help customers change flights, hotel reservations, or itinerary details without forcing them to restart the journey in another channel.",
      },
      {
        title: "Real-time disruption communication",
        description:
          "Use travel updates and operational logic to guide travelers through delays, cancellations, and next-step decisions faster.",
      },
      {
        title: "Traveler guidance and concierge support",
        description:
          "Answer destination, local logistics, and service questions while keeping the experience conversational and useful.",
      },
      {
        title: "Document and process guidance",
        description:
          "Handle common documentation and prep questions so travelers do not have to rely on scattered search results or overloaded call centers.",
      },
      {
        title: "Escalation for complex travel exceptions",
        description:
          "Move high-friction rebooking, refund, or policy-sensitive cases to the right team with a clean conversation summary attached.",
      },
    ],
    useCases: [
      {
        title: "Cancelled-flight recovery",
        scenario:
          "A traveler needs help after a connection is cancelled because of weather and they are trying to reach their final destination quickly.",
        outcome:
          "Verly explains the next available options, captures the preferred path, and moves the customer toward the correct rebooking workflow faster than a queue-based handoff.",
      },
      {
        title: "Hotel booking question",
        scenario:
          "A traveler messages to ask whether they can modify check-in time and add an airport pickup request.",
        outcome:
          "Verly handles the operational request and confirms the available path without requiring a call back from the front desk or service desk.",
      },
      {
        title: "Travel documentation guidance",
        scenario:
          "A traveler asks what documents are typically needed for a transit-heavy international route.",
        outcome:
          "Verly provides the approved guidance, points to the right next step, and escalates only if the case falls outside standard support rules.",
      },
    ],
    metrics: [
      { value: "70%", label: "common booking and disruption requests automated" },
      { value: "<10s", label: "response time for urgent travel questions" },
      { value: "95+", label: "languages supported for traveler communication" },
      { value: "50%", label: "reduction in support pressure during surges" },
    ],
    faqItems: [
      {
        question: "Can Verly support urgent disruption traffic, not just routine FAQ?",
        answer:
          "Yes. Travel teams often need fast support during delays and cancellations, which is why the workflow should focus on resolution and routing speed instead of static FAQ behavior alone.",
      },
      {
        question: "Does it work across voice and messaging channels?",
        answer:
          "Yes. The same underlying support logic can cover voice, messaging, and web-based traveler interactions while preserving context across them.",
      },
      {
        question: "Can it handle multilingual traveler support?",
        answer:
          "Yes. Multilingual coverage is especially useful in travel because conversations often happen across time zones and language preferences during stressful moments.",
      },
      {
        question: "What happens with complex refund or policy exceptions?",
        answer:
          "Those can escalate to the right operations team with the traveler history and request summary already captured so the customer does not have to repeat their entire situation.",
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
      "Automate client intake, consultation booking, and document collection so service teams spend less time on repetitive coordination.",
    color: "text-[#64748b]",
    bg: "bg-[#edf1f6]",
    primaryTeam:
      "Advisory, service-ops, and client-success teams managing inbound qualification and onboarding.",
    primaryChannels: ["Web chat", "WhatsApp", "Voice"],
    starterAutomations: [
      "Consultation booking and package or process questions",
      "Lead qualification before partner or advisor handoff",
      "Client onboarding, document collection, and reminder workflows",
    ],
    knowledgeSources: [
      "Service packages, pricing logic, and scope guidance",
      "Onboarding checklists, document requirements, and delivery process content",
      "Routing rules by service line, urgency, or fit",
    ],
    systemActions: [
      "Qualify prospects and book the right meeting type",
      "Explain service differences and intake requirements",
      "Collect documents and push the summary into existing systems",
    ],
    handoffTriggers: [
      "Custom scoping, strategic advisory, or bespoke pricing discussions",
      "Sensitive client situations that need an owner immediately",
      "Exceptions where a partner or operator should take over directly",
    ],
    integrations: ["Calendar and scheduling tools", "CRM or pipeline systems", "Onboarding or document workflows"],
    workflowSteps: [
      {
        title: "Qualify before the first call",
        description:
          "Verly explains services, asks the right intake questions, and helps prospects self-select into the correct path before a human meeting happens.",
      },
      {
        title: "Remove the repetitive coordination",
        description:
          "Consultation scheduling, reminders, and document collection run automatically so the team is not chasing every step manually.",
      },
      {
        title: "Escalate the high-value conversations",
        description:
          "Complex scoping and strategic exceptions route to advisors with the intake already structured, which shortens time to a useful first call.",
      },
    ],
    cardImage:
      "https://images.unsplash.com/photo-1552581234-26160f608093?w=1800&h=1400&fit=crop",
    cardImageAlt: "Professional services team in a client-facing working session",
    heroImage: "/solutions/professional-services.png",
    heroImageAlt: "Professional services client intake visual",
    heroPanelLabel: "Client intake pipeline",
    heroSummary: [
      "Book consultations and answer service questions without manual back-and-forth.",
      "Collect intake details and documents before the first human call.",
      "Route prospects and clients to the right team with clearer context.",
    ],
    features: [
      "Consultation booking with calendar-aware availability",
      "Service, pricing, and process question automation",
      "Client onboarding and document-collection workflows",
      "Lead qualification before partner or advisor handoff",
      "CRM and project-system synchronization for follow-through",
    ],
    heroTagline: "Move clients from inquiry to intake with less manual work",
    heroSubtitle:
      "Professional-service teams win when they respond quickly and start engagements smoothly. Verly helps automate scheduling, intake, and document collection so your team can focus on delivering the work instead of managing repetitive coordination.",
    tags: ["Consultations", "Client Intake", "Documents", "CRM"],
    painPoints: [
      {
        title: "Scheduling takes too many touches",
        description:
          "Consultation booking often turns into a slow email chain, which creates friction before the relationship has even started.",
      },
      {
        title: "Intake is still manual and fragmented",
        description:
          "Teams collect the same background information, documents, and forms over and over without a consistent workflow behind it.",
      },
      {
        title: "After-hours demand gets lost",
        description:
          "Prospects visit your site at night or on weekends, but if the only response path is a form or voicemail, many never convert.",
      },
      {
        title: "Staff repeat pricing and scope explanations",
        description:
          "Service descriptions, package differences, and engagement steps are critical but repetitive, which makes them ideal candidates for support automation.",
      },
    ],
    capabilities: [
      {
        title: "Consultation booking",
        description:
          "Guide a prospect to the right meeting type, confirm availability, and book the next step without multiple manual messages.",
      },
      {
        title: "Service and pricing support",
        description:
          "Answer common questions about packages, engagement models, and process so prospects can self-qualify before they speak with the team.",
      },
      {
        title: "Client onboarding workflows",
        description:
          "Collect forms, documents, agreements, and other intake information with automated reminders and clear tracking.",
      },
      {
        title: "Lead and case routing",
        description:
          "Route inquiries by service line, urgency, or fit so the right advisor or operator receives the conversation summary immediately.",
      },
      {
        title: "Operational system sync",
        description:
          "Push intake data and summaries into the CRM or project tooling your business already uses so follow-through is not manual.",
      },
    ],
    useCases: [
      {
        title: "After-hours consultation request",
        scenario:
          "A prospective client wants to speak about bookkeeping support but lands on your site late in the evening.",
        outcome:
          "Verly qualifies the need, explains the relevant service path, and books the next available consultation instead of letting the inquiry sit until morning.",
      },
      {
        title: "Client onboarding preparation",
        scenario:
          "A newly signed client needs to submit multiple documents before kickoff can happen.",
        outcome:
          "Verly sends the intake checklist, tracks missing items, and keeps the onboarding flow moving without a coordinator chasing every step manually.",
      },
      {
        title: "Service comparison support",
        scenario:
          "A prospect asks what differentiates two advisory packages and whether either includes implementation support.",
        outcome:
          "Verly explains the package differences clearly and moves the prospect toward the right meeting or follow-up path based on fit.",
      },
    ],
    metrics: [
      { value: "40%", label: "more consultations booked from inbound traffic" },
      { value: "3x", label: "faster onboarding for common client workflows" },
      { value: "24/7", label: "lead capture beyond office-hour coverage" },
      { value: "8hrs", label: "operator time saved each week on coordination" },
    ],
    faqItems: [
      {
        question: "Can service lines use different intake logic?",
        answer:
          "Yes. Different teams or service offerings can use different qualification questions, content, and routing rules without creating a fragmented client experience.",
      },
      {
        question: "Does Verly replace our booking tools or CRM?",
        answer:
          "No. It usually sits in front of them, handling the conversation, qualification, and intake work before syncing the outcome into your existing systems.",
      },
      {
        question: "Can it help with document collection and follow-up?",
        answer:
          "Yes. Intake workflows are a strong fit because they are repetitive, operationally important, and often delayed by manual reminders or inconsistent coordination.",
      },
      {
        question: "What still needs a human partner or advisor?",
        answer:
          "Complex scoping, strategic advice, or sensitive exceptions can escalate immediately with the intake context preserved so your team starts informed.",
      },
    ],
    relatedSlugs: ["saas-platforms", "real-estate", "healthcare"],
  },
];

export const categories = ["All", "Support", "Voice", "Commerce", "Internal", "Sales"];

export function getSolutionBySlug(slug: string): SolutionDetail | undefined {
  return solutions.find((s) => s.slug === slug);
}

export function getAllSolutionSlugs(): string[] {
  return solutions.map((s) => s.slug);
}
