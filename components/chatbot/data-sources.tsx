'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, MessageSquare, Database, Lock, Plus, AlertCircle, Globe, Cloud, Briefcase, Mail, ArrowRight, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { documentSchema, urlSchema } from '@/utils/datasource-validation';
import { motion } from 'framer-motion';
import { useDataSourcesStore, usePendingSources, useIsLoading } from '@/store/chatbot/data-sources';
import { useProcessDataSource } from '@/services/datasource';
import { ProcessRequest, DocumentData } from '@/types/datasource';

interface DataSourcesProps {
  chatbotId: string;
}

const PRODUCTIVITY_SOURCES = [
  {
    id: 'document',
    name: 'Document',
    description: 'Upload document files containing text (PDF, Word, TXT, etc)',
    icon: FileText,
    available: true
  },
  {
    id: 'qa',
    name: 'Q&A',
    description: 'Finetune your bot by providing common questions and answers',
    icon: MessageSquare,
    available: true
  },
  {
    id: 'text',
    name: 'Text',
    description: 'Add custom text content directly to train your chatbot',
    icon: FileText,
    available: true
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Answer questions from the content of Notion pages',
    icon: Database,
    available: false
  }
];

const WEB_SOURCES = [
  {
    id: 'url',
    name: 'Single URL',
    description: 'Answer from the content from a single webpage',
    icon: Globe,
    available: true
  },
  {
    id: 'sitemap',
    name: 'Sitemap',
    description: 'Answer from all content on a website referenced by its XML sitemap',
    icon: Database,
    available: false
  }
];

const CLOUD_SOURCES = [
  {
    id: 'gdrive',
    name: 'Google Drive',
    description: 'Answer questions from documents in Google Drive',
    icon: Cloud,
    available: false
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    description: 'Answer questions from documents in Dropbox',
    icon: Cloud,
    available: false
  }
];

const BUSINESS_SOURCES = [
  {
    id: 'zendesk',
    name: 'Zendesk',
    description: 'Answer questions from Zendesk Help Center articles',
    icon: Briefcase,
    available: false
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Answer questions from your Slack workspace',
    icon: Mail,
    available: false
  }
];

interface ProductivityDataSourcesProps {
  chatbotId: string;
}

