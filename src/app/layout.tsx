import type { Metadata } from "next";
import { Be_Vietnam_Pro, Lora } from "next/font/google";
import { siteConfig } from "@/content/site";
import { organizationJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { MotionProvider } from "@/components/motion/motion-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileCta } from "@/components/layout/mobile-cta";
import "@/styles/globals.css";

// Fonts chosen for complete Vietnamese diacritic support (docs/design-system.md).
const lora = Lora({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${lora.variable} ${beVietnamPro.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-small focus:font-semibold focus:text-paper"
        >
          Bỏ qua tới nội dung chính
        </a>
        <JsonLd data={organizationJsonLd()} />
        <MotionProvider>
          <Header />
          <main id="main-content" className="flex-1 pb-[4.5rem] lg:pb-0">
            {children}
          </main>
          <Footer />
          <MobileCta />
        </MotionProvider>
      </body>
    </html>
  );
}

