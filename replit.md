# HuePrint

## Overview
HuePrint is a React + Vite web application for browsing and exporting design token kits for AI-builders. Users browse curated brand palettes organized by industry, preview them on UI components, and download AI-ready token files.

## Tech Stack
- **Frontend**: React 18, Vite 5
- **Backend**: Express (lightweight API server serving Vite as middleware)
- **Routing**: react-router-dom
- **Language**: JavaScript (JSX)
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
- **Icons**: Lucide React
- **Color utilities**: chroma-js
- **Package Manager**: npm

## Project Structure
```
├── public/
│   └── kits/               # Kit JSON data files
│       ├── index.json       # Kit manifest (list of kit IDs)
│       └── *.json           # Individual kit data (name, industry, description, palette, typography, spacing, borderRadius, shadow)
├── src/
│   ├── App.jsx              # Root app with BrowserRouter + Routes
│   ├── main.jsx             # React entry point
│   ├── index.css            # Global styles (hero layout, typography)
│   ├── types/
│   │   └── kit.ts           # Kit TypeScript type definitions
│   ├── lib/
│   │   ├── loadKits.js      # loadKits() + getSwatchColors() utilities
│   │   ├── brandGuidelines.js  # Brand name → guidelines URL lookup table (~25 brands)
│   │   └── useKitTheme.js   # useKitTheme(kit, mode) hook — injects CSS vars onto a scoped ref
│   ├── components/
│   │   ├── nav/
│   │   │   └── TopNav.jsx   # Sticky top nav with HuePrint wordmark + Browse link
│   │   ├── browse/
│   │   │   ├── IndustryFilter.jsx  # Tab/pill filter row
│   │   │   ├── KitCard.jsx         # Kit card with swatches, name, industry tag, description
│   │   │   └── KitGrid.jsx         # Responsive 3/2/1 column grid
│   │   └── kit/
│   │       ├── ColorPalette.jsx    # Radix-style 10-role color swatch grid (light + dark columns)
│   │       ├── ColorPalette.css
│   │       ├── ComponentGallery.jsx # Live component preview using kit CSS variables
│   │       ├── ComponentGallery.css
│   │       ├── TokenTable.jsx      # Raw token display (typography, spacing, radius, shadow)
│   │       └── TokenTable.css
│   └── pages/
│       ├── LandingPage.jsx  # / route - hero section with CTA to /browse
│       ├── BrowsePage.jsx   # /browse route - kit grid with industry filtering
│       ├── KitDetailPage.jsx  # /kit/:id route - full kit detail with color panel, gallery, token table
│       └── KitDetailPage.css
├── attached_assets/         # Design assets and metadata
├── server.js                # Express server — serves Vite as middleware + /api/extract-url endpoint
├── PRD.md                   # Product requirements document
├── index.html               # HTML entry point
├── vite.config.ts           # Vite config (port 5000, @assets alias, Tailwind)
├── tsconfig.json            # TypeScript config
└── package.json             # Dependencies and scripts
```

## Routes
- `/` — Landing page with hero section and "Browse Kits" CTA
- `/browse` — Kit browser with industry filter tabs and kit grid
- `/kit/:id` — Kit detail page with color tokens, component gallery, and token table

## Kit Detail Page (`/kit/:id`)
The kit detail page renders three sections:
1. **Color Tokens** — Radix-style swatch grid with all 10 palette roles (background, surface, primary, secondary, accent, text, textMuted, border, success, warning) shown in two columns: light mode and dark mode
2. **Component Gallery** — Live UI preview using CSS custom properties injected from the kit. Components: primary/secondary/ghost/destructive buttons, text input + select + checkbox, info/success/warning/error alerts, card, 5 badges, mini nav bar, typography specimen
3. **Token Table** — Raw token values for typography, spacing, border radius, and shadow

A Light/Dark toggle at the top switches all components and swatches simultaneously.

### CSS Variable Injection
The `useKitTheme(kit, mode)` hook injects CSS variables onto a scoped container `ref`:
- Color vars: `--hp-background`, `--hp-surface`, `--hp-primary`, `--hp-secondary`, `--hp-accent`, `--hp-text`, `--hp-textMuted`, `--hp-border`, `--hp-success`, `--hp-warning`
- Typography: `--hp-heading-font`, `--hp-body-font`, `--hp-font-size`, `--hp-line-height`
- Radii: `--hp-radius-sm/md/lg/full`
- Shadows: `--hp-shadow-sm/md/lg`

## Running the App
The app runs via the "Start application" workflow:
```
node server.js
```
This starts an Express server at `http://0.0.0.0:5000` which serves the Vite dev server as middleware (in dev mode) and handles the `/api/extract-url` color extraction endpoint.

### Backend API
- `POST /api/extract-url` — Accepts `{ url }`, fetches HTML/CSS from the URL server-side (bypassing CORS), and returns `{ colors, semantic, domain, count }`. Returns `{ error, message }` on failure.

## Key Configuration
- Vite is configured with `allowedHosts: true` to work behind the Replit proxy
- Server binds to `0.0.0.0` so it's accessible from the Replit preview pane
- Tailwind CSS v4 is loaded via `@tailwindcss/vite` plugin — no `tailwind.config.js` needed
- Path aliases: `@assets` maps to `./attached_assets`

## Kit Data Format
Each kit JSON in `public/kits/` follows this shape:
```json
{
  "id": "saas-clarity",
  "name": "SaaS Clarity",
  "industry": "SaaS",
  "description": "...",
  "palette": {
    "light": { "background": "#fff", "surface": "#...", "primary": "#...", "secondary": "#...", "accent": "#...", "text": "#...", "textMuted": "#...", "border": "#...", "success": "#...", "warning": "#..." },
    "dark": { ... }
  },
  "typography": { "headingFont": "Inter", "bodyFont": "Inter", "baseFontSize": "16px", "lineHeight": "1.6" },
  "spacing": { "base": "4px", "scale": 1.5 },
  "borderRadius": { "sm": "4px", "md": "8px", "lg": "12px", "full": "9999px" },
  "shadow": { "sm": "...", "md": "...", "lg": "..." }
}
```
The `public/kits/index.json` manifest lists all kit IDs to load.

## Available Kits
- `saas-clarity.json` — SaaS Clarity (blue/slate)
- `saas-midnight.json` — SaaS Midnight (indigo/violet, dark-first)
- `finance-trust.json` — Finance Trust (navy/gold)
- `finance-growth.json` — Finance Growth (emerald/slate)
- `health-calm.json` — Health Calm (green/white)
- `health-vitality.json` — Health Vitality (coral/amber)
- `retail-vibrant.json` — Retail Vibrant (orange/yellow)
- `creative-bold.json` — Creative Bold (purple/pink)
