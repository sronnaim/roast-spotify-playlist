export type Roast = {
  playlistId: string;
  content: string;
  createdAt: string;
};

export type ReturnData = {
  roast: Roast | null;
  status: "ok" | "error";
  statusMessage: string;
  userInput: string;
};

export function isReturnData(obj: unknown): obj is ReturnData {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "roast" in obj &&
    (typeof obj.roast === "object" || obj.roast === null) &&
    "status" in obj &&
    typeof obj.status === "string" &&
    (obj.status === "ok" || obj.status === "error") &&
    "statusMessage" in obj &&
    typeof obj.statusMessage === "string"
  );
}
