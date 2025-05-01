import type { Roast } from "~/types/roasts";
import { compressString, decompressString } from "./compression";

class History {
  public async get() {
    const data = localStorage.getItem("data");
    let roasts: Roast[] = [];

    if (data) {
      const decompressed = await decompressString(data);
      roasts = JSON.parse(decompressed) as Roast[];
    }

    return roasts;
  }

  public get size() {
    const data = localStorage.getItem("data");
    if (data) return new Blob([data]).size;
  }

  public async set(roasts: Roast[]) {
    const compressed = await compressString(JSON.stringify(roasts));
    localStorage.setItem("data", compressed);
  }
}

export default new History();
