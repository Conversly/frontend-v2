"use client";

import { useEffect, useState } from "react";
import { getChatbotAnalytics, ChatbotAnalytics, TransactionStatus } from "@/lib/api/billing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, MessageCircle, MessageSquare, Phone, TrendingUp, DollarSign } from "lucide-react";
import { BarChart } from '@mui/x-charts/BarChart';
import { usePermissions } from "@/hooks/use-permissions";
import { useWorkspaces } from "@/hooks/use-workspaces";
import { CreditRequestDialog } from "./credit-request-dialog";

// Helper to format dates
const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Status badge component
const StatusBadge = ({ status }: { status: TransactionStatus }) => {
    const styles = {
        PROCESSED: "bg-green-100 text-green-700",
        ESCALATED: "bg-yellow-100 text-yellow-700",
        PENDING: "bg-blue-100 text-blue-700",
    };
    return (
        <span className={`${styles[status]} text-xs px-2 py-1 rounded-md font-medium`}>
            {status.charAt(0) + status.slice(1).toLowerCase()}
        </span>
    );
};

export function ChatbotAnalyticsView({ chatbotId, onBack }: { chatbotId: string; onBack: () => void }) {
    const [data, setData] = useState<ChatbotAnalytics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [period, setPeriod] = useState(30);
    const [creditRequestDialog, setCreditRequestDialog] = useState(false);
    const { isOwner } = usePermissions();
    const { activeWorkspaceId } = useWorkspaces();
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
            setLoading(true);
            try {
                const analytics = await getChatbotAnalytics(chatbotId, period);
                setData(analytics);
                setError(null);
            } catch (err: any) {
                console.error("Failed to load chatbot analytics", err);
                // If chatbot not found or access denied, it means chatbot doesn't belong to workspace
                if (err?.message?.includes("not found") || err?.message?.includes("access denied")) {
                    setError("Chatbot not found in current workspace");
                } else {
                    setError(err?.message || "Failed to load analytics");
                }
            } finally {
                setLoading(false);
            }
        })();
    }, [chatbotId, period, activeWorkspaceId]);

    if (loading) {
        return (
            <div className="p-8 text-center text-gray-500 space-y-4">
                <div className="animate-pulse space-y-4 max-w-4xl mx-auto">
                    <div className="h-12 bg-gray-200 rounded-lg w-1/3"></div>
                    <div className="h-32 bg-gray-200 rounded-xl"></div>
                    <div className="h-64 bg-gray-200 rounded-xl"></div>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="p-8 text-center text-red-500">
                <p>Error: {error || "Failed to load analytics"}</p>
                <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                    Retry
                </Button>
            </div>
        );
    }

    const { chatbot, overview, spendByService, spendTrend, burnRateTable, costBreakdown, adminPerformance } = data;

    // Calculate total for pie chart percentages
    const totalSpend = spendByService.chatbot.spend + spendByService.whatsapp.spend + spendByService.voice.spend;
    const costDistribution = [
        { id: 'chatbot', label: 'Chatbot', value: spendByService.chatbot.spend, percentage: spendByService.chatbot.percentage, color: '#22c55e' },
        { id: 'whatsapp', label: 'WhatsApp', value: spendByService.whatsapp.spend, percentage: spendByService.whatsapp.percentage, color: '#3b82f6' },
        { id: 'voice', label: 'Voice', value: spendByService.voice.spend, percentage: spendByService.voice.percentage, color: '#a855f7' },
    ];

    // Prepare chart data
    const chartXLabels = spendTrend.map(d => formatDate(d.date));
    const chartData = {
        chatbot: spendTrend.map(d => d.chatbot),
        whatsapp: spendTrend.map(d => d.whatsapp),
        voice: spendTrend.map(d => d.voice),
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <CreditRequestDialog
                open={creditRequestDialog}
                onOpenChange={setCreditRequestDialog}
                chatbotId={chatbotId}
                chatbotName={chatbot.name}
            />

            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                        <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                    </Button>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Chatbot Analytics</h2>
                        <p className="text-sm text-muted-foreground mt-1">{chatbot.name}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {!isOwner && (
                        <Button variant="outline" size="sm" className="gap-2" onClick={() => setCreditRequestDialog(true)}>
                            <DollarSign className="w-4 h-4" />
                            Request Credits
                        </Button>
                    )}
                    <select
                        value={period}
                        onChange={(e) => setPeriod(Number(e.target.value))}
                        className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        <option value={7}>Last 7 days</option>
                        <option value={30}>Last 30 days</option>
                        <option value={90}>Last 90 days</option>
                    </select>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Download className="w-4 h-4" />
                        Export CSV
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="bg-transparent p-0 border-b border-gray-200 dark:border-gray-800 w-full justify-start rounded-none h-auto">
                    <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-2.5 text-sm font-medium">Overview</TabsTrigger>
                    <TabsTrigger value="chatbot" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-2.5 text-sm font-medium">Chatbot</TabsTrigger>
                    <TabsTrigger value="whatsapp" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-2.5 text-sm font-medium">WhatsApp</TabsTrigger>
                    <TabsTrigger value="voice" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-2.5 text-sm font-medium">Voice</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-8 space-y-6">

                    {/* Section 1: Spending by Service */}
                    <Card className="shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
                        <CardHeader className="flex flex-row items-center justify-between pb-4">
                            <div>
                                <CardTitle className="text-lg font-semibold">Spending Overview</CardTitle>
                                <p className="text-xs text-muted-foreground mt-1">Track spending trends and service distribution</p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Big Metrics Row */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="text-2xl font-bold text-gray-900 dark:text-white">₹{showCost ? overview.totalSpend.toLocaleString() : '—'}</span>
                                        {showCost && (
                                            <span className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded">
                                                <TrendingUp className="w-3 h-3 inline mr-0.5" />
                                                +12%
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Total Spend</div>
                                </div>
                                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{overview.totalConversations.toLocaleString()}</div>
                                    <div className="text-xs text-muted-foreground">Conversations</div>
                                </div>
                                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{overview.estimatedCompletions.toLocaleString()}</div>
                                    <div className="text-xs text-muted-foreground">Est. Completions</div>
                                </div>
                                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{overview.avgTimeToResolution}</div>
                                    <div className="text-xs text-muted-foreground">Avg Resolution (min)</div>
                                </div>
                            </div>

                            {/* Legend for Chart */}
                            <div className="flex gap-6 text-xs mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Chatbot
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> WhatsApp
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-purple-500"></span> Voice
                                </div>
                            </div>

                            {/* Bar Chart */}
                            <div className="h-[250px] w-full">
                                <BarChart
                                    xAxis={[{ scaleType: 'band', data: chartXLabels, tickLabelStyle: { fontSize: 10, fill: '#9ca3af' } }]}
                                    series={[
                                        { data: chartData.chatbot, label: 'Chatbot', color: '#22c55e', stack: 'spend' },
                                        { data: chartData.whatsapp, label: 'WhatsApp', color: '#3b82f6', stack: 'spend' },
                                        { data: chartData.voice, label: 'Voice', color: '#a855f7', stack: 'spend' },
                                    ]}
                                    height={250}
                                    margin={{ left: 50, right: 10, top: 10, bottom: 30 }}
                                    sx={{
                                        '& .MuiChartsLegend-root': {
                                            display: 'none'
                                        }
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Section 2: Cost Distribution */}
                    {showCost && <Card className="shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Cost Distribution</CardTitle>
                            <p className="text-xs text-muted-foreground mt-1">Breakdown of spending across service types</p>
                        </CardHeader>
                        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-8">
                            {/* Pie Chart Placeholder */}
                            <div className="relative w-48 h-48">
                                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                    {costDistribution.reduce((acc, item, i) => {
                                        const prevTotal = costDistribution.slice(0, i).reduce((sum, d) => sum + d.percentage, 0);
                                        const strokeDasharray = `${item.percentage} ${100 - item.percentage}`;
                                        const strokeDashoffset = -prevTotal;
                                        acc.push(
                                            <circle
                                                key={item.id}
                                                cx="50"
                                                cy="50"
                                                r="40"
                                                fill="none"
                                                stroke={item.color}
                                                strokeWidth="20"
                                                strokeDasharray={strokeDasharray}
                                                strokeDashoffset={strokeDashoffset}
                                                className="transition-all duration-500"
                                            />
                                        );
                                        return acc;
                                    }, [] as React.ReactNode[])}
                                </svg>
                            </div>
                            {/* Legend */}
                            <div className="flex-1 space-y-4 max-w-xs">
                                {costDistribution.map(item => (
                                    <div key={item.id} className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                                            <span className="font-medium">{item.label}</span>
                                        </div>
                                        <span className="text-sm font-bold bg-gray-100 px-2 py-1 rounded">{item.percentage}%</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>}

                    {/* Section 3: Burn Rate & Cost Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Burn Rate Table */}
                        <Card className="shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Burn Rate & Projected Depletion</CardTitle>
                                <p className="text-xs text-muted-foreground mt-1">Daily spending trends</p>
                            </CardHeader>
                            <CardContent>
                                <table className="w-full text-sm">
                                    <thead className="text-gray-500 border-b">
                                        <tr>
                                            <th className="text-left font-medium py-2">Date</th>
                                            <th className="text-left font-medium py-2">User</th>
                                            <th className="text-right font-medium py-2">Tokens</th>
                                            {showCost && <th className="text-right font-medium py-2">Cost</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {burnRateTable.map((row, i) => (
                                            <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                                                <td className="py-3 text-gray-500">{formatDate(row.date)}</td>
                                                <td className="py-3 text-gray-500 truncate max-w-[120px]">{row.userEmail}</td>
                                                <td className="py-3 text-right font-mono">{row.tokens.toLocaleString()}</td>
                                                {showCost && <td className="py-3 text-right font-mono">₹{(row.cost || 0).toFixed(2)}</td>}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>

                        {/* Cost Breakdown */}
                        {showCost && <Card className="shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Cost Breakdown by Status</CardTitle>
                                <p className="text-xs text-muted-foreground mt-1">Spending categorized by transaction status</p>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {costBreakdown.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <StatusBadge status={item.status} />
                                                <span className="text-sm text-muted-foreground">{item.count} transactions</span>
                                            </div>
                                            <span className="font-mono text-sm font-medium">₹ {item.totalCost.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>}
                    </div>

                    {/* Section 4: Admin Performance */}
                    <Card className="shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Admin Performance</CardTitle>
                            <p className="text-xs text-muted-foreground mt-1">Usage and cost by admin user</p>
                        </CardHeader>
                        <CardContent>
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50/50 text-gray-500 font-medium">
                                    <tr>
                                        <th className="px-4 py-3">Date</th>
                                        <th className="px-4 py-3">Admin</th>
                                        <th className="px-4 py-3 text-right">Tokens</th>
                                        {showCost && <th className="px-4 py-3 text-right">Cost</th>}
                                        <th className="px-4 py-3 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {adminPerformance.map((row, i) => (
                                        <tr key={i} className="border-b last:border-0 hover:bg-gray-50/50">
                                            <td className="px-4 py-3 text-gray-500">{formatDate(row.date)}</td>
                                            <td className="px-4 py-3 text-gray-600">{row.adminEmail}</td>
                                            <td className="px-4 py-3 text-right font-mono">{row.tokens.toLocaleString()}</td>
                                            {showCost && <td className="px-4 py-3 text-right font-mono">₹{row.cost.toFixed(2)}</td>}
                                            <td className="px-4 py-3 text-right"><StatusBadge status={row.status} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>

                </TabsContent>

                <TabsContent value="chatbot" className="mt-8 space-y-6">
                    {/* Chatbot Service Analytics */}
                    <Card className="shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <MessageCircle className="w-5 h-5 text-emerald-600" />
                                Chatbot Service Analytics
                            </CardTitle>
                            <p className="text-xs text-muted-foreground mt-1">LLM inference, tokens, and conversation metrics</p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50">
                                    <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                                        ₹{showCost ? spendByService.chatbot.spend.toLocaleString() : '—'}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Total Spend</div>
                                </div>
                                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                        {spendByService.chatbot.percentage.toFixed(1)}%
                                    </div>
                                    <div className="text-xs text-muted-foreground">of Total</div>
                                </div>
                                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                        {burnRateTable.filter(t => t.service === 'CHATBOT' || !t.service).length}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Transactions</div>
                                </div>
                                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                        {burnRateTable.filter(t => t.service === 'CHATBOT' || !t.service).reduce((sum, t) => sum + (t.tokens || 0), 0).toLocaleString()}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Total Tokens</div>
                                </div>
                            </div>

                            {/* Chatbot Transactions Table */}
                            <div>
                                <h4 className="text-sm font-semibold mb-3">Recent Chatbot Transactions</h4>
                                <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Date</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">User</th>
                                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Tokens</th>
                                                {showCost && <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Cost</th>}
                                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                            {burnRateTable.filter(t => t.service === 'CHATBOT' || !t.service).slice(0, 10).map((row, i) => (
                                                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{formatDate(row.date)}</td>
                                                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 truncate max-w-[150px]">{row.userEmail}</td>
                                                    <td className="px-4 py-3 text-right font-mono text-gray-900 dark:text-white">{row.tokens.toLocaleString()}</td>
                                                    {showCost && <td className="px-4 py-3 text-right font-mono text-gray-900 dark:text-white">₹{((row.amount || row.cost || 0)).toFixed(2)}</td>}
                                                    <td className="px-4 py-3 text-right"><StatusBadge status={row.status || 'PROCESSED'} /></td>
                                                </tr>
                                            ))}
                                            {burnRateTable.filter(t => t.service === 'CHATBOT' || !t.service).length === 0 && (
                                                <tr>
                                                    <td colSpan={showCost ? 5 : 4} className="px-4 py-8 text-center text-muted-foreground text-sm">
                                                        No chatbot transactions found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="whatsapp" className="mt-8 space-y-6">
                    {/* WhatsApp Service Analytics */}
                    <Card className="shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-blue-600" />
                                WhatsApp Service Analytics
                            </CardTitle>
                            <p className="text-xs text-muted-foreground mt-1">Conversation windows, messages, and billing metrics</p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50">
                                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
                                        ₹{showCost ? spendByService.whatsapp.spend.toLocaleString() : '—'}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Total Spend</div>
                                </div>
                                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                        {spendByService.whatsapp.percentage.toFixed(1)}%
                                    </div>
                                    <div className="text-xs text-muted-foreground">of Total</div>
                                </div>
                                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                        {burnRateTable.filter(t => t.service === 'WHATSAPP').length}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Transactions</div>
                                </div>
                                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                        {overview.totalConversations.toLocaleString()}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Conversations</div>
                                </div>
                            </div>

                            {/* WhatsApp Transactions Table */}
                            <div>
                                <h4 className="text-sm font-semibold mb-3">Recent WhatsApp Transactions</h4>
                                <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Date</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">User</th>
                                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Messages</th>
                                                {showCost && <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Cost</th>}
                                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                            {burnRateTable.filter(t => t.service === 'WHATSAPP').slice(0, 10).map((row, i) => (
                                                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{formatDate(row.date)}</td>
                                                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 truncate max-w-[150px]">{row.userEmail}</td>
                                                    <td className="px-4 py-3 text-right font-mono text-gray-900 dark:text-white">{row.tokens || 0}</td>
                                                    {showCost && <td className="px-4 py-3 text-right font-mono text-gray-900 dark:text-white">₹{((row.amount || row.cost || 0)).toFixed(2)}</td>}
                                                    <td className="px-4 py-3 text-right"><StatusBadge status={row.status || 'PROCESSED'} /></td>
                                                </tr>
                                            ))}
                                            {burnRateTable.filter(t => t.service === 'WHATSAPP').length === 0 && (
                                                <tr>
                                                    <td colSpan={showCost ? 5 : 4} className="px-4 py-8 text-center text-muted-foreground text-sm">
                                                        No WhatsApp transactions found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="voice" className="mt-8 space-y-6">
                    {/* Voice Service Analytics */}
                    <Card className="shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <Phone className="w-5 h-5 text-purple-600" />
                                Voice Service Analytics
                            </CardTitle>
                            <p className="text-xs text-muted-foreground mt-1">Call minutes, STT/TTS usage, and billing metrics</p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/50">
                                    <div className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-1">
                                        ₹{showCost ? spendByService.voice.spend.toLocaleString() : '—'}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Total Spend</div>
                                </div>
                                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                        {spendByService.voice.percentage.toFixed(1)}%
                                    </div>
                                    <div className="text-xs text-muted-foreground">of Total</div>
                                </div>
                                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                        {burnRateTable.filter(t => t.service === 'VOICE').length}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Transactions</div>
                                </div>
                                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                        {Math.round(burnRateTable.filter(t => t.service === 'VOICE').reduce((sum, t) => sum + (t.tokens || 0), 0) / 60)}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Total Minutes</div>
                                </div>
                            </div>

                            {/* Voice Transactions Table */}
                            <div>
                                <h4 className="text-sm font-semibold mb-3">Recent Voice Transactions</h4>
                                <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Date</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">User</th>
                                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Minutes</th>
                                                {showCost && <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Cost</th>}
                                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                            {burnRateTable.filter(t => t.service === 'VOICE').slice(0, 10).map((row, i) => (
                                                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{formatDate(row.date)}</td>
                                                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 truncate max-w-[150px]">{row.userEmail}</td>
                                                    <td className="px-4 py-3 text-right font-mono text-gray-900 dark:text-white">
                                                        {Math.round((row.tokens || 0) / 60)} min
                                                    </td>
                                                    {showCost && <td className="px-4 py-3 text-right font-mono text-gray-900 dark:text-white">₹{((row.amount || row.cost || 0)).toFixed(2)}</td>}
                                                    <td className="px-4 py-3 text-right"><StatusBadge status={row.status || 'PROCESSED'} /></td>
                                                </tr>
                                            ))}
                                            {burnRateTable.filter(t => t.service === 'VOICE').length === 0 && (
                                                <tr>
                                                    <td colSpan={showCost ? 5 : 4} className="px-4 py-8 text-center text-muted-foreground text-sm">
                                                        No voice transactions found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
