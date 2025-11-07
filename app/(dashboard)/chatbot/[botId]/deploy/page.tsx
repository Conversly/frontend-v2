"use client";

import { Card } from "@/components/ui/card";

export default function DeployPage() {
  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Deploy</h1>
        <p className="text-muted-foreground">
          Deploy your chatbot to various platforms and channels
        </p>
      </div>
      <Card className="p-6">
        <p className="text-muted-foreground">Deployment options will be displayed here</p>
      </Card>
    </div>
  );
}
