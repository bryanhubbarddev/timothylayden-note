# Timothy Layden — Quick Start

## Preview instantly (no install needed)
Open `preview.html` in any browser to see a static preview of the site.

---

## Run with Angular

### 1. Install
```bash
npm install
```

### 2. Run locally
```bash
npm start
# or: ng serve
# → http://localhost:4200
```

### 3. (Optional) Firebase — only if you deploy
To use `npm run deploy`, add your Firebase config:

- `src/environments/environment.ts`
- `src/environments/environment.production.ts`

Replace every `YOUR_*` value. Get config from **Firebase Console → Project Settings → Your apps → Web**.

Then:
```bash
firebase login
firebase use --add   # pick your project → alias, e.g. default
npm run deploy       # build + deploy to Firebase Hosting
```

---

## Update content
All text, stats, gallery, and data live in **`src/app/data/site-content.ts`**. Edit the `siteContent` object (or `SiteData` interface) there; the app reads it via `SiteContentService` and passes it into components.

---

## Add photos
Drop gallery images into `src/assets/` and reference them in `site-content.ts` (e.g. `timmy-piano-stage-1.jpg`, `timmy-piano-red-shirt.jpg`, `timmy-shirt-detail.jpg`).
