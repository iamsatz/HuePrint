# HuePrint — Product Requirements Document

## Overview

HuePrint is a web application that provides production-ready design system kits organized by industry. Users browse curated kits, preview them on realistic UI mockups, and export the design tokens (colors, typography, spacing, border radius, shadows) directly into their projects.

## Problem

Developers and designers building new products waste hours making color and typography decisions that should be systematic. There is no fast, opinionated way to get a professional design system tailored by industry vertical.

## Solution

A kit browser where each kit ships with:
- A full color palette for light and dark mode
- Typography pairings (heading + body fonts)
- Spacing scale
- Border radius tokens
- Shadow system
- A live preview on a realistic UI component

Users can browse, preview in real time, and export to Tailwind config, CSS custom properties, or raw JSON.

## Target Audience

- Indie hackers and solo founders spinning up MVPs
- Frontend developers who want a design system head start
- Designers validating a look quickly before a full buildout

## Core Features

### 1. Landing Page
- Hero: headline, sub-copy, primary CTA linking to `/browse`
- How It Works: 3-step section (Browse → Preview → Export)
- Footer

### 2. Kit Browser (`/browse`)
- Grid of kit cards showing name, industry badge, color swatch row
- Filter by industry
- Each card links to the kit detail page

### 3. Kit Detail (`/kit/:id`)
- Color palette display (light + dark mode toggle)
- Typography specimen
- Spacing + border radius + shadow tokens
- Live UI preview panel showing a sample component rendered with the kit
- Export panel: Tailwind config, CSS variables, JSON

## Kit Schema

```json
{
  "id": "string",
  "name": "string",
  "industry": "SaaS | Finance | Health | Retail | Creative",
  "description": "string",
  "colors": {
    "light": {
      "primary": "#hex",
      "secondary": "#hex",
      "background": "#hex",
      "surface": "#hex",
      "text": "#hex",
      "border": "#hex"
    },
    "dark": {
      "primary": "#hex",
      "secondary": "#hex",
      "background": "#hex",
      "surface": "#hex",
      "text": "#hex",
      "border": "#hex"
    }
  },
  "typography": {
    "headingFont": "string",
    "bodyFont": "string",
    "baseFontSize": "string",
    "lineHeight": "string"
  },
  "spacing": {
    "base": "string",
    "scale": "number"
  },
  "borderRadius": {
    "sm": "string",
    "md": "string",
    "lg": "string",
    "full": "string"
  },
  "shadow": {
    "sm": "string",
    "md": "string",
    "lg": "string"
  }
}
```

## Tech Stack

- **Framework**: React 18 + Vite 5
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Color utilities**: chroma.js
- **Package manager**: npm

## Project Structure

```
src/
├── components/
│   ├── landing/         # Hero, HowItWorks, Footer
│   └── ui/              # Shared UI primitives
├── lib/                 # Utility functions
├── types/               # TypeScript interfaces (Kit, etc.)
└── styles/              # Global CSS

public/
└── kits/                # Kit JSON files (saas, finance, health, retail, creative)
```

## Out of Scope (v1)

- User accounts / authentication
- Custom kit creation
- Community / sharing features
- Payment / subscription
