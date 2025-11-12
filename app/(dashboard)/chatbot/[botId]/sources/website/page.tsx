"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Globe, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useDataSourcesStore } from '@/store/chatbot/data-sources';
import { SourcesSidebar } from '@/components/chatbot/SourcesSidebar';
import { urlSchema } from '@/utils/datasource-validation';

export default function WebsiteSourcePage() {
  const params = useParams();
  const botId = params.botId as string;
  const [url, setUrl] = useState('');
  const [protocol, setProtocol] = useState('https://');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const { addPendingSource } = useDataSourcesStore();

  const handleFetchLinks = () => {
    const fullUrl = url.startsWith('http') ? url : `${protocol}${url}`;
    
    const parsed = urlSchema.safeParse(fullUrl);
    if (!parsed.success) {
      toast.error('Invalid URL', {
        description: parsed.error.issues[0].message,
      });
      return;
    }

    addPendingSource({
      type: 'Website',
      name: fullUrl,
    });
    
    toast.success('URL added successfully');
    setUrl('');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          {/* Main Content */}
          <div className="space-y-6">
            <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-2xl font-heading font-semibold text-foreground">Website</h1>
                  <p className="text-muted-foreground mt-1">
                    Crawl web pages or submit sitemaps to update your AI with the latest content.
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Info className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6">
              <Collapsible open={true}>
                <CollapsibleTrigger className="flex items-center justify-between w-full mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Add links</h3>
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <Tabs defaultValue="crawl" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="crawl">Crawl links</TabsTrigger>
                      <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
                      <TabsTrigger value="individual">Individual link</TabsTrigger>
                    </TabsList>

                    <TabsContent value="crawl" className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">URL</label>
                        <div className="flex gap-2">
                          <Select value={protocol} onValueChange={setProtocol}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="https://">https://</SelectItem>
                              <SelectItem value="http://">http://</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="www.example.com"
                            className="flex-1"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleFetchLinks();
                              }
                            }}
                          />
                        </div>
                        <div className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          <span>Links found during crawling or sitemap retrieval may be updated if new links are discovered or some links are invalid.</span>
                        </div>
                      </div>

                      <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
                        <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                          {isAdvancedOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          Advanced options
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-4 space-y-4">
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">Advanced crawling options coming soon...</p>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      <Button
                        onClick={handleFetchLinks}
                        disabled={!url.trim()}
                        className="bg-muted text-foreground hover:bg-muted/80"
                      >
                        Fetch links
                      </Button>
                    </TabsContent>

                    <TabsContent value="sitemap" className="space-y-4">
                      <div className="p-8 text-center bg-muted/50 rounded-lg">
                        <Globe className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Sitemap support coming soon</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="individual" className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">URL</label>
                        <Input
                          type="text"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="https://www.example.com/page"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleFetchLinks();
                            }
                          }}
                        />
                      </div>
                      <Button
                        onClick={handleFetchLinks}
                        disabled={!url.trim()}
                        className="bg-muted text-foreground hover:bg-muted/80"
                      >
                        Add link
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <SourcesSidebar chatbotId={botId} />
          </div>
        </div>
      </div>
    </div>
  );
}