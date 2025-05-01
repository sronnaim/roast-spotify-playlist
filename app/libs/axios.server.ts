import axios, { AxiosError, isAxiosError, type AxiosInstance } from "axios";
import config from "../configs/axios.server";
import type { CustomAxiosConfig } from "~/types/axios";
import {
  SPOTIFY_AUTH_URL,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
} from "~/constants";
import { URL, URLSearchParams } from "url";

class CustomAxios {
  private axiosInstance: AxiosInstance;
  private token?: string;

  constructor(clientId: string, clientSecret: string) {
    this.axiosInstance = this.createAxiosInstance(clientId, clientSecret);
  }

  private createAxiosInstance = (clientId: string, clientSecret: string) => {
    const axiosInstance = axios.create(config);

    axiosInstance.interceptors.request.use((config) => {
      if (this.token) config.headers.Authorization = `Bearer ${this.token}`;

      return config;
    });

    axiosInstance.interceptors.response.use(
      (res) => res,
      async (err) => {
        if (err instanceof AxiosError && err.config) {
          const originalConfig: CustomAxiosConfig = { ...err.config };
          if (err.response?.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            try {
              const base64 = Buffer.from(
                clientId + ":" + clientSecret,
              ).toString("base64");

              const authUrl = new URL(SPOTIFY_AUTH_URL);
              authUrl.pathname += "api/token";

              const params = new URLSearchParams();
              params.append("grant_type", "client_credentials");

              const res = await axios.post(
                authUrl.toString(),
                params.toString(),
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${base64}`,
                  },
                },
              );
              this.token = res.data.access_token;
              return axiosInstance(originalConfig);
            } catch (err) {
              if (isAxiosError(err)) console.log(err.response?.headers);
            }
          }
        }

        throw err;
      },
    );

    return axiosInstance;
  };

  public get axios() {
    return this.axiosInstance;
  }
}

export default new CustomAxios(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET).axios;
