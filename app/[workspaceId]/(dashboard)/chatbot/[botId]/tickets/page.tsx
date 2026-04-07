"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetTickets, useGetTicketCounts, useAssignTicket, useResolveTicket, useCloseTicket, useUpdateTicket } from "@/services/tickets";
import { useGetWorkspaceMembers } from "@/services/workspace";
import { TicketStatus, TicketPriority } from "@/types/tickets";
import { useDebounce } from "@/hooks/use-debounce";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { Search, Plus, History, ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const TAB_BADGE_STYLES: Partial<Record<TabValue, string>> = {
    ALL: "dashboard-status-chip dashboard-status-chip--neutral",
    OPEN: "dashboard-status-chip dashboard-status-chip--info",
    PENDING: "dashboard-status-chip dashboard-status-chip--warning",
    RESOLVED: "dashboard-status-chip dashboard-status-chip--success",
    CLOSED: "dashboard-status-chip dashboard-status-chip--neutral",
};

export default function TicketsOverviewPage() {
    const params = useParams<{ workspaceId: string; botId: string }>();
    const workspaceId = Array.isArray(params.workspaceId) ? params.workspaceId[0] : params.workspaceId;
    const botId = Array.isArray(params.botId) ? params.botId[0] : params.botId;
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<TabValue>("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearch = useDebounce(searchQuery, 400);
    const [page, setPage] = useState(1);
    const limit = 15;

    // Sort parameters
    type SortField = 'id' | 'status' | 'assignedAgentUserId' | 'updatedAt' | 'priority';
    const [sortField, setSortField] = useState<SortField>('updatedAt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    // Premium UI: Keyboard shortcut focus tracking
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);

    // Resolve API status from tab
    const getApiStatus = (): TicketStatus | undefined => {
        if (activeTab === "ALL") return undefined;
        if (activeTab === "PENDING") return "PENDING_USER";
        return activeTab as TicketStatus;
    };

    const { data: countsData } = useGetTicketCounts(workspaceId);

    const { data: ticketsData, isLoading } = useGetTickets({
        workspaceId,
        status: getApiStatus(),
        search: debouncedSearch,
        page,
        limit,
        sort: sortField,
        order: sortOrder,
    });

    const { data: workspaceMembersData } = useGetWorkspaceMembers(workspaceId);
    const workspaceMembers = workspaceMembersData || [];

    const assignTicketMutation = useAssignTicket();
    const resolveTicketMutation = useResolveTicket();
    const closeTicketMutation = useCloseTicket();
    const updateTicketMutation = useUpdateTicket();
    const { toast } = useToast();

    // Handlers
    const handleAssign = (ticketId: string, agentUserId: string) => {
        assignTicketMutation.mutate({ ticketId, input: { agentUserId } }, {
            onSuccess: () => toast({ title: "Ticket assigned" })
        });
    };

    const handleResolve = (ticketId: string) => {
        resolveTicketMutation.mutate(ticketId, {
            onSuccess: () => toast({ title: "Ticket resolved" })
        });
    };

    const handleClose = (ticketId: string) => {
        closeTicketMutation.mutate(ticketId, {
            onSuccess: () => toast({ title: "Ticket closed" })
        });
    };

    const handleStatusUpdate = (ticketId: string, status: TicketStatus) => {
        updateTicketMutation.mutate({ ticketId, data: { status } }, {
            onSuccess: () => toast({ title: "Ticket status updated" })
        });
    };

    const handlePriorityUpdate = (ticketId: string, priority: TicketPriority) => {
        updateTicketMutation.mutate({ ticketId, data: { priority } }, {
            onSuccess: () => toast({ title: "Ticket priority updated" })
        });
    };

    const tickets = ticketsData?.data || [];
    const totalTickets = ticketsData?.total || 0;
    const totalPages = Math.ceil(totalTickets / limit);

    // Premium Shortcuts J/K/E/A
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Only trigger if focus is on body (not inside inputs)
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            if (e.key === 'j') {
                e.preventDefault();
                setFocusedIndex(prev => Math.min(prev + 1, tickets.length - 1));
            } else if (e.key === 'k') {
                e.preventDefault();
                setFocusedIndex(prev => Math.max(prev - 1, 0));
            } else if (e.key === 'e' || e.key === 'E') {
                if (focusedIndex >= 0 && focusedIndex < tickets.length) {
                    e.preventDefault();
                    handleResolve(tickets[focusedIndex].id);
                }
            } else if (e.key === 'a' || e.key === 'A') {
                if (focusedIndex >= 0 && focusedIndex < tickets.length) {
                    e.preventDefault();
                    document.getElementById(`assign-trigger-${tickets[focusedIndex].id}`)?.click();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [tickets, focusedIndex]);

    // Get count for a tab
    const getTabCount = (tabValue: TabValue) => {
        if (!countsData) return 0;
        if (tabValue === "ALL") return countsData.ALL || 0;
        if (tabValue === "PENDING") {
            return (countsData.PENDING_USER || 0) + (countsData.PENDING_INTERNAL || 0);
        }
        return countsData[tabValue as keyof typeof countsData] || 0;
    };

    // Badge Style Helper
    const getStatusChipClass = (status: TicketStatus) => {
        switch (status) {
            case "OPEN":
                return "dashboard-status-chip dashboard-status-chip--info";
            case "PENDING_USER":
            case "PENDING_INTERNAL":
                return "dashboard-status-chip dashboard-status-chip--warning";
            case "RESOLVED":
                return "dashboard-status-chip dashboard-status-chip--success";
            case "CLOSED":
                return "dashboard-status-chip dashboard-status-chip--neutral";
            default:
                return "dashboard-status-chip dashboard-status-chip--neutral";
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

    const getPriorityChipClass = (priority: TicketPriority | null) => {
        switch (priority) {
            case "URGENT":
                return "dashboard-status-chip dashboard-status-chip--danger";
            case "HIGH":
                return "dashboard-status-chip dashboard-status-chip--warning";
            case "MEDIUM":
                return "dashboard-status-chip dashboard-status-chip--info";
            case "LOW":
                return "dashboard-status-chip dashboard-status-chip--neutral";
            default:
                return "dashboard-status-chip dashboard-status-chip--neutral";
        }
    };

    // Sortable Header Component
    const TableHeaderSortable = ({ label, field, className }: { label: string; field: SortField; className?: string }) => {
        return (
            <TableHead
                className={cn(
                    "cursor-pointer font-bold text-xs uppercase tracking-wider text-[var(--text-secondary)] transition-colors hover:text-foreground group/header",
                    className
                )}
                onClick={() => {
                    if (sortField === field) {
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                        setSortField(field);
                        setSortOrder('desc');
                    }
                }}
            >
                <div className={cn("flex items-center gap-1", className?.includes("text-right") ? "justify-end" : "justify-start")}>
                    {label}
                    <div className="flex flex-col opacity-0 group-hover/header:opacity-50 transition-opacity aria-[sort=ascending]:opacity-100 aria-[sort=descending]:opacity-100" aria-sort={sortField === field ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}>
                        {sortField === field ? (
                            sortOrder === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                        ) : (
                            <ArrowDown className="h-3 w-3" />
                        )}
                    </div>
                </div>
            </TableHead>
        );
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
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="rounded-md border-[var(--border-default)] bg-card px-4 py-2 text-sm font-semibold hover:bg-[var(--surface-secondary)]"
                    >
                        <History className="h-4 w-4 mr-2" />
                        Activity Log
                    </Button>
                    <Button className="bg-primary text-primary-foreground font-semibold rounded-md px-4 py-2 hover:opacity-90 transition-opacity">
                        <Plus className="h-4 w-4 mr-2" />
                        New Ticket
                    </Button>
                </div>
            </div>

            {/* Tabs & Search */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center overflow-x-auto hidescrollbar rounded-xl border border-[var(--border-secondary)] bg-card p-1 shadow-[var(--shadow-1)]">
                    {TABS.map((tab) => {
                        const isActive = activeTab === tab.value;
                        const count = getTabCount(tab.value);

                        return (
                            <button
                                key={tab.value}
                                onClick={() => {
                                    setActiveTab(tab.value);
                                    setPage(1);
                                }}
                                className={cn(
                                    "flex select-none items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-sm transition-all duration-150",
                                    isActive
                                        ? "bg-[var(--bg-accent-subtle)] font-semibold text-[var(--text-accent)]"
                                        : "font-medium text-muted-foreground hover:bg-[var(--surface-secondary)] hover:text-foreground"
                                )}
                            >
                                {tab.label}
                                <span className={cn(
                                    "inline-flex min-w-[24px] items-center justify-center px-1.5 tabular-nums",
                                    isActive
                                        ? (TAB_BADGE_STYLES[tab.value] ?? "dashboard-status-chip dashboard-status-chip--neutral")
                                        : "dashboard-status-chip dashboard-status-chip--neutral"
                                )}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="relative w-full sm:w-64 shrink-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--icon-secondary)]" />
                    <Input
                        placeholder="Search email or ID..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setPage(1);
                        }}
                        className="border-[var(--border-default)] bg-card pl-9"
                    />
                </div>
            </div>

            {/* Main Table Card */}
            <div className="mt-2 min-h-[400px]">
                <Table>
                    <TableHeader className="bg-[var(--surface-secondary)] [&_tr]:border-[var(--border-secondary)]">
                        <TableRow className="hover:bg-transparent">
                            <TableHeaderSortable label="Ticket ID" field="id" className="w-[120px]" />
                            <TableHead className="mt-4 font-bold uppercase leading-none tracking-wider text-[var(--text-secondary)]">Subject</TableHead>
                            <TableHeaderSortable label="Priority" field="priority" className="w-[100px]" />
                            <TableHead className="mt-4 font-bold uppercase leading-none tracking-wider text-[var(--text-secondary)]">Requester</TableHead>
                            <TableHeaderSortable label="Status" field="status" className="w-[120px]" />
                            <TableHeaderSortable label="Assigned Agent" field="assignedAgentUserId" className="w-[180px]" />
                            <TableHeaderSortable label="Last Updated" field="updatedAt" className="w-[140px] text-right" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                                    Loading tickets...
                                </TableCell>
                            </TableRow>
                        ) : tickets.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                                    No tickets found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            tickets.map((ticket, index) => (
                                <TableRow
                                    key={ticket.id}
                                    className={cn(
                                        "group cursor-pointer border-[var(--border-secondary)] transition-colors hover:bg-[var(--surface-secondary)]",
                                        focusedIndex === index && "bg-[var(--bg-accent-subtle)] ring-1 ring-inset ring-primary"
                                    )}
                                    onClick={() => {
                                        if (ticket.conversationId) {
                                            router.push(`/${workspaceId}/chatbot/${botId}/activity/inbox?c=${ticket.conversationId}`);
                                        } else {
                                            router.push(`/${workspaceId}/chatbot/${botId}/tickets/${ticket.id}`);
                                        }
                                    }}
                                >
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
                                    <TableCell onClick={(e) => e.stopPropagation()}>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="flex items-center transition-opacity hover:opacity-80">
                                                    <span className={cn("min-w-[76px] justify-center", getPriorityChipClass(ticket.priority))}>
                                                        {ticket.priority || 'MEDIUM'}
                                                    </span>
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" className="w-[180px] p-1.5 flex flex-col gap-0.5">
                                                {(["URGENT", "HIGH", "MEDIUM", "LOW"] as TicketPriority[]).map((priority) => (
                                                    <DropdownMenuItem
                                                        key={priority}
                                                        onClick={() => handlePriorityUpdate(ticket.id, priority)}
                                                        className="cursor-pointer focus:bg-[var(--surface-secondary)]"
                                                    >
                                                        <span className={getPriorityChipClass(priority)}>
                                                            {priority}
                                                        </span>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                    <TableCell className="text-foreground">
                                        {ticket.contact?.email || ticket.contact?.displayName || "Unknown User"}
                                    </TableCell>
                                    <TableCell onClick={(e) => e.stopPropagation()}>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="flex items-center transition-opacity hover:opacity-80">
                                                    <span className={getStatusChipClass(ticket.status)}>
                                                        {getStatusLabel(ticket.status)}
                                                    </span>
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" className="w-[180px] p-1.5 flex flex-col gap-0.5">
                                                {/* Only display 4 distinct selectable statuses to avoid duplicates visually */}
                                                {(["OPEN", "PENDING_USER", "RESOLVED", "CLOSED"] as TicketStatus[]).map((status) => (
                                                    <DropdownMenuItem
                                                        key={status}
                                                        onClick={() => handleStatusUpdate(ticket.id, status)}
                                                        className="cursor-pointer focus:bg-[var(--surface-secondary)]"
                                                    >
                                                        <span className={getStatusChipClass(status)}>
                                                            {getStatusLabel(status)}
                                                        </span>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                    <TableCell onClick={(e) => e.stopPropagation()}>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button
                                                    id={`assign-trigger-${ticket.id}`}
                                                    className="flex w-full items-center gap-2 rounded-md p-1.5 text-left transition-colors hover:bg-[var(--surface-secondary)]"
                                                >
                                                    {ticket.assignedAgent ? (
                                                        <>
                                                            <Avatar className="h-5 w-5">
                                                                <AvatarImage src={ticket.assignedAgent.avatarUrl || undefined} />
                                                                <AvatarFallback className="bg-[var(--text-default)] text-[var(--text-inverse)] text-[9px]">
                                                                    {ticket.assignedAgent.displayName?.[0]?.toUpperCase() || "A"}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <span className="font-medium text-sm text-foreground truncate max-w-[120px]">
                                                                {ticket.assignedAgent.displayName}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="text-muted-foreground font-medium text-sm">Unassigned</span>
                                                    )}
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" className="w-[200px]">
                                                {workspaceMembers.map((member: any) => (
                                                    <DropdownMenuItem key={member.user.id} onClick={() => handleAssign(ticket.id, member.user.id)}>
                                                        <Avatar className="h-5 w-5 mr-2">
                                                            <AvatarImage src={member.user.avatarUrl || undefined} />
                                                            <AvatarFallback className="bg-[var(--text-default)] text-[var(--text-inverse)] text-[9px]">
                                                                {member.user.displayName?.[0]?.toUpperCase() || "A"}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="truncate">{member.user.displayName}</span>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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
                    Showing <span className="font-semibold text-foreground">{tickets.length > 0 ? (page - 1) * limit + 1 : 0} – {Math.min(page * limit, totalTickets)}</span> of <span className="font-semibold text-foreground">{totalTickets}</span> tickets
                </p>

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

                    <div className="flex items-center gap-1 px-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum = page - 2 + i;
                            if (page < 3) pageNum = i + 1;
                            else if (page > totalPages - 2) pageNum = totalPages - 4 + i;

                            if (pageNum > 0 && pageNum <= totalPages) {
                                return (
                                    <Button
                                        key={pageNum}
                                        variant={page === pageNum ? "default" : "outline"}
                                        size="sm"
                                        className={cn("h-8 min-w-8 px-2 font-medium border", page === pageNum ? "bg-primary text-primary-foreground" : "bg-transparent hover:bg-muted text-foreground font-normal")}
                                        onClick={() => setPage(pageNum)}
                                    >
                                        {pageNum}
                                    </Button>
                                );
                            }
                            return null;
                        })}
                    </div>

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
    );
}
