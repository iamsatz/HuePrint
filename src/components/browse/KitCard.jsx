import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getSwatchColors } from '../../lib/loadKits'
import './KitCard.css'

/**
 * @param {{ kit: import('../../types/kit').Kit }} props
 */
export default function KitCard({ kit }) {
  const navigate = useNavigate()
  const swatches = getSwatchColors(kit)

  return (
    <article
      className="kit-card"
      onClick={() => navigate(`/kit/${kit.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') navigate(`/kit/${kit.id}`)
      }}
      aria-label={`View ${kit.name} kit`}
    >
      <div className="kit-card-swatches" aria-hidden="true">
        {swatches.map((color, i) => (
          <span
            key={i}
            className="kit-card-swatch"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
      <div className="kit-card-body">
        <div className="kit-card-header">
          <h3 className="kit-card-name">{kit.name}</h3>
          <span className="kit-card-industry-tag">{kit.industry}</span>
        </div>
        <p className="kit-card-description">{kit.description}</p>
      </div>
      <div className="kit-card-footer">
        <span className="kit-card-cta">View kit →</span>
      </div>
    </article>
  )
}
