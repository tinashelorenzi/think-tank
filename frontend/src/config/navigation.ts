export interface NavLink {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface NavSection {
  title: string;
  links: NavLink[];
}

export const mainNav: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

export const socialLinks: NavLink[] = [
  { name: "Twitter", href: "https://twitter.com" },
  { name: "LinkedIn", href: "https://linkedin.com" },
  { name: "GitHub", href: "https://github.com" },
];

export const footerNav: NavSection[] = [
  {
    title: "Navigation",
    links: mainNav,
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  },
  {
    title: "Social",
    links: socialLinks,
  },
]; 