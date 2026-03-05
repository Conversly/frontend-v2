import * as React from "react";
import { Info } from "@mui/icons-material";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function InfoTooltip({ content }: { content: string }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Info sx={{ fontSize: 14, color: "var(--muted-foreground)", cursor: "help" }} />
                </TooltipTrigger>
                <TooltipContent>
                    <p className="max-w-xs text-sm">{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
