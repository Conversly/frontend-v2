export interface BlogPost {
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    slug: string;
    image: string;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        title: "Why Decision Trees Are Dead: The Shift to Autonomous Agents",
        excerpt: "Traditional chatbots fail when users go off-script. Discover how Verly's LLM-native agents understand intent and resolve complex issues without rigid decision trees.",
        date: "Jan 12, 2026",
        readTime: "5 min read",
        category: "AI Strategy",
        slug: "decision-trees-dead-autonomous-agents",
        image: "/images/blog/autonomous-agents.png",
    },
    {
        title: "Building a Voice Agent in 10 Minutes with Verly",
        excerpt: "A step-by-step guide to deploying a low-latency voice AI that can handle interruptions, accents, and complex queries over the phone.",
        date: "Jan 08, 2026",
        readTime: "8 min read",
        category: "Tutorials",
        slug: "building-voice-agent-10-minutes",
        image: "/images/blog/voice-ai.png",
    },
    {
        title: "Multi-Channel Support: Integrating WhatsApp and Web Chat",
        excerpt: "Write once, deploy everywhere. Learn how to configure a single Verly agent to handle support tickets seamlessly across WhatsApp, Web, and Voice channels.",
        date: "Jan 05, 2026",
        readTime: "6 min read",
        category: "Engineering",
        slug: "multi-channel-support-whatsapp-web",
        image: "/images/blog/omnichannel.png",
    }
];

export interface BlogPostData {
    title: string;
    content: string;
    date: string;
    readTime: string;
    author: string;
    category: string;
    image: string;
}

