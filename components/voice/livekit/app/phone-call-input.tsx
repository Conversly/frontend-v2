
import * as React from 'react';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface PhoneCallInputProps {
    onCall: (phoneNumber: string) => void;
    isLoading: boolean;
    disabled?: boolean;
}

export function PhoneCallInput({ onCall, isLoading, disabled }: PhoneCallInputProps) {
    const [phoneNumber, setPhoneNumber] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (phoneNumber) {
            onCall(phoneNumber);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-2">
                <Input
                    type="tel"
                    placeholder="Enter phone number (e.g. +1234567890)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={disabled || isLoading}
                    className="h-10 text-center text-lg"
                    required
                />
            </div>
            <Button
                type="submit"
                disabled={disabled || isLoading || !phoneNumber}
                className={cn(
                    "w-full h-12 text-base font-semibold transition-all",
                    isLoading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"
                )}
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Connecting...
                    </span>
                ) : (
                    <span className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Call Phone
                    </span>
                )}
            </Button>
        </form>
    );
}
