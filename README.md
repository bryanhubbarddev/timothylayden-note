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
                                    Repertoire[repertoire]
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
│   ├── floating-notes/ # decorative
│   ├── footer/         # optional (not mounted in app shell)
│   ├── piano-bar/      # optional (not mounted in app shell)
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

## Environment setup

Secrets and Firebase config are **not** committed. The app imports values from **`src/environments/secrets.generated.ts`**, which is produced by **`scripts/sync-env.cjs`**.

1. **`.env.example`** at the repo root lists the variable names (Firebase web config, optional Gemini). Copy it: **`cp .env.example .env`**.
2. Fill **`.env`** with real values from [Firebase Console](https://console.firebase.google.com/) → Project settings → Your apps → Web app, and (for the booking chat) [Google AI Studio](https://aistudio.google.com/) for **`GEMINI_API_KEY`**.
3. Run **`npm install`** or **`npm run env:sync`** so **`secrets.generated.ts`** is created. **`npm start`**, **`npm run build`**, **`npm run build:prod`**, and **`npm test`** all run **`env:sync`** first via npm lifecycle hooks.
4. **`.gitignore`** excludes **`.env`** and **`src/environments/secrets.generated.ts`** so they are never committed.

**CI/CD:** Export the same variable names in the job environment, or write a `.env` file in the runner before build; **`sync-env.cjs`** merges **`.env`** with **`process.env`**.

**Privacy:** Firebase web config and any Gemini key in the bundle can be inspected in the browser. Restrict keys in Google Cloud; use a server-side proxy for Gemini if the key must stay private.

### Booking helper (optional Gemini chat)

The **Booking helper** reads **`GEMINI_API_KEY`** and optional **`GEMINI_MODEL`**. With an empty key, the UI still appears and directs visitors to email. Grounding uses **`site-content.ts`** via **`BookingAssistantService`**.

---

## Tests

```bash
npm test
```

Runs **`pretest`** → **`env:sync`**, then **`ng test`** (Karma + Jasmine). For CI, run **`npx ng test --watch=false --browsers=ChromeHeadless`** (or set the same in the **`test`** options in **`angular.json`**).

---

## Deploy (Firebase Hosting)

Production deploy is **`npm run deploy`** (`build:prod` + **`firebase deploy`**). Equivalent manual steps:

```bash
npm run build:prod
npx firebase login          # once per machine
npx firebase use --add      # select project; aligns with .firebaserc
npx firebase deploy         # or: npm run deploy (build + deploy)
```

Hosting **`public`** directory is set in **`firebase.json`** to **`dist/timothylayden-note/browser`** after Angular production build.

### Custom domain

1. In [Firebase Console](https://console.firebase.google.com/) → Hosting → **Add custom domain**, follow the wizard (DNS **A**/**TXT** records as shown).
2. Wait for SSL provisioning (can take up to 24 hours).
3. At your DNS provider, point the domain to Firebase’s records exactly as listed; avoid duplicate conflicting A/CNAME entries.

---

## Legacy note

Older docs may reference **`src/environments/secrets.ts`**. The project uses **`secrets.generated.ts`** only; do not add a manual **`secrets.ts`** to the repo.

---

## GitHub & branch rules

If **`main`** is protected (e.g. “changes via pull request only”), push a **feature branch** and open a PR into `main` instead of pushing directly to `main`.

---

## How to extend

- **Copy:** Edit `site-content.ts` only for text, images, gallery, videos, and booking email.
- **New section:** Add a standalone component, import it in `app.ts`, place it in `app.html`, pass `@Input()` data from `d` or slices.
- **Branding:** Change `stageName`; hero/bio name formatting follows automatically where wired.
