"use client";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                    textAlign: "center",
                    padding: "1rem",
                }}>
                    <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Something went wrong</h1>
                    <p style={{ marginTop: "1rem", color: "#666" }}>
                        An unexpected error occurred.
                    </p>
                    <button
                        onClick={() => reset()}
                        style={{
                            marginTop: "2rem",
                            padding: "0.75rem 1.5rem",
                            borderRadius: "0.5rem",
                            backgroundColor: "#4F46E5",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
