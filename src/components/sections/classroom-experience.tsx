import { Camera } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

interface Moment {
  label: string;
  caption: string;
  tone: "accent" | "teal" | "gold" | "ink";
  ratio: "tall" | "wide" | "square";
}

/**
 * Editorial collage placeholder slots — docs/asset-inventory.md.
 * TODO(assets): replace tones with real classroom photography (consented, candid).
 */
const MOMENTS: Moment[] = [
  { label: "Hoạt động nhóm", caption: "Học viên làm dự án cùng nhau", tone: "accent", ratio: "tall" },
  { label: "Thuyết trình", caption: "Trình bày sản phẩm cuối dự án", tone: "ink", ratio: "wide" },
  { label: "Trò chơi ngôn ngữ", caption: "Từ vựng qua chơi — lớp mầm non", tone: "gold", ratio: "square" },
  { label: "Lớp học online", caption: "Tương tác trực tiếp với giáo viên", tone: "teal", ratio: "tall" },
  { label: "Câu lạc bộ nói", caption: "Speaking Club cuối tháng", tone: "accent", ratio: "wide" },
];

const TONE_BG: Record<Moment["tone"], string> = {
  accent: "bg-accent-soft",
  teal: "bg-teal-soft",
  gold: "bg-gold-soft",
  ink: "bg-ink",
};

const RATIO: Record<Moment["ratio"], string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
  square: "aspect-square",
};

/** Section 07 — classroom experience: image-driven collage, not a 3-column gallery. */
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
            Ảnh thật sẽ thay thế khối minh họa
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {MOMENTS.map((moment, index) => (
            <Reveal
              key={moment.label}
              delay={Math.min(index * 0.06, 0.24)}
              className={
                moment.ratio === "tall"
                  ? "row-span-2"
                  : moment.ratio === "wide"
                    ? "col-span-2"
                    : ""
              }
            >
              <figure
                className={`flex h-full ${RATIO[moment.ratio]} ${TONE_BG[moment.tone]} overflow-hidden rounded-[var(--radius-md)] border border-line`}
              >
                {/* TODO(assets): <Image> with real photography; keep captions as alt text */}
                <figcaption className="m-auto max-w-[16ch] px-4 text-center text-small font-medium text-ink-soft">
                  {moment.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-caption text-muted">
          Khối màu là vị trí ảnh minh họa — thay bằng ảnh lớp học thật khi có tư liệu.
        </p>
      </Container>
    </Section>
  );
}
