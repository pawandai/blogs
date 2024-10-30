import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New",
};

export default function NewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div suppressHydrationWarning>{children}</div>;
}
