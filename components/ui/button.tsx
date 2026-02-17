import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow hover:bg-primary/90 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600",
                destructive:
                    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                outline:
                    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 dark:bg-amber-500/90 dark:text-slate-900 dark:hover:bg-amber-500",
                ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-slate-800 dark:text-slate-100",
                link: "text-primary underline-offset-4 hover:underline dark:text-slate-200",
                // Luxury variants - high contrast in both modes
                luxury: "bg-slate-900 dark:bg-slate-700 text-white hover:bg-slate-800 dark:hover:bg-slate-600 shadow-md uppercase tracking-wider font-semibold",
                luxuryOutline: "border-2 border-slate-900 dark:border-slate-300 text-slate-900 dark:text-slate-100 hover:bg-slate-900 dark:hover:bg-slate-300 hover:text-white dark:hover:text-slate-900 uppercase tracking-wider",
                gold: "bg-secondary text-slate-900 hover:bg-amber-500 shadow-md uppercase tracking-wider font-semibold dark:bg-amber-500 dark:text-slate-900 dark:hover:bg-amber-400",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
                xl: "h-12 rounded-md px-8 text-base",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "luxury" | "luxuryOutline" | "gold" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | "xl" | null | undefined;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
