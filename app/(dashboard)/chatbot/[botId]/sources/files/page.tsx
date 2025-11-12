'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Upload, AlertCircle, Info, ChevronUp, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { documentSchema } from '@/utils/datasource-validation';
import { useDataSourcesStore } from '@/store/chatbot/data-sources';
import { SourcesSidebar } from '@/components/chatbot/SourcesSidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function FilesSourcePage() {
  const params = useParams();
  const botId = params.botId as string;
  const { addPendingSource, uploadFile } = useDataSourcesStore();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleAddFile = async (files: FileList) => {
    const file = files[0];
    if (!file) return;

    if (isUploading) return; // Prevent multiple uploads

    const parsed = documentSchema.safeParse({ name: file.name, size: file.size });
    if (!parsed.success) {
      toast.error('Invalid document file', {
        description: parsed.error.issues[0].message,
      });
      return;
    }

    setIsUploading(true);
    try {
      const blobData = await uploadFile(file);
      addPendingSource({ 
        type: 'Document', 
        name: file.name, 
        content: file,
        blobData 
      });
      toast.success('File uploaded successfully');
      
      const fileInput = document.getElementById('file-upload-document') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (error) {
      toast.error('Failed to upload file', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (isUploading) return; // Prevent uploads while already uploading
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleAddFile(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
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
                  <h1 className="text-2xl font-heading font-semibold text-foreground">Files</h1>
                  <p className="text-muted-foreground mt-1">
                    Upload documents to train your AI. Extract text from PDFs, DOCX, and TXT files.
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
                  <h3 className="text-lg font-semibold text-foreground">Add files</h3>
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                </CollapsibleTrigger>
                
                <CollapsibleContent className="space-y-4">
                  {/* Warning Banner */}
                  <div className="flex items-start gap-3 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-orange-600 dark:text-orange-400">
                      If you are uploading a PDF, make sure you can select/highlight the text.
                    </p>
                  </div>

                  {/* Drag & Drop Zone */}
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => {
                      if (!isUploading) {
                        document.getElementById('file-upload-document')?.click();
                      }
                    }}
                    className={`
                      relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200
                      ${isUploading 
                        ? 'border-primary/50 bg-primary/5 cursor-not-allowed opacity-60' 
                        : isDragging 
                          ? 'border-primary bg-primary/5 cursor-pointer' 
                          : 'border-border bg-muted/20 hover:border-primary/50 hover:bg-muted/30 cursor-pointer'
                      }
                    `}
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        {isUploading ? (
                          <Loader2 className="w-6 h-6 text-primary animate-spin" />
                        ) : (
                          <Upload className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="text-foreground font-medium mb-1">
                          {isUploading 
                            ? 'Uploading file...' 
                            : 'Drag & drop files here, or click to select files'
                          }
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {isUploading 
                            ? 'Please wait while your file is being uploaded' 
                            : 'Supported file types: pdf, doc, docx, txt'
                          }
                        </p>
                      </div>
                    </div>
                    <input
                      id="file-upload-document"
                      type="file"
                      className="hidden"
                      accept=".pdf,.docx,.txt,.md,.doc"
                      disabled={isUploading}
                      onChange={(e) => {
                        if (e.target.files?.length && !isUploading) {
                          handleAddFile(e.target.files);
                        }
                      }}
                    />
                  </div>
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