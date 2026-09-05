import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { getPrograms, getTeachers, getEvents, getArticles } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = [
    "",
    "/programs",
    "/teachers",
    "/events",
    "/blog",
    "/about",
    "/contact",
    "/trial",
    "/placement-test",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const dynamic = [
    ...getPrograms().map((p) => ({ path: `/programs/${p.slug}` })),
    ...getTeachers().map((t) => ({ path: `/teachers/${t.slug}` })),
    ...getEvents().map((e) => ({ path: `/events/${e.slug}` })),
    ...getArticles().map((a) => ({ path: `/blog/${a.slug}` })),
  ].map(({ path }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamic];
}
