"use client";

import { Card } from "@/components/ui/card";

export default function SentimentPage() {
  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Sentiment Analysis</h1>
        <p className="text-muted-foreground">
          Track user sentiment and satisfaction levels
        </p>
      </div>
      <Card className="p-6">
        <p className="text-muted-foreground">Sentiment analytics will be displayed here</p>
      </Card>
    </div>
  );
}
