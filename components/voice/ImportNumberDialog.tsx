"use client";

import { useState } from "react";
import { useImportPhoneNumber } from "@/services/phone-number-service";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

interface ImportNumberDialogProps {
    botId: string;
}

export function ImportNumberDialog({ botId }: ImportNumberDialogProps) {
    const [open, setOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [accountSid, setAccountSid] = useState("");
    const [authToken, setAuthToken] = useState("");
    const [label, setLabel] = useState("");

    const importNumber = useImportPhoneNumber();

    const handleImport = async () => {
        if (!phoneNumber || !accountSid || !authToken) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            await importNumber.mutateAsync({
                botId,
                data: {
                    phoneNumber,
                    provider: 'TWILIO',
                    credentials: { accountSid, authToken },
                    label: label || undefined,
                },
            });

            toast.success("Phone number imported successfully");
            setOpen(false);
            // Reset form
            setPhoneNumber("");
            setAccountSid("");
            setAuthToken("");
            setLabel("");
        } catch (error) {
            console.error(error);
            toast.error("Failed to import phone number");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Import Twilio Number
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Import from Twilio</DialogTitle>
                    <DialogDescription>
                        Enter your Twilio phone number and credentials to connect it.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="phoneNumber">Twilio Phone Number</Label>
                        <Input
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="+1234567890"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="accountSid">Account SID</Label>
                        <Input
                            id="accountSid"
                            value={accountSid}
                            onChange={(e) => setAccountSid(e.target.value)}
                            placeholder="AC..."
                            type="password"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="authToken">Auth Token</Label>
                        <Input
                            id="authToken"
                            value={authToken}
                            onChange={(e) => setAuthToken(e.target.value)}
                            placeholder="Auth Token"
                            type="password"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="label">Label (Optional)</Label>
                        <Input
                            id="label"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            placeholder="Main Support Line"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleImport} disabled={importNumber.isPending}>
                        {importNumber.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Import Number
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
