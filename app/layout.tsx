import type { Metadata, Viewport } from "next";
import { Nunito, Outfit } from "next/font/google";
import Script from "next/script";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

const body = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Doula",
    template: "%s · Doula",
  },
  description:
    "Birth prep, lessons, and gentle movement. Educational wellness support, not medical advice.",
  applicationName: "Doula",
  appleWebApp: {
    capable: true,
    title: "Doula",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192" }],
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4efe8",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} h-full`}>
      <body className="h-full overflow-hidden bg-bg font-sans text-ink antialiased">
        <Script id="standalone-flag" strategy="beforeInteractive">
          {`try{var n=navigator;if(n.standalone===true||matchMedia("(display-mode: standalone)").matches){document.documentElement.classList.add("is-standalone")}}catch(e){}`}
        </Script>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
