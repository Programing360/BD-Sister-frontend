import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/config/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();

  const publicRoutes = [
    { path: ROUTES.public.home, priority: 1.0, changeFrequency: "daily" as const },
    { path: ROUTES.public.about, priority: 0.8, changeFrequency: "weekly" as const },
    { path: ROUTES.public.community, priority: 0.9, changeFrequency: "daily" as const },
    { path: ROUTES.public.businesses, priority: 0.9, changeFrequency: "daily" as const },
    { path: ROUTES.public.marketplace, priority: 0.9, changeFrequency: "daily" as const },
    { path: ROUTES.public.learning, priority: 0.8, changeFrequency: "weekly" as const },
    { path: ROUTES.public.events, priority: 0.8, changeFrequency: "weekly" as const },
    { path: ROUTES.public.contact, priority: 0.7, changeFrequency: "monthly" as const },
    { path: ROUTES.public.faq, priority: 0.7, changeFrequency: "monthly" as const },
    { path: ROUTES.public.privacyPolicy, priority: 0.5, changeFrequency: "yearly" as const },
    { path: ROUTES.public.termsAndConditions, priority: 0.5, changeFrequency: "yearly" as const },
  ];

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
