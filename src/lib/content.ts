import {
  audienceList,
} from "@/content/audiences";
import { programList, getProgramBySlug } from "@/content/programs";
import { teacherList, getTeacherBySlug } from "@/content/teachers";
import { testimonialList } from "@/content/testimonials";
import { eventList, getEventBySlug } from "@/content/events";
import { articleList, getArticleBySlug } from "@/content/articles";
import { faqList } from "@/content/faqs";
import { statisticList } from "@/content/statistics";
import { differentiatorList, journeyStepList } from "@/content/differentiators";
import { siteConfig } from "@/content/site";
import { mainNav, footerNav } from "@/content/navigation";
import type { AudienceId, Program, Teacher, Article, EventItem } from "@/types/content";

/**
 * Typed content access layer — the ONLY module pages use to read content.
 * Swapping to a headless CMS later means reimplementing these getters.
 */

export function getSiteConfig() {
  return siteConfig;
}

export function getMainNav() {
  return mainNav;
}

export function getFooterNav() {
  return footerNav;
}

export function getBranches() {
  return getSiteConfig().branches;
}

export function getAudiences() {
  return audienceList;
}

export function getPrograms(): Program[] {
  return programList;
}

export function getFeaturedPrograms(): Program[] {
  return programList.filter((p) => p.featured);
}

export function getProgram(slug: string): Program | undefined {
  return getProgramBySlug(slug);
}

export function getProgramsForAudience(audienceId: AudienceId): Program[] {
  const audience = audienceList.find((a) => a.id === audienceId);
  if (!audience) return [];
  return audience.recommendedProgramSlugs
    .map((slug) => getProgramBySlug(slug))
    .filter((p): p is Program => p !== undefined);
}

export function getTeachers(): Teacher[] {
  return teacherList;
}

export function getTeacher(slug: string): Teacher | undefined {
  return getTeacherBySlug(slug);
}

export function getTestimonials() {
  return testimonialList;
}

export function getEvents(): EventItem[] {
  return eventList;
}

export function getEvent(slug: string): EventItem | undefined {
  return getEventBySlug(slug);
}

export function getArticles(): Article[] {
  return articleList;
}

export function getArticle(slug: string): Article | undefined {
  return getArticleBySlug(slug);
}

export function getFaqs() {
  return faqList;
}

export function getStatistics() {
  return statisticList;
}

export function getDifferentiators() {
  return differentiatorList;
}

export function getJourneySteps() {
  return journeyStepList;
}
