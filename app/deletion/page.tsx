'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

export default function DataDeletionPage() {
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    reason: '',
    userId: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || (!formData.phoneNumber && !formData.userId)) {
      toast.error('Please provide your email and either phone number or user ID');
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement actual deletion request API
      await new Promise(resolve => setTimeout(resolve, 1500));


      setIsSubmitted(true);
      toast.success('Your data deletion request has been submitted successfully');
    } catch (error) {
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/10 selection:text-primary">
      {/* Global Grid Background */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      <div className="relative z-10 font-sans">
        <Navbar />

        <main className="w-[95%] md:w-[85%] lg:w-[80%] max-w-[800px] mx-auto py-20 md:py-32">

          {isSubmitted ? (
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-8 md:p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Request Submitted</h1>
              <p className="text-muted-foreground mb-8 text-lg max-w-lg mx-auto">
                Your data deletion request has been received. We will process your request within 30 days and send a confirmation to your email address.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 inline-block">
                <p className="text-sm text-foreground/70 font-mono">
                  Reference ID: {Math.random().toString(36).substring(2, 15).toUpperCase()}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Data Deletion Request</h1>
              <p className="text-muted-foreground mb-8 text-lg">
                We respect your right to privacy. Submit this form to request the permanent deletion of your personal data from VerlyAI's systems.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="h-12 bg-background/50"
                    />
                    <p className="text-xs text-muted-foreground">
                      We'll send the confirmation to this email.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-base">WhatsApp Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="h-12 bg-background/50"
                    />
                    <p className="text-xs text-muted-foreground">
                      Include country code if applicable.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userId" className="text-base">Account ID (Optional)</Label>
                    <Input
                      id="userId"
                      type="text"
                      value={formData.userId}
                      onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                      placeholder="e.g. user_123xyz"
                      className="h-12 bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason" className="text-base">Reason for Deletion (Optional)</Label>
                    <Textarea
                      id="reason"
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      placeholder="Is there anything we could have done better?"
                      className="min-h-[100px] bg-background/50"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-red-600 dark:text-red-400 mb-1">Warning: Irreversible Action</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          <li>Your account and all associated bots will be deleted.</li>
                          <li>Message history and analytics will be lost.</li>
                          <li>Active subscriptions will be immediately cancelled.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium"
                    size="lg"
                    disabled={isSubmitting}
                    variant="destructive"
                  >
                    {isSubmitting ? 'Submitting Request...' : 'Permanently Delete My Data'}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
