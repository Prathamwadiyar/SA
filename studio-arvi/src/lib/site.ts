export const site = {
  name: "Studio Arvi",
  description: "An independent creative studio crafting distinctive websites, identities, and digital experiences with intention.",
  nav: [
    { label: "Work", href: "/work" },
    { label: "Expertise", href: "/expertise" },
    { label: "Studio", href: "/studio" },
  ],
};
export function siteOrigin() { return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || undefined; }
