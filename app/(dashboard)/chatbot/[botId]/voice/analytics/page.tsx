"use client";

import { useState } from "react";
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
import { Search, Filter, RefreshCw, Info } from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui/badge";

// Mock Data for Charts
const chartData = [
    { time: "00:00", value: 0 },
    { time: "04:00", value: 0 },
    { time: "08:00", value: 12 },
    { time: "12:00", value: 45 },
    { time: "16:00", value: 30 },
    { time: "20:00", value: 8 },
    { time: "23:59", value: 2 },
];

const issuesData = [
    { time: "00:00", value: 0 },
    { time: "04:00", value: 0 },
    { time: "08:00", value: 1 },
    { time: "12:00", value: 3 },
    { time: "16:00", value: 2 },
    { time: "20:00", value: 0 },
    { time: "23:59", value: 0 },
];

// Mock Data for Calls Table
const callsData = [
    {
        id: "CALL-1234",
        from: "+1 555-0101",
        to: "+1 555-0102",
        direction: "Inbound",
        startedAt: "2024-01-20 14:30:00",
        endedAt: "2024-01-20 14:35:12",
        duration: "5m 12s",
        session: "sess_8923h2",
        status: "completed",
    },
    {
        id: "CALL-1235",
        from: "+1 555-0103",
        to: "+1 555-0104",
        direction: "Outbound",
        startedAt: "2024-01-20 14:28:00",
        endedAt: "2024-01-20 14:29:30",
        duration: "1m 30s",
        session: "sess_7322j1",
        status: "completed",
    },
    {
        id: "CALL-1236",
        from: "+1 555-0105",
        to: "+1 555-0106",
        direction: "Outbound",
        startedAt: "2024-01-20 14:15:00",
        endedAt: "-",
        duration: "45s",
        session: "sess_1928k9",
        status: "active",
    },
    {
        id: "CALL-1237",
        from: "+1 555-0107",
        to: "+1 555-0108",
        direction: "Inbound",
        startedAt: "2024-01-20 13:00:00",
        endedAt: "2024-01-20 13:00:05",
        duration: "5s",
        session: "sess_0012m3",
        status: "failed",
    },
];

const statusStyles: Record<string, string> = {
    completed: "bg-green-500/10 text-green-500 border-green-500/20",
    active: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    failed: "bg-red-500/10 text-red-500 border-red-500/20",
};

export default function VoiceAnalytics() {
    const [dateRange, setDateRange] = useState("Past 24 hours");

    return (
        <div className="p-8 space-y-8 bg-background min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Telephony</h1>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Last updated 9 mins ago</span>
                    <Button variant="outline" size="sm" className="gap-2">
                        <RefreshCw className="h-3 w-3" />
                        Auto-refresh off
                    </Button>
                    <Button variant="outline" size="sm">
                        {dateRange}
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total calls
                            <Info className="h-3 w-3 ml-2 inline text-muted-foreground cursor-help" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total call duration
                            <Info className="h-3 w-3 ml- ml-2 inline text-muted-foreground cursor-help" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0 secs</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Average call duration
                            <Info className="h-3 w-3 ml-2 inline text-muted-foreground cursor-help" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0 secs</div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Active Calls Chart */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center">
                            Active calls <Info className="h-3 w-3 ml-2 text-muted-foreground" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] w-full flex flex-col items-center justify-center">
                            <div className="text-4xl font-bold text-blue-500 mb-4">0</div>
                            <div className="text-sm text-muted-foreground mb-4">Live active calls</div>
                            <ResponsiveContainer width="100%" height={60}>
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#3b82f6"
                                        fillOpacity={1}
                                        fill="url(#colorValue)"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Calls with Issues Chart */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center">
                            Calls with issues <Info className="h-3 w-3 ml-2 text-muted-foreground" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] w-full flex flex-col items-center justify-center">
                            <div className="text-4xl font-bold text-blue-500 mb-4">0</div>
                            <div className="text-sm text-muted-foreground mb-4">Issues detected</div>
                            <ResponsiveContainer width="100%" height={60}>
                                <AreaChart data={issuesData}>
                                    <defs>
                                        <linearGradient id="colorIssue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#3b82f6"
                                        fillOpacity={1}
                                        fill="url(#colorIssue)"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Calls Table Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Calls</h2>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Filter className="h-4 w-4" />
                            Filters
                        </Button>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search calls..." className="pl-8 w-[200px] h-9" />
                        </div>
                    </div>
                </div>

                <Card>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>From</TableHead>
                                <TableHead>To</TableHead>
                                <TableHead>Direction</TableHead>
                                <TableHead>Started at</TableHead>
                                <TableHead>Ended at</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Session</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {callsData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="h-24 text-center">
                                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                                            <p>No results.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                callsData.map((call) => (
                                    <TableRow key={call.id}>
                                        <TableCell className="font-mono text-xs">{call.id}</TableCell>
                                        <TableCell>{call.from}</TableCell>
                                        <TableCell>{call.to}</TableCell>
                                        <TableCell>{call.direction}</TableCell>
                                        <TableCell className="text-muted-foreground text-xs">{call.startedAt}</TableCell>
                                        <TableCell className="text-muted-foreground text-xs">{call.endedAt}</TableCell>
                                        <TableCell>{call.duration}</TableCell>
                                        <TableCell className="font-mono text-xs text-muted-foreground">{call.session}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={statusStyles[call.status]}>
                                                {call.status}
                                            </Badge>
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
