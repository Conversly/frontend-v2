import { Card } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface TopicData {
  name: string;
  value: number;
  likes: number;
  dislikes: number;
  color: string;
}

interface TopicOverviewCardsProps {
  topics: TopicData[];
}

export function TopicOverviewCards({ topics }: TopicOverviewCardsProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Topics Overview</h3>
          <div className="text-right">
            <div className="text-xl font-bold">{topics.length}</div>
            <div className="text-xs text-muted-foreground">Total topics</div>
          </div>
        </div>
        <div className="space-y-2 max-h-[160px] overflow-y-auto">
          {topics.map((topic) => (
            <div key={topic.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-2.5 h-2.5 rounded-full shrink-0" 
                  style={{ backgroundColor: topic.color }}
                />
                <span className="text-xs font-medium truncate">{topic.name}</span>
              </div>
              <span className="text-xs font-semibold">{topic.value}</span>
            </div>
          ))}
        </div>
      </Card>

      {topics.slice(0, 2).map((topic) => (
        <Card key={topic.name} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground truncate">{topic.name}</p>
              <div className="text-xl font-bold">{topic.value}</div>
              <div className="flex items-center space-x-3 mt-1.5">
                <div className="flex items-center space-x-1 text-xs">
                  <ThumbsUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">{topic.likes}</span>
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  <ThumbsDown className="h-3 w-3 text-red-600" />
                  <span className="text-red-600">{topic.dislikes}</span>
                </div>
              </div>
            </div>
            <div 
              className="w-3.5 h-3.5 rounded-full shrink-0" 
              style={{ backgroundColor: topic.color }}
            />
          </div>
        </Card>
      ))}
    </div>
  );
}

