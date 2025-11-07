"use client";

import { Card } from "@/components/ui/card";

export default function TopicsPage() {
  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Topics</h1>
        <p className="text-muted-foreground">
          Analyze conversation topics and trending themes
        </p>
      </div>
      <Card className="p-6">
        <p className="text-muted-foreground">Topic analytics will be displayed here</p>
      </Card>
    </div>
  );
}
