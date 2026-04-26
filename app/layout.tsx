import type { Metadata } from "next";
// @ts-ignore: CSS imports require module declarations in TypeScript config
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "CommentCraft — Social Media Comment Generator",
  description:
    "Pixel-perfect comment screenshot generator for TikTok, Instagram, YouTube and X.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
