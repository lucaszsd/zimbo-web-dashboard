import * as React from "react";

import { cn } from "@/lib/utils";
import { InputMask as Input, InputMaskProps } from '@react-input/mask';
 

export interface MaskedProps {
  mask: string
  maskChar: string
  formatChars?: { [key: string]: string }
  alwaysShowMask?: boolean
  children?: React.ReactNode
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputMask = React.forwardRef<HTMLInputElement, InputMaskProps >(
  ({ className, type, ...props }, ref) => {
    return (
      <Input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
InputMask.displayName = "InputMask"

export { InputMask };

