'use client';

export default function SourcesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full w-full">
            {children}
        </div>
    );
}
