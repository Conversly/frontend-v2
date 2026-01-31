import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, ThumbsUp, Calendar } from "lucide-react";
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { chartsGridClasses } from '@mui/x-charts/ChartsGrid';


interface ChartsSectionProps {
  chartsData?: {
    messagesPerDay?: Array<{ date: string; count: number }>;
    conversationsPerDay?: Array<{ date: string; count: number }>;
  };
  chartsLoading: boolean;
  feedbackDistribution: { likes: number; dislikes: number; none: number };
  feedbacksLoading: boolean;
  formatDate: (dateString: string) => string;
}

export function ChartsSection({
  chartsData,
  chartsLoading,
  feedbackDistribution,
  feedbacksLoading,
  formatDate,
}: ChartsSectionProps) {

  // Prepare Data for MUI Charts
  // MUI X Charts prefers a dataset array and keys for series
  const messagesData = chartsData?.messagesPerDay?.map(item => ({
    date: new Date(item.date),
    dateStr: formatDate(item.date),
    count: item.count
  })) || [];

  const conversationsData = chartsData?.conversationsPerDay?.map(item => ({
    date: new Date(item.date),
    dateStr: formatDate(item.date),
    count: item.count
  })) || [];

  const pieData = [
    { id: 0, value: feedbackDistribution.likes, label: 'Likes', color: '#22c55e' }, // green-500
    { id: 1, value: feedbackDistribution.dislikes, label: 'Dislikes', color: '#ef4444' }, // red-500
    { id: 2, value: feedbackDistribution.none, label: 'No Feedback', color: '#94a3b8' }, // slate-400
  ].filter(item => item.value > 0); // Optional: hide empty segments

  const chartSetting = {
    yAxis: [
      {
        label: '',
      },
    ],
    grid: { horizontal: true },
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
      [`.${chartsGridClasses.line}`]: { strokeDasharray: '3 3', stroke: '#e2e8f0' },
      "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
        fill: "#64748b",
        fontSize: "0.75rem"
      },
      "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
        fill: "#64748b",
        fontSize: "0.75rem"
      },
      "& .MuiAreaElement-root": {
        fillOpacity: 0.25,
      },
    },
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      {/* Messages per Day - Area Chart (LineChart with area) */}
      <Card className="col-span-4 shadow-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            Total Income
          </CardTitle>
          <CardDescription>
            Weekly report overview
          </CardDescription>
        </CardHeader>
        <CardContent>
          {chartsLoading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <div className="w-full h-[300px]">
              <LineChart
                dataset={messagesData}
                xAxis={[{
                  scaleType: 'point',
                  dataKey: 'dateStr',
                  tickLabelStyle: {
                    fontSize: 12,
                  }
                }]}
                series={[
                  {
                    dataKey: 'count',
                    area: true,
                    showMark: false,
                    color: '#0ea5e9', // sky-500
                    connectNulls: true,
                  },
                ]}
                {...chartSetting}
                margin={{ left: 30, right: 10, top: 10, bottom: 20 }}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Feedback Distribution - Pie Chart */}
      <Card className="col-span-3 flex flex-col shadow-sm border-border/50">
        <CardHeader className="items-center pb-0">
          <CardTitle className="flex items-center gap-2">
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            Feedback
          </CardTitle>
          <CardDescription>User satisfaction overview</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 min-h-[300px] flex items-center justify-center">
          {feedbacksLoading ? (
            <Skeleton className="h-[200px] w-[200px] rounded-full" />
          ) : (
            <div className="w-full h-[250px] flex justify-center">
              <PieChart
                series={[
                  {
                    data: pieData,
                    innerRadius: 60,
                    outerRadius: 100,
                    paddingAngle: 2,
                    cornerRadius: 4,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  },
                ]}
                slotProps={{
                  legend: {

                    position: { vertical: 'bottom', horizontal: 'center' },


                  }
                }}
                margin={{ top: 0, bottom: 40, left: 0, right: 0 }}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Conversations - Bar Chart */}
      <Card className="col-span-7 shadow-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            Conversations
          </CardTitle>
          <CardDescription>Volume trend</CardDescription>
        </CardHeader>
        <CardContent>
          {chartsLoading ? (
            <Skeleton className="h-[250px] w-full" />
          ) : (
            <div className="h-[300px] w-full">
              <BarChart
                dataset={conversationsData}
                xAxis={[{
                  scaleType: 'band',
                  dataKey: 'dateStr',
                  categoryGapRatio: 0.4
                }]}
                series={[{
                  dataKey: 'count',
                  color: '#0ea5e9', // sky-500

                }]}
                {...chartSetting}
                borderRadius={6}
                margin={{ left: 30, right: 10, top: 10, bottom: 20 }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
