import { Metadata } from 'next';
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import DeletionForm from "@/components/deletion/DeletionForm";

export const metadata: Metadata = {
  title: 'Data Deletion Request | VerlyAI',
  description: 'Request the deletion of your personal data from VerlyAI. We respect your privacy rights under GDPR and CCPA regulations.',
  alternates: {
    canonical: '/deletion',
  },
  openGraph: {
    title: 'Data Deletion Request | VerlyAI',
    description: 'Submit a request to permanently delete your personal data from VerlyAI systems.',
    url: 'https://verlyai.xyz/deletion',
  },
};

export default function DataDeletionPage() {
  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/10 selection:text-primary">
      {/* Global Grid Background */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      <div className="relative z-10 font-sans">
        <Navbar />

        <main className="w-[95%] md:w-[85%] lg:w-[80%] max-w-[800px] mx-auto py-20 md:py-32">
          <DeletionForm />
        </main>

        <Footer />
      </div>
    </div>
  );
}
