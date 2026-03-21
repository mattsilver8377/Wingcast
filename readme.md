# WingCast PWA — Deployment Guide

## What's in this folder
```
wingcast-pwa/
├── index.html          ← The app
├── manifest.json       ← PWA config (name, icons, colours)
├── sw.js               ← Service worker (offline caching)
├── icons/              ← App icons for all devices
│   ├── icon-192x192.png
│   ├── icon-512x512.png
│   ├── apple-touch-icon.png
│   └── ... (all sizes)
└── README.md           ← This file
```

---

## Deploy in 2 minutes (Netlify — FREE)

1. Go to **https://netlify.com** and sign up free (use GitHub or email)
2. Click **"Add new site" → "Deploy manually"**
3. **Drag the entire `wingcast-pwa` folder** onto the deploy box
4. Netlify gives you a URL like `https://wingcast-abc123.netlify.app`
5. Optionally rename it: Site settings → Change site name → `wingcast` (makes it `wingcast.netlify.app`)

---

## Install on your phone

### Android (Chrome)
1. Open the URL in Chrome
2. A banner appears at the bottom: **"Add WingCast to home screen"** — tap it
3. Or: tap the ⋮ menu → **"Add to Home screen"**
4. It installs like a real app — no App Store needed ✓

### iPhone (Safari)
1. Open the URL in **Safari** (must be Safari, not Chrome)
2. Tap the **Share button** (box with arrow) at the bottom
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **"Add"** — the WingCast icon appears on your home screen ✓

---

## Offline use
Once installed, WingCast works fully offline — it shows the last cached forecast.
An orange banner appears when you're offline so you know the data may be outdated.

---

## Updating the app
Just drag the updated folder to Netlify again — it auto-deploys in seconds.
Users get the new version next time they open the app with a connection.
