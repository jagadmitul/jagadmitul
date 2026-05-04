# Mitul Jagad — Portfolio

Modern Next.js 16 + React 19 + Tailwind v4 migration of [github.com/jagadmitul/jagadmitul](https://github.com/jagadmitul/jagadmitul) — same visual design as the original static HTML, real data sourced from Mitul's resume + LinkedIn, plus new features.

## What's there

**Pages** (all 7 ported from the original):
- `/` — Home (3-column: intro · experience+skills · projects · services · CTA marquee)
- `/about` — Bio, real-metric strip, full career timeline (5 jobs), help-with grid
- `/services` — 6 services with bullet specs + 3 engagement modes
- `/portfolio` — 6 projects with metrics, tags, links to case studies
- `/portfolio/[slug]` — 6 individual case studies (TAPUZ, MedChron, SSO, etc.)
- `/blog` — 6 articles sourced from LinkedIn posts
- `/blog/[slug]` — Individual article pages
- `/contact` — Form + contact details + mailto fallback

**New features added on top of the original:**
- Multi-palette theme picker (top-right) — 6 themes: Light · Dark · Vermilion · Sage · Plum · Mono. Persists to localStorage. No flash on reload.
- "Ask Mitul" floating chatbot (bottom-right) — scripted Q&A with smart keyword routing for free-form input. Real Mitul answers (rate, availability, stack, projects, location, hire process).
- WebGL `Background3D` — replaces the original portfolio's static `gradient-1.png` / `object-3d-1.png` decorations with real `@react-three/fiber` glass blobs that subtly track the cursor and tint to match the active palette.
- Lenis smooth scroll site-wide.
- All animations gracefully degrade under `prefers-reduced-motion`.

## Stack

- **Framework:** Next.js 16 (App Router) + React 19 · TypeScript strict
- **Styling:** Tailwind CSS v4 (CSS-first, `@theme`) — palette tokens via CSS variables
- **Motion:** `motion`, `lenis`, `gsap`, `split-type`
- **3D:** `@react-three/fiber` + `@react-three/drei` + `three`
- **UI primitives:** `@radix-ui/react-dialog`, `lucide-react`
- **Fonts:** Bricolage Grotesque (preserved from original) + JetBrains Mono

## Run

```bash
pnpm dev      # http://localhost:3000
pnpm build    # production build, runs TS
pnpm start    # serve production build
pnpm lint     # eslint
```

## Real data

All copy and metrics in this site are sourced from Mitul's resume PDF and LinkedIn profile. No invented metrics. All companies (Omnis AI, Rebrandic, Tpots, Zodiac Techlance), projects (TAPUZ, MedChron.AI, AI Workflow Agent, Enterprise SSO), wins (50s → 4s, 100K users, 0 auth tickets in m1, 40% MFE bottleneck cut), and articles map to actual content from LinkedIn.

The `IntroCard` profile image is currently a tasteful placeholder block — swap with a real photo on first deploy.

## Notes

- Design preserved 1:1 from the original (sticky white nav card with rounded corners, `rounded-2xl` cards on `bg-paper-2` backgrounds, `Bricolage Grotesque` everywhere, primary accent `#4770FF` in default theme).
- Original light/dark toggle is now extended to the 6-palette picker.
- Original PNG 3D objects + `move-with-cursor` JS replaced with real R3F WebGL.
- `<marquee>` HTML5 element replaced with CSS-animated `animate-marquee` track.
- Swiper / VenoBox / Preline removed in favor of React-native equivalents.
