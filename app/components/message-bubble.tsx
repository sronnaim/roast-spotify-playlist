import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import type { ComponentProps } from "react";
import { cn } from "~/libs/utils";

const bubbleVariant = cva("rounded-[16px] px-[14px] py-[7px] relative", {
  variants: {
    from: {
      you: "bg-primary text-background dark:text-foreground",
      them: "bg-[rgba(230,229,235,100%)] dark:bg-[rgba(38,38,41,100%)] text-foreground",
    },
  },
  defaultVariants: {
    from: "you",
  },
});

export function MessageBubble({
  children,
  from,
  className,
  ...props
}: ComponentProps<"p"> & VariantProps<typeof bubbleVariant>) {
  return (
    <p className={cn(bubbleVariant({ from, className }))} {...props}>
      {children}
      <TailSVG from={from} />
    </p>
  );
}

function TailSVG({ from = "you" }: { from?: "you" | "them" | null }) {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(
        "absolute bottom-0",
        from === "you" && "-right-5",
        from === "them" && "-left-5 -scale-x-100",
      )}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.0285 0H0C0 7.73199 6.26801 14 14 14H20V13.6709C18.5689 12.4697 17.3842 10.9871 16.5262 9.30324C15.4038 7.10032 15.107 4.39657 15.0285 0Z"
        className={clsx(
          from === "you" && "fill-primary",
          from === "them" &&
            "fill-[rgba(230,229,235,100%)] dark:fill-[rgba(38,38,41,100%)]",
        )}
      />
    </svg>
  );
}
