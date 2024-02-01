import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("pxq-grid pxq-gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "pxq-aspect-square pxq-h-4 pxq-w-4 pxq-rounded-full pxq-border pxq-border-primary pxq-text-primary pxq-ring-offset-background focus:pxq-outline-none focus-visible:pxq-ring-2 focus-visible:pxq-ring-ring focus-visible:pxq-ring-offset-2 disabled:pxq-cursor-not-allowed disabled:pxq-opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="pxq-flex pxq-items-center pxq-justify-center">
        <Circle className="pxq-h-2.5 pxq-w-2.5 pxq-fill-current pxq-text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
