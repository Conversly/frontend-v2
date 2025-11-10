"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  useTopicBarChartQuery, 
  useTopicPieChartQuery
} from "@/services/analytics";
import {
  useTopicsQuery,
  useCreateTopicMutation,
  useUpdateTopicMutation,
  useDeleteTopicMutation
} from "@/services/chatbot";
import { BarChart3, PieChart, Calendar, TrendingUp, MessageSquare, ThumbsUp, ThumbsDown, Plus, Edit, Trash2, Settings } from "lucide-react";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { useState } from "react";

 

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7c7c'];

export default function TopicsPage() {
  const routeParams = useParams<{ botId: string }>();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
  const [selectedDays, setSelectedDays] = useState<number>(7);
  
  // Topic management state  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [editingTopic, setEditingTopic] = useState<{ id: number; name: string } | null>(null);
  const [deletingTopicId, setDeletingTopicId] = useState<number | null>(null);
  
  // Chart data queries
  const { data: barChartData, isLoading: barChartLoading, error: barChartError } = useTopicBarChartQuery(botId, selectedDays);
  const { data: pieChartData, isLoading: pieChartLoading, error: pieChartError } = useTopicPieChartQuery(botId, selectedDays);
  
  // Topic CRUD queries and mutations
  const { data: topics, isLoading: topicsLoading, error: topicsError } = useTopicsQuery(botId);
  const createTopicMutation = useCreateTopicMutation();
  const updateTopicMutation = useUpdateTopicMutation(botId);
  const deleteTopicMutation = useDeleteTopicMutation(botId);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  // Topic CRUD handlers
  const handleCreateTopic = async () => {
    if (!newTopicName.trim()) {
      toast.error("Topic name is required");
      return;
    }

    try {
      await createTopicMutation.mutateAsync({
        chatbotId: parseInt(botId),
        name: newTopicName.trim()
      });
      
      toast.success("Topic created successfully");
      setNewTopicName("");
      setIsCreateDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to create topic");
    }
  };

  const handleUpdateTopic = async () => {
    if (!editingTopic || !editingTopic.name.trim()) {
      toast.error("Topic name is required");
      return;
    }

    try {
      await updateTopicMutation.mutateAsync({
        id: editingTopic.id,
        name: editingTopic.name.trim()
      });
      
      toast.success("Topic updated successfully");
      setEditingTopic(null);
      setIsEditDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to update topic");
    }
  };

  const handleDeleteTopic = async () => {
    if (!deletingTopicId) return;

    try {
      await deleteTopicMutation.mutateAsync({ id: deletingTopicId });
      
      toast.success("Topic deleted successfully");
      setDeletingTopicId(null);
      setIsDeleteDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete topic");
    }
  };

  const openEditDialog = (topic: { id: number; name: string }) => {
    setEditingTopic(topic);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (topicId: number) => {
    setDeletingTopicId(topicId);
    setIsDeleteDialogOpen(true);
  };

  // Transform bar chart data for multi-line chart
  const transformLineChartData = () => {
    if (!barChartData?.topics || barChartData.topics.length === 0) return [];
    
    // Get all unique dates from all topics
    const allDates = new Set<string>();
    barChartData.topics.forEach(topic => {
      topic.series.forEach(point => allDates.add(point.date));
    });
    
    // Sort dates
    const sortedDates = Array.from(allDates).sort();
    
    // Transform data for recharts line chart
    return sortedDates.map(date => {
      const dataPoint: any = { date: formatDate(date) };
      
      barChartData.topics.forEach(topic => {
        const point = topic.series.find(p => p.date === date);
        dataPoint[topic.topicName] = point?.messages || 0;
      });
      
      return dataPoint;
    });
  };

  // Transform pie chart data for recharts
  const transformPieChartData = () => {
    if (!pieChartData?.topics || pieChartData.topics.length === 0) return [];
    
    return pieChartData.topics.map((topic, index) => ({
      name: topic.topicName,
      value: topic.messages,
      likes: topic.likes,
      dislikes: topic.dislikes,
      color: topic.color || COLORS[index % COLORS.length]  // Use API color or fallback
    }));
  };

  if (barChartError || pieChartError) {
    return (
      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Topics</h1>
          <p className="text-muted-foreground">
            Analyze conversation topics and trending themes
          </p>
        </div>
        <Card className="p-6">
          <p className="text-destructive">Error loading topic data. Please try again later.</p>
        </Card>
      </div>
    );
  }

  const transformedLineData = transformLineChartData();
  const transformedPieData = transformPieChartData();

  return (
    <div className="container py-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Topics</h1>
        <p className="text-muted-foreground">
          Analyze conversation topics and trending themes
        </p>
      </div>

      {/* Topic Management Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Topic Management</h3>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Topic
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Topic</DialogTitle>
                <DialogDescription>
                  Add a new topic to track and analyze conversations.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="topicName">Topic Name</Label>
                  <Input
                    id="topicName"
                    value={newTopicName}
                    onChange={(e) => setNewTopicName(e.target.value)}
                    placeholder="Enter topic name..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleCreateTopic();
                      }
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateTopic}
                  disabled={createTopicMutation.isPending}
                >
                  {createTopicMutation.isPending ? "Creating..." : "Create Topic"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Topics List */}
        {topicsLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                <Skeleton className="h-4 w-48" />
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : topicsError ? (
          <p className="text-destructive text-center py-4">Error loading topics. Please try again.</p>
        ) : topics && topics.length > 0 ? (
          <div className="space-y-3">
            {topics.map((topic) => (
              <div key={topic.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full shrink-0" 
                    style={{ backgroundColor: topic.color || '#8884d8' }}
                  />
                  <div>
                    <span className="font-medium">{topic.name}</span>
                    <p className="text-sm text-muted-foreground">
                      Created {new Date(topic.createdAt || '').toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog({ id: topic.id, name: topic.name })}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDeleteDialog(topic.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h4 className="text-lg font-medium mb-2">No topics yet</h4>
            <p className="text-muted-foreground mb-4">
              Create your first topic to start tracking conversation themes.
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Topic
            </Button>
          </div>
        )}

        {/* Edit Topic Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Topic</DialogTitle>
              <DialogDescription>
                Update the topic name.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="editTopicName">Topic Name</Label>
                <Input
                  id="editTopicName"
                  value={editingTopic?.name || ""}
                  onChange={(e) => setEditingTopic(editingTopic ? { ...editingTopic, name: e.target.value } : null)}
                  placeholder="Enter topic name..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUpdateTopic();
                    }
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleUpdateTopic}
                disabled={updateTopicMutation.isPending}
              >
                {updateTopicMutation.isPending ? "Updating..." : "Update Topic"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Topic</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this topic? This action cannot be undone and will affect your analytics data.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={handleDeleteTopic}
                disabled={deleteTopicMutation.isPending}
              >
                {deleteTopicMutation.isPending ? "Deleting..." : "Delete Topic"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>

      {/* Time Period Selector */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span className="font-medium">Time Period:</span>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={selectedDays === 7 ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDays(7)}
            >
              7 Days
            </Button>
            <Button
              variant={selectedDays === 30 ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDays(30)}
            >
              30 Days
            </Button>
          </div>
        </div>
        {(barChartData || pieChartData) && (
          <div className="mt-2 text-sm text-muted-foreground">
            Data from {barChartData?.dateRange?.startDate || pieChartData?.dateRange?.startDate} to{' '}
            {barChartData?.dateRange?.endDate || pieChartData?.dateRange?.endDate}
          </div>
        )}
      </Card>

      {/* Topic Overview with Total Count */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Topics Overview</h3>
            <div className="text-right">
              <div className="text-2xl font-bold">{transformedPieData.length}</div>
              <div className="text-sm text-muted-foreground">Total topics</div>
            </div>
          </div>
          <div className="space-y-3 max-h-[200px] overflow-y-auto">
            {transformedPieData.map((topic, index) => (
              <div key={topic.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full shrink-0" 
                    style={{ backgroundColor: topic.color }}
                  />
                  <span className="text-sm font-medium truncate">{topic.name}</span>
                </div>
                <span className="text-sm font-semibold">{topic.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top 2 Topic Cards */}
        {transformedPieData.slice(0, 2).map((topic, index) => (
          <Card key={topic.name} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground truncate">{topic.name}</p>
                <div className="text-2xl font-bold">{topic.value}</div>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1 text-sm">
                    <ThumbsUp className="h-3 w-3 text-green-600" />
                    <span className="text-green-600">{topic.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <ThumbsDown className="h-3 w-3 text-red-600" />
                    <span className="text-red-600">{topic.dislikes}</span>
                  </div>
                </div>
              </div>
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: topic.color }}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Topic Messages Over Time - Line Chart */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-5 w-5 mr-2" />
            <h3 className="text-lg font-semibold">Topic Messages Over Time</h3>
          </div>
          {barChartLoading ? (
            <Skeleton className="h-[400px] w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={transformedLineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {barChartData?.topics.map((topic, index) => (
                  <Line
                    key={topic.topicId}
                    type="monotone"
                    dataKey={topic.topicName}
                    stroke={topic.color || COLORS[index % COLORS.length]}
                    strokeWidth={2}
                    dot={{ fill: topic.color || COLORS[index % COLORS.length], strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: topic.color || COLORS[index % COLORS.length] }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>

        {/* Topic Distribution - Pie Chart */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <PieChart className="h-5 w-5 mr-2" />
            <h3 className="text-lg font-semibold">Topic Distribution</h3>
          </div>
          {pieChartLoading ? (
            <Skeleton className="h-[400px] w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <RechartsPieChart>
                <Pie
                  data={transformedPieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={(entry: any) => 
                    `${entry.name}: ${entry.value} (${(entry.percent * 100).toFixed(0)}%)`
                  }
                >
                  {transformedPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any, name: any, props: any) => [
                    `Messages: ${value}`,
                    `Likes: ${props.payload.likes}`,
                    `Dislikes: ${props.payload.dislikes}`
                  ]}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>

      {/* Topic Details Table */}
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <MessageSquare className="h-5 w-5 mr-2" />
          <h3 className="text-lg font-semibold">Topic Summary</h3>
        </div>
        {pieChartLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Topic</th>
                  <th className="text-left py-3 px-4 font-medium">Messages</th>
                  <th className="text-left py-3 px-4 font-medium">Likes</th>
                  <th className="text-left py-3 px-4 font-medium">Dislikes</th>
                  <th className="text-left py-3 px-4 font-medium">Engagement Rate</th>
                </tr>
              </thead>
              <tbody>
                {transformedPieData && transformedPieData.length > 0 ? (
                  transformedPieData.map((topic, index) => {
                    const totalFeedback = topic.likes + topic.dislikes;
                    const engagementRate = topic.value > 0 ? ((totalFeedback / topic.value) * 100).toFixed(1) : '0.0';
                    
                    return (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: topic.color }}
                            />
                            <span className="font-medium">{topic.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium">{topic.value}</td>
                        <td className="py-3 px-4">
                          <span className="text-green-600 font-medium">{topic.likes}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-red-600 font-medium">{topic.dislikes}</span>
                        </td>
                        <td className="py-3 px-4">{engagementRate}%</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                      No topic data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
