
import { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Upload, FileText, AlertTriangle, Check, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Papa from 'papaparse';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { bulkImportContacts } from '@/lib/api/contacts';

interface CsvImportDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    chatbotId: string;
    onSuccess: () => void;
}

interface ParsedRow {
    phone?: string;
    name?: string;
    email?: string;
    [key: string]: any;
}

interface ValidationWarning {
    row: number;
    message: string;
    type: 'phone' | 'email' | 'other';
}

export function CsvImportDialog({ open, onOpenChange, chatbotId, onSuccess }: CsvImportDialogProps) {
    const [step, setStep] = useState<'upload' | 'preview' | 'uploading'>('upload');
    const [file, setFile] = useState<File | null>(null);
    const [previewData, setPreviewData] = useState<ParsedRow[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);
    const [warnings, setWarnings] = useState<ValidationWarning[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const resetState = () => {
        setStep('upload');
        setFile(null);
        setPreviewData([]);
        setHeaders([]);
        setWarnings([]);
        setIsProcessing(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            resetState();
        }
        onOpenChange(newOpen);
    };

    const validatePhone = (phone: string): boolean => {
        const cleaned = phone.replace(/[\s\+\-\(\)]/g, '');
        return /^\d{8,15}$/.test(cleaned);
    };

    const processFile = (selectedFile: File) => {
        // 1. Basic File Validation
        if (!selectedFile.name.endsWith('.csv')) {
            toast.error('File must be a .csv file');
            return;
        }
        if (selectedFile.size > 20 * 1024 * 1024) { // 20MB
            toast.error('File size must be under 20MB');
            return;
        }

        setFile(selectedFile);
        setIsProcessing(true);

        Papa.parse(selectedFile, {
            header: true,
            skipEmptyLines: true,
            preview: 50, // Sample only first 50 rows
            complete: (results) => {
                const parsedHeaders = results.meta.fields || [];
                const rows = results.data as any[];

                // 2. Header Validation
                const lowerHeaders = parsedHeaders.map(h => h.toLowerCase());
                const hasPhone = lowerHeaders.includes('phone');

                if (!hasPhone) {
                    toast.error('CSV must contain a "phone" column');
                    setFile(null);
                    setIsProcessing(false);
                    return;
                }

                const knownHeaders = ['phone', 'name', 'email'];
                const unknownHeaders = parsedHeaders.filter(h => !knownHeaders.includes(h.toLowerCase()));
                const newWarnings: ValidationWarning[] = [];

                if (unknownHeaders.length > 0) {
                    newWarnings.push({
                        row: 0,
                        message: `Unknown columns found: ${unknownHeaders.join(', ')}.`,
                        type: 'other'
                    });
                }

                // 3. Row Sampling & Validation
                rows.forEach((row, index) => {
                    // Find the phone column key (could be "Phone", "phone", "PHONE")
                    const phoneKey = Object.keys(row).find(k => k.toLowerCase() === 'phone');
                    const phoneVal = phoneKey ? row[phoneKey] : '';

                    if (!phoneVal || !validatePhone(String(phoneVal))) {
                        newWarnings.push({
                            row: index + 1,
                            message: `Invalid phone format: "${phoneVal}"`,
                            type: 'phone'
                        });
                    }
                });

                setHeaders(parsedHeaders);
                setPreviewData(rows);
                setWarnings(newWarnings);
                setStep('preview');
                setIsProcessing(false);
            },
            error: (error) => {
                toast.error(`Failed to parse CSV: ${error.message}`);
                setFile(null);
                setIsProcessing(false);
            }
        });
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            processFile(e.target.files[0]);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files?.[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setStep('uploading');

        try {
            // 1. Upload to Vercel Blob
            const uploadRes = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
                method: 'POST',
                body: file,
            });

            if (!uploadRes.ok) throw new Error('Failed to upload file');

            const blob = await uploadRes.json();

            // 2. Notify Backend (new contacts API)
            await bulkImportContacts({
                chatbotId,
                fileUrl: blob.url,
                originalFileName: file.name,
            });

            toast.success('Import started successfully');
            onSuccess();
            handleOpenChange(false);
        } catch (error: any) {
            toast.error(error.message || 'Import failed');
            setStep('preview'); // Go back to preview on error
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Import Contacts via CSV</DialogTitle>
                    <DialogDescription>
                        Upload a CSV file with your contacts.
                    </DialogDescription>
                </DialogHeader>

                {step === 'upload' && (
                    <div className="space-y-6">
                        <div
                            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="bg-primary/10 p-4 rounded-full mb-4">
                                <Upload className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="font-semibold text-lg mb-1">Click to upload or drag and drop</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                CSV file up to 20MB
                            </p>
                            <input
                                type="file"
                                accept=".csv"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                            />
                            {isProcessing && <Loader2 className="w-6 h-6 animate-spin text-primary mt-4" />}
                        </div>

                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-left">
                            <h4 className="font-medium text-sm text-slate-900 mb-3 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-slate-500" />
                                CSV Format Guidelines
                            </h4>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Required Columns</span>
                                        <ul className="text-sm text-slate-600 space-y-1">
                                            <li className="flex items-start gap-2">
                                                <code className="text-xs bg-white px-1.5 py-0.5 rounded border font-mono text-slate-700">phone</code>
                                                <span className="text-xs">Must include country code (e.g. 15551234567)</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Optional Columns</span>
                                        <ul className="text-sm text-slate-600 space-y-1">
                                            <li className="flex items-center gap-2">
                                                <code className="text-xs bg-white px-1.5 py-0.5 rounded border font-mono text-slate-700">name</code>
                                                <span className="text-xs">Contact display name</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <code className="text-xs bg-white px-1.5 py-0.5 rounded border font-mono text-slate-700">email</code>
                                                <span className="text-xs">Email address</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Common Mistakes</span>
                                    <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
                                        <li>File headers are <strong>case-sensitive</strong> (use lowercase)</li>
                                        <li>Phone numbers must be digits only (no spaces/dashes)</li>
                                        <li>Ensure file is strictly CSV format</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 'preview' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-100 p-2 rounded">
                                    <FileText className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-sm">{file?.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {(file?.size ? (file.size / 1024).toFixed(1) : 0)} KB • {headers.length} Columns
                                    </p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={resetState}>
                                Change
                            </Button>
                        </div>

                        <div className="rounded-md border h-[200px]">
                            <ScrollArea className="h-full w-full">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            {headers.map((h, i) => (
                                                <TableHead key={i} className="text-xs h-9">{h}</TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {previewData.slice(0, 5).map((row, i) => (
                                            <TableRow key={i}>
                                                {headers.map((h, j) => (
                                                    <TableCell key={j} className="text-xs py-2 whitespace-nowrap">
                                                        {row[h]}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        </div>

                        {warnings.length > 0 && (
                            <Alert variant="destructive" className="bg-amber-50 border-amber-200 text-amber-800">
                                <AlertTriangle className="h-4 w-4 text-amber-600 !text-amber-600" />
                                <AlertTitle className="text-amber-800">Validation Warnings</AlertTitle>
                                <AlertDescription className="text-amber-700 text-xs">
                                    Found {warnings.length} issues in the first 50 rows.
                                    {warnings.slice(0, 2).map((w, i) => (
                                        <div key={i} className="mt-1">• {w.message} (Row {w.row})</div>
                                    ))}
                                    {warnings.length > 2 && <div className="mt-1 italic">+ {warnings.length - 2} more...</div>}
                                </AlertDescription>
                            </Alert>
                        )}

                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-xs text-blue-700">
                            <p className="font-medium mb-1">Note:</p>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Required column: <b>phone</b></li>
                                <li>Optional columns: <b>name, email</b></li>
                            </ul>
                        </div>
                    </div>
                )}

                {step === 'uploading' && (
                    <div className="py-12 flex flex-col items-center justify-center space-y-4">
                        <Loader2 className="w-10 h-10 animate-spin text-primary" />
                        <div className="text-center">
                            <p className="font-medium">Uploading contacts...</p>
                            <p className="text-sm text-muted-foreground">This may take a moment.</p>
                        </div>
                    </div>
                )}

                <DialogFooter>
                    {step === 'upload' && (
                        <Button variant="outline" onClick={() => handleOpenChange(false)}>Cancel</Button>
                    )}
                    {step === 'preview' && (
                        <>
                            <Button variant="outline" onClick={() => handleOpenChange(false)}>Cancel</Button>
                            <Button onClick={handleUpload}>
                                {warnings.length > 0 ? 'Import Anyway' : 'Import Contacts'}
                            </Button>
                        </>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
