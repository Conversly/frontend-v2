export const FEATURES_PAGE_CONTENT = {
  "title": "Features | VerlyAI",
  "intro": "Explore every VerlyAI feature in one place. Browse by category, compare capabilities, and open any feature to see how it helps your support team automate faster and serve customers better."
} as const;

export const FEATURE_UI_ASSETS = {
  "defaultHeroImagePath": "/images/crisp/feature-detail.png",
  "defaultHeroImageAlt": "VerlyAI support workspace preview",
  "trialBannerImagePath": "/images/crisp/cta-banner-bg-trial.png",
  "trialBannerImageAlt": "VerlyAI trial banner preview",
  "trialLogoPath": "/verly_logo.png"
} as const;

export type ThemeKey = 'purple' | 'blue' | 'teal' | 'orange' | 'green' | 'violet' | 'indigo' | 'sky' | 'slate' | 'rose' | 'amber' | 'cyan';

export type FeatureItem = {
  title: string;
  slug: string;
  shortDescription: string;
  iconName?: string;
};

export type FeatureCategoryDefinition = {
  name: string;
  slug: string;
  summary: string;
  theme: ThemeKey;
  imagePath?: string;
};

export type FeatureCategory = FeatureCategoryDefinition & {
  features: FeatureItem[];
};

export type FeatureDetail = {
  title: string;
  slug: string;
  shortDescription: string;
  iconName?: string;
  categoryName: string;
  categorySlug: string;
  categorySummary: string;
  theme: ThemeKey;
  subtitle: string;
  tags: string[];
  overview: string;
  introParagraphs: string[];
  definitionPoints: string[];
  usageList: string[];
  workflowHint: string;
  howItWorksIntro: string[];
  functionBlocks: {
    name: string;
    description: string;
    imageAlt: string;
    imagePath?: string;
    notes?: string[];
  }[];
  setupSteps: {
    title: string;
    items: string[];
  }[];
  valuePoints: string[];
  useCases: string[];
  faqItems: {
    question: string;
    answer: string;
  }[];
  heroImagePath?: string;
  heroImageAlt?: string;
  overviewImagePath?: string;
  workflowImagePaths: string[];
};

export const FEATURE_CATEGORY_DEFINITIONS: FeatureCategoryDefinition[] = [
  {
    "name": "AI Features for Customer Support",
    "slug": "ai-features-for-customer-support",
    "summary": "Automate support with AI Chatbot and Answer Assistant.",
    "theme": "purple",
    "imagePath": "/svg/feature_ai_chatbot.svg"
  },
  {
    "name": "Ticketing system features",
    "slug": "ticketing-system-features",
    "summary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "imagePath": "/svg/feature_ticketing.svg"
  },
  {
    "name": "Live Chat Features",
    "slug": "live-chat-features",
    "summary": "Real-time communication, customizable chat widgets, and visitor tracking for modern support teams.",
    "theme": "teal",
    "imagePath": "/svg/feature_live_chat.svg"
  },
  {
    "name": "Call center features",
    "slug": "call-center-features",
    "summary": "Call center operations with routing, recordings, IVR, and device support for voice-first support.",
    "theme": "orange",
    "imagePath": "/svg/feature_call_center.svg"
  },
  {
    "name": "Customer service reports features",
    "slug": "customer-service-reports-features",
    "summary": "Reporting tools for performance, SLA compliance, and channel insights across support operations.",
    "theme": "green",
    "imagePath": "/svg/feature_reports.svg"
  },
  {
    "name": "Gamification features",
    "slug": "gamification-features",
    "summary": "Boost agent engagement, productivity, and collaboration through rewards and performance visibility.",
    "theme": "violet",
    "imagePath": "/svg/feature_reports.svg"
  },
  {
    "name": "Multilingual support features",
    "slug": "multilingual-support-features",
    "summary": "Multilingual support capabilities that help your team adapt conversations and widgets for global audiences.",
    "theme": "indigo",
    "imagePath": "/svg/feature_knowledge_base.svg"
  },
  {
    "name": "Customer portal features",
    "slug": "customer-portal-features",
    "summary": "Customer portal tools for self-service, knowledge sharing, feedback collection, and ticket submission.",
    "theme": "sky",
    "imagePath": "/svg/feature_knowledge_base.svg"
  },
  {
    "name": "Mobile help desk apps",
    "slug": "mobile-help-desk-apps",
    "summary": "Mobile apps that keep support teams productive on Android and iOS.",
    "theme": "slate",
    "imagePath": "/svg/feature_live_chat.svg"
  },
  {
    "name": "Help Desk Security features",
    "slug": "help-desk-security-features",
    "summary": "Security capabilities including access control, encryption, verification, and enterprise sign-on.",
    "theme": "rose",
    "imagePath": "/svg/feature_security.svg"
  },
  {
    "name": "Web Contact Cards Features",
    "slug": "web-contact-cards-features",
    "summary": "Browser-based contact cards for displaying contact and business information inside the support workflow.",
    "theme": "amber",
    "imagePath": "/svg/feature_sla_compliance.svg"
  },
  {
    "name": "Help Desk Integrations",
    "slug": "help-desk-integrations",
    "summary": "Integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack.",
    "theme": "cyan",
    "imagePath": "/svg/feature_integrations.svg"
  }
];

