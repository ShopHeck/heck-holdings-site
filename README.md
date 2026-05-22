# Heck Holdings — Marketing Site

Vite + React. Deploys to Cloudflare Pages.

## Local dev

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build → dist/
npm run preview      # serve the built dist/
```

## Deploy

### Option A — GitHub Actions auto-deploy (recommended)

Every push to `main` builds and deploys to production. PRs get a preview URL commented automatically.

**One-time setup:**

1. **Create the Cloudflare Pages project** (only needed once, locally):

   ```bash
   npm install -g wrangler
   wrangler login
   wrangler pages project create heck-holdings --production-branch=main
   ```

2. **Get your Cloudflare credentials:**
   - **Account ID**: Cloudflare dashboard → right sidebar of any page
   - **API Token**: dashboard → *My Profile → API Tokens → Create Token → "Edit Cloudflare Workers"* template (or Custom with `Account.Cloudflare Pages: Edit`)

3. **Push this folder to a GitHub repo**, then in *repo Settings → Secrets and variables → Actions*, add:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`

4. Done. Next push to `main` deploys; the workflow is `.github/workflows/deploy.yml`.

### Option B — manual deploy from your laptop

```bash
npm run build
npm run deploy        # wrangler pushes dist/ to Cloudflare Pages
```

### Option C — Cloudflare dashboard Git integration

If you prefer no GitHub Actions: in the CF dashboard, *Pages → Create project → Connect to Git*. Build command `npm run build`, output `dist`. CF handles everything.

## Things to swap before going live

| Where | What |
| --- | --- |
| Cloudflare Pages env vars | **`ANTHROPIC_API_KEY`** — required for the AgentBuilder spec generator. *Pages → heck-holdings → Settings → Environment variables → Production* |
| `src/components/Cta.jsx` | `CAL_LINK` — your real Cal.com handle (already set to `shop-heck/heck-holdings-consult`) |
| `index.html` | Cloudflare Analytics `data-cf-beacon` token (currently commented out) |
| `scripts/og-source.svg` | Edit if you want to tweak the OG card, then `npm run og` |
| `index.html` | `og:url` / canonical — change to your real domain once live |
| `src/components/Cta.jsx` | LinkedIn URL in footer (currently a placeholder slug) |

## AgentBuilder (the `#contact` section)

A 3-step conversational wizard that asks the visitor about their business + a painful workflow, calls Claude server-side, and returns a custom agent spec (name, hours saved, ship time, revenue impact, day-1 action). The "Book the audit with this brief" button opens Cal.com in a new tab with the spec **prefilled into the booking notes** — so you walk into the call with the brief already in hand.

- Frontend: [src/components/Cta.jsx](src/components/Cta.jsx)
- Server-side Claude proxy: [functions/api/agent-spec.js](functions/api/agent-spec.js) — runs as a Cloudflare Pages Function on the same domain (no CORS, no extra hosting). Uses `ANTHROPIC_API_KEY` from the Pages env, never sent to the client.
- If the API call fails (key missing, rate limit, parse error), the UI degrades to a sensible fallback spec so the demo still completes — with a small "showing a sample" notice.

## Structure

```
src/
  main.jsx              # React entry
  App.jsx               # Top-level composition
  data.js               # All copy (capabilities, projects, services, FAQs)
  styles.css            # Global tokens, design system primitives
  components/
    Nav.jsx, Hero.jsx, Gap.jsx, Days.jsx,
    Capabilities.jsx, Calculator.jsx,
    Projects.jsx, Demos.jsx,        # the case-study modal + per-agent live demos
    About.jsx, Cta.jsx, effects.jsx
    Icon.jsx                        # single-file stroke icon set
```

All copy lives in `src/data.js` so non-engineers can edit it without touching components.
