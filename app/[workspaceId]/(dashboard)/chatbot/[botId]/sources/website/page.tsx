"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Globe, ChevronDown, ChevronUp, Info, Loader2, CheckSquare, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useDataSourcesStore } from '@/store/chatbot/data-sources';
import { SourcesSidebar } from '@/components/chatbot/SourcesSidebar';
import { urlSchema } from '@/utils/datasource-validation';
import { fetchSitemap } from '@/lib/api/setup';

export default function WebsiteSourcePage() {
  const routeParams = useParams<{ botId: string }>();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
  
  if (!botId) {
    return null;
  }

  const [url, setUrl] = useState('');
  const [protocol, setProtocol] = useState('https://');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedPages, setFetchedPages] = useState<string[]>([]);
  const [selectedPages, setSelectedPages] = useState<Set<string>>(new Set());
  const { addPendingSource } = useDataSourcesStore();

  const handleFetchLinks = async () => {
    const fullUrl = url.startsWith('http') ? url : `${protocol}${url}`;
    
    const parsed = urlSchema.safeParse(fullUrl);
    if (!parsed.success) {
      toast.error('Invalid URL', {
        description: parsed.error.issues[0].message,
      });
      return;
    }

    setIsFetching(true);
    try {
      const response = await fetchSitemap({
        chatbotId: botId,
        websiteUrl: fullUrl,
      });

      if (response.pages && response.pages.length > 0) {
        setFetchedPages(response.pages);
        // Select all pages by default
        setSelectedPages(new Set(response.pages));
        toast.success(`Found ${response.pages.length} page${response.pages.length === 1 ? '' : 's'}`);
      } else {
        toast.info('No pages found for this URL');
        setFetchedPages([]);
        setSelectedPages(new Set());
      }
    } catch (error) {
      toast.error('Failed to fetch links', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
      setFetchedPages([]);
      setSelectedPages(new Set());
    } finally {
      setIsFetching(false);
    }
  };

  const handleTogglePage = (page: string) => {
    setSelectedPages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(page)) {
        newSet.delete(page);
      } else {
        newSet.add(page);
      }
      return newSet;
    });
  };

  const handleToggleAll = () => {
    if (selectedPages.size === fetchedPages.length) {
      setSelectedPages(new Set());
    } else {
      setSelectedPages(new Set(fetchedPages));
    }
  };

  const handleAddSelectedPages = () => {
    if (selectedPages.size === 0) {
      toast.error('Please select at least one page');
      return;
    }

    selectedPages.forEach((page) => {
      addPendingSource({
        type: 'Website',
        name: page,
      });
    });

    toast.success(`Added ${selectedPages.size} page${selectedPages.size === 1 ? '' : 's'} to sources`);
    
    // Clear the state
    setUrl('');
    setFetchedPages([]);
    setSelectedPages(new Set());
  };

  const handleAddIndividualLink = () => {
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    
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
                            disabled={isFetching}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !isFetching) {
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
                        disabled={!url.trim() || isFetching}
                        className="bg-muted text-foreground hover:bg-muted/80"
                      >
                        {isFetching ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Fetching...
                          </>
                        ) : (
                          'Fetch links'
                        )}
                      </Button>

                      {/* Fetched Pages List */}
                      {fetchedPages.length > 0 && (
                        <div className="space-y-3 pt-4 border-t border-border">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-foreground">
                              Found {fetchedPages.length} page{fetchedPages.length === 1 ? '' : 's'}
                            </h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleToggleAll}
                              className="text-xs text-muted-foreground hover:text-foreground"
                            >
                              {selectedPages.size === fetchedPages.length ? (
                                <>
                                  <CheckSquare className="w-3.5 h-3.5 mr-1" />
                                  Deselect all
                                </>
                              ) : (
                                <>
                                  <Square className="w-3.5 h-3.5 mr-1" />
                                  Select all
                                </>
                              )}
                            </Button>
                          </div>

                          <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
                            {fetchedPages.map((page, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                                onClick={() => handleTogglePage(page)}
                              >
                                <Checkbox
                                  checked={selectedPages.has(page)}
                                  onCheckedChange={() => handleTogglePage(page)}
                                  className="mt-0.5"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-foreground break-all">{page}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <p className="text-xs text-muted-foreground">
                              {selectedPages.size} of {fetchedPages.length} selected
                            </p>
                            <Button
                              onClick={handleAddSelectedPages}
                              disabled={selectedPages.size === 0}
                              className="bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                              Add selected pages
                            </Button>
                          </div>
                        </div>
                      )}
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
                              handleAddIndividualLink();
                            }
                          }}
                        />
                      </div>
                      <Button
                        onClick={handleAddIndividualLink}
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