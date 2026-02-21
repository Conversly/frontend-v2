'use client';

import { useState } from 'react';
import { Upload, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { documentSchema } from '@/utils/datasource-validation';
import { useDataSourcesStore } from '@/store/chatbot/data-sources';

interface FileUploadContentProps {
  onSuccess?: () => void;
}

export function FileUploadContent({ onSuccess }: FileUploadContentProps) {
  const { addPendingSource, uploadFile } = useDataSourcesStore();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleAddFile = async (files: FileList) => {
    const file = files[0];
    if (!file) return;

    if (isUploading) return;

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

      const fileInput = document.getElementById('file-upload-document-dialog') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
      onSuccess?.();
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

    if (isUploading) return;

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
    <div className="space-y-4">
      {/* Warning Banner */}
      <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
        <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
        <p className="type-body-muted text-destructive">
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
            document.getElementById('file-upload-document-dialog')?.click();
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
            <p className="text-foreground font-semibold mb-1">
              {isUploading
                ? 'Uploading file...'
                : 'Drag & drop files here, or click to select files'
              }
            </p>
            <p className="type-body-muted">
              {isUploading
                ? 'Please wait while your file is being uploaded'
                : 'Supported file types: pdf, doc, docx, txt'
              }
            </p>
          </div>
        </div>
        <input
          id="file-upload-document-dialog"
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
    </div>
  );
}
