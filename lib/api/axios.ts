import axios from "axios";
import { API } from "./config";

export const fetch = axios.create({
  baseURL: API.BASE_URL,
  withCredentials: true,
});

fetch.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const activeAccountId = localStorage.getItem("activeAccountId");
      if (activeAccountId) {
        config.headers = config.headers || {};
        (config.headers as any)["x-account-id"] = activeAccountId;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
