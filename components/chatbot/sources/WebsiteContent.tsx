'use client';

import { useState } from 'react';
import { Globe, ChevronDown, ChevronUp, Info, Loader2, CheckSquare, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useDataSourcesStore } from '@/store/chatbot/data-sources';
import { urlSchema } from '@/utils/datasource-validation';
import { fetchSitemap } from '@/lib/api/setup';

interface WebsiteContentProps {
  chatbotId: string;
  onSuccess?: () => void;
}

export function WebsiteContent({ chatbotId, onSuccess }: WebsiteContentProps) {
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
        chatbotId: chatbotId,
        websiteUrl: fullUrl,
      });

      if (response.pages && response.pages.length > 0) {
        setFetchedPages(response.pages);
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

    setUrl('');
    setFetchedPages([]);
    setSelectedPages(new Set());
    onSuccess?.();
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
    onSuccess?.();
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="crawl" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="crawl">Crawl links</TabsTrigger>
          <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
          <TabsTrigger value="individual">Individual link</TabsTrigger>
        </TabsList>

        <TabsContent value="crawl" className="space-y-6">
          <div className="space-y-3">
            <label className="type-micro-heading text-sm">URL</label>
            <div className="flex gap-3">
              <Select value={protocol} onValueChange={setProtocol}>
                <SelectTrigger className="w-36 h-12 text-base">
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
                className="flex-1 h-12 text-base"
                disabled={isFetching}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isFetching) {
                    handleFetchLinks();
                  }
                }}
              />
            </div>
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <span className="type-caption">Links found during crawling or sitemap retrieval may be updated if new links are discovered or some links are invalid.</span>
            </div>
          </div>

          <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
            <CollapsibleTrigger className="flex items-center gap-2 type-body-muted hover:text-foreground transition-colors">
              {isAdvancedOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              Advanced options
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <div className="p-5 bg-[--surface-secondary] rounded-md border border-border">
                <p className="type-body-muted">Advanced crawling options coming soon...</p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Button
            onClick={handleFetchLinks}
            disabled={!url.trim() || isFetching}
            className="bg-muted text-foreground hover:bg-muted/80 h-11 px-6 text-sm"
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
            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-center justify-between">
                <h4 className="type-micro-heading text-sm">
                  Found {fetchedPages.length} page{fetchedPages.length === 1 ? '' : 's'}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggleAll}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {selectedPages.size === fetchedPages.length ? (
                    <>
                      <CheckSquare className="w-4 h-4 mr-1.5" />
                      Deselect all
                    </>
                  ) : (
                    <>
                      <Square className="w-4 h-4 mr-1.5" />
                      Select all
                    </>
                  )}
                </Button>
              </div>

              <div className="max-h-[400px] overflow-y-auto space-y-2.5 pr-2">
                {fetchedPages.map((page, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-[--surface-secondary] rounded-lg hover:bg-muted/50 transition-colors cursor-pointer border border-border"
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

              <div className="flex items-center justify-between pt-3">
                <p className="type-caption">
                  {selectedPages.size} of {fetchedPages.length} selected
                </p>
                <Button
                  onClick={handleAddSelectedPages}
                  disabled={selectedPages.size === 0}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6"
                >
                  Add selected pages
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="sitemap" className="space-y-6">
          <div className="p-10 text-center bg-muted/50 rounded-lg">
            <Globe className="w-14 h-14 mx-auto mb-4 text-muted-foreground" />
            <p className="text-base text-muted-foreground">Sitemap support coming soon</p>
          </div>
        </TabsContent>

        <TabsContent value="individual" className="space-y-6">
          <div className="space-y-3">
            <label className="type-micro-heading text-sm">URL</label>
            <Input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.example.com/page"
              className="h-12 text-base"
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
            className="bg-muted text-foreground hover:bg-muted/80 h-11 px-6 text-sm"
          >
            Add link
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
