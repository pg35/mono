import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "pxq-peer pxq-inline-flex pxq-h-5 pxq-w-9 pxq-shrink-0 pxq-cursor-pointer pxq-items-center pxq-rounded-full pxq-border-2 pxq-border-transparent pxq-shadow-sm pxq-transition-colors focus-visible:pxq-outline-none focus-visible:pxq-ring-2 focus-visible:pxq-ring-ring focus-visible:pxq-ring-offset-2 focus-visible:pxq-ring-offset-background disabled:pxq-cursor-not-allowed disabled:pxq-opacity-50 data-[state=checked]:pxq-bg-primary data-[state=unchecked]:pxq-bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pxq-pointer-events-none pxq-block pxq-h-4 pxq-w-4 pxq-rounded-full pxq-bg-background pxq-shadow-lg pxq-ring-0 pxq-transition-transform data-[state=checked]:pxq-translate-x-4 data-[state=unchecked]:pxq-translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
