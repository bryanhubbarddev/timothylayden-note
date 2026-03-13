# TimothyLayden.note — Quick Start — Quick Start

## Preview instantly (no install needed)
Open `preview.html` in any browser. This is exactly what the live site looks like.

---

## Run with Angular

### 1. Install
```bash
npm install
```

### 2. Add your Firebase config
Open these two files and replace every `YOUR_*` value with your real Firebase config:
- `src/environments/environment.ts`
- `src/environments/environment.production.ts`

Get your config from: **Firebase Console → Project Settings → Your apps → Web**

### 3. Run locally
```bash
npm start
# → http://localhost:4200
```

### 4. Connect Firebase CLI
```bash
firebase login
firebase use --add   # pick timothylayden-note → alias: default
```

### 5. Deploy
```bash
npm run deploy
# Builds + deploys to Firebase Hosting
```

Live at: `https://timothylayden-note.web.app`

---

## Add Timmy's photos
Drop these into `src/assets/`:
- `timmy-piano-stage-1.jpg`
- `timmy-piano-red-shirt.jpg`
- `timmy-shirt-detail.jpg`

## Update content
All text, stats, and data is in `src/app/app.ts` in the `d` object.
