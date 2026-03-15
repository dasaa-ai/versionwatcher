import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.versionwatcher.com";

  const staticPages = [
    "",
    "/track-app-store-updates",
    "/app-store-update-tracker",
    "/ios-app-version-tracker",
    "/app-update-alerts-ios",
    "/monitor-competitor-app-updates",
    "/apps",
  ];

  const apps = [
  "spotify",
  "netflix",
  "whatsapp",
  "instagram",
  "notion",
  "youtube",
  "tiktok",
  "telegram",
  "discord",
  "slack",
  "reddit",
  "twitter",
  "facebook",
  "gmail",
  "google-maps",
  "amazon",
  "uber",
  "airbnb",
  "dropbox",
  "paypal",
  "zoom"
]

  const staticRoutes = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const appRoutes = apps.map((app) => ({
    url: `${baseUrl}/apps/${app}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...appRoutes];
}
