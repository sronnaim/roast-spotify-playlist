import { z } from "zod";
import type { Roast } from "./roasts";

export const PlaylistIdInput = z
  .string({ required_error: "A playlist ID is required" })
  .refine(string => {
    if (/^[a-zA-Z0-9_-]{22}$/.test(string))
      return true
    else if (z.string().url().safeParse(string).success) {
      return /^[a-zA-Z0-9_-]{22}$/.test(new URL(string).pathname.split('/')[2])
    }

    return false
  }, { message: "Invalid input" })

export const LanguageInput = z.enum(["EN", "ID"], {
  required_error: "Language input is required",
});

export type ActionData<T extends Record<string, unknown>> = {
  status: "ok" | "error";
  message: string;
  data: T | null;
};

export type LatestRequest = Roast & {
  status: "ok" | "error" | "pending";
};
