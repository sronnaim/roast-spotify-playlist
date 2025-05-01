import type { Playlist } from "~/types/spotify";
import { PlaylistRepo } from "./redis.server";
import spotify from "./spotify.server";
import gemini from "./gemini.server";
import YAML from "yaml";

class RoastService {
  public async create(playlistId: string, lang: "EN" | "ID" = "EN") {
    const playlistRepo = await PlaylistRepo.createInstance();
    const cachedData = await playlistRepo.get(playlistId);
    let playlistData: Playlist | null = null;

    if (!cachedData) {
      playlistData = await spotify.getPlaylist(playlistId);
      await playlistRepo.create(playlistId, playlistData);
    } else playlistData = cachedData;

    const prompt = `Roast me based off my music playlist, use gen Z internet slangs, make it less than 100 words long yet edgy. Here is the playlist data in YAML${lang === "EN" ? "" : ", do it in Bahasa Indonesia"} and DO YOUR WORST! ${YAML.stringify(playlistData)}`;
    const roast = await gemini.generateText(prompt);

    return {
      playlistId,
      content: roast,
      createdAt: new Date().toISOString(),
    };
  }
}

export default new RoastService();
