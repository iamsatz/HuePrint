# HuePrint

## Overview
HuePrint is a React + Vite web application for browsing and exporting design token kits for AI-builders. Users browse curated brand palettes organized by industry, preview them on UI components, and download AI-ready token files.

## Tech Stack
- **Frontend**: React 18, Vite 5
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
│       └── *.json           # Individual kit data (name, industry, description, palette)
├── src/
│   ├── App.jsx              # Root app with BrowserRouter + Routes
│   ├── main.jsx             # React entry point
│   ├── index.css            # Global styles (hero layout, typography)
│   ├── types/
│   │   └── kit.js           # Kit type definitions + INDUSTRIES constant
│   ├── lib/
│   │   └── loadKits.js      # loadKits() + getSwatchColors() utilities
│   ├── components/
│   │   ├── nav/
│   │   │   └── TopNav.jsx   # Sticky top nav with HuePrint wordmark + Browse link
│   │   └── browse/
│   │       ├── IndustryFilter.jsx  # Tab/pill filter row
│   │       ├── KitCard.jsx         # Kit card with swatches, name, industry tag, description
│   │       └── KitGrid.jsx         # Responsive 3/2/1 column grid
│   └── pages/
│       ├── LandingPage.jsx  # / route - hero section with CTA to /browse
│       ├── BrowsePage.jsx   # /browse route - kit grid with industry filtering
│       └── KitDetailPage.jsx  # /kit/:id route - "Coming soon" placeholder
├── attached_assets/         # Design assets and metadata
├── PRD.md                   # Product requirements document
├── index.html               # HTML entry point
├── vite.config.js           # Vite config (port 5000, @assets alias, Tailwind)
├── tsconfig.json            # TypeScript config
└── package.json             # Dependencies and scripts
```

## Routes
- `/` — Landing page with hero section and "Browse Kits" CTA
- `/browse` — Kit browser with industry filter tabs and kit grid
- `/kit/:id` — Kit detail page (placeholder "Coming soon")

## Running the App
The app runs via the "Start application" workflow:
```
npm run dev
```
This starts the Vite dev server at `http://0.0.0.0:5000`.

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
    "light": { "background": "#fff", "surface": "#...", "primary": "#...", ... },
    "dark": { ... }
  }
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
