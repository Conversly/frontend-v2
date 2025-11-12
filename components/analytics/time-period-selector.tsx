import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface TimePeriodSelectorProps {
  selectedDays: number;
  onDaysChange: (days: number) => void;
  startDate?: string;
  endDate?: string;
}

export function TimePeriodSelector({
  selectedDays,
  onDaysChange,
  startDate,
  endDate,
}: TimePeriodSelectorProps) {
  return (
    <Card className="p-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center space-x-2">
          <Calendar className="h-3.5 w-3.5" />
          <span className="text-sm font-medium">Time Period:</span>
          <div className="flex space-x-1.5">
            <Button
              variant={selectedDays === 7 ? "default" : "outline"}
              size="sm"
              onClick={() => onDaysChange(7)}
              className="h-7 text-xs"
            >
              7 Days
            </Button>
            <Button
              variant={selectedDays === 30 ? "default" : "outline"}
              size="sm"
              onClick={() => onDaysChange(30)}
              className="h-7 text-xs"
            >
              30 Days
            </Button>
          </div>
        </div>
        {(startDate || endDate) && (
          <div className="text-xs text-muted-foreground">
            Data from {startDate} to {endDate}
          </div>
        )}
      </div>
    </Card>
  );
}

