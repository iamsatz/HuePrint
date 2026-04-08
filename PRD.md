# Hueprint — Product Requirements Document

**Version:** 1.1
**Date:** April 2026
**Status:** MVP — Pre-Development
**Platform:** Web App (React + Vite + Tailwind)
**Repo:** `hueprint`

---

## What Is Hueprint

Hueprint is a web-based design token kit store for AI-builders. Users browse curated, designer-crafted token kits — preview them on real UI components — and download AI-ready files (Markdown system prompt + CSS + JSON) they can paste directly into Claude, v0, Cursor, Bolt, or any AI code tool to get branded output instantly.

**Core insight:** AI tools don't have a "design token import." They read prompts. So a Hueprint kit is not just tokens — it's a **design system prompt + tokens** bundle. The prompt tells the AI *how* to use the colors, not just *what* the colors are.

**One-liner:** "Pick a brand kit. Paste into your AI tool. Get branded UI."

---

## Target Users

| Persona | Description | Job to be done |
|---|---|---|
| **Solo founder** | Building with Claude/v0/Cursor, no design skills | Get branded UI without learning design systems |
| **Indie hacker** | Ships 3–5 projects/year, codes but can't design | Professional palette + tokens, code-ready |
| **Product designer** | At early-stage startup, uses Figma + AI tools | Quick brand exploration, export to Figma or code |

---

## What's in a Hueprint Kit

Each kit is a **3-file bundle** hand-curated by the Hueprint design team:

### 1. `system-prompt.md` — The AI-Readable Design Brief (THE MOAT)
- Complete color palette (light + dark) with semantic role names
- Usage rules per component (buttons, cards, inputs, nav, badges)
- Typography, spacing, radius, shadow specs
- Explicit "Do NOT" rules to prevent AI fallback to generic defaults
- Formatted as a markdown spec that Claude/v0/Cursor can parse directly

### 2. `tokens.css` — shadcn/Radix Compatible CSS Variables
- HSL-format variables matching shadcn naming conventions (`--primary`, `--accent`, `--destructive`, etc.)
- Light and dark mode (`.dark` class)
- Typography, spacing, radius, shadow custom properties
- Paste into `globals.css` and it works

### 3. `tokens.json` — Universal DTCG Format
- W3C Design Tokens Community Group format (`$value`, `$type`)
- Compatible with Style Dictionary, Figma Tokens, Tailwind config generation
- Full color, typography, spacing, radius, shadow tokens

---

## MVP Scope

### In Scope
- Landing page with clear value proposition
- Browse curated kits (8–12 kits, organized by industry)
- Kit detail view with live component preview
- Component preview: buttons, card, input, form, navbar, badge, divider, status states
- Dark mode toggle in preview
- Export modal: copy or download system-prompt.md, tokens.css, tokens.json
- WCAG AA contrast info displayed per kit
- Responsive (mobile + desktop)
- No login required
- Deployed on Vercel

### Out of Scope (Phase 2+)
- User accounts / saved kits
- Custom color input / token generation (Tier 3 from original PRD)
- Token editor / customization UI
- Figma plugin
- Chrome extension
- API / CLI
- Paid tiers
- Community submissions
- AI-powered palette generation

---

## Site Structure

```
Landing Page
├── Hero: value prop + CTA
├── How It Works (3 steps)
├── Kit Grid (browse all)
│   ├── Industry filter tabs
│   └── Kit cards (name, swatches, industry tag)
└── Footer

Kit Detail (modal or page)
├── Kit name + description
├── Color palette display (light + dark)
├── Live component preview
│   ├── Primary button, secondary button, ghost button
│   ├── Card (title + description + footer)
│   ├── Text input with label + focus state
│   ├── Form section (2 inputs)
│   ├── Navbar
│   ├── Badge / chip (multiple variants)
│   ├── Divider
│   └── Success / warning / error states
├── Dark mode toggle
├── WCAG contrast summary
└── Export modal
    ├── For AI Tools → system-prompt.md (copy / download)
    ├── For shadcn → tokens.css (copy / download)
    └── Universal → tokens.json (copy / download)
```

---

## Curated Kits (MVP: 8–12)

2 kits per industry. Quality over quantity.

