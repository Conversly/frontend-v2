"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useGetTickets } from "@/services/tickets";
import { TicketStatus } from "@/types/tickets";
import { formatDistanceToNow } from "date-fns";
import { Search, Plus, History, ChevronLeft, ChevronRight } from "lucide-react";

import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mapping internal tabs to API status
type TabValue = "ALL" | TicketStatus | "PENDING"; // PENDING maps to PENDING_USER for now
const TABS: { label: string; value: TabValue }[] = [
    { label: "All", value: "ALL" },
    { label: "Open", value: "OPEN" },
    { label: "Pending", value: "PENDING" },
    { label: "Resolved", value: "RESOLVED" },
    { label: "Closed", value: "CLOSED" },
];

export default function TicketsOverviewPage() {
    const params = useParams<{ workspaceId: string; botId: string }>();
    const workspaceId = Array.isArray(params.workspaceId) ? params.workspaceId[0] : params.workspaceId;

    const [activeTab, setActiveTab] = useState<TabValue>("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const limit = 20;

    // Resolve API status from tab
    const getApiStatus = (): TicketStatus | undefined => {
        if (activeTab === "ALL") return undefined;
        if (activeTab === "PENDING") return "PENDING_USER";
        return activeTab as TicketStatus;
    };

    const { data: ticketsData, isLoading } = useGetTickets({
        workspaceId,
        status: getApiStatus(),
        search: searchQuery,
        page,
        limit,
    });

    const tickets = ticketsData?.data || [];
    const totalTickets = ticketsData?.total || 0;
    const totalPages = Math.ceil(totalTickets / limit);

    // Badge Style Helper
    const getStatusBadgeStyles = (status: TicketStatus) => {
        switch (status) {
            case "OPEN":
                return "bg-blue-100/80 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-none";
            case "PENDING_USER":
            case "PENDING_INTERNAL":
                return "bg-amber-100/80 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-none";
            case "RESOLVED":
                return "bg-emerald-100/80 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-none";
            case "CLOSED":
                return "bg-slate-100/80 text-slate-700 dark:bg-slate-800/50 dark:text-slate-400 border-none";
            default:
                return "bg-muted text-muted-foreground border-transparent";
        }
    };

    const getStatusLabel = (status: TicketStatus) => {
        switch (status) {
            case "OPEN": return "Open";
            case "PENDING_USER":
            case "PENDING_INTERNAL": return "Pending";
            case "RESOLVED": return "Resolved";
            case "CLOSED": return "Closed";
            default: return status;
        }
    };

    return (
        <div className="flex flex-col h-full bg-background p-6 max-w-[1280px] mx-auto w-full gap-6 overflow-y-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Ticket Overview</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Managing all incoming support requests
                    </p>
                </div>
                <Button className="bg-primary text-primary-foreground font-medium rounded-md px-4 py-2 hover:opacity-90 transition-opacity">
                    <Plus className="h-4 w-4 mr-2" />
                    New Ticket
                </Button>
            </div>

            {/* Tabs & Search */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto hidescrollbar">
                    {TABS.map((tab) => {
                        const isActive = activeTab === tab.value;
                        return (
                            <button
                                key={tab.value}
                                onClick={() => {
                                    setActiveTab(tab.value);
                                    setPage(1);
                                }}
                                className={cn(
                                    "px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors border",
                                    isActive
                                        ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white"
                                        : "bg-background text-foreground border-border hover:bg-[--surface-secondary]"
                                )}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                <div className="relative w-full sm:w-64 shrink-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search email or ID..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setPage(1);
                        }}
                        className="pl-9 bg-[--input-background] border-border"
                    />
                </div>
            </div>

            {/* Main Table Card */}
            <div className="bg-card border border-border mt-2 rounded-xl shadow-card overflow-hidden flex flex-col min-h-[400px]">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-[120px] font-bold text-xs tracking-wider text-muted-foreground uppercase">Ticket ID</TableHead>
                            <TableHead className="font-bold text-xs tracking-wider text-muted-foreground uppercase">Subject</TableHead>
                            <TableHead className="font-bold text-xs tracking-wider text-muted-foreground uppercase">Requester</TableHead>
                            <TableHead className="w-[120px] font-bold text-xs tracking-wider text-muted-foreground uppercase">Status</TableHead>
                            <TableHead className="w-[180px] font-bold text-xs tracking-wider text-muted-foreground uppercase">Assigned Agent</TableHead>
                            <TableHead className="w-[140px] font-bold text-xs tracking-wider text-muted-foreground uppercase text-right">Last Updated</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                                    Loading tickets...
                                </TableCell>
                            </TableRow>
                        ) : tickets.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                                    No tickets found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            tickets.map((ticket) => (
                                <TableRow key={ticket.id} className="group hover:bg-[--surface-secondary] transition-colors cursor-pointer">
                                    <TableCell className="font-medium text-primary">
                                        #{ticket.id.slice(0, 8)}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-foreground truncate max-w-[250px] lg:max-w-[400px]">
                                                {ticket.subject || "No Subject"}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-foreground">
                                        {ticket.contact?.email || ticket.contact?.displayName || "Unknown User"}
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={cn("font-medium", getStatusBadgeStyles(ticket.status))}>
                                            {getStatusLabel(ticket.status)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {ticket.assignedAgent ? (
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarImage src={ticket.assignedAgent.avatarUrl || undefined} />
                                                    <AvatarFallback className="text-[10px] bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                                                        {ticket.assignedAgent.displayName?.[0]?.toUpperCase() || "A"}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium text-foreground truncate max-w-[120px]">
                                                    {ticket.assignedAgent.displayName}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground italic text-sm">Unassigned</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-right whitespace-nowrap">
                                        {ticket.updatedAt ? formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true }) : "-"}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Footer Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-2 gap-4 pb-4">
                <p className="text-sm text-muted-foreground">
                    Showing <span className="font-semibold text-foreground">{tickets.length > 0 ? (page - 1) * limit + 1 : 0} - {Math.min(page * limit, totalTickets)}</span> of <span className="font-semibold text-foreground">{totalTickets}</span> tickets
                </p>

                <div className="flex items-center gap-4">
                    <Button variant="outline" className="text-sm font-medium border-border hover:bg-[--surface-secondary]">
                        <History className="h-4 w-4 mr-2" />
                        View Activity Log
                    </Button>

                    <div className="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-border"
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-border"
                            disabled={page >= totalPages || totalPages === 0}
                            onClick={() => setPage(page + 1)}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
