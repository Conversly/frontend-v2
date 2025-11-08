/**
 * WhatsApp Integration Setup Checklist Component
 * 
 * This component helps users track their progress through the WhatsApp setup process
 */

'use client';

import { useState } from 'react';
import { CheckCircle2, Circle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  link?: {
    url: string;
    text: string;
  };
}

const setupChecklist: ChecklistItem[] = [
  {
    id: 'facebook-account',
    title: 'Create Facebook Business Account',
    description: 'Set up a Facebook Business account if you don\'t have one',
    link: {
      url: 'https://business.facebook.com',
      text: 'Go to Facebook Business'
    }
  },
  {
    id: 'facebook-app',
    title: 'Create Facebook App',
    description: 'Create a Facebook app with WhatsApp product enabled',
    link: {
      url: 'https://developers.facebook.com/apps',
      text: 'Create App'
    }
  },
  {
    id: 'whatsapp-account',
    title: 'Set Up WhatsApp Business',
    description: 'Configure WhatsApp Business account in Meta Business Suite',
    link: {
      url: 'https://business.facebook.com/latest/whatsapp_manager',
      text: 'Open Meta Business Suite'
    }
  },
  {
    id: 'phone-verification',
    title: 'Verify Phone Number',
    description: 'Add and verify a phone number for WhatsApp Business',
  },
  {
    id: 'oauth-config',
    title: 'Configure OAuth Settings',
    description: 'Set up OAuth redirect URLs in your Facebook app settings',
    link: {
      url: 'https://developers.facebook.com/docs/facebook-login/guides/advanced/manual-flow',
      text: 'View OAuth Guide'
    }
  },
];

export function WhatsAppSetupChecklist() {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setCompletedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const progress = (completedItems.size / setupChecklist.length) * 100;

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">Setup Checklist</h3>
        <p className="text-sm text-muted-foreground">
          Follow these steps to prepare for WhatsApp integration
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-foreground">
            {completedItems.size} of {setupChecklist.length}
          </span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {setupChecklist.map((item) => {
          const isCompleted = completedItems.has(item.id);
          
          return (
            <div
              key={item.id}
              className={`
                border rounded-lg p-4 transition-all cursor-pointer
                ${isCompleted 
                  ? 'bg-green-500/5 border-green-500/20' 
                  : 'bg-muted/30 border-border hover:bg-muted/50'
                }
              `}
              onClick={() => toggleItem(item.id)}
            >
              <div className="flex items-start gap-3">
                <div className="pt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                
                <div className="flex-1 space-y-2">
                  <div>
                    <h4 className={`font-medium ${isCompleted ? 'text-green-600 dark:text-green-400' : 'text-foreground'}`}>
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </div>
                  
                  {item.link && !isCompleted && (
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-blue-500 hover:text-blue-600"
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a 
                        href={item.link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1"
                      >
                        {item.link.text}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {progress === 100 && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
          <p className="text-sm font-medium text-green-600 dark:text-green-400">
            ✓ All steps completed! You're ready to connect WhatsApp
          </p>
        </div>
      )}
    </div>
  );
}
