import { API, ApiResponse } from "./config";

export const validateInviteCode = async (code: string) => {
  const res = (await fetch(
    API.BASE_URL +
    API.ENDPOINTS.INVITES.BASE_URL() +
    API.ENDPOINTS.INVITES.CHECK_INVITE.path() +
    `?inviteCode=${code}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  ).then((res) => res.json())) as ApiResponse<unknown>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};
