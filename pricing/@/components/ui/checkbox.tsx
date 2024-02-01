import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "pxq-peer pxq-h-4 pxq-w-4 pxq-shrink-0 pxq-rounded-sm pxq-border pxq-border-primary pxq-shadow focus-visible:pxq-outline-none focus-visible:pxq-ring-1 focus-visible:pxq-ring-ring disabled:pxq-cursor-not-allowed disabled:pxq-opacity-50 data-[state=checked]:pxq-bg-primary data-[state=checked]:pxq-text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("pxq-flex pxq-items-center pxq-justify-center pxq-text-current")}
    >
      <CheckIcon className="pxq-h-4 pxq-w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
