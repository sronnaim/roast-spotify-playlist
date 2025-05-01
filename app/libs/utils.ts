import clsx, { type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMergeWithConfig = extendTailwindMerge({
  extend: {
    theme: {
      color: [
        "background",
        "foreground",
        "primary",
        "fillstertiary",
        "labelsprimary",
        "labelssecondary",
        "labels-tertiary",
      ],
      text: ["subheadline", "body"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMergeWithConfig(clsx(inputs));
}

export const snakeToCamelCase = <ReturnType>(obj: {
  [key: string]: unknown;
}): ReturnType => {
  const converted: { [key: string]: unknown } = {};

  for (const key in obj) {
    const camelKey = key
      .toLowerCase()
      .replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace("-", "").replace("_", ""),
      );
    converted[camelKey] = obj[key];
  }

  return converted as ReturnType;
};