export const FEATURE_DETAILS: FeatureDetail[] = [
  {
    "title": "AI Answer Improver",
    "slug": "ai-answer-improver",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with AI Answer Improver.",
    "iconName": "sparkles",
    "categoryName": "AI Features for Customer Support",
    "categorySlug": "ai-features-for-customer-support",
    "categorySummary": "Automate support with AI Chatbot and Answer Assistant.",
    "theme": "purple",
    "subtitle": "Bring more consistency, speed, and confidence to your team with AI Answer Improver.",
    "tags": [
      "AI Features for Customer Support",
      "Customer support",
      "Verly"
    ],
    "overview": "AI Answer Improver is part of Verly's ai features for customer support toolkit. It helps teams automate support with AI Chatbot and Answer Assistant so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "AI Answer Improver helps modern support teams automate support with AI Chatbot and Answer Assistant. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, ai answer improver fits naturally into the broader ai features for customer support experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "AI Answer Improver is designed to support teams working across ai features for customer support.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for ai answer improver."
    ],
    "usageList": [
      "Use ai answer improver to streamline everyday tasks inside your ai features for customer support workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose AI Answer Improver, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "AI Answer Improver works inside the broader Verly product flow for ai features for customer support.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "AI Answer Improver helps your team create a clearer and more repeatable process inside ai features for customer support.",
        "imageAlt": "AI Answer Improver — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use ai answer improver to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "AI Answer Improver — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "AI Answer Improver helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "AI Answer Improver — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how AI Answer Improver should be used",
        "items": [
          "Review where ai answer improver fits in your ai features for customer support process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect AI Answer Improver to your workflow",
        "items": [
          "Enable ai answer improver in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how ai answer improver is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use AI Answer Improver to make the ai features for customer support workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles ai answer improver across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around ai answer improver.",
      "Growing businesses that need ai features for customer support to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is AI Answer Improver?",
        "answer": "AI Answer Improver is a Verly capability built for ai features for customer support. It helps teams automate support with AI Chatbot and Answer Assistant with more consistency and less manual friction."
      },
      {
        "question": "How does AI Answer Improver work?",
        "answer": "AI Answer Improver works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use AI Answer Improver?",
        "answer": "Teams should use ai answer improver when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "AI Answer Improver — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "AI Chatbot",
    "slug": "ai-chatbot",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with AI Chatbot.",
    "iconName": "bot",
    "categoryName": "AI Features for Customer Support",
    "categorySlug": "ai-features-for-customer-support",
    "categorySummary": "Automate support with AI Chatbot and Answer Assistant.",
    "theme": "purple",
    "subtitle": "Bring more consistency, speed, and confidence to your team with AI Chatbot.",
    "tags": [
      "AI Features for Customer Support",
      "Customer support",
      "Verly"
    ],
    "overview": "AI Chatbot is part of Verly's ai features for customer support toolkit. It helps teams automate support with AI Chatbot and Answer Assistant so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "AI Chatbot helps modern support teams automate support with AI Chatbot and Answer Assistant. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, ai chatbot fits naturally into the broader ai features for customer support experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "AI Chatbot is designed to support teams working across ai features for customer support.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for ai chatbot."
    ],
    "usageList": [
      "Use ai chatbot to streamline everyday tasks inside your ai features for customer support workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose AI Chatbot, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "AI Chatbot works inside the broader Verly product flow for ai features for customer support.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "AI Chatbot helps your team create a clearer and more repeatable process inside ai features for customer support.",
        "imageAlt": "AI Chatbot — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use ai chatbot to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "AI Chatbot — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "AI Chatbot helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "AI Chatbot — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how AI Chatbot should be used",
        "items": [
          "Review where ai chatbot fits in your ai features for customer support process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect AI Chatbot to your workflow",
        "items": [
          "Enable ai chatbot in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how ai chatbot is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use AI Chatbot to make the ai features for customer support workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles ai chatbot across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around ai chatbot.",
      "Growing businesses that need ai features for customer support to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is AI Chatbot?",
        "answer": "AI Chatbot is a Verly capability built for ai features for customer support. It helps teams automate support with AI Chatbot and Answer Assistant with more consistency and less manual friction."
      },
      {
        "question": "How does AI Chatbot work?",
        "answer": "AI Chatbot works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use AI Chatbot?",
        "answer": "Teams should use ai chatbot when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "AI Chatbot — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "AI Answer Composer",
    "slug": "ai-answer-composer",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with AI Answer Composer.",
    "iconName": "pencil-line",
    "categoryName": "AI Features for Customer Support",
    "categorySlug": "ai-features-for-customer-support",
    "categorySummary": "Automate support with AI Chatbot and Answer Assistant.",
    "theme": "purple",
    "subtitle": "Bring more consistency, speed, and confidence to your team with AI Answer Composer.",
    "tags": [
      "AI Features for Customer Support",
      "Customer support",
      "Verly"
    ],
    "overview": "AI Answer Composer is part of Verly's ai features for customer support toolkit. It helps teams automate support with AI Chatbot and Answer Assistant so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "AI Answer Composer helps modern support teams automate support with AI Chatbot and Answer Assistant. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, ai answer composer fits naturally into the broader ai features for customer support experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "AI Answer Composer is designed to support teams working across ai features for customer support.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for ai answer composer."
    ],
    "usageList": [
      "Use ai answer composer to streamline everyday tasks inside your ai features for customer support workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose AI Answer Composer, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "AI Answer Composer works inside the broader Verly product flow for ai features for customer support.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "AI Answer Composer helps your team create a clearer and more repeatable process inside ai features for customer support.",
        "imageAlt": "AI Answer Composer — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use ai answer composer to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "AI Answer Composer — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "AI Answer Composer helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "AI Answer Composer — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how AI Answer Composer should be used",
        "items": [
          "Review where ai answer composer fits in your ai features for customer support process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect AI Answer Composer to your workflow",
        "items": [
          "Enable ai answer composer in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how ai answer composer is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use AI Answer Composer to make the ai features for customer support workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles ai answer composer across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around ai answer composer.",
      "Growing businesses that need ai features for customer support to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is AI Answer Composer?",
        "answer": "AI Answer Composer is a Verly capability built for ai features for customer support. It helps teams automate support with AI Chatbot and Answer Assistant with more consistency and less manual friction."
      },
      {
        "question": "How does AI Answer Composer work?",
        "answer": "AI Answer Composer works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use AI Answer Composer?",
        "answer": "Teams should use ai answer composer when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---  # Ticketing system features  **Summary:** Ticketing system features that bring together the essential building blocks of a modern support workflow.  **Features in this category:** 46"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "AI Answer Composer — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Agent Collision Detection",
    "slug": "agent-collision-detection",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Agent Collision Detection.",
    "iconName": "shield-alert",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Agent Collision Detection.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Agent Collision Detection is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Agent Collision Detection helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, agent collision detection fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Agent Collision Detection is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for agent collision detection."
    ],
    "usageList": [
      "Use agent collision detection to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Agent Collision Detection, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Agent Collision Detection works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Agent Collision Detection helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Agent Collision Detection — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use agent collision detection to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Agent Collision Detection — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Agent Collision Detection helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Agent Collision Detection — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Agent Collision Detection should be used",
        "items": [
          "Review where agent collision detection fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Agent Collision Detection to your workflow",
        "items": [
          "Enable agent collision detection in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how agent collision detection is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Agent Collision Detection to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles agent collision detection across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around agent collision detection.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Agent Collision Detection?",
        "answer": "Agent Collision Detection is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Agent Collision Detection work?",
        "answer": "Agent Collision Detection works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Agent Collision Detection?",
        "answer": "Teams should use agent collision detection when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Agent Collision Detection — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Agents",
    "slug": "agents",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Agents.",
    "iconName": "users",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Agents.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Agents is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Agents helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, agents fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Agents is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for agents."
    ],
    "usageList": [
      "Use agents to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Agents, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Agents works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Agents helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Agents — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use agents to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Agents — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Agents helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Agents — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Agents should be used",
        "items": [
          "Review where agents fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Agents to your workflow",
        "items": [
          "Enable agents in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how agents is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Agents to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles agents across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around agents.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Agents?",
        "answer": "Agents is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Agents work?",
        "answer": "Agents works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Agents?",
        "answer": "Teams should use agents when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Agents — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Audit Log",
    "slug": "audit-log",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Audit Log.",
    "iconName": "clipboard-list",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Audit Log.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Audit Log is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Audit Log helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, audit log fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Audit Log is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for audit log."
    ],
    "usageList": [
      "Use audit log to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Audit Log, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Audit Log works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Audit Log helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Audit Log — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use audit log to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Audit Log — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Audit Log helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Audit Log — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Audit Log should be used",
        "items": [
          "Review where audit log fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Audit Log to your workflow",
        "items": [
          "Enable audit log in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how audit log is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Audit Log to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles audit log across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around audit log.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Audit Log?",
        "answer": "Audit Log is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Audit Log work?",
        "answer": "Audit Log works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Audit Log?",
        "answer": "Teams should use audit log when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Audit Log — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Automated Ticket Distribution",
    "slug": "automated-ticket-distribution",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Automated Ticket Distribution.",
    "iconName": "git-branch",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Automated Ticket Distribution.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Automated Ticket Distribution is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Automated Ticket Distribution helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, automated ticket distribution fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Automated Ticket Distribution is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for automated ticket distribution."
    ],
    "usageList": [
      "Use automated ticket distribution to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Automated Ticket Distribution, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Automated Ticket Distribution works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Automated Ticket Distribution helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Automated Ticket Distribution — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use automated ticket distribution to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Automated Ticket Distribution — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Automated Ticket Distribution helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Automated Ticket Distribution — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Automated Ticket Distribution should be used",
        "items": [
          "Review where automated ticket distribution fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Automated Ticket Distribution to your workflow",
        "items": [
          "Enable automated ticket distribution in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how automated ticket distribution is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Automated Ticket Distribution to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles automated ticket distribution across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around automated ticket distribution.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Automated Ticket Distribution?",
        "answer": "Automated Ticket Distribution is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Automated Ticket Distribution work?",
        "answer": "Automated Ticket Distribution works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Automated Ticket Distribution?",
        "answer": "Teams should use automated ticket distribution when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Automated Ticket Distribution — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Rules",
    "slug": "rules",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Rules.",
    "iconName": "sliders",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Rules.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Rules is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Rules helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, rules fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Rules is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for rules."
    ],
    "usageList": [
      "Use rules to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Rules, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Rules works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Rules helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Rules — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use rules to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Rules — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Rules helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Rules — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Rules should be used",
        "items": [
          "Review where rules fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Rules to your workflow",
        "items": [
          "Enable rules in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how rules is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Rules to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles rules across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around rules.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Rules?",
        "answer": "Rules is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Rules work?",
        "answer": "Rules works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Rules?",
        "answer": "Teams should use rules when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Rules — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Business hours",
    "slug": "business-hours",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Business hours.",
    "iconName": "clock",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Business hours.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Business hours is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Business hours helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, business hours fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Business hours is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for business hours."
    ],
    "usageList": [
      "Use business hours to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Business hours, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Business hours works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Business hours helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Business hours — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use business hours to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Business hours — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Business hours helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Business hours — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Business hours should be used",
        "items": [
          "Review where business hours fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Business hours to your workflow",
        "items": [
          "Enable business hours in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how business hours is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Business hours to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles business hours across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around business hours.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Business hours?",
        "answer": "Business hours is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Business hours work?",
        "answer": "Business hours works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Business hours?",
        "answer": "Teams should use business hours when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Business hours — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Canned Messages (Macros)",
    "slug": "canned-messages-macros",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Canned Messages (Macros).",
    "iconName": "message-square-text",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Canned Messages (Macros).",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Canned Messages (Macros) is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Canned Messages (Macros) helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, canned messages (macros) fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Canned Messages (Macros) is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for canned messages (macros)."
    ],
    "usageList": [
      "Use canned messages (macros) to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Canned Messages (Macros), review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Canned Messages (Macros) works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Canned Messages (Macros) helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Canned Messages (Macros) — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use canned messages (macros) to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Canned Messages (Macros) — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Canned Messages (Macros) helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Canned Messages (Macros) — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Canned Messages (Macros) should be used",
        "items": [
          "Review where canned messages (macros) fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Canned Messages (Macros) to your workflow",
        "items": [
          "Enable canned messages (macros) in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how canned messages (macros) is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Canned Messages (Macros) to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles canned messages (macros) across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around canned messages (macros).",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Canned Messages (Macros)?",
        "answer": "Canned Messages (Macros) is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Canned Messages (Macros) work?",
        "answer": "Canned Messages (Macros) works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Canned Messages (Macros)?",
        "answer": "Teams should use canned messages (macros) when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Canned Messages (Macros) — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Contact Fields",
    "slug": "contact-fields",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Contact Fields.",
    "iconName": "form-input",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Contact Fields.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Contact Fields is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Contact Fields helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, contact fields fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Contact Fields is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for contact fields."
    ],
    "usageList": [
      "Use contact fields to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Contact Fields, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Contact Fields works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Contact Fields helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Contact Fields — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use contact fields to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Contact Fields — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Contact Fields helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Contact Fields — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Contact Fields should be used",
        "items": [
          "Review where contact fields fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Contact Fields to your workflow",
        "items": [
          "Enable contact fields in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how contact fields is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Contact Fields to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles contact fields across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around contact fields.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Contact Fields?",
        "answer": "Contact Fields is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Contact Fields work?",
        "answer": "Contact Fields works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Contact Fields?",
        "answer": "Teams should use contact fields when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Contact Fields — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Contact Form Gallery",
    "slug": "contact-form-gallery",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Contact Form Gallery.",
    "iconName": "layout-grid",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Contact Form Gallery.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Contact Form Gallery is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Contact Form Gallery helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, contact form gallery fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Contact Form Gallery is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for contact form gallery."
    ],
    "usageList": [
      "Use contact form gallery to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Contact Form Gallery, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Contact Form Gallery works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Contact Form Gallery helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Contact Form Gallery — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use contact form gallery to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Contact Form Gallery — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Contact Form Gallery helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Contact Form Gallery — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Contact Form Gallery should be used",
        "items": [
          "Review where contact form gallery fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Contact Form Gallery to your workflow",
        "items": [
          "Enable contact form gallery in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how contact form gallery is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Contact Form Gallery to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles contact form gallery across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around contact form gallery.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Contact Form Gallery?",
        "answer": "Contact Form Gallery is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Contact Form Gallery work?",
        "answer": "Contact Form Gallery works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Contact Form Gallery?",
        "answer": "Teams should use contact form gallery when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Contact Form Gallery — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Contact Forms",
    "slug": "contact-forms",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Contact Forms.",
    "iconName": "file-text",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Contact Forms.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Contact Forms is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Contact Forms helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, contact forms fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Contact Forms is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for contact forms."
    ],
    "usageList": [
      "Use contact forms to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Contact Forms, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Contact Forms works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Contact Forms helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Contact Forms — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use contact forms to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Contact Forms — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Contact Forms helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Contact Forms — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Contact Forms should be used",
        "items": [
          "Review where contact forms fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Contact Forms to your workflow",
        "items": [
          "Enable contact forms in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how contact forms is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Contact Forms to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles contact forms across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around contact forms.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Contact Forms?",
        "answer": "Contact Forms is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Contact Forms work?",
        "answer": "Contact Forms works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Contact Forms?",
        "answer": "Teams should use contact forms when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Contact Forms — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Contacts",
    "slug": "contacts",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Contacts.",
    "iconName": "contact",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Contacts.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Contacts is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Contacts helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, contacts fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Contacts is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for contacts."
    ],
    "usageList": [
      "Use contacts to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Contacts, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Contacts works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Contacts helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Contacts — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use contacts to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Contacts — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Contacts helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Contacts — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Contacts should be used",
        "items": [
          "Review where contacts fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Contacts to your workflow",
        "items": [
          "Enable contacts in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how contacts is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Contacts to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles contacts across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around contacts.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Contacts?",
        "answer": "Contacts is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Contacts work?",
        "answer": "Contacts works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Contacts?",
        "answer": "Teams should use contacts when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Contacts — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Custom roles",
    "slug": "custom-roles",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Custom roles.",
    "iconName": "user-cog",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Custom roles.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Custom roles is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Custom roles helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, custom roles fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Custom roles is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for custom roles."
    ],
    "usageList": [
      "Use custom roles to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Custom roles, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Custom roles works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Custom roles helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Custom roles — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use custom roles to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Custom roles — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Custom roles helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Custom roles — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Custom roles should be used",
        "items": [
          "Review where custom roles fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Custom roles to your workflow",
        "items": [
          "Enable custom roles in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how custom roles is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Custom roles to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles custom roles across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around custom roles.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Custom roles?",
        "answer": "Custom roles is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Custom roles work?",
        "answer": "Custom roles works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Custom roles?",
        "answer": "Teams should use custom roles when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Custom roles — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Departments",
    "slug": "departments",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Departments.",
    "iconName": "building-2",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Departments.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Departments is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Departments helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, departments fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Departments is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for departments."
    ],
    "usageList": [
      "Use departments to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Departments, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Departments works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Departments helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Departments — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use departments to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Departments — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Departments helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Departments — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Departments should be used",
        "items": [
          "Review where departments fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Departments to your workflow",
        "items": [
          "Enable departments in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how departments is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Departments to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles departments across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around departments.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Departments?",
        "answer": "Departments is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Departments work?",
        "answer": "Departments works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Departments?",
        "answer": "Teams should use departments when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Departments — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Email forwarding",
    "slug": "email-forwarding",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Email forwarding.",
    "iconName": "forward",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Email forwarding.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Email forwarding is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Email forwarding helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, email forwarding fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Email forwarding is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for email forwarding."
    ],
    "usageList": [
      "Use email forwarding to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Email forwarding, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Email forwarding works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Email forwarding helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Email forwarding — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use email forwarding to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Email forwarding — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Email forwarding helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Email forwarding — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Email forwarding should be used",
        "items": [
          "Review where email forwarding fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Email forwarding to your workflow",
        "items": [
          "Enable email forwarding in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how email forwarding is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Email forwarding to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles email forwarding across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around email forwarding.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Email forwarding?",
        "answer": "Email forwarding is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Email forwarding work?",
        "answer": "Email forwarding works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Email forwarding?",
        "answer": "Teams should use email forwarding when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Email forwarding — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Email Notifications",
    "slug": "email-notifications",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Email Notifications.",
    "iconName": "bell",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Email Notifications.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Email Notifications is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Email Notifications helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, email notifications fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Email Notifications is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for email notifications."
    ],
    "usageList": [
      "Use email notifications to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Email Notifications, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Email Notifications works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Email Notifications helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Email Notifications — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use email notifications to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Email Notifications — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Email Notifications helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Email Notifications — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Email Notifications should be used",
        "items": [
          "Review where email notifications fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Email Notifications to your workflow",
        "items": [
          "Enable email notifications in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how email notifications is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Email Notifications to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles email notifications across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around email notifications.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Email Notifications?",
        "answer": "Email Notifications is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Email Notifications work?",
        "answer": "Email Notifications works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Email Notifications?",
        "answer": "Teams should use email notifications when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Email Notifications — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Email templates",
    "slug": "email-templates",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Email templates.",
    "iconName": "mail",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Email templates.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Email templates is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Email templates helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, email templates fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Email templates is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for email templates."
    ],
    "usageList": [
      "Use email templates to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Email templates, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Email templates works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Email templates helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Email templates — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use email templates to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Email templates — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Email templates helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Email templates — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Email templates should be used",
        "items": [
          "Review where email templates fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Email templates to your workflow",
        "items": [
          "Enable email templates in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how email templates is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Email templates to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles email templates across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around email templates.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Email templates?",
        "answer": "Email templates is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Email templates work?",
        "answer": "Email templates works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Email templates?",
        "answer": "Teams should use email templates when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Email templates — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Hybrid ticket stream",
    "slug": "hybrid-ticket-stream",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Hybrid ticket stream.",
    "iconName": "layers",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Hybrid ticket stream.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Hybrid ticket stream is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Hybrid ticket stream helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, hybrid ticket stream fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Hybrid ticket stream is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for hybrid ticket stream."
    ],
    "usageList": [
      "Use hybrid ticket stream to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Hybrid ticket stream, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Hybrid ticket stream works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Hybrid ticket stream helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Hybrid ticket stream — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use hybrid ticket stream to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Hybrid ticket stream — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Hybrid ticket stream helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Hybrid ticket stream — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Hybrid ticket stream should be used",
        "items": [
          "Review where hybrid ticket stream fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Hybrid ticket stream to your workflow",
        "items": [
          "Enable hybrid ticket stream in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how hybrid ticket stream is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Hybrid ticket stream to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles hybrid ticket stream across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around hybrid ticket stream.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Hybrid ticket stream?",
        "answer": "Hybrid ticket stream is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Hybrid ticket stream work?",
        "answer": "Hybrid ticket stream works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Hybrid ticket stream?",
        "answer": "Teams should use hybrid ticket stream when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Hybrid ticket stream — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Mass actions",
    "slug": "mass-actions",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Mass actions.",
    "iconName": "list-checks",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Mass actions.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Mass actions is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Mass actions helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, mass actions fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Mass actions is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for mass actions."
    ],
    "usageList": [
      "Use mass actions to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Mass actions, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Mass actions works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Mass actions helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Mass actions — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use mass actions to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Mass actions — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Mass actions helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Mass actions — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Mass actions should be used",
        "items": [
          "Review where mass actions fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Mass actions to your workflow",
        "items": [
          "Enable mass actions in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how mass actions is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Mass actions to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles mass actions across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around mass actions.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Mass actions?",
        "answer": "Mass actions is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Mass actions work?",
        "answer": "Mass actions works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Mass actions?",
        "answer": "Teams should use mass actions when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Mass actions — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Merge Tickets",
    "slug": "merge-tickets",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Merge Tickets.",
    "iconName": "merge",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Merge Tickets.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Merge Tickets is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Merge Tickets helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, merge tickets fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Merge Tickets is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for merge tickets."
    ],
    "usageList": [
      "Use merge tickets to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Merge Tickets, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Merge Tickets works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Merge Tickets helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Merge Tickets — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use merge tickets to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Merge Tickets — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Merge Tickets helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Merge Tickets — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Merge Tickets should be used",
        "items": [
          "Review where merge tickets fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Merge Tickets to your workflow",
        "items": [
          "Enable merge tickets in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how merge tickets is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Merge Tickets to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles merge tickets across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around merge tickets.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Merge Tickets?",
        "answer": "Merge Tickets is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Merge Tickets work?",
        "answer": "Merge Tickets works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Merge Tickets?",
        "answer": "Teams should use merge tickets when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Merge Tickets — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Multiple ticket tabs",
    "slug": "multiple-ticket-tabs",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Multiple ticket tabs.",
    "iconName": "panel-top",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Multiple ticket tabs.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Multiple ticket tabs is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Multiple ticket tabs helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, multiple ticket tabs fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Multiple ticket tabs is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for multiple ticket tabs."
    ],
    "usageList": [
      "Use multiple ticket tabs to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Multiple ticket tabs, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Multiple ticket tabs works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Multiple ticket tabs helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Multiple ticket tabs — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use multiple ticket tabs to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Multiple ticket tabs — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Multiple ticket tabs helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Multiple ticket tabs — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Multiple ticket tabs should be used",
        "items": [
          "Review where multiple ticket tabs fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Multiple ticket tabs to your workflow",
        "items": [
          "Enable multiple ticket tabs in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how multiple ticket tabs is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Multiple ticket tabs to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles multiple ticket tabs across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around multiple ticket tabs.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Multiple ticket tabs?",
        "answer": "Multiple ticket tabs is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Multiple ticket tabs work?",
        "answer": "Multiple ticket tabs works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Multiple ticket tabs?",
        "answer": "Teams should use multiple ticket tabs when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Multiple ticket tabs — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Notes",
    "slug": "notes",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Notes.",
    "iconName": "sticky-note",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Notes.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Notes is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Notes helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, notes fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Notes is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for notes."
    ],
    "usageList": [
      "Use notes to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Notes, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Notes works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Notes helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Notes — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use notes to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Notes — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Notes helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Notes — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Notes should be used",
        "items": [
          "Review where notes fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Notes to your workflow",
        "items": [
          "Enable notes in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how notes is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Notes to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles notes across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around notes.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Notes?",
        "answer": "Notes is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Notes work?",
        "answer": "Notes works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Notes?",
        "answer": "Teams should use notes when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Notes — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Online ticket history (URL)",
    "slug": "online-ticket-history-url",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Online ticket history (URL).",
    "iconName": "history",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Online ticket history (URL).",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Online ticket history (URL) is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Online ticket history (URL) helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, online ticket history (url) fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Online ticket history (URL) is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for online ticket history (url)."
    ],
    "usageList": [
      "Use online ticket history (url) to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Online ticket history (URL), review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Online ticket history (URL) works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Online ticket history (URL) helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Online ticket history (URL) — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use online ticket history (url) to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Online ticket history (URL) — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Online ticket history (URL) helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Online ticket history (URL) — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Online ticket history (URL) should be used",
        "items": [
          "Review where online ticket history (url) fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Online ticket history (URL) to your workflow",
        "items": [
          "Enable online ticket history (url) in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how online ticket history (url) is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Online ticket history (URL) to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles online ticket history (url) across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around online ticket history (url).",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Online ticket history (URL)?",
        "answer": "Online ticket history (URL) is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Online ticket history (URL) work?",
        "answer": "Online ticket history (URL) works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Online ticket history (URL)?",
        "answer": "Teams should use online ticket history (url) when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Online ticket history (URL) — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Pause",
    "slug": "pause",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Pause.",
    "iconName": "pause-circle",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Pause.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Pause is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Pause helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, pause fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Pause is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for pause."
    ],
    "usageList": [
      "Use pause to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Pause, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Pause works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Pause helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Pause — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use pause to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Pause — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Pause helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Pause — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Pause should be used",
        "items": [
          "Review where pause fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Pause to your workflow",
        "items": [
          "Enable pause in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how pause is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Pause to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles pause across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around pause.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Pause?",
        "answer": "Pause is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Pause work?",
        "answer": "Pause works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Pause?",
        "answer": "Teams should use pause when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Pause — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Predefined answers",
    "slug": "predefined-answers",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Predefined answers.",
    "iconName": "message-circle-check",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Predefined answers.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Predefined answers is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Predefined answers helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, predefined answers fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Predefined answers is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for predefined answers."
    ],
    "usageList": [
      "Use predefined answers to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Predefined answers, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Predefined answers works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Predefined answers helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Predefined answers — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use predefined answers to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Predefined answers — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Predefined answers helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Predefined answers — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Predefined answers should be used",
        "items": [
          "Review where predefined answers fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Predefined answers to your workflow",
        "items": [
          "Enable predefined answers in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how predefined answers is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Predefined answers to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles predefined answers across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around predefined answers.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Predefined answers?",
        "answer": "Predefined answers is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Predefined answers work?",
        "answer": "Predefined answers works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Predefined answers?",
        "answer": "Teams should use predefined answers when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Predefined answers — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Responsibility",
    "slug": "responsibility",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Responsibility.",
    "iconName": "user-check",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Responsibility.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Responsibility is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Responsibility helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, responsibility fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Responsibility is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for responsibility."
    ],
    "usageList": [
      "Use responsibility to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Responsibility, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Responsibility works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Responsibility helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Responsibility — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use responsibility to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Responsibility — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Responsibility helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Responsibility — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Responsibility should be used",
        "items": [
          "Review where responsibility fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Responsibility to your workflow",
        "items": [
          "Enable responsibility in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how responsibility is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Responsibility to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles responsibility across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around responsibility.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Responsibility?",
        "answer": "Responsibility is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Responsibility work?",
        "answer": "Responsibility works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Responsibility?",
        "answer": "Teams should use responsibility when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Responsibility — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Search & Replace",
    "slug": "search-and-replace",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Search & Replace.",
    "iconName": "search",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Search & Replace.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Search & Replace is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Search & Replace helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, search & replace fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Search & Replace is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for search & replace."
    ],
    "usageList": [
      "Use search & replace to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Search & Replace, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Search & Replace works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Search & Replace helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Search & Replace — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use search & replace to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Search & Replace — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Search & Replace helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Search & Replace — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Search & Replace should be used",
        "items": [
          "Review where search & replace fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Search & Replace to your workflow",
        "items": [
          "Enable search & replace in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how search & replace is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Search & Replace to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles search & replace across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around search & replace.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Search & Replace?",
        "answer": "Search & Replace is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Search & Replace work?",
        "answer": "Search & Replace works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Search & Replace?",
        "answer": "Teams should use search & replace when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Search & Replace — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Service Level Agreement (SLA)",
    "slug": "service-level-agreement-sla",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Service Level Agreement (SLA).",
    "iconName": "badge-check",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Service Level Agreement (SLA).",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Service Level Agreement (SLA) is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Service Level Agreement (SLA) helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, service level agreement (sla) fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Service Level Agreement (SLA) is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for service level agreement (sla)."
    ],
    "usageList": [
      "Use service level agreement (sla) to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Service Level Agreement (SLA), review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Service Level Agreement (SLA) works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Service Level Agreement (SLA) helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Service Level Agreement (SLA) — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use service level agreement (sla) to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Service Level Agreement (SLA) — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Service Level Agreement (SLA) helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Service Level Agreement (SLA) — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Service Level Agreement (SLA) should be used",
        "items": [
          "Review where service level agreement (sla) fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Service Level Agreement (SLA) to your workflow",
        "items": [
          "Enable service level agreement (sla) in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how service level agreement (sla) is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Service Level Agreement (SLA) to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles service level agreement (sla) across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around service level agreement (sla).",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Service Level Agreement (SLA)?",
        "answer": "Service Level Agreement (SLA) is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Service Level Agreement (SLA) work?",
        "answer": "Service Level Agreement (SLA) works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Service Level Agreement (SLA)?",
        "answer": "Teams should use service level agreement (sla) when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Service Level Agreement (SLA) — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Sounds",
    "slug": "sounds",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Sounds.",
    "iconName": "volume-2",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Sounds.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Sounds is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Sounds helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, sounds fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Sounds is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for sounds."
    ],
    "usageList": [
      "Use sounds to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Sounds, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Sounds works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Sounds helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Sounds — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use sounds to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Sounds — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Sounds helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Sounds — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Sounds should be used",
        "items": [
          "Review where sounds fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Sounds to your workflow",
        "items": [
          "Enable sounds in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how sounds is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Sounds to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles sounds across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around sounds.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Sounds?",
        "answer": "Sounds is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Sounds work?",
        "answer": "Sounds works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Sounds?",
        "answer": "Teams should use sounds when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Sounds — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "SPAM filters",
    "slug": "spam-filters",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with SPAM filters.",
    "iconName": "shield-x",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with SPAM filters.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "SPAM filters is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "SPAM filters helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, spam filters fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "SPAM filters is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for spam filters."
    ],
    "usageList": [
      "Use spam filters to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose SPAM filters, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "SPAM filters works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "SPAM filters helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "SPAM filters — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use spam filters to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "SPAM filters — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "SPAM filters helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "SPAM filters — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how SPAM filters should be used",
        "items": [
          "Review where spam filters fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect SPAM filters to your workflow",
        "items": [
          "Enable spam filters in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how spam filters is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use SPAM filters to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles spam filters across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around spam filters.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is SPAM filters?",
        "answer": "SPAM filters is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does SPAM filters work?",
        "answer": "SPAM filters works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use SPAM filters?",
        "answer": "Teams should use spam filters when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "SPAM filters — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Split Tickets",
    "slug": "split-tickets",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Split Tickets.",
    "iconName": "split",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Split Tickets.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Split Tickets is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Split Tickets helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, split tickets fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Split Tickets is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for split tickets."
    ],
    "usageList": [
      "Use split tickets to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Split Tickets, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Split Tickets works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Split Tickets helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Split Tickets — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use split tickets to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Split Tickets — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Split Tickets helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Split Tickets — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Split Tickets should be used",
        "items": [
          "Review where split tickets fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Split Tickets to your workflow",
        "items": [
          "Enable split tickets in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how split tickets is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Split Tickets to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles split tickets across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around split tickets.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Split Tickets?",
        "answer": "Split Tickets is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Split Tickets work?",
        "answer": "Split Tickets works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Split Tickets?",
        "answer": "Teams should use split tickets when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Split Tickets — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Tags",
    "slug": "tags",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Tags.",
    "iconName": "tag",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Tags.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Tags is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Tags helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, tags fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Tags is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for tags."
    ],
    "usageList": [
      "Use tags to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Tags, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Tags works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Tags helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Tags — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use tags to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Tags — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Tags helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Tags — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Tags should be used",
        "items": [
          "Review where tags fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Tags to your workflow",
        "items": [
          "Enable tags in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how tags is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Tags to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles tags across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around tags.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Tags?",
        "answer": "Tags is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Tags work?",
        "answer": "Tags works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Tags?",
        "answer": "Teams should use tags when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Tags — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Ticket Export",
    "slug": "ticket-export",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Ticket Export.",
    "iconName": "download",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Ticket Export.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Ticket Export is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Ticket Export helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, ticket export fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Ticket Export is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for ticket export."
    ],
    "usageList": [
      "Use ticket export to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Ticket Export, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Ticket Export works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Ticket Export helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Ticket Export — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use ticket export to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Ticket Export — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Ticket Export helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Ticket Export — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Ticket Export should be used",
        "items": [
          "Review where ticket export fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Ticket Export to your workflow",
        "items": [
          "Enable ticket export in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how ticket export is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Ticket Export to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles ticket export across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around ticket export.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Ticket Export?",
        "answer": "Ticket Export is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Ticket Export work?",
        "answer": "Ticket Export works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Ticket Export?",
        "answer": "Teams should use ticket export when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Ticket Export — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Ticket fields",
    "slug": "ticket-fields",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Ticket fields.",
    "iconName": "square-pen",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Ticket fields.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Ticket fields is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Ticket fields helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, ticket fields fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Ticket fields is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for ticket fields."
    ],
    "usageList": [
      "Use ticket fields to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Ticket fields, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Ticket fields works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Ticket fields helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Ticket fields — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use ticket fields to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Ticket fields — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Ticket fields helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Ticket fields — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Ticket fields should be used",
        "items": [
          "Review where ticket fields fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Ticket fields to your workflow",
        "items": [
          "Enable ticket fields in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how ticket fields is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Ticket fields to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles ticket fields across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around ticket fields.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Ticket fields?",
        "answer": "Ticket fields is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Ticket fields work?",
        "answer": "Ticket fields works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Ticket fields?",
        "answer": "Teams should use ticket fields when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Ticket fields — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Ticket/Customer insights (CRM)",
    "slug": "ticket-customer-insights-crm",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Ticket/Customer insights (CRM).",
    "iconName": "bar-chart-2",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Ticket/Customer insights (CRM).",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Ticket/Customer insights (CRM) is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Ticket/Customer insights (CRM) helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, ticket/customer insights (crm) fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Ticket/Customer insights (CRM) is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for ticket/customer insights (crm)."
    ],
    "usageList": [
      "Use ticket/customer insights (crm) to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Ticket/Customer insights (CRM), review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Ticket/Customer insights (CRM) works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Ticket/Customer insights (CRM) helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Ticket/Customer insights (CRM) — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use ticket/customer insights (crm) to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Ticket/Customer insights (CRM) — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Ticket/Customer insights (CRM) helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Ticket/Customer insights (CRM) — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Ticket/Customer insights (CRM) should be used",
        "items": [
          "Review where ticket/customer insights (crm) fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Ticket/Customer insights (CRM) to your workflow",
        "items": [
          "Enable ticket/customer insights (crm) in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how ticket/customer insights (crm) is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Ticket/Customer insights (CRM) to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles ticket/customer insights (crm) across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around ticket/customer insights (crm).",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Ticket/Customer insights (CRM)?",
        "answer": "Ticket/Customer insights (CRM) is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Ticket/Customer insights (CRM) work?",
        "answer": "Ticket/Customer insights (CRM) works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Ticket/Customer insights (CRM)?",
        "answer": "Teams should use ticket/customer insights (crm) when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Ticket/Customer insights (CRM) — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Filters",
    "slug": "filters",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Filters.",
    "iconName": "filter",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Filters.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Filters is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Filters helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, filters fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Filters is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for filters."
    ],
    "usageList": [
      "Use filters to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Filters, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Filters works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Filters helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Filters — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use filters to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Filters — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Filters helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Filters — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Filters should be used",
        "items": [
          "Review where filters fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Filters to your workflow",
        "items": [
          "Enable filters in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how filters is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Filters to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles filters across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around filters.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Filters?",
        "answer": "Filters is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Filters work?",
        "answer": "Filters works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Filters?",
        "answer": "Teams should use filters when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Filters — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Time rules",
    "slug": "time-rules",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Time rules.",
    "iconName": "timer",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Time rules.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Time rules is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Time rules helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, time rules fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Time rules is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for time rules."
    ],
    "usageList": [
      "Use time rules to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Time rules, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Time rules works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Time rules helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Time rules — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use time rules to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Time rules — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Time rules helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Time rules — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Time rules should be used",
        "items": [
          "Review where time rules fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Time rules to your workflow",
        "items": [
          "Enable time rules in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how time rules is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Time rules to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles time rules across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around time rules.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Time rules?",
        "answer": "Time rules is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Time rules work?",
        "answer": "Time rules works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Time rules?",
        "answer": "Teams should use time rules when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Time rules — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Time tracking",
    "slug": "time-tracking",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Time tracking.",
    "iconName": "hourglass",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Time tracking.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Time tracking is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Time tracking helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, time tracking fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Time tracking is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for time tracking."
    ],
    "usageList": [
      "Use time tracking to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Time tracking, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Time tracking works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Time tracking helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Time tracking — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use time tracking to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Time tracking — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Time tracking helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Time tracking — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Time tracking should be used",
        "items": [
          "Review where time tracking fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Time tracking to your workflow",
        "items": [
          "Enable time tracking in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how time tracking is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Time tracking to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles time tracking across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around time tracking.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Time tracking?",
        "answer": "Time tracking is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Time tracking work?",
        "answer": "Time tracking works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Time tracking?",
        "answer": "Teams should use time tracking when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Time tracking — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "To Solve Button",
    "slug": "to-solve-button",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with To Solve Button.",
    "iconName": "circle-check-big",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with To Solve Button.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "To Solve Button is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "To Solve Button helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, to solve button fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "To Solve Button is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for to solve button."
    ],
    "usageList": [
      "Use to solve button to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose To Solve Button, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "To Solve Button works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "To Solve Button helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "To Solve Button — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use to solve button to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "To Solve Button — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "To Solve Button helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "To Solve Button — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how To Solve Button should be used",
        "items": [
          "Review where to solve button fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect To Solve Button to your workflow",
        "items": [
          "Enable to solve button in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how to solve button is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use To Solve Button to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles to solve button across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around to solve button.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is To Solve Button?",
        "answer": "To Solve Button is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does To Solve Button work?",
        "answer": "To Solve Button works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use To Solve Button?",
        "answer": "Teams should use to solve button when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "To Solve Button — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Universal inbox",
    "slug": "universal-inbox",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Universal inbox.",
    "iconName": "inbox",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Universal inbox.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Universal inbox is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Universal inbox helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, universal inbox fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Universal inbox is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for universal inbox."
    ],
    "usageList": [
      "Use universal inbox to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Universal inbox, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Universal inbox works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Universal inbox helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Universal inbox — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use universal inbox to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Universal inbox — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Universal inbox helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Universal inbox — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Universal inbox should be used",
        "items": [
          "Review where universal inbox fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Universal inbox to your workflow",
        "items": [
          "Enable universal inbox in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how universal inbox is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Universal inbox to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles universal inbox across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around universal inbox.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Universal inbox?",
        "answer": "Universal inbox is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Universal inbox work?",
        "answer": "Universal inbox works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Universal inbox?",
        "answer": "Teams should use universal inbox when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Universal inbox — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "WYSIWYG editor",
    "slug": "wysiwyg-editor",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with WYSIWYG editor.",
    "iconName": "baseline",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with WYSIWYG editor.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "WYSIWYG editor is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "WYSIWYG editor helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, wysiwyg editor fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "WYSIWYG editor is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for wysiwyg editor."
    ],
    "usageList": [
      "Use wysiwyg editor to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose WYSIWYG editor, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "WYSIWYG editor works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "WYSIWYG editor helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "WYSIWYG editor — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use wysiwyg editor to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "WYSIWYG editor — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "WYSIWYG editor helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "WYSIWYG editor — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how WYSIWYG editor should be used",
        "items": [
          "Review where wysiwyg editor fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect WYSIWYG editor to your workflow",
        "items": [
          "Enable wysiwyg editor in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how wysiwyg editor is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use WYSIWYG editor to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles wysiwyg editor across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around wysiwyg editor.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is WYSIWYG editor?",
        "answer": "WYSIWYG editor is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does WYSIWYG editor work?",
        "answer": "WYSIWYG editor works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use WYSIWYG editor?",
        "answer": "Teams should use wysiwyg editor when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "WYSIWYG editor — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Companies",
    "slug": "companies",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Companies.",
    "iconName": "briefcase",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Companies.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Companies is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Companies helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, companies fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Companies is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for companies."
    ],
    "usageList": [
      "Use companies to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Companies, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Companies works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Companies helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Companies — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use companies to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Companies — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Companies helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Companies — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Companies should be used",
        "items": [
          "Review where companies fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Companies to your workflow",
        "items": [
          "Enable companies in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how companies is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Companies to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles companies across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around companies.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Companies?",
        "answer": "Companies is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Companies work?",
        "answer": "Companies works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Companies?",
        "answer": "Teams should use companies when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Companies — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Agent Ranking",
    "slug": "agent-ranking",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Agent Ranking.",
    "iconName": "trophy",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Agent Ranking.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Agent Ranking is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Agent Ranking helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, agent ranking fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Agent Ranking is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for agent ranking."
    ],
    "usageList": [
      "Use agent ranking to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Agent Ranking, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Agent Ranking works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Agent Ranking helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Agent Ranking — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use agent ranking to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Agent Ranking — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Agent Ranking helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Agent Ranking — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Agent Ranking should be used",
        "items": [
          "Review where agent ranking fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Agent Ranking to your workflow",
        "items": [
          "Enable agent ranking in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how agent ranking is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Agent Ranking to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles agent ranking across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around agent ranking.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Agent Ranking?",
        "answer": "Agent Ranking is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Agent Ranking work?",
        "answer": "Agent Ranking works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Agent Ranking?",
        "answer": "Teams should use agent ranking when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Agent Ranking — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Contact Groups",
    "slug": "contact-groups",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Contact Groups.",
    "iconName": "users-round",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Contact Groups.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Contact Groups is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Contact Groups helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, contact groups fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Contact Groups is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for contact groups."
    ],
    "usageList": [
      "Use contact groups to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Contact Groups, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Contact Groups works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Contact Groups helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Contact Groups — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use contact groups to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Contact Groups — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Contact Groups helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Contact Groups — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Contact Groups should be used",
        "items": [
          "Review where contact groups fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Contact Groups to your workflow",
        "items": [
          "Enable contact groups in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how contact groups is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Contact Groups to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles contact groups across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around contact groups.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Contact Groups?",
        "answer": "Contact Groups is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Contact Groups work?",
        "answer": "Contact Groups works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Contact Groups?",
        "answer": "Teams should use contact groups when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Contact Groups — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Attachments",
    "slug": "attachments",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Attachments.",
    "iconName": "paperclip",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Attachments.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Attachments is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Attachments helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, attachments fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Attachments is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for attachments."
    ],
    "usageList": [
      "Use attachments to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Attachments, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Attachments works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Attachments helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Attachments — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use attachments to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Attachments — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Attachments helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Attachments — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Attachments should be used",
        "items": [
          "Review where attachments fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Attachments to your workflow",
        "items": [
          "Enable attachments in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how attachments is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Attachments to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles attachments across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around attachments.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Attachments?",
        "answer": "Attachments is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Attachments work?",
        "answer": "Attachments works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Attachments?",
        "answer": "Teams should use attachments when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Attachments — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Copy & Paste Images",
    "slug": "copy-and-paste-images",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Copy & Paste Images.",
    "iconName": "copy",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Copy & Paste Images.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "Copy & Paste Images is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Copy & Paste Images helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, copy & paste images fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Copy & Paste Images is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for copy & paste images."
    ],
    "usageList": [
      "Use copy & paste images to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Copy & Paste Images, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Copy & Paste Images works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Copy & Paste Images helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "Copy & Paste Images — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use copy & paste images to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Copy & Paste Images — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Copy & Paste Images helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Copy & Paste Images — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Copy & Paste Images should be used",
        "items": [
          "Review where copy & paste images fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Copy & Paste Images to your workflow",
        "items": [
          "Enable copy & paste images in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how copy & paste images is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Copy & Paste Images to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles copy & paste images across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around copy & paste images.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Copy & Paste Images?",
        "answer": "Copy & Paste Images is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Copy & Paste Images work?",
        "answer": "Copy & Paste Images works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Copy & Paste Images?",
        "answer": "Teams should use copy & paste images when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Copy & Paste Images — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "GIFs in Tickets",
    "slug": "gifs-in-tickets",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with GIFs in Tickets.",
    "iconName": "image-play",
    "categoryName": "Ticketing system features",
    "categorySlug": "ticketing-system-features",
    "categorySummary": "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    "theme": "blue",
    "subtitle": "Bring more consistency, speed, and confidence to your team with GIFs in Tickets.",
    "tags": [
      "Ticketing system",
      "Customer support",
      "Verly"
    ],
    "overview": "GIFs in Tickets is part of Verly's ticketing system features toolkit. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "GIFs in Tickets helps modern support teams ticketing system features that bring together the essential building blocks of a modern support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, gifs in tickets fits naturally into the broader ticketing system features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "GIFs in Tickets is designed to support teams working across ticketing system features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for gifs in tickets."
    ],
    "usageList": [
      "Use gifs in tickets to streamline everyday tasks inside your ticketing system features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose GIFs in Tickets, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "GIFs in Tickets works inside the broader Verly product flow for ticketing system features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "GIFs in Tickets helps your team create a clearer and more repeatable process inside ticketing system features.",
        "imageAlt": "GIFs in Tickets — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use gifs in tickets to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "GIFs in Tickets — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "GIFs in Tickets helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "GIFs in Tickets — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how GIFs in Tickets should be used",
        "items": [
          "Review where gifs in tickets fits in your ticketing system features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect GIFs in Tickets to your workflow",
        "items": [
          "Enable gifs in tickets in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how gifs in tickets is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use GIFs in Tickets to make the ticketing system features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles gifs in tickets across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around gifs in tickets.",
      "Growing businesses that need ticketing system features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is GIFs in Tickets?",
        "answer": "GIFs in Tickets is a Verly capability built for ticketing system features. It helps teams ticketing system features that bring together the essential building blocks of a modern support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does GIFs in Tickets work?",
        "answer": "GIFs in Tickets works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use GIFs in Tickets?",
        "answer": "Teams should use gifs in tickets when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---  # Live Chat Features  **Summary:** Real-time communication, customizable chat widgets, and visitor tracking for modern support teams.  **Features in this category:** 16"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "GIFs in Tickets — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Chat Button Animations",
    "slug": "chat-button-animations",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Chat Button Animations.",
    "iconName": "sparkle",
    "categoryName": "Live Chat Features",
    "categorySlug": "live-chat-features",
    "categorySummary": "Real-time communication, customizable chat widgets, and visitor tracking for modern support teams.",
    "theme": "teal",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Chat Button Animations.",
    "tags": [
      "Live Chat",
      "Customer support",
      "Verly"
    ],
    "overview": "Chat Button Animations is part of Verly's live chat features toolkit. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Chat Button Animations helps modern support teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, chat button animations fits naturally into the broader live chat features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Chat Button Animations is designed to support teams working across live chat features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for chat button animations."
    ],
    "usageList": [
      "Use chat button animations to streamline everyday tasks inside your live chat features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Chat Button Animations, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Chat Button Animations works inside the broader Verly product flow for live chat features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Chat Button Animations helps your team create a clearer and more repeatable process inside live chat features.",
        "imageAlt": "Chat Button Animations — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use chat button animations to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Chat Button Animations — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Chat Button Animations helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Chat Button Animations — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Chat Button Animations should be used",
        "items": [
          "Review where chat button animations fits in your live chat features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Chat Button Animations to your workflow",
        "items": [
          "Enable chat button animations in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how chat button animations is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Chat Button Animations to make the live chat features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles chat button animations across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around chat button animations.",
      "Growing businesses that need live chat features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Chat Button Animations?",
        "answer": "Chat Button Animations is a Verly capability built for live chat features. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams with more consistency and less manual friction."
      },
      {
        "question": "How does Chat Button Animations work?",
        "answer": "Chat Button Animations works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Chat Button Animations?",
        "answer": "Teams should use chat button animations when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Chat Button Animations — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Chat Button",
    "slug": "chat-button",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Chat Button.",
    "iconName": "message-circle",
    "categoryName": "Live Chat Features",
    "categorySlug": "live-chat-features",
    "categorySummary": "Real-time communication, customizable chat widgets, and visitor tracking for modern support teams.",
    "theme": "teal",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Chat Button.",
    "tags": [
      "Live Chat",
      "Customer support",
      "Verly"
    ],
    "overview": "Chat Button is part of Verly's live chat features toolkit. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Chat Button helps modern support teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, chat button fits naturally into the broader live chat features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Chat Button is designed to support teams working across live chat features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for chat button."
    ],
    "usageList": [
      "Use chat button to streamline everyday tasks inside your live chat features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Chat Button, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Chat Button works inside the broader Verly product flow for live chat features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Chat Button helps your team create a clearer and more repeatable process inside live chat features.",
        "imageAlt": "Chat Button — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use chat button to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Chat Button — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Chat Button helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Chat Button — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Chat Button should be used",
        "items": [
          "Review where chat button fits in your live chat features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Chat Button to your workflow",
        "items": [
          "Enable chat button in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how chat button is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Chat Button to make the live chat features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles chat button across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around chat button.",
      "Growing businesses that need live chat features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Chat Button?",
        "answer": "Chat Button is a Verly capability built for live chat features. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams with more consistency and less manual friction."
      },
      {
        "question": "How does Chat Button work?",
        "answer": "Chat Button works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Chat Button?",
        "answer": "Teams should use chat button when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Chat Button — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Chat Button Gallery",
    "slug": "chat-button-gallery",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Chat Button Gallery.",
    "iconName": "gallery-thumbnails",
    "categoryName": "Live Chat Features",
    "categorySlug": "live-chat-features",
    "categorySummary": "Real-time communication, customizable chat widgets, and visitor tracking for modern support teams.",
    "theme": "teal",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Chat Button Gallery.",
    "tags": [
      "Live Chat",
      "Customer support",
      "Verly"
    ],
    "overview": "Chat Button Gallery is part of Verly's live chat features toolkit. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Chat Button Gallery helps modern support teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, chat button gallery fits naturally into the broader live chat features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Chat Button Gallery is designed to support teams working across live chat features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for chat button gallery."
    ],
    "usageList": [
      "Use chat button gallery to streamline everyday tasks inside your live chat features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Chat Button Gallery, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Chat Button Gallery works inside the broader Verly product flow for live chat features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Chat Button Gallery helps your team create a clearer and more repeatable process inside live chat features.",
        "imageAlt": "Chat Button Gallery — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use chat button gallery to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Chat Button Gallery — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Chat Button Gallery helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Chat Button Gallery — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Chat Button Gallery should be used",
        "items": [
          "Review where chat button gallery fits in your live chat features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Chat Button Gallery to your workflow",
        "items": [
          "Enable chat button gallery in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how chat button gallery is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Chat Button Gallery to make the live chat features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles chat button gallery across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around chat button gallery.",
      "Growing businesses that need live chat features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Chat Button Gallery?",
        "answer": "Chat Button Gallery is a Verly capability built for live chat features. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams with more consistency and less manual friction."
      },
      {
        "question": "How does Chat Button Gallery work?",
        "answer": "Chat Button Gallery works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Chat Button Gallery?",
        "answer": "Teams should use chat button gallery when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Chat Button Gallery — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Chat Distribution",
    "slug": "chat-distribution",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Chat Distribution.",
    "iconName": "share-2",
    "categoryName": "Live Chat Features",
    "categorySlug": "live-chat-features",
    "categorySummary": "Real-time communication, customizable chat widgets, and visitor tracking for modern support teams.",
    "theme": "teal",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Chat Distribution.",
    "tags": [
      "Live Chat",
      "Customer support",
      "Verly"
    ],
    "overview": "Chat Distribution is part of Verly's live chat features toolkit. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Chat Distribution helps modern support teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, chat distribution fits naturally into the broader live chat features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Chat Distribution is designed to support teams working across live chat features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for chat distribution."
    ],
    "usageList": [
      "Use chat distribution to streamline everyday tasks inside your live chat features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Chat Distribution, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Chat Distribution works inside the broader Verly product flow for live chat features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Chat Distribution helps your team create a clearer and more repeatable process inside live chat features.",
        "imageAlt": "Chat Distribution — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use chat distribution to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Chat Distribution — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Chat Distribution helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Chat Distribution — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Chat Distribution should be used",
        "items": [
          "Review where chat distribution fits in your live chat features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Chat Distribution to your workflow",
        "items": [
          "Enable chat distribution in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how chat distribution is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Chat Distribution to make the live chat features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles chat distribution across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around chat distribution.",
      "Growing businesses that need live chat features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Chat Distribution?",
        "answer": "Chat Distribution is a Verly capability built for live chat features. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams with more consistency and less manual friction."
      },
      {
        "question": "How does Chat Distribution work?",
        "answer": "Chat Distribution works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Chat Distribution?",
        "answer": "Teams should use chat distribution when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Chat Distribution — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Chat Embedded Tracking",
    "slug": "chat-embedded-tracking",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Chat Embedded Tracking.",
    "iconName": "map-pin",
    "categoryName": "Live Chat Features",
    "categorySlug": "live-chat-features",
    "categorySummary": "Real-time communication, customizable chat widgets, and visitor tracking for modern support teams.",
    "theme": "teal",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Chat Embedded Tracking.",
    "tags": [
      "Live Chat",
      "Customer support",
      "Verly"
    ],
    "overview": "Chat Embedded Tracking is part of Verly's live chat features toolkit. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Chat Embedded Tracking helps modern support teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, chat embedded tracking fits naturally into the broader live chat features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Chat Embedded Tracking is designed to support teams working across live chat features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for chat embedded tracking."
    ],
    "usageList": [
      "Use chat embedded tracking to streamline everyday tasks inside your live chat features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Chat Embedded Tracking, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Chat Embedded Tracking works inside the broader Verly product flow for live chat features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Chat Embedded Tracking helps your team create a clearer and more repeatable process inside live chat features.",
        "imageAlt": "Chat Embedded Tracking — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use chat embedded tracking to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Chat Embedded Tracking — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Chat Embedded Tracking helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Chat Embedded Tracking — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Chat Embedded Tracking should be used",
        "items": [
          "Review where chat embedded tracking fits in your live chat features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Chat Embedded Tracking to your workflow",
        "items": [
          "Enable chat embedded tracking in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how chat embedded tracking is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Chat Embedded Tracking to make the live chat features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles chat embedded tracking across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around chat embedded tracking.",
      "Growing businesses that need live chat features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Chat Embedded Tracking?",
        "answer": "Chat Embedded Tracking is a Verly capability built for live chat features. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams with more consistency and less manual friction."
      },
      {
        "question": "How does Chat Embedded Tracking work?",
        "answer": "Chat Embedded Tracking works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Chat Embedded Tracking?",
        "answer": "Teams should use chat embedded tracking when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Chat Embedded Tracking — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Chat History",
    "slug": "chat-history",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Chat History.",
    "iconName": "message-square-text",
    "categoryName": "Live Chat Features",
    "categorySlug": "live-chat-features",
    "categorySummary": "Real-time communication, customizable chat widgets, and visitor tracking for modern support teams.",
    "theme": "teal",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Chat History.",
    "tags": [
      "Live Chat",
      "Customer support",
      "Verly"
    ],
    "overview": "Chat History is part of Verly's live chat features toolkit. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Chat History helps modern support teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, chat history fits naturally into the broader live chat features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Chat History is designed to support teams working across live chat features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for chat history."
    ],
    "usageList": [
      "Use chat history to streamline everyday tasks inside your live chat features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Chat History, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Chat History works inside the broader Verly product flow for live chat features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Chat History helps your team create a clearer and more repeatable process inside live chat features.",
        "imageAlt": "Chat History — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use chat history to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Chat History — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Chat History helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Chat History — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Chat History should be used",
        "items": [
          "Review where chat history fits in your live chat features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Chat History to your workflow",
        "items": [
          "Enable chat history in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how chat history is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Chat History to make the live chat features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles chat history across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around chat history.",
      "Growing businesses that need live chat features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Chat History?",
        "answer": "Chat History is a Verly capability built for live chat features. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams with more consistency and less manual friction."
      },
      {
        "question": "How does Chat History work?",
        "answer": "Chat History works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Chat History?",
        "answer": "Teams should use chat history when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Chat History — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Chat Invitation Gallery",
    "slug": "chat-invitation-gallery",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Chat Invitation Gallery.",
    "iconName": "layout-template",
    "categoryName": "Live Chat Features",
    "categorySlug": "live-chat-features",
    "categorySummary": "Real-time communication, customizable chat widgets, and visitor tracking for modern support teams.",
    "theme": "teal",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Chat Invitation Gallery.",
    "tags": [
      "Live Chat",
      "Customer support",
      "Verly"
    ],
    "overview": "Chat Invitation Gallery is part of Verly's live chat features toolkit. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Chat Invitation Gallery helps modern support teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, chat invitation gallery fits naturally into the broader live chat features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Chat Invitation Gallery is designed to support teams working across live chat features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for chat invitation gallery."
    ],
    "usageList": [
      "Use chat invitation gallery to streamline everyday tasks inside your live chat features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Chat Invitation Gallery, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Chat Invitation Gallery works inside the broader Verly product flow for live chat features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Chat Invitation Gallery helps your team create a clearer and more repeatable process inside live chat features.",
        "imageAlt": "Chat Invitation Gallery — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use chat invitation gallery to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Chat Invitation Gallery — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Chat Invitation Gallery helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Chat Invitation Gallery — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Chat Invitation Gallery should be used",
        "items": [
          "Review where chat invitation gallery fits in your live chat features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Chat Invitation Gallery to your workflow",
        "items": [
          "Enable chat invitation gallery in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how chat invitation gallery is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Chat Invitation Gallery to make the live chat features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles chat invitation gallery across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around chat invitation gallery.",
      "Growing businesses that need live chat features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Chat Invitation Gallery?",
        "answer": "Chat Invitation Gallery is a Verly capability built for live chat features. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams with more consistency and less manual friction."
      },
      {
        "question": "How does Chat Invitation Gallery work?",
        "answer": "Chat Invitation Gallery works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Chat Invitation Gallery?",
        "answer": "Teams should use chat invitation gallery when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Chat Invitation Gallery — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Chat window docking",
    "slug": "chat-window-docking",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Chat window docking.",
    "iconName": "panel-right",
    "categoryName": "Live Chat Features",
    "categorySlug": "live-chat-features",
    "categorySummary": "Real-time communication, customizable chat widgets, and visitor tracking for modern support teams.",
    "theme": "teal",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Chat window docking.",
    "tags": [
      "Live Chat",
      "Customer support",
      "Verly"
    ],
    "overview": "Chat window docking is part of Verly's live chat features toolkit. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Chat window docking helps modern support teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, chat window docking fits naturally into the broader live chat features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Chat window docking is designed to support teams working across live chat features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for chat window docking."
    ],
    "usageList": [
      "Use chat window docking to streamline everyday tasks inside your live chat features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Chat window docking, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Chat window docking works inside the broader Verly product flow for live chat features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Chat window docking helps your team create a clearer and more repeatable process inside live chat features.",
        "imageAlt": "Chat window docking — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use chat window docking to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Chat window docking — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Chat window docking helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Chat window docking — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Chat window docking should be used",
        "items": [
          "Review where chat window docking fits in your live chat features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Chat window docking to your workflow",
        "items": [
          "Enable chat window docking in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how chat window docking is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Chat window docking to make the live chat features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles chat window docking across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around chat window docking.",
      "Growing businesses that need live chat features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Chat window docking?",
        "answer": "Chat window docking is a Verly capability built for live chat features. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams with more consistency and less manual friction."
      },
      {
        "question": "How does Chat window docking work?",
        "answer": "Chat window docking works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Chat window docking?",
        "answer": "Teams should use chat window docking when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Chat window docking — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Chats Overview",
    "slug": "chats-overview",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Chats Overview.",
    "iconName": "layout-dashboard",
    "categoryName": "Live Chat Features",
    "categorySlug": "live-chat-features",
    "categorySummary": "Real-time communication, customizable chat widgets, and visitor tracking for modern support teams.",
    "theme": "teal",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Chats Overview.",
    "tags": [
      "Live Chat",
      "Customer support",
      "Verly"
    ],
    "overview": "Chats Overview is part of Verly's live chat features toolkit. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Chats Overview helps modern support teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, chats overview fits naturally into the broader live chat features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Chats Overview is designed to support teams working across live chat features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for chats overview."
    ],
    "usageList": [
      "Use chats overview to streamline everyday tasks inside your live chat features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Chats Overview, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Chats Overview works inside the broader Verly product flow for live chat features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Chats Overview helps your team create a clearer and more repeatable process inside live chat features.",
        "imageAlt": "Chats Overview — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use chats overview to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Chats Overview — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Chats Overview helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Chats Overview — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Chats Overview should be used",
        "items": [
          "Review where chats overview fits in your live chat features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Chats Overview to your workflow",
        "items": [
          "Enable chats overview in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how chats overview is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Chats Overview to make the live chat features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles chats overview across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around chats overview.",
      "Growing businesses that need live chat features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Chats Overview?",
        "answer": "Chats Overview is a Verly capability built for live chat features. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams with more consistency and less manual friction."
      },
      {
        "question": "How does Chats Overview work?",
        "answer": "Chats Overview works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Chats Overview?",
        "answer": "Teams should use chats overview when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Chats Overview — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Internal Chat",
    "slug": "internal-chat",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Internal Chat.",
    "iconName": "lock",
    "categoryName": "Live Chat Features",
    "categorySlug": "live-chat-features",
    "categorySummary": "Real-time communication, customizable chat widgets, and visitor tracking for modern support teams.",
    "theme": "teal",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Internal Chat.",
    "tags": [
      "Live Chat",
      "Customer support",
      "Verly"
    ],
    "overview": "Internal Chat is part of Verly's live chat features toolkit. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Internal Chat helps modern support teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, internal chat fits naturally into the broader live chat features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Internal Chat is designed to support teams working across live chat features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for internal chat."
    ],
    "usageList": [
      "Use internal chat to streamline everyday tasks inside your live chat features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Internal Chat, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Internal Chat works inside the broader Verly product flow for live chat features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Internal Chat helps your team create a clearer and more repeatable process inside live chat features.",
        "imageAlt": "Internal Chat — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use internal chat to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Internal Chat — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Internal Chat helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Internal Chat — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Internal Chat should be used",
        "items": [
          "Review where internal chat fits in your live chat features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Internal Chat to your workflow",
        "items": [
          "Enable internal chat in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how internal chat is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Internal Chat to make the live chat features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles internal chat across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around internal chat.",
      "Growing businesses that need live chat features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Internal Chat?",
        "answer": "Internal Chat is a Verly capability built for live chat features. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams with more consistency and less manual friction."
      },
      {
        "question": "How does Internal Chat work?",
        "answer": "Internal Chat works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Internal Chat?",
        "answer": "Teams should use internal chat when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Internal Chat — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Max queue length",
    "slug": "max-queue-length",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Max queue length.",
    "iconName": "gauge",
    "categoryName": "Live Chat Features",
    "categorySlug": "live-chat-features",
    "categorySummary": "Real-time communication, customizable chat widgets, and visitor tracking for modern support teams.",
    "theme": "teal",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Max queue length.",
    "tags": [
      "Live Chat",
      "Customer support",
      "Verly"
    ],
    "overview": "Max queue length is part of Verly's live chat features toolkit. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Max queue length helps modern support teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, max queue length fits naturally into the broader live chat features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Max queue length is designed to support teams working across live chat features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for max queue length."
    ],
    "usageList": [
      "Use max queue length to streamline everyday tasks inside your live chat features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Max queue length, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Max queue length works inside the broader Verly product flow for live chat features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Max queue length helps your team create a clearer and more repeatable process inside live chat features.",
        "imageAlt": "Max queue length — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use max queue length to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Max queue length — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Max queue length helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Max queue length — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Max queue length should be used",
        "items": [
          "Review where max queue length fits in your live chat features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Max queue length to your workflow",
        "items": [
          "Enable max queue length in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how max queue length is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Max queue length to make the live chat features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles max queue length across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around max queue length.",
      "Growing businesses that need live chat features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Max queue length?",
        "answer": "Max queue length is a Verly capability built for live chat features. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams with more consistency and less manual friction."
      },
      {
        "question": "How does Max queue length work?",
        "answer": "Max queue length works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Max queue length?",
        "answer": "Teams should use max queue length when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Max queue length — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Online Visitors",
    "slug": "online-visitors",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Online Visitors.",
    "iconName": "eye",
    "categoryName": "Live Chat Features",
    "categorySlug": "live-chat-features",
    "categorySummary": "Real-time communication, customizable chat widgets, and visitor tracking for modern support teams.",
    "theme": "teal",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Online Visitors.",
    "tags": [
      "Live Chat",
      "Customer support",
      "Verly"
    ],
    "overview": "Online Visitors is part of Verly's live chat features toolkit. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Online Visitors helps modern support teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, online visitors fits naturally into the broader live chat features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Online Visitors is designed to support teams working across live chat features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for online visitors."
    ],
    "usageList": [
      "Use online visitors to streamline everyday tasks inside your live chat features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Online Visitors, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Online Visitors works inside the broader Verly product flow for live chat features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Online Visitors helps your team create a clearer and more repeatable process inside live chat features.",
        "imageAlt": "Online Visitors — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use online visitors to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Online Visitors — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Online Visitors helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Online Visitors — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Online Visitors should be used",
        "items": [
          "Review where online visitors fits in your live chat features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Online Visitors to your workflow",
        "items": [
          "Enable online visitors in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how online visitors is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Online Visitors to make the live chat features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles online visitors across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around online visitors.",
      "Growing businesses that need live chat features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Online Visitors?",
        "answer": "Online Visitors is a Verly capability built for live chat features. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams with more consistency and less manual friction."
      },
      {
        "question": "How does Online Visitors work?",
        "answer": "Online Visitors works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Online Visitors?",
        "answer": "Teams should use online visitors when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Online Visitors — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Proactive Chat Invitations",
    "slug": "proactive-chat-invitations",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Proactive Chat Invitations.",
    "iconName": "hand-metal",
    "categoryName": "Live Chat Features",
    "categorySlug": "live-chat-features",
    "categorySummary": "Real-time communication, customizable chat widgets, and visitor tracking for modern support teams.",
    "theme": "teal",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Proactive Chat Invitations.",
    "tags": [
      "Live Chat",
      "Customer support",
      "Verly"
    ],
    "overview": "Proactive Chat Invitations is part of Verly's live chat features toolkit. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Proactive Chat Invitations helps modern support teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, proactive chat invitations fits naturally into the broader live chat features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Proactive Chat Invitations is designed to support teams working across live chat features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for proactive chat invitations."
    ],
    "usageList": [
      "Use proactive chat invitations to streamline everyday tasks inside your live chat features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Proactive Chat Invitations, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Proactive Chat Invitations works inside the broader Verly product flow for live chat features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Proactive Chat Invitations helps your team create a clearer and more repeatable process inside live chat features.",
        "imageAlt": "Proactive Chat Invitations — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use proactive chat invitations to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Proactive Chat Invitations — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Proactive Chat Invitations helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Proactive Chat Invitations — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Proactive Chat Invitations should be used",
        "items": [
          "Review where proactive chat invitations fits in your live chat features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Proactive Chat Invitations to your workflow",
        "items": [
          "Enable proactive chat invitations in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how proactive chat invitations is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Proactive Chat Invitations to make the live chat features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles proactive chat invitations across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around proactive chat invitations.",
      "Growing businesses that need live chat features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Proactive Chat Invitations?",
        "answer": "Proactive Chat Invitations is a Verly capability built for live chat features. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams with more consistency and less manual friction."
      },
      {
        "question": "How does Proactive Chat Invitations work?",
        "answer": "Proactive Chat Invitations works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Proactive Chat Invitations?",
        "answer": "Teams should use proactive chat invitations when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Proactive Chat Invitations — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Real-time Chat",
    "slug": "real-time-chat",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Real-time Chat.",
    "iconName": "zap",
    "categoryName": "Live Chat Features",
    "categorySlug": "live-chat-features",
    "categorySummary": "Real-time communication, customizable chat widgets, and visitor tracking for modern support teams.",
    "theme": "teal",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Real-time Chat.",
    "tags": [
      "Live Chat",
      "Customer support",
      "Verly"
    ],
    "overview": "Real-time Chat is part of Verly's live chat features toolkit. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Real-time Chat helps modern support teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, real-time chat fits naturally into the broader live chat features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Real-time Chat is designed to support teams working across live chat features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for real-time chat."
    ],
    "usageList": [
      "Use real-time chat to streamline everyday tasks inside your live chat features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Real-time Chat, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Real-time Chat works inside the broader Verly product flow for live chat features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Real-time Chat helps your team create a clearer and more repeatable process inside live chat features.",
        "imageAlt": "Real-time Chat — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use real-time chat to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Real-time Chat — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Real-time Chat helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Real-time Chat — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Real-time Chat should be used",
        "items": [
          "Review where real-time chat fits in your live chat features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Real-time Chat to your workflow",
        "items": [
          "Enable real-time chat in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how real-time chat is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Real-time Chat to make the live chat features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles real-time chat across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around real-time chat.",
      "Growing businesses that need live chat features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Real-time Chat?",
        "answer": "Real-time Chat is a Verly capability built for live chat features. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams with more consistency and less manual friction."
      },
      {
        "question": "How does Real-time Chat work?",
        "answer": "Real-time Chat works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Real-time Chat?",
        "answer": "Teams should use real-time chat when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Real-time Chat — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Real-time typing view",
    "slug": "real-time-typing-view",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Real-time typing view.",
    "iconName": "keyboard",
    "categoryName": "Live Chat Features",
    "categorySlug": "live-chat-features",
    "categorySummary": "Real-time communication, customizable chat widgets, and visitor tracking for modern support teams.",
    "theme": "teal",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Real-time typing view.",
    "tags": [
      "Live Chat",
      "Customer support",
      "Verly"
    ],
    "overview": "Real-time typing view is part of Verly's live chat features toolkit. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Real-time typing view helps modern support teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, real-time typing view fits naturally into the broader live chat features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Real-time typing view is designed to support teams working across live chat features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for real-time typing view."
    ],
    "usageList": [
      "Use real-time typing view to streamline everyday tasks inside your live chat features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Real-time typing view, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Real-time typing view works inside the broader Verly product flow for live chat features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Real-time typing view helps your team create a clearer and more repeatable process inside live chat features.",
        "imageAlt": "Real-time typing view — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use real-time typing view to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Real-time typing view — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Real-time typing view helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Real-time typing view — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Real-time typing view should be used",
        "items": [
          "Review where real-time typing view fits in your live chat features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Real-time typing view to your workflow",
        "items": [
          "Enable real-time typing view in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how real-time typing view is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Real-time typing view to make the live chat features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles real-time typing view across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around real-time typing view.",
      "Growing businesses that need live chat features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Real-time typing view?",
        "answer": "Real-time typing view is a Verly capability built for live chat features. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams with more consistency and less manual friction."
      },
      {
        "question": "How does Real-time typing view work?",
        "answer": "Real-time typing view works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Real-time typing view?",
        "answer": "Teams should use real-time typing view when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Real-time typing view — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Website Visitor Tracking",
    "slug": "website-visitor-tracking",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Website Visitor Tracking.",
    "iconName": "radar",
    "categoryName": "Live Chat Features",
    "categorySlug": "live-chat-features",
    "categorySummary": "Real-time communication, customizable chat widgets, and visitor tracking for modern support teams.",
    "theme": "teal",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Website Visitor Tracking.",
    "tags": [
      "Live Chat",
      "Customer support",
      "Verly"
    ],
    "overview": "Website Visitor Tracking is part of Verly's live chat features toolkit. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Website Visitor Tracking helps modern support teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, website visitor tracking fits naturally into the broader live chat features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Website Visitor Tracking is designed to support teams working across live chat features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for website visitor tracking."
    ],
    "usageList": [
      "Use website visitor tracking to streamline everyday tasks inside your live chat features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Website Visitor Tracking, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Website Visitor Tracking works inside the broader Verly product flow for live chat features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Website Visitor Tracking helps your team create a clearer and more repeatable process inside live chat features.",
        "imageAlt": "Website Visitor Tracking — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use website visitor tracking to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Website Visitor Tracking — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Website Visitor Tracking helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Website Visitor Tracking — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Website Visitor Tracking should be used",
        "items": [
          "Review where website visitor tracking fits in your live chat features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Website Visitor Tracking to your workflow",
        "items": [
          "Enable website visitor tracking in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how website visitor tracking is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Website Visitor Tracking to make the live chat features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles website visitor tracking across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around website visitor tracking.",
      "Growing businesses that need live chat features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Website Visitor Tracking?",
        "answer": "Website Visitor Tracking is a Verly capability built for live chat features. It helps teams real-time communication, customizable chat widgets, and visitor tracking for modern support teams with more consistency and less manual friction."
      },
      {
        "question": "How does Website Visitor Tracking work?",
        "answer": "Website Visitor Tracking works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Website Visitor Tracking?",
        "answer": "Teams should use website visitor tracking when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---  # Call center features  **Summary:** Call center operations with routing, recordings, IVR, and device support for voice-first support.  **Features in this category:** 12"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Website Visitor Tracking — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Automatic Callback",
    "slug": "automatic-callback",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Automatic Callback.",
    "iconName": "phone-missed",
    "categoryName": "Call center features",
    "categorySlug": "call-center-features",
    "categorySummary": "Call center operations with routing, recordings, IVR, and device support for voice-first support.",
    "theme": "orange",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Automatic Callback.",
    "tags": [
      "Call center",
      "Customer support",
      "Verly"
    ],
    "overview": "Automatic Callback is part of Verly's call center features toolkit. It helps teams call center operations with routing, recordings, IVR, and device support for voice-first support so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Automatic Callback helps modern support teams call center operations with routing, recordings, IVR, and device support for voice-first support. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, automatic callback fits naturally into the broader call center features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Automatic Callback is designed to support teams working across call center features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for automatic callback."
    ],
    "usageList": [
      "Use automatic callback to streamline everyday tasks inside your call center features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Automatic Callback, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Automatic Callback works inside the broader Verly product flow for call center features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Automatic Callback helps your team create a clearer and more repeatable process inside call center features.",
        "imageAlt": "Automatic Callback — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use automatic callback to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Automatic Callback — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Automatic Callback helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Automatic Callback — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Automatic Callback should be used",
        "items": [
          "Review where automatic callback fits in your call center features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Automatic Callback to your workflow",
        "items": [
          "Enable automatic callback in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how automatic callback is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Automatic Callback to make the call center features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles automatic callback across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around automatic callback.",
      "Growing businesses that need call center features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Automatic Callback?",
        "answer": "Automatic Callback is a Verly capability built for call center features. It helps teams call center operations with routing, recordings, IVR, and device support for voice-first support with more consistency and less manual friction."
      },
      {
        "question": "How does Automatic Callback work?",
        "answer": "Automatic Callback works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Automatic Callback?",
        "answer": "Teams should use automatic callback when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Automatic Callback — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Call Button",
    "slug": "call-button",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Call Button.",
    "iconName": "phone",
    "categoryName": "Call center features",
    "categorySlug": "call-center-features",
    "categorySummary": "Call center operations with routing, recordings, IVR, and device support for voice-first support.",
    "theme": "orange",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Call Button.",
    "tags": [
      "Call center",
      "Customer support",
      "Verly"
    ],
    "overview": "Call Button is part of Verly's call center features toolkit. It helps teams call center operations with routing, recordings, IVR, and device support for voice-first support so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Call Button helps modern support teams call center operations with routing, recordings, IVR, and device support for voice-first support. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, call button fits naturally into the broader call center features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Call Button is designed to support teams working across call center features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for call button."
    ],
    "usageList": [
      "Use call button to streamline everyday tasks inside your call center features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Call Button, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Call Button works inside the broader Verly product flow for call center features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Call Button helps your team create a clearer and more repeatable process inside call center features.",
        "imageAlt": "Call Button — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use call button to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Call Button — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Call Button helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Call Button — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Call Button should be used",
        "items": [
          "Review where call button fits in your call center features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Call Button to your workflow",
        "items": [
          "Enable call button in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how call button is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Call Button to make the call center features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles call button across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around call button.",
      "Growing businesses that need call center features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Call Button?",
        "answer": "Call Button is a Verly capability built for call center features. It helps teams call center operations with routing, recordings, IVR, and device support for voice-first support with more consistency and less manual friction."
      },
      {
        "question": "How does Call Button work?",
        "answer": "Call Button works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Call Button?",
        "answer": "Teams should use call button when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Call Button — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Call Detail Records",
    "slug": "call-detail-records",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Call Detail Records.",
    "iconName": "file-clock",
    "categoryName": "Call center features",
    "categorySlug": "call-center-features",
    "categorySummary": "Call center operations with routing, recordings, IVR, and device support for voice-first support.",
    "theme": "orange",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Call Detail Records.",
    "tags": [
      "Call center",
      "Customer support",
      "Verly"
    ],
    "overview": "Call Detail Records is part of Verly's call center features toolkit. It helps teams call center operations with routing, recordings, IVR, and device support for voice-first support so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Call Detail Records helps modern support teams call center operations with routing, recordings, IVR, and device support for voice-first support. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, call detail records fits naturally into the broader call center features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Call Detail Records is designed to support teams working across call center features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for call detail records."
    ],
    "usageList": [
      "Use call detail records to streamline everyday tasks inside your call center features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Call Detail Records, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Call Detail Records works inside the broader Verly product flow for call center features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Call Detail Records helps your team create a clearer and more repeatable process inside call center features.",
        "imageAlt": "Call Detail Records — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use call detail records to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Call Detail Records — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Call Detail Records helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Call Detail Records — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Call Detail Records should be used",
        "items": [
          "Review where call detail records fits in your call center features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Call Detail Records to your workflow",
        "items": [
          "Enable call detail records in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how call detail records is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Call Detail Records to make the call center features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles call detail records across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around call detail records.",
      "Growing businesses that need call center features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Call Detail Records?",
        "answer": "Call Detail Records is a Verly capability built for call center features. It helps teams call center operations with routing, recordings, IVR, and device support for voice-first support with more consistency and less manual friction."
      },
      {
        "question": "How does Call Detail Records work?",
        "answer": "Call Detail Records works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Call Detail Records?",
        "answer": "Teams should use call detail records when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Call Detail Records — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Call device scheduling",
    "slug": "call-device-scheduling",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Call device scheduling.",
    "iconName": "calendar-clock",
    "categoryName": "Call center features",
    "categorySlug": "call-center-features",
    "categorySummary": "Call center operations with routing, recordings, IVR, and device support for voice-first support.",
    "theme": "orange",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Call device scheduling.",
    "tags": [
      "Call center",
      "Customer support",
      "Verly"
    ],
    "overview": "Call device scheduling is part of Verly's call center features toolkit. It helps teams call center operations with routing, recordings, IVR, and device support for voice-first support so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Call device scheduling helps modern support teams call center operations with routing, recordings, IVR, and device support for voice-first support. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, call device scheduling fits naturally into the broader call center features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Call device scheduling is designed to support teams working across call center features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for call device scheduling."
    ],
    "usageList": [
      "Use call device scheduling to streamline everyday tasks inside your call center features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Call device scheduling, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Call device scheduling works inside the broader Verly product flow for call center features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Call device scheduling helps your team create a clearer and more repeatable process inside call center features.",
        "imageAlt": "Call device scheduling — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use call device scheduling to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Call device scheduling — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Call device scheduling helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Call device scheduling — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Call device scheduling should be used",
        "items": [
          "Review where call device scheduling fits in your call center features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Call device scheduling to your workflow",
        "items": [
          "Enable call device scheduling in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how call device scheduling is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Call device scheduling to make the call center features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles call device scheduling across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around call device scheduling.",
      "Growing businesses that need call center features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Call device scheduling?",
        "answer": "Call device scheduling is a Verly capability built for call center features. It helps teams call center operations with routing, recordings, IVR, and device support for voice-first support with more consistency and less manual friction."
      },
      {
        "question": "How does Call device scheduling work?",
        "answer": "Call device scheduling works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Call device scheduling?",
        "answer": "Teams should use call device scheduling when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Call device scheduling — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Call routing",
    "slug": "call-routing",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Call routing.",
    "iconName": "route",
    "categoryName": "Call center features",
    "categorySlug": "call-center-features",
    "categorySummary": "Call center operations with routing, recordings, IVR, and device support for voice-first support.",
    "theme": "orange",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Call routing.",
    "tags": [
      "Call center",
      "Customer support",
      "Verly"
    ],
    "overview": "Call routing is part of Verly's call center features toolkit. It helps teams call center operations with routing, recordings, IVR, and device support for voice-first support so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Call routing helps modern support teams call center operations with routing, recordings, IVR, and device support for voice-first support. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, call routing fits naturally into the broader call center features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Call routing is designed to support teams working across call center features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for call routing."
    ],
    "usageList": [
      "Use call routing to streamline everyday tasks inside your call center features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Call routing, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Call routing works inside the broader Verly product flow for call center features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Call routing helps your team create a clearer and more repeatable process inside call center features.",
        "imageAlt": "Call routing — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use call routing to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Call routing — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Call routing helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Call routing — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Call routing should be used",
        "items": [
          "Review where call routing fits in your call center features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Call routing to your workflow",
        "items": [
          "Enable call routing in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how call routing is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Call routing to make the call center features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles call routing across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around call routing.",
      "Growing businesses that need call center features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Call routing?",
        "answer": "Call routing is a Verly capability built for call center features. It helps teams call center operations with routing, recordings, IVR, and device support for voice-first support with more consistency and less manual friction."
      },
      {
        "question": "How does Call routing work?",
        "answer": "Call routing works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Call routing?",
        "answer": "Teams should use call routing when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Call routing — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Call transfers",
    "slug": "call-transfers",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Call transfers.",
    "iconName": "phone-forwarded",
    "categoryName": "Call center features",
    "categorySlug": "call-center-features",
    "categorySummary": "Call center operations with routing, recordings, IVR, and device support for voice-first support.",
    "theme": "orange",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Call transfers.",
    "tags": [
      "Call center",
      "Customer support",
      "Verly"
    ],
    "overview": "Call transfers is part of Verly's call center features toolkit. It helps teams call center operations with routing, recordings, IVR, and device support for voice-first support so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Call transfers helps modern support teams call center operations with routing, recordings, IVR, and device support for voice-first support. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, call transfers fits naturally into the broader call center features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Call transfers is designed to support teams working across call center features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for call transfers."
    ],
    "usageList": [
      "Use call transfers to streamline everyday tasks inside your call center features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Call transfers, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Call transfers works inside the broader Verly product flow for call center features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Call transfers helps your team create a clearer and more repeatable process inside call center features.",
        "imageAlt": "Call transfers — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use call transfers to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Call transfers — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Call transfers helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Call transfers — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Call transfers should be used",
        "items": [
          "Review where call transfers fits in your call center features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Call transfers to your workflow",
        "items": [
          "Enable call transfers in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how call transfers is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Call transfers to make the call center features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles call transfers across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around call transfers.",
      "Growing businesses that need call center features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Call transfers?",
        "answer": "Call transfers is a Verly capability built for call center features. It helps teams call center operations with routing, recordings, IVR, and device support for voice-first support with more consistency and less manual friction."
      },
      {
        "question": "How does Call transfers work?",
        "answer": "Call transfers works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Call transfers?",
        "answer": "Teams should use call transfers when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Call transfers — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Internal calls",
    "slug": "internal-calls",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Internal calls.",
    "iconName": "phone-incoming",
    "categoryName": "Call center features",
    "categorySlug": "call-center-features",
    "categorySummary": "Call center operations with routing, recordings, IVR, and device support for voice-first support.",
    "theme": "orange",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Internal calls.",
    "tags": [
      "Call center",
      "Customer support",
      "Verly"
    ],
    "overview": "Internal calls is part of Verly's call center features toolkit. It helps teams call center operations with routing, recordings, IVR, and device support for voice-first support so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Internal calls helps modern support teams call center operations with routing, recordings, IVR, and device support for voice-first support. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, internal calls fits naturally into the broader call center features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Internal calls is designed to support teams working across call center features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for internal calls."
    ],
    "usageList": [
      "Use internal calls to streamline everyday tasks inside your call center features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Internal calls, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Internal calls works inside the broader Verly product flow for call center features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Internal calls helps your team create a clearer and more repeatable process inside call center features.",
        "imageAlt": "Internal calls — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use internal calls to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Internal calls — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Internal calls helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Internal calls — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Internal calls should be used",
        "items": [
          "Review where internal calls fits in your call center features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Internal calls to your workflow",
        "items": [
          "Enable internal calls in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how internal calls is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Internal calls to make the call center features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles internal calls across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around internal calls.",
      "Growing businesses that need call center features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Internal calls?",
        "answer": "Internal calls is a Verly capability built for call center features. It helps teams call center operations with routing, recordings, IVR, and device support for voice-first support with more consistency and less manual friction."
      },
      {
        "question": "How does Internal calls work?",
        "answer": "Internal calls works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Internal calls?",
        "answer": "Teams should use internal calls when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Internal calls — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "IVR (Interactive Voice Response)",
    "slug": "ivr-interactive-voice-response",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with IVR (Interactive Voice Response).",
    "iconName": "network",
    "categoryName": "Call center features",
    "categorySlug": "call-center-features",
    "categorySummary": "Call center operations with routing, recordings, IVR, and device support for voice-first support.",
    "theme": "orange",
    "subtitle": "Bring more consistency, speed, and confidence to your team with IVR (Interactive Voice Response).",
    "tags": [
      "Call center",
      "Customer support",
      "Verly"
    ],
    "overview": "IVR (Interactive Voice Response) is part of Verly's call center features toolkit. It helps teams call center operations with routing, recordings, IVR, and device support for voice-first support so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "IVR (Interactive Voice Response) helps modern support teams call center operations with routing, recordings, IVR, and device support for voice-first support. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, ivr (interactive voice response) fits naturally into the broader call center features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "IVR (Interactive Voice Response) is designed to support teams working across call center features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for ivr (interactive voice response)."
    ],
    "usageList": [
      "Use ivr (interactive voice response) to streamline everyday tasks inside your call center features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose IVR (Interactive Voice Response), review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "IVR (Interactive Voice Response) works inside the broader Verly product flow for call center features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "IVR (Interactive Voice Response) helps your team create a clearer and more repeatable process inside call center features.",
        "imageAlt": "IVR (Interactive Voice Response) — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use ivr (interactive voice response) to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "IVR (Interactive Voice Response) — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "IVR (Interactive Voice Response) helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "IVR (Interactive Voice Response) — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how IVR (Interactive Voice Response) should be used",
        "items": [
          "Review where ivr (interactive voice response) fits in your call center features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect IVR (Interactive Voice Response) to your workflow",
        "items": [
          "Enable ivr (interactive voice response) in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how ivr (interactive voice response) is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use IVR (Interactive Voice Response) to make the call center features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles ivr (interactive voice response) across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around ivr (interactive voice response).",
      "Growing businesses that need call center features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is IVR (Interactive Voice Response)?",
        "answer": "IVR (Interactive Voice Response) is a Verly capability built for call center features. It helps teams call center operations with routing, recordings, IVR, and device support for voice-first support with more consistency and less manual friction."
      },
      {
        "question": "How does IVR (Interactive Voice Response) work?",
        "answer": "IVR (Interactive Voice Response) works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use IVR (Interactive Voice Response)?",
        "answer": "Teams should use ivr (interactive voice response) when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "IVR (Interactive Voice Response) — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Softphones",
    "slug": "softphones",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Softphones.",
    "iconName": "headphones",
    "categoryName": "Call center features",
    "categorySlug": "call-center-features",
    "categorySummary": "Call center operations with routing, recordings, IVR, and device support for voice-first support.",
    "theme": "orange",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Softphones.",
    "tags": [
      "Call center",
      "Customer support",
      "Verly"
    ],
    "overview": "Softphones is part of Verly's call center features toolkit. It helps teams call center operations with routing, recordings, IVR, and device support for voice-first support so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Softphones helps modern support teams call center operations with routing, recordings, IVR, and device support for voice-first support. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, softphones fits naturally into the broader call center features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Softphones is designed to support teams working across call center features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for softphones."
    ],
    "usageList": [
      "Use softphones to streamline everyday tasks inside your call center features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Softphones, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Softphones works inside the broader Verly product flow for call center features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Softphones helps your team create a clearer and more repeatable process inside call center features.",
        "imageAlt": "Softphones — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use softphones to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Softphones — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Softphones helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Softphones — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Softphones should be used",
        "items": [
          "Review where softphones fits in your call center features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Softphones to your workflow",
        "items": [
          "Enable softphones in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how softphones is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Softphones to make the call center features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles softphones across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around softphones.",
      "Growing businesses that need call center features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Softphones?",
        "answer": "Softphones is a Verly capability built for call center features. It helps teams call center operations with routing, recordings, IVR, and device support for voice-first support with more consistency and less manual friction."
      },
      {
        "question": "How does Softphones work?",
        "answer": "Softphones works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Softphones?",
        "answer": "Teams should use softphones when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Softphones — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Supported call devices",
    "slug": "supported-call-devices",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Supported call devices.",
    "iconName": "monitor-smartphone",
    "categoryName": "Call center features",
    "categorySlug": "call-center-features",
    "categorySummary": "Call center operations with routing, recordings, IVR, and device support for voice-first support.",
    "theme": "orange",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Supported call devices.",
    "tags": [
      "Call center",
      "Customer support",
      "Verly"
    ],
    "overview": "Supported call devices is part of Verly's call center features toolkit. It helps teams call center operations with routing, recordings, IVR, and device support for voice-first support so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Supported call devices helps modern support teams call center operations with routing, recordings, IVR, and device support for voice-first support. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, supported call devices fits naturally into the broader call center features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Supported call devices is designed to support teams working across call center features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for supported call devices."
    ],
    "usageList": [
      "Use supported call devices to streamline everyday tasks inside your call center features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Supported call devices, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Supported call devices works inside the broader Verly product flow for call center features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Supported call devices helps your team create a clearer and more repeatable process inside call center features.",
        "imageAlt": "Supported call devices — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use supported call devices to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Supported call devices — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Supported call devices helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Supported call devices — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Supported call devices should be used",
        "items": [
          "Review where supported call devices fits in your call center features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Supported call devices to your workflow",
        "items": [
          "Enable supported call devices in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how supported call devices is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Supported call devices to make the call center features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles supported call devices across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around supported call devices.",
      "Growing businesses that need call center features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Supported call devices?",
        "answer": "Supported call devices is a Verly capability built for call center features. It helps teams call center operations with routing, recordings, IVR, and device support for voice-first support with more consistency and less manual friction."
      },
      {
        "question": "How does Supported call devices work?",
        "answer": "Supported call devices works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Supported call devices?",
        "answer": "Teams should use supported call devices when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Supported call devices — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Unlimited call recordings",
    "slug": "unlimited-call-recordings",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Unlimited call recordings.",
    "iconName": "mic",
    "categoryName": "Call center features",
    "categorySlug": "call-center-features",
    "categorySummary": "Call center operations with routing, recordings, IVR, and device support for voice-first support.",
    "theme": "orange",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Unlimited call recordings.",
    "tags": [
      "Call center",
      "Customer support",
      "Verly"
    ],
    "overview": "Unlimited call recordings is part of Verly's call center features toolkit. It helps teams call center operations with routing, recordings, IVR, and device support for voice-first support so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Unlimited call recordings helps modern support teams call center operations with routing, recordings, IVR, and device support for voice-first support. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, unlimited call recordings fits naturally into the broader call center features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Unlimited call recordings is designed to support teams working across call center features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for unlimited call recordings."
    ],
    "usageList": [
      "Use unlimited call recordings to streamline everyday tasks inside your call center features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Unlimited call recordings, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Unlimited call recordings works inside the broader Verly product flow for call center features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Unlimited call recordings helps your team create a clearer and more repeatable process inside call center features.",
        "imageAlt": "Unlimited call recordings — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use unlimited call recordings to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Unlimited call recordings — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Unlimited call recordings helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Unlimited call recordings — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Unlimited call recordings should be used",
        "items": [
          "Review where unlimited call recordings fits in your call center features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Unlimited call recordings to your workflow",
        "items": [
          "Enable unlimited call recordings in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how unlimited call recordings is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Unlimited call recordings to make the call center features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles unlimited call recordings across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around unlimited call recordings.",
      "Growing businesses that need call center features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Unlimited call recordings?",
        "answer": "Unlimited call recordings is a Verly capability built for call center features. It helps teams call center operations with routing, recordings, IVR, and device support for voice-first support with more consistency and less manual friction."
      },
      {
        "question": "How does Unlimited call recordings work?",
        "answer": "Unlimited call recordings works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Unlimited call recordings?",
        "answer": "Teams should use unlimited call recordings when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Unlimited call recordings — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Video call",
    "slug": "video-call",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Video call.",
    "iconName": "video",
    "categoryName": "Call center features",
    "categorySlug": "call-center-features",
    "categorySummary": "Call center operations with routing, recordings, IVR, and device support for voice-first support.",
    "theme": "orange",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Video call.",
    "tags": [
      "Call center",
      "Customer support",
      "Verly"
    ],
    "overview": "Video call is part of Verly's call center features toolkit. It helps teams call center operations with routing, recordings, IVR, and device support for voice-first support so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Video call helps modern support teams call center operations with routing, recordings, IVR, and device support for voice-first support. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, video call fits naturally into the broader call center features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Video call is designed to support teams working across call center features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for video call."
    ],
    "usageList": [
      "Use video call to streamline everyday tasks inside your call center features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Video call, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Video call works inside the broader Verly product flow for call center features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Video call helps your team create a clearer and more repeatable process inside call center features.",
        "imageAlt": "Video call — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use video call to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Video call — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Video call helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Video call — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Video call should be used",
        "items": [
          "Review where video call fits in your call center features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Video call to your workflow",
        "items": [
          "Enable video call in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how video call is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Video call to make the call center features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles video call across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around video call.",
      "Growing businesses that need call center features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Video call?",
        "answer": "Video call is a Verly capability built for call center features. It helps teams call center operations with routing, recordings, IVR, and device support for voice-first support with more consistency and less manual friction."
      },
      {
        "question": "How does Video call work?",
        "answer": "Video call works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Video call?",
        "answer": "Teams should use video call when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---  # Customer service reports features  **Summary:** Reporting tools for performance, SLA compliance, and channel insights across support operations.  **Features in this category:** 10"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Video call — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Agent availability",
    "slug": "agent-availability",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Agent availability.",
    "iconName": "circle-dot",
    "categoryName": "Customer service reports features",
    "categorySlug": "customer-service-reports-features",
    "categorySummary": "Reporting tools for performance, SLA compliance, and channel insights across support operations.",
    "theme": "green",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Agent availability.",
    "tags": [
      "Customer service reports",
      "Customer support",
      "Verly"
    ],
    "overview": "Agent availability is part of Verly's customer service reports features toolkit. It helps teams reporting tools for performance, SLA compliance, and channel insights across support operations so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Agent availability helps modern support teams reporting tools for performance, SLA compliance, and channel insights across support operations. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, agent availability fits naturally into the broader customer service reports features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Agent availability is designed to support teams working across customer service reports features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for agent availability."
    ],
    "usageList": [
      "Use agent availability to streamline everyday tasks inside your customer service reports features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Agent availability, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Agent availability works inside the broader Verly product flow for customer service reports features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Agent availability helps your team create a clearer and more repeatable process inside customer service reports features.",
        "imageAlt": "Agent availability — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use agent availability to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Agent availability — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Agent availability helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Agent availability — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Agent availability should be used",
        "items": [
          "Review where agent availability fits in your customer service reports features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Agent availability to your workflow",
        "items": [
          "Enable agent availability in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how agent availability is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Agent availability to make the customer service reports features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles agent availability across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around agent availability.",
      "Growing businesses that need customer service reports features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Agent availability?",
        "answer": "Agent availability is a Verly capability built for customer service reports features. It helps teams reporting tools for performance, SLA compliance, and channel insights across support operations with more consistency and less manual friction."
      },
      {
        "question": "How does Agent availability work?",
        "answer": "Agent availability works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Agent availability?",
        "answer": "Teams should use agent availability when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Agent availability — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Agent ranking overview",
    "slug": "agent-ranking-overview",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Agent ranking overview.",
    "iconName": "bar-chart",
    "categoryName": "Customer service reports features",
    "categorySlug": "customer-service-reports-features",
    "categorySummary": "Reporting tools for performance, SLA compliance, and channel insights across support operations.",
    "theme": "green",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Agent ranking overview.",
    "tags": [
      "Customer service reports",
      "Customer support",
      "Verly"
    ],
    "overview": "Agent ranking overview is part of Verly's customer service reports features toolkit. It helps teams reporting tools for performance, SLA compliance, and channel insights across support operations so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Agent ranking overview helps modern support teams reporting tools for performance, SLA compliance, and channel insights across support operations. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, agent ranking overview fits naturally into the broader customer service reports features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Agent ranking overview is designed to support teams working across customer service reports features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for agent ranking overview."
    ],
    "usageList": [
      "Use agent ranking overview to streamline everyday tasks inside your customer service reports features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Agent ranking overview, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Agent ranking overview works inside the broader Verly product flow for customer service reports features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Agent ranking overview helps your team create a clearer and more repeatable process inside customer service reports features.",
        "imageAlt": "Agent ranking overview — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use agent ranking overview to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Agent ranking overview — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Agent ranking overview helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Agent ranking overview — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Agent ranking overview should be used",
        "items": [
          "Review where agent ranking overview fits in your customer service reports features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Agent ranking overview to your workflow",
        "items": [
          "Enable agent ranking overview in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how agent ranking overview is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Agent ranking overview to make the customer service reports features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles agent ranking overview across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around agent ranking overview.",
      "Growing businesses that need customer service reports features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Agent ranking overview?",
        "answer": "Agent ranking overview is a Verly capability built for customer service reports features. It helps teams reporting tools for performance, SLA compliance, and channel insights across support operations with more consistency and less manual friction."
      },
      {
        "question": "How does Agent ranking overview work?",
        "answer": "Agent ranking overview works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Agent ranking overview?",
        "answer": "Teams should use agent ranking overview when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Agent ranking overview — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Agent Report",
    "slug": "agent-report",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Agent Report.",
    "iconName": "user-round-search",
    "categoryName": "Customer service reports features",
    "categorySlug": "customer-service-reports-features",
    "categorySummary": "Reporting tools for performance, SLA compliance, and channel insights across support operations.",
    "theme": "green",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Agent Report.",
    "tags": [
      "Customer service reports",
      "Customer support",
      "Verly"
    ],
    "overview": "Agent Report is part of Verly's customer service reports features toolkit. It helps teams reporting tools for performance, SLA compliance, and channel insights across support operations so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Agent Report helps modern support teams reporting tools for performance, SLA compliance, and channel insights across support operations. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, agent report fits naturally into the broader customer service reports features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Agent Report is designed to support teams working across customer service reports features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for agent report."
    ],
    "usageList": [
      "Use agent report to streamline everyday tasks inside your customer service reports features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Agent Report, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Agent Report works inside the broader Verly product flow for customer service reports features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Agent Report helps your team create a clearer and more repeatable process inside customer service reports features.",
        "imageAlt": "Agent Report — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use agent report to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Agent Report — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Agent Report helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Agent Report — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Agent Report should be used",
        "items": [
          "Review where agent report fits in your customer service reports features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Agent Report to your workflow",
        "items": [
          "Enable agent report in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how agent report is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Agent Report to make the customer service reports features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles agent report across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around agent report.",
      "Growing businesses that need customer service reports features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Agent Report?",
        "answer": "Agent Report is a Verly capability built for customer service reports features. It helps teams reporting tools for performance, SLA compliance, and channel insights across support operations with more consistency and less manual friction."
      },
      {
        "question": "How does Agent Report work?",
        "answer": "Agent Report works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Agent Report?",
        "answer": "Teams should use agent report when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Agent Report — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Channel report",
    "slug": "channel-report",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Channel report.",
    "iconName": "cable",
    "categoryName": "Customer service reports features",
    "categorySlug": "customer-service-reports-features",
    "categorySummary": "Reporting tools for performance, SLA compliance, and channel insights across support operations.",
    "theme": "green",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Channel report.",
    "tags": [
      "Customer service reports",
      "Customer support",
      "Verly"
    ],
    "overview": "Channel report is part of Verly's customer service reports features toolkit. It helps teams reporting tools for performance, SLA compliance, and channel insights across support operations so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Channel report helps modern support teams reporting tools for performance, SLA compliance, and channel insights across support operations. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, channel report fits naturally into the broader customer service reports features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Channel report is designed to support teams working across customer service reports features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for channel report."
    ],
    "usageList": [
      "Use channel report to streamline everyday tasks inside your customer service reports features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Channel report, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Channel report works inside the broader Verly product flow for customer service reports features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Channel report helps your team create a clearer and more repeatable process inside customer service reports features.",
        "imageAlt": "Channel report — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use channel report to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Channel report — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Channel report helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Channel report — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Channel report should be used",
        "items": [
          "Review where channel report fits in your customer service reports features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Channel report to your workflow",
        "items": [
          "Enable channel report in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how channel report is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Channel report to make the customer service reports features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles channel report across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around channel report.",
      "Growing businesses that need customer service reports features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Channel report?",
        "answer": "Channel report is a Verly capability built for customer service reports features. It helps teams reporting tools for performance, SLA compliance, and channel insights across support operations with more consistency and less manual friction."
      },
      {
        "question": "How does Channel report work?",
        "answer": "Channel report works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Channel report?",
        "answer": "Teams should use channel report when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Channel report — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Department Report",
    "slug": "department-report",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Department Report.",
    "iconName": "chart-column",
    "categoryName": "Customer service reports features",
    "categorySlug": "customer-service-reports-features",
    "categorySummary": "Reporting tools for performance, SLA compliance, and channel insights across support operations.",
    "theme": "green",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Department Report.",
    "tags": [
      "Customer service reports",
      "Customer support",
      "Verly"
    ],
    "overview": "Department Report is part of Verly's customer service reports features toolkit. It helps teams reporting tools for performance, SLA compliance, and channel insights across support operations so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Department Report helps modern support teams reporting tools for performance, SLA compliance, and channel insights across support operations. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, department report fits naturally into the broader customer service reports features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Department Report is designed to support teams working across customer service reports features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for department report."
    ],
    "usageList": [
      "Use department report to streamline everyday tasks inside your customer service reports features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Department Report, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Department Report works inside the broader Verly product flow for customer service reports features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Department Report helps your team create a clearer and more repeatable process inside customer service reports features.",
        "imageAlt": "Department Report — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use department report to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Department Report — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Department Report helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Department Report — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Department Report should be used",
        "items": [
          "Review where department report fits in your customer service reports features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Department Report to your workflow",
        "items": [
          "Enable department report in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how department report is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Department Report to make the customer service reports features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles department report across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around department report.",
      "Growing businesses that need customer service reports features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Department Report?",
        "answer": "Department Report is a Verly capability built for customer service reports features. It helps teams reporting tools for performance, SLA compliance, and channel insights across support operations with more consistency and less manual friction."
      },
      {
        "question": "How does Department Report work?",
        "answer": "Department Report works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Department Report?",
        "answer": "Teams should use department report when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Department Report — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Performance report",
    "slug": "performance-report",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Performance report.",
    "iconName": "trending-up",
    "categoryName": "Customer service reports features",
    "categorySlug": "customer-service-reports-features",
    "categorySummary": "Reporting tools for performance, SLA compliance, and channel insights across support operations.",
    "theme": "green",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Performance report.",
    "tags": [
      "Customer service reports",
      "Customer support",
      "Verly"
    ],
    "overview": "Performance report is part of Verly's customer service reports features toolkit. It helps teams reporting tools for performance, SLA compliance, and channel insights across support operations so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Performance report helps modern support teams reporting tools for performance, SLA compliance, and channel insights across support operations. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, performance report fits naturally into the broader customer service reports features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Performance report is designed to support teams working across customer service reports features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for performance report."
    ],
    "usageList": [
      "Use performance report to streamline everyday tasks inside your customer service reports features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Performance report, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Performance report works inside the broader Verly product flow for customer service reports features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Performance report helps your team create a clearer and more repeatable process inside customer service reports features.",
        "imageAlt": "Performance report — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use performance report to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Performance report — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Performance report helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Performance report — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Performance report should be used",
        "items": [
          "Review where performance report fits in your customer service reports features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Performance report to your workflow",
        "items": [
          "Enable performance report in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how performance report is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Performance report to make the customer service reports features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles performance report across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around performance report.",
      "Growing businesses that need customer service reports features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Performance report?",
        "answer": "Performance report is a Verly capability built for customer service reports features. It helps teams reporting tools for performance, SLA compliance, and channel insights across support operations with more consistency and less manual friction."
      },
      {
        "question": "How does Performance report work?",
        "answer": "Performance report works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Performance report?",
        "answer": "Teams should use performance report when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Performance report — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "SLA compliance report",
    "slug": "sla-compliance-report",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with SLA compliance report.",
    "iconName": "circle-check",
    "categoryName": "Customer service reports features",
    "categorySlug": "customer-service-reports-features",
    "categorySummary": "Reporting tools for performance, SLA compliance, and channel insights across support operations.",
    "theme": "green",
    "subtitle": "Bring more consistency, speed, and confidence to your team with SLA compliance report.",
    "tags": [
      "Customer service reports",
      "Customer support",
      "Verly"
    ],
    "overview": "SLA compliance report is part of Verly's customer service reports features toolkit. It helps teams reporting tools for performance, SLA compliance, and channel insights across support operations so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "SLA compliance report helps modern support teams reporting tools for performance, SLA compliance, and channel insights across support operations. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, sla compliance report fits naturally into the broader customer service reports features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "SLA compliance report is designed to support teams working across customer service reports features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for sla compliance report."
    ],
    "usageList": [
      "Use sla compliance report to streamline everyday tasks inside your customer service reports features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose SLA compliance report, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "SLA compliance report works inside the broader Verly product flow for customer service reports features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "SLA compliance report helps your team create a clearer and more repeatable process inside customer service reports features.",
        "imageAlt": "SLA compliance report — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use sla compliance report to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "SLA compliance report — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "SLA compliance report helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "SLA compliance report — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how SLA compliance report should be used",
        "items": [
          "Review where sla compliance report fits in your customer service reports features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect SLA compliance report to your workflow",
        "items": [
          "Enable sla compliance report in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how sla compliance report is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use SLA compliance report to make the customer service reports features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles sla compliance report across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around sla compliance report.",
      "Growing businesses that need customer service reports features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is SLA compliance report?",
        "answer": "SLA compliance report is a Verly capability built for customer service reports features. It helps teams reporting tools for performance, SLA compliance, and channel insights across support operations with more consistency and less manual friction."
      },
      {
        "question": "How does SLA compliance report work?",
        "answer": "SLA compliance report works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use SLA compliance report?",
        "answer": "Teams should use sla compliance report when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "SLA compliance report — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "SLA Log Report",
    "slug": "sla-log-report",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with SLA Log Report.",
    "iconName": "scroll-text",
    "categoryName": "Customer service reports features",
    "categorySlug": "customer-service-reports-features",
    "categorySummary": "Reporting tools for performance, SLA compliance, and channel insights across support operations.",
    "theme": "green",
    "subtitle": "Bring more consistency, speed, and confidence to your team with SLA Log Report.",
    "tags": [
      "Customer service reports",
      "Customer support",
      "Verly"
    ],
    "overview": "SLA Log Report is part of Verly's customer service reports features toolkit. It helps teams reporting tools for performance, SLA compliance, and channel insights across support operations so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "SLA Log Report helps modern support teams reporting tools for performance, SLA compliance, and channel insights across support operations. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, sla log report fits naturally into the broader customer service reports features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "SLA Log Report is designed to support teams working across customer service reports features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for sla log report."
    ],
    "usageList": [
      "Use sla log report to streamline everyday tasks inside your customer service reports features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose SLA Log Report, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "SLA Log Report works inside the broader Verly product flow for customer service reports features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "SLA Log Report helps your team create a clearer and more repeatable process inside customer service reports features.",
        "imageAlt": "SLA Log Report — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use sla log report to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "SLA Log Report — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "SLA Log Report helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "SLA Log Report — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how SLA Log Report should be used",
        "items": [
          "Review where sla log report fits in your customer service reports features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect SLA Log Report to your workflow",
        "items": [
          "Enable sla log report in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how sla log report is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use SLA Log Report to make the customer service reports features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles sla log report across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around sla log report.",
      "Growing businesses that need customer service reports features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is SLA Log Report?",
        "answer": "SLA Log Report is a Verly capability built for customer service reports features. It helps teams reporting tools for performance, SLA compliance, and channel insights across support operations with more consistency and less manual friction."
      },
      {
        "question": "How does SLA Log Report work?",
        "answer": "SLA Log Report works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use SLA Log Report?",
        "answer": "Teams should use sla log report when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "SLA Log Report — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Tag Reports",
    "slug": "tag-reports",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Tag Reports.",
    "iconName": "tags",
    "categoryName": "Customer service reports features",
    "categorySlug": "customer-service-reports-features",
    "categorySummary": "Reporting tools for performance, SLA compliance, and channel insights across support operations.",
    "theme": "green",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Tag Reports.",
    "tags": [
      "Customer service reports",
      "Customer support",
      "Verly"
    ],
    "overview": "Tag Reports is part of Verly's customer service reports features toolkit. It helps teams reporting tools for performance, SLA compliance, and channel insights across support operations so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Tag Reports helps modern support teams reporting tools for performance, SLA compliance, and channel insights across support operations. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, tag reports fits naturally into the broader customer service reports features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Tag Reports is designed to support teams working across customer service reports features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for tag reports."
    ],
    "usageList": [
      "Use tag reports to streamline everyday tasks inside your customer service reports features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Tag Reports, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Tag Reports works inside the broader Verly product flow for customer service reports features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Tag Reports helps your team create a clearer and more repeatable process inside customer service reports features.",
        "imageAlt": "Tag Reports — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use tag reports to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Tag Reports — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Tag Reports helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Tag Reports — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Tag Reports should be used",
        "items": [
          "Review where tag reports fits in your customer service reports features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Tag Reports to your workflow",
        "items": [
          "Enable tag reports in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how tag reports is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Tag Reports to make the customer service reports features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles tag reports across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around tag reports.",
      "Growing businesses that need customer service reports features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Tag Reports?",
        "answer": "Tag Reports is a Verly capability built for customer service reports features. It helps teams reporting tools for performance, SLA compliance, and channel insights across support operations with more consistency and less manual friction."
      },
      {
        "question": "How does Tag Reports work?",
        "answer": "Tag Reports works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Tag Reports?",
        "answer": "Teams should use tag reports when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Tag Reports — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Time Report",
    "slug": "time-report",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Time Report.",
    "iconName": "clock-4",
    "categoryName": "Customer service reports features",
    "categorySlug": "customer-service-reports-features",
    "categorySummary": "Reporting tools for performance, SLA compliance, and channel insights across support operations.",
    "theme": "green",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Time Report.",
    "tags": [
      "Customer service reports",
      "Customer support",
      "Verly"
    ],
    "overview": "Time Report is part of Verly's customer service reports features toolkit. It helps teams reporting tools for performance, SLA compliance, and channel insights across support operations so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Time Report helps modern support teams reporting tools for performance, SLA compliance, and channel insights across support operations. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, time report fits naturally into the broader customer service reports features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Time Report is designed to support teams working across customer service reports features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for time report."
    ],
    "usageList": [
      "Use time report to streamline everyday tasks inside your customer service reports features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Time Report, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Time Report works inside the broader Verly product flow for customer service reports features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Time Report helps your team create a clearer and more repeatable process inside customer service reports features.",
        "imageAlt": "Time Report — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use time report to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Time Report — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Time Report helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Time Report — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Time Report should be used",
        "items": [
          "Review where time report fits in your customer service reports features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Time Report to your workflow",
        "items": [
          "Enable time report in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how time report is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Time Report to make the customer service reports features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles time report across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around time report.",
      "Growing businesses that need customer service reports features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Time Report?",
        "answer": "Time Report is a Verly capability built for customer service reports features. It helps teams reporting tools for performance, SLA compliance, and channel insights across support operations with more consistency and less manual friction."
      },
      {
        "question": "How does Time Report work?",
        "answer": "Time Report works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Time Report?",
        "answer": "Teams should use time report when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---  # Gamification features  **Summary:** Boost agent engagement, productivity, and collaboration through rewards and performance visibility.  **Features in this category:** 3"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Time Report — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Benchmarks and leaderboards",
    "slug": "benchmarks-and-leaderboards",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Benchmarks and leaderboards.",
    "iconName": "medal",
    "categoryName": "Gamification features",
    "categorySlug": "gamification-features",
    "categorySummary": "Boost agent engagement, productivity, and collaboration through rewards and performance visibility.",
    "theme": "violet",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Benchmarks and leaderboards.",
    "tags": [
      "Gamification",
      "Customer support",
      "Verly"
    ],
    "overview": "Benchmarks and leaderboards is part of Verly's gamification features toolkit. It helps teams boost agent engagement, productivity, and collaboration through rewards and performance visibility so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Benchmarks and leaderboards helps modern support teams boost agent engagement, productivity, and collaboration through rewards and performance visibility. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, benchmarks and leaderboards fits naturally into the broader gamification features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Benchmarks and leaderboards is designed to support teams working across gamification features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for benchmarks and leaderboards."
    ],
    "usageList": [
      "Use benchmarks and leaderboards to streamline everyday tasks inside your gamification features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Benchmarks and leaderboards, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Benchmarks and leaderboards works inside the broader Verly product flow for gamification features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Benchmarks and leaderboards helps your team create a clearer and more repeatable process inside gamification features.",
        "imageAlt": "Benchmarks and leaderboards — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use benchmarks and leaderboards to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Benchmarks and leaderboards — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Benchmarks and leaderboards helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Benchmarks and leaderboards — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Benchmarks and leaderboards should be used",
        "items": [
          "Review where benchmarks and leaderboards fits in your gamification features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Benchmarks and leaderboards to your workflow",
        "items": [
          "Enable benchmarks and leaderboards in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how benchmarks and leaderboards is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Benchmarks and leaderboards to make the gamification features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles benchmarks and leaderboards across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around benchmarks and leaderboards.",
      "Growing businesses that need gamification features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Benchmarks and leaderboards?",
        "answer": "Benchmarks and leaderboards is a Verly capability built for gamification features. It helps teams boost agent engagement, productivity, and collaboration through rewards and performance visibility with more consistency and less manual friction."
      },
      {
        "question": "How does Benchmarks and leaderboards work?",
        "answer": "Benchmarks and leaderboards works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Benchmarks and leaderboards?",
        "answer": "Teams should use benchmarks and leaderboards when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Benchmarks and leaderboards — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Levels",
    "slug": "levels",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Levels.",
    "iconName": "signal",
    "categoryName": "Gamification features",
    "categorySlug": "gamification-features",
    "categorySummary": "Boost agent engagement, productivity, and collaboration through rewards and performance visibility.",
    "theme": "violet",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Levels.",
    "tags": [
      "Gamification",
      "Customer support",
      "Verly"
    ],
    "overview": "Levels is part of Verly's gamification features toolkit. It helps teams boost agent engagement, productivity, and collaboration through rewards and performance visibility so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Levels helps modern support teams boost agent engagement, productivity, and collaboration through rewards and performance visibility. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, levels fits naturally into the broader gamification features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Levels is designed to support teams working across gamification features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for levels."
    ],
    "usageList": [
      "Use levels to streamline everyday tasks inside your gamification features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Levels, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Levels works inside the broader Verly product flow for gamification features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Levels helps your team create a clearer and more repeatable process inside gamification features.",
        "imageAlt": "Levels — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use levels to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Levels — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Levels helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Levels — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Levels should be used",
        "items": [
          "Review where levels fits in your gamification features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Levels to your workflow",
        "items": [
          "Enable levels in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how levels is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Levels to make the gamification features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles levels across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around levels.",
      "Growing businesses that need gamification features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Levels?",
        "answer": "Levels is a Verly capability built for gamification features. It helps teams boost agent engagement, productivity, and collaboration through rewards and performance visibility with more consistency and less manual friction."
      },
      {
        "question": "How does Levels work?",
        "answer": "Levels works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Levels?",
        "answer": "Teams should use levels when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Levels — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Rewards & Badges",
    "slug": "rewards-and-badges",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Rewards & Badges.",
    "iconName": "award",
    "categoryName": "Gamification features",
    "categorySlug": "gamification-features",
    "categorySummary": "Boost agent engagement, productivity, and collaboration through rewards and performance visibility.",
    "theme": "violet",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Rewards & Badges.",
    "tags": [
      "Gamification",
      "Customer support",
      "Verly"
    ],
    "overview": "Rewards & Badges is part of Verly's gamification features toolkit. It helps teams boost agent engagement, productivity, and collaboration through rewards and performance visibility so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Rewards & Badges helps modern support teams boost agent engagement, productivity, and collaboration through rewards and performance visibility. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, rewards & badges fits naturally into the broader gamification features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Rewards & Badges is designed to support teams working across gamification features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for rewards & badges."
    ],
    "usageList": [
      "Use rewards & badges to streamline everyday tasks inside your gamification features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Rewards & Badges, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Rewards & Badges works inside the broader Verly product flow for gamification features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Rewards & Badges helps your team create a clearer and more repeatable process inside gamification features.",
        "imageAlt": "Rewards & Badges — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use rewards & badges to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Rewards & Badges — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Rewards & Badges helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Rewards & Badges — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Rewards & Badges should be used",
        "items": [
          "Review where rewards & badges fits in your gamification features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Rewards & Badges to your workflow",
        "items": [
          "Enable rewards & badges in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how rewards & badges is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Rewards & Badges to make the gamification features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles rewards & badges across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around rewards & badges.",
      "Growing businesses that need gamification features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Rewards & Badges?",
        "answer": "Rewards & Badges is a Verly capability built for gamification features. It helps teams boost agent engagement, productivity, and collaboration through rewards and performance visibility with more consistency and less manual friction."
      },
      {
        "question": "How does Rewards & Badges work?",
        "answer": "Rewards & Badges works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Rewards & Badges?",
        "answer": "Teams should use rewards & badges when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---  # Multilingual support features  **Summary:** Multilingual support capabilities that help your team adapt conversations and widgets for global audiences.  **Features in this category:** 1"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Rewards & Badges — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Language adaptable widgets",
    "slug": "language-adaptable-widgets",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Language adaptable widgets.",
    "iconName": "globe",
    "categoryName": "Multilingual support features",
    "categorySlug": "multilingual-support-features",
    "categorySummary": "Multilingual support capabilities that help your team adapt conversations and widgets for global audiences.",
    "theme": "indigo",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Language adaptable widgets.",
    "tags": [
      "Multilingual support",
      "Customer support",
      "Verly"
    ],
    "overview": "Language adaptable widgets is part of Verly's multilingual support features toolkit. It helps teams multilingual support capabilities that help your team adapt conversations and widgets for global audiences so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Language adaptable widgets helps modern support teams multilingual support capabilities that help your team adapt conversations and widgets for global audiences. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, language adaptable widgets fits naturally into the broader multilingual support features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Language adaptable widgets is designed to support teams working across multilingual support features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for language adaptable widgets."
    ],
    "usageList": [
      "Use language adaptable widgets to streamline everyday tasks inside your multilingual support features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Language adaptable widgets, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Language adaptable widgets works inside the broader Verly product flow for multilingual support features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Language adaptable widgets helps your team create a clearer and more repeatable process inside multilingual support features.",
        "imageAlt": "Language adaptable widgets — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use language adaptable widgets to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Language adaptable widgets — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Language adaptable widgets helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Language adaptable widgets — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Language adaptable widgets should be used",
        "items": [
          "Review where language adaptable widgets fits in your multilingual support features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Language adaptable widgets to your workflow",
        "items": [
          "Enable language adaptable widgets in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how language adaptable widgets is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Language adaptable widgets to make the multilingual support features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles language adaptable widgets across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around language adaptable widgets.",
      "Growing businesses that need multilingual support features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Language adaptable widgets?",
        "answer": "Language adaptable widgets is a Verly capability built for multilingual support features. It helps teams multilingual support capabilities that help your team adapt conversations and widgets for global audiences with more consistency and less manual friction."
      },
      {
        "question": "How does Language adaptable widgets work?",
        "answer": "Language adaptable widgets works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Language adaptable widgets?",
        "answer": "Teams should use language adaptable widgets when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---  # Customer portal features  **Summary:** Customer portal tools for self-service, knowledge sharing, feedback collection, and ticket submission.  **Features in this category:** 5"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Language adaptable widgets — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Customer Forum",
    "slug": "customer-forum",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Customer Forum.",
    "iconName": "message-square",
    "categoryName": "Customer portal features",
    "categorySlug": "customer-portal-features",
    "categorySummary": "Customer portal tools for self-service, knowledge sharing, feedback collection, and ticket submission.",
    "theme": "sky",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Customer Forum.",
    "tags": [
      "Customer portal",
      "Customer support",
      "Verly"
    ],
    "overview": "Customer Forum is part of Verly's customer portal features toolkit. It helps teams customer portal tools for self-service, knowledge sharing, feedback collection, and ticket submission so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Customer Forum helps modern support teams customer portal tools for self-service, knowledge sharing, feedback collection, and ticket submission. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, customer forum fits naturally into the broader customer portal features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Customer Forum is designed to support teams working across customer portal features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for customer forum."
    ],
    "usageList": [
      "Use customer forum to streamline everyday tasks inside your customer portal features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Customer Forum, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Customer Forum works inside the broader Verly product flow for customer portal features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Customer Forum helps your team create a clearer and more repeatable process inside customer portal features.",
        "imageAlt": "Customer Forum — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use customer forum to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Customer Forum — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Customer Forum helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Customer Forum — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Customer Forum should be used",
        "items": [
          "Review where customer forum fits in your customer portal features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Customer Forum to your workflow",
        "items": [
          "Enable customer forum in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how customer forum is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Customer Forum to make the customer portal features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles customer forum across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around customer forum.",
      "Growing businesses that need customer portal features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Customer Forum?",
        "answer": "Customer Forum is a Verly capability built for customer portal features. It helps teams customer portal tools for self-service, knowledge sharing, feedback collection, and ticket submission with more consistency and less manual friction."
      },
      {
        "question": "How does Customer Forum work?",
        "answer": "Customer Forum works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Customer Forum?",
        "answer": "Teams should use customer forum when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Customer Forum — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Feedback & Suggestions",
    "slug": "feedback-and-suggestions",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Feedback & Suggestions.",
    "iconName": "lightbulb",
    "categoryName": "Customer portal features",
    "categorySlug": "customer-portal-features",
    "categorySummary": "Customer portal tools for self-service, knowledge sharing, feedback collection, and ticket submission.",
    "theme": "sky",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Feedback & Suggestions.",
    "tags": [
      "Customer portal",
      "Customer support",
      "Verly"
    ],
    "overview": "Feedback & Suggestions is part of Verly's customer portal features toolkit. It helps teams customer portal tools for self-service, knowledge sharing, feedback collection, and ticket submission so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Feedback & Suggestions helps modern support teams customer portal tools for self-service, knowledge sharing, feedback collection, and ticket submission. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, feedback & suggestions fits naturally into the broader customer portal features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Feedback & Suggestions is designed to support teams working across customer portal features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for feedback & suggestions."
    ],
    "usageList": [
      "Use feedback & suggestions to streamline everyday tasks inside your customer portal features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Feedback & Suggestions, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Feedback & Suggestions works inside the broader Verly product flow for customer portal features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Feedback & Suggestions helps your team create a clearer and more repeatable process inside customer portal features.",
        "imageAlt": "Feedback & Suggestions — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use feedback & suggestions to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Feedback & Suggestions — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Feedback & Suggestions helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Feedback & Suggestions — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Feedback & Suggestions should be used",
        "items": [
          "Review where feedback & suggestions fits in your customer portal features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Feedback & Suggestions to your workflow",
        "items": [
          "Enable feedback & suggestions in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how feedback & suggestions is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Feedback & Suggestions to make the customer portal features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles feedback & suggestions across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around feedback & suggestions.",
      "Growing businesses that need customer portal features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Feedback & Suggestions?",
        "answer": "Feedback & Suggestions is a Verly capability built for customer portal features. It helps teams customer portal tools for self-service, knowledge sharing, feedback collection, and ticket submission with more consistency and less manual friction."
      },
      {
        "question": "How does Feedback & Suggestions work?",
        "answer": "Feedback & Suggestions works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Feedback & Suggestions?",
        "answer": "Teams should use feedback & suggestions when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Feedback & Suggestions — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Internal Knowledge Base",
    "slug": "internal-knowledge-base",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Internal Knowledge Base.",
    "iconName": "book-open",
    "categoryName": "Customer portal features",
    "categorySlug": "customer-portal-features",
    "categorySummary": "Customer portal tools for self-service, knowledge sharing, feedback collection, and ticket submission.",
    "theme": "sky",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Internal Knowledge Base.",
    "tags": [
      "Customer portal",
      "Customer support",
      "Verly"
    ],
    "overview": "Internal Knowledge Base is part of Verly's customer portal features toolkit. It helps teams customer portal tools for self-service, knowledge sharing, feedback collection, and ticket submission so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Internal Knowledge Base helps modern support teams customer portal tools for self-service, knowledge sharing, feedback collection, and ticket submission. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, internal knowledge base fits naturally into the broader customer portal features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Internal Knowledge Base is designed to support teams working across customer portal features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for internal knowledge base."
    ],
    "usageList": [
      "Use internal knowledge base to streamline everyday tasks inside your customer portal features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Internal Knowledge Base, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Internal Knowledge Base works inside the broader Verly product flow for customer portal features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Internal Knowledge Base helps your team create a clearer and more repeatable process inside customer portal features.",
        "imageAlt": "Internal Knowledge Base — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use internal knowledge base to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Internal Knowledge Base — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Internal Knowledge Base helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Internal Knowledge Base — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Internal Knowledge Base should be used",
        "items": [
          "Review where internal knowledge base fits in your customer portal features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Internal Knowledge Base to your workflow",
        "items": [
          "Enable internal knowledge base in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how internal knowledge base is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Internal Knowledge Base to make the customer portal features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles internal knowledge base across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around internal knowledge base.",
      "Growing businesses that need customer portal features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Internal Knowledge Base?",
        "answer": "Internal Knowledge Base is a Verly capability built for customer portal features. It helps teams customer portal tools for self-service, knowledge sharing, feedback collection, and ticket submission with more consistency and less manual friction."
      },
      {
        "question": "How does Internal Knowledge Base work?",
        "answer": "Internal Knowledge Base works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Internal Knowledge Base?",
        "answer": "Teams should use internal knowledge base when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Internal Knowledge Base — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Multi Knowledge Base",
    "slug": "multi-knowledge-base",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Multi Knowledge Base.",
    "iconName": "library",
    "categoryName": "Customer portal features",
    "categorySlug": "customer-portal-features",
    "categorySummary": "Customer portal tools for self-service, knowledge sharing, feedback collection, and ticket submission.",
    "theme": "sky",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Multi Knowledge Base.",
    "tags": [
      "Customer portal",
      "Customer support",
      "Verly"
    ],
    "overview": "Multi Knowledge Base is part of Verly's customer portal features toolkit. It helps teams customer portal tools for self-service, knowledge sharing, feedback collection, and ticket submission so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Multi Knowledge Base helps modern support teams customer portal tools for self-service, knowledge sharing, feedback collection, and ticket submission. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, multi knowledge base fits naturally into the broader customer portal features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Multi Knowledge Base is designed to support teams working across customer portal features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for multi knowledge base."
    ],
    "usageList": [
      "Use multi knowledge base to streamline everyday tasks inside your customer portal features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Multi Knowledge Base, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Multi Knowledge Base works inside the broader Verly product flow for customer portal features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Multi Knowledge Base helps your team create a clearer and more repeatable process inside customer portal features.",
        "imageAlt": "Multi Knowledge Base — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use multi knowledge base to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Multi Knowledge Base — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Multi Knowledge Base helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Multi Knowledge Base — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Multi Knowledge Base should be used",
        "items": [
          "Review where multi knowledge base fits in your customer portal features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Multi Knowledge Base to your workflow",
        "items": [
          "Enable multi knowledge base in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how multi knowledge base is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Multi Knowledge Base to make the customer portal features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles multi knowledge base across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around multi knowledge base.",
      "Growing businesses that need customer portal features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Multi Knowledge Base?",
        "answer": "Multi Knowledge Base is a Verly capability built for customer portal features. It helps teams customer portal tools for self-service, knowledge sharing, feedback collection, and ticket submission with more consistency and less manual friction."
      },
      {
        "question": "How does Multi Knowledge Base work?",
        "answer": "Multi Knowledge Base works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Multi Knowledge Base?",
        "answer": "Teams should use multi knowledge base when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Multi Knowledge Base — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "WYSIWYG editor for articles",
    "slug": "wysiwyg-editor-for-articles",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with WYSIWYG editor for articles.",
    "iconName": "type",
    "categoryName": "Customer portal features",
    "categorySlug": "customer-portal-features",
    "categorySummary": "Customer portal tools for self-service, knowledge sharing, feedback collection, and ticket submission.",
    "theme": "sky",
    "subtitle": "Bring more consistency, speed, and confidence to your team with WYSIWYG editor for articles.",
    "tags": [
      "Customer portal",
      "Customer support",
      "Verly"
    ],
    "overview": "WYSIWYG editor for articles is part of Verly's customer portal features toolkit. It helps teams customer portal tools for self-service, knowledge sharing, feedback collection, and ticket submission so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "WYSIWYG editor for articles helps modern support teams customer portal tools for self-service, knowledge sharing, feedback collection, and ticket submission. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, wysiwyg editor for articles fits naturally into the broader customer portal features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "WYSIWYG editor for articles is designed to support teams working across customer portal features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for wysiwyg editor for articles."
    ],
    "usageList": [
      "Use wysiwyg editor for articles to streamline everyday tasks inside your customer portal features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose WYSIWYG editor for articles, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "WYSIWYG editor for articles works inside the broader Verly product flow for customer portal features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "WYSIWYG editor for articles helps your team create a clearer and more repeatable process inside customer portal features.",
        "imageAlt": "WYSIWYG editor for articles — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use wysiwyg editor for articles to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "WYSIWYG editor for articles — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "WYSIWYG editor for articles helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "WYSIWYG editor for articles — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how WYSIWYG editor for articles should be used",
        "items": [
          "Review where wysiwyg editor for articles fits in your customer portal features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect WYSIWYG editor for articles to your workflow",
        "items": [
          "Enable wysiwyg editor for articles in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how wysiwyg editor for articles is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use WYSIWYG editor for articles to make the customer portal features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles wysiwyg editor for articles across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around wysiwyg editor for articles.",
      "Growing businesses that need customer portal features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is WYSIWYG editor for articles?",
        "answer": "WYSIWYG editor for articles is a Verly capability built for customer portal features. It helps teams customer portal tools for self-service, knowledge sharing, feedback collection, and ticket submission with more consistency and less manual friction."
      },
      {
        "question": "How does WYSIWYG editor for articles work?",
        "answer": "WYSIWYG editor for articles works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use WYSIWYG editor for articles?",
        "answer": "Teams should use wysiwyg editor for articles when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---  # Mobile help desk apps  **Summary:** Mobile apps that keep support teams productive on Android and iOS.  **Features in this category:** 2"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "WYSIWYG editor for articles — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Android",
    "slug": "android",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Android.",
    "iconName": "smartphone",
    "categoryName": "Mobile help desk apps",
    "categorySlug": "mobile-help-desk-apps",
    "categorySummary": "Mobile apps that keep support teams productive on Android and iOS.",
    "theme": "slate",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Android.",
    "tags": [
      "Mobile help desk apps",
      "Customer support",
      "Verly"
    ],
    "overview": "Android is part of Verly's mobile help desk apps toolkit. It helps teams mobile apps that keep support teams productive on Android and iOS so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Android helps modern support teams mobile apps that keep support teams productive on Android and iOS. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, android fits naturally into the broader mobile help desk apps experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Android is designed to support teams working across mobile help desk apps.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for android."
    ],
    "usageList": [
      "Use android to streamline everyday tasks inside your mobile help desk apps workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Android, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Android works inside the broader Verly product flow for mobile help desk apps.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Android helps your team create a clearer and more repeatable process inside mobile help desk apps.",
        "imageAlt": "Android — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use android to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Android — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Android helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Android — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Android should be used",
        "items": [
          "Review where android fits in your mobile help desk apps process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Android to your workflow",
        "items": [
          "Enable android in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how android is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Android to make the mobile help desk apps workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles android across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around android.",
      "Growing businesses that need mobile help desk apps to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Android?",
        "answer": "Android is a Verly capability built for mobile help desk apps. It helps teams mobile apps that keep support teams productive on Android and iOS with more consistency and less manual friction."
      },
      {
        "question": "How does Android work?",
        "answer": "Android works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Android?",
        "answer": "Teams should use android when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Android — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "iOS",
    "slug": "ios",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with iOS.",
    "iconName": "apple",
    "categoryName": "Mobile help desk apps",
    "categorySlug": "mobile-help-desk-apps",
    "categorySummary": "Mobile apps that keep support teams productive on Android and iOS.",
    "theme": "slate",
    "subtitle": "Bring more consistency, speed, and confidence to your team with iOS.",
    "tags": [
      "Mobile help desk apps",
      "Customer support",
      "Verly"
    ],
    "overview": "iOS is part of Verly's mobile help desk apps toolkit. It helps teams mobile apps that keep support teams productive on Android and iOS so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "iOS helps modern support teams mobile apps that keep support teams productive on Android and iOS. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, ios fits naturally into the broader mobile help desk apps experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "iOS is designed to support teams working across mobile help desk apps.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for ios."
    ],
    "usageList": [
      "Use ios to streamline everyday tasks inside your mobile help desk apps workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose iOS, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "iOS works inside the broader Verly product flow for mobile help desk apps.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "iOS helps your team create a clearer and more repeatable process inside mobile help desk apps.",
        "imageAlt": "iOS — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use ios to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "iOS — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "iOS helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "iOS — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how iOS should be used",
        "items": [
          "Review where ios fits in your mobile help desk apps process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect iOS to your workflow",
        "items": [
          "Enable ios in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how ios is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use iOS to make the mobile help desk apps workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles ios across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around ios.",
      "Growing businesses that need mobile help desk apps to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is iOS?",
        "answer": "iOS is a Verly capability built for mobile help desk apps. It helps teams mobile apps that keep support teams productive on Android and iOS with more consistency and less manual friction."
      },
      {
        "question": "How does iOS work?",
        "answer": "iOS works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use iOS?",
        "answer": "Teams should use ios when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---  # Help Desk Security features  **Summary:** Security capabilities including access control, encryption, verification, and enterprise sign-on.  **Features in this category:** 7"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "iOS — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "2-Step Verification",
    "slug": "2-step-verification",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with 2-Step Verification.",
    "iconName": "shield-check",
    "categoryName": "Help Desk Security features",
    "categorySlug": "help-desk-security-features",
    "categorySummary": "Security capabilities including access control, encryption, verification, and enterprise sign-on.",
    "theme": "rose",
    "subtitle": "Bring more consistency, speed, and confidence to your team with 2-Step Verification.",
    "tags": [
      "Help Desk Security",
      "Customer support",
      "Verly"
    ],
    "overview": "2-Step Verification is part of Verly's help desk security features toolkit. It helps teams security capabilities including access control, encryption, verification, and enterprise sign-on so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "2-Step Verification helps modern support teams security capabilities including access control, encryption, verification, and enterprise sign-on. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, 2-step verification fits naturally into the broader help desk security features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "2-Step Verification is designed to support teams working across help desk security features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for 2-step verification."
    ],
    "usageList": [
      "Use 2-step verification to streamline everyday tasks inside your help desk security features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose 2-Step Verification, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "2-Step Verification works inside the broader Verly product flow for help desk security features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "2-Step Verification helps your team create a clearer and more repeatable process inside help desk security features.",
        "imageAlt": "2-Step Verification — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use 2-step verification to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "2-Step Verification — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "2-Step Verification helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "2-Step Verification — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how 2-Step Verification should be used",
        "items": [
          "Review where 2-step verification fits in your help desk security features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect 2-Step Verification to your workflow",
        "items": [
          "Enable 2-step verification in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how 2-step verification is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use 2-Step Verification to make the help desk security features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles 2-step verification across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around 2-step verification.",
      "Growing businesses that need help desk security features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is 2-Step Verification?",
        "answer": "2-Step Verification is a Verly capability built for help desk security features. It helps teams security capabilities including access control, encryption, verification, and enterprise sign-on with more consistency and less manual friction."
      },
      {
        "question": "How does 2-Step Verification work?",
        "answer": "2-Step Verification works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use 2-Step Verification?",
        "answer": "Teams should use 2-step verification when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "2-Step Verification — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Ban IPs",
    "slug": "ban-ips",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Ban IPs.",
    "iconName": "ban",
    "categoryName": "Help Desk Security features",
    "categorySlug": "help-desk-security-features",
    "categorySummary": "Security capabilities including access control, encryption, verification, and enterprise sign-on.",
    "theme": "rose",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Ban IPs.",
    "tags": [
      "Help Desk Security",
      "Customer support",
      "Verly"
    ],
    "overview": "Ban IPs is part of Verly's help desk security features toolkit. It helps teams security capabilities including access control, encryption, verification, and enterprise sign-on so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Ban IPs helps modern support teams security capabilities including access control, encryption, verification, and enterprise sign-on. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, ban ips fits naturally into the broader help desk security features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Ban IPs is designed to support teams working across help desk security features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for ban ips."
    ],
    "usageList": [
      "Use ban ips to streamline everyday tasks inside your help desk security features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Ban IPs, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Ban IPs works inside the broader Verly product flow for help desk security features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Ban IPs helps your team create a clearer and more repeatable process inside help desk security features.",
        "imageAlt": "Ban IPs — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use ban ips to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Ban IPs — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Ban IPs helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Ban IPs — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Ban IPs should be used",
        "items": [
          "Review where ban ips fits in your help desk security features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Ban IPs to your workflow",
        "items": [
          "Enable ban ips in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how ban ips is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Ban IPs to make the help desk security features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles ban ips across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around ban ips.",
      "Growing businesses that need help desk security features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Ban IPs?",
        "answer": "Ban IPs is a Verly capability built for help desk security features. It helps teams security capabilities including access control, encryption, verification, and enterprise sign-on with more consistency and less manual friction."
      },
      {
        "question": "How does Ban IPs work?",
        "answer": "Ban IPs works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Ban IPs?",
        "answer": "Teams should use ban ips when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Ban IPs — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "GDPR",
    "slug": "gdpr",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with GDPR.",
    "iconName": "scale",
    "categoryName": "Help Desk Security features",
    "categorySlug": "help-desk-security-features",
    "categorySummary": "Security capabilities including access control, encryption, verification, and enterprise sign-on.",
    "theme": "rose",
    "subtitle": "Bring more consistency, speed, and confidence to your team with GDPR.",
    "tags": [
      "Help Desk Security",
      "Customer support",
      "Verly"
    ],
    "overview": "GDPR is part of Verly's help desk security features toolkit. It helps teams security capabilities including access control, encryption, verification, and enterprise sign-on so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "GDPR helps modern support teams security capabilities including access control, encryption, verification, and enterprise sign-on. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, gdpr fits naturally into the broader help desk security features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "GDPR is designed to support teams working across help desk security features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for gdpr."
    ],
    "usageList": [
      "Use gdpr to streamline everyday tasks inside your help desk security features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose GDPR, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "GDPR works inside the broader Verly product flow for help desk security features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "GDPR helps your team create a clearer and more repeatable process inside help desk security features.",
        "imageAlt": "GDPR — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use gdpr to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "GDPR — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "GDPR helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "GDPR — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how GDPR should be used",
        "items": [
          "Review where gdpr fits in your help desk security features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect GDPR to your workflow",
        "items": [
          "Enable gdpr in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how gdpr is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use GDPR to make the help desk security features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles gdpr across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around gdpr.",
      "Growing businesses that need help desk security features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is GDPR?",
        "answer": "GDPR is a Verly capability built for help desk security features. It helps teams security capabilities including access control, encryption, verification, and enterprise sign-on with more consistency and less manual friction."
      },
      {
        "question": "How does GDPR work?",
        "answer": "GDPR works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use GDPR?",
        "answer": "Teams should use gdpr when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "GDPR — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "HTTPS Encryption",
    "slug": "https-encryption",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with HTTPS Encryption.",
    "iconName": "lock-keyhole",
    "categoryName": "Help Desk Security features",
    "categorySlug": "help-desk-security-features",
    "categorySummary": "Security capabilities including access control, encryption, verification, and enterprise sign-on.",
    "theme": "rose",
    "subtitle": "Bring more consistency, speed, and confidence to your team with HTTPS Encryption.",
    "tags": [
      "Help Desk Security",
      "Customer support",
      "Verly"
    ],
    "overview": "HTTPS Encryption is part of Verly's help desk security features toolkit. It helps teams security capabilities including access control, encryption, verification, and enterprise sign-on so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "HTTPS Encryption helps modern support teams security capabilities including access control, encryption, verification, and enterprise sign-on. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, https encryption fits naturally into the broader help desk security features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "HTTPS Encryption is designed to support teams working across help desk security features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for https encryption."
    ],
    "usageList": [
      "Use https encryption to streamline everyday tasks inside your help desk security features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose HTTPS Encryption, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "HTTPS Encryption works inside the broader Verly product flow for help desk security features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "HTTPS Encryption helps your team create a clearer and more repeatable process inside help desk security features.",
        "imageAlt": "HTTPS Encryption — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use https encryption to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "HTTPS Encryption — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "HTTPS Encryption helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "HTTPS Encryption — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how HTTPS Encryption should be used",
        "items": [
          "Review where https encryption fits in your help desk security features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect HTTPS Encryption to your workflow",
        "items": [
          "Enable https encryption in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how https encryption is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use HTTPS Encryption to make the help desk security features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles https encryption across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around https encryption.",
      "Growing businesses that need help desk security features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is HTTPS Encryption?",
        "answer": "HTTPS Encryption is a Verly capability built for help desk security features. It helps teams security capabilities including access control, encryption, verification, and enterprise sign-on with more consistency and less manual friction."
      },
      {
        "question": "How does HTTPS Encryption work?",
        "answer": "HTTPS Encryption works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use HTTPS Encryption?",
        "answer": "Teams should use https encryption when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "HTTPS Encryption — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Multiple data centers",
    "slug": "multiple-data-centers",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Multiple data centers.",
    "iconName": "server",
    "categoryName": "Help Desk Security features",
    "categorySlug": "help-desk-security-features",
    "categorySummary": "Security capabilities including access control, encryption, verification, and enterprise sign-on.",
    "theme": "rose",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Multiple data centers.",
    "tags": [
      "Help Desk Security",
      "Customer support",
      "Verly"
    ],
    "overview": "Multiple data centers is part of Verly's help desk security features toolkit. It helps teams security capabilities including access control, encryption, verification, and enterprise sign-on so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Multiple data centers helps modern support teams security capabilities including access control, encryption, verification, and enterprise sign-on. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, multiple data centers fits naturally into the broader help desk security features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Multiple data centers is designed to support teams working across help desk security features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for multiple data centers."
    ],
    "usageList": [
      "Use multiple data centers to streamline everyday tasks inside your help desk security features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Multiple data centers, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Multiple data centers works inside the broader Verly product flow for help desk security features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Multiple data centers helps your team create a clearer and more repeatable process inside help desk security features.",
        "imageAlt": "Multiple data centers — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use multiple data centers to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Multiple data centers — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Multiple data centers helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Multiple data centers — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Multiple data centers should be used",
        "items": [
          "Review where multiple data centers fits in your help desk security features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Multiple data centers to your workflow",
        "items": [
          "Enable multiple data centers in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how multiple data centers is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Multiple data centers to make the help desk security features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles multiple data centers across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around multiple data centers.",
      "Growing businesses that need help desk security features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Multiple data centers?",
        "answer": "Multiple data centers is a Verly capability built for help desk security features. It helps teams security capabilities including access control, encryption, verification, and enterprise sign-on with more consistency and less manual friction."
      },
      {
        "question": "How does Multiple data centers work?",
        "answer": "Multiple data centers works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Multiple data centers?",
        "answer": "Teams should use multiple data centers when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Multiple data centers — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Password Validator and Audit Log",
    "slug": "password-validator-and-audit-log",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Password Validator and Audit Log.",
    "iconName": "key-round",
    "categoryName": "Help Desk Security features",
    "categorySlug": "help-desk-security-features",
    "categorySummary": "Security capabilities including access control, encryption, verification, and enterprise sign-on.",
    "theme": "rose",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Password Validator and Audit Log.",
    "tags": [
      "Help Desk Security",
      "Customer support",
      "Verly"
    ],
    "overview": "Password Validator and Audit Log is part of Verly's help desk security features toolkit. It helps teams security capabilities including access control, encryption, verification, and enterprise sign-on so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Password Validator and Audit Log helps modern support teams security capabilities including access control, encryption, verification, and enterprise sign-on. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, password validator and audit log fits naturally into the broader help desk security features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Password Validator and Audit Log is designed to support teams working across help desk security features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for password validator and audit log."
    ],
    "usageList": [
      "Use password validator and audit log to streamline everyday tasks inside your help desk security features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Password Validator and Audit Log, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Password Validator and Audit Log works inside the broader Verly product flow for help desk security features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Password Validator and Audit Log helps your team create a clearer and more repeatable process inside help desk security features.",
        "imageAlt": "Password Validator and Audit Log — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use password validator and audit log to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Password Validator and Audit Log — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Password Validator and Audit Log helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Password Validator and Audit Log — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Password Validator and Audit Log should be used",
        "items": [
          "Review where password validator and audit log fits in your help desk security features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Password Validator and Audit Log to your workflow",
        "items": [
          "Enable password validator and audit log in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how password validator and audit log is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Password Validator and Audit Log to make the help desk security features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles password validator and audit log across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around password validator and audit log.",
      "Growing businesses that need help desk security features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Password Validator and Audit Log?",
        "answer": "Password Validator and Audit Log is a Verly capability built for help desk security features. It helps teams security capabilities including access control, encryption, verification, and enterprise sign-on with more consistency and less manual friction."
      },
      {
        "question": "How does Password Validator and Audit Log work?",
        "answer": "Password Validator and Audit Log works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Password Validator and Audit Log?",
        "answer": "Teams should use password validator and audit log when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Password Validator and Audit Log — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Single Sign-On (SSO)",
    "slug": "single-sign-on-sso",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Single Sign-On (SSO).",
    "iconName": "fingerprint",
    "categoryName": "Help Desk Security features",
    "categorySlug": "help-desk-security-features",
    "categorySummary": "Security capabilities including access control, encryption, verification, and enterprise sign-on.",
    "theme": "rose",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Single Sign-On (SSO).",
    "tags": [
      "Help Desk Security",
      "Customer support",
      "Verly"
    ],
    "overview": "Single Sign-On (SSO) is part of Verly's help desk security features toolkit. It helps teams security capabilities including access control, encryption, verification, and enterprise sign-on so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Single Sign-On (SSO) helps modern support teams security capabilities including access control, encryption, verification, and enterprise sign-on. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, single sign-on (sso) fits naturally into the broader help desk security features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Single Sign-On (SSO) is designed to support teams working across help desk security features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for single sign-on (sso)."
    ],
    "usageList": [
      "Use single sign-on (sso) to streamline everyday tasks inside your help desk security features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Single Sign-On (SSO), review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Single Sign-On (SSO) works inside the broader Verly product flow for help desk security features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Single Sign-On (SSO) helps your team create a clearer and more repeatable process inside help desk security features.",
        "imageAlt": "Single Sign-On (SSO) — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use single sign-on (sso) to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Single Sign-On (SSO) — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Single Sign-On (SSO) helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Single Sign-On (SSO) — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Single Sign-On (SSO) should be used",
        "items": [
          "Review where single sign-on (sso) fits in your help desk security features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Single Sign-On (SSO) to your workflow",
        "items": [
          "Enable single sign-on (sso) in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how single sign-on (sso) is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Single Sign-On (SSO) to make the help desk security features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles single sign-on (sso) across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around single sign-on (sso).",
      "Growing businesses that need help desk security features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Single Sign-On (SSO)?",
        "answer": "Single Sign-On (SSO) is a Verly capability built for help desk security features. It helps teams security capabilities including access control, encryption, verification, and enterprise sign-on with more consistency and less manual friction."
      },
      {
        "question": "How does Single Sign-On (SSO) work?",
        "answer": "Single Sign-On (SSO) works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Single Sign-On (SSO)?",
        "answer": "Teams should use single sign-on (sso) when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---  # Web Contact Cards Features  **Summary:** Browser-based contact cards for displaying contact and business information inside the support workflow.  **Features in this category:** 2"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Single Sign-On (SSO) — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Click to Email",
    "slug": "click-to-email",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Click to Email.",
    "iconName": "mail-open",
    "categoryName": "Web Contact Cards Features",
    "categorySlug": "web-contact-cards-features",
    "categorySummary": "Browser-based contact cards for displaying contact and business information inside the support workflow.",
    "theme": "amber",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Click to Email.",
    "tags": [
      "Web Contact Cards",
      "Customer support",
      "Verly"
    ],
    "overview": "Click to Email is part of Verly's web contact cards features toolkit. It helps teams browser-based contact cards for displaying contact and business information inside the support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Click to Email helps modern support teams browser-based contact cards for displaying contact and business information inside the support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, click to email fits naturally into the broader web contact cards features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Click to Email is designed to support teams working across web contact cards features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for click to email."
    ],
    "usageList": [
      "Use click to email to streamline everyday tasks inside your web contact cards features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Click to Email, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Click to Email works inside the broader Verly product flow for web contact cards features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Click to Email helps your team create a clearer and more repeatable process inside web contact cards features.",
        "imageAlt": "Click to Email — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use click to email to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Click to Email — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Click to Email helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Click to Email — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Click to Email should be used",
        "items": [
          "Review where click to email fits in your web contact cards features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Click to Email to your workflow",
        "items": [
          "Enable click to email in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how click to email is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Click to Email to make the web contact cards features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles click to email across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around click to email.",
      "Growing businesses that need web contact cards features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Click to Email?",
        "answer": "Click to Email is a Verly capability built for web contact cards features. It helps teams browser-based contact cards for displaying contact and business information inside the support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Click to Email work?",
        "answer": "Click to Email works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Click to Email?",
        "answer": "Teams should use click to email when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Click to Email — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Click-to-call and click-to-dial buttons",
    "slug": "click-to-call-and-click-to-dial-buttons",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Click-to-call and click-to-dial buttons.",
    "iconName": "phone-call",
    "categoryName": "Web Contact Cards Features",
    "categorySlug": "web-contact-cards-features",
    "categorySummary": "Browser-based contact cards for displaying contact and business information inside the support workflow.",
    "theme": "amber",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Click-to-call and click-to-dial buttons.",
    "tags": [
      "Web Contact Cards",
      "Customer support",
      "Verly"
    ],
    "overview": "Click-to-call and click-to-dial buttons is part of Verly's web contact cards features toolkit. It helps teams browser-based contact cards for displaying contact and business information inside the support workflow so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Click-to-call and click-to-dial buttons helps modern support teams browser-based contact cards for displaying contact and business information inside the support workflow. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, click-to-call and click-to-dial buttons fits naturally into the broader web contact cards features experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Click-to-call and click-to-dial buttons is designed to support teams working across web contact cards features.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for click-to-call and click-to-dial buttons."
    ],
    "usageList": [
      "Use click-to-call and click-to-dial buttons to streamline everyday tasks inside your web contact cards features workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Click-to-call and click-to-dial buttons, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Click-to-call and click-to-dial buttons works inside the broader Verly product flow for web contact cards features.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Click-to-call and click-to-dial buttons helps your team create a clearer and more repeatable process inside web contact cards features.",
        "imageAlt": "Click-to-call and click-to-dial buttons — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use click-to-call and click-to-dial buttons to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Click-to-call and click-to-dial buttons — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Click-to-call and click-to-dial buttons helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Click-to-call and click-to-dial buttons — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Click-to-call and click-to-dial buttons should be used",
        "items": [
          "Review where click-to-call and click-to-dial buttons fits in your web contact cards features process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Click-to-call and click-to-dial buttons to your workflow",
        "items": [
          "Enable click-to-call and click-to-dial buttons in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how click-to-call and click-to-dial buttons is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Click-to-call and click-to-dial buttons to make the web contact cards features workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles click-to-call and click-to-dial buttons across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around click-to-call and click-to-dial buttons.",
      "Growing businesses that need web contact cards features to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Click-to-call and click-to-dial buttons?",
        "answer": "Click-to-call and click-to-dial buttons is a Verly capability built for web contact cards features. It helps teams browser-based contact cards for displaying contact and business information inside the support workflow with more consistency and less manual friction."
      },
      {
        "question": "How does Click-to-call and click-to-dial buttons work?",
        "answer": "Click-to-call and click-to-dial buttons works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Click-to-call and click-to-dial buttons?",
        "answer": "Teams should use click-to-call and click-to-dial buttons when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---  # Help Desk Integrations  **Summary:** Integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack.  **Features in this category:** 8"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Click-to-call and click-to-dial buttons — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "API",
    "slug": "api",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with API.",
    "iconName": "code-2",
    "categoryName": "Help Desk Integrations",
    "categorySlug": "help-desk-integrations",
    "categorySummary": "Integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack.",
    "theme": "cyan",
    "subtitle": "Bring more consistency, speed, and confidence to your team with API.",
    "tags": [
      "Help Desk Integrations",
      "Customer support",
      "Verly"
    ],
    "overview": "API is part of Verly's help desk integrations toolkit. It helps teams integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "API helps modern support teams integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, api fits naturally into the broader help desk integrations experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "API is designed to support teams working across help desk integrations.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for api."
    ],
    "usageList": [
      "Use api to streamline everyday tasks inside your help desk integrations workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose API, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "API works inside the broader Verly product flow for help desk integrations.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "API helps your team create a clearer and more repeatable process inside help desk integrations.",
        "imageAlt": "API — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use api to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "API — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "API helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "API — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how API should be used",
        "items": [
          "Review where api fits in your help desk integrations process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect API to your workflow",
        "items": [
          "Enable api in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how api is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use API to make the help desk integrations workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles api across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around api.",
      "Growing businesses that need help desk integrations to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is API?",
        "answer": "API is a Verly capability built for help desk integrations. It helps teams integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack with more consistency and less manual friction."
      },
      {
        "question": "How does API work?",
        "answer": "API works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use API?",
        "answer": "Teams should use api when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "API — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "CMS",
    "slug": "cms",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with CMS.",
    "iconName": "layout",
    "categoryName": "Help Desk Integrations",
    "categorySlug": "help-desk-integrations",
    "categorySummary": "Integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack.",
    "theme": "cyan",
    "subtitle": "Bring more consistency, speed, and confidence to your team with CMS.",
    "tags": [
      "Help Desk Integrations",
      "Customer support",
      "Verly"
    ],
    "overview": "CMS is part of Verly's help desk integrations toolkit. It helps teams integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "CMS helps modern support teams integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, cms fits naturally into the broader help desk integrations experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "CMS is designed to support teams working across help desk integrations.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for cms."
    ],
    "usageList": [
      "Use cms to streamline everyday tasks inside your help desk integrations workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose CMS, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "CMS works inside the broader Verly product flow for help desk integrations.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "CMS helps your team create a clearer and more repeatable process inside help desk integrations.",
        "imageAlt": "CMS — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use cms to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "CMS — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "CMS helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "CMS — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how CMS should be used",
        "items": [
          "Review where cms fits in your help desk integrations process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect CMS to your workflow",
        "items": [
          "Enable cms in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how cms is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use CMS to make the help desk integrations workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles cms across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around cms.",
      "Growing businesses that need help desk integrations to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is CMS?",
        "answer": "CMS is a Verly capability built for help desk integrations. It helps teams integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack with more consistency and less manual friction."
      },
      {
        "question": "How does CMS work?",
        "answer": "CMS works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use CMS?",
        "answer": "Teams should use cms when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "CMS — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Computer Telephony Integration",
    "slug": "computer-telephony-integration",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Computer Telephony Integration.",
    "iconName": "pc-case",
    "categoryName": "Help Desk Integrations",
    "categorySlug": "help-desk-integrations",
    "categorySummary": "Integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack.",
    "theme": "cyan",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Computer Telephony Integration.",
    "tags": [
      "Help Desk Integrations",
      "Customer support",
      "Verly"
    ],
    "overview": "Computer Telephony Integration is part of Verly's help desk integrations toolkit. It helps teams integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Computer Telephony Integration helps modern support teams integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, computer telephony integration fits naturally into the broader help desk integrations experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Computer Telephony Integration is designed to support teams working across help desk integrations.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for computer telephony integration."
    ],
    "usageList": [
      "Use computer telephony integration to streamline everyday tasks inside your help desk integrations workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Computer Telephony Integration, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Computer Telephony Integration works inside the broader Verly product flow for help desk integrations.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Computer Telephony Integration helps your team create a clearer and more repeatable process inside help desk integrations.",
        "imageAlt": "Computer Telephony Integration — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use computer telephony integration to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Computer Telephony Integration — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Computer Telephony Integration helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Computer Telephony Integration — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Computer Telephony Integration should be used",
        "items": [
          "Review where computer telephony integration fits in your help desk integrations process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Computer Telephony Integration to your workflow",
        "items": [
          "Enable computer telephony integration in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how computer telephony integration is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Computer Telephony Integration to make the help desk integrations workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles computer telephony integration across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around computer telephony integration.",
      "Growing businesses that need help desk integrations to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Computer Telephony Integration?",
        "answer": "Computer Telephony Integration is a Verly capability built for help desk integrations. It helps teams integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack with more consistency and less manual friction."
      },
      {
        "question": "How does Computer Telephony Integration work?",
        "answer": "Computer Telephony Integration works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Computer Telephony Integration?",
        "answer": "Teams should use computer telephony integration when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Computer Telephony Integration — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Email marketing",
    "slug": "email-marketing",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Email marketing.",
    "iconName": "send",
    "categoryName": "Help Desk Integrations",
    "categorySlug": "help-desk-integrations",
    "categorySummary": "Integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack.",
    "theme": "cyan",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Email marketing.",
    "tags": [
      "Help Desk Integrations",
      "Customer support",
      "Verly"
    ],
    "overview": "Email marketing is part of Verly's help desk integrations toolkit. It helps teams integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Email marketing helps modern support teams integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, email marketing fits naturally into the broader help desk integrations experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Email marketing is designed to support teams working across help desk integrations.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for email marketing."
    ],
    "usageList": [
      "Use email marketing to streamline everyday tasks inside your help desk integrations workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Email marketing, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Email marketing works inside the broader Verly product flow for help desk integrations.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Email marketing helps your team create a clearer and more repeatable process inside help desk integrations.",
        "imageAlt": "Email marketing — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use email marketing to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Email marketing — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Email marketing helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Email marketing — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Email marketing should be used",
        "items": [
          "Review where email marketing fits in your help desk integrations process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Email marketing to your workflow",
        "items": [
          "Enable email marketing in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how email marketing is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Email marketing to make the help desk integrations workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles email marketing across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around email marketing.",
      "Growing businesses that need help desk integrations to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Email marketing?",
        "answer": "Email marketing is a Verly capability built for help desk integrations. It helps teams integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack with more consistency and less manual friction."
      },
      {
        "question": "How does Email marketing work?",
        "answer": "Email marketing works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Email marketing?",
        "answer": "Teams should use email marketing when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Email marketing — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Migration plugins",
    "slug": "migration-plugins",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Migration plugins.",
    "iconName": "arrow-right-left",
    "categoryName": "Help Desk Integrations",
    "categorySlug": "help-desk-integrations",
    "categorySummary": "Integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack.",
    "theme": "cyan",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Migration plugins.",
    "tags": [
      "Help Desk Integrations",
      "Customer support",
      "Verly"
    ],
    "overview": "Migration plugins is part of Verly's help desk integrations toolkit. It helps teams integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Migration plugins helps modern support teams integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, migration plugins fits naturally into the broader help desk integrations experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Migration plugins is designed to support teams working across help desk integrations.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for migration plugins."
    ],
    "usageList": [
      "Use migration plugins to streamline everyday tasks inside your help desk integrations workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Migration plugins, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Migration plugins works inside the broader Verly product flow for help desk integrations.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Migration plugins helps your team create a clearer and more repeatable process inside help desk integrations.",
        "imageAlt": "Migration plugins — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use migration plugins to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Migration plugins — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Migration plugins helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Migration plugins — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Migration plugins should be used",
        "items": [
          "Review where migration plugins fits in your help desk integrations process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Migration plugins to your workflow",
        "items": [
          "Enable migration plugins in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how migration plugins is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Migration plugins to make the help desk integrations workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles migration plugins across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around migration plugins.",
      "Growing businesses that need help desk integrations to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Migration plugins?",
        "answer": "Migration plugins is a Verly capability built for help desk integrations. It helps teams integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack with more consistency and less manual friction."
      },
      {
        "question": "How does Migration plugins work?",
        "answer": "Migration plugins works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Migration plugins?",
        "answer": "Teams should use migration plugins when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Migration plugins — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Project management",
    "slug": "project-management",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Project management.",
    "iconName": "kanban",
    "categoryName": "Help Desk Integrations",
    "categorySlug": "help-desk-integrations",
    "categorySummary": "Integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack.",
    "theme": "cyan",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Project management.",
    "tags": [
      "Help Desk Integrations",
      "Customer support",
      "Verly"
    ],
    "overview": "Project management is part of Verly's help desk integrations toolkit. It helps teams integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Project management helps modern support teams integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, project management fits naturally into the broader help desk integrations experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Project management is designed to support teams working across help desk integrations.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for project management."
    ],
    "usageList": [
      "Use project management to streamline everyday tasks inside your help desk integrations workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Project management, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Project management works inside the broader Verly product flow for help desk integrations.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Project management helps your team create a clearer and more repeatable process inside help desk integrations.",
        "imageAlt": "Project management — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use project management to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Project management — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Project management helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Project management — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Project management should be used",
        "items": [
          "Review where project management fits in your help desk integrations process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Project management to your workflow",
        "items": [
          "Enable project management in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how project management is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Project management to make the help desk integrations workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles project management across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around project management.",
      "Growing businesses that need help desk integrations to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Project management?",
        "answer": "Project management is a Verly capability built for help desk integrations. It helps teams integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack with more consistency and less manual friction."
      },
      {
        "question": "How does Project management work?",
        "answer": "Project management works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Project management?",
        "answer": "Teams should use project management when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Project management — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Slack",
    "slug": "slack",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Slack.",
    "iconName": "hash",
    "categoryName": "Help Desk Integrations",
    "categorySlug": "help-desk-integrations",
    "categorySummary": "Integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack.",
    "theme": "cyan",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Slack.",
    "tags": [
      "Help Desk Integrations",
      "Customer support",
      "Verly"
    ],
    "overview": "Slack is part of Verly's help desk integrations toolkit. It helps teams integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Slack helps modern support teams integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, slack fits naturally into the broader help desk integrations experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Slack is designed to support teams working across help desk integrations.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for slack."
    ],
    "usageList": [
      "Use slack to streamline everyday tasks inside your help desk integrations workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Slack, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Slack works inside the broader Verly product flow for help desk integrations.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Slack helps your team create a clearer and more repeatable process inside help desk integrations.",
        "imageAlt": "Slack — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use slack to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Slack — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Slack helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Slack — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Slack should be used",
        "items": [
          "Review where slack fits in your help desk integrations process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Slack to your workflow",
        "items": [
          "Enable slack in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how slack is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Slack to make the help desk integrations workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles slack across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around slack.",
      "Growing businesses that need help desk integrations to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Slack?",
        "answer": "Slack is a Verly capability built for help desk integrations. It helps teams integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack with more consistency and less manual friction."
      },
      {
        "question": "How does Slack work?",
        "answer": "Slack works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Slack?",
        "answer": "Teams should use slack when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Slack — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  },
  {
    "title": "Zapier",
    "slug": "zapier",
    "shortDescription": "Bring more consistency, speed, and confidence to your team with Zapier.",
    "iconName": "workflow",
    "categoryName": "Help Desk Integrations",
    "categorySlug": "help-desk-integrations",
    "categorySummary": "Integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack.",
    "theme": "cyan",
    "subtitle": "Bring more consistency, speed, and confidence to your team with Zapier.",
    "tags": [
      "Help Desk Integrations",
      "Customer support",
      "Verly"
    ],
    "overview": "Zapier is part of Verly's help desk integrations toolkit. It helps teams integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.",
    "introParagraphs": [
      "Zapier helps modern support teams integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.",
      "Inside Verly, zapier fits naturally into the broader help desk integrations experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools."
    ],
    "definitionPoints": [
      "Zapier is designed to support teams working across help desk integrations.",
      "It helps standardize execution so agents can move faster while customers receive a more predictable experience.",
      "The capability works best when paired with clear workflows, ownership, and the rest of your Verly setup.",
      "This page gives you a structured overview, usage guidance, and implementation ideas for zapier."
    ],
    "usageList": [
      "Use zapier to streamline everyday tasks inside your help desk integrations workflow.",
      "Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.",
      "Combine it with your other Verly processes so agents can work with less friction and fewer manual gaps."
    ],
    "workflowHint": "Open the relevant support workflow in Verly, choose Zapier, review the suggested action or configuration, and apply it where your team needs more speed or consistency.",
    "howItWorksIntro": [
      "Zapier works inside the broader Verly product flow for help desk integrations.",
      "Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience."
    ],
    "functionBlocks": [
      {
        "name": "Operational clarity",
        "description": "Zapier helps your team create a clearer and more repeatable process inside help desk integrations.",
        "imageAlt": "Zapier — Operational clarity",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Faster execution",
        "description": "Use zapier to reduce friction, move work forward faster, and keep support quality high during busy periods.",
        "imageAlt": "Zapier — Faster execution",
        "imagePath": "./assets/features/feature-visual-placeholder.png"
      },
      {
        "name": "Better customer experience",
        "description": "Zapier helps customers receive more timely, consistent, and confidence-building support interactions.",
        "imageAlt": "Zapier — Better customer experience",
        "imagePath": "./assets/features/feature-visual-placeholder.png",
        "notes": [
          "Works well with structured workflows.",
          "Supports consistent execution across teams.",
          "Pairs naturally with other Verly support features."
        ]
      }
    ],
    "setupSteps": [
      {
        "title": "Step 1 - Define how Zapier should be used",
        "items": [
          "Review where zapier fits in your help desk integrations process.",
          "Decide which teams, inboxes, or workflows should rely on it first.",
          "Set a clear success goal such as faster handling, better quality, or fewer manual steps."
        ]
      },
      {
        "title": "Step 2 - Connect Zapier to your workflow",
        "items": [
          "Enable zapier in the part of Verly where your agents already work.",
          "Align ownership, routing, and internal process expectations.",
          "Prepare any supporting knowledge, instructions, or operational rules needed for rollout."
        ]
      },
      {
        "title": "Step 3 - Roll out and refine",
        "items": [
          "Start with a focused use case or team.",
          "Review performance and agent feedback regularly.",
          "Refine how zapier is used until it fits naturally into day-to-day support work."
        ]
      }
    ],
    "valuePoints": [
      "Use Zapier to make the help desk integrations workflow easier for agents and more predictable for customers.",
      "Reduce manual effort by standardizing how your team handles zapier across chat, voice, WhatsApp, and ticket queues.",
      "Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency."
    ],
    "useCases": [
      "Support teams that want clearer processes around zapier.",
      "Growing businesses that need help desk integrations to scale without adding operational friction.",
      "Ops and CX leaders who want better quality control, reporting, and customer experience consistency."
    ],
    "faqItems": [
      {
        "question": "What is Zapier?",
        "answer": "Zapier is a Verly capability built for help desk integrations. It helps teams integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack with more consistency and less manual friction."
      },
      {
        "question": "How does Zapier work?",
        "answer": "Zapier works inside your Verly workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity."
      },
      {
        "question": "When should teams use Zapier?",
        "answer": "Teams should use zapier when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.   ---"
      }
    ],
    "heroImagePath": "/feature-visual-placeholder.svg",
    "heroImageAlt": "Zapier — hero visual",
    "overviewImagePath": "/feature-visual-placeholder.svg",
    "workflowImagePaths": [
      "./assets/features/feature-visual-placeholder.png",
      "./assets/features/feature-visual-placeholder.png"
    ]
  }
];

export const ALL_FEATURES: FeatureDetail[] = FEATURE_DETAILS;

export const FEATURE_CATEGORIES: FeatureCategory[] = FEATURE_CATEGORY_DEFINITIONS.map((category) => ({
  ...category,
  features: FEATURE_DETAILS
    .filter((feature) => feature.categorySlug === category.slug)
    .map((feature) => ({
      title: feature.title,
      slug: feature.slug,
      shortDescription: feature.shortDescription,
      iconName: feature.iconName,
    })),
}));

export function getFeatureBySlug(slug: string) {
  return ALL_FEATURES.find((feature) => feature.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return FEATURE_CATEGORIES.find((category) => category.slug === slug);
}
