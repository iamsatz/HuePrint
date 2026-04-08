import React from 'react'
import KitCard from './KitCard'
import './KitGrid.css'

/**
 * @param {{ kits: import('../../types/kit').Kit[] }} props
 */
export default function KitGrid({ kits }) {
  if (kits.length === 0) {
    return (
      <div className="kit-grid-empty">
        <p>No kits found for this industry.</p>
      </div>
    )
  }

  return (
    <div className="kit-grid">
      {kits.map((kit) => (
        <KitCard key={kit.id} kit={kit} />
      ))}
    </div>
  )
}
