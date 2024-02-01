import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "pxq-inline-flex pxq-items-center pxq-justify-center pxq-whitespace-nowrap pxq-rounded-md pxq-text-sm pxq-font-medium pxq-ring-offset-background pxq-transition-colors focus-visible:pxq-outline-none focus-visible:pxq-ring-2 focus-visible:pxq-ring-ring focus-visible:pxq-ring-offset-2 disabled:pxq-pointer-events-none disabled:pxq-opacity-50",
  {
    variants: {
      variant: {
        default: "pxq-bg-primary pxq-text-primary-foreground hover:pxq-bg-primary/90",
        destructive:
          "pxq-bg-destructive pxq-text-destructive-foreground hover:pxq-bg-destructive/90",
        outline:
          "pxq-border pxq-border-input pxq-bg-background hover:pxq-bg-accent hover:pxq-text-accent-foreground",
        secondary:
          "pxq-bg-secondary pxq-text-secondary-foreground hover:pxq-bg-secondary/80",
        ghost: "hover:pxq-bg-accent hover:pxq-text-accent-foreground",
        link: "pxq-text-primary pxq-underline-offset-4 hover:pxq-underline",
      },
      size: {
        default: "pxq-h-10 pxq-px-4 pxq-py-2",
        sm: "pxq-h-9 pxq-rounded-md pxq-px-3",
        lg: "pxq-h-11 pxq-rounded-md pxq-px-8",
        icon: "pxq-h-10 pxq-w-10",
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
