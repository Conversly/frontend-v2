"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Loader2, Image as ImageIcon, FileVideo, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { uploadFile } from '@/lib/api/promote';

interface MediaUploadProps {
    onUpload: (url: string, type: 'image' | 'video') => void;
    className?: string;
}

export function MediaUpload({ onUpload, className }: MediaUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        // Validate file type
        if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
            toast.error('Invalid file type. Please upload an image or video.');
            return;
        }

        // Validate size (e.g., 50MB for videos, 5MB for images)
        const maxSize = file.type.startsWith('video/') ? 50 * 1024 * 1024 : 5 * 1024 * 1024;
        if (file.size > maxSize) {
            toast.error(`File too large. Max size is ${maxSize / 1024 / 1024}MB`);
            return;
        }

        setIsUploading(true);
        try {
            const { url } = await uploadFile(file);
            const type = file.type.startsWith('video/') ? 'video' : 'image';
            onUpload(url, type);
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

    return (
        <div className={cn("bg-card border border-border rounded-xl p-6", className)}>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Add Media</h3>
                    <p className="text-sm text-muted-foreground">
                        Upload images or videos to showcase your product.
                    </p>
                </div>
            </div>

            {/* Drag & Drop Zone */}
            <div
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onClick={() => {
                    if (!isUploading) {
                        inputRef.current?.click();
                    }
                }}
                className={cn(
                    "relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 cursor-pointer",
                    isUploading
                        ? "border-primary/50 bg-primary/5 cursor-not-allowed opacity-60"
                        : isDragging
                            ? "border-primary bg-primary/5"
                            : "border-border bg-muted/20 hover:border-primary/50 hover:bg-muted/30"
                )}
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
                                : 'Supported file types: png, jpg, gif, mp4, webm'
                            }
                        </p>
                    </div>
                </div>
                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept="image/*,video/*"
                    disabled={isUploading}
                    onChange={(e) => {
                        if (e.target.files?.length && !isUploading) {
                            handleFile(e.target.files[0]);
                        }
                    }}
                />
            </div>
        </div>
    );
}
