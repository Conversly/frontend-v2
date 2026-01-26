"use client";

import { Chart } from "react-google-charts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { CountryData, CountryDataPoint } from "@/types/analytics";

type CountryStat = { iso: string; conversations: number };

function toCountryStats(country?: CountryData): CountryStat[] {
  const points = (country?.data ?? []).filter(
    (p) => p.countryCode && p.countryCode !== "NaN"
  );

  return points.map((p) => ({
    iso: p.countryCode,
    conversations: p.conversations,
  }));
}

function sortDesc(a: CountryStat, b: CountryStat) {
  return b.conversations - a.conversations;
}

const GEO_OPTIONS = {
  colorAxis: { colors: ["#dae5ff", "#2563eb"] },
  backgroundColor: "transparent",
  datalessRegionColor: "#f5f5f5",
  defaultColor: "#f5f5f5",
  legend: "none",
  tooltip: { isHtml: true },
} as const;

interface CountryAnalyticsCardProps {
  country?: CountryData;
  isLoading: boolean;
}

export function CountryAnalyticsCard({
  country,
  isLoading,
}: CountryAnalyticsCardProps) {
  const stats = toCountryStats(country);
  const sorted = [...stats].sort(sortDesc);
  const top10 = sorted.slice(0, 10);
  const maxChats = top10.length ? top10[0]!.conversations : 0;

  const chartData: (string | number)[][] = [
    ["Country", "Conversations"],
    ...stats.map((item) => [item.iso, item.conversations]),
  ];

  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <CardTitle>Chats by country</CardTitle>
        <CardDescription>Conversation volume by region</CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        {isLoading ? (
          <div className="flex flex-col lg:flex-row gap-8">
            <Skeleton className="w-full lg:w-7/12 h-[400px]" />
            <div className="w-full lg:w-5/12 space-y-3">
              <Skeleton className="h-4 w-1/2" />
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </div>
        ) : stats.length === 0 ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            No data available.
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Map */}
            <div className="w-full lg:w-7/12 min-h-[400px]">
              <Chart
                chartType="GeoChart"
                width="100%"
                height="400px"
                data={chartData}
                options={GEO_OPTIONS}
              />
            </div>

            {/* Top-10 list */}
            <div className="w-full lg:w-5/12">
              <div className="mb-4 flex justify-between text-sm font-medium text-muted-foreground">
                <span>Country</span>
                <span>Conversations</span>
              </div>

              <div className="space-y-4">
                {top10.map((item) => (
                  <div key={item.iso} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-foreground">
                        {item.iso}
                      </span>
                      <span className="text-muted-foreground">
                        {item.conversations}
                      </span>
                    </div>
                    <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full transition-all duration-500"
                        style={{
                          width: `${maxChats ? (item.conversations / maxChats) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

