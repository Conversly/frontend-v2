import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Settings } from "lucide-react";

interface ControlsCardProps {
  selectedDays: number;
  onDaysChange: (days: number) => void;
  feedbackLimit: number;
  onFeedbackLimitChange: (limit: number) => void;
}

export function ControlsCard({
  selectedDays,
  onDaysChange,
  feedbackLimit,
  onFeedbackLimitChange,
}: ControlsCardProps) {
  return (
    <Card className="dashboard-toolbar p-3">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="dashboard-toolbar__group">
          <div className="flex items-center space-x-2">
            <Calendar className="h-3.5 w-3.5" />
            <span className="text-sm font-medium">Charts Period</span>
            <div className="flex space-x-1.5">
              <Button
                variant={selectedDays === 7 ? "default" : "outline"}
                size="sm"
                onClick={() => onDaysChange(7)}
                className="text-xs"
              >
                7 Days
              </Button>
              <Button
                variant={selectedDays === 30 ? "default" : "outline"}
                size="sm"
                onClick={() => onDaysChange(30)}
                className="text-xs"
              >
                30 Days
              </Button>
            </div>
          </div>
        </div>
        <div className="dashboard-toolbar__group">
          <div className="flex items-center space-x-2">
            <Settings className="h-3.5 w-3.5" />
            <span className="text-sm font-medium">Feedback Limit</span>
            <div className="flex space-x-1.5">
              <Button
                variant={feedbackLimit === 5 ? "default" : "outline"}
                size="sm"
                onClick={() => onFeedbackLimitChange(5)}
                className="text-xs"
              >
                5
              </Button>
              <Button
                variant={feedbackLimit === 10 ? "default" : "outline"}
                size="sm"
                onClick={() => onFeedbackLimitChange(10)}
                className="text-xs"
              >
                10
              </Button>
              <Button
                variant={feedbackLimit === 20 ? "default" : "outline"}
                size="sm"
                onClick={() => onFeedbackLimitChange(20)}
                className="text-xs"
              >
                20
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
