'use client';

import { IntegrationConfig } from '@/types/integration';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  CheckCircle2, 
  Lock, 
  ExternalLink,
  MessageCircle,
  Slack,
  CreditCard,
  Calendar,
  FileText,
  Cloud,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { motion } from 'framer-motion';

interface IntegrationCardProps {
  integration: IntegrationConfig;
  onSetup: (integrationId: string) => void;
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<any>> = {
  MessageCircle,
  Slack,
  CreditCard,
  Calendar,
  FileText,
  Cloud,
};

export function IntegrationCard({ integration, onSetup }: IntegrationCardProps) {
  const IconComponent = iconMap[integration.icon] || MessageCircle;
  const isConnected = integration.status === 'connected';
  const isComingSoon = integration.status === 'coming-soon';

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'messaging':
        return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'payment':
        return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'scheduling':
        return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
      case 'productivity':
        return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'support':
        return 'text-teal-500 bg-teal-500/10 border-teal-500/20';
      default:
        return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Card 
        className={cn(
          "integration-card relative overflow-hidden transition-all duration-300",
          "hover:shadow-xl hover:shadow-primary/5 border-2",
          isConnected && "ring-2 ring-green-500/30 bg-gradient-to-br from-green-500/5 to-transparent border-green-500/30",
          isComingSoon && "opacity-75 cursor-not-allowed",
          !isConnected && !isComingSoon && "hover:border-primary/30"
        )}
      >
        <div className="p-6 space-y-4">
          {/* Header with Status Badge */}
          <div className="flex items-start justify-between">
            <motion.div 
              className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-all duration-300",
                getCategoryColor(integration.category)
              )}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <IconComponent className="w-7 h-7" />
            </motion.div>
            
            {isConnected && (
              <motion.div 
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full shadow-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                  Connected
                </span>
              </motion.div>
            )}
            
            {isComingSoon && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 border border-border rounded-full">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">
                  Coming Soon
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              {integration.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {integration.description}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2 pt-2">
            <Button
              onClick={() => onSetup(integration.id)}
              disabled={isComingSoon}
              variant={isConnected ? 'outline' : 'default'}
              className={cn(
                "flex-1 h-10 transition-all duration-300",
                !isConnected && !isComingSoon && "bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25",
                isConnected && "border-green-500/30 hover:bg-green-500/10"
              )}
            >
              <span className="flex items-center gap-2">
                {isConnected 
                  ? (integration.id === 'whatsapp' ? 'Open' : 'Manage')
                  : isComingSoon 
                    ? 'Coming Soon' 
                    : 'Set Up Integration'}
                {!isConnected && !isComingSoon && (
                  <ArrowRight className="w-4 h-4" />
                )}
              </span>
            </Button>
            
            {integration.docsUrl && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(integration.docsUrl, '_blank')}
                    className="h-10 w-10 border-border hover:bg-muted/50"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Documentation</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-background/80 backdrop-blur-sm border border-border/50 rounded-md shadow-sm">
            <span className="text-xs font-medium text-muted-foreground capitalize">
              {integration.category}
            </span>
          </div>

          {/* Hover Gradient Effect */}
          {!isComingSoon && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
          )}
        </div>
      </Card>
    </motion.div>
  );
}
