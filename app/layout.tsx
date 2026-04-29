import type { Metadata } from "next";
// @ts-ignore: CSS imports require module declarations in TypeScript config
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "./providers";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Comment tools — Social Media Comment Generator",
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
      <head>
        <meta
          name="google-site-verification"
          content="p-AYAABTJAXOLDE05aSyS1N0UmcxiaFjif00qRUM5ws"
        />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-TKNS2D46');
    `,
          }}
        />
      </head>
      <body>
        <Providers>
          <GoogleTagManager gtmId="GTM-TKNS2D46" />
          {children}
          <Toaster position="top-right" richColors />
        </Providers>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TKNS2D46"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      </body>
    </html>
  );
}
