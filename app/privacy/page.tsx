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
            <p className="text-muted-foreground mb-12">Last updated: 2 February 2026</p>

            <div className="space-y-8 text-foreground/80 leading-relaxed text-lg">
              <section className="space-y-4">
                <p>
                  <strong>Verly AI</strong> (hereinafter referred to as the <strong>“Platform”</strong>, <strong>“Website”</strong>, <strong>“Service”</strong>, <strong>“Verly AI”</strong>, <strong>“we”</strong>, <strong>“us”</strong>, or <strong>“our”</strong>) is a web-based client communication and WhatsApp automation platform operated by <strong>[YOUR LEGAL ENTITY NAME]</strong>.
                </p>
                <p>
                  This Privacy Policy (“Policy”) explains how users (“User”, “you”, “your”) access and use the Platform, what information is collected, how it is used, with whom it is shared, and how it is protected. We take data protection seriously and are committed to safeguarding information in our possession.
                </p>
                <p>
                  By accessing our Website, dashboard, APIs, or using our Services, you agree to the collection and use of information in accordance with this Policy. If you do not agree, please do not use the Platform.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">1. Legal Compliance</h2>
                <p>This Policy is published in accordance with:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 marker:text-primary">
                  <li>Information Technology Act, 2000</li>
                  <li>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</li>
                  <li>Digital Personal Data Protection Act, 2023 (India)</li>
                  <li>General Data Protection Regulation (GDPR), where applicable</li>
                </ul>
                <p className="mt-2 text-sm text-muted-foreground">
                  Any capitalized terms not defined herein shall have the meanings assigned to them in our Terms of Service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">2. Definitions</h2>
                <ul className="list-disc list-inside space-y-2 ml-4 marker:text-primary">
                  <li><strong>Service:</strong> The Verly AI website, dashboard, APIs, and WhatsApp chatbot services.</li>
                  <li><strong>Personal Data:</strong> Any information relating to an identifiable individual.</li>
                  <li><strong>Usage Data:</strong> Data collected automatically through the use of the Service.</li>
                  <li><strong>Cookies:</strong> Small files stored on a user’s device.</li>
                  <li><strong>Data Controller:</strong> Verly AI, which determines how and why Personal Data is processed.</li>
                  <li><strong>Data Processor:</strong> Third-party service providers processing data on our behalf.</li>
                  <li><strong>End User:</strong> Any individual interacting with a WhatsApp chatbot powered by Verly AI.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">3. Information Collection and Use</h2>
                <p>We collect information to provide, operate, and improve our Services.</p>

                <h3 className="text-xl font-semibold text-foreground mt-6">Types of Data Collected</h3>

                <h4 className="text-lg font-medium text-foreground mt-4">3.1 Personal Data</h4>
                <p>When using our Service, we may collect:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 marker:text-primary">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Business name</li>
                  <li>WhatsApp phone number</li>
                  <li>Login credentials</li>
                  <li>Billing and subscription details (processed by third-party payment providers)</li>
                  <li>Support communications</li>
                </ul>

                <h4 className="text-lg font-medium text-foreground mt-4">3.2 WhatsApp Data</h4>
                <p>When using our WhatsApp chatbot services, we process:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 marker:text-primary">
                  <li>Phone numbers of end users</li>
                  <li>Message content sent and received</li>
                  <li>Media files (images, documents, audio, video)</li>
                  <li>Message timestamps and delivery status</li>
                </ul>
                <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg my-4">
                  <p className="font-medium text-primary">📌 Important:</p>
                  <p className="text-sm mt-1">
                    WhatsApp data is processed <strong>solely to provide the Service</strong>. We <strong>do not sell, rent, or use WhatsApp data for advertising, profiling, or marketing purposes</strong>.
                  </p>
                </div>

                <h4 className="text-lg font-medium text-foreground mt-4">3.3 AI Processing</h4>
                <p>
                  Messages and uploaded content may be processed using third-party AI service providers (such as OpenAI, Azure OpenAI, or similar) strictly to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 marker:text-primary">
                  <li>Generate chatbot responses</li>
                  <li>Summarize or classify messages</li>
                  <li>Enable automation features</li>
                </ul>
                <p className="mt-2 text-sm italic">
                  We do <strong>not</strong> use customer or end-user data to train our own AI models.
                </p>

                <h4 className="text-lg font-medium text-foreground mt-4">3.4 Usage Data</h4>
                <p>We may collect technical information such as:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 marker:text-primary">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Device type</li>
                  <li>API request logs</li>
                  <li>Session timestamps</li>
                </ul>
                <p>This data is used for security, analytics, and performance monitoring.</p>

                <h4 className="text-lg font-medium text-foreground mt-4">3.5 Cookies</h4>
                <p>We use cookies for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 marker:text-primary">
                  <li>Authentication</li>
                  <li>Session management</li>
                  <li>Security</li>
                </ul>
                <p>Users may disable cookies via browser settings, but some features may not function properly.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">4. Use of Data</h2>
                <p>Verly AI uses collected data to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 marker:text-primary">
                  <li>Provide and maintain the Service</li>
                  <li>Enable WhatsApp chatbot functionality</li>
                  <li>Provide customer support</li>
                  <li>Process payments and subscriptions</li>
                  <li>Monitor usage and prevent abuse</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">5. Legal Basis for Processing (GDPR)</h2>
                <p>Where applicable, we process Personal Data based on:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 marker:text-primary">
                  <li>Performance of a contract</li>
                  <li>User consent</li>
                  <li>Legitimate business interests</li>
                  <li>Legal obligations</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">6. Data Retention</h2>
                <ul className="list-disc list-inside space-y-2 ml-4 marker:text-primary">
                  <li>Personal Data is retained while an account remains active.</li>
                  <li>WhatsApp chat data is retained based on user configuration or deleted upon request.</li>
                  <li>Backup data is securely deleted within a reasonable period after account termination.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">7. Data Transfer</h2>
                <p>
                  Your information may be processed and stored in India or other jurisdictions where our service providers operate. We ensure appropriate safeguards for such transfers.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">8. Disclosure of Data</h2>
                <p>We may disclose data:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 marker:text-primary">
                  <li>To WhatsApp / Meta Platforms for message delivery</li>
                  <li>To cloud infrastructure providers</li>
                  <li>To AI service providers strictly for message processing</li>
                  <li>To payment processors (e.g., Stripe, Razorpay)</li>
                  <li>To legal authorities where required by law</li>
                </ul>
                <p className="mt-2 font-medium">🚫 We do not sell Personal Data.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">9. Security of Data</h2>
                <p>
                  We implement reasonable technical and organizational safeguards, including encryption and access controls. However, no method of electronic storage is 100% secure.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">10. User Rights</h2>
                <p>Depending on applicable laws, users may have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 marker:text-primary">
                  <li>Access, correct, or delete Personal Data</li>
                  <li>Withdraw consent</li>
                  <li>Restrict or object to processing</li>
                  <li>Request data portability</li>
                </ul>
                <p>Requests may require identity verification.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">11. WhatsApp Consent & Opt-Out</h2>
                <ul className="list-disc list-inside space-y-2 ml-4 marker:text-primary">
                  <li>Businesses using Verly AI are responsible for obtaining valid user consent.</li>
                  <li>End users may opt out by replying <strong>“STOP”</strong>.</li>
                  <li>Verly AI does not initiate messages without customer configuration.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">12. Children’s Privacy</h2>
                <p>
                  Our Service is not intended for individuals under the age of 18. We do not knowingly collect data from minors.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">13. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy periodically. Changes will be posted on this page with a revised “Last updated” date.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">14. Contact Us</h2>
                <p>For questions or data requests, contact:</p>
                <p>
                  📧 <a href="mailto:support@verly.ai" className="text-primary hover:underline">support@verly.ai</a>
                </p>
                <p>
                  🏢 <strong>[Your Company Address]</strong>
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
