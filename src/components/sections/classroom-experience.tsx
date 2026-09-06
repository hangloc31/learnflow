import Image from "next/image";
import { ArrowRight, Camera } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

interface Moment {
  label: string;
  caption: string;
  /** Local stock illustration — swap the file with consented classroom photography later. */
  src: string;
}

/**
 * Uniform editorial grid — every cell shares one ratio so the section reads
 * in order 1→5 on any screen (docs/asset-inventory.md).
 * Photos are labelled illustrations until consented classroom shots exist.
 */
const MOMENTS: Moment[] = [
  {
    label: "Hoạt động nhóm",
    caption: "Học viên làm dự án cùng nhau",
    src: "/images/classroom-group.jpg",
  },
  {
    label: "Thuyết trình",
    caption: "Trình bày sản phẩm cuối dự án",
    src: "/images/classroom-presentation.jpg",
  },
  {
    label: "Trò chơi ngôn ngữ",
    caption: "Từ vựng qua chơi — lớp mầm non",
    src: "/images/classroom-games.jpg",
  },
  {
    label: "Lớp học online",
    caption: "Tương tác trực tiếp với giáo viên",
    src: "/images/classroom-online.jpg",
  },
  {
    label: "Câu lạc bộ nói",
    caption: "Speaking Club cuối tháng",
    src: "/images/classroom-club.jpg",
  },
];

/** Section 07 — classroom experience: uniform image grid + closing CTA cell. */
export function ClassroomExperience() {
  return (
    <Section tone="soft" aria-labelledby="classroom-title">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="classroom-title"
            eyebrow="Không khí lớp học"
            title="Một ngày ở đây trông như thế nào?"
            description="Nói nhiều, làm nhiều, cười nhiều — tiếng Anh được dùng để kể chuyện, tranh luận và tạo ra điều gì đó."
          />
          <p className="flex items-center gap-2 text-caption uppercase text-muted">
            <Camera className="h-4 w-4" aria-hidden="true" />
            Ảnh minh họa — ảnh lớp thật sẽ thay thế
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {MOMENTS.map((moment, index) => (
            <Reveal key={moment.label} delay={Math.min(index * 0.06, 0.24)} className="h-full">
              <figure className="group relative h-full aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] border border-line">
                <Image
                  src={moment.src}
                  alt={`${moment.label}: ${moment.caption}`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-ink/60 px-2.5 py-1 text-caption font-semibold text-paper backdrop-blur-sm">
                  Ảnh minh họa
                </span>
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-3.5 pt-10 text-left">
                  <span className="block text-small font-semibold text-paper">{moment.label}</span>
                  <span className="mt-0.5 block text-caption text-paper/80">{moment.caption}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}

          <Reveal delay={0.3} className="h-full">
            <a
              href="/trial"
              className="group flex h-full min-h-44 flex-col justify-center rounded-[var(--radius-md)] border border-accent/40 bg-ink p-6 transition-colors hover:border-accent lg:p-8"
              aria-label="Cho con trải nghiệm một buổi học thử"
            >
              <span className="font-display text-subheading font-semibold text-paper">
                Cho con trải nghiệm 1 buổi
              </span>
              <span className="mt-2 text-small text-paper/70">
                Học thử miễn phí sau buổi test 20 phút — đúng lớp vừa sức.
              </span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-small font-semibold text-gold">
                Đăng ký học thử
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </a>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
