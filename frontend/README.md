## Frontend & Backend separation

This repository contains both frontend and backend code. To run them separately:

- Frontend (from repository root):

```bash
npm install
npm run dev
```

- Backend (from `server/`):

```bash
cd server
npm install
npm run dev
```

See `server/README.md` for backend details.

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/5bdf2410-ee14-4dfe-a0f7-0633929b2c1f

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
