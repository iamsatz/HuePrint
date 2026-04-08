# Hueprint

**Design token kits for AI-builders.** Browse curated brand kits, preview on real UI components, download AI-ready files. Paste into Claude, v0, Cursor, or Bolt — get branded output instantly.

---

## What It Does

1. **Browse** — curated design token kits organized by industry
2. **Preview** — see tokens applied to real UI components (buttons, cards, forms, nav)
3. **Export** — download 3 files per kit:
   - `system-prompt.md` — AI-readable design brief (paste into Claude/v0/Cursor)
   - `tokens.css` — shadcn-compatible CSS variables
   - `tokens.json` — universal DTCG format

## Why It Exists

AI tools generate functional UI but apply generic colors. Hueprint kits include **usage rules**, not just color values — so AI tools know *how* to apply your brand, not just *what* the colors are.

---

## Tech Stack

- **React 19** + TypeScript
- **Vite** (build)
- **Tailwind CSS v4** (styling)
- **shadcn/ui** (component primitives)
- **Lucide React** (icons)
- **chroma.js** (color utilities)
- **Vercel** (deployment)

## Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm

### Install

```bash
git clone https://github.com/your-username/hueprint.git
cd hueprint
npm install
```

### Dev Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build

```bash
npm run build
npm run preview
```

### Deploy

Push to `main` — Vercel auto-deploys.

---

## Project Structure

```
hueprint/
├── public/kits/          # Kit data (JSON per kit)
├── src/
│   ├── components/
│   │   ├── landing/      # Hero, HowItWorks, Footer
│   │   ├── kit-browser/  # KitGrid, KitCard, IndustryFilter
│   │   ├── kit-detail/   # KitDetail, ColorPalette, ComponentPreview
│   │   ├── preview/      # PreviewButton, PreviewCard, PreviewInput, etc.
│   │   ├── export/       # ExportModal, FormatSelector, CopyButton
│   │   └── ui/           # shadcn primitives
│   ├── lib/              # Utils, contrast checking, export format generators
│   ├── types/            # TypeScript interfaces
│   └── styles/           # Global CSS
├── PRD.md                # Product requirements
├── LICENSE               # MIT
└── README.md             # This file
```

## Kit Data Format

Each kit in `public/kits/` follows this structure:

```json
{
  "id": "saas-modern",
  "name": "Modern SaaS",
  "industry": "SaaS",
  "description": "Professional, tech-forward, trustworthy.",
  "colors": {
    "light": { "primary": "#01696f", "..." : "..." },
    "dark": { "primary": "#2dd4bf", "..." : "..." }
  },
  "typography": { "..." : "..." },
  "spacing": { "..." : "..." },
  "borderRadius": { "..." : "..." },
  "shadow": { "..." : "..." }
}
```

---

## Contributing

Not open for contributions yet — MVP phase. Feedback welcome via issues.

## License

[MIT](./LICENSE)
