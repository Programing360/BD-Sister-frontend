export const siteConfig = {
  name: "BDSisters.org",
  shortName: "BDSisters",
  tagline: "Empowering Bangladeshi Muslim Women in Business, Community & Learning",
  description:
    "An AI-powered digital ecosystem uniting Bangladeshi Muslim women entrepreneurs, professionals, learners, and community leaders.",
  url: process.env["NEXT_PUBLIC_APP_URL"] ?? "https://bdsisters.org",
  links: {
    facebook: "https://facebook.com/bdsistersorg",
    instagram: "https://instagram.com/bdsistersorg",
    linkedin: "https://linkedin.com/company/bdsisters",
    supportEmail: "support@bdsisters.org",
  },
  locale: "en-US",
  defaultCurrency: "BDT",
  supportedCurrencies: ["BDT", "USD"],
} as const;

export type SiteConfig = typeof siteConfig;
