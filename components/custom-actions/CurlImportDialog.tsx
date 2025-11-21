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
import { parseCurlCommand } from '@/utils/curlParser';
import { CustomActionConfig } from '@/types/customActions';
import { Terminal } from 'lucide-react';

interface Props {
    onImport: (config: Partial<CustomActionConfig>) => void;
}

export const CurlImportDialog: React.FC<Props> = ({ onImport }) => {
    const [open, setOpen] = useState(false);
    const [curlString, setCurlString] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleImport = () => {
        try {
            if (!curlString.trim()) {
                setError('Please enter a cURL command');
                return;
            }

            const config = parseCurlCommand(curlString);
            onImport(config);
            setOpen(false);
            setCurlString('');
            setError(null);
        } catch (e) {
            setError('Failed to parse cURL command. Please check the syntax.');
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Terminal className="h-4 w-4" />
                    Import from cURL
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Import cURL Command</DialogTitle>
                    <DialogDescription>
                        Paste a cURL command to automatically configure the API details.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Textarea
                        placeholder="curl -X POST https://api.example.com/v1/users -H 'Authorization: Bearer token' -d '{...}'"
                        className="h-[200px] font-mono text-xs"
                        value={curlString}
                        onChange={(e) => setCurlString(e.target.value)}
                    />
                    {error && <p className="text-sm text-destructive">{error}</p>}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleImport}>Import Configuration</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
