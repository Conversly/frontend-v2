/**
 * Facebook SDK Type Definitions
 * For WhatsApp Business Platform Embedded Signup
 */

interface FBAuthResponse {
  accessToken?: string;
  code?: string;
  expiresIn?: number;
  signedRequest?: string;
  userID?: string;
}

interface FBLoginResponse {
  authResponse: FBAuthResponse | null;
  status: 'connected' | 'not_authorized' | 'unknown';
}

interface FBLoginOptions {
  config_id?: string;
  response_type?: string;
  override_default_response_type?: boolean;
  extras?: {
    setup?: Record<string, any>;
    [key: string]: any;
  };
  scope?: string;
  return_scopes?: boolean;
  auth_type?: string;
}

interface FacebookSDK {
  init(params: {
    appId: string;
    autoLogAppEvents?: boolean;
    xfbml?: boolean;
    version: string;
  }): void;

  login(
    callback: (response: FBLoginResponse) => void,
    options?: FBLoginOptions
  ): void;

  logout(callback?: () => void): void;

  getLoginStatus(
    callback: (response: FBLoginResponse) => void,
    roundtrip?: boolean
  ): void;

  api(
    path: string,
    method: string,
    params: any,
    callback: (response: any) => void
  ): void;
}

interface WhatsAppEmbeddedSignupData {
  phone_number_id?: string;
  waba_id?: string;
  business_id?: string;
  ad_account_ids?: string[];
  page_ids?: string[];
  dataset_ids?: string[];
  current_step?: string;
  error_message?: string;
  error_id?: string;
  session_id?: string;
  timestamp?: number;
}

interface WhatsAppEmbeddedSignupEvent {
  type: 'WA_EMBEDDED_SIGNUP';
  event: 'FINISH' | 'FINISH_ONLY_WABA' | 'FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING' | 'CANCEL';
  data: WhatsAppEmbeddedSignupData;
}

declare global {
  interface Window {
    FB: FacebookSDK;
    fbAsyncInit: () => void;
  }
}

export {};
