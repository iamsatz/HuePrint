# HuePrint

## Overview
HuePrint is a React + Vite web application that provides production-ready design system kits organized by industry. Users browse curated kits, preview them on realistic UI mockups, and export design tokens directly into their projects.

## Tech Stack
- **Frontend**: React 18, Vite 5
- **Language**: TypeScript (TSX)
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
- **Icons**: Lucide React
- **Color utilities**: chroma-js
- **Package Manager**: npm

## Project Structure
```
├── src/
│   ├── components/
│   │   ├── landing/     # Hero, HowItWorks, Footer
│   │   └── ui/          # Shared UI primitives
│   ├── lib/             # Utility functions (cn, etc.)
│   ├── types/           # TypeScript interfaces (Kit)
│   ├── styles/
│   │   └── globals.css  # Tailwind v4 entry (@import "tailwindcss")
│   ├── App.tsx          # Root app component (landing page layout)
│   └── main.tsx         # React entry point
├── public/
│   └── kits/            # Kit JSON files (saas, finance, health, retail, creative)
├── PRD.md               # Product requirements document
├── index.html           # HTML entry point
├── vite.config.ts       # Vite + Tailwind v4 + path aliases
├── tsconfig.json        # TypeScript config
└── package.json         # Dependencies and scripts
```

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
- Path aliases: `@/` maps to `src/`, `@assets/` maps to `attached_assets/`

## Kit Schema
Each kit JSON in `public/kits/` follows this shape:
```typescript
interface Kit {
  id: string
  name: string
  industry: string
  description: string
  colors: { light: ColorSet; dark: ColorSet }
  typography: { headingFont: string; bodyFont: string; baseFontSize: string; lineHeight: string }
  spacing: { base: string; scale: number }
  borderRadius: { sm: string; md: string; lg: string; full: string }
  shadow: { sm: string; md: string; lg: string }
}
```

## Available Kits
- `saas.json` — SaaS Clarity (indigo/violet)
- `finance.json` — Finance Prestige (navy/teal)
- `health.json` — Health Calm (sky/emerald)
- `retail.json` — Retail Vivid (orange/pink)
- `creative.json` — Creative Studio (violet/cyan)
