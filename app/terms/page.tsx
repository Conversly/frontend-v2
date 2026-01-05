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
            <p className="text-muted-foreground mb-12">Last Updated: January 6, 2026</p>

            <div className="space-y-8 text-foreground/80 leading-relaxed text-lg">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using VerlyAI's platform ("Service"), including our WhatsApp, Voice, and Web AI agents, you agree to be bound by these Terms of Service. If you do not agree, please do not use our Service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">2. Service Description</h2>
                <p>
                  VerlyAI provides a no-code platform for creating, managing, and deploying AI agents across multiple channels. Our Service integrates with third-party providers (including Meta, OpenAI, Deepgram, etc.) to function.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">3. User Obligations</h2>
                <p>You agree to use the Service responsibly and to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 marker:text-primary">
                  <li>Provide accurate account information.</li>
                  <li>Comply with all applicable laws and regulations (including TCPA and GDPR).</li>
                  <li>Obtain necessary consents before messaging or calling users.</li>
                  <li>Not use the Service for spam, harassment, or illegal content.</li>
                  <li>Respect the usage policies of underlying AI providers (e.g., no generation of harmful content).</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">4. Platform Dependencies</h2>
                <p>
                  You acknowledge that our Service relies on third-party platforms (like WhatsApp/Meta). VerlyAI is not responsible for service interruptions, suspensions, or bans imposed by these third-party platforms due to your usage.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">5. Payments & Subscription</h2>
                <p>
                  Access to certain features requires a subscription. You agree to pay all applicable fees. Message and call costs (e.g., WhatsApp conversation charges, Telephony usage) are billed according to our pricing schedule or directly by the provider, as applicable.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">6. Intellectual Property</h2>
                <p>
                  The VerlyAI platform, code, and design are owned by VerlyAI. You retain ownership of the data and content you process through our Service, subject to the limited license we need to operate the Service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">7. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, VerlyAI shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service, including loss of data, profits, or business interruption.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">8. Termination</h2>
                <p>
                  We reserve the right to suspend or terminate your account at our discretion if you violate these Terms or engage in abusive behavior. You may terminate your account at any time via the dashboard.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">9. Governing Law</h2>
                <p>
                  These Terms are governed by the laws of India, without regard to its conflict of law principles.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">10. Contact</h2>
                <p>
                  For legal inquiries, please contact us at: <span className="text-primary">verlyai.workspace@gmail.com</span>
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
