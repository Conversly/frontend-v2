'use client';

import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FileText, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { documentSchema } from '@/utils/datasource-validation';
import { useDataSourcesStore } from '@/store/chatbot/data-sources';
import { PendingSources } from '@/components/chatbot/data-sources';

export default function FilesSourcePage() {
  const params = useParams();
  const botId = params.botId as string;
  const { addPendingSource, uploadFile } = useDataSourcesStore();

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
      
      const fileInput = document.getElementById('file-upload-document') as HTMLInputElement;
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6">
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">Files</h1>
          <p className="text-muted-foreground">
            Upload documents to enhance your chatbot's knowledge base
          </p>
        </div>

        <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">Upload Document</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
                Upload document files containing text (PDF, Word, TXT, etc)
              </p>
              <Button
                variant="outline"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 rounded-xl"
                onClick={() => document.getElementById('file-upload-document')?.click()}
              >
                <FileText className="w-4 h-4 mr-2" />
                Upload Document
                <input
                  id="file-upload-document"
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
              <div className="flex items-start gap-2 mt-2 text-xs text-muted-foreground dark:text-gray-400">
                <AlertCircle className="w-3 h-3 mt-0.5" />
                <span>Supports PDF, Word, TXT, MD. Max 10MB</span>
              </div>
            </div>
          </div>
        </div>

        <PendingSources chatbotId={botId} />
      </div>
    </div>
  );
}
