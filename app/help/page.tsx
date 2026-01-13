import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";

export default function HelpPage() {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Navbar />
            <div className="flex-1 w-full relative">
                <iframe
                    src="http://localhost:3000/help/l4bs8zimd208g8p2x463yty3"
                    title="Verly AI Help Center"
                    allow="clipboard-write; microphone; camera"
                    loading="lazy"
                    className="w-full h-full border-0"
                >
                </iframe>
            </div>
            {/* <Footer /> */}
        </div>
    );
}
// import React from "react";
// import { HelpChat } from "@/components/help/HelpChat";
// import { Mail, MessageCircle, Phone } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import Link from "next/link";
// import Navbar from "@/components/landing/navbar";

// export default function HelpPage() {
//     return (
//         <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 animate-in fade-in duration-500">
//             <Navbar />
//             <div className="container max-w-6xl mx-auto py-12 px-4 space-y-16">

//                 {/* Hero / Chat Section */}
//                 <section className="space-y-6 text-center">
//                     <div className="space-y-2">
//                         <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
//                             How can we help?
//                         </h1>
//                         <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//                             Ask our AI assistant below or browse our support channels for more personalized help.
//                         </p>
//                     </div>

//                     <div className="mt-8">
//                         <HelpChat />
//                     </div>
//                 </section>

//                 {/* Support Channels Section */}
//                 <section className="space-y-8">
//                     <div className="text-center space-y-2">
//                         <h2 className="text-2xl font-semibold tracking-tight">Still need help?</h2>
//                         <p className="text-muted-foreground">
//                             Our team is available through these channels
//                         </p>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         {/* Email Channel */}
//                         <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 relative overflow-hidden">
//                             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//                             <CardHeader>
//                                 <div className="mb-4 w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
//                                     <Mail className="w-6 h-6" />
//                                 </div>
//                                 <CardTitle>Email Support</CardTitle>
//                                 <CardDescription>Get a response within 24 hours</CardDescription>
//                             </CardHeader>
//                             <CardContent>
//                                 <Button className="w-full" variant="outline" asChild>
//                                     <Link href="mailto:support@conversly.ai">
//                                         Send an Email
//                                     </Link>
//                                 </Button>
//                             </CardContent>
//                         </Card>

//                         {/* Live Chat Channel */}
//                         <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 relative overflow-hidden">
//                             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//                             <CardHeader>
//                                 <div className="mb-4 w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
//                                     <MessageCircle className="w-6 h-6" />
//                                 </div>
//                                 <CardTitle>Live Chat</CardTitle>
//                                 <CardDescription>Chat with our support team</CardDescription>
//                             </CardHeader>
//                             <CardContent>
//                                 <Button className="w-full" variant="outline" asChild>
//                                     {/* Placeholder for live chat trigger - typically opens a widget */}
//                                     <Link href="#">
//                                         Start Chat
//                                     </Link>
//                                 </Button>
//                             </CardContent>
//                         </Card>

//                         {/* WhatsApp Channel */}
//                         <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 relative overflow-hidden">
//                             <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//                             <CardHeader>
//                                 <div className="mb-4 w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
//                                     <Phone className="w-6 h-6" />
//                                 </div>
//                                 <CardTitle>WhatsApp</CardTitle>
//                                 <CardDescription>Instant answers on your phone</CardDescription>
//                             </CardHeader>
//                             <CardContent>
//                                 <Button className="w-full" variant="outline" asChild>
//                                     <Link href="https://wa.me/1234567890" target="_blank">
//                                         Message us
//                                     </Link>
//                                 </Button>
//                             </CardContent>
//                         </Card>
//                     </div>
//                 </section>

//             </div>
//         </div>
//     );
// }
