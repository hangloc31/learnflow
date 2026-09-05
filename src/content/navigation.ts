/**
 * Navigation model — consumed by Header, Footer and MobileMenu.
 * Adding a route requires updating this file, sitemap and robots in the same change.
 */
export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const mainNav: NavItem[] = [
  {
    label: "Chương trình",
    href: "/programs",
    children: [
      { label: "Mầm non (4–6 tuổi)", href: "/programs/preschool" },
      { label: "Tiểu học — Cambridge YLE", href: "/programs/primary" },
      { label: "THCS", href: "/programs/secondary" },
      { label: "THPT & Thi chứng chỉ", href: "/programs/highschool" },
      { label: "Giao tiếp người lớn", href: "/programs/adults" },
      { label: "Lộ trình IELTS", href: "/programs/ielts" },
      { label: "LearnFlow Online", href: "/programs/online" },
    ],
  },
  {
    label: "Học tập",
    href: "/about#journey",
    children: [
      { label: "Lộ trình học tập", href: "/about#journey" },
      { label: "Kiểm tra trình độ", href: "/placement-test" },
      { label: "Học thử miễn phí", href: "/trial" },
    ],
  },
  { label: "Giáo viên", href: "/teachers" },
  { label: "Về chúng tôi", href: "/about" },
  {
    label: "Câu chuyện",
    href: "/blog",
    children: [
      { label: "Kiến thức & mẹo học", href: "/blog" },
      { label: "Hoạt động & sự kiện", href: "/events" },
    ],
  },
  { label: "Liên hệ", href: "/contact" },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Chương trình",
    links: [
      { label: "Tất cả chương trình", href: "/programs" },
      { label: "Tiếng Anh trẻ em", href: "/programs/preschool" },
      { label: "Cambridge YLE — Tiểu học", href: "/programs/primary" },
      { label: "Lộ trình IELTS", href: "/programs/ielts" },
      { label: "LearnFlow Online", href: "/programs/online" },
    ],
  },
  {
    title: "Học tập",
    links: [
      { label: "Kiểm tra trình độ", href: "/placement-test" },
      { label: "Học thử miễn phí", href: "/trial" },
      { label: "Lộ trình học tập", href: "/about#journey" },
      { label: "Đội ngũ giáo viên", href: "/teachers" },
    ],
  },
  {
    title: "Khám phá",
    links: [
      { label: "Về chúng tôi", href: "/about" },
      { label: "Kiến thức & mẹo học", href: "/blog" },
      { label: "Hoạt động & sự kiện", href: "/events" },
      { label: "Liên hệ", href: "/contact" },
    ],
  },
];
