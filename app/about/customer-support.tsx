import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const CustomerSupport = () => {
    return (
        <section id="customerSupport" className="bg-background py-24 text-foreground relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl translate-y-1/3 translate-x-1/3"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        className="text-left"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Badge variant="outline" className="mb-4 text-primary border-primary/20 bg-primary/10">
                            Support Automation
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                            Support That Never Sleeps
                            <span className="block text-xl md:text-2xl font-normal text-muted-foreground mt-4">Answer 1,000+ Conversations Simultaneously</span>
                        </h2>

                        <div className="space-y-8 mt-8">
                            <SupportFeature icon="⚡" title="<2 Second Response Time" desc="Customers don't wait. AI responds instantly 24/7 — no hold music, no 'please wait', no frustration." color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
                            <SupportFeature icon="🤖" title="Handle 80% of Tickets Automatically" desc="AI resolves routine questions instantly. Your team focuses on complex issues that need human touch." color="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" />
                            <SupportFeature icon="🎯" title="94% Customer Satisfaction" desc="Accurate, on-brand responses every time. No bad days, no inconsistency — just reliable support at scale." color="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" />
                        </div>

                        <div className="mt-10">
                            <div className="inline-flex items-center px-4 py-2 bg-muted rounded-full border border-border">
                                <span className="text-sm font-medium text-primary">🚀 Reduce Response Time by 90%</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <ChatInterface />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const SupportFeature = ({ icon, title, desc, color }: { icon: string, title: string, desc: string, color: string }) => (
    <div className="flex items-start space-x-5 group">
        <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
            <span className="text-2xl">{icon}</span>
        </div>
        <div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{desc}</p>
        </div>
    </div>
);

const ChatInterface = () => (
    <Card className="border-border shadow-2xl relative overflow-hidden bg-card/80 backdrop-blur-sm">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-primary"></div>
        <CardContent className="p-6">
            <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-4">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-xl">🤖</div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                        </div>
                        <div>
                            <div className="font-semibold text-sm">Design Assistant AI</div>
                            <div className="text-xs text-muted-foreground">Online</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 min-h-[300px]">
                    <ChatMessage sender="AI" message="Hello! How can I help you today?" isUser={false} />
                    <ChatMessage sender="You" message="I need help tracking my order #12345" isUser={true} />
                    <ChatMessage sender="AI" message="I've found your order. It's currently out for delivery and will arrive today between 2-4 PM." isUser={false} />
                </div>

                <div className="flex gap-2 pt-2">
                    <Input placeholder="Type your message..." className="bg-muted/50" />
                    <Button size="icon" className="shrink-0">
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </CardContent>
    </Card>
);

const ChatMessage = ({ sender, message, isUser }: { sender: string, message: string, isUser: boolean }) => (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : ''}`}>
        {!isUser && <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold shrink-0">{sender}</div>}

        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${isUser ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted text-foreground rounded-bl-none'}`}>
            <p>{message}</p>
        </div>

        {isUser && <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs font-bold shrink-0">{sender}</div>}
    </div>
);

export default CustomerSupport;
