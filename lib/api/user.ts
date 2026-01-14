import { User } from "@/types/user";
import { fetch } from "./axios";
import { API, ApiResponse } from "./config";

export const getLoggedInUser = async () => {
  try {
    const res = (await fetch(
      API.ENDPOINTS.USER.BASE_URL() + API.ENDPOINTS.USER.GET_USER.path(),
    ).then((res) => res.data)) as ApiResponse<User>;

    if (!res.success) {
      throw new Error(res.message);
    }

    return res.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};