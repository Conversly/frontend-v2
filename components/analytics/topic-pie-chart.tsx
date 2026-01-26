"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart as PieChartIcon } from "lucide-react";
import { PieChart } from '@mui/x-charts/PieChart';
import { useMemo, useState } from "react";

interface TopicData {
  name: string;
  value: number;
  likes: number;
  dislikes: number;
  color: string;
  [key: string]: string | number;
}

interface TopicPieChartProps {
  topics: TopicData[];
  isLoading: boolean;
  showCard?: boolean;
}

export function TopicPieChart({ topics, isLoading, showCard = true }: TopicPieChartProps) {
  const [hoveredTopicName, setHoveredTopicName] = useState<string | null>(null);

  const chartData = useMemo(() => {
    if (!topics || topics.length === 0) return [];
    const sortedTopics = [...topics].sort((a, b) => b.value - a.value);
    return sortedTopics.map((topic, index) => ({
      id: index,
      value: topic.value,
      label: topic.name,
      color: topic.color,
    }));
  }, [topics]);

  const chart = (
    <CardContent className="flex-1 min-h-[300px] flex items-center justify-center">
      {isLoading ? (
        <Skeleton className="h-[250px] w-[250px] rounded-full" />
      ) : (
        <div className="w-full h-[300px] flex items-center justify-center overflow-hidden">
          {chartData.length > 0 ? (
            <PieChart
              series={[
                {
                  data: chartData,
                  innerRadius: 30,
                  outerRadius: 110,
                  paddingAngle: 2,
                  cornerRadius: 4,
                  highlightScope: { fade: "global", highlight: "item" },
                  faded: {
                    innerRadius: 20,
                    additionalRadius: -20,
                    color: "gray",
                  },
                },
              ]}
              width={340}
              height={260}
              hideLegend
              onHighlightChange={(item) => {
                if (!item) return setHoveredTopicName(null);
                const label = chartData[item.dataIndex ?? -1]?.label;
                setHoveredTopicName(label ?? null);
              }}
              margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
            />
          ) : (
            <div className="flex items-center justify-center text-muted-foreground text-sm">
              No data available
            </div>
          )}
        </div>
      )}
    </CardContent>
  );

  if (!showCard) return chart;

  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChartIcon className="h-4 w-4 text-muted-foreground" />
          Topic Distribution
        </CardTitle>
        <CardDescription>
          Message volume by topic
          {hoveredTopicName ? (
            <span className="ml-2 text-foreground/80">
              · Hover: <span className="font-medium">{hoveredTopicName}</span>
            </span>
          ) : null}
        </CardDescription>
      </CardHeader>
      {chart}
    </Card>
  );
}
