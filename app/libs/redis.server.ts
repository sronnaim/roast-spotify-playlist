import type {
  RedisClientType,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from "@redis/client";
import type { RedisDefaultModules } from "redis";
import type { Playlist } from "../types/spotify";
import { createClient } from "redis";
import { REDIS_HOST, REDIS_PORT } from "~/constants";

export const newClient = async () => {
  const client = createClient({
    socket: {
      host: REDIS_HOST,
      port: parseInt(REDIS_PORT),
    },
  });

  client.on("error", (err) => {
    console.error("Redis client error: ", err);
  });

  await client.connect();

  return client;
};

export class PlaylistRepo {
  private redis: RedisClientType<
    RedisDefaultModules & RedisModules,
    RedisFunctions,
    RedisScripts
  >;

  constructor(
    redis: RedisClientType<
      RedisDefaultModules & RedisModules,
      RedisFunctions,
      RedisScripts
    >,
  ) {
    this.redis = redis;
  }

  public static async createInstance() {
    const redis = await newClient();
    const instance = new PlaylistRepo(redis);
    return instance;
  }

  public async create(playlistId: string, playlist: Playlist) {
    await this.redis.setEx(playlistId, 2 * 60, JSON.stringify(playlist));
  }

  public async get(playlistId: string) {
    const redis = await newClient();
    const data = await redis.get(playlistId);

    if (!data) return null;

    return JSON.parse(data) as Playlist;
  }
}
