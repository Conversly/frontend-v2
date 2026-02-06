'use client';

import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/10 selection:text-primary">
      {/* Global Grid Background */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      <div className="relative z-10 font-sans">
        <Navbar />

        <main className="w-[95%] md:w-[85%] lg:w-[80%] max-w-[1000px] mx-auto py-20 md:py-32">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Terms of Service</h1>
            <p className="text-muted-foreground mb-12">Last Updated: 2 February 2026</p>

            <div className="space-y-8 text-foreground/80 leading-relaxed text-lg">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using <strong>Verly AI</strong> ("Platform", "Service", "we", "us"), including our WhatsApp chatbot automation, customer communication tools, and AI-powered engagement services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree, please do not use our Service.
                </p>
                <p>
                  These Terms constitute a legally binding agreement between you ("User", "Company") and <strong>[YOUR LEGAL ENTITY NAME]</strong> regarding your use of the Service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">2. Service Description</h2>
                <p>
                  Verly AI provides a no-code platform for creating, managing, and deploying AI agents and chatbots across multiple channels, primarily WhatsApp. Our Service integrates with third-party providers (including Meta, OpenAI, Deepgram, etc.) to function.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">3. User Accounts & Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2 ml-4 marker:text-primary">
                  <li>You must provide accurate and complete information when creating an account.</li>
                  <li>You are responsible for maintaining the security of your account credentials.</li>
                  <li>You are solely responsible for all activity that occurs under your account.</li>
                  <li>You must notify us immediately of any unauthorized use of your account.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">4. Compliance & Acceptable Use</h2>
                <p>You agree to use the Service only for lawful purposes and in compliance with all applicable laws and regulations, including but not limited to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 marker:text-primary">
                  <li><strong>WhatsApp Business & Commerce Policies:</strong> You must strictly adhere to Meta's <a href="https://www.whatsapp.com/legal/business-policy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WhatsApp Business Policy</a> and <a href="https://www.whatsapp.com/legal/commerce-policy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Commerce Policy</a>.</li>
                  <li><strong>Consent Regulations:</strong> You must obtain explicit opt-in consent from end-users before sending them messages via WhatsApp (TCPA, GDPR, etc.).</li>
                  <li><strong>Prohibited Content:</strong> You shall NOT use the Service to send spam, offensive, fraudulent, or illegal content.</li>
                  <li><strong>AI Usage:</strong> You must respect the usage policies of underlying AI providers (e.g., OpenAI, Azure OpenAI).</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">5. Platform Dependencies</h2>
                <p>
                  You acknowledge that our Service relies on third-party platforms, specifically WhatsApp (Meta Platforms, Inc.). Verly AI is <strong>not affiliated with Meta</strong>. We are not responsible for service interruptions, changes in APIs, or account suspensions/bans imposed by WhatsApp/Meta due to your violation of their policies.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">6. Payments, Subscriptions & Refunds</h2>
                <p>
                  Access to certain features requires a subscription. You agree to pay all applicable fees as per our pricing schedule.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 marker:text-primary">
                  <li><strong>Subscription Fees:</strong> Billed in advance on a recurring basis (monthly or annually).</li>
                  <li><strong>Usage Costs:</strong> Message and call costs (e.g., WhatsApp conversation charges) are your responsibility and may be billed directly by the provider or passed through by us.</li>
                  <li><strong>Refunds:</strong> Refunds are processed according to our Refund Policy or at our sole discretion.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">7. Intellectual Property</h2>
                <p>
                  The Verly AI platform, including its code, design, and documentation, is the exclusive property of Verly AI. You retain ownership of your customer data and the content you process through our Service, granting us a limited license to use such data strictly to provide the Service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">8. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, Verly AI shall not be liable for any indirect, incidental, special, or consequential damages, including loss of profits, data, or business reputation, arising from your use of or inability to use the Service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">9. Termination</h2>
                <p>
                  We reserve the right to suspend or terminate your account immediately, without prior notice, if you violate these Terms, particularly if you engage in spamming or violate WhatsApp's policies. You may terminate your account at any time via the dashboard.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">10. Governing Law</h2>
                <p>
                  These Terms are governed by the laws of India, without regard to its conflict of law principles. Any disputes shall be subject to the jurisdiction of the courts located in [Your City/State].
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">11. Contact Information</h2>
                <p>
                  For legal inquiries or questions about these Terms, please contact us at:
                </p>
                <p>
                  📧 <a href="mailto:support@verly.ai" className="text-primary hover:underline">support@verly.ai</a>
                </p>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
