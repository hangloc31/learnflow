import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { getPrograms, getTeachers, getEvents, getArticles } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const [programs, teachers, events, articles] = await Promise.all([
    getPrograms(),
    getTeachers(),
    getEvents(),
    getArticles(),
  ]);

  const dynamic = [
    ...programs.map((p) => ({ path: `/programs/${p.slug}` })),
    ...teachers.map((t) => ({ path: `/teachers/${t.slug}` })),
    ...events.map((e) => ({ path: `/events/${e.slug}` })),
    ...articles.map((a) => ({ path: `/blog/${a.slug}` })),
  ].map(({ path }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamic];
}
