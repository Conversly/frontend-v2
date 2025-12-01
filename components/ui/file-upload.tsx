"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Loader2, Image as ImageIcon, FileVideo } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface FileUploadProps {
    value?: string;
    onChange: (url: string) => void;
    accept?: string;
    maxSize?: number; // in bytes
    label?: string;
    className?: string;
}

export function FileUpload({
    value,
    onChange,
    accept = "image/*",
    maxSize = 5 * 1024 * 1024, // 5MB default
    label = "Upload file",
    className
}: FileUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        if (file.size > maxSize) {
            toast.error(`File too large. Max size is ${maxSize / 1024 / 1024}MB`);
            return;
        }

        setIsUploading(true);
        try {
            const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
                method: 'POST',
                body: file,
            });

            if (!res.ok) throw new Error('Upload failed');

            const blob = await res.json();
            onChange(blob.url);
            toast.success('File uploaded successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to upload file');
        } finally {
            setIsUploading(false);
        }
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const isVideo = value?.match(/\.(mp4|webm|mov)$/i);

    if (value) {
        return (
            <div className={cn("relative group rounded-xl overflow-hidden border bg-muted/20", className)}>
                {isVideo ? (
                    <video src={value} className="w-full h-48 object-cover" controls />
                ) : (
                    <img src={value} alt="Uploaded" className="w-full h-48 object-cover" />
                )}

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => onChange('')}
                    >
                        <X className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => window.open(value, '_blank')}
                    >
                        View
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div
            onClick={() => inputRef.current?.click()}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            className={cn(
                "relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer hover:bg-muted/50",
                isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
                isUploading && "opacity-50 pointer-events-none",
                className
            )}
        >
            <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept={accept}
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />

            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                {isUploading ? (
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                ) : (
                    <Upload className="w-8 h-8" />
                )}
                <p className="text-sm font-medium">
                    {isUploading ? "Uploading..." : label}
                </p>
                <p className="text-xs">
                    Drag & drop or click to select
                </p>
            </div>
        </div>
    );
}
