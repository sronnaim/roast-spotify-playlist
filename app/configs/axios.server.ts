import type { CreateAxiosDefaults } from "axios";
import { SPOTIFY_API_URL } from "~/constants";

const config: CreateAxiosDefaults = {
  baseURL: SPOTIFY_API_URL,
};

export default config;
