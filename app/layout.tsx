import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const preview = `${protocol}://${host}/og.png`;
  const title = "Omar Abdullah Eshaq | Digital Contact";
  const description = "Digital business card for Omar Abdullah Eshaq, Assistant General Manager at Eshaq Trading Company.";

  return {
    title,
    description,
    icons: { icon: "/logo.png", shortcut: "/logo.png" },
    openGraph: { title, description, type: "website", images: [{ url: preview, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [preview] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
