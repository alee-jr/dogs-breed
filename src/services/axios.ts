import axios from "axios";
import { parseCookies } from "nookies";

export function getApiClient(ctx?: any) {
  const { "nextauth.token": token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DOGBREED_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (token) {
    api.interceptors.request.use((config) => {
      config.headers!.Authorization = `${token}`;
      return config;
    });
  }

  return api;
}
