import { buildMetadata, organizationJsonLd, faqJsonLd } from "@/lib/seo";
import {
  getFaqs,
  getStatistics,
  getDifferentiators,
  getJourneySteps,
  getPrograms,
  getFeaturedPrograms,
  getAudiences,
  getTeachers,
  getTestimonials,
  getEvents,
  getArticles,
} from "@/lib/content";
import { JsonLd } from "@/components/seo/json-ld";
import { Hero } from "@/components/sections/hero";
import { AudienceSelector } from "@/components/sections/audience-selector";
import { Stats } from "@/components/sections/stats";
import { Differentiators } from "@/components/sections/differentiators";
import { ProgramsShowcase } from "@/components/sections/programs-showcase";
import { Journey } from "@/components/sections/journey";
import { ClassroomExperience } from "@/components/sections/classroom-experience";
import { TeachersPreview } from "@/components/sections/teachers-preview";
import { Outcomes } from "@/components/sections/outcomes";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { EventsPreview } from "@/components/sections/events-preview";
import { KnowledgeHub } from "@/components/sections/knowledge-hub";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";
import { ConsultationSection } from "@/components/sections/consultation-section";

export const metadata = buildMetadata({
  description:
    "Trung tâm tiếng Anh hiện đại với lộ trình cá nhân hóa theo chuẩn quốc tế — từ bé 4 tuổi đến người lớn. Học thử miễn phí, tư vấn lộ trình.",
  path: "/",
});

// Static, content-driven homepage — all 14 sections (docs/architecture.md)
export default function HomePage() {
  const featured = getFeaturedPrograms();
  const programs = featured.length >= 4 ? featured : getPrograms();
  const faqs = getFaqs();
  const faqSchema = faqJsonLd(faqs);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      {faqSchema ? <JsonLd data={faqSchema} /> : null}

      {/* 01 — hero */}
      <Hero />

      {/* 02 — audience / program selector */}
      <AudienceSelector audiences={getAudiences()} programs={getPrograms()} />

      {/* 03 — trust / proof (placeholder statistics, clearly marked) */}
      <Stats statistics={getStatistics()} />

      {/* 04 — why this center */}
      <Differentiators items={getDifferentiators()} />

      {/* 05 — programs */}
      <ProgramsShowcase programs={programs} />

      {/* 06 — learning journey */}
      <Journey steps={getJourneySteps()} />

      {/* 07 — classroom experience */}
      <ClassroomExperience />

      {/* 08 — teachers */}
      <TeachersPreview teachers={getTeachers()} />

      {/* 09 — student outcomes */}
      <Outcomes />

      {/* 10 — testimonials */}
      <TestimonialCarousel testimonials={getTestimonials()} />

      {/* 11 — events & activities */}
      <EventsPreview events={getEvents()} />

      {/* 12 — knowledge hub */}
      <KnowledgeHub articles={getArticles()} />

      {/* 13 — FAQ */}
      <FaqSection faqs={faqs} />

      {/* Lead capture — intelligent multi-step consultation form */}
      <ConsultationSection sourcePage="/" />

      {/* 14 — final CTA */}
      <FinalCta />
    </>
  );
}
