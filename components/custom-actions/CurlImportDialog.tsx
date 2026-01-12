import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    parseCurlCommandEnhanced,
    ClassifiedHeader,
    ParsedCurlResult,
    headersToRecord
} from '@/utils/curlParser';
import { CustomActionConfig } from '@/types/customActions';
import { Terminal, AlertTriangle, Check, X, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
    onImport: (config: Partial<CustomActionConfig>, classifiedHeaders: ClassifiedHeader[]) => void;
}

export const CurlImportDialog: React.FC<Props> = ({ onImport }) => {
    const [open, setOpen] = useState(false);
    const [curlString, setCurlString] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [parseResult, setParseResult] = useState<ParsedCurlResult | null>(null);
    const [showBrowserHeaders, setShowBrowserHeaders] = useState(false);
    const [selectedHeaders, setSelectedHeaders] = useState<Set<string>>(new Set());

    const handleParse = () => {
        try {
            if (!curlString.trim()) {
                setError('Please enter a cURL command');
                return;
            }

            const result = parseCurlCommandEnhanced(curlString);
            setParseResult(result);
            setError(null);

            // Pre-select essential and optional headers
            const initialSelected = new Set(
                result.classifiedHeaders
                    .filter(h => h.category !== 'browser')
                    .map(h => h.key)
            );
            setSelectedHeaders(initialSelected);
        } catch (e) {
            setError('Failed to parse cURL command. Please check the syntax.');
            setParseResult(null);
        }
    };

    const handleImport = () => {
        if (!parseResult) return;

        // Build headers from selected only
        const selectedHeadersList = parseResult.classifiedHeaders.filter(
            h => selectedHeaders.has(h.key)
        );
        const headers = headersToRecord(selectedHeadersList);

        const config: Partial<CustomActionConfig> = {
            ...parseResult.config,
            headers,
        };

        onImport(config, parseResult.classifiedHeaders);
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
        setCurlString('');
        setError(null);
        setParseResult(null);
        setShowBrowserHeaders(false);
        setSelectedHeaders(new Set());
    };

    const toggleHeader = (key: string) => {
        setSelectedHeaders(prev => {
            const next = new Set(prev);
            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    };

    const essentialHeaders = parseResult?.classifiedHeaders.filter(h => h.category === 'essential') || [];
    const optionalHeaders = parseResult?.classifiedHeaders.filter(h => h.category === 'optional') || [];
    const browserHeaders = parseResult?.classifiedHeaders.filter(h => h.category === 'browser') || [];

    return (
        <Dialog open={open} onOpenChange={(isOpen) => isOpen ? setOpen(true) : handleClose()}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Terminal className="h-4 w-4" />
                    Import from cURL
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Import cURL Command</DialogTitle>
                    <DialogDescription>
                        Paste a cURL command to automatically configure the API details.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-hidden flex flex-col gap-4 py-4">
                    {!parseResult ? (
                        <>
                            <Textarea
                                placeholder="curl -X POST https://api.example.com/v1/users -H 'Authorization: Bearer token' -d '{...}'"
                                className="h-[200px] font-mono text-xs"
                                value={curlString}
                                onChange={(e) => setCurlString(e.target.value)}
                            />
                            {error && <p className="text-sm text-destructive">{error}</p>}
                        </>
                    ) : (
                        <ScrollArea className="flex-1 pr-4">
                            <div className="space-y-4">
                                {/* URL Preview */}
                                <div className="rounded-md bg-muted p-3">
                                    <div className="text-xs text-muted-foreground mb-1">Endpoint</div>
                                    <div className="font-mono text-sm break-all">
                                        <Badge variant="outline" className="mr-2">{parseResult.config.method}</Badge>
                                        {parseResult.config.baseUrl}{parseResult.config.endpoint}
                                    </div>
                                </div>

                                {/* Detected Variables */}
                                {parseResult.detectedVariables.length > 0 && (
                                    <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-3">
                                        <div className="text-xs text-muted-foreground mb-2">Detected Variables</div>
                                        <div className="flex flex-wrap gap-2">
                                            {parseResult.detectedVariables.map(v => (
                                                <Badge key={v} variant="secondary" className="font-mono">
                                                    {`{{${v}}}`}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Headers Section */}
                                <div className="space-y-3">
                                    <div className="text-sm font-medium">Headers to Import</div>

                                    {/* Essential Headers */}
                                    {essentialHeaders.length > 0 && (
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Check className="h-3 w-3 text-green-500" />
                                                Essential ({essentialHeaders.length})
                                            </div>
                                            {essentialHeaders.map(h => (
                                                <HeaderRow
                                                    key={h.key}
                                                    header={h}
                                                    selected={selectedHeaders.has(h.key)}
                                                    onToggle={() => toggleHeader(h.key)}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* Optional Headers */}
                                    {optionalHeaders.length > 0 && (
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <AlertTriangle className="h-3 w-3 text-yellow-500" />
                                                Optional ({optionalHeaders.length})
                                            </div>
                                            {optionalHeaders.map(h => (
                                                <HeaderRow
                                                    key={h.key}
                                                    header={h}
                                                    selected={selectedHeaders.has(h.key)}
                                                    onToggle={() => toggleHeader(h.key)}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* Browser Headers - Collapsed by default */}
                                    {browserHeaders.length > 0 && (
                                        <div className="space-y-2">
                                            <button
                                                type="button"
                                                onClick={() => setShowBrowserHeaders(!showBrowserHeaders)}
                                                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors w-full"
                                            >
                                                <X className="h-3 w-3 text-red-400" />
                                                <span>Browser headers ({browserHeaders.length}) - typically not needed</span>
                                                {showBrowserHeaders ? (
                                                    <ChevronUp className="h-3 w-3 ml-auto" />
                                                ) : (
                                                    <ChevronDown className="h-3 w-3 ml-auto" />
                                                )}
                                            </button>
                                            {showBrowserHeaders && (
                                                <div className="pl-4 space-y-2 border-l-2 border-muted">
                                                    {browserHeaders.map(h => (
                                                        <HeaderRow
                                                            key={h.key}
                                                            header={h}
                                                            selected={selectedHeaders.has(h.key)}
                                                            onToggle={() => toggleHeader(h.key)}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Summary */}
                                <div className="text-sm text-muted-foreground pt-2 border-t">
                                    {selectedHeaders.size} header{selectedHeaders.size !== 1 ? 's' : ''} will be imported
                                </div>
                            </div>
                        </ScrollArea>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={handleClose}>Cancel</Button>
                    {!parseResult ? (
                        <Button onClick={handleParse}>Parse cURL</Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setParseResult(null)}>
                                Edit cURL
                            </Button>
                            <Button onClick={handleImport}>
                                Import {selectedHeaders.size} Headers
                            </Button>
                        </div>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// Header row component
const HeaderRow: React.FC<{
    header: ClassifiedHeader;
    selected: boolean;
    onToggle: () => void;
}> = ({ header, selected, onToggle }) => (
    <div className="flex items-start gap-2 p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors">
        <Checkbox
            id={`header-${header.key}`}
            checked={selected}
            onCheckedChange={onToggle}
            className="mt-0.5"
        />
        <Label
            htmlFor={`header-${header.key}`}
            className="flex-1 cursor-pointer"
        >
            <div className="font-mono text-xs font-medium">{header.key}</div>
            <div className="font-mono text-xs text-muted-foreground truncate max-w-[400px]">
                {header.value}
            </div>
        </Label>
    </div>
);
