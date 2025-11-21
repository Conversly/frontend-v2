// "use client";

// import { useAuth } from "@/store/auth";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect } from "react";

// interface ProtectedRouteProps {
//     children: React.ReactNode;
// }

// export function ProtectedRoute({ children }: ProtectedRouteProps) {
//     const { authStatus } = useAuth();
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     useEffect(() => {
//         if (authStatus === "unauthenticated") {
//             // Construct return URL
//             const currentPath = window.location.pathname;
//             const params = searchParams.toString();
//             const returnUrl = params ? `${currentPath}?${params}` : currentPath;

//             router.push(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
//         }
//     }, [authStatus, router, searchParams]);

//     if (authStatus === "loading") {
//         return (
//             <div className="flex items-center justify-center h-screen">
//                 Loading...
//             </div>
//         );
//     }

//     if (authStatus === "unauthenticated") {
//         return null;
//     }

//     return <>{children}</>;
// }

// interface PublicRouteProps {
//     children: React.ReactNode;
// }

// export function PublicRoute({ children }: PublicRouteProps) {
//     const { authStatus } = useAuth();
//     const router = useRouter();

//     useEffect(() => {
//         if (authStatus === "authenticated") {
//             router.push("/dashboard");
//         }
//     }, [authStatus, router]);

//     if (authStatus === "loading") {
//         return (
//             <div className="flex items-center justify-center h-screen">
//                 Loading...
//             </div>
//         );
//     }

//     if (authStatus === "authenticated") {
//         return null;
//     }

//     return <>{children}</>;
// }