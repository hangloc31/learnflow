import Link from "next/link";
import { mainNav } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MobileMenu } from "@/components/navigation/mobile-menu";

/** Brand wordmark — TODO(brand): replace with final logo lockup. */
export function Logo() {
  return (
    <Link
      href="/"
      className="font-display text-xl font-semibold tracking-tight text-ink"
      aria-label={`${siteConfig.name} — trang chủ`}
    >
      Learn<span className="text-accent">Flow</span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-[var(--z-header)] border-b border-line bg-paper/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Logo />
        <nav aria-label="Điều hướng chính" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-small font-medium text-ink-soft transition-colors duration-[var(--duration-fast)] hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <ButtonLink href="/trial" size="sm" className="hidden lg:inline-flex">
            {siteConfig.ctas.trial}
          </ButtonLink>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