export const BLOG_DATA: Record<string, BlogPostData> = {
    "decision-trees-dead-autonomous-agents": {
        title: "Why Decision Trees Are Dead: The Shift to Autonomous Agents",
        content: `
            <p>For the last decade, "customer support automation" meant one thing: rigid decision trees. We've all experienced it. "Press 1 for Sales, Press 2 for Support." Or the chatbot equivalent: "I didn't understand that. Please select from the options below."</p>
            
            <p>This approach is fundamentally broken because human conversation is non-linear. A customer might start asking about pricing, interrupt themselves to ask about shipping to Germany, and then pivot back to enterprise SLAs. A decision tree breaks immediately under this pressure.</p>

            <h3>The Autonomous Advantage</h3>
            <p>At Verly, we're building the infrastructure for the next generation of support: <strong>LLM-native Autonomous Agents</strong>. Unlike decision trees, our agents don't follow a flowchart. They have a "Goal" (e.g., "Help the user resolve their tracking issue") and a set of "Tools" (e.g., "CheckOrderStatus API", "RefundOrder API").</p>

            <p>When a user speaks, the agent uses an LLM to reason about the best next step. If a user says, "My package is late, can I get a refund?", the agent understands it needs to first check the status. If the status is "Delivered", it might ask, "It says it was delivered yesterday. Did you check the lobby?" If the status is "Lost", it can autonomously decide to offer a refund.</p>

            <h3>Key Benefits for Business</h3>
            <ul>
                <li><strong>Zero Maintenance:</strong> No more updating complex flowcharts every time you change a policy. Just update the system prompt.</li>
                <li><strong>Context Retention:</strong> Agents remember that you asked about the "Pro Plan" five minutes ago.</li>
                <li><strong>Complex Reasoning:</strong> They can handle multi-step logic, like "I want to upgrade, but only if it includes the API feature."</li>
            </ul>

            <p>The future isn't scripted. It's autonomous. And it's available today on Verly.</p>
        `,
        date: "Jan 12, 2026",
        readTime: "5 min read",
        author: "Sarah Chen, Head of AI",
        category: "AI Strategy",
        image: "/images/blog/autonomous-agents.png",
    },
    "building-voice-agent-10-minutes": {
        title: "Building a Voice Agent in 10 Minutes with Verly",
        content: `
            <p>Voice AI has historically been the hardest channel to automate. You needed a telephony provider (Twilio), a transcriber (Deepgram), an LLM (OpenAI), and a text-to-speech engine (ElevenLabs)—and you had to stitch them all together with WebSockets while keeping latency under 500ms.</p>
            
            <p>Verly abstracts this entire stack into a single, cohesive platform. Today, I'm going to show you how to build a fully functional restaurant reservation voice agent in less than 10 minutes.</p>

            <h3>Step 1: Define the Persona</h3>
            <p>First, navigate to the <strong>Agent Builder</strong>. We'll give our agent a name, "BistroBot", and a system prompt:</p>
            <blockquote class="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
                "You are an energetic host at Le Verly Bistro. Your goal is to take table reservations. You need to collect the date, time, and number of guests. Be polite but efficient."
            </blockquote>

            <h3>Step 2: Connect the Tools</h3>
            <p>An agent without tools is just a chatty bot. In the "Tools" tab, we'll add our booking function. Verly automatically generates the JSON schema definition for the LLM.</p>
            <pre class="bg-muted p-4 rounded-lg text-sm overflow-x-auto my-4">
{
  "name": "book_table",
  "description": "Reserves a table",
  "parameters": {
    "type": "object",
    "properties": {
      "guests": { "type": "integer" },
      "time": { "type": "string" }
    }
  }
}
            </pre>

            <h3>Step 3: Deploy to Phone</h3>
            <p>Click "Deploy", buy a phone number directly from the dashboard, and link it to your new agent. That's it.</p>
            
            <p>Call the number. You'll notice our <strong>Turn-Taking Engine</strong> in action. If you interrupt the bot while it's listing specials, it stops speaking immediately and listens to you—just like a human would. This is the "magic" that makes voice AI feel real.</p>
        `,
        date: "Jan 08, 2026",
        readTime: "8 min read",
        author: "Verly Engineering",
        category: "Tutorials",
        image: "/images/blog/voice-ai.png",
    },
    "multi-channel-support-whatsapp-web": {
        title: "Multi-Channel Support: Integrating WhatsApp and Web Chat",
        content: `
            <p>Your customers exist in a fragmented world. They might find you on Google Maps (Web Chat), save your number for later (WhatsApp), or call you when they're in a hurry (Voice). The biggest pain point for businesses is maintaining state across these silos.</p>

            <p>Verly introduces the concept of <strong>Unified Agent State</strong>. This means your agent isn't tied to a channel; it's tied to the user's identity.</p>

            <h3>The "Write Once, Run Everywhere" Workflow</h3>
            <p>With Verly, you configure your agent's behavior once. You define its knowledge base (your PDFs, website links) and its tools (your CRM, database).</p>
            
            <p>Then, you simply toggle on the channels you want:</p>
            <ul>
                <li><strong>Web SDK:</strong> Copy-paste a script tag to your site.</li>
                <li><strong>WhatsApp:</strong> Scan a QR code to link your business number.</li>
                <li><strong>Telephony:</strong> Provision a SIP trunk or phone number.</li>
            </ul>

            <h3>Seamless Handoffs</h3>
            <p>Here is a real scenario our platform enables: A user chatting on your website about a product needs to leave for a meeting. They say, "Can you text me the details?"</p>
            
            <p>The agent, recognizing the intent, can trigger a WhatsApp message to the user's phone number with the summary. If the user replies on WhatsApp an hour later, the agent has the full context of the web chat. This isn't just "multichannel"—it's <strong>omnichannel</strong> continuity.</p>
        `,
        date: "Jan 05, 2026",
        readTime: "6 min read",
        author: "Product Team",
        category: "Engineering",
        image: "/images/blog/omnichannel.png",
    },
    // Fallback data for other slugs
    "default": {
        title: "Sample Blog Post",
        content: "This is a placeholder for blog content. In a real application, this would be fetched from a CMS or database based on the slug.",
        date: "Jan 01, 2026",
        readTime: "3 min read",
        author: "Verly Team",
        category: "General",
        image: "/images/blog/autonomous-agents.png",
    }
};

export function getBlogPost(slug: string): BlogPostData {
    return BLOG_DATA[slug] || BLOG_DATA["default"];
}
