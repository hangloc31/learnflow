import { buildMetadata, faqJsonLd } from "@/lib/seo";
import {
  getFaqs,
  getDifferentiators,
  getJourneySteps,
  getPrograms,
  getFeaturedPrograms,
  getAudiences,
  getTeachers,
  getTestimonials,
} from "@/lib/content";
import { JsonLd } from "@/components/seo/json-ld";
import { Hero } from "@/components/sections/hero";
import { AudienceSelector } from "@/components/sections/audience-selector";
import { Differentiators } from "@/components/sections/differentiators";
import { ProgramsShowcase } from "@/components/sections/programs-showcase";
import { Journey } from "@/components/sections/journey";
import { ClassroomExperience } from "@/components/sections/classroom-experience";
import { TeachersPreview } from "@/components/sections/teachers-preview";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";
import { ConsultationSection } from "@/components/sections/consultation-section";

export const metadata = buildMetadata({
  description:
    "Cho bé 4–15 tuổi: kiểm tra trình độ miễn phí 20 phút theo chuẩn Cambridge YLE, xếp đúng lớp vừa sức và nhận lộ trình rõ ràng.",
  path: "/",
});

// Story-driven homepage for parents of kids 4–15 — 1 hero promise (20-min test),
// 2-tap path, 3-step journey, 1 closing form. Placeholder proof sections stay
// hidden until verified data exists.
export default async function HomePage() {
  const featured = await getFeaturedPrograms();
  const allPrograms = await getPrograms();
  // Homepage shows max 3 representative paths; full list lives on /programs.
  const programs = featured.slice(0, 3).length === 3 ? featured.slice(0, 3) : allPrograms.slice(0, 3);
  const faqs = await getFaqs();
  const faqSchema = faqJsonLd(faqs);
  const audiences = await getAudiences();
  const differentiators = await getDifferentiators();
  const journeySteps = await getJourneySteps();
  // Real profiles first; placeholders sink to the end so parents see trust first.
  const teachers = (await getTeachers()).sort(
    (a, b) => Number(a.placeholder) - Number(b.placeholder),
  );
  const testimonials = (await getTestimonials()).sort(
    (a, b) => Number(a.placeholder) - Number(b.placeholder),
  );

  return (
    <>
      {/* Organization schema lives in layout.tsx — do not duplicate here. */}
      {faqSchema ? <JsonLd data={faqSchema} /> : null}

      {/* 01 — hero: one promise for parents */}
      <Hero />

      {/* 02 — audience / program selector: 2 taps to a path */}
      <AudienceSelector audiences={audiences} programs={allPrograms} />

      {/* 03 — why here: merged differentiators (stats hidden until verified) */}

      {/* 04 — why this center */}
      <Differentiators items={differentiators} />

      {/* 05 — programs: 3 representative paths only */}
      <ProgramsShowcase programs={programs} />

      {/* 06 — learning journey */}
      <Journey steps={journeySteps} />

      {/* 07 — classroom experience */}
      <ClassroomExperience />

      {/* 08 — teachers (real profiles first) */}
      <TeachersPreview teachers={teachers} />

      {/* 09 — parent stories */}
      <TestimonialCarousel testimonials={testimonials} />

      {/* Events & knowledge hub live on /events and /blog until real items exist. */}

      {/* 10 — FAQ: last objections before the form */}
      <FaqSection faqs={faqs} />

      {/* Lead capture — shortened consultation form, single closing flow */}
      <ConsultationSection sourcePage="/" />

      {/* 11 — final CTA: same single action, no competing ask */}
      <FinalCta />
    </>
  );
}
