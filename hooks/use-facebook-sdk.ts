'use client';

import { useEffect, useState, useCallback } from 'react';

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

interface EmbeddedSignupData {
  phone_number_id: string;
  waba_id: string;
  business_id?: string;
  ad_account_ids?: string[];
  page_ids?: string[];
  dataset_ids?: string[];
}

interface EmbeddedSignupEvent {
  type: 'WA_EMBEDDED_SIGNUP';
  event: 'FINISH' | 'FINISH_ONLY_WABA' | 'FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING' | 'CANCEL' | 'ERROR';
  data: EmbeddedSignupData | {
    current_step?: string;
    error_message?: string;
    error_id?: string;
    session_id?: string;
    timestamp?: string;
  };
}

interface UseFacebookSDKOptions {
  appId: string;
  version?: string;
  onSignupComplete?: (data: EmbeddedSignupData) => void;
  onSignupCancel?: (step: string) => void;
  onSignupError?: (error: string) => void;
}

export function useFacebookSDK({
  appId,
  version = 'v24.0',
  onSignupComplete,
  onSignupCancel,
  onSignupError,
}: UseFacebookSDKOptions) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up message listener FIRST, before anything else
    // This ensures we catch messages even if they arrive early
    const handleMessage = (event: MessageEvent) => {
      // Log all messages from Facebook domains for debugging


      // Use endsWith for more flexible origin checking as per Meta docs
      // Also check for web.facebook.com as per Meta's documentation
      if (!event.origin.endsWith('facebook.com') && !event.origin.endsWith('web.facebook.com')) {
        return;
      }

      try {
        const data = JSON.parse(event.data) as EmbeddedSignupEvent;


        if (data.type === 'WA_EMBEDDED_SIGNUP') {


          // Handle successful completion (multiple finish types)
          if (data.event === 'FINISH' ||
            data.event === 'FINISH_ONLY_WABA' ||
            data.event === 'FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING') {
            const signupData = data.data as EmbeddedSignupData;

            onSignupComplete?.(signupData);
          } else if (data.event === 'CANCEL') {
            const cancelData = data.data as { current_step?: string };

            onSignupCancel?.(cancelData.current_step || 'unknown');
          } else if (data.event === 'ERROR') {
            const errorData = data.data as {
              error_message?: string;
              error_id?: string;
              session_id?: string;
              timestamp?: string;
            };
            const errorMsg = errorData.error_message || 'Unknown error';
            const errorDetails = errorData.error_id
              ? `${errorMsg} (Error ID: ${errorData.error_id}, Session: ${errorData.session_id || 'N/A'})`
              : errorMsg;

            onSignupError?.(errorDetails);
          } else {

          }
        } else {

        }
      } catch (error) {
        // Not a JSON message, ignore

      }
    };


    window.addEventListener('message', handleMessage);

    // Check if SDK is already loaded
    if (window.FB) {
      setIsSDKLoaded(true);
      setIsLoading(false);
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }

    // Initialize Facebook SDK
    // Following Facebook Login best practices: https://developers.facebook.com/docs/facebook-login/web
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: appId,
        cookie: true, // Enable cookies to allow the server to access the session
        autoLogAppEvents: true,
        xfbml: true, // Parse social plugins on this webpage
        version: version,
      });
      setIsSDKLoaded(true);
      setIsLoading(false);
    };

    // Load SDK script
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.onload = () => {
      // SDK will call fbAsyncInit when loaded
    };
    document.body.appendChild(script);

    return () => {
      window.removeEventListener('message', handleMessage);
      // Note: We don't remove the script tag as it might be used elsewhere
    };
  }, [appId, version, onSignupComplete, onSignupCancel, onSignupError]);

  const launchEmbeddedSignup = useCallback(
    (configId: string, callback?: (response: any) => void) => {
      if (!window.FB) {
        console.error('Facebook SDK not loaded');
        return;
      }

      const fbLoginCallback = (response: any) => {
        // Handle the login response following Facebook Login best practices
        if (response.authResponse) {
          // Successfully logged in - get the authorization code
          const code = response.authResponse.code;
          callback?.(response);
        } else if (response.status === 'not_authorized') {
          // User is logged into Facebook but not authorized for this app
          console.warn('User not authorized:', response);
          callback?.(response);
        } else {
          // User cancelled login or did not fully authorize

          callback?.(response);
        }
      };

      // For Embedded Signup v4, we use the setup: {} format in extras
      // We don't set redirect_uri - Facebook handles it internally for Embedded Signup
      window.FB.login(
        fbLoginCallback,
        {
          config_id: configId,
          response_type: 'code',
          override_default_response_type: true,
          extras: {
            setup: {},
          },
        }
      );
    },
    []
  );

  return {
    isSDKLoaded,
    isLoading,
    launchEmbeddedSignup,
  };
}

