# Image Background Remover

> One-click AI-powered background removal tool · [Live Demo](#)

![Screenshot](screenshot.png)

## Tech Stack

- **Frontend**: Pure HTML/CSS/JS — no framework, no build step
- **Backend**: Cloudflare Worker (API Key proxy)
- **AI**: [remove.bg](https://remove.bg) API
- **Hosting**: Cloudflare Pages + Workers

## Project Structure

```
├── public/
│   └── index.html        # Frontend (upload, preview, compare slider)
├── worker/
│   ├── index.js          # Cloudflare Worker (remove.bg proxy)
│   └── wrangler.toml     # Worker config
└── README.md
```

## Setup & Deploy

### 1. Deploy the Cloudflare Worker

```bash
cd worker
npm install -g wrangler
wrangler login
wrangler secret put REMOVE_BG_KEY   # paste your remove.bg API key
wrangler deploy
```

Note your Worker URL: `https://image-bg-remover-worker.<subdomain>.workers.dev`

### 2. Update Frontend Config

In `public/index.html`, replace:
```js
const WORKER_URL = 'https://image-bg-remover-worker.YOUR_SUBDOMAIN.workers.dev/';
```
with your actual Worker URL.

### 3. Deploy Frontend to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages
2. Connect this GitHub repo
3. Set **build output directory** to `public`
4. Deploy!

## Features

- 🖼️ Drag & drop or click to upload (JPG, PNG, WEBP, max 10MB)
- ⚡ Background removed in ~3 seconds
- 🎨 Before/After comparison slider
- ⬇️ Download transparent PNG
- 🔒 API key never exposed to client
- 📱 Fully responsive

## License

MIT
