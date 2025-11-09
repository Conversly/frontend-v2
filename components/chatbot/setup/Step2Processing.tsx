'use client';

import React from "react";

export function Step2Processing() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-[28px] font-semibold leading-[130%] tracking-[-1.12px] text-center">
        Processing your site
      </h1>
      <p className="text-sm leading-[140%] tracking-[-0.28px] text-muted-foreground text-center">
        Analyzing your site and preparing data sources...
      </p>
      <div className="mt-2 h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}


