import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-display font-semibold text-accent/30" aria-hidden="true">
        404
      </p>
      <h1 className="mt-2 text-section font-semibold text-ink">
        Không tìm thấy trang này
      </h1>
      <p className="mt-3 max-w-md text-body">
        Trang bạn tìm không tồn tại hoặc đã được di chuyển. Hãy quay về trang chủ hoặc xem các
        chương trình học của chúng tôi.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Về trang chủ</ButtonLink>
        <ButtonLink href="/programs" variant="ghost">
          Xem chương trình học
        </ButtonLink>
      </div>
      <p className="mt-6 text-small text-muted">
        Cần hỗ trợ? <Link href="/contact" className="text-accent-strong underline underline-offset-4">Liên hệ với chúng tôi</Link>
      </p>
    </Container>
  );
}
