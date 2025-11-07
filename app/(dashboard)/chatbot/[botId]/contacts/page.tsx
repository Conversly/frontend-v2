"use client";

import { Card } from "@/components/ui/card";

export default function ContactsPage() {
  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
        <p className="text-muted-foreground">
          Manage and organize your contact list
        </p>
      </div>
      <Card className="p-6">
        <p className="text-muted-foreground">Contacts list will be displayed here</p>
      </Card>
    </div>
  );
}
