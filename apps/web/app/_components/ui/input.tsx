import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:inline-flex flex bg-transparent file:bg-transparent disabled:opacity-50 shadow-xs px-3 py-1 border border-input file:border-0 rounded-lg outline-none w-full min-w-0 h-9 file:h-7 file:font-medium placeholder:text-muted-foreground file:text-foreground text-sm file:text-sm transition-[color,box-shadow] disabled:cursor-not-allowed disabled:pointer-events-none",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  );
}

export { Input };
