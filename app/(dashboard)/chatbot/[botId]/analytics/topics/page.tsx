"use client";

import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
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
import { useState } from "react";
import { TopicManagement } from "@/components/analytics/topic-management";
import { TimePeriodSelector } from "@/components/analytics/time-period-selector";
import { TopicOverviewCards } from "@/components/analytics/topic-overview-cards";
import { TopicLineChart } from "@/components/analytics/topic-line-chart";
import { TopicPieChart } from "@/components/analytics/topic-pie-chart";
import { TopicSummaryTable } from "@/components/analytics/topic-summary-table";

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

  // Transform pie chart data for recharts
  const transformPieChartData = () => {
    if (!pieChartData?.topics || pieChartData.topics.length === 0) return [];
    
    return pieChartData.topics.map((topic, index) => ({
      name: topic.topicName,
      value: topic.messages,
      likes: topic.likes,
      dislikes: topic.dislikes,
      color: topic.color || COLORS[index % COLORS.length]
    }));
  };

  if (barChartError || pieChartError) {
    return (
      <div className="px-4 md:px-6 py-4 md:py-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold tracking-tight">Topics</h1>
          <p className="text-sm text-muted-foreground">
            Analyze conversation topics and trending themes
          </p>
        </div>
        <Card className="p-4">
          <p className="text-sm text-destructive">Error loading topic data. Please try again later.</p>
        </Card>
      </div>
    );
  }

  const transformedPieData = transformPieChartData();

  return (
    <div className="px-4 md:px-6 py-4 md:py-6 space-y-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Topics</h1>
        <p className="text-sm text-muted-foreground">
          Analyze conversation topics and trending themes
        </p>
      </div>

      <TopicManagement
        topics={topics}
        isLoading={topicsLoading}
        error={topicsError}
        isCreateDialogOpen={isCreateDialogOpen}
        setIsCreateDialogOpen={setIsCreateDialogOpen}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        newTopicName={newTopicName}
        setNewTopicName={setNewTopicName}
        editingTopic={editingTopic}
        setEditingTopic={setEditingTopic}
        deletingTopicId={deletingTopicId}
        setDeletingTopicId={setDeletingTopicId}
        onCreateTopic={handleCreateTopic}
        onUpdateTopic={handleUpdateTopic}
        onDeleteTopic={handleDeleteTopic}
        createPending={createTopicMutation.isPending}
        updatePending={updateTopicMutation.isPending}
        deletePending={deleteTopicMutation.isPending}
      />

      <TimePeriodSelector
        selectedDays={selectedDays}
        onDaysChange={setSelectedDays}
        startDate={barChartData?.dateRange?.startDate || pieChartData?.dateRange?.startDate}
        endDate={barChartData?.dateRange?.endDate || pieChartData?.dateRange?.endDate}
      />

      {transformedPieData.length > 0 && (
        <TopicOverviewCards topics={transformedPieData} />
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <TopicLineChart
          topics={barChartData?.topics}
          isLoading={barChartLoading}
          formatDate={formatDate}
        />

        <TopicPieChart
          topics={transformedPieData}
          isLoading={pieChartLoading}
        />
      </div>

      <TopicSummaryTable
        topics={transformedPieData}
        isLoading={pieChartLoading}
      />
    </div>
  );
}
