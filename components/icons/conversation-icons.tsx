export const conversationStateIconMap: Record<string, { icon: string; wrapperClass: string }> = {
    AI_ACTIVE: {
        icon: "electric_bolt",
        wrapperClass: "text-white flex items-center justify-center rounded-full bg-violet-600 shrink-0 size-7 shadow-sm",
    },
    ESCALATED_UNASSIGNED: {
        icon: "priority_high",
        wrapperClass: "text-white flex items-center justify-center rounded-full bg-amber-500 shrink-0 size-7 shadow-sm",
    },
    ASSIGNED: {
        icon: "person",
        wrapperClass: "text-white flex items-center justify-center rounded-full bg-primary shrink-0 size-7 shadow-sm",
    },
    HUMAN_WAITING_USER: {
        icon: "schedule_send",
        wrapperClass: "text-slate-700 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-300 shrink-0 size-7 shadow-sm",
    },
    USER_WAITING_HUMAN: {
        icon: "more_horiz",
        wrapperClass: "text-white flex items-center justify-center rounded-full bg-rose-500 shrink-0 size-7 shadow-sm",
    },
    RESOLVED: {
        icon: "check",
        wrapperClass: "text-white flex items-center justify-center rounded-full bg-emerald-500 shrink-0 size-7 shadow-sm",
    },
    CLOSED: {
        icon: "inventory_2",
        wrapperClass: "text-white flex items-center justify-center rounded-full bg-slate-400 dark:bg-slate-200 shrink-0 size-7 shadow-sm",
    },
};

