import { isTrack, type Playlist, type Track } from "~/types/spotify";
import axios from "./axios.server";
import { type AxiosInstance } from "axios";
import { snakeToCamelCase } from "./utils";
import { SPOTIFY_API_URL } from "~/constants";
import { URL } from "url";

export class SpotifyLibrary {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  private formatTracks(tracks: { [key: string]: unknown }[]) {
    return tracks.map((t) => {
      if (typeof t === 'object' && 'track' in t && t.track && isTrack(t.track)) {
        return {
            name: t.track.name,
            artists: t.track.artists,
            album: snakeToCamelCase(t.track.album),
        } as Track;
      }
    });
  }

  public async getPlaylist(playlistId: string) {
    const url = new URL(SPOTIFY_API_URL);
    url.pathname += `/playlists/${playlistId}`;

    const res = await this.axios.get(url.toString(), {
      params: {
        market: "US",
        fields:
          "followers(total),name,tracks.items(track(name,album(name,release_date),artists(name)))",
      },
    });

    const tracks = this.formatTracks(res.data.tracks.items);

    return {
      playlistName: res.data.name,
      playlistTotalFollowers: res.data.followers.total,
      tracks,
    } as Playlist;
  }
}

export default new SpotifyLibrary(axios);
