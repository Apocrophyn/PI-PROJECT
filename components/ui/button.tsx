"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 text-[0.76rem] font-semibold uppercase tracking-[0.14em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "lg",
        glass: "lg",
        ivory: "lg lg-ivory",
        destructive: "bg-destructive text-destructive-foreground transition-colors hover:bg-destructive/90",
        outline: "border border-border bg-transparent text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5",
        secondary: "border border-secondary bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/80",
        ghost: "text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
        link: "min-h-0 rounded-none px-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11",
        sm: "h-10 min-h-10 px-5 text-[0.7rem]",
        lg: "h-14 min-h-14 px-8",
        icon: "h-11 w-11 px-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onPointerMove, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
      const rect = event.currentTarget.getBoundingClientRect()
      event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`)
      event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`)
      onPointerMove?.(event)
    }
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} onPointerMove={handlePointerMove} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
