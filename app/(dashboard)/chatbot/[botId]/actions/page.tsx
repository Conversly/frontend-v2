"use client";

import { Card } from "@/components/ui/card";

export default function ActionsPage() {
  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Actions</h1>
        <p className="text-muted-foreground">
          Configure automated actions and integrations
        </p>
      </div>
      <Card className="p-6">
        <p className="text-muted-foreground">Actions configuration will be displayed here</p>
      </Card>
    </div>
  );
}
