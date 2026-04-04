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
.env.example            # Template for repo-root `.env` (Gemini + Firebase)
scripts/sync-env.cjs    # Generates `src/environments/secrets.generated.ts` from `.env`
src/app/
├── app.ts              # Root; injects SiteContentService, exposes d: SiteData
├── app.html            # Shell; passes d (or slices) to children
├── app.config.ts
├── app.routes.ts
├── data/
│   └── site-content.ts # SiteData interface + siteContent constant
├── services/
│   ├── site-content.service.ts  # getContent(): SiteData
│   ├── booking-assistant.service.ts  # Gemini API (uses environment)
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
│   ├── piano-bar/      # decorative
│   └── booking-assistant/  # floating Gemini chat
└── bio/                # [data] — full SiteData
```

Global base styles for `html` / `body` live in **`src/styles.css`** (so the cream page background applies site-wide). Component-specific layout lives in each component’s CSS and `app.css`.

---

## Run, build, lint

```bash
npm install          # runs env:sync → creates secrets.generated.ts
cp .env.example .env # optional; add keys to `.env`
npm start            # prestart runs env:sync, then ng serve
# → http://localhost:4200
```

Use **`npm start`** / **`npm run build`** so **`env:sync`** runs first. Plain **`ng serve`** skips that unless you already ran **`npm run env:sync`**.

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
| **`videos`** | Each item: `{ title, fileSrc? }` for **MP4/WebM** in `src/assets/`, or `{ title, embedSrc? }` for **YouTube/Vimeo** iframe URL (one of the two per row). Empty `[]` hides the Videos block. Google Photos albums belong in **`photoAlbumLinks`**, not here |
| **`photoAlbumLinks`** | Array of `{ url, label }` (e.g. one [Google Photos](https://photos.app.goo.gl/) archive link). Shown below the gallery grid; each opens in a new tab. Use `[]` to hide |
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

### Environment variables (`.env`)

**Firebase** and **Gemini** settings are loaded from a **repo-root `.env`** file (gitignored). On **`npm install`**, **`npm start`**, **`npm run build`**, and **`npm test`**, **`npm run env:sync`** runs first and generates **`src/environments/secrets.generated.ts`** (also gitignored).

1. **`.env.example`** is committed with safe defaults (e.g. Firebase project id/domain). **`npm run env:sync`** loads it first, then merges **`.env`** on top (so secrets live only in **`.env`**).
2. Copy **`.env.example`** → **`.env`** and fill in **API keys** and ids from [Firebase Console](https://console.firebase.google.com/) → Project settings → Your apps → Web, and [Google AI Studio](https://aistudio.google.com/) for Gemini.
3. Run **`npm run env:sync`** if you change `.env` while the dev server is already running (or restart **`npm start`**).

**CI/CD:** Before `ng build`, create `.env` from secrets (e.g. `printenv` / heredoc in the workflow) or export the same variable names into the environment; **`sync-env.cjs`** reads **`process.env`** after loading `.env`, so variables already set in the job are kept.

**Privacy:** `.env` does not go to GitHub when ignored. Anything still **bundled into the browser** (Firebase web config, Gemini key) can be read by a determined visitor; restrict API keys in Google Cloud, and use a **backend proxy** for Gemini if you need the key to stay server-only.

### Booking helper (optional Gemini chat)

The **Booking helper** uses **`GEMINI_API_KEY`** and optional **`GEMINI_MODEL`** from **`.env`**. If the key is empty, the UI still appears but prompts visitors to use **email** instead. Replies are grounded in **`site-content.ts`** via **`BookingAssistantService`**.

---

## GitHub & branch rules

If **`main`** is protected (e.g. “changes via pull request only”), push a **feature branch** and open a PR into `main` instead of pushing directly to `main`.

---

## How to extend

- **Copy:** Edit `site-content.ts` only for text, images, gallery, videos, and booking email.
- **New section:** Add a standalone component, import it in `app.ts`, place it in `app.html`, pass `@Input()` data from `d` or slices.
- **Branding:** Change `stageName`; hero/bio name formatting follows automatically where wired.
