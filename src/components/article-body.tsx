import ReactMarkdown from "react-markdown";
import type { Block } from "@/types/content";

/**
 * Renders structured article body blocks.
 * Paragraph text supports a markdown subset: **bold**, *italic*, [link](url).
 */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="mt-10 space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading": {
            const headingClass =
              "mt-10 scroll-mt-24 font-display text-body font-semibold text-ink first:mt-0";
            if (block.level === 2) return <h2 key={i} className={headingClass}>{block.text}</h2>;
            if (block.level === 3) return <h3 key={i} className={headingClass}>{block.text}</h3>;
            return <h4 key={i} className={headingClass}>{block.text}</h4>;
          }
          case "paragraph":
            return (
              <div key={i} className="text-subheading leading-relaxed text-ink-soft">
                <ReactMarkdown
                  components={{
                    a: ({ ...props }) => (
                      <a className="text-accent-strong underline underline-offset-2 hover:text-accent" {...props} />
                    ),
                  }}
                >
                  {block.text}
                </ReactMarkdown>
              </div>
            );
          case "image":
            return (
              <figure key={i} className="my-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={block.src}
                  alt={block.alt}
                  className="w-full rounded-[var(--radius-md)] border border-line"
                />
                {block.caption ? (
                  <figcaption className="mt-2 text-center text-caption text-muted">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          case "list":
            const ListTag = block.style === "numbered" ? "ol" : "ul";
            return (
              <ListTag
                key={i}
                className={`space-y-2 pl-5 text-subheading text-ink-soft ${
                  block.style === "numbered" ? "list-decimal" : "list-disc"
                }`}
              >
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ListTag>
            );
          case "divider":
            return <hr key={i} className="border-line" />;
          default:
            return null;
        }
      })}
    </div>
  );
}
