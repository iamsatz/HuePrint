import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import './landing.css'

const AI_TOOLS = ['Claude', 'v0', 'Cursor', 'Replit', 'Bolt']

const KITS = [
  { name: 'SaaS', colors: ['#2563EB', '#64748B', '#0EA5E9', '#F8FAFC', '#E2E8F0', '#0F172A'] },
  { name: 'Finance', colors: ['#166534', '#374151', '#10B981', '#F0FFF4', '#E2E8F0', '#1A202C'] },
  { name: 'Health', colors: ['#0891B2', '#10B981', '#06B6D4', '#F0F9FF', '#CCFBF1', '#164E63'] },
  { name: 'Retail', colors: ['#EA580C', '#F59E0B', '#FB923C', '#FFF7ED', '#FEF3C7', '#1C1917'] },
  { name: 'Creative', colors: ['#7C3AED', '#EC4899', '#A855F7', '#FAF5FF', '#FCE7F3', '#1E1B4B'] },
]

export default function Hero() {
  return (
    <div className="hp-hero-wrap">
    <section className="hp-hero">

      <div className="hp-hero-inner">
        {/* Badge */}
        <div className="hp-hero-badge">
          <span className="hp-hero-badge-dot" />
          Design tokens for the AI era
        </div>

        {/* Headline */}
        <h1 className="hp-hero-h1">
          Give your AI tools<br />
          <span className="hp-hero-h1-accent">a design system.</span>
        </h1>

        {/* Sub */}
        <p className="hp-hero-sub">
          Pick an industry kit. Preview it on real components. Export in the exact format
          Claude, v0, or Cursor expects — so every UI they write looks like it came from
          your design system, not a generic template.
        </p>

        {/* CTAs */}
        <div className="hp-hero-ctas">
          <Link to="/browse" className="hp-btn hp-btn-primary">
            Browse Kits
            <ArrowRight size={16} />
          </Link>
          <Link to="/create" className="hp-btn hp-btn-secondary">
            Import Your Colors
          </Link>
        </div>

        {/* Tool strip */}
        <div className="hp-hero-tools">
          <span className="hp-hero-tools-label">Works alongside</span>
          {AI_TOOLS.map((tool) => (
            <span key={tool} className="hp-hero-tool-pill">{tool}</span>
          ))}
        </div>
      </div>

      {/* Visual: kit palette grid */}
      <div className="hp-hero-visual">
        <div className="hp-palette-card">
          <div className="hp-palette-card-header">
            <span className="hp-palette-card-title">Kit palettes</span>
            <span className="hp-palette-card-mode">Light / Dark</span>
          </div>

          <div className="hp-palette-rows">
            {KITS.map((kit) => (
              <div key={kit.name} className="hp-palette-row">
                <span className="hp-palette-row-label">{kit.name}</span>
                <div className="hp-palette-swatches">
                  {kit.colors.map((c, i) => (
                    <div key={i} className="hp-swatch" style={{ background: c }} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="hp-palette-footer">
            <span className="hp-export-pill">system-prompt.md</span>
            <span className="hp-export-pill">tokens.css</span>
            <span className="hp-export-pill">tokens.json</span>
          </div>
        </div>

        <div className="hp-visual-footnote">
          Paste into Claude → get on-brand UI
        </div>
      </div>
    </section>
    </div>
  )
}
