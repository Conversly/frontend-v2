"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
    MessageSquare,
    Tag,
    Percent,
    ShoppingBag,
    Calendar,
    Clock,
    Check,
    ArrowRight,
    MousePointer2,
    Zap,
    Bell,
    Shield
} from "lucide-react";

const BackgroundPattern = ({ children, className = "" }: { children?: React.ReactNode; className?: string }) => (
    <div className={`w-full h-full relative overflow-hidden flex items-center justify-center p-6 border-l border-slate-100 ${className}`}>
        {/* Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-40">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        {/* Soft Gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-tr from-emerald-500/5 via-slate-50/50 to-blue-500/5"></div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[320px] flex flex-col items-center justify-center">
            {children}
        </div>
    </div>
);

// --- Visual 1: Messaging Categories ---
export const MessagingCategoriesVisual = () => {
    const messages = [
        {
            type: "Marketing",
            icon: <Percent size={14} />,
            color: "bg-orange-100 text-orange-600",
            title: "Flash Sale Alert! 🔥",
            body: "Get 50% off on all sneakers today. Limited time only!",
            time: "10:00 AM"
        },
        {
            type: "Utility",
            icon: <ShoppingBag size={14} />,
            color: "bg-blue-100 text-blue-600",
            title: "Order Confirmed 📦",
            body: "Your order #8291 has been shipped. Track it here.",
            time: "2:30 PM"
        },
        {
            type: "Carousel",
            icon: <Tag size={14} />,
            color: "bg-purple-100 text-purple-600",
            title: "New Arrivals ✨",
            body: "Check out our summer collection. Swipe to view ->",
            time: "4:15 PM"
        },
        {
            type: "Auth",
            icon: <MessageSquare size={14} />,
            color: "bg-green-100 text-green-600",
            title: "Verify Account 🔐",
            body: "Your OTP is 4829. Do not share this with anyone.",
            time: "6:00 PM"
        }
    ];

    return (
        <BackgroundPattern>
            {/* Floating Decorative Elements */}
            <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -left-12 text-emerald-500/10 z-0"
            >
                <MessageSquare size={80} />
            </motion.div>
            <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -right-16 text-blue-500/10 z-0"
            >
                <Zap size={60} />
            </motion.div>

            <div className="relative w-full bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden h-[380px]">
                {/* Header */}
                <div className="bg-[#075e54] p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs">
                        B
                    </div>
                    <div className="flex-1">
                        <div className="text-white text-sm font-semibold">Broadcaster</div>
                        <div className="text-white/70 text-2xs">Official Business Account</div>
                    </div>
                </div>

                {/* Message Feed */}
                <div
                    className="p-4 space-y-3 h-full overflow-hidden bg-[#E5DDD5] relative"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                >
                    <div className="flex flex-col gap-3">
                        {messages.map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.8, duration: 0.5, type: "spring" }}
                                className="bg-white rounded-lg p-2.5 shadow-sm max-w-[90%] self-start relative z-10"
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`text-2xs px-1.5 py-0.5 rounded font-medium ${msg.color} flex items-center gap-1`}>
                                        {msg.icon} {msg.type}
                                    </span>
                                </div>
                                <div className="font-semibold text-slate-800 text-sm mb-0.5">{msg.title}</div>
                                <div className="text-slate-600 text-xs leading-snug">{msg.body}</div>
                                <div className="text-2xs text-slate-400 text-right mt-1">{msg.time}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </BackgroundPattern>
    );
};

