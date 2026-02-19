import { fetch } from "@/lib/api/axios";
import { API, ApiResponse } from "@/lib/api/config";
import { GoogleOauthResponse } from "@/types/auth";

export const logout = async () => {
  const res = await fetch(
    API.ENDPOINTS.AUTH.BASE_URL() + API.ENDPOINTS.AUTH.LOGOUT.path(),
    {
      method: "POST",
    },
  ).then((res) => res.data) as ApiResponse<{ success: boolean; message: string }>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res;
};

export const googleOauth = async (
  code: string | null,
  credential: string | null,
) => {
  const res = (await fetch(
    API.ENDPOINTS.AUTH.BASE_URL() + API.ENDPOINTS.AUTH.GOOGLE_OAUTH.path(),
    {
      method: "POST",
      data: {
        code,
        credential,
      },
    },
  ).then((res) => res.data)) as ApiResponse<GoogleOauthResponse>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res;
};



export const emailRegister = async (
  email: string,
  password: string,
  displayName?: string,
) => {
  const res = (await fetch(
    API.ENDPOINTS.AUTH.BASE_URL() + API.ENDPOINTS.AUTH.EMAIL_REGISTER.path(),
    {
      method: "POST",
      data: {
        email,
        password,
        displayName,
      },
    },
  ).then((res) => res.data)) as ApiResponse<GoogleOauthResponse>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res;
};

export const emailLogin = async (
  email: string,
  password: string,
) => {
  const res = (await fetch(
    API.ENDPOINTS.AUTH.BASE_URL() + API.ENDPOINTS.AUTH.EMAIL_LOGIN.path(),
    {
      method: "POST",
      data: {
        email,
        password,
      },
    },
  ).then((res) => res.data)) as ApiResponse<GoogleOauthResponse>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res;
};




export const getSystemTime = async () => {
  const res = (await fetch(
    API.ENDPOINTS.AUTH.BASE_URL() + API.ENDPOINTS.AUTH.SYSTEM_TIME.path(),
  ).then((res) => res.data)) as ApiResponse<{ systemTime: number }>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const verifyEmail = async (token: string) => {
  const res = (await fetch(
    API.ENDPOINTS.AUTH.BASE_URL() + API.ENDPOINTS.AUTH.VERIFY_EMAIL.path() + `?token=${token}`,
  ).then((res) => res.data)) as ApiResponse<{ success: boolean; message: string }>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res;
};
