"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBillingDashboard, BillingDashboard as BillingDashboardType, TransactionStatus } from "@/lib/api/billing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Minus, Download, MessageSquare, Phone, MessageCircle, MoreHorizontal, PlusCircle, ExternalLink, ChevronRight, ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetChatbots } from "@/services/chatbot";
import { CreditAllocationDialog } from "./credit-allocation-dialog";
import { AddCreditsDialog } from "./add-credits-dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { usePermissions } from "@/hooks/use-permissions";
import { useWorkspaces } from "@/hooks/use-workspaces";

// Helper to format dates
const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Status badge component
const StatusBadge = ({ status }: { status: TransactionStatus }) => {
    const styles = {
        PROCESSED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-500",
        ESCALATED: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-500",
        PENDING: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-500",
    };
    return (
        <span className={`${styles[status]} text-[10px] px-2.5 py-1 rounded-full font-semibold tracking-wide uppercase`}>
            {status.charAt(0) + status.slice(1).toLowerCase()}
        </span>
    );
};


export function BillingDashboard({ onNavigateToChatbot }: { onNavigateToChatbot: (chatbotId: string) => void }) {
    const [data, setData] = useState<BillingDashboardType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [allocationDialog, setAllocationDialog] = useState<{ open: boolean; chatbotId: string; chatbotName: string; currentBalance: number }>({
        open: false,
        chatbotId: "",
        chatbotName: "",
        currentBalance: 0,
    });
    const [addCreditsDialog, setAddCreditsDialog] = useState(false);

    const { activeWorkspaceId } = useWorkspaces();
    const { data: chatbotsList } = useGetChatbots(activeWorkspaceId || undefined);
    const { isOwner } = usePermissions();
    const showCost = isOwner;

    useEffect(() => {
        // Reset data when workspace changes
        setData(null);
        setError(null);
        setLoading(true);
    }, [activeWorkspaceId]);

    useEffect(() => {
        if (!activeWorkspaceId) return;

        (async () => {
            try {
                const dashboard = await getBillingDashboard();
                setData(dashboard);
                setError(null);
            } catch (err: any) {
                console.error("Failed to load billing dashboard", err);
                setError(err?.message || "Failed to load billing data");
            } finally {
                setLoading(false);
            }
        })();
    }, [activeWorkspaceId]);

    const openAllocationDialog = (chatbotId: string, chatbotName: string, currentBalance: number) => {
        setAllocationDialog({
            open: true,
            chatbotId,
            chatbotName,
            currentBalance,
        });
    };

    if (loading) {
        return (
            <div className="space-y-6 max-w-[1400px] mx-auto p-4">
                <Skeleton className="h-[320px] w-full rounded-2xl" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Skeleton className="h-[400px] rounded-2xl" />
                    <Skeleton className="h-[400px] rounded-2xl" />
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4">
                    <Minus className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Failed to load billing data</h3>
                <p className="text-gray-500 mb-6">{error}</p>
                <Button variant="outline" onClick={() => window.location.reload()}>
                    Retry
                </Button>
            </div>
        );
    }

    const { credits, topCostDrivers, recentTransactions, chatbots } = data;

    // Derived percentages for the big bar
    const totalLimit = credits.total;
    const chatbotUsed = credits.breakdown.chatbot.used;
    const chatbotLimit = credits.breakdown.chatbot.limit;
    const whatsappUsed = credits.breakdown.whatsapp.used;
    const whatsappLimit = credits.breakdown.whatsapp.limit;
    const voiceUsed = credits.breakdown.voice.used;
    const voiceLimit = credits.breakdown.voice.limit;

    // Calculate percentages safely (avoid division by zero)
    const chatbotPct = totalLimit > 0 ? (chatbotUsed / totalLimit) * 100 : 0;
    const whatsappPct = totalLimit > 0 ? (whatsappUsed / totalLimit) * 100 : 0;
    const voicePct = totalLimit > 0 ? (voiceUsed / totalLimit) * 100 : 0;
    const totalUsedPct = credits.total > 0 ? ((credits.total - credits.available) / credits.total) * 100 : 0;

    // Chatbot Merging Logic
    const creditMap = new Map(chatbots?.map(c => [c.id, c]) || []);

    const displayChatbots = chatbotsList?.map(bot => {
        const creditInfo = creditMap.get(bot.id);
        return {
            id: bot.id,
            name: bot.name,
            allocatedCredits: creditInfo?.allocatedCredits || 0,
            remainingCredits: creditInfo?.remainingCredits || 0,
            usagePercentage: creditInfo?.usagePercentage || 0,
        };
    }) || [];

    return (
        <div className="space-y-8 animate-in fade-in duration-700 font-sans">

            <CreditAllocationDialog
                open={allocationDialog.open}
                onOpenChange={(open) => setAllocationDialog(prev => ({ ...prev, open }))}
                chatbotId={allocationDialog.chatbotId}
                chatbotName={allocationDialog.chatbotName}
                currentBalance={allocationDialog.currentBalance}
                accountBalance={credits.available}
            />

            <AddCreditsDialog
                open={addCreditsDialog}
                onOpenChange={setAddCreditsDialog}
                currentBalance={credits.available}
            />

            {/* HEADER AREA */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Billing Dashboard</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">Manage your credits, invoices and spending limits.</p>
                </div>
                <div className="flex gap-2">
                    {isOwner && (
                        <>
                            <Link href="/billing/credit-requests">
                                <Button variant="outline" size="sm" className="gap-2">
                                    <DollarSign className="w-4 h-4" />
                                    Credit Requests
                                </Button>
                            </Link>
                            <Button variant="default" size="sm" className="gap-2" onClick={() => setAddCreditsDialog(true)}>
                                <PlusCircle className="w-4 h-4" />
                                Add Credits
                            </Button>
                        </>
                    )}
                    <Button variant="outline" size="sm" className="gap-2">
                        <Download className="w-4 h-4" />
                        Export CSV
                    </Button>
                </div>
            </div>

            {/* 1. Main Credits Card */}
            <Card className="shadow-sm border border-gray-100 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-950 overflow-hidden relative">
                {/* Decorative background blur */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <CardContent className="p-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Left: Total Balance & Graph */}
                        <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                                        ₹{credits.available.toLocaleString()}
                                    </h2>
                                    <Badge variant="secondary" className="text-emerald-700 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-md text-xs font-medium border-0">
                                        Active
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span className="font-medium text-gray-900 dark:text-gray-200">₹{credits.total.toLocaleString()}</span>
                                    <span>total credits allocated</span>
                                </div>
                            </div>

                            {/* Service Progress Bars */}
                            <div>
                                <div className="flex justify-between text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
                                    <span>Credit Usage Distribution</span>
                                    <span>{Math.round(totalUsedPct)}% Used</span>
                                </div>
                                <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden flex">
                                    <div style={{ width: `${chatbotPct}%` }} className="bg-emerald-500 hover:bg-emerald-600 transition-colors cursor-help tooltip-trigger" title="Chatbot Usage" />
                                    <div style={{ width: `${whatsappPct}%` }} className="bg-teal-500 hover:bg-teal-600 transition-colors cursor-help tooltip-trigger" title="WhatsApp Usage" />
                                    <div style={{ width: `${voicePct}%` }} className="bg-indigo-500 hover:bg-indigo-600 transition-colors cursor-help tooltip-trigger" title="Voice Usage" />
                                </div>
                                <div className="flex items-center gap-6 mt-4">
                                    <div className="flex items-center gap-4 flex-wrap">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                            <span className="text-xs text-gray-600 dark:text-gray-400">Chatbot ({isNaN(chatbotPct) ? '0' : chatbotPct.toFixed(0)}%)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-teal-500" />
                                            <span className="text-xs text-gray-600 dark:text-gray-400">WhatsApp ({isNaN(whatsappPct) ? '0' : whatsappPct.toFixed(0)}%)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                            <span className="text-xs text-gray-600 dark:text-gray-400">Voice ({isNaN(voicePct) ? '0' : voicePct.toFixed(0)}%)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Detailed Metrics Grid */}
                        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                            {/* Chatbot Metric */}
                            <div className="p-4 rounded-xl bg-gray-50/80 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 flex items-center justify-between group hover:bg-white dark:hover:bg-gray-900 hover:border-emerald-200 dark:hover:border-emerald-800/50 hover:shadow-sm transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition-colors">
                                        <MessageCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Chatbot</p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-lg font-bold text-gray-900 dark:text-white">{chatbotUsed.toLocaleString()}</span>
                                            <span className="text-xs text-gray-400">/ {chatbotLimit.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* WhatsApp Metric */}
                            <div className="p-4 rounded-xl bg-gray-50/80 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 flex items-center justify-between group hover:bg-white dark:hover:bg-gray-900 hover:border-teal-200 dark:hover:border-teal-800/50 hover:shadow-sm transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:bg-teal-50 dark:group-hover:bg-teal-900/20 transition-colors">
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">WhatsApp</p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-lg font-bold text-gray-900 dark:text-white">{whatsappUsed.toLocaleString()}</span>
                                            <span className="text-xs text-gray-400">/ {whatsappLimit.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Voice Metric */}
                            <div className="p-4 rounded-xl bg-gray-50/80 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 flex items-center justify-between group hover:bg-white dark:hover:bg-gray-900 hover:border-indigo-200 dark:hover:border-indigo-800/50 hover:shadow-sm transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Voice</p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-lg font-bold text-gray-900 dark:text-white">{voiceUsed.toLocaleString()}</span>
                                            <span className="text-xs text-gray-400">/ {voiceLimit.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>

                {/* Burn Rate Footer Strip */}
                <div className="bg-gray-50/50 dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-800 px-8 py-3 flex flex-wrap items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <span className="font-medium">Burn Rate:</span>
                        <span className="text-gray-900 dark:text-gray-200 font-semibold">₹{credits.burnRate.toLocaleString()} <span className="text-gray-400 font-normal">/ day</span></span>
                    </div>
                    <div className="h-4 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block" />
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Est. Depletion:</span>
                        <span className="text-gray-900 dark:text-gray-200 font-semibold">~{credits.estimatedDepletionDays} days</span>
                    </div>
                </div>
            </Card>

            {/* 2. Chatbot Budgets Grid */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Chatbot Budgets</h2>
                        <p className="text-sm text-gray-500 mt-1">Allocation & usage per chatbot</p>
                    </div>
                    {/* Add Filter/Search here if needed */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayChatbots.length > 0 ? (
                        displayChatbots.map(bot => (
                            <Card key={bot.id} className="group hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-950 overflow-hidden relative flex flex-col h-full">
                                <div className={`absolute top-0 w-full h-1 ${bot.remainingCredits < bot.allocatedCredits * 0.2 ? "bg-red-500" : "bg-emerald-500"}`} />
                                <CardContent className="p-5 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-gray-700 dark:text-gray-300 font-bold text-lg border border-gray-100 dark:border-gray-700 shadow-inner">
                                                {bot.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-base text-gray-900 dark:text-white leading-snug truncate max-w-[120px]" title={bot.name}>{bot.name}</h3>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${bot.remainingCredits > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                                    <span className="text-[10px] text-gray-400 uppercase tracking-tight font-medium">
                                                        {bot.remainingCredits > 0 ? 'Active' : 'Depleted'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-gray-400 hover:text-gray-900 dark:hover:text-white -mr-2 -mt-2"
                                            onClick={() => onNavigateToChatbot(bot.id)}
                                            title="View Analytics"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    <div className="space-y-4 flex-1">
                                        <div>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <span className="text-xs font-semibold text-gray-500 uppercase">Available</span>
                                                <span className={`text-xl font-bold font-mono tracking-tight ${bot.remainingCredits < bot.allocatedCredits * 0.2 ? "text-red-500" : "text-gray-900 dark:text-white"}`}>
                                                    ₹{bot.remainingCredits.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                                                <span>of ₹{bot.allocatedCredits.toLocaleString()} allocated</span>
                                            </div>
                                            <Progress
                                                value={bot.allocatedCredits > 0 ? ((bot.allocatedCredits - bot.remainingCredits) / bot.allocatedCredits * 100) : 0}
                                                className="h-1.5 bg-gray-100 dark:bg-gray-800"
                                            // indicatorClassName={bot.remainingCredits < bot.allocatedCredits * 0.2 ? "bg-red-500" : "bg-emerald-500"} 
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-gray-50 dark:border-gray-800/50 flex flex-col gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() => openAllocationDialog(bot.id, bot.name, bot.remainingCredits)}
                                            className="w-full text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm border-0"
                                        >
                                            <PlusCircle className="w-3.5 h-3.5" />
                                            Add Funds
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => onNavigateToChatbot(bot.id)}
                                            className="w-full text-xs gap-1.5 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            View Analytics
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-900/20 text-gray-500">
                            <MessageCircle className="w-12 h-12 mb-4 text-gray-300" />
                            <p className="text-sm font-medium mb-1">No chatbots found</p>
                            <p className="text-xs text-gray-400">Create a chatbot to start tracking its billing and usage.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* 3. Data Tables Area (Side-by-Side on Large screens) */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                {/* Top Cost Drivers */}
                <Card className="border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl overflow-hidden bg-white dark:bg-gray-950 flex flex-col">
                    <CardHeader className="bg-white dark:bg-gray-950 px-6 py-5 border-b border-gray-50 dark:border-gray-800/50 flex flex-row items-center justify-between sticky top-0">
                        <div>
                            <CardTitle className="text-base font-bold text-gray-900 dark:text-white">Top Spending Chatbots</CardTitle>
                            <p className="text-xs text-gray-500 mt-1">Highest cost drivers this month</p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full"><MoreHorizontal className="w-4 h-4 text-gray-400" /></Button>
                    </CardHeader>
                    <div className="flex-1 overflow-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50/50 dark:bg-gray-900/50 text-gray-500 font-medium">
                                <tr>
                                    <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider w-[10px]">#</th>
                                    <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">Chatbot</th>
                                    {showCost && <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider text-right">Cost</th>}
                                    <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider text-right">Trend</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                                {topCostDrivers.map((bot, idx) => (
                                    <tr
                                        key={bot.chatbotId}
                                        className="group hover:bg-gray-50/80 dark:hover:bg-gray-900/50 transition-colors cursor-pointer"
                                        onClick={() => onNavigateToChatbot(bot.chatbotId)}
                                    >
                                        <td className="px-6 py-4 text-gray-400 text-xs">{idx + 1}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-400">
                                                    {bot.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm group-hover:text-primary transition-colors">{bot.name}</p>
                                                    <p className="text-xs text-gray-500">{bot.conversations.toLocaleString()} convs</p>
                                                </div>
                                            </div>
                                        </td>
                                        {showCost && <td className="px-6 py-4 text-right font-mono font-medium text-gray-900 dark:text-white">₹{bot.totalCost.toLocaleString()}</td>}
                                        <td className="px-6 py-4 text-right">
                                            {bot.trend === "up" && <div className="inline-flex items-center gap-1 text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded text-xs font-medium"><ArrowUpRight className="w-3 h-3" /> +{(bot.escalationRate * 10).toFixed(1)}%</div>}
                                            {bot.trend === "down" && <div className="inline-flex items-center gap-1 text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded text-xs font-medium"><ArrowDownRight className="w-3 h-3" /> -{(bot.escalationRate * 5).toFixed(1)}%</div>}
                                            {bot.trend === "flat" && <div className="inline-flex items-center gap-1 text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded text-xs font-medium"><Minus className="w-3 h-3" /> 0%</div>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Recent Billing Activity */}
                <Card className="border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl overflow-hidden bg-white dark:bg-gray-950 flex flex-col">
                    <CardHeader className="bg-white dark:bg-gray-950 px-6 py-5 border-b border-gray-50 dark:border-gray-800/50 flex flex-row items-center justify-between sticky top-0">
                        <div>
                            <CardTitle className="text-base font-bold text-gray-900 dark:text-white">Recent Transactions</CardTitle>
                            <p className="text-xs text-gray-500 mt-1">Latest billing events across workspace</p>
                        </div>
                        <Button variant="ghost" size="sm" className="hidden sm:flex h-8 text-xs text-gray-500 hover:text-gray-900">View All</Button>
                    </CardHeader>
                    <div className="flex-1 overflow-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50/50 dark:bg-gray-900/50 text-gray-500 font-medium">
                                <tr>
                                    <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">Chatbot</th>
                                    <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">Details</th>
                                    {showCost && <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider text-right">Amount</th>}
                                    <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                                {recentTransactions.slice(0, 5).map((tx) => (
                                    <tr key={tx.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-900/50 transition-colors">
                                        <td className="px-6 py-4 text-gray-500 text-xs whitespace-nowrap">{formatDate(tx.date)}</td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {tx.chatbotName !== 'N/A' ? tx.chatbotName : '—'}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-900 dark:text-white">{tx.details || 'Transaction'}</p>
                                            {tx.userEmail && tx.userEmail !== 'system' && (
                                                <p className="text-xs text-gray-500 mt-0.5">by {tx.userEmail}</p>
                                            )}
                                        </td>
                                        {showCost && <td className="px-6 py-4 text-right font-mono font-medium text-gray-900 dark:text-white">₹{tx.amount}</td>}
                                        <td className="px-6 py-4 text-right"><StatusBadge status={tx.status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}
