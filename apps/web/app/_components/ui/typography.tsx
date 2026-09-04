import React from "react";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

const typographyVariants = cva("font-sans text-foreground", {
  variants: {
    variant: {
      h1: "text-[2.4375rem] leading-[1.2] tracking-[-0.01em]",
      h2: "text-[2.1rem] leading-[1.2] tracking-[-0.01em]",
      h3: "text-[1.5rem] leading-[1.1] tracking-[-0.01em]",
      h4: "text-[1.37rem] leading-[1.1] tracking-[-0.01em]",
      body: "text-[1rem] leading-[1.1] tracking-[-0.01em]",
      "body-small": "text-[0.875rem] leading-[1.1]",
      caption: "text-[0.75rem] leading-[1.4] tracking-[-0.01em]",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
}

function Typography({ className, variant, weight, as, ...props }: TypographyProps) {
  const Component =
    as ||
    (variant === "h1" || variant === "h2" || variant === "h3" || variant === "h4" ? variant : "p");

  return (
    <Component
      className={cn(typographyVariants({ variant, weight }), className)}
      {...props}
    ></Component>
  );
}

export { Typography, typographyVariants };
