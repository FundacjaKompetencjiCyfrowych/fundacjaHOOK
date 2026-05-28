"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer data-[state=checked]:bg-primary disabled:opacity-50 shadow-xs border border-primary/70 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring/50 size-4 data-[state=checked]:text-primary-foreground transition-shadow disabled:cursor-not-allowed shrink-0",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex justify-center items-center text-current">
        <CheckIcon className="size-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
