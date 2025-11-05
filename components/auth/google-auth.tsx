"use client";

import { useAuth } from "@/hooks/use-auth";
import { useCallback, useState } from "react";
import { Button } from "../ui/button";

interface GoogleAuthProps {
  onLoadingChange?: (loading: boolean) => void;
  label?: string;
  className?: string;
}

export const GoogleAuth: React.FC<GoogleAuthProps> = ({
  onLoadingChange,
  label = "Continue with Google",
  className,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { startGoogleRedirect } = useAuth();

  const updateLoadingState = useCallback(
    (loading: boolean) => {
      setIsLoading(loading);
      onLoadingChange?.(loading);
    },
    [onLoadingChange],
  );

  const handleLogin = useCallback((): void => {
    updateLoadingState(true);
    // Redirect-based flow; the page will navigate away
    startGoogleRedirect();
  }, [startGoogleRedirect, updateLoadingState]);

  return (
    <Button
      variant="outline"
      onClick={handleLogin}
      disabled={isLoading}
      className={`h-9 bg-[#181818] text-foreground-medium hover:text-foreground-light flex items-center gap-2 ${className || ""}`}
    >
      {isLoading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-[#7fac93]" />
      ) : (
        <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#EA4335" d="M12 5.4c1.6 0 3 .6 4.1 1.6l3-3C17.4 2.1 15 1 12 1 7.7 1 3.9 3.5 2.1 7.1l3.7 2.9C6.5 7.3 8.9 5.4 12 5.4z" />
          <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.2v2.8C4 20.5 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.8 14.1c-.2-.6-.3-1.3-.3-2.1s.1-1.4.3-2.1V7.1H2.2C1.4 8.6 1 10.2 1 12s.4 3.5 1.2 4.9l3.6-2.8z" />
          <path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.3h5.9c-.3 1.4-1 2.5-2.2 3.3v2.8h3.6c2.1-1.9 3.3-4.8 3.3-8.2z" />
        </svg>
      )}
      {isLoading ? "Signing in..." : label}
    </Button>
  );
};

export default GoogleAuth;
