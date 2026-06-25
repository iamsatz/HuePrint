import React, { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { GripVertical } from 'lucide-react'
import { CANVAS_CATEGORIES, getBlocksByCategory } from '../../lib/canvasBlocks'

function PaletteItem({ block }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${block.id}`,
    data: { type: 'palette', blockId: block.id },
  })

  return (
    <div
      ref={setNodeRef}
      className={`cv-palette-item${isDragging ? ' cv-palette-item--dragging' : ''}`}
      {...listeners}
      {...attributes}
    >
      <GripVertical size={14} className="cv-palette-item-grip" aria-hidden />
      <div className="cv-palette-item-body">
        <span className="cv-palette-item-label">{block.label}</span>
        <span className="cv-palette-item-desc">{block.description}</span>
        {block.variants.length > 1 && (
          <span className="cv-palette-item-variants">{block.variants.length} variants</span>
        )}
      </div>
    </div>
  )
}

export default function ComponentPalette() {
  const categories = Object.values(CANVAS_CATEGORIES)
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || 'dashboard')
  const blocks = getBlocksByCategory(activeCategory)

  return (
    <aside className="cv-palette">
      <div className="cv-palette-header">
        <h2 className="cv-palette-title">Components</h2>
        <p className="cv-palette-sub">Drag blocks onto the canvas</p>
      </div>

      <div className="cv-palette-tabs" role="tablist" aria-label="Component categories">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={activeCategory === cat.id}
            className={`cv-palette-tab${activeCategory === cat.id ? ' cv-palette-tab--active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="cv-palette-list" role="tabpanel">
        {blocks.map((block) => (
          <PaletteItem key={block.id} block={block} />
        ))}
      </div>
    </aside>
  )
}
