export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-foreground mb-6">Terms of Service</h1>
          
          <div className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Verlyai's WhatsApp chatbot service ("Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">2. Service Description</h2>
              <p>
                Verlyai provides a platform that enables businesses to connect their WhatsApp Business Accounts and create automated chatbot responses for customer communications. Our Service uses the WhatsApp Business Platform provided by Meta.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">3. User Obligations</h2>
              <p className="mb-3">You agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information during registration</li>
                <li>Maintain the security of your account credentials</li>
                <li>Comply with WhatsApp's Terms of Service and Commerce Policy</li>
                <li>Obtain proper consent before messaging customers</li>
                <li>Not use the Service for spam, harassment, or illegal activities</li>
                <li>Not violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">4. WhatsApp Business Platform</h2>
              <p>
                Our Service relies on the WhatsApp Business Platform. You acknowledge that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>You must comply with WhatsApp's Business Policy</li>
                <li>WhatsApp may impose rate limits and restrictions</li>
                <li>Service availability depends on WhatsApp's infrastructure</li>
                <li>WhatsApp's terms and policies apply to your use</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">5. Pricing and Payment</h2>
              <p>
                Pricing for our Service is subject to change. WhatsApp conversations are billed according to Meta's pricing structure. You are responsible for all charges incurred through your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">6. Data and Privacy</h2>
              <p>
                Your use of the Service is also governed by our Privacy Policy. We collect and process data as described in our Privacy Policy to provide and improve the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">7. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are owned by Verlyai and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">8. Service Availability</h2>
              <p>
                We strive to provide reliable service but do not guarantee uninterrupted or error-free operation. We may modify, suspend, or discontinue any part of the Service at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Verlyai shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">10. Account Termination</h2>
              <p className="mb-3">We may terminate or suspend your account if you:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violate these Terms of Service</li>
                <li>Violate WhatsApp's policies</li>
                <li>Engage in fraudulent or illegal activities</li>
                <li>Fail to pay applicable fees</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">11. Indemnification</h2>
              <p>
                You agree to indemnify and hold Verlyai harmless from any claims, damages, or expenses arising from your use of the Service or violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">12. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify you of significant changes. Continued use of the Service after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">13. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">14. Contact Information</h2>
              <p>
                For questions about these Terms of Service, please contact us at:
              </p>
              <p className="mt-2">
                Email: verlyai.workspace@gmail.com<br />
                Website: dev.verlyai.xyz
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">15. Third-Party Services</h2>
              <p>
                Our Service integrates with third-party services including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>WhatsApp Business Platform (Meta)</li>
                <li>Cloud hosting providers</li>
                <li>Analytics services</li>
              </ul>
              <p className="mt-2">
                Your use of these services is subject to their respective terms and policies.
              </p>
            </section>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Last Updated: November 8, 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
