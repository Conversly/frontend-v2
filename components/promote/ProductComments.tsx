"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Comment } from "@/types/promote";
import { MessageCircle, ThumbsUp, Flag, Share2, MoreHorizontal, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { addComment, replyToComment, upvoteComment } from "@/lib/api/promote";
import { toast } from "sonner";

interface ProductCommentsProps {
    comments: Comment[];
    productId: string;
}

function CommentItem({ comment, isReply = false, productId }: { comment: Comment; isReply?: boolean; productId: string }) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isReplying, setIsReplying] = useState(false);
    const [replyContent, setReplyContent] = useState("");

    const handleReply = async () => {
        if (!replyContent.trim()) return;
        try {
            await replyToComment(productId, comment.id, {
                content: replyContent,
                author: {
                    name: "Visitor", // In a real app, get from auth context
                    avatarUrl: "https://github.com/shadcn.png"
                }
            });
            setReplyContent("");
            setIsReplying(false);
            window.location.reload();
        } catch (error) {
            console.error(error);
            toast.error("Failed to post reply");
        }
    };

    const handleUpvote = async () => {
        try {
            await upvoteComment(productId, comment.id);
            window.location.reload();
        } catch (error) {
            console.error(error);
            toast.error("Failed to upvote");
        }
    };

    return (
        <div className={cn("relative", isReply && "ml-8 mt-4")}>
            {/* Vertical Line for Threading */}
            {isReply && (
                <div className="absolute -left-4 top-0 bottom-0 w-px bg-border" />
            )}
            {isReply && (
                <div className="absolute -left-4 top-6 w-4 h-px bg-border" />
            )}

            <div className="flex gap-3">
                <div className="flex flex-col items-center gap-1">
                    <Avatar className="w-8 h-8 border">
                        <AvatarImage src={comment.author.avatarUrl} />
                        <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                    </Avatar>
                    {comment.replies && comment.replies.length > 0 && (
                        <div className="w-px h-full bg-border my-1 flex-1 min-h-[20px]" />
                    )}
                </div>

                <div className="flex-1 space-y-1.5 pb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm">{comment.author.name}</span>
                        {comment.author.badge && (
                            <div className="flex items-center gap-1 bg-primary/10 text-primary px-1.5 py-0.5 rounded text-2xs font-medium">
                                {comment.author.isMaker && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                {comment.author.badge}
                            </div>
                        )}
                        {comment.author.isMaker && !comment.author.badge && (
                            <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-1.5 py-0.5 rounded text-2xs font-medium">
                                Maker
                            </span>
                        )}
                        {comment.author.username && (
                            <span className="text-xs text-muted-foreground">{comment.author.username}</span>
                        )}
                    </div>

                    <p className="text-sm text-foreground/90 leading-relaxed">
                        {comment.content}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                        <button onClick={handleUpvote} className="flex items-center gap-1 hover:text-foreground transition-colors">
                            <ChevronUp className="w-4 h-4" />
                            <span>Upvote ({comment.upvotes})</span>
                        </button>
                        <button onClick={() => setIsReplying(!isReplying)} className="flex items-center gap-1 hover:text-foreground transition-colors">
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Reply</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                            <Share2 className="w-3.5 h-3.5" />
                            <span>Share</span>
                        </button>
                        <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                    </div>

                    {isReplying && (
                        <div className="mt-2 flex gap-2">
                            <Textarea
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                placeholder="Write a reply..."
                                className="min-h-[60px]"
                            />
                            <Button size="sm" onClick={handleReply}>Reply</Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Nested Replies */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="pl-0">
                    {comment.replies.map((reply) => (
                        <CommentItem key={reply.id} comment={reply} isReply={true} productId={productId} />
                    ))}
                </div>
            )}
        </div>
    );
}

export function ProductComments({ comments, productId }: ProductCommentsProps) {
    const [newComment, setNewComment] = useState("");

    const handlePostComment = async () => {
        if (!newComment.trim()) return;
        try {
            await addComment(productId, {
                content: newComment,
                author: {
                    name: "Visitor",
                    avatarUrl: "https://github.com/shadcn.png"
                }
            });
            setNewComment("");
            window.location.reload();
        } catch (error) {
            console.error(error);
            toast.error("Failed to post comment");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Discussion</h3>
                <Button variant="outline" size="sm">
                    Subscribe
                </Button>
            </div>

            <Card className="border-none shadow-none bg-transparent">
                <CardContent className="p-0 space-y-6">
                    {/* Comment Input */}
                    <div className="flex gap-4 mb-8">
                        <Avatar className="w-10 h-10">
                            <AvatarFallback>ME</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                            <Textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="What do you think?"
                                className="min-h-[100px] resize-none bg-background/50"
                            />
                            <div className="flex justify-end">
                                <Button size="sm" onClick={handlePostComment}>Post Comment</Button>
                            </div>
                        </div>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-2">
                        {comments.map((comment) => (
                            <CommentItem key={comment.id} comment={comment} productId={productId} />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
