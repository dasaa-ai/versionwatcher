import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VersionWatcher",
  description: "Track App Store updates automatically",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}

        <Script
          src="https://datafa.st/js/script.js"
          data-website-id="dfid_oIk3ZAysKPinN4Sm8qZun"
          data-domain="www.versionwatcher.com"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
