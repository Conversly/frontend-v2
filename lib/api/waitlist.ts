import { fetch } from "@/lib/api/axios";
import { API, ApiResponse } from "@/lib/api/config";

export interface JoinWaitlistRequest {
  email: string;
  comments?: string;
}

export interface JoinWaitlistResponse {
  success: boolean;
  message: string;
  waitlistId?: string;
}

/**
 * Join the waitlist
 * z-terminal API: POST /waitlist/join
 * 
 * @param request - Waitlist join request with email and optional comments
 * @returns ApiResponse with success status and message
 */
export const joinWaitlist = async (
  request: JoinWaitlistRequest
): Promise<ApiResponse<JoinWaitlistResponse>> => {
  const res = await fetch(
    API.ENDPOINTS.WAITLIST.BASE_URL() + API.ENDPOINTS.WAITLIST.JOIN(),
    {
      method: "POST",
      data: request,
    },
  ).then((res) => res.data) as ApiResponse<JoinWaitlistResponse>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res;
};

