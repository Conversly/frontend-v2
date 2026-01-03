import axios from "axios";
import { API } from "./config";

export const fetch = axios.create({
  baseURL: API.BASE_URL,
  withCredentials: true,
});

import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";

fetch.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const activeAccountId = localStorage.getItem(LOCAL_STORAGE_KEY.ACTIVE_ACCOUNT_ID);
      if (activeAccountId) {
        config.headers = config.headers || {};
        (config.headers as any)["x-account-id"] = activeAccountId;
      }
    }
    return config;
  },
  (error) => {
    // We can also centralize 401 logging out here if needed
    if (error.response?.status === 401) {
      // Optional: Trigger global logout or redirect
    }
    return Promise.reject(error);
  },
);
