import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare } from "lucide-react";

interface TopicData {
  name: string;
  value: number;
  likes: number;
  dislikes: number;
  color: string;
}

interface TopicSummaryTableProps {
  topics: TopicData[];
  isLoading: boolean;
}

export function TopicSummaryTable({ topics, isLoading }: TopicSummaryTableProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center mb-3">
        <MessageSquare className="h-4 w-4 mr-2" />
        <h3 className="text-base font-semibold">Topic Summary</h3>
      </div>
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-1.5">
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3 text-xs font-medium">Topic</th>
                <th className="text-left py-2 px-3 text-xs font-medium">Messages</th>
                <th className="text-left py-2 px-3 text-xs font-medium">Likes</th>
                <th className="text-left py-2 px-3 text-xs font-medium">Dislikes</th>
                <th className="text-left py-2 px-3 text-xs font-medium">Engagement Rate</th>
              </tr>
            </thead>
            <tbody>
              {topics && topics.length > 0 ? (
                topics.map((topic, index) => {
                  const totalFeedback = topic.likes + topic.dislikes;
                  const engagementRate = topic.value > 0 ? ((totalFeedback / topic.value) * 100).toFixed(1) : '0.0';
                  
                  return (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="py-2 px-3">
                        <div className="flex items-center space-x-1.5">
                          <div 
                            className="w-2.5 h-2.5 rounded-full" 
                            style={{ backgroundColor: topic.color }}
                          />
                          <span className="text-xs font-medium">{topic.name}</span>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-xs font-medium">{topic.value}</td>
                      <td className="py-2 px-3">
                        <span className="text-xs text-green-600 font-medium">{topic.likes}</span>
                      </td>
                      <td className="py-2 px-3">
                        <span className="text-xs text-red-600 font-medium">{topic.dislikes}</span>
                      </td>
                      <td className="py-2 px-3 text-xs">{engagementRate}%</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-xs text-muted-foreground">
                    No topic data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

