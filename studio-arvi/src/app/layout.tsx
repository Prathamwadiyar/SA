import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion-provider";
import { Consent } from "@/components/consent";
import { site, siteOrigin } from "@/lib/site";

const origin = siteOrigin();
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#180F15" };
export const metadata: Metadata = {
  metadataBase: origin ? new URL(origin) : undefined,
  title: { default: "Studio Arvi — Independent Creative Studio", template: "%s — Studio Arvi" },
  description: site.description,
  applicationName: site.name,
  openGraph: { title: "Studio Arvi — Independent Creative Studio", description: site.description, type: "website", images: ["/art/og-studio.png"] },
  robots: { index: Boolean(origin), follow: Boolean(origin) },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><MotionProvider/><Header/>{children}<Footer/><Consent/></body></html>;
}
