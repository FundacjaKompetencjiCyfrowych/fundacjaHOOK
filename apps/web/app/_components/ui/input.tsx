import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:inline-flex bg-gray-100 hover:border-gray-700 aria-invalid:hover:bg-gray-100 disabled:bg-gray-200 dark:bg-input/30 dark:disabled:bg-input/80 file:bg-transparent px-4 py-2 border border-gray-500 aria-invalid:not-disabled:bg-[#fffbfa] aria-invalid:border-destructive/40 focus-visible:ring-gray-400 dark:aria-invalid:border-destructive/50 file:border-0 rounded-xl outline-none aria-invalid:focus-visible:ring-3 aria-invalid:focus-visible:ring-destructive/20 focus-visible:ring-3  dark:aria-invalid:ring-destructive/40 w-full min-w-0 h-10 file:h-6 file:font-medium placeholder:text-gray-500 file:text-foreground md:text-sm file:text-sm text-base transition-colors disabled:cursor-not-allowed disabled:pointer-events-none",
        className
      )}
      {...props}
    />
  );
}

export { Input };
