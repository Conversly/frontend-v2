import AppProviders from "@/components/providers/app-providers";

export default function PublicInteractiveLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AppProviders>{children}</AppProviders>;
}
