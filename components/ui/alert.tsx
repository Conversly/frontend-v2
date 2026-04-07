import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
    "relative w-full rounded-[var(--radius-input)] border p-3 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-3 [&>svg]:top-3",
    {
        variants: {
            variant: {
                default:
                    "bg-background text-foreground border-border [&>svg]:text-muted-foreground",
                destructive:
                    "bg-[var(--status-danger-bg)] text-[var(--status-danger-fg)] border-[var(--status-danger-border)] [&>svg]:text-[var(--status-danger-fg)]",
                info:
                    "bg-[var(--status-info-bg)] text-[var(--status-info-fg)] border-[var(--status-info-border)] [&>svg]:text-[var(--status-info-fg)]",
                success:
                    "bg-[var(--status-success-bg)] text-[var(--status-success-fg)] border-[var(--status-success-border)] [&>svg]:text-[var(--status-success-fg)]",
                warning:
                    "bg-[var(--status-warning-bg)] text-[var(--status-warning-fg)] border-[var(--status-warning-border)] [&>svg]:text-[var(--status-warning-fg)]",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const Alert = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
    <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
    />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={cn("mb-1 text-sm font-semibold leading-none tracking-tight", className)}
        {...props}
    />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-sm [&_p]:leading-relaxed", className)}
        {...props}
    />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