| Industry | Kit 1 | Kit 2 |
|---|---|---|
| **SaaS** | Modern SaaS (teal, professional) | Minimal SaaS (slate, clean) |
| **Health** | Calm Health (soft green, warm) | Medical Pro (navy, clinical) |
| **E-commerce** | Bold Commerce (orange/red, energetic) | Luxury Commerce (purple, gold) |
| **Fintech** | Professional Fintech (navy, gold) | Modern Fintech (indigo, electric blue) |
| **Education** | Learning Focus (bright blue, yellow) | EdTech (purple, vibrant) |
| **Creative** | Bold Creative (high saturation, distinctive) | Studio Minimal (muted, editorial) |

Each kit follows the 3-file bundle structure defined above.

---

## Technical Stack

| Layer | Choice | Why |
|---|---|---|
| **Framework** | React 19 + TypeScript | Industry standard, Claude Code / Replit friendly |
| **Build** | Vite | Fast dev, fast builds |
| **Styling** | Tailwind CSS v4 | Token-native, utility-first |
| **Components** | shadcn/ui primitives | Accessible, unstyled base |
| **Icons** | Lucide React | Lightweight, consistent |
| **Color display** | chroma.js | Color manipulation, contrast calculation |
| **Deployment** | Vercel | Auto-deploy from GitHub |
| **Analytics** | Plausible | Privacy-friendly, lightweight |

### Project Structure

```
hueprint/
├── public/
│   └── kits/                    # Kit JSON data files
│       ├── saas-modern.json
│       ├── saas-minimal.json
│       └── ...
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── landing/             # Hero, HowItWorks, Footer
│   │   ├── kit-browser/         # KitGrid, KitCard, IndustryFilter
│   │   ├── kit-detail/          # KitDetail, ColorPalette, ComponentPreview
│   │   ├── preview/             # PreviewButton, PreviewCard, PreviewInput, etc.
│   │   ├── export/              # ExportModal, FormatSelector, CopyButton
│   │   └── ui/                  # shadcn primitives (button, dialog, tabs, etc.)
│   ├── lib/
│   │   ├── kits.ts              # Kit data loading + types
│   │   ├── contrast.ts          # WCAG contrast utilities
│   │   ├── export-formats.ts    # Generate CSS / JSON / MD from kit data
│   │   └── utils.ts             # General utilities
│   ├── types/
│   │   └── kit.ts               # Kit TypeScript interfaces
│   └── styles/
│       └── globals.css          # Hueprint's own design tokens
├── .gitignore
├── .env.example
├── LICENSE
├── README.md
├── PRD.md
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vite.config.ts
└── vercel.json
```

---

## Design Specs (Hueprint's Own Brand)

| Token | Value |
|---|---|
| **Primary** | `#01696f` (teal) |
| **Background (light)** | `#f7f6f2` (warm beige) |
| **Background (dark)** | `#171614` |
| **Text (light)** | `#28251d` |
| **Text (dark)** | `#cdccca` |
| **Display font** | Instrument Serif (Google Fonts) |
| **Body font** | General Sans (Fontshare) or DM Sans (Google Fonts) |
| **Spacing base** | 4px |
| **Radius** | 8px default |
| **Transitions** | 180ms cubic-bezier(0.16, 1, 0.3, 1) |

---

## Accessibility Requirements

- WCAG AA contrast on all text (4.5:1 body, 3:1 large text)
- Keyboard navigation (Tab, Enter, Escape)
- Visible focus rings on all interactive elements
- Semantic HTML (`button`, `label`, `fieldset`, `dialog`)
- Dark mode toggle
- No motion-dependent interactions
- Alt text on all images
- Screen reader compatible export modal

---

## Success Metrics

| Metric | Target |
|---|---|
| Kit browse → export conversion | >25% |
| Avg session duration | >2 min |
| Most used export format | system-prompt.md (>40%) |
| Bounce rate | <40% |
| Beta users (first 30 days) | 200+ |

---

## Launch Plan

1. **Week 1–2:** Project setup, kit data structure, component preview system
2. **Week 3–4:** Landing page, kit browser, kit detail view
3. **Week 5–6:** Export modal, dark mode, responsive, accessibility
4. **Week 7:** 8–12 kits curated and tested
5. **Week 8:** Beta launch, 50 users, gather feedback

---

## Future Phases

| Phase | Features |
|---|---|
| **Phase 2** | Custom color input (Tier 3), user accounts, saved kits |
| **Phase 3** | Figma plugin, Chrome extension, community submissions |
| **Phase 4** | Paid tiers, API, CLI, team features |
