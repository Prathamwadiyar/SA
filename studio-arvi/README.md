# Studio Arvi — Independent Creative Studio

A complete Next.js / TypeScript creative studio website, based on the approved six-phase design blueprint. Features a four-artifact GSAP/ScrollTrigger hero, Lenis desktop smooth scrolling, five main destinations, an MDX-backed project archive and case studies, service and studio pages, and a server-validated inquiry form.

## Quick start

Requirements: Node.js 20.9+ and npm, with access to the npm registry.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open **http://localhost:3000**.

Before deployment:

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

Deploy to Vercel using a private GitHub repo or the Vercel CLI. The site works as a visual demo without credentials; the **contact form intentionally returns a configuration error** until real email delivery and production rate limiting are configured.

## Routes

- `/` — editorial homepage with four-stage interactive hero
- `/work` — curated concept archive
- `/work/aurel`, `/work/vellora`, `/work/monolith` — MDX case studies
- `/expertise` — creative capabilities and process
- `/studio` — philosophy, principles and founder-led introduction
- `/contact` — project inquiry
- `/privacy` — draft privacy notice **requiring review before publication**

## Brand asset needed

**The finalized Studio Arvi logo source file was not attached.** For now, `src/components/brand.tsx` renders a clearly identifiable text fallback inspired by the approved name. Replace that fallback with your **exact approved logo** as an asset in `public/brand/` before launch; do not accept a substitute as the final identity. The favicon is a temporary monogram and should also be reviewed.

## Original artwork

`public/art/` contains four local studio-created editorial concept illustrations (`aurel.jpg`, `vellora.jpg`, `monolith.jpg`, `forme.jpg`) and an OG preview. These are **not client photographs or evidence of completed commercial work**. The portfolio case studies are clearly marked **Independent Concept**. The homepage's four hero artifacts are original live HTML/CSS compositions; they are not a background screenshot. No hotlinked image dependencies.

## Project content

Add or edit `src/content/projects/*.mdx`. Metadata is validated in `src/lib/projects.ts`. `published: true` makes a project public. Set `projectType` to `concept`, `studio`, or `commissioned` accurately. Never invent client results. Unknown and unpublished slugs return 404.

## Inquiry delivery

1. Create and verify your sending domain with [Resend](https://resend.com/).
2. Add `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` to `.env.local` or Vercel environment variables.
3. Configure an Upstash Redis database and add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. Requests fail closed without this protection.
4. Test real email delivery from the deployed domain, including failure and rate-limit cases.
5. Review and finalize `/privacy` for the services, retention policy and jurisdictions actually involved.

The form uses zod server validation, content-size limits, a honeypot, origin checking, Upstash-backed rate limiting and Resend. It never reports a fake success.

## Search & analytics

Set `NEXT_PUBLIC_SITE_URL` to your verified production origin (e.g. `https://your-owned-domain.example`), **without a trailing slash**, to enable canonical base, sitemap and indexing. Leave it unset in local development. Configure `GOOGLE_SITE_VERIFICATION` if required, and `NEXT_PUBLIC_GA_ID` only after your GA4 property exists. The optional analytics script is loaded only after a visitor opts in, with the choice persisted locally. Set up Search Console and submit `/sitemap.xml` separately using your Google account.

## Motion & accessibility

Desktop fine-pointer screens get Lenis (one instance), GSAP ScrollTrigger and a short pinned four-artifact hero transformation; tablet/mobile get a non-pinned layout with native touch scrolling. Reduced-motion users get the static scene. The rest of the site uses restrained reveals and project imagery motion, with semantic content always rendered.

The design **targets**, but does not guarantee, WCAG 2.2 AA and Core Web Vitals at p75: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1. Audit in actual browsers before launch.

## Honest readiness

Source, assets, routes, contact pipeline and build scripts are included. Actual production readiness requires: npm install/build verification on an internet-enabled machine, your approved logo, domain, email and anti-abuse credentials, review of business copy and privacy notice, and responsive/accessibility/performance testing across target devices. This ZIP is not already deployed.
