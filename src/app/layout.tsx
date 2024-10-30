import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/themeProvider";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Pawan Dai",
    default: "Blog | Pawan Awasthi",
  },
  description:
    "Welcome to Pawan Awasthi's blog, a hub for technology, engineering, and innovation.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    title: "Blog | Pawan Awasthi",
    description:
      "Explore Pawan Awasthi's blog for insights, projects, and thoughts on technology and engineering.",
    type: "website",
    images: [
      {
        url: "/meta/ogg.jpeg",
        width: 1200,
        height: 630,
        alt: "Pawan Awasthi's Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Pawan Awasthi",
    description:
      "Discover Pawan Awasthi's blog, where he shares knowledge and experiences in technology and engineering.",
    images: [
      {
        url: "https://pbs.twimg.com/profile_images/1798757747619725312/FZAw-qXO_400x400.jpg",
        alt: "Pawan Awasthi's Blog",
      },
    ],
  },
  icons: {
    icon: "/meta/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${urbanist.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          x{children}
        </ThemeProvider>
      </body>
    </html>
  );
}
