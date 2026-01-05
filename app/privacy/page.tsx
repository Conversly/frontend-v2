'use client';

import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/10 selection:text-primary">
      {/* Global Grid Background */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      <div className="relative z-10 font-sans">
        <Navbar />

        <main className="w-[95%] md:w-[85%] lg:w-[80%] max-w-[1000px] mx-auto py-20 md:py-32">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground mb-12">Last Updated: January 6, 2026</p>

            <div className="space-y-8 text-foreground/80 leading-relaxed text-lg">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
                <p>
                  Welcome to VerlyAI ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, including our WhatsApp automation, Voice Agents, and Website Chatbot services.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">2. Information We Collect</h2>
                <p>We collect information that you provide directly to us or that is generated through your use of our services, including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 marker:text-primary">
                  <li>Account Information (Name, Email, Business details)</li>
                  <li>WhatsApp Business Account connection details</li>
                  <li>Voice Agent configuration and call transcripts</li>
                  <li>Website Chatbot conversation logs</li>
                  <li>API keys and authentication tokens</li>
                  <li>Billing and subscription details</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">3. How We Use Your Information</h2>
                <p>We use the collected information to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 marker:text-primary">
                  <li>Provide, maintain, and improve our AI agent services</li>
                  <li>Process automated responses via WhatsApp, Voice, and Web</li>
                  <li>Analyze usage patterns to optimize AI performance</li>
                  <li>Detect and prevent fraud or abuse</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Comply with legal obligations and platform policies</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">4. Data Sharing and Third Parties</h2>
                <p>We do not sell your personal data. We share information only with:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 marker:text-primary">
                  <li><strong>Meta Platforms, Inc.</strong>: For providing WhatsApp Business API services.</li>
                  <li><strong>LLM Providers (e.g., OpenAI, Anthropic)</strong>: For generating AI responses (data is processed securely).</li>
                  <li><strong>Voice Providers (e.g., Deepgram, ElevenLabs)</strong>: For speech-to-text and text-to-speech processing.</li>
                  <li><strong>Cloud Infrastructure Services</strong>: To host and run our platform securely.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">5. Data Security</h2>
                <p>
                  We implement industry-standard security measures, including encryption of access tokens and sensitive data at rest and in transit. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">6. Data Retention & Deletion</h2>
                <p>
                  We retain your data only as long as necessary to provide our services. You can request the deletion of your account and associated data at any time via our <a href="/deletion" className="text-primary hover:underline">Data Deletion page</a>.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">7. Platform Specific Policies</h2>
                <p>
                  Your use of our services is also subject to the policies of the platforms we integrate with:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 marker:text-primary">
                  <li><a href="https://www.whatsapp.com/legal/business-policy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WhatsApp Business Policy</a></li>
                  <li><a href="https://openai.com/policies/usage-policies" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenAI Usage Policies</a></li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">8. Contact Us</h2>
                <p>
                  If you have questions about this policy, please contact us at:
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p><strong>Email:</strong> verlyai.workspace@gmail.com</p>
                  <p><strong>Website:</strong> dev.verlyai.xyz</p>
                </div>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
