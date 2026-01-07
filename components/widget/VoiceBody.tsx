import { Mic, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UIConfigInput } from "@/types/customization";

interface VoiceBodyProps {
    config: UIConfigInput;
    onEndCall: () => void;
}

export function VoiceBody({ config, onEndCall }: VoiceBodyProps) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8 bg-background">
            <div className="relative">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                        {config.PrimaryIcon ? (
                            <img
                                src={config.PrimaryIcon}
                                alt="Agent"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                        ) : (
                            <Mic className="w-10 h-10 text-primary" />
                        )}
                    </div>
                </div>
                <div className="absolute -bottom-2 right-1/2 translate-x-1/2 bg-green-500 text-[10px] text-white px-2 py-0.5 rounded-full whitespace-nowrap">
                    Listening...
                </div>
            </div>

            <div className="text-center space-y-2">
                <h3 className="font-semibold text-lg">{config.DisplayName || "Assistant"}</h3>
                <p className="text-sm text-muted-foreground">Go ahead, I'm listening.</p>
            </div>

            <div className="w-full flex justify-center pt-8">
                <Button
                    variant="destructive"
                    size="icon"
                    className="h-14 w-14 rounded-full shadow-lg"
                    onClick={onEndCall}
                >
                    <PhoneOff className="h-6 w-6" />
                </Button>
            </div>
        </div>
    );
}
