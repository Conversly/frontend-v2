"use client";

export default function LeadsPage() {
  return (
    <div className="flex h-full flex-col bg-background">
      <div className="border-b bg-background px-6 py-4">
        <h1 className="type-section-title tracking-tight">Leads</h1>
        <p className="type-body-muted mt-0.5">
          Manage and track leads generated from conversations
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <p className="type-body-muted">Leads will be displayed here</p>
      </div>
    </div>
  );
}
