"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Search, Calendar as CalendarIcon, Filter, X } from "lucide-react";
import { useGetLeadsInfinite } from "@/services/leads";
import { useTopicsQuery } from "@/services/chatbot";
import { cn } from "@/lib/utils";

// Source options based on types
const SOURCE_OPTIONS = [
  { value: "WIDGET", label: "Widget" },
  { value: "WHATSAPP", label: "WhatsApp" },
  { value: "VOICE", label: "Voice" },
  { value: "SMS", label: "SMS" },
];

export default function LeadsPage() {
  const params = useParams();
  const chatbotId = params.botId as string;

  // 1. Filter State
  const [search, setSearch] = useState("");
  const [topicId, setTopicId] = useState<string>("ALL");
  const [source, setSource] = useState<string>("ALL");

  // Date Filters
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Debounce search
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  // 2. Data Fetching
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetLeadsInfinite({
    chatbotId,
    limit: 20,
    search: debouncedSearch || undefined,
    topicId: topicId === "ALL" ? undefined : topicId,
    source: source === "ALL" ? undefined : (source as any),
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  const { data: topics } = useTopicsQuery(chatbotId);

  // Flatten pages
  const leads = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  // 3. Infinite Scroll
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Handlers
  const clearFilters = () => {
    setSearch("");
    setTopicId("ALL");
    setSource("ALL");
    setStartDate("");
    setEndDate("");
  };

  const hasActiveFilters =
    search !== "" ||
    topicId !== "ALL" ||
    source !== "ALL" ||
    startDate !== "" ||
    endDate !== "";

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-background px-6 py-4 space-y-4">
        <div>
          <h1 className="type-section-title tracking-tight">Leads</h1>
          <p className="type-body-muted mt-0.5">
            Manage and track leads generated from conversations
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          {/* Search */}
          <div className="w-full md:w-64 space-y-1.5">
            <Label className="text-xs text-muted-foreground">Search</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search name, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
          </div>

          <Separator orientation="vertical" className="hidden md:block h-8 mx-2" />

          {/* Source Filter */}
          <div className="w-full md:w-40 space-y-1.5">
            <Label className="text-xs text-muted-foreground">Source</Label>
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="All Sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Sources</SelectItem>
                {SOURCE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Topic Filter */}
          <div className="w-full md:w-40 space-y-1.5">
            <Label className="text-xs text-muted-foreground">Topic</Label>
            <Select value={topicId} onValueChange={setTopicId}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="All Topics" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Topics</SelectItem>
                {topics?.map((topic) => (
                  <SelectItem key={topic.id} value={topic.id}>
                    {topic.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator orientation="vertical" className="hidden md:block h-8 mx-2" />

          {/* Date Range - Simplified using native input type="date" */}
          <div className="flex items-center gap-2">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">From</Label>
              <div className="relative">
                <Input
                  type="date"
                  className="h-9 w-36 px-2 text-sm"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">To</Label>
              <div className="relative">
                <Input
                  type="date"
                  className="h-9 w-36 px-2 text-sm"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-9 px-2 text-muted-foreground hover:text-foreground ml-auto md:ml-0"
            >
              <X className="w-4 h-4 mr-1" /> Clear
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    Loading leads...
                  </TableCell>
                </TableRow>
              ) : leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    No leads found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>{lead.email || "-"}</TableCell>
                    <TableCell>{lead.phoneNumber || "-"}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{lead.source}</Badge>
                    </TableCell>
                    <TableCell>
                      {lead.topicName ? (
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-none">
                          {lead.topicName}
                        </Badge>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {format(new Date(lead.createdAt), "MMM d, yyyy h:mm a")}
                    </TableCell>
                  </TableRow>
                ))
              )}
              {isFetchingNextPage && (
                <TableRow>
                  <TableCell colSpan={6} className="h-12 text-center text-muted-foreground text-sm">
                    Loading more...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Infinite Scroll Sentinel */}
        <div ref={observerTarget} className="h-4 w-full" />
      </div>
    </div>
  );
}
