import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import {
  Button as ReactAriaButton,
  type ButtonProps,
} from "react-aria-components";
import { cn } from "~/libs/utils";

const buttonVariants = cva(
  "text-primary rounded-full data-hovered:bg-linear-to-b data-hovered:to-white/10 data-hovered:from-white/10 data-hovered:bg-blend-lighten data-disabled:bg-fills-tertiary data-disabled:text-labels-tertiary data-focus-visible:outline-2 data-focus-visible:outline-white data-focus-visible:-outline-offset-4 data",
  {
    variants: {
      style: {
        fill: "bg-primary text-background dark:text-foreground",
        tint: "bg-primary/15",
        grey: "bg-fillstertiary",
        plain:
          "bg-none data-hovered:bg-linear-to-b data-hovered:to-black/10 data-hovered:from-black/10 data-hovered:bg-blend-darken data-focus-visible:outline-primary",
      },
      size: {
        sm: "px-10 py-4 text-subheadline",
        md: "px-14 py-7 text-subheadline",
        lg: "px-20 py-14 rounded-[12px] text-body",
      },
    },
    defaultVariants: {
      style: "fill",
      size: "sm",
    },
  },
);

export function Button({
  style,
  size,
  className,
  ...props
}: React.ComponentProps<"button"> &
  ButtonProps &
  VariantProps<typeof buttonVariants>) {
  return (
    <ReactAriaButton
      className={cn(buttonVariants({ style, size, className }))}
      {...props}
    />
  );
}
