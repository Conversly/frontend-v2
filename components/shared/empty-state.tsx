import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type EmptyStateAction = {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: React.ComponentProps<typeof Button>["variant"];
  className?: string;
  disabled?: boolean;
};

export type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  primaryAction?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  /** Use for extra links (e.g. docs, tips) */
  children?: React.ReactNode;
  className?: string;
};

function ActionButton({ action }: { action: EmptyStateAction }) {
  const content = (
    <>
      {action.icon ? <span className="[&_svg]:size-4">{action.icon}</span> : null}
      {action.label}
    </>
  );

  if (action.href) {
    return (
      <Button asChild variant={action.variant ?? "default"} className={action.className} disabled={action.disabled}>
        <Link href={action.href}>{content}</Link>
      </Button>
    );
  }

  return (
    <Button onClick={action.onClick} variant={action.variant ?? "default"} className={action.className} disabled={action.disabled}>
      {content}
    </Button>
  );
}

export function EmptyState({
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
  children,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card/50 p-12 text-center",
        "flex flex-col items-center justify-center",
        className
      )}
    >
      {/* subtle decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-secondary/30 blur-3xl"
      />

      {icon ? (
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-2xl bg-muted blur-xl opacity-60" aria-hidden />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
            <span className="[&_svg]:size-10 text-muted-foreground">{icon}</span>
          </div>
        </div>
      ) : null}

      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      {description ? <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p> : null}

      {(primaryAction || secondaryAction) && (
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {primaryAction ? <ActionButton action={primaryAction} /> : null}
          {secondaryAction ? <ActionButton action={secondaryAction} /> : null}
        </div>
      )}

      {children ? <div className="mt-6 text-sm text-muted-foreground">{children}</div> : null}
    </div>
  );
}

