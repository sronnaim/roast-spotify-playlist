import "dotenv/config";

export const BASE_URL = "https://roast-my-playlist-api.hatrnuhn.my.id/v1";

export const REPO_URL = "https://github.com/hatrnuhn/roastery";

export const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
export const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
export const SPOTIFY_AUTH_URL = process.env.SPOTIFY_AUTH_URL!;
export const SPOTIFY_API_URL = process.env.SPOTIFY_API_URL!;

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
export const MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash-lite";

export const REDIS_HOST = process.env.REDIS_HOST!;
export const REDIS_PORT = process.env.REDIS_PORT!;
