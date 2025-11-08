export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-foreground mb-6">Privacy Policy</h1>
          
          <div className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">Introduction</h2>
              <p>
                Welcome to Verlyai ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our WhatsApp chatbot service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">Information We Collect</h2>
              <p className="mb-3">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>WhatsApp Business Account information</li>
                <li>Phone numbers associated with your WhatsApp Business Account</li>
                <li>Messages sent and received through our service</li>
                <li>Account credentials and authentication tokens</li>
                <li>Business information (name, email, business details)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and maintain our WhatsApp chatbot service</li>
                <li>Process and respond to customer messages</li>
                <li>Improve and optimize our services</li>
                <li>Ensure security and prevent fraud</li>
                <li>Comply with legal obligations</li>
                <li>Send you important service updates and notifications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">Data Sharing and Disclosure</h2>
              <p className="mb-3">We do not sell your personal information. We may share your information with:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Meta/Facebook (as required to provide WhatsApp Business API services)</li>
                <li>Service providers who assist in our operations</li>
                <li>Law enforcement when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All access tokens are encrypted before storage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">Data Retention</h2>
              <p>
                We retain your information for as long as necessary to provide our services and comply with legal obligations. You can request deletion of your data at any time through our data deletion page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to processing of your information</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">WhatsApp Business Platform</h2>
              <p>
                Our service uses the WhatsApp Business Platform provided by Meta. Your use of WhatsApp is also governed by WhatsApp's Terms of Service and Privacy Policy. Please review their policies at:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li><a href="https://www.whatsapp.com/legal/privacy-policy-eea" className="text-primary hover:underline">WhatsApp Privacy Policy</a></li>
                <li><a href="https://www.whatsapp.com/legal/terms-of-service-eea" className="text-primary hover:underline">WhatsApp Terms of Service</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="mt-2">
                Email: verlyai.workspace@gmail.com<br />
                Website: dev.verlyai.xyz
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
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
