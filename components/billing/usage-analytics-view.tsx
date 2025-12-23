
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, ChevronRight, TrendingUp, TrendingDown, MessageSquare, Clock, Zap } from "lucide-react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { Progress } from "@/components/ui/progress";

interface UsageAnalyticsViewProps {
    onNavigateToChatbot: (chatbotId: string) => void;
}

export function UsageAnalyticsView({ onNavigateToChatbot }: UsageAnalyticsViewProps) {
    const [dateRange, setDateRange] = useState("30d");

    // Mock Data for Charts
    const xLabels = ["Apr 10", "Apr 12", "Apr 14", "Apr 16", "Apr 18", "Apr 20", "Apr 22", "Apr 24", "Apr 26", "Apr 28"];
    const chatbotData = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 4200, 3800, 4500];
    const whatsappData = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 2400, 1398, 9800].map(v => v * 0.3); // Scale down
    const voiceData = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 2400, 1398, 9800].map(v => v * 0.1); // Scale down
    const burnRateData = [4500, 4200, 4800, 5000, 5200, 5500, 6000, 6200, 6400, 6800];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4">
                <h1 className="text-2xl font-semibold text-foreground">Usage Analytics</h1>
                <Button variant="outline" size="sm" className="gap-2 bg-white">
                    <Download className="w-4 h-4" /> Download CSV
                </Button>
            </div>

            {/* Navigation Tabs */}
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="bg-transparent p-0 border-b w-full justify-start h-auto rounded-none space-x-6">
                    <TabsTrigger
                        value="overview"
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-2 text-muted-foreground data-[state=active]:text-foreground font-medium"
                    >
                        Overview
                    </TabsTrigger>
                    <TabsTrigger
                        value="chatbot"
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-2 text-muted-foreground data-[state=active]:text-foreground font-medium"
                    >
                        Chatbot
                    </TabsTrigger>
                    <TabsTrigger
                        value="whatsapp"
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-2 text-muted-foreground data-[state=active]:text-foreground font-medium"
                    >
                        WhatsApp
                    </TabsTrigger>
                    <TabsTrigger
                        value="voice"
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-2 text-muted-foreground data-[state=active]:text-foreground font-medium"
                    >
                        Voice
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 pt-6">

                    {/* SECTION 1: SPENDING BY SERVICE (30D) */}
                    <Card className="shadow-sm border-border/50 bg-white rounded-xl">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-medium">Spending by Service (30d)</CardTitle>
                            <Select defaultValue="30d">
                                <SelectTrigger className="w-[140px] h-8 text-xs bg-gray-50 border-gray-200">
                                    <SelectValue placeholder="Period" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="7d">Last 7 days</SelectItem>
                                    <SelectItem value="30d">Last 30 days</SelectItem>
                                    <SelectItem value="90d">Last 3 months</SelectItem>
                                </SelectContent>
                            </Select>
                        </CardHeader>
                        <CardContent>
                            {/* Top Metrics Row */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                                <div>
                                    <p className="text-3xl font-bold text-foreground">₹ 11,600</p>
                                    <p className="text-sm text-muted-foreground mt-1 font-medium">Total Spend</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-foreground">14,255</p>
                                    <p className="text-sm text-muted-foreground mt-1 font-medium">Conversations</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-foreground">1,340</p>
                                    <p className="text-sm text-muted-foreground mt-1 font-medium">Est. completions</p>
                                    <p className="text-[10px] text-green-600 font-medium">+30.3%</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-foreground">38 min</p>
                                    <p className="text-sm text-muted-foreground mt-1 font-medium">Avg time to resolution</p>
                                    <p className="text-[10px] text-muted-foreground">Aug lime to G Exataatics</p>
                                </div>
                            </div>

                            {/* Section 2: Spend Trend Chart */}
                            <div className="relative w-full h-[300px]">
                                {/* Custom Legend */}
                                <div className="absolute top-0 right-0 z-10 flex gap-4 text-xs">
                                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500"></span> Chatbot</div>
                                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-300"></span> WhatsApp</div>
                                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400"></span> Voice</div>
                                    <div className="flex items-center gap-1.5"><span className="w-4 h-0.5 rounded-full bg-green-700"></span> Burn rate</div>
                                </div>

                                <BarChart
                                    series={[
                                        { data: chatbotData, stack: 'total', color: '#22c55e', label: 'Chatbot' }, // green-500
                                        { data: whatsappData, stack: 'total', color: '#86efac', label: 'WhatsApp' }, // green-300
                                        { data: voiceData, stack: 'total', color: '#60a5fa', label: 'Voice' }, // blue-400
                                    ]}
                                    xAxis={[{ data: xLabels, scaleType: 'band', categoryGapRatio: 0.5, barGapRatio: 0.1 }]}
                                    margin={{ top: 40, bottom: 30, left: 40, right: 10 }}
                                    height={300}
                                    sx={{
                                        '.MuiBarElement-root': { borderRadius: '4px' },
                                        '& .MuiChartsLegend-root': {
                                            display: 'none'
                                        }
                                    }}
                                />
                                {/* Overlay Line Chart for Burn Rate - requires careful positioning or composition if supported, 
                                    MUI X Charts composition is complex. Simplified approach: separate chart absolute positioned or using ComposedChart if available.
                                    Standard MUI X Charts doesn't easily mix Line and Bar on same axes perfectly in v6 without 'series' mixing.
                                    Trying mixed series in one chart if possible, otherwise just Bar for now.
                                 */}
                            </div>
                        </CardContent>
                    </Card>

                    {/* SECTION 3: TOP CHATBOTS BY COST & PIE CHART */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left: Top Chatbots List */}
                        <Card className="shadow-sm border-border/50 bg-white rounded-xl">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-medium">Top Chatbots by Cost</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-4">
                                <div className="space-y-4">
                                    {/* Bot A */}
                                    <div
                                        className="group cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
                                        onClick={() => onNavigateToChatbot("1")}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600 shadow-sm">
                                                    <MessageSquare className="w-5 h-5" />
                                                </div>
                                                <span className="font-semibold text-foreground text-lg">Bot A</span>
                                            </div>
                                            <span className="text-2xl font-bold text-foreground">2,380</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 h-2.5 bg-secondary/30 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-green-400 to-green-500 w-[75%] rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sales Bot */}
                                    <div
                                        className="group cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
                                        onClick={() => onNavigateToChatbot("2")}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                                                    <MessageSquare className="w-5 h-5" />
                                                </div>
                                                <span className="font-semibold text-foreground text-lg">Sales Bot</span>
                                            </div>
                                            <span className="text-2xl font-bold text-foreground">930</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 h-2.5 bg-secondary/30 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-500 w-[30%] rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Right: Cost Distribution Pie Chart */}
                        <Card className="shadow-sm border-border/50 bg-white rounded-xl">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-medium">Cost Distribution</CardTitle>
                                <div className="text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded">Last 30 days</div>
                            </CardHeader>
                            <CardContent className="flex items-center justify-between">
                                <div className="h-[200px] w-[200px]">
                                    <PieChart
                                        series={[{
                                            data: [
                                                { id: 0, value: 89, color: '#3b82f6' }, // Blue
                                                { id: 1, value: 12, color: '#86efac' }, // Light green
                                                { id: 2, value: 5, color: '#d1fae5' }, // Very light
                                            ],
                                            innerRadius: 0,
                                            outerRadius: 90,
                                            paddingAngle: 0,
                                            cornerRadius: 0,
                                        }]}
                                        width={200}
                                        height={200}
                                        sx={{
                                            '& .MuiChartsLegend-root': {
                                                display: 'none'
                                            }
                                        }}
                                    />
                                </div>
                                <div className="space-y-4 flex-1 pl-8">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-foreground">Chatbot</span>
                                            <span className="text-xs text-muted-foreground">Chaante dep</span>
                                        </div>
                                        <span className="bg-yellow-100/50 text-yellow-800 text-sm font-bold px-2 py-1 rounded">89%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-foreground">WhatsApp</span>
                                            <span className="text-xs text-muted-foreground">1 beeter dep</span>
                                        </div>
                                        <span className="bg-green-100/50 text-green-800 text-sm font-bold px-2 py-1 rounded">12%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-foreground">Voice</span>
                                            <span className="text-xs text-muted-foreground">Soy Credits</span>
                                        </div>
                                        <span className="bg-purple-100/50 text-purple-800 text-sm font-bold px-2 py-1 rounded">5%</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* SECTION 4 & 5: BURN RATE & COST BREAKDOWN */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Section 4: Burn Rate & Projected Depletion */}
                        <Card className="shadow-sm border-border/50 bg-white rounded-xl overflow-hidden">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-medium">Burn Rate & Projected Depletion</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50/50 text-muted-foreground font-medium border-b border-gray-100">
                                        <tr>
                                            <th className="px-6 py-4 font-normal">Date</th>
                                            <th className="px-6 py-4 font-normal">Chatbot</th>
                                            <th className="px-6 py-4 font-normal">User</th>
                                            <th className="px-6 py-4 font-normal text-right">Tokens</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        <tr className="hover:bg-gray-50/50">
                                            <td className="px-6 py-4 text-muted-foreground">Apr 30</td>
                                            <td className="px-6 py-4 flex items-center gap-2">
                                                <span className="w-6 h-4 bg-green-600 rounded flex items-center justify-center text-[8px] text-white">...</span>
                                                <span className="font-semibold">Bot A</span>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]">syphi@example.com</td>
                                            <td className="px-6 py-4 text-right font-mono">6.22</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50">
                                            <td className="px-6 py-4 text-muted-foreground">Apr 30</td>
                                            <td className="px-6 py-4 flex items-center gap-2">
                                                <span className="w-6 h-4 bg-green-600 rounded flex items-center justify-center text-[8px] text-white">...</span>
                                                <span className="font-semibold">Bot A</span>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]">ryarfi@example.com</td>
                                            <td className="px-6 py-4 text-right font-mono">9.25</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50">
                                            <td className="px-6 py-4 text-muted-foreground">Apr 33</td>
                                            <td className="px-6 py-4 flex items-center gap-2">
                                                <span className="w-6 h-4 bg-green-600 rounded flex items-center justify-center text-[8px] text-white">...</span>
                                                <span className="font-semibold">Bot A</span>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]">maya@example.com</td>
                                            <td className="px-6 py-4 text-right font-mono">6.23</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>

                        {/* Section 5: Cost Breakdown */}
                        <Card className="shadow-sm border-border/50 bg-white rounded-xl overflow-hidden">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-medium">Cost Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50/50 text-muted-foreground font-medium border-b border-gray-100">
                                        <tr>
                                            <th className="px-6 py-4 font-normal">Burn</th>
                                            <th className="px-6 py-4 font-normal">Status</th>
                                            <th className="px-6 py-4 font-normal text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        <tr className="hover:bg-gray-50/50">
                                            <td className="px-6 py-4">
                                                <span className="bg-green-600 text-white text-xs px-3 py-1.5 rounded-md font-medium shadow-sm flex items-center gap-2 w-fit">
                                                    <TrendingDown className="w-3 h-3" /> Escalated
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> 1
                                            </td>
                                            <td className="px-6 py-4 text-right font-mono">1,16.55</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50">
                                            <td className="px-6 py-4">
                                                <span className="bg-[#eab308] text-white text-xs px-3 py-1.5 rounded-md font-medium shadow-sm flex items-center gap-2 w-fit">
                                                    <Zap className="w-3 h-3" /> Eccalated
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground"></td>
                                            <td className="px-6 py-4 text-right font-mono">5.3</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50">
                                            <td className="px-6 py-4">
                                                <span className="bg-[#818cf8] text-white text-xs px-3 py-1.5 rounded-md font-medium shadow-sm flex items-center gap-2 w-fit">
                                                    <MessageSquare className="w-3 h-3" /> Prone Kasd
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground"></td>
                                            <td className="px-6 py-4 text-right font-mono">5.3</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>
                    </div>

                </TabsContent>

                {/* Placeholders for other tabs */}
                <TabsContent value="chatbot" className="pt-8">
                    <div className="text-center text-muted-foreground">Chatbot specific analytics here (Select a chatbot from Overview)</div>
                </TabsContent>
                <TabsContent value="whatsapp" className="pt-8">
                    <div className="text-center text-muted-foreground">WhatsApp specific analytics</div>
                </TabsContent>
                <TabsContent value="voice" className="pt-8">
                    <div className="text-center text-muted-foreground">Voice specific analytics</div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
