# Timothy Layden — Live Piano

Angular 19 single-page site for a live pianist: hero (with portrait), bio, experience, repertoire, gallery (lightbox + optional video embeds), and contact. All content flows from one typed data object. Developed by Bryan Hubbard for client Timothy Layden.

**As a software engineer,** I want to design a professional website **so that** the client can showcase their talent and abilities to the public.

**Repository:** [github.com/bryanhubbarddev/timothylayden-note](https://github.com/bryanhubbarddev/timothylayden-note)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                            App (app.ts)                                  │
│  inject(SiteContentService) → d: SiteData                                │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
┌───────────────┐         ┌──────────────────┐         ┌──────────────┐
│ site-content  │         │      app.html    │         │ ScrollService│
│    .ts        │────────▶│  d passed down   │◀────────│ (inject)     │
│ SiteData      │         │  as @Input()     │         │ scrollTo(id) │
└───────────────┘         └──────────────────┘         └──────────────┘
        │                           │
        │         ┌─────────────────┼─────────────────┐
        │         │                 │                 │
        ▼         ▼                 ▼                 ▼
   Nav[stageName]  Hero[data]      Bio[data]       Experience[experience]
   Footer[stageName]                Repertoire[repertoire]
                                    Gallery[gallery, videos]
                                    Contact[bookingEmail, bookingContact]
```

*Hero reads `heroImage` / `heroImageAlt` from `SiteData`.*

---

## Project structure

```
src/app/
├── app.ts              # Root; injects SiteContentService, exposes d: SiteData
├── app.html            # Shell; passes d (or slices) to children
├── app.config.ts
├── app.routes.ts
├── data/
│   └── site-content.ts # SiteData interface + siteContent constant
├── services/
│   ├── site-content.service.ts  # getContent(): SiteData
│   └── scroll.service.ts        # scrollTo(id: string)
├── directives/
│   └── reveal-on-scroll.directive.ts
├── components/
│   ├── nav/            # [stageName]
│   ├── hero/           # [data] — SiteData (includes heroImage, heroImageAlt)
│   ├── experience/     # [experience]
│   ├── repertoire/     # [repertoire]
│   ├── gallery/        # [gallery] [videos] — lightbox, optional iframes
│   ├── contact/        # [bookingEmail] [bookingContact] — mailto + subject
│   ├── footer/         # [stageName]
│   ├── floating-notes/ # decorative
│   └── piano-bar/      # decorative
└── bio/                # [data] — full SiteData
```

Global base styles for `html` / `body` live in **`src/styles.css`** (so the cream page background applies site-wide). Component-specific layout lives in each component’s CSS and `app.css`.

---

## Run, build, lint

```bash
npm install
ng serve
# → http://localhost:4200
```

```bash
ng build
ng build --configuration production
```

```bash
ng lint
```

---

## Content & media (`site-content.ts`)

Edit **`src/app/data/site-content.ts`** — the `siteContent` object and `SiteData` interface.

| Field | Purpose |
|--------|---------|
| `stageName`, `subheadline`, `location`, etc. | Hero copy, stats, focus list |
| **`heroImage`**, **`heroImageAlt`** | Front-page portrait path (e.g. `assets/TimFront.png`) and accessible description |
| **`gallery`** | Array of `{ src, alt, caption }` — files under `src/assets/`; thumbnails show full image; click opens lightbox |
| **`videos`** | Optional `{ title, embedSrc }` — full **embed** URL (YouTube `…/embed/…`, Vimeo player URL). Empty `[]` hides the Videos block |
| **`bookingEmail`**, **`bookingContact`** | Contact card; links use `mailto:` with a booking **subject** line |

**Assets:** Place images in **`src/assets/`** and reference them as `assets/YourFile.png` in `site-content.ts`.

---

## Deploy (Firebase Hosting)

```bash
firebase login
firebase use --add    # select project; aligns with .firebaserc
npm run deploy        # production build + firebase deploy
```

Hosting output is configured in **`firebase.json`** (`public` → `dist/timothylayden-note/browser` after `ng build`).

Optional: configure **`src/environments/environment.ts`** and **`environment.production.ts`** if you use Firebase SDK features beyond Hosting.

---

## GitHub & branch rules

If **`main`** is protected (e.g. “changes via pull request only”), push a **feature branch** and open a PR into `main` instead of pushing directly to `main`.

---

## How to extend

- **Copy:** Edit `site-content.ts` only for text, images, gallery, videos, and booking email.
- **New section:** Add a standalone component, import it in `app.ts`, place it in `app.html`, pass `@Input()` data from `d` or slices.
- **Branding:** Change `stageName`; hero/bio name formatting follows automatically where wired.
