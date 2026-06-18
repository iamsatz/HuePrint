import React, { useState, useMemo } from 'react'
import { matchWebsiteReferences } from '../../lib/websiteReferences'
import './SimilarWebsitesPanel.css'

const CAT_STYLE = {
  SaaS:           { bg: '#eff6ff', color: '#1d4ed8' },
  Fintech:        { bg: '#ecfdf5', color: '#065f46' },
  Developer:      { bg: '#f0f9ff', color: '#0369a1' },
  Productivity:   { bg: '#fffbeb', color: '#92400e' },
  'Design Tools': { bg: '#fdf4ff', color: '#86198f' },
  Portfolio:      { bg: '#f5f3ff', color: '#5b21b6' },
  Ecommerce:      { bg: '#fff1f2', color: '#be123c' },
  Healthcare:     { bg: '#ecfeff', color: '#155e75' },
  Education:      { bg: '#f0fdf4', color: '#166534' },
  Retail:         { bg: '#fff7ed', color: '#9a3412' },
  Travel:         { bg: '#f0fdfa', color: '#134e4a' },
  Agency:         { bg: '#fdf4ff', color: '#6b21a8' },
}

function CategoryPill({ category }) {
  const s = CAT_STYLE[category] || { bg: '#f3f4f6', color: '#374151' }
  return (
    <span className="swp-cat-pill" style={{ background: s.bg, color: s.color }}>
      {category}
    </span>
  )
}

function ScoreBadge({ score }) {
  const s = score >= 70
    ? { bg: '#f5f3ff', color: '#7c3aed' }
    : score >= 45
    ? { bg: '#f3f4f6', color: '#374151' }
    : { bg: '#f9fafb', color: '#9ca3af' }
  return (
    <span className="swp-score-badge" style={{ background: s.bg, color: s.color }}>
      {score}%
    </span>
  )
}

function PaletteHero({ palette, url, name }) {
  const colors = palette.slice(0, 5)
  return (
    <a className="swp-palette-hero" href={url} target="_blank" rel="noreferrer" aria-label={`Visit ${name}`}>
      {colors.map((hex, i) => (
        <span key={i} className="swp-palette-block" style={{ background: hex }} />
      ))}
    </a>
  )
}

function ColorPair({ label, userHex, refHex }) {
  if (!userHex || !refHex) return null
  return (
    <div className="swp-color-pair">
      <span className="swp-color-pair-label">{label}</span>
      <div className="swp-color-pair-right">
        <div className="swp-swatch-group">
          <span className="swp-swatch" style={{ background: userHex }} title={userHex} />
          <code className="swp-hex">{userHex.toUpperCase()}</code>
        </div>
        <span className="swp-pair-arrow">→</span>
        <div className="swp-swatch-group">
          <span className="swp-swatch" style={{ background: refHex }} title={refHex} />
          <code className="swp-hex">{refHex.toUpperCase()}</code>
        </div>
      </div>
    </div>
  )
}

function FilterBar({ categories, active, onChange, counts }) {
  return (
    <div className="swp-filter-bar" role="group" aria-label="Filter by category">
      {['All', ...categories].map((cat) => (
        <button
          key={cat}
          type="button"
          className={`swp-filter-btn${active === cat ? ' swp-filter-btn--active' : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat}
          {counts[cat] != null && (
            <span className="swp-filter-count">{counts[cat]}</span>
          )}
        </button>
      ))}
    </div>
  )
}

export default function SimilarWebsitesPanel({
  kit,
  category = 'All',
  title = 'Inspirations',
  description = 'Ranked by your palette, contrast mood, and typeface.',
  limit = 24,
  variant = 'default',
  onUseReference,
  actionLabel = 'Apply to kit',
}) {
  const [filterCat, setFilterCat] = useState('All')

  if (!kit) return null

  const allMatches = useMemo(
    () => matchWebsiteReferences(kit, 'All', 999),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(kit)],
  )

  const counts = useMemo(() => {
    const c = { All: allMatches.length }
    allMatches.forEach((m) => { c[m.category] = (c[m.category] || 0) + 1 })
    return c
  }, [allMatches])

  const categories = useMemo(
    () => [...new Set(allMatches.map((m) => m.category))].sort(),
    [allMatches],
  )

  const matches = useMemo(
    () => filterCat === 'All' ? allMatches.slice(0, limit) : allMatches.filter((m) => m.category === filterCat),
    [allMatches, filterCat, limit],
  )

  return (
    <section className={`swp swp--${variant}`} aria-label={title}>
      <div className="swp-head">
        <span className="swp-kicker">Palette match</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <FilterBar categories={categories} active={filterCat} onChange={setFilterCat} counts={counts} />

      <span className="swp-count">{matches.length} sites</span>

      <div className="swp-grid">
        {matches.map((ref) => {
          const md = ref.matchDetails || {}
          return (
            <article key={ref.id} className="swp-card">
              <PaletteHero palette={ref.palette} url={ref.url} name={ref.name} />

              <div className="swp-body">
                <div className="swp-title-row">
                  <h3 className="swp-site-name">{ref.name}</h3>
                  <ScoreBadge score={ref.score} />
                </div>

                <div className="swp-tags">
                  <CategoryPill category={ref.category} />
                  {ref.styleTags?.slice(0, 2).map((tag) => (
                    <span key={tag} className="swp-style-tag">{tag}</span>
                  ))}
                </div>

                <div className="swp-section">
                  <span className="swp-section-label">Colors</span>
                  <div className="swp-color-pairs">
                    <ColorPair label="Primary" userHex={md.userPrimary} refHex={md.primaryMatchHex} />
                    <ColorPair label="Background" userHex={md.userBg} refHex={md.bgMatchHex} />
                  </div>
                </div>

                {md.refFonts?.heading && (
                  <div className="swp-section">
                    <span className="swp-section-label">Typography</span>
                    <div className="swp-font-row">
                      <span
                        className="swp-font-name"
                        style={{ fontFamily: `'${md.refFonts.heading}', sans-serif` }}
                      >
                        {md.refFonts.heading}
                      </span>
                      {md.refFonts.classification && (
                        <span className="swp-font-class">
                          {md.refFonts.classification.replace(/-/g, ' ')}
                        </span>
                      )}
                      {md.headingFont && md.headingFont === md.refFonts.heading && (
                        <span className="swp-font-match">✓ same as yours</span>
                      )}
                    </div>
                  </div>
                )}

                {ref.reasons.length > 0 && (
                  <ul className="swp-reasons">
                    {ref.reasons.slice(0, 3).map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                )}

                {onUseReference && (
                  <button
                    className="swp-apply"
                    type="button"
                    onClick={() => onUseReference(ref)}
                  >
                    {actionLabel} →
                  </button>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
