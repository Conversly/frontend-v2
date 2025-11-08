'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { CheckCircle2 } from 'lucide-react';

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
      // For now, just simulate submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Data deletion request:', formData);
      
      setIsSubmitted(true);
      toast.success('Your data deletion request has been submitted successfully');
    } catch (error) {
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-lg shadow-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Request Submitted</h1>
            <p className="text-muted-foreground mb-6">
              Your data deletion request has been received. We will process your request within 30 days and send a confirmation to your email address.
            </p>
            <p className="text-sm text-muted-foreground">
              Reference ID: {Math.random().toString(36).substring(2, 15).toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Data Deletion Request</h1>
          <p className="text-muted-foreground mb-8">
            We respect your right to privacy. Submit this form to request the deletion of your personal data from our systems.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className="mt-1"
              />
              <p className="text-sm text-muted-foreground mt-1">
                We'll send confirmation to this email address
              </p>
            </div>

            <div>
              <Label htmlFor="phoneNumber">WhatsApp Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                placeholder="+1234567890"
                className="mt-1"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Include country code (e.g., +1 for US)
              </p>
            </div>

            <div>
              <Label htmlFor="userId">User ID or Account ID (Optional)</Label>
              <Input
                id="userId"
                type="text"
                value={formData.userId}
                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                placeholder="Your user ID if known"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="reason">Reason for Deletion (Optional)</Label>
              <Textarea
                id="reason"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="Help us improve by sharing why you're requesting deletion"
                className="mt-1"
                rows={4}
              />
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">What will be deleted?</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Your account information and profile data</li>
                <li>WhatsApp Business Account connection details</li>
                <li>Message history and conversation logs</li>
                <li>Authentication tokens and access credentials</li>
                <li>All personally identifiable information</li>
              </ul>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-600 dark:text-yellow-500 mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Data deletion is permanent and cannot be undone</li>
                <li>Processing may take up to 30 days to complete</li>
                <li>Some data may be retained for legal or regulatory compliance</li>
                <li>Active subscriptions will be cancelled</li>
              </ul>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Deletion Request'}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By submitting this request, you acknowledge that this action is irreversible and all your data will be permanently deleted.
            </p>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
            <p className="text-sm text-muted-foreground">
              If you have questions about data deletion or privacy, contact us at:<br />
              <a href="mailto:verlyai.workspace@gmail.com" className="text-primary hover:underline">
                verlyai.workspace@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
