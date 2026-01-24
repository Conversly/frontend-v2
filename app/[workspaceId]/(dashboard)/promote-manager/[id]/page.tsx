"use client";

import { PromoteEditor } from "@/components/promote/PromoteEditor";
import { use } from "react";

export default function EditPromotePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    return <PromoteEditor productId={id} />;
}
