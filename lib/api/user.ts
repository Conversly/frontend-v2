
import { fetch } from "@/lib/api/axios";
import { API, ApiResponse } from "@/lib/api/config";

export interface UserProfile {
  id: string;
  displayName: string;
  username?: string;
  avatarUrl?: string;
  email?: string;
}

export async function getMe(): Promise<UserProfile> {
  const res = (await fetch(
    API.ENDPOINTS.USER.BASE_URL() + "/me",
    { method: "GET" }
  ).then((r) => r.data)) as ApiResponse<UserProfile, Error>;

  if (!res.success) throw new Error(res.message);
  return res.data;

}

export const getLoggedInUser = getMe;

export interface UpdateProfileInput {
  displayName?: string;
  avatarUrl?: string;
}

export async function updateProfile(data: UpdateProfileInput): Promise<UserProfile> {
  const res = (await fetch(
    API.ENDPOINTS.USER.BASE_URL() + "/me",
    {
      method: "PATCH",
      data,
    }
  ).then((r) => r.data)) as ApiResponse<UserProfile, Error>;

  if (!res.success) throw new Error(res.message);
  return res.data;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export async function changePassword(data: ChangePasswordInput): Promise<void> {
  const res = (await fetch(
    API.ENDPOINTS.USER.BASE_URL() + "/me/password",
    {
      method: "POST",
      data,
    }
  ).then((r) => r.data)) as ApiResponse<any, Error>;

  if (!res.success) throw new Error(res.message);
}