# Timothy Layden — Live Piano

Angular 19 single-page site for a live pianist. Hero, bio, experience, repertoire, gallery, contact. All content from a single data source. Developed by Bryan Hubbard for client Timothy Layden.

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
   Nav[stageName]  Hero[data]   Bio[data]   Experience[experience]
   Footer[stageName]            Repertoire[repertoire]
                               Gallery[gallery]
                               Contact[bookingEmail, bookingContact]
```

---

## Project Structure

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
│   ├── hero/           # [data] — full SiteData
│   ├── experience/     # [experience]
│   ├── repertoire/     # [repertoire]
│   ├── gallery/        # [gallery]
│   ├── contact/        # [bookingEmail] [bookingContact]
│   ├── footer/         # [stageName]
│   ├── floating-notes/ # decorative
│   └── piano-bar/      # decorative
└── bio/                # [data] — full SiteData
```

---

## Run & Build

```bash
npm install
ng serve
# → http://localhost:4200
```

```bash
ng build
ng build --configuration production
```

---

## How to Extend

- **Add content:** Edit `src/app/data/site-content.ts` (stats, highlights, gallery, etc.).
- **Add section:** New component, add to `app.html` and `App` imports, pass data via `@Input`.
- **Change branding:** Update `stageName` in `site-content.ts`; name formatting applies automatically.
- **Deploy:** `npm run deploy` (if Firebase/script configured).