// --- Visual 2: CTA & Conversions ---
export const CTAVisual = () => {
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setClicked(true);
            setTimeout(() => setClicked(false), 3000);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <BackgroundPattern>
            {/* Floating Decorative Elements */}
            <motion.div
                animate={{ y: [-10, 10, -10], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 right-0 text-orange-500/10 z-0"
            >
                <ShoppingBag size={72} />
            </motion.div>
            <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-12 -left-10 text-emerald-500/10 z-0"
            >
                <MousePointer2 size={64} />
            </motion.div>

            <div className="relative w-full bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden h-[380px] flex flex-col">
                {/* Header */}
                <div className="bg-[#075e54] p-3 text-white text-sm font-semibold text-center">
                    Summer Sale Bot
                </div>

                {/* Chat */}
                <div
                    className="flex-1 bg-[#E5DDD5] p-4 flex flex-col items-center justify-center relative"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                >
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-white p-1 rounded-lg shadow-sm w-full max-w-[260px] overflow-hidden"
                    >
                        <div className="h-32 bg-stone-100 rounded-md mb-2 flex items-center justify-center text-4xl">👟</div>
                        <div className="px-2 pb-2">
                            <h4 className="font-bold text-slate-800">Summer Sneakers 2024</h4>
                            <p className="text-xs text-slate-600 mt-1">
                                Our latest collection is finally here!
                                <br />Get <span className="font-bold text-green-600">30% OFF</span> on your first order.
                            </p>
                            <p className="text-2xs text-slate-400 mt-2">Offers expire in 24h</p>
                        </div>

                        {/* Buttons */}
                        <div className="border-t border-slate-100 mt-2">
                            <button className="w-full py-2.5 text-[#00a884] font-medium text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 border-b border-slate-100">
                                <ShoppingBag size={14} /> Shop Now
                            </button>
                            <button className="w-full py-2.5 text-[#00a884] font-medium text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 relative">
                                Stop Promotions
                            </button>
                        </div>
                    </motion.div>

                    {/* Mouse Pointer Simulation */}
                    <motion.div
                        className="absolute z-20"
                        animate={clicked ? {
                            top: ["65%", "62%"],
                            left: ["60%", "60%"],
                            scale: [1, 0.9, 1]
                        } : {
                            top: "75%",
                            left: "80%"
                        }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                    >
                        <MousePointer2 className="fill-black text-white w-6 h-6 drop-shadow-md" />
                    </motion.div>

                    {/* Click Effect Ripple */}
                    {clicked && (
                        <motion.div
                            className="absolute top-[62%] left-[55%] w-8 h-8 rounded-full bg-[#00a884]/30"
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        />
                    )}
                </div>
            </div>
        </BackgroundPattern>
    );
};

// --- Visual 3: Scheduling ---
export const SchedulingVisual = () => {
    return (
        <BackgroundPattern>
            {/* Floating Decorative Elements */}
            <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 -right-6 text-slate-900/5 z-0"
            >
                <Clock size={100} />
            </motion.div>
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-6 left-6 text-emerald-600/10 z-0"
            >
                <Calendar size={60} />
            </motion.div>

            <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-6 w-full max-w-xs relative overflow-hidden z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                        <Calendar size={20} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800">Schedule Broadcast</h4>
                        <p className="text-xs text-slate-500">Pick a date & time</p>
                    </div>
                </div>

                {/* Calendar Simulation */}
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 mb-4">
                    <div className="flex justify-between items-center mb-2 px-1">
                        <span className="font-bold text-sm text-slate-700">October 2024</span>
                        <div className="flex gap-1">
                            <div className="w-4 h-4 rounded bg-slate-200"></div>
                            <div className="w-4 h-4 rounded bg-slate-200"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-400 mb-1">
                        <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-600">
                        <div className="opacity-30">29</div><div className="opacity-30">30</div>
                        <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div>
                        <div>6</div><div>7</div><div>8</div><div>9</div><div>10</div><div>11</div>
                        <motion.div
                            className="bg-[#00a884] text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto shadow-sm"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >12</motion.div>
                        <div>13</div><div>14</div><div>15</div><div>16</div><div>17</div><div>18</div>
                    </div>
                </div>

                {/* Time Picker */}
                <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-3 border border-slate-100 mb-6">
                    <Clock size={16} className="text-slate-400" />
                    <motion.span
                        className="text-sm font-medium text-slate-700"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        10:00 AM
                    </motion.span>
                </div>

                {/* Button */}
                <motion.button
                    className="w-full bg-[#075e54] text-white rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2 shadow-lg shadow-green-900/10"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Check size={16} /> Schedule Message
                </motion.button>

                {/* Success Notification */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2, type: "spring" }}
                    className="absolute bottom-4 left-4 right-4 bg-slate-800 text-white text-xs py-2 px-3 rounded-md shadow-lg flex items-center gap-2"
                >
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-black text-2xs">✓</div>
                    Scheduled for Oct 12
                </motion.div>
            </div>
        </BackgroundPattern>
    );
};
