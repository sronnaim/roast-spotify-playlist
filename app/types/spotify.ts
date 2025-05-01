import { z } from "zod";

export const Track = z.object({
  name: z.string(),
  artists: z.array(z.object({
    name: z.string()
  })),
  album: z.object({}),
});

export function isTrack(obj: unknown): obj is Track {
  const result = Track.safeParse(obj)
  return result.success
}
export const Playlist = z.object({
  playlistName: z.string(),
  playlistTotalFollowers: z.number(),
  tracks: z.array(Track),
});

export type Track = z.infer<typeof Track>
export type Playlist = z.infer<typeof Playlist>