export function ProductivityDataSources({ chatbotId }: ProductivityDataSourcesProps) {
  const { addPendingSource, uploadFile, setShowQADialog } = useDataSourcesStore();

  const handleAddFile = async (files: FileList) => {
    const file = files[0];
    if (!file) return;

    const parsed = documentSchema.safeParse({ name: file.name, size: file.size });
    if (!parsed.success) {
      toast.error('Invalid document file', {
        description: parsed.error.issues[0].message,
      });
      return;
    }

    try {
      const blobData = await uploadFile(file);
      addPendingSource({ 
        type: 'Document', 
        name: file.name, 
        content: file,
        blobData 
      });
      toast.success('File uploaded successfully');
      
      const fileInput = document.getElementById(`file-upload-document`) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (error) {
      toast.error('Failed to upload file', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {PRODUCTIVITY_SOURCES.map((source) => {
        const Icon = source.icon;
        return (
          <motion.div
            key={source.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-purple-500/10 rounded-2xl" />
            
            <div className="relative bg-gray-900/60 backdrop-blur-sm border border-gray-800/60 rounded-2xl p-6 h-full transition-all duration-300 hover:border-pink-500/20">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 mb-4">
                <Icon className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-2">
                {source.name}
                {!source.available && (
                  <span className="ml-2 inline-flex items-center">
                    <Lock className="w-4 h-4 text-gray-400" />
                  </span>
                )}
              </h3>
              <p className="font-sans text-base text-gray-400 mb-4">
                {source.description}
              </p>

              {source.available ? (
                source.id === 'document' ? (
                  <div>
                    <Button
                      variant="outline"
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 rounded-xl group"
                      onClick={() => document.getElementById(`file-upload-${source.id}`)?.click()}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Upload Document
                      <input
                        id={`file-upload-${source.id}`}
                        type="file"
                        className="hidden"
                        accept=".pdf,.docx,.txt,.md"
                        onChange={(e) => {
                          if (e.target.files?.length) {
                            handleAddFile(e.target.files);
                          }
                        }}
                      />
                    </Button>
                    <div className="flex items-start gap-2 mt-2 text-xs text-gray-400">
                      <AlertCircle className="w-3 h-3 mt-0.5" />
                      <span>Supports PDF, Word, TXT, MD. Max 10MB</span>
                    </div>
                  </div>
                ) : source.id === 'qa' ? (
                  <Button
                    onClick={() => setShowQADialog(true)}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 rounded-xl group"
                  >
                    Add Q&A Pairs
                    <Plus className="ml-2 w-4 h-4 group-hover:rotate-90 transition-transform" />
                  </Button>
                ) : source.id === 'text' ? (
                  <Link href={`/chatbot/${chatbotId}/sources/text`}>
                    <Button
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 rounded-xl group"
                    >
                      Add Text Content
                      <Plus className="ml-2 w-4 h-4 group-hover:rotate-90 transition-transform" />
                    </Button>
                  </Link>
                ) : null
              ) : (
                <Button 
                  disabled 
                  className="w-full bg-gray-800 text-gray-400 cursor-not-allowed rounded-xl"
                >
                  Coming Soon
                </Button>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function WebDataSources({ chatbotId }: DataSourcesProps) {
  const { addPendingSource } = useDataSourcesStore();

  const handleAddURL = (url: string) => {
    if (url.trim()) {
      const parsed = urlSchema.safeParse(url);
      if (!parsed.success) {
        toast.error('Invalid URL', {
          description: parsed.error.issues[0].message,
        });
        return;
      }
      addPendingSource({
        type: 'Website',
        name: url.trim(),
      });
      toast.success('URL added successfully');
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {WEB_SOURCES.map((source) => {
        const Icon = source.icon;
        return (
          <motion.div
            key={source.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-purple-500/10 rounded-2xl" />
            
            <div className="relative bg-gray-900/60 backdrop-blur-sm border border-gray-800/60 rounded-2xl p-6 h-full transition-all duration-300 hover:border-pink-500/20">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 mb-4">
                <Icon className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-2">
                {source.name}
                {!source.available && (
                  <span className="ml-2 inline-flex items-center">
                    <Lock className="w-4 h-4 text-gray-400" />
                  </span>
                )}
              </h3>
              <p className="font-sans text-base text-gray-400 mb-4">
                {source.description}
              </p>

              {source.available ? (
                source.id === 'url' ? (
                  <div>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const input = e.currentTarget.querySelector('input') as HTMLInputElement;
                      if (input?.value) {
                        handleAddURL(input.value);
                        input.value = '';
                      }
                    }}>
                      <Input
                        type="text" 
                        placeholder="Enter URL"
                        className="w-full mb-2 bg-gray-800/50 border-gray-700/50 text-white"
                      />
                      <Button
                        type="submit"
                        variant="outline"
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 rounded-xl group"
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        Add URL
                      </Button>
                    </form>
                    <div className="flex items-start gap-2 mt-2 text-xs text-gray-400">
                      <AlertCircle className="w-3 h-3 mt-0.5" />
                      <span>Enter a valid webpage URL to extract content</span>
                    </div>
                  </div>
                ) : null
              ) : (
                <Button 
                  disabled 
                  className="w-full bg-gray-800 text-gray-400 cursor-not-allowed rounded-xl"
                >
                  Coming Soon
                </Button>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function CloudDataSources({ chatbotId }: DataSourcesProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {CLOUD_SOURCES.map((source) => {
        const Icon = source.icon;
        return (
          <motion.div
            key={source.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-purple-500/10 rounded-2xl" />
            
            <div className="relative bg-gray-900/60 backdrop-blur-sm border border-gray-800/60 rounded-2xl p-6 h-full transition-all duration-300 hover:border-pink-500/20">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 mb-4">
                <Icon className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-2">
                {source.name}
                {!source.available && (
                  <span className="ml-2 inline-flex items-center">
                    <Lock className="w-4 h-4 text-gray-400" />
                  </span>
                )}
              </h3>
              <p className="font-sans text-base text-gray-400 mb-4">
                {source.description}
              </p>
              <Button 
                disabled 
                className="w-full bg-muted text-muted-foreground cursor-not-allowed rounded-xl"
              >
                Coming Soon
              </Button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function BusinessDataSources({ chatbotId }: DataSourcesProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {BUSINESS_SOURCES.map((source) => {
        const Icon = source.icon;
        return (
          <motion.div
            key={source.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-purple-500/10 rounded-2xl" />
            
            <div className="relative bg-gray-900/60 backdrop-blur-sm border border-gray-800/60 rounded-2xl p-6 h-full transition-all duration-300 hover:border-pink-500/20">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 mb-4">
                <Icon className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-2">
                {source.name}
                {!source.available && (
                  <span className="ml-2 inline-flex items-center">
                    <Lock className="w-4 h-4 text-gray-400" />
                  </span>
                )}
              </h3>
              <p className="font-sans text-base text-gray-400 mb-4">
                {source.description}
              </p>
              <Button 
                disabled 
                className="w-full bg-muted text-muted-foreground cursor-not-allowed rounded-xl"
              >
                Coming Soon
              </Button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function PendingSources({ chatbotId }: DataSourcesProps) {
  const pendingSources = usePendingSources();
  const isLoading = useIsLoading();
  const { removePendingSource, clearPendingSources, setIsLoading } = useDataSourcesStore();
  const { mutateAsync: processAllSources } = useProcessDataSource(chatbotId);

  const handleSaveAllSources = async () => {
    setIsLoading(true);
    try {
      const websiteUrls = pendingSources
        .filter(source => source.type === 'Website')
        .map(source => source.name);

      const documents: DocumentData[] = pendingSources
        .filter(source => source.type === 'Document' && source.blobData)
        .map(source => source.blobData as DocumentData);

      const qandaData = pendingSources
        .filter(source => source.type === 'QandA')
        .map(source => ({
          question: source.name,
          answer: source.content as string,
          citations: source.citation
        }));

      const allDocuments = documents;

      const request: ProcessRequest = {
        chatbotId: chatbotId,
        websiteUrls: websiteUrls.length > 0 ? websiteUrls : undefined,
        documents: allDocuments.length > 0 ? allDocuments : undefined,
        qandaData: qandaData.length > 0 ? qandaData : undefined,
      };

      const result = await processAllSources(request);
      if (result.success) {
        toast.success('Data sources processing started', {
          description: 'Data sources will be available shortly',
        });
        clearPendingSources();
      } else {
        toast.error('Failed to process data sources', {
          description: result.message,
        });
      }
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error && error.message.includes('maximum number of data sources')) {
        toast.error('Maximum sources reached', {
          description: 'You have reached the maximum number of data sources allowed for this chatbot in the free tier.',
        });
      } else {
        toast.error('Failed to process data sources', {
          description: error instanceof Error ? error.message : 'Unknown error',
        });
      }
      setIsLoading(false);
    }
  };

  if (pendingSources.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/60 rounded-2xl p-6">
      <h3 className="font-heading text-lg text-white mb-4">Pending Sources</h3>
      <div className="space-y-3">
        {pendingSources.map((source) => (
          <motion.div
            key={source.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between bg-gray-800/50 rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-pink-500" />
              <span className="font-sans text-base text-white">{source.name}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removePendingSource(source.id)}
              className="text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </motion.div>
        ))}
        
        <Button
          onClick={handleSaveAllSources}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 rounded-xl group mt-4"
        >
          {isLoading ? "Processing..." : "Process All Sources"}
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}

