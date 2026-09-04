import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const base = host ? `https://${host}` : "http://localhost:3000";
  return [{ url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
