"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, RefreshCw, Info, PlayCircle } from "lucide-react";
import {
    AreaChart,
    Area,
    ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api/axios";
// If invalid, I will fix. I saw lib/api/axios.ts.

// Types
interface VoiceLogItem {
    id: string;
    roomName: string;
    assistantName: string | null;
    botName: string;
    phoneNumber: string | null;
    status: string;
    startedAt: string | null;
    endedAt: string | null;
    durationSec: number | null;
    endReason: string | null;
    recordingUrl: string | null;
}

export default function VoiceAnalytics() {
    const params = useParams();
    const botId = params?.botId as string;

    const [logs, setLogs] = useState<VoiceLogItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState("Last 50 calls");

    const fetchLogs = async () => {
        if (!botId) return;
        setLoading(true);
        try {
            const res = await api.get('/analytics/logs', {
                params: { chatbotId: botId, limit: 50 }
            });
            if (res.data.success) {
                setLogs(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch logs", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [botId]);


    const formatDuration = (sec: number | null) => {
        if (!sec) return "-";
        const minutes = Math.floor(sec / 60);
        const seconds = sec % 60;
        return `${minutes}m ${seconds}s`;
    };

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleString();
    };

    return (
        <div className="p-8 space-y-8 bg-background min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Telephony Analytics</h1>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2" onClick={fetchLogs}>
                        <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                    <Button variant="outline" size="sm">
                        {dateRange}
                    </Button>
                </div>
            </div>

            {/* KPI Cards Placeholder (Can be implemented with real aggregates later) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* ... Keep existing KPI cards structure if desired, or remove mocks ... */}
                {/* Simplified for now to focus on Logs */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Calls (Visible)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{logs.length}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Logs Table */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Call Logs</h2>
                </div>

                <Card>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Status</TableHead>
                                <TableHead>Started At</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Phone / User</TableHead>
                                <TableHead>Assistant</TableHead>
                                <TableHead>End Reason</TableHead>
                                <TableHead>Recording</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {logs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center">
                                        {loading ? "Loading..." : "No calls found."}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                logs.map((log) => (
                                    <TableRow key={log.id}>
                                        <TableCell>
                                            <Badge variant="outline" className={
                                                log.status === 'COMPLETED' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                                    log.status === 'FAILED' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                                        "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                            }>
                                                {log.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-xs">{formatDate(log.startedAt)}</TableCell>
                                        <TableCell>{formatDuration(log.durationSec)}</TableCell>
                                        <TableCell>{log.phoneNumber || "Unknown"}</TableCell>
                                        <TableCell>{log.assistantName}</TableCell>
                                        <TableCell className="text-xs text-muted-foreground">{log.endReason || "-"}</TableCell>
                                        <TableCell>
                                            {log.recordingUrl ? (
                                                <a href={log.recordingUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-500 hover:underline">
                                                    <PlayCircle className="h-4 w-4" /> Play
                                                </a>
                                            ) : (
                                                <span className="text-muted-foreground text-xs">-</span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    );
}
