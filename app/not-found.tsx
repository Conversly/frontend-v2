import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">404</h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
                Page not found
            </p>
            <p className="mt-2 text-gray-500 dark:text-gray-500">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                href="/"
                className="mt-8 px-6 py-3 rounded-lg bg-primary text-white hover:opacity-90 transition-opacity"
            >
                Go back home
            </Link>
        </div>
    );
}